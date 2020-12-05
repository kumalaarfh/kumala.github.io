// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
require({cache:{"url:widgets/CostAnalysis/create-load-project.html":'\x3cdiv\x3e\r\n  \x3cdiv class\x3d"esriCTCreateProjectContainer" data-dojo-attach-point\x3d"createLoadProjectContainer"\x3e\x3c/div\x3e\r\n  \x3cdiv data-dojo-attach-point\x3d"createProjectContainer"\x3e\x3c/div\x3e\r\n  \x3cdiv data-dojo-attach-point\x3d"loadProjectContainer"\x3e\x3c/div\x3e\r\n  \x3cdiv data-dojo-attach-point\x3d"updateEquationContainer" class\x3d"esriCTUpdateEquationMainContainer"\x3e\x3c/div\x3e\r\n\x3c/div\x3e'}});
define("dojo/_base/declare jimu/BaseWidget dojo/Evented dijit/_WidgetsInTemplateMixin dojo/text!./create-load-project.html dojo/_base/lang dojo/_base/array dojo/on dojo/dom-construct ./item-list dijit/form/ValidationTextBox jimu/dijit/formSelect esri/tasks/query esri/graphic esri/tasks/QueryTask esri/graphicsUtils dojo/Deferred esri/layers/FeatureLayer dojo/promise/all jimu/dijit/Message dojo/dom-style dojo/query ./update-project-cost dojo/dom-attr dijit/focus dojo/dom-class dojo/keys jimu/utils dojo/_base/event".split(" "),
function(E,F,G,H,I,d,h,k,l,J,A,K,n,B,r,C,p,v,y,D,z,m,L,w,u,M,q,t,x){return E([F,G,H],{templateString:I,baseClass:"jimu-widget-cost-analysis-create-load-project",highlighterColor:"#000",projectLayer:null,paneListData:[],_numberFieldTypes:["esriFieldTypeSmallInteger","esriFieldTypeInteger","esriFieldTypeSingle","esriFieldTypeDouble"],projectNameOptions:[],projectNameField:null,projectDescField:null,_updateProjectCostWidget:null,projectNameTextBox:null,postCreate:function(){this.inherited(arguments);
this.projectNameField=this.config.projectLayerFields.PROJECTNAME;this.projectDescField=this.config.projectLayerFields.DESCRIPTION;this.paneListData=[];this.projectLayer=this.layerInfosObj.getLayerInfoById(this.config.projectSettings.projectLayer).layerObject;this.projectNameOptions=[{label:this.nls.createLoadProject.selectProject,value:"defaultSelectProjectNameOption"}];this._createProjectUI();this._loadProjectUI()},startup:function(){this.inherited(arguments);this._initializeData();this._fetchWidgetTopNode();
this.paneListData=[{title:this.nls.createLoadProject.createProjectPaneTitle,content:this.createProjectContainer,isOpen:!0,tabindex:"0",createProjectTab:!0,"aria-label":this.nls.createLoadProject.createProjectPaneTitle,role:"button",paneName:"creatProject"},{title:this.nls.createLoadProject.loadProjectPaneTitle,content:this.loadProjectContainer,isOpen:!1,loadProjectTab:!0,tabindex:"0","aria-label":this.nls.createLoadProject.loadProjectPaneTitle,role:"button",paneName:"loadProject"}];this.config.hasOwnProperty("updateCostEquationCheckBoxStatus")&&
this.config.updateCostEquationCheckBoxStatus&&this.paneListData.push({title:this.nls.updateCostEquationPanel.updateProjectCostTabLabel,content:this.updateEquationContainer,isOpen:!1,updateCostEquationWidget:!0,tabindex:"0","aria-label":this.nls.updateCostEquationPanel.updateProjectCostTabLabel,role:"button",paneName:"updateCostEquation"});this._createAndLoadProjectPanes();this._getProjectNamesOptions()},_initializeData:function(){this._updateProjectCostWidget=null},_showMessage:function(a){(new D({message:a})).message=
a},_createProjectUI:function(){var a,b,c,e;a=l.create("div",{"class":"esriCTCreateProjectWrapper"},this.createProjectContainer);b=l.create("div",{"class":"esriCTFullwidth esriCTCreateProjectContent"},a);this.projectNameTextBox=new A({required:!0,trim:!0,placeHolder:this.nls.createLoadProject.projectNamePlaceHolder,title:this.nls.createLoadProject.projectNamePlaceHolder,maxLength:this._getFieldInfo(this.projectNameField).fieldLength,autofocus:!0,"class":"esriCTFullwidth esriCTCreateProjectContent esriCTEllipsis"},
b);this.projectNameTextBox.validator=d.hitch(this,function(a){return""===a?!1:this._validateProjectNameLocally(a)?!0:(this.projectNameTextBox.set("state","Error"),this.projectNameTextBox.set("invalidMessage",this.nls.createLoadProject.errorDuplicateProjectName),!1)});e=this._getFieldInfo(this.projectDescField);b=l.create("div",{"class":"esriCTFullwidth esriCTCreateProjectContent"},a);c=new A({required:e.nullable,trim:!0,placeHolder:this.nls.createLoadProject.projectDescPlaceHolder,"class":"esriCTFullwidth esriCTCreateProjectContent esriCTEllipsis",
title:this.nls.createLoadProject.projectDescPlaceHolder,maxLength:e.fieldLength},b);a=l.create("div",{"class":"esriCTFullwidth esriCTCreateLoadButtonWrap"},a);a=this._createButton(this.nls.createLoadProject.createLabel,a,"0");this.createLoadProjectButtonArray.push(a);this.own(k(a,"click",d.hitch(this,function(){this._createButtonClicked(c);this.projectNameTextBox.isValid()||u.focus(this.projectNameTextBox);c.isValid()||u.focus(c)})));this.own(k(a,"keydown",d.hitch(this,function(a){if(a.keyCode===
q.ENTER||a.keyCode===q.SPACE)x.stop(a),this._createButtonClicked(c),this.projectNameTextBox.isValid()||u.focus(this.projectNameTextBox),c.isValid()||u.focus(c)})));return this.createProjectContainer},_createButtonClicked:function(a){a.isValid()||(a.set("state","Error"),a.set("message",a.getErrorMessage()));this.projectNameTextBox.isValid()&&a.isValid()&&(this.loadingIndicator.show(),this._validateForDuplicateProjectName(t.sanitizeHTML(this.projectNameTextBox.get("value"))).then(d.hitch(this,function(b){b?
(this.loadingIndicator.hide(),this.projectNameTextBox.set("state","Error"),this._showMessage(this.nls.createLoadProject.errorDuplicateProjectName)):this._addProjectToLayer(t.sanitizeHTML(this.projectNameTextBox.get("value")),t.sanitizeHTML(a.get("value"))).then(d.hitch(this,function(b){var c;this.loadingIndicator.hide();b&&b.success&&b.globalId?(c={label:t.sanitizeHTML(this.projectNameTextBox.get("value")),value:b.globalId,descValue:t.sanitizeHTML(a.get("value")),globalIdValue:b.globalId,objectIdValue:b.objectId},
this.projectNameSelect.addOption(c),this.emit("createProject",{name:t.sanitizeHTML(this.projectNameTextBox.get("value")),desc:t.sanitizeHTML(a.get("value")),projectId:b.globalId,objectId:b.objectId,projectIdField:this.projectLayer.globalIdField}),this.projectNameTextBox.set("value"," "),a.set("value","")):this._showMessage(this.nls.createLoadProject.errorInCreatingProject)}),d.hitch(this,function(){this.loadingIndicator.hide();this._showMessage(this.nls.createLoadProject.errorInCreatingProject)}))}),
d.hitch(this,function(){this.loadingIndicator.hide();this._showMessage(this.nls.createLoadProject.errorInCreatingProject)})))},_getFieldInfo:function(a){var b,c;this.projectLayer&&this.projectLayer.getField(a)&&(a=this.projectLayer.getField(a),b=a.length,c=!a.nullable);return{fieldLength:b,nullable:c}},_createButton:function(a,b,c){return l.create("div",{"class":"jimu-btn esriCTEllipsis",innerHTML:a,title:a,role:"button",tabindex:c,"aria-label":a},b)},_loadProjectUI:function(){var a,b;a=l.create("div",
{"class":"esriCTLoadProjectWrapper"},this.loadProjectContainer);b=l.create("div",{"class":"esriCTFullwidth esriCTCreateProjectContent"},a);a=l.create("div",{"class":"esriCTFullwidth esriCTCreateLoadButtonWrap"},a);this.projectNameSelect=new K({"aria-label":this.nls.createLoadProject.selectProject,"class":"esriCTFullwidth",options:this.projectNameOptions},l.create("div",{},b));this.projectNameSelect.startup();b=this._createButton(this.nls.createLoadProject.viewInMapLabel,a,"-1");this.own(k(b,"click",
d.hitch(this,function(){this.getProjectAssets("ViewProject")})));this.own(k(b,"keydown",d.hitch(this,function(a){if(a.keyCode===q.ENTER||a.keyCode===q.SPACE)x.stop(a),this.getProjectAssets("ViewProject")})));this.createLoadProjectButtonArray.push(b);b=this._createButton(this.nls.common.deleteText,a,"-1");this.createLoadProjectButtonArray.push(b);this.own(k(b,"click",d.hitch(this,this._deleteBtnClicked)));this.own(k(b,"keydown",d.hitch(this,function(a){if(a.keyCode===q.ENTER||a.keyCode===q.SPACE)x.stop(a),
this._deleteBtnClicked()})));a=this._createButton(this.nls.createLoadProject.loadLabel,a,"-1");this.createLoadProjectButtonArray.push(a);this.own(k(a,"click",d.hitch(this,function(){this.getProjectAssets("LoadProject")})));this.own(k(a,"keydown",d.hitch(this,function(a){if(a.keyCode===q.ENTER||a.keyCode===q.SPACE)x.stop(a),this.getProjectAssets("LoadProject")})));return this.loadProjectContainer},_deleteBtnClicked:function(){var a,b;(b=this.projectNameSelect._getSelectedOptionsAttr())&&b.value?a=
new D({message:this.nls.createLoadProject.deleteProjectConfirmationMsg,type:"question",maxWidth:375,buttons:[{label:this.nls.common.yes,onClick:d.hitch(this,function(){a.close();this.getProjectAssets("DeleteProject")})},{label:this.nls.common.no,onClick:d.hitch(this,function(){a.close()})}]}):this._showMessage(this.nls.createLoadProject.errorProjectNotSelected)},_checkIfProjectExist:function(a){var b,c,e;e=new p;c=new r(this.projectLayer.url);b=new n;b.outFields=[this.projectLayer.objectIdField,this.projectLayer.globalIdField];
b.returnGeometry=!1;b.where=this.projectLayer.globalIdField+" \x3d '"+a+"'";c.execute(b,d.hitch(this,function(a){a&&a.features&&0<a.features.length?e.resolve(!0):e.resolve(!1)}),d.hitch(this,function(){e.resolve(!1)}));return e.promise},getProjectAssets:function(a){var b,c,e,f,g;(g=this.projectNameSelect._getSelectedOptionsAttr())&&g.value?(this.loadingIndicator.show(),this._checkIfProjectExist(g.globalIdValue).then(d.hitch(this,function(N){N?(e=this.layerInfosObj.getTableInfoById(this.config.projectSettings.assetTable).layerObject,
f=new v(e.url),c=new r(f.url),b=new n,b.outFields=["*"],b.returnGeometry=!1,b.where=this.config.assetTableFields.PROJECTGUID+" \x3d '"+g.globalIdValue+"'",c.execute(b,d.hitch(this,function(b){this.loadingIndicator.hide();"ViewProject"===a?this._showProjectOnMap(g,b.features):"DeleteProject"===a?this._deleteProject(g,b.features):this._createAssetTemplateInfo(g,b.features)}),d.hitch(this,function(){this._showMessage(this.nls.createLoadProject.errorInLoadingProject);this.loadingIndicator.hide()}))):
(this.projectNameSelect.removeOption(g.globalIdValue),this._showMessage(this.nls.createLoadProject.errorProjectNotFound),this.emit("showCreateLoadPrjPanel"),this.loadingIndicator.hide())}),d.hitch(this,function(){this._showMessage(this.nls.createLoadProject.errorInLoadingProject);this.emit("showCreateLoadPrjPanel");this.loadingIndicator.hide()}))):this._showMessage(this.nls.createLoadProject.errorProjectNotSelected)},_createAssetTemplateInfo:function(a,b){var c=[];this.loadingIndicator.show();h.forEach(b,
d.hitch(this,function(a){(a=a.attributes[this.config.assetTableFields.GEOGRAPHYGUID])&&c.push(a)}));this._getRegionName(c).then(d.hitch(this,function(c){this.loadingIndicator.hide();var e,g;e=[];g={};h.forEach(b,d.hitch(this,function(a){var b,d={},f;b=a.attributes[this.config.assetTableFields.ASSETGUID];f=a.attributes[this.config.assetTableFields.GEOGRAPHYGUID];e.push(b);d.COSTEQUATION=a.attributes[this.config.assetTableFields.COSTEQUATION];d.SCENARIO=a.attributes[this.config.assetTableFields.SCENARIO];
d.TEMPLATENAME=a.attributes[this.config.assetTableFields.TEMPLATENAME];d.GEOGRAPHYGUID=f;d.GEOGRAPHY=f?c[f]:null;d.OBJECTID=a.attributes[this.config.assetTableFields.OBJECTID];g[b]=d}));this._loadProject(a,e,g)}),d.hitch(this,function(){this.loadingIndicator.hide()}))},_getAssetRequestToLayer:function(a,b){var c,e,f,g;g=b.layerObject.id;f=b.layerObject;f.clearSelection();e=new p;b=new r(f.url);c=new n;c.outFields=["*"];c.returnGeometry=!0;c.outSpatialReference=this.map.spatialReference;c.where=f.globalIdField+
" in ('"+a.join("','")+"')";b.execute(c,d.hitch(this,function(a){a&&a.features&&0<a.features.length?e.resolve({layerId:g,features:a.features}):e.resolve({layerId:g,features:[]})}),d.hitch(this,function(){e.resolve({layerId:g,features:[]})}));return e.promise},_getProjectAdditionalCost:function(a){var b,c,e;b=new p;(c=this.config.projectSettings.multiplierAdditionalCostTable)?(c=this.layerInfosObj.getTableInfoById(c).layerObject.url,e=new r(c),c=new n,c.outFields=["*"],c.returnGeometry=!1,c.where=
this.config.projectMultiplierFields.PROJECTGUID+" \x3d '"+a+"'",e.execute(c,d.hitch(this,function(a){var c=[];a&&a.features&&(c=a.features);b.resolve(c)}),d.hitch(this,function(){b.resolve([])}))):b.resolve([]);return b.promise},_getRegionName:function(a){var b,c,e,f;b=new p;this.config.projectSettings.costingGeometryLayer&&this.config.projectSettings.geographyField&&0<a.length?(f=this.layerInfosObj.getLayerInfoById(this.config.projectSettings.costingGeometryLayer).layerObject,e=new r(f.url),c=new n,
c.outFields=[this.config.projectSettings.geographyField,f.globalIdField],c.returnDistinctValues=!0,c.returnGeometry=!1,c.where=f.globalIdField+" in ('"+a.join("','")+"')",e.execute(c,d.hitch(this,function(a){var c={};a&&a.features&&h.forEach(a.features,d.hitch(this,function(a){c[a.attributes[f.globalIdField]]=a.attributes[this.config.projectSettings.geographyField]}));b.resolve(c)}),d.hitch(this,function(){b.resolve([])}))):b.resolve([]);return b.promise},_selectFeaturesOnMap:function(a,b){var c,
e;e=this.layerInfosObj.getLayerInfoById(b).layerObject;c=new p;b=new n;b.where=e.globalIdField+" in ('"+a.join("','")+"')";e.selectFeatures(b,v.SELECTION_NEW,d.hitch(this,function(a){a&&0<a.length?c.resolve(a):c.resolve([])}),d.hitch(this,function(){c.resolve([])}));return c.promise},_showProjectOnMap:function(a,b){var c=[],e=[];h.forEach(b,d.hitch(this,function(a){c.push(a.attributes[this.config.assetTableFields.ASSETGUID])}));0===c.length?this._showMessage(this.nls.createLoadProject.noAssetsToViewOnMap):
(this.loadingIndicator.show(),this._selectFeaturesOnMap([a.globalIdValue],this.config.projectSettings.projectLayer).then(d.hitch(this,function(a){var b=!1;0<a.length&&a[0].geometry&&(b=!0,this.map.setExtent(C.graphicsExtent(a).expand(1.5)));h.forEach(this.config.layerSettings,d.hitch(this,function(a){a.editable&&e.push(this._selectFeaturesOnMap(c,a.id))}));y(e).then(d.hitch(this,function(a){var c=[];this.loadingIndicator.hide();b||(h.forEach(a,d.hitch(this,function(a){c=c.concat(a)})),0<c.length?
this.map.setExtent(C.graphicsExtent(c).expand(1.5)):this._showMessage(this.nls.createLoadProject.noAssetsToViewOnMap))}))}),d.hitch(this,function(){this.loadingIndicator.hide();this._showMessage(this.nls.createLoadProject.errorInLoadingProject)})))},_deleteFromTable:function(a,b,c){if(a=this.layerInfosObj.getTableInfoById(a))a=a.layerObject;b=b+" \x3d '"+c+"'";a?b=this.appUtils.deleteFeatures(a.url,b):(b=new p,b.resolve(!1),b=b.promise);return b},_deleteProject:function(a,b){this.loadingIndicator.show();
this._getRelatedLabelPoint(a.globalIdValue,a,b)},_deleteDetailsRelatedToProject:function(a,b,c){var e=[],f=[];this.emit("deleteProject");this.loadingIndicator.show();h.forEach(c,d.hitch(this,function(a){e.push(a.attributes[this.config.assetTableFields.ASSETGUID])}));0<e.length&&h.forEach(this.config.layerSettings,d.hitch(this,function(a){var b;a.editable&&(a=this.layerInfosObj.getLayerInfoById(a.id).layerObject,b=a.globalIdField+" in ('"+e.join("','")+"')",f.push(this.appUtils.deleteFeatures(a.url,
b)))}));f.push(this._deleteFromTable(this.config.projectSettings.assetTable,this.config.assetTableFields.PROJECTGUID,a));f.push(this._deleteFromTable(this.config.projectSettings.multiplierAdditionalCostTable,this.config.projectMultiplierFields.PROJECTGUID,a));f.push(this.appUtils.deleteFeatures(this.projectLayer.url,this.projectLayer.globalIdField+" \x3d '"+b.globalIdValue+"'"));y(f).then(d.hitch(this,function(){this.loadingIndicator.hide();this.projectNameSelect.removeOption(a);this._showMessage(this.nls.createLoadProject.projectDeletedMsg);
this.projectLayer.clearSelection();this.projectLayer.refresh();h.forEach(this.config.layerSettings,d.hitch(this,function(a){a.editable&&(a=this.layerInfosObj.getLayerInfoById(a.id).layerObject,a.clearSelection(),a.refresh())}))}))},_loadProject:function(a,b,c){var e=[];this.loadingIndicator.show();if(0<b.length)h.forEach(this.config.layerSettings,d.hitch(this,function(a){var c=this.layerInfosObj.getLayerInfoById(a.id);c&&c.layerObject&&a.editable&&e.push(this._getAssetRequestToLayer(b,c))}));else{var f=
new p;e.push(f.promise);f.resolve(null)}y(e).then(d.hitch(this,function(b){var e={},f;f={name:a.label,desc:a.descValue,projectId:a.globalIdValue,objectId:a.objectIdValue};this.selectedProjectFeatureAttr=a.prjAttributes;h.forEach(b,d.hitch(this,function(a){a&&(e[a.layerId]=a.features)}));this._getProjectAdditionalCost(a.globalIdValue).then(d.hitch(this,function(a){this.loadingIndicator.hide();this.emit("loadProject",{assetTemplateInfo:c,assetInfo:e,projectInfo:f,additionalCostInfo:a,projectIdField:this.projectLayer.globalIdField})}),
d.hitch(this,function(){this.loadingIndicator.hide()}))}),d.hitch(this,function(){this.loadingIndicator.hide()}))},_createAndLoadProjectPanes:function(){this.paneListData&&0<this.paneListData.length&&(this._createOrLoadPrj=new J({itemList:this.paneListData,openMultiple:!1,highlighterColor:this.config.selectedThemeColor},l.create("div",{},this.createLoadProjectContainer)),this.own(k(this._createOrLoadPrj,"refreshUpdateCostEquationWidget",d.hitch(this,function(){this._destroyUpdateCostEquationWidget();
this._getProjectNamesOptions()}))),this.own(k(this._createOrLoadPrj,"resetLoadProjectNameDropdown",d.hitch(this,function(){this.projectNameSelect.set("value","defaultSelectProjectNameOption")}))),this.own(k(this._createOrLoadPrj,"OnOpenCreatePanel",d.hitch(this,function(){var a=m(".esriCTCreateProjectContent",this.domNode);a&&a.length&&(this._updateTabindexOfInputDOM(a[0],"0"),this._updateTabindexOfInputDOM(a[1],"0"),this._updateTabindexOfDOM(this.createLoadProjectButtonArray[0],"0"),u.focus(a[0].domNode))}))),
this.own(k(this._createOrLoadPrj,"OnCloseCreatePanel",d.hitch(this,function(){var a=m(".esriCTCreateProjectContent",this.domNode);a&&a.length&&(this._updateTabindexOfInputDOM(a[0],"-1"),this._updateTabindexOfInputDOM(a[1],"-1"),this._updateTabindexOfDOM(this.createLoadProjectButtonArray[0],"-1"))}))),this.own(k(this._createOrLoadPrj,"OnOpenLoadPanel",d.hitch(this,function(){var a=m(".esriCTCreateProjectContent",this.domNode);a&&a.length&&(this._updateTabindexOfDOM(a[2].children[0],"0"),this._updateTabindexOfDOM(this.createLoadProjectButtonArray[1],
"0"),this._updateTabindexOfDOM(this.createLoadProjectButtonArray[2],"0"),this._updateTabindexOfDOM(this.createLoadProjectButtonArray[3],"0"),this.config.updateCostEquationCheckBoxStatus||this.updateLastFocusNode(this.createLoadProjectButtonArray[3],this.widgetDomNode),u.focus(a[2].children[0]))}))),this.own(k(this._createOrLoadPrj,"OnCloseLoadPanel",d.hitch(this,function(){var a;(a=m(".esriCTCreateProjectContent",this.domNode))&&a.length&&(this._updateTabindexOfDOM(a[2].children[0],"-1"),this._updateTabindexOfDOM(this.createLoadProjectButtonArray[1],
"-1"),this._updateTabindexOfDOM(this.createLoadProjectButtonArray[2],"-1"),this._updateTabindexOfDOM(this.createLoadProjectButtonArray[3],"-1"),this._getLastTitleContainerNode())}))),this._createOrLoadPrj.startup())},_getLastTitleContainerNode:function(){var a,b;a=m(".esriCTItemTitleContainer",this.domNode);(b=a.length)&&this.updateLastFocusNode(a[b-1],this.widgetDomNode)},_getUpdateCostEquationProjectNameDOM:function(a,b){m(".esriCTProjectNameCheckBox",this.domNode).forEach(d.hitch(this,function(c,
d){w.set(c,"tabindex",a);b&&void 0===d&&this.updateLastFocusNode(c,this.widgetDomNode)}))},_updateTabindexOfDOM:function(a,b){w.set(a,"tabindex",b)},_updateTabindexOfInputDOM:function(a,b){m(".dijitInputInner",a).forEach(d.hitch(this,function(a){this._updateTabindexOfDOM(a,b)}))},_getProjectNamesOptions:function(){var a,b;this.loadingIndicator.show();b=new r(this.projectLayer.url);a=new n;a.outFields=["*"];a.returnGeometry=!1;a.where="1\x3d1";b.execute(a,d.hitch(this,function(a){var b=[];a&&a.features&&
(b=a.features);this._populateProjectNameOptions(b);setTimeout(d.hitch(this,function(){this._displayUpdateCostEquationWidget()}),10)}),d.hitch(this,function(){this.loadingIndicator.hide()}))},_populateProjectNameOptions:function(a){this.projectNameOptions=[{label:this.nls.createLoadProject.selectProject,value:""}];h.forEach(a,d.hitch(this,function(a){this.projectNameField&&a.attributes[this.projectNameField]&&""!==d.trim(a.attributes[this.projectNameField])&&this.projectNameOptions.push({label:a.attributes[this.projectNameField],
value:a.attributes[this.projectLayer.globalIdField],descValue:a.attributes[this.projectDescField],globalIdValue:a.attributes[this.projectLayer.globalIdField],objectIdValue:a.attributes[this.projectLayer.objectIdField],prjAttributes:a.attributes})}));this.projectNameSelect.set("options",d.clone(this.projectNameOptions));this.loadingIndicator.hide()},_validateProjectNameLocally:function(a){var b=[];this.projectNameSelect&&0<this.projectNameSelect.options.length&&(b=h.filter(this.projectNameSelect.options,
function(b){return b.label.toUpperCase()===a.toUpperCase()}));return 0<b.length?!1:!0},_validateForDuplicateProjectName:function(a){var b,c,e;e=new p;c=new r(this.projectLayer.url);b=new n;b.outFields=[this.projectLayer.objectIdField,this.projectLayer.globalIdField];b.returnGeometry=!1;b.where="UPPER("+this.projectNameField+") \x3d '"+a.toUpperCase()+"'";c.execute(b,d.hitch(this,function(a){a&&a.features&&0<a.features.length?e.resolve(!0):e.resolve(!1)}),d.hitch(this,function(){e.resolve(!1)}));return e.promise},
_addProjectToLayer:function(a,b){var c,e;c=new p;e=new B;e.attributes=0<this.projectLayer.templates.length?this.projectLayer.templates[0].prototype.attributes:this.projectLayer.types[0].templates[0].prototype.attributes;e.attributes[this.projectNameField]=a;e.attributes[this.projectDescField]=b;this.projectLayer.applyEdits([e],null,null,d.hitch(this,function(a){this.selectedProjectFeatureAttr=e.attributes;c.resolve(a[0])}),function(a){c.reject(a)});return c.promise},_fetchWidgetTopNode:function(){var a,
b,c;this.domNode.parentNode&&(a=this.domNode.parentNode);a.parentNode&&(b=a.parentNode);b.parentNode&&(c=b.parentNode);c&&(this._widgetTopNode=c)},_instantiateUpdateProjectCostWidget:function(){this._updateProjectCostWidget=new L({nls:this.nls,projectNameOptions:this.projectNameOptions,widgetTopNode:this._widgetTopNode,layerInfosObj:this.layerInfosObj,config:this.config,map:this.map,loadingIndicator:this.loadingIndicator,widgetDomNode:this.widgetDomNode,updateLastFocusNode:this.updateLastFocusNode,
setTabindexOfUpdateProjectCost:this._setTabindexOfUpdateProjectCost},l.create("div",{},this.updateEquationContainer));this.own(k(this._updateProjectCostWidget,"updateProjectCostWidgetLoaded",d.hitch(this,function(){M.contains(this.updateEquationContainer.parentNode,"esriCTItemContentActive")?this._setTabindexOfUpdateProjectCost(!0,this.domNode):this._setTabindexOfUpdateProjectCost(!1,this.domNode)})));this._updateProjectCostWidget.startup()},_setTabindexOfUpdateProjectCost:function(a,b){var c=m(".esriCTProjectNameCheckBox",
b);c.forEach(d.hitch(this,function(d){a?(w.set(d,"tabindex","0"),c.length-1&&this.updateLastFocusNode(d,b)):(w.set(d,"tabindex","-1"),this._setUpdateCostEquationLastFocusNode(b))}))},_setUpdateCostEquationLastFocusNode:function(a){var b;b=m(".esriCTItemTitleContainer",a);this.updateLastFocusNode(b[2],a)},_resetHeight:function(){var a=z.getComputedStyle(this._widgetTopNode).height,a=parseFloat(a),a=a-28,b=m(".esriCTItemTitleContainer",this._widgetTopNode);h.forEach(b,d.hitch(this,function(b){b=z.getComputedStyle(b).height;
b=parseFloat(b);a-=b}));a-=30;z.set(this.updateEquationContainer,"height",a+"px")},_destroyUpdateCostEquationWidget:function(){this._updateProjectCostWidget&&this._updateProjectCostWidget.destroy();this._updateProjectCostWidget=null},_displayUpdateCostEquationWidget:function(){this.config.hasOwnProperty("updateCostEquationCheckBoxStatus")&&this.config.updateCostEquationCheckBoxStatus&&(this._resetHeight(),this._instantiateUpdateProjectCostWidget())},_deleteExistingLabelPoint:function(a,b,c,e){if(a&&
0<a.length){var f=this.map.getLayer(this.config.projectSettings.pointLayerCentroid),g=new v(f.url,{outFields:["*"]});g.onLoad=d.hitch(this,function(){var f=[];h.forEach(a,d.hitch(this,function(a){var b={};b[g.objectIdField]=a;a=new B(null,null,b,null);f.push(a)}));g.applyEdits(null,null,f,d.hitch(this,function(){this.map.getLayer(this.config.projectSettings.pointLayerCentroid).refresh();this._deleteDetailsRelatedToProject(b,c,e)}),d.hitch(this,function(){this._deleteDetailsRelatedToProject(b,c,e)}))})}else this._deleteDetailsRelatedToProject(b,
c,e)},_getRelatedLabelPoint:function(a,b,c){if(""!==this.config.projectSettings.pointLayerCentroid&&null!==this.config.projectSettings.pointLayerCentroid&&void 0!==this.config.projectSettings.pointLayerCentroid){var e,f=this.map.getLayer(this.config.projectSettings.pointLayerCentroid),g=new v(f.url,{outFields:["*"]});g.onLoad=d.hitch(this,function(){e=this._getFieldName(g,"projectid")+" \x3d '"+a+"'";var f=new n;f.where=e;g.queryIds(f,d.hitch(this,function(d){this._deleteExistingLabelPoint(d,a,b,
c)}),d.hitch(this,function(){this._deleteDetailsRelatedToProject(a,b,c)}))})}else this._deleteDetailsRelatedToProject(a,b,c)},_getFieldName:function(a,b){var c;h.forEach(a.fields,d.hitch(this,function(a){a.name.toLowerCase()===b.toLowerCase()&&(c=a.name)}));return c}})});