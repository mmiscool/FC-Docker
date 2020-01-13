$("#settings").hide();
$("#toolGroupEditor").hide();
$("#commands").hide();
$('#toolBarRightClickMenue').hide();
$('#fileManager').hide();
$('#pythonConsole').hide();

currentAplicationMode = "app";




async function runPythonConsole(shouldIRuntheCommand = true) {
  if (shouldIRuntheCommand == true) {
    $('#pythonCodeResponseAreaA').append(">>>" + $('#pythonCodeArea').val() + "\n");
    htmlTempString = await $.get("./cmd/python " + await $('#pythonCodeArea').val()) + "\n";
    $('#pythonCodeResponseAreaA').append(htmlTempString.replace("\n", "<br>"));
    $('#pythonCodeResponseAreaA').animate({ scrollTop: $('#pythonCodeResponseAreaA')[0].scrollHeight }, 200);
  }


  htmlTempString = await $.get("./files/FC-log1.log");
  $('#pythonCodeResponseAreaB').append(htmlTempString.replace("\n", "<br>"));
  $('#pythonCodeResponseAreaB').animate({ scrollTop: $('#pythonCodeResponseAreaB')[0].scrollHeight }, 200);

  // $('#pythonCodeResponseAreaC').html(await $.get("./files/FC-log2.log"));
  // $('#pythonCodeResponseAreaC').animate({ scrollTop: $('#pythonCodeResponseAreaC')[0].scrollHeight }, 200);

}




if (getUrlVars("autoconnect")) {
  window.history.pushState('FreeCAD', 'FreeCAD', '?autoconnect=true&reconnect=true&reconnect_delay=5000&resize=remote');
}


function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
    vars[key] = value;
  });
  return vars;
}


window.onresize = setResolution;

setTimeout(callAfterLoading, 1000);



var toolbarGlobalObject = {
  listOfIcons: [],
  commandList: [],
  workbenches: [],
  toolGroups: [],
};


Array.prototype.move = function(from, to) {
  this.splice(to, 0, this.splice(from, 1)[0]);
  return this;
};


async function createNewToolGroup() {
  //alert($("#newToolGroupName").val());
  newToolGroupName = prompt("Tool Group Name");

  toolbarGlobalObject.toolGroups.push({
    name: newToolGroupName,
    icons: [],
  });

}











async function groupListIconRightClick(x, y, e) {
  event.preventDefault();
  event.stopPropagation();
  $("#toolBarRightClickMenue").empty();
  //alert(e.pageX + "," + e.pageY);



  if (y !== null) {

    newButtonStuff = {
      onclick: "toolbarGlobalObject.toolGroups[" + x + "].icons.move(" + y + "," + y + "-1);buildToolGroupPalletDivs();",
      text: "Move icon <",
    };
    $('#toolBarRightClickMenue').append($('<button>', newButtonStuff));


    newButtonStuff = {
      onclick: "toolbarGlobalObject.toolGroups[" + x + "].icons.move(" + y + "," + y + "+1);buildToolGroupPalletDivs();",
      text: "Move icon >",
    };
    $('#toolBarRightClickMenue').append($('<button>', newButtonStuff));

    $('#toolBarRightClickMenue').append("<br>");

    newButtonStuff = {
      onclick: "toolbarGlobalObject.toolGroups[" + x + "].icons.splice(" + y + ",1);buildToolGroupPalletDivs();",
      text: "Remove Icon",
    };
    $('#toolBarRightClickMenue').append($('<button>', newButtonStuff));

    $('#toolBarRightClickMenue').append("<br>");


  }





  if (x !== null) {
    newButtonStuff = {
      onclick: "toolbarGlobalObject.toolGroups.move(" + x + "," + x + "-1);buildToolGroupPalletDivs();",
      text: "Move Group <",
    };
    $('#toolBarRightClickMenue').append($('<button>', newButtonStuff));


    newButtonStuff = {
      onclick: "toolbarGlobalObject.toolGroups.move(" + x + "," + x + "+1);buildToolGroupPalletDivs();",
      text: "Move Group >",
    };
    $('#toolBarRightClickMenue').append($('<button>', newButtonStuff));


    $('#toolBarRightClickMenue').append("<br>");

    newButtonStuff = {
      onclick: "toolbarGlobalObject.toolGroups.splice(" + x + ",1);buildToolGroupPalletDivs();",
      text: "Remove Group",
    };
    $('#toolBarRightClickMenue').append($('<button>', newButtonStuff));

    $('#toolBarRightClickMenue').append("<br>");
  }



  newButtonStuff = {
    onclick: "createNewToolGroup();buildToolGroupPalletDivs();",
    text: "Create Tool Group",
  };
  $('#toolBarRightClickMenue').append($('<button>', newButtonStuff));

  $('#toolBarRightClickMenue').append("<br>");



  newButtonStuff = {
    onclick: `
    						toolbarGlobalObject.toolGroups[` + x + `].name = prompt("New Group Name", toolbarGlobalObject.toolGroups[` + x + `].name);
    						buildToolGroupPalletDivs();
    						`,
    text: "Rename Tool Group",
  };
  $('#toolBarRightClickMenue').append($('<button>', newButtonStuff));

  $('#toolBarRightClickMenue').append("<br>");



  newButtonStuff = {
    onclick: `currentAplicationMode = "iconEditor";  loadIconPalletForSettings(); $("#settings").show(); $("#application").hide();buildToolGroupPalletDivs();`,
    text: "Edit Icons",
  };
  $('#toolBarRightClickMenue').append($('<button>', newButtonStuff));

  $('#toolBarRightClickMenue').append("<br>");




  newButtonStuff = {
    onclick: `
              toolbarGlobalObject.widthOfIcons = prompt("toolbar icon size in pixels", toolbarGlobalObject.widthOfIcons);
              buildToolGroupPalletDivs();
							`,
    text: "Set icon size",
  };
  $('#toolBarRightClickMenue').append($('<button>', newButtonStuff));

  $('#toolBarRightClickMenue').append("<br>");


  newButtonStuff = {
    onclick: `
								output = JSON.stringify(toolbarGlobalObject);
								
								var a = window.document.createElement('a');
								a.href = window.URL.createObjectURL(new Blob([output], {type: 'text/json'}));
								a.download = 'settings.json';
								
								// Append anchor to body.
								document.body.appendChild(a);
								a.click();
								
								// Remove anchor from body
								document.body.removeChild(a);
							`,
    text: "Save Toolbar configuration",
  };
  $('#toolBarRightClickMenue').append($('<button>', newButtonStuff));

  $('#toolBarRightClickMenue').append("<br>");






  $("#toolBarRightClickMenue").show();
  $("#toolBarRightClickMenue").css("left", e.pageX);
  $("#toolBarRightClickMenue").css("top", e.pageY);
  //toolbarGlobalObject.toolGroups[x].icons.splice(y, 1);






  //toolbarGlobalObject.toolGroups[x].icons.move(y,y-1);

  //buildToolGroupPalletDivs();
}


async function buildToolGroupPalletDivs() {
  $("#commandIcons").empty();
  $("#toolBarRightClickMenue").hide();


  localStorage.setItem('FC ICON SETTINGS', JSON.stringify(toolbarGlobalObject));


  if (toolbarGlobalObject.widthOfIcons < 10) toolbarGlobalObject.widthOfIcons = 40;
  widthOfIcons = toolbarGlobalObject.widthOfIcons;


  for (var x = 0; x < toolbarGlobalObject.toolGroups.length; x++) {
    currentGroup = toolbarGlobalObject.toolGroups[x];
    //console.log(currentGroup.name);
    currentGroup.name = currentGroup.name.replace(" ", "_");

    //need to create the div and calcualte width of div


    widthOfDivCalculated = widthOfIcons;
    if (currentGroup.icons.length > 0) {
      widthOfDivCalculated = widthOfDivCalculated * Math.ceil((currentGroup.icons.length) / Math.floor(120 / widthOfDivCalculated));
    }


    tooGroupDiv = {
      id: "toolGroup_" + currentGroup.name,
      alt: currentCommand.command,
      style: "border-style: dotted;overflow:hidden; white-space:wrap; display: inline-block; height:145px;width:" + widthOfDivCalculated + "px;",
      ondrop: "event.preventDefault();catchDropIconToGroup(" + x + ");",
      ondragover: "event.preventDefault();",
      oncontextmenu: "groupListIconRightClick(" + x + ",null , event);",
    };



    $('#commandIcons').append($('<div>', tooGroupDiv));

    $('#toolGroup_' + currentGroup.name).html(currentGroup.name + "<br>");

    iconRosCreated = 1;
    for (var i = 0; i < currentGroup.icons.length; i++) {
      currentIcon = currentGroup.icons[i];
      //console.log(currentIcon);

      //needs to be worked out how to get the command from the command name
      currentCommand = await toolbarGlobalObject.commandList.find(obj => { return obj.command === currentIcon });
      //alert(JSON.stringify(currentCommand));


      commandButtonSettings = {
        id: '',
        alt: currentCommand.command,
        src: 'icons/' + currentCommand.iconFile + '.svg',
        onclick: "doCommand('" + currentCommand.command + "')",
        style:"white-space:wrap;",
        title: currentCommand.toolTip,
        width: widthOfIcons + "px",
        height: widthOfIcons + "px",
        oncontextmenu: "groupListIconRightClick(" + x + "," + i + ", event);",
      };


      if (widthOfIcons * i == widthOfDivCalculated * iconRosCreated ) {
        $('#toolGroup_' + currentGroup.name).append("<br>");
        iconRosCreated++;
      }
      

      $('#toolGroup_' + currentGroup.name).append($('<img>', commandButtonSettings));
      //---------------------------------


    }

  }
}




async function findWithAttr(array, attr, value) {
  for (var i = 0; i < array.length; i += 1) {
    if (array[i][attr] === value) {
      return i;
    }
  }
  return -1;
}


toolGroupBeingDragged = null;
currentPaletIconBeingDragged = null



async function catchDropIconToGroup(tooGroupToAddIconTo) {
  if (currentPaletIconBeingDragged !== null) {
    toolbarGlobalObject.toolGroups[tooGroupToAddIconTo].icons.push(toolbarGlobalObject.commandList[currentPaletIconBeingDragged].command);
  }


  buildToolGroupPalletDivs();


}














async function editCommandIcon(commandToEdit) {
  //alert(commandToEdit + "   ," + JSON.stringify(toolbarGlobalObject.commandList[commandToEdit]));

  $("#commandEditor_id").val(commandToEdit);
  $("#commandEditor_command").val(toolbarGlobalObject.commandList[commandToEdit].command);
  $("#commandEditor_iconFile").val(toolbarGlobalObject.commandList[commandToEdit].iconFile);
  $("#commandEditor_toolTip").val(toolbarGlobalObject.commandList[commandToEdit].toolTip);



}


iconPalletAlreadyLoaded = false;
async function loadIconPalletForSettings() {
  if (!iconPalletAlreadyLoaded) {
    $('#iconPalletForSettings').empty();
    iconPalletAlreadyLoaded = true;
    iconlist = await $.get('/icons/list.txt');
    toolbarGlobalObject.listOfIcons = iconlist.replace(/\r\n/g, "\n").split("\n");


    for (var i = 0; i < toolbarGlobalObject.listOfIcons.length; i++) {
      currentIcon = toolbarGlobalObject.listOfIcons[i];
      $('#iconPalletForSettings').append($('<img>', {
        id: '',
        alt: currentIcon,
        src: 'icons/' + currentIcon,
        onclick: "$('#commandEditor_iconFile').val('" + currentIcon.replace(".svg", "") + "')",
        title: currentIcon,
        width: "40px",
        height: "40px",
      }));
    }
  }


}








async function callAfterLoading() {
  //alert("doing the set up");


  //await $("#application").load('./vnc.html');



  await $("#application").load('./vnc.html', function(responseTxt, statusTxt, xhr) {

    $("#noVNC_control_bar_anchor").hide();
    $("#noVNC_container").css('border-bottom-right-radius', 0);
    $("body").css('background-color', "white");





    if (statusTxt == "error")
      alert("Error: " + xhr.status + ": " + xhr.statusText);
  });


  setResolution();


  settingsFromBrowserStorage = localStorage.getItem('FC ICON SETTINGS');
  //alert(settingsFromBrowserStorage);
  if (settingsFromBrowserStorage) {
    toolbarGlobalObject = await JSON.parse(await localStorage.getItem('FC ICON SETTINGS'));
  }
  else {
    console.log("No user settings present. Loading from settings file on server");
    toolbarGlobalObject = await $.get('/files/settings.json');
  }

  //loadIconPalletForSettings();

  showCommads();
  buildToolGroupPalletDivs();




}

async function setResolution() {
  yyy = parseInt($("#application").height()) - 1;
  xxx = parseInt($("#application").width()) - 1;
  await $.get('/res/' + '~xrandr --fb ' + xxx + 'x' + yyy);
}


async function doCommand(commandToDo) {
  if (currentAplicationMode == "iconEditor") {
    editCommandIcon(await findWithAttr(toolbarGlobalObject.commandList, "command", commandToDo));
  }
  else {
    if ($("#noVNC_keyboardinput").length) {
      $("#noVNC_keyboardinput").focus();
    }
    else {
      $("canvas").get(0).focus();
    }




    commandToDo = commandToDo.replace("@", "");
    bla = await $.get('/cmd/' + commandToDo);
    //alert(bla);
    if (bla.toUpperCase().indexOf("ERROR") > -1) alert(bla);
  }
}





async function showCommads() {
  $("#commands").empty();
  $("#commandIcons").empty();
  $('#commandsEditorList').empty();


  for (var i = 0; i < toolbarGlobalObject.commandList.length; i++) {
    currentCommand = toolbarGlobalObject.commandList[i];

    $('#commands').append('<option value="' + toolbarGlobalObject.commandList[i].command + ' ">' + toolbarGlobalObject.commandList[i].command + '</option>');



    if (currentCommand.iconFile == "") currentCommand.iconFile = "mouse_pointer";

    commandButtonSettings = {
      id: '',
      alt: currentCommand.command,
      src: 'icons/' + currentCommand.iconFile + '.svg',
      onclick: "doCommand('" + currentCommand.command + "')",
      title: currentCommand.toolTip,
      width: "40px",
      height: "40px",
      draggabl: true,
      ondragstart: "currentPaletIconBeingDragged = " + i + "; ",

    };

    //$('#commandIcons').append($('<img>', commandButtonSettings));

    commandButtonSettings.onclick = "editCommandIcon('" + i + "')"


    $('#commandsEditorList').append($('<img>', commandButtonSettings));
    $('#commandsEditorList').append(currentCommand.command + "<br>");

  }

}








async function saveCommandIcon() {

  //alert(JSON.stringify(toolbarGlobalObject.commandList.find(obj => {return obj.command === 'Arch_Component'})));

  commandToEdit = $("#commandEditor_id").val();
  toolbarGlobalObject.commandList[commandToEdit].command = $("#commandEditor_command").val();
  toolbarGlobalObject.commandList[commandToEdit].iconFile = $("#commandEditor_iconFile").val();
  toolbarGlobalObject.commandList[commandToEdit].toolTip = $("#commandEditor_toolTip").val();

  showCommads();
  buildToolGroupPalletDivs();
}












toolbarGlobalObject.listOfIcons = [
  "3D_Printing_Tools_workbench_icon",
  "accessories-calculator",
  "accessories-text-editor",
  "AddonManager",
  "AirPlaneDesign_workbench_icon",
  "aluminium",
  "angularity",
  "ANSIB_Portrait",
  "ANSIB",
  "application-exit",
  "applications-accessories",
  "applications-python",
  "Arch_3Views",
  "Arch_Add",
  "Arch_Axis",
  "Arch_Axis_System",
  "Arch_Axis_System_Tree",
  "Arch_Axis_Tree",
  "Arch_Bimserver",
  "Arch_BuildingPart",
  "Arch_BuildingPart_Tree",
  "Arch_Building",
  "Arch_Building_Tree",
  "Arch_Cell",
  "Arch_Cell_Tree",
  "Arch_Check",
  "Arch_CloseHoles",
  "Arch_Component_Clone",
  "Arch_Component",
  "Arch_CutLine",
  "Arch_CutPlane",
  "Arch_Equipment_Clone",
  "Arch_Equipment",
  "Arch_Equipment_Tree",
  "Arch_Fence",
  "Arch_Fence_Tree",
  "Arch_Fixture",
  "Arch_Floor",
  "Arch_Floor_Tree",
  "Arch_Frame",
  "Arch_Frame_Tree",
  "Arch_Grid",
  "Arch_Material_Group",
  "Arch_Material_Multi",
  "Arch_Material",
  "Arch_MergeWalls",
  "Arch_MeshToShape",
  "Arch_Nest",
  "Arch_Panel_Clone",
  "Arch_Panel_Cut",
  "Arch_Panel_Sheet",
  "Arch_Panel",
  "Arch_Panel_Tree",
  "Arch_PipeConnector",
  "Arch_Pipe",
  "Arch_Pipe_Tree",
  "Arch_Profile",
  "Arch_Project",
  "Arch_Project_Tree",
  "Arch_Rebar",
  "Arch_Rebar_Tree",
  "Arch_Reference",
  "Arch_RemoveShape",
  "Arch_Remove",
  "Arch_Roof",
  "Arch_Roof_Tree",
  "Arch_Schedule",
  "Arch_SectionPlane",
  "Arch_SectionPlane_Tree",
  "Arch_SelectNonManifold",
  "Arch_Site",
  "Arch_Site_Tree",
  "Arch_Space_Clone",
  "Arch_Space",
  "Arch_Space_Tree",
  "Arch_SplitMesh",
  "Arch_Stairs",
  "Arch_Stairs_Tree",
  "Arch_StructuralSystem",
  "Arch_StructuralSystem_Tree",
  "Arch_Structure_Clone",
  "Arch_Structure",
  "Arch_Structure_Tree",
  "Arch_Subcomponent",
  "Arch_Survey",
  "ArchTextures_workbench_icon",
  "Arch_ToggleIfcBrepFlag",
  "Arch_ToggleSubs",
  "Arch_Wall_Clone",
  "Arch_Wall",
  "Arch_Wall_Tree_Assembly",
  "Arch_Wall_Tree",
  "Arch_Window_Clone",
  "Arch_Window",
  "Arch_Window_Tree",
  "ArchWorkbench",
  "arrow-ccw",
  "arrow-cw",
  "arrowdot",
  "arrow-down",
  "arrowfilled",
  "arrowfork",
  "arrow-left-down",
  "arrow-left",
  "arrow-left-up",
  "arrowopendot",
  "arrowopen",
  "arrowpyramid",
  "arrow-right-down",
  "arrow-right",
  "arrow-right-up",
  "arrowtick",
  "arrow-up",
  "Assembly4_workbench_icon",
  "Assembly_Add_Existing_Part",
  "Assembly_Add_New_Part",
  "Assembly_Assembly_Constraints_Tree",
  "Assembly_Assembly_Create_New",
  "Assembly_Assembly_Part_Tree",
  "Assembly_Assembly_Tree",
  "Assembly_ConstraintAlignment",
  "Assembly_ConstraintAngle",
  "Assembly_ConstraintBidirectional",
  "Assembly_ConstraintCoincidence",
  "Assembly_ConstraintDistance",
  "Assembly_ConstraintEqual",
  "Assembly_ConstraintGeneral",
  "Assembly_ConstraintLock",
  "Assembly_ConstraintOpposite",
  "Assembly_ConstraintOrientation",
  "Assembly_ConstraintParallel",
  "Assembly_ConstraintPerpendicular",
  "Assembly_ConstraintUnidirectional1",
  "Assembly_ConstraintUnidirectional2",
  "Assembly_Demo",
  "AssemblyWorkbench",
  "Axes",
  "Axle_constraint",
  "background_freecad_dark",
  "background_freecad_light",
  "background_freecad",
  "BCFPlugin_workbench_icon",
  "beadDown",
  "beadUp",
  "BezSurf",
  "bgColor",
  "BIMBots_workbench_icon",
  "BIM_workbench_icon",
  "BOLTSFC_workbench_icon",
  "bound-expression",
  "bound-expression-unset",
  "branch_end_closed_dark",
  "branch_end_closed_light",
  "branch_end_dark",
  "branch_end_light",
  "branch_end_open_dark",
  "branch_end_open_light",
  "branch_more_closed_dark",
  "branch_more_closed_light",
  "branch_more_dark",
  "branch_more_light",
  "branch_more_open_dark",
  "branch_more_open_light",
  "branch_vline_dark",
  "branch_vline_light",
  "breakpoint",
  "brick01",
  "BSplineSurf",
  "bulb",
  "button_add_all",
  "button_down",
  "button_invalid",
  "button_left",
  "button_right",
  "button_sort",
  "button_up",
  "button_valid",
  "CADExchanger_workbench_icon",
  "cadquery_module_workbench_icon",
  "camera-photo",
  "CfdOF_workbench_icon",
  "chamfer",
  "checkbox_indeterminate_light",
  "checkbox_light",
  "circularity",
  "circular run-out",
  "circular",
  "close_dark",
  "close_light",
  "CloudWorkbench",
  "colors",
  "CompleteWorkbench",
  "concentricity",
  "concrete",
  "const_member",
  "Constraint_Concentric",
  "Constraint_Diameter_Driven",
  "Constraint_Diameter",
  "Constraint_Ellipse_Axis_Angle",
  "Constraint_Ellipse_Major_Radius",
  "Constraint_Ellipse_Minor_Radius",
  "Constraint_Ellipse_Radii",
  "Constraint_EqualLength",
  "Constraint_ExternalAngle",
  "Constraint_HorizontalDistance_Driven",
  "Constraint_HorizontalDistance",
  "Constraint_Horizontal",
  "Constraint_InternalAlignment_Ellipse_Focus1",
  "Constraint_InternalAlignment_Ellipse_Focus2",
  "Constraint_InternalAlignment_Ellipse_MajorAxis",
  "Constraint_InternalAlignment_Ellipse_MinorAxis",
  "Constraint_InternalAlignment",
  "Constraint_InternalAngle_Driven",
  "Constraint_InternalAngle",
  "Constraint_Length_Driven",
  "Constraint_Length",
  "Constraint_Parallel",
  "Constraint_Perpendicular",
  "Constraint_PointOnEnd",
  "Constraint_PointOnMidPoint",
  "Constraint_PointOnObject",
  "Constraint_PointOnPoint",
  "Constraint_PointOnStart",
  "Constraint_PointToObject",
  "Constraint_Radius_Driven",
  "Constraint_Radius",
  "Constraint_SnellsLaw_Driven",
  "Constraint_SnellsLaw",
  "Constraint_Symmetric",
  "Constraint_Tangent",
  "Constraint_TangentToEnd",
  "Constraint_TangentToStart",
  "Constraint_VerticalDistance_Driven",
  "Constraint_VerticalDistance",
  "Constraint_Vertical",
  "cross",
  "cuprous",
  "CurvedShapes_workbench_icon",
  "Curves_workbench_icon",
  "cylindricity",
  "DAGViewerDesign",
  "dagViewFail",
  "dagViewPass",
  "dagViewPending",
  "dagViewVisible",
  "debug-marker",
  "debug-start",
  "debug-stop",
  "Defeaturing_workbench_icon",
  "delete",
  "DesignSPHysics_workbench_icon",
  "diagonal1",
  "diagonal2",
  "document-new",
  "document-open",
  "document-package",
  "document-print-preview",
  "document-print",
  "document-properties",
  "document-python",
  "document-save-as",
  "document-save",
  "Document",
  "dodo_workbench_icon",
  "down_arrow_darker",
  "down_arrow_dark",
  "down_arrow_disabled_dark",
  "down_arrow_disabled_light",
  "down_arrow_lighter",
  "down_arrow_light",
  "Draft_2DShapeView",
  "Draft_AddPoint",
  "Draft_AddToGroup",
  "Draft_Apply",
  "Draft_Arc_3Points",
  "Draft_Arc",
  "Draft_Array",
  "Draft_AutoGroup_off",
  "Draft_AutoGroup_on",
  "Draft_AutoGroup",
  "Draft_BezCurve",
  "Draft_BezSharpNode",
  "Draft_BezSymNode",
  "Draft_BezTanNode",
  "Draft_BSpline",
  "Draft_Circle",
  "Draft_Clone",
  "Draft_Construction",
  "Draft_CubicBezCurve",
  "Draft_Cursor",
  "Draft_DelPoint",
  "Draft_Dimension",
  "Draft_Dimension_Tree",
  "Draft_Dot",
  "Draft_Downgrade",
  "Draft_Draft2Sketch",
  "Draft_Draft",
  "Draft_Drawing",
  "Draft_Edit",
  "Draft_Ellipse",
  "Draft_Facebinder_Provider",
  "Draft_Facebinder",
  "Draft_Fillet",
  "Draft_Finish",
  "Draft_FlipDimension",
  "Draft_Grid",
  "Draft_Heal",
  "Draft_Join",
  "Draft_Label",
  "Draft_Layer",
  "Draft_Line",
  "Draft_LinkArray",
  "Draft_Lock",
  "Draft_Macro",
  "Draft_Mirror",
  "Draft_Move",
  "Draft_Offset",
  "Draft_PathArray",
  "Draft_PathLinkArray",
  "Draft_PointArray",
  "Draft_Point",
  "Draft_Polygon",
  "Draft_Rectangle",
  "Draft_Rotate",
  "Draft_Scale",
  "Draft_SelectGroup",
  "Draft_SelectPlane",
  "Draft_ShapeString",
  "Draft_Slope",
  "Draft_Snap",
  "Draft_Split",
  "Draft_Stretch",
  "Draft_SubelementHighlight",
  "Draft_SwitchMode",
  "Draft_Text",
  "Draft_Trimex",
  "Draft_Upgrade",
  "Draft_VisGroup",
  "Draft_Wipe",
  "Draft_Wire",
  "Draft_WireToBSpline",
  "DraftWorkbench",
  "drawing-annotation",
  "drawing-clip",
  "drawing-draft-view",
  "drawing-landscape-A0",
  "drawing-landscape-A1",
  "drawing-landscape-A2",
  "drawing-landscape-A3",
  "drawing-landscape-A4",
  "drawing-landscape-new",
  "drawing-landscape",
  "drawing-openbrowser",
  "drawing-orthoviews",
  "drawing-portrait-A0",
  "drawing-portrait-A1",
  "drawing-portrait-A2",
  "drawing-portrait-A3",
  "drawing-portrait-A4",
  "drawing-spreadsheet",
  "drawing-symbol",
  "drawing-view",
  "DrawingWorkbench",
  "DrawStyleAsIs",
  "DrawStyleFlatLines",
  "DrawStylePoints",
  "DrawStyleShaded",
  "DrawStyleWireFrame",
  "drill",
  "DynamicData_workbench_icon",
  "earth",
  "edge-join-miter-not",
  "edge-join-miter",
  "edge-join-round-not",
  "edge-join-round",
  "edit_Cancel",
  "edit-cleartext",
  "edit-copy",
  "edit-cut",
  "edit-delete",
  "edit-edit",
  "edit-element-select-box",
  "edit_OK",
  "edit-paste",
  "edit-redo",
  "edit-select-all",
  "edit-select-box",
  "edit-undo",
  "EM_workbench_icon",
  "endmill",
  "ExplodedAssembly_workbench_icon",
  "fasteners_workbench_icon",
  "FCGear_workbench_icon",
  "Feature",
  "fem-add-fem-mesh",
  "fem-add-material",
  "fem-add-part",
  "fem-analysis",
  "fem-clipping-plane-add",
  "fem-clipping-plane-remove-all",
  "fem-constraint-bearing",
  "fem-constraint-contact",
  "fem-constraint-displacement",
  "fem-constraint-electrostatic-potential",
  "fem-constraint-fixed",
  "fem-constraint-flow-velocity",
  "fem-constraint-fluid-boundary",
  "fem-constraint-force",
  "fem-constraint-gear",
  "fem-constraint-heatflux",
  "fem-constraint-initial-flow-velocity",
  "fem-constraint-InitialTemperature",
  "fem-constraint-planerotation",
  "fem-constraint-pressure",
  "fem-constraint-pulley",
  "fem-constraint-selfweight",
  "fem-constraint-temperature",
  "fem-constraint-transform",
  "fem-element-fluid-1d",
  "fem-element-geometry-1d",
  "fem-element-geometry-2d",
  "fem-element-rotation-1d",
  "fem-equation-elasticity",
  "fem-equation-electrostatic",
  "fem-equation-flow",
  "fem-equation-fluxsolver",
  "fem-equation-heat",
  "fem-femmesh-boundary-layer",
  "fem-femmesh-clear-mesh",
  "fem-femmesh-create-node-by-poly",
  "fem-femmesh-from-shape",
  "fem-femmesh-gmsh-from-shape",
  "fem-femmesh-netgen-from-shape",
  "fem-femmesh-print-info",
  "fem-femmesh-region",
  "fem-femmesh-result",
  "fem-femmesh-to-mesh",
  "fem-material-fluid",
  "fem-material-nonlinear",
  "fem-material-reinforced",
  "fem-material",
  "fem-post-data-pipline",
  "fem-post-filter-clip-region",
  "fem-post-filter-clip-scalar",
  "fem-post-filter-cut-function",
  "fem-post-filter-data-along-line",
  "fem-post-filter-data-at-point",
  "fem-post-filter-linearized-stresses",
  "fem-post-filter-warp",
  "fem-post-geo-box",
  "fem-post-geo-cylinder",
  "fem-post-geo-isosurface",
  "fem-post-geo-plane",
  "fem-post-geo-sphere",
  "fem-post-result-show",
  "fem-post-results-purge",
  "fem-solver-analysis-frequency",
  "fem-solver-analysis-static",
  "fem-solver-analysis-thermomechanical",
  "fem-solver-cfd",
  "fem-solver-control",
  "fem-solver-elmer",
  "fem-solver-inp-editor",
  "fem-solver-run",
  "fem-solver-standard",
  "FemWorkbench",
  "fgColor",
  "filletDown",
  "filletUp",
  "FitSurface",
  "flamingo_workbench_icon",
  "flatness_editable",
  "flatness",
  "folder",
  "freecad-doc",
  "freecad",
  "GDT_workbench_icon",
  "general_steel",
  "Geofeaturegroup",
  "Geomatics_workbench_icon",
  "Git",
  "glass",
  "Grid",
  "Group",
  "hatch45L",
  "hatch45R",
  "hbone",
  "help-browser",
  "hexagon",
  "Hmovetoolbar_dark",
  "Hmovetoolbar_light",
  "HowToExample",
  "Hsepartoolbar_dark",
  "Hsepartoolbar_light",
  "Icon",
  "IFC",
  "Image_CreateImagePlane",
  "Image_Open",
  "Image_Scaling",
  "ImageWorkbench",
  "indentLess",
  "indentMore",
  "insertImage",
  "inspection",
  "InspectionWorkbench",
  "inspect_pipette",
  "internet-web-browser",
  "InventorLoader_workbench_icon",
  "Invisible",
  "kicadStepUpMod_workbench_icon",
  "Labels",
  "Landscape_A0",
  "Landscape_A1",
  "Landscape_A2",
  "Landscape_A3",
  "Landscape_A4_NotInGOST",
  "Landscape_A4",
  "lattice2_workbench_icon",
  "LCInterlocking_workbench_icon",
  "left_arrow_darker",
  "left_arrow_dark",
  "left_arrow_disabled_dark",
  "left_arrow_disabled_light",
  "left_arrow_lighter",
  "left_arrow_light",
  "Legend",
  "line",
  "LinkArray",
  "LinkElement",
  "LinkGroup",
  "LinkImportAll",
  "LinkImport",
  "LinkReplace",
  "LinkSelectAll",
  "LinkSelectFinal",
  "LinkSelect",
  "LinkSub",
  "Link",
  "list-add",
  "listBullet",
  "listNumber",
  "list-remove",
  "list.txt",
  "Lithophane_workbench_icon",
  "MacroEditor",
  "Manipulator_workbench_icon",
  "Material",
  "media-playback-start",
  "media-playback-stop",
  "media-record",
  "member",
  "menu",
  "mesh_boundary",
  "Mesh_Cone",
  "Mesh_Cube",
  "Mesh_Curvature_Plot",
  "mesh_cut",
  "Mesh_Cylinder",
  "Mesh_Ellipsoid",
  "Mesh_Export_Mesh",
  "MeshFace",
  "Mesh_Flip_Normals",
  "Mesh_Harmonize_Normals",
  "Mesh_Import_Mesh",
  "Mesh_Mesh_from_Shape",
  "mesh_pipette",
  "Mesh_Regular_Solid",
  "MeshRemodel_workbench_icon",
  "Mesh_Remove_Components",
  "Mesh_Sphere",
  "Mesh_Torus",
  "Mesh_Tree_Curvature_Plot",
  "MeshWorkbench",
  "method",
  "MOOC_workbench_icon",
  "more_dark",
  "more_light",
  "mouse_pointer",
  "NavigationBlender_PanAlt",
  "NavigationBlender_Pan",
  "NavigationBlender_Rotate",
  "NavigationBlender_Select",
  "NavigationBlender",
  "NavigationBlender_Zoom",
  "NavigationCADAlt",
  "NavigationCAD_Pan",
  "NavigationCAD_RotateAlt",
  "NavigationCAD_Rotate",
  "NavigationCAD_Select",
  "NavigationCAD",
  "NavigationCAD_Zoom",
  "NavigationGesture_Pan",
  "NavigationGesture_PanTouchAlt",
  "NavigationGesture_PanTouch",
  "NavigationGesture_RotateAlt",
  "NavigationGesture_Rotate",
  "NavigationGesture_RotateTouch",
  "NavigationGesture_Select",
  "NavigationGesture_SelectTouch",
  "NavigationGesture",
  "NavigationGesture_Tilt",
  "NavigationGesture_TiltTouch",
  "NavigationGesture_Zoom",
  "NavigationGesture_ZoomTouch",
  "NavigationMayaGesture_Pan",
  "NavigationMayaGesture_PanTouchAlt",
  "NavigationMayaGesture_PanTouch",
  "NavigationMayaGesture_Rotate",
  "NavigationMayaGesture_RotateTouch",
  "NavigationMayaGesture_Select",
  "NavigationMayaGesture_SelectTouch",
  "NavigationMayaGesture",
  "NavigationMayaGesture_Tilt",
  "NavigationMayaGesture_TiltTouch",
  "NavigationMayaGesture_ZoomAlt",
  "NavigationMayaGesture_Zoom",
  "NavigationMayaGesture_ZoomTouch",
  "NavigationOpenCascade_PanAlt",
  "NavigationOpenCascade_Pan",
  "NavigationOpenCascade_Rotate",
  "NavigationOpenCascade_Select",
  "NavigationOpenCascade",
  "NavigationOpenCascade_ZoomAlt",
  "NavigationOpenCascade_Zoom",
  "NavigationOpenInventor_Pan",
  "NavigationOpenInventor_Rotate",
  "NavigationOpenInventor_Select",
  "NavigationOpenInventor",
  "NavigationOpenInventor_ZoomAlt",
  "NavigationOpenInventor_Zoom",
  "NavigationRevit_Pan",
  "NavigationRevit_Rotate",
  "NavigationRevit",
  "NavigationTouchpad_Pan",
  "NavigationTouchpad_PanTouch",
  "NavigationTouchpad_RotateAlt",
  "NavigationTouchpad_Rotate",
  "NavigationTouchpad_RotateTouchAlt",
  "NavigationTouchpad_RotateTouch",
  "NavigationTouchpad_Select",
  "NavigationTouchpad_SelectTouch",
  "NavigationTouchpad",
  "NavigationTouchpad_ZoomAlt",
  "NavigationTouchpad_Zoom",
  "NavigationTouchpad_ZoomTouch",
  "NavigationUndefined",
  "new_file_thumbnail",
  "none",
  "OpenSCAD_AddOpenSCADElement",
  "OpenSCAD_ColorCodeShape",
  "OpenSCAD_Explode_Group",
  "OpenSCAD_Hull",
  "OpenSCAD_IncreaseToleranceFeature",
  "OpenSCAD_MeshBooleans",
  "OpenSCAD_Minkowski",
  "OpenSCAD_RefineShapeFeature",
  "OpenSCAD_RemoveSubtree",
  "OpenSCAD_ReplaceObject",
  "OpenSCADWorkbench",
  "org.freecadweb.FreeCAD",
  "Pages",
  "Page",
  "parallelism",
  "Param_Bool",
  "ParametersBeam",
  "ParametersDent",
  "ParametersDoorGlass",
  "ParametersDoorSimple",
  "ParametersIbeam",
  "ParametersPanel",
  "ParametersPillar",
  "ParametersSlab",
  "ParametersStairs",
  "ParametersWindowDouble",
  "ParametersWindowFixed",
  "ParametersWindowSimple",
  "ParametersWindowStash",
  "Param_Float",
  "Param_Int",
  "Param_Text",
  "Param_UInt",
  "Part_Attachment",
  "Part_BooleanFragments",
  "Part_Booleans",
  "Part_BoxSelection",
  "Part_Box",
  "Part_Chamfer",
  "Part_CheckGeometry",
  "Part_Circle_Parametric",
  "Part_Common",
  "Part_CompoundFilter",
  "Part_Compound",
  "Part_Cone",
  "Part_CreatePrimitives",
  "Part_CrossSections",
  "Part_Cut",
  "Part_Cylinder",
  "Part_Defeaturing",
  "PartDesign_Additive_Box",
  "PartDesign_Additive_Cone",
  "PartDesign_Additive_Cylinder",
  "PartDesign_Additive_Ellipsoid",
  "PartDesign_Additive_Loft",
  "PartDesign_Additive_Pipe",
  "PartDesign_Additive_Prism",
  "PartDesign_Additive_Sphere",
  "PartDesign_Additive_Torus",
  "PartDesign_Additive_Wedge",
  "PartDesign_BaseFeature",
  "PartDesign_Body_old",
  "PartDesign_Body",
  "PartDesign_Body_Tree",
  "PartDesign_Boolean",
  "PartDesign_Chamfer",
  "PartDesign_Clone",
  "PartDesign_CoordinateSystem",
  "PartDesign_Draft",
  "PartDesign_Fillet",
  "PartDesign_Groove",
  "PartDesign_Hole",
  "PartDesign_InternalExternalGear",
  "PartDesign_InvoluteGear",
  "PartDesign_LinearPattern",
  "PartDesign_Line",
  "PartDesign_Mirrored",
  "PartDesign_MoveTip",
  "PartDesign_MultiTransform",
  "PartDesign_Pad",
  "PartDesign_Plane",
  "PartDesign_Pocket",
  "PartDesign_Point",
  "PartDesign_PolarPattern",
  "PartDesign_Revolution",
  "PartDesign_Scaled",
  "PartDesign_ShapeBinder",
  "PartDesign_SubShapeBinder",
  "PartDesign_Subtractive_Box",
  "PartDesign_Subtractive_Cone",
  "PartDesign_Subtractive_Cylinder",
  "PartDesign_Subtractive_Ellipsoid",
  "PartDesign_Subtractive_Loft",
  "PartDesign_Subtractive_Pipe",
  "PartDesign_Subtractive_Prism",
  "PartDesign_Subtractive_Sphere",
  "PartDesign_Subtractive_Torus",
  "PartDesign_Subtractive_Wedge",
  "PartDesign_Thickness",
  "PartDesignWorkbench",
  "Part_Element_Copy",
  "Part_Ellipse_Parametric",
  "Part_ExplodeCompound",
  "Part_Export",
  "Part_Extrude",
  "Part_FeatureImport",
  "Part_Feature",
  "Part_Fillet",
  "Part_Fuse",
  "Part_Helix_Parametric",
  "Part_Import",
  "Part_JoinBypass",
  "Part_JoinConnect",
  "Part_JoinCutout",
  "Part_JoinEmbed",
  "Part_Line_Parametric",
  "Part_Loft",
  "Part_Measure_Angular",
  "Part_Measure_Clear_All",
  "Part_Measure_Linear",
  "Part_Measure_Refresh",
  "Part_Measure_Step_Active",
  "Part_Measure_Step_Done",
  "Part_Measure_Toggle_3d",
  "Part_Measure_Toggle_All",
  "Part_Measure_Toggle_Delta",
  "Part_Mirror",
  "Part_Offset2D",
  "Part_Offset",
  "Part-o-magic_workbench_icon",
  "Part_Point_Parametric",
  "Part_Points_from_Mesh",
  "Part_Polygon_Parametric",
  "Part_ProjectionOnSurface",
  "Part_Refine_Shape",
  "Part_Revolve",
  "Part_RuledSurface",
  "Part_Section",
  "Part_Shapebuilder",
  "Part_Shape_from_Mesh",
  "Part_ShapeInfo",
  "Part_SliceApart",
  "Part_Slice",
  "Part_Sphere",
  "Part_Spiral_Parametric",
  "Part_Spline_Parametric",
  "Part_Sweep",
  "Part_Thickness",
  "Part_Torus",
  "Part_Transformed_Copy",
  "PartWorkbench",
  "Part_XOR",
  "Path-3DPocket",
  "Path-3DSurface",
  "Path-Adaptive",
  "Path-Area",
  "Path-Area-View",
  "Path-Area-Workplane",
  "Path-Array",
  "Path-Axis",
  "Path-BaseGeometry",
  "Path-BFastForward",
  "Path-BPause",
  "Path-BPlay",
  "Path-BStep",
  "Path-BStop",
  "Path-Comment",
  "Path-Compound",
  "Path-Contour",
  "Path-Copy",
  "Path-Custom",
  "Path-Datums",
  "Path-Deburr",
  "Path-Depths",
  "Path-Dressup",
  "Path-Drilling",
  "Path-Engrave",
  "Path-ExportTemplate",
  "Path-FacePocket",
  "Path-FaceProfile",
  "Path-Face",
  "Path-Heights",
  "Path-Helix",
  "Path-Holding",
  "Path-Hop",
  "Path-InactiveOp",
  "Path-Inspect",
  "Path-Job",
  "Path-Kurve",
  "Path-LengthOffset",
  "Path-MachineLathe",
  "Path-MachineMill",
  "Path-Machine",
  "Path-Machine-test1",
  "Path-OpActive",
  "Path-OpCopy",
  "Path-OperationA",
  "Path-OperationB",
  "Path-Plane",
  "Path-Pocket",
  "Path-Post",
  "Path-Profile-Edges",
  "Path-Profile-Face",
  "Path-Profile",
  "Path-Sanity",
  "Path-SelectLoop",
  "Path-SetupSheet",
  "Path-Shape",
  "Path-SimpleCopy",
  "Path-Simulator",
  "Path-Speed",
  "Path-Stock",
  "Path-Stop",
  "Path-Tags",
  "Path-ToolBit",
  "Path-ToolChange",
  "Path-ToolController",
  "Path-ToolDuplicate",
  "Path-Toolpath",
  "Path-ToolTable",
  "PathWorkbench",
  "perpendicularity",
  "plastic",
  "Plot_workbench_icon",
  "PlotWorkbench",
  "plug",
  "plus",
  "Points_Export_Point_cloud",
  "Points_Import_Point_cloud",
  "PointsWorkbench",
  "PolygonPick",
  "Portrait_A0",
  "Portrait_A1",
  "Portrait_A2",
  "Portrait_A3",
  "Portrait_A4",
  "Positions",
  "position",
  "preferences-arch",
  "preferences-display",
  "preferences-draft",
  "preferences-fem",
  "preferences-general",
  "preferences-import-export",
  "preferences-openscad",
  "preferences-part_design",
  "preferences-path",
  "preferences-raytracing",
  "preferences-start",
  "preferences-system",
  "preferences-techdraw",
  "preview-rendered",
  "preview-vector",
  "process-stop",
  "profile of line",
  "profile of surface",
  "property",
  "px",
  "pyrate_workbench_icon",
  "Python",
  "radiobutton_dark",
  "radiobutton_light",
  "Raytrace_Camera",
  "Raytrace_ExportProject",
  "Raytrace_Export",
  "Raytrace_Lux",
  "Raytrace_NewPartSegment",
  "Raytrace_New",
  "Raytrace_Part",
  "Raytrace_Render",
  "Raytrace_ResetCamera",
  "RaytracingWorkbench",
  "rectangle",
  "reference_editable",
  "Reinforcement_workbench_icon",
  "Render_workbench_icon",
  "Reporting_workbench_icon",
  "ReverseEngineeringWorkbench",
  "right_arrow_darker",
  "right_arrow_dark",
  "right_arrow_disabled_dark",
  "right_arrow_disabled_light",
  "right_arrow_lighter",
  "right_arrow_light",
  "Robot_CreateRobot",
  "Robot_CreateTrajectory",
  "Robot_Edge2Trac",
  "Robot_Export",
  "Robot_InsertWaypointPre",
  "Robot_InsertWaypoint",
  "Robot_RestoreHomePos",
  "Robot_SetDefaultOrientation",
  "Robot_SetDefaultValues",
  "Robot_SetHomePos",
  "Robot_Simulate",
  "Robot_TrajectoryCompound",
  "Robot_TrajectoryDressUp",
  "RobotWorkbench",
  "Save",
  "section-down",
  "section-left",
  "section-right",
  "section-up",
  "sel-back",
  "sel-bbox",
  "sel-forward",
  "sel-instance",
  "Series",
  "Sewing",
  "sheetmetal_workbench_icon",
  "Ship_AreaCurve",
  "Ship_CapacityCurve",
  "Ship_GZ",
  "Ship_Hydrostatics",
  "Ship_Instance",
  "Ship_LoadCondition",
  "Ship_Load",
  "Ship_Logo",
  "Ship_Module",
  "Ship_OutlineDraw",
  "Ship_Tank",
  "Ship_Weight",
  "Ship_workbench_icon",
  "ShipWorkbench",
  "simple",
  "sizegrip_dark",
  "sizegrip_light",
  "Sketcher_AlterFillet",
  "Sketcher_BSplineApproximate",
  "Sketcher_BSplineComb",
  "Sketcher_BSplineDecreaseDegree",
  "Sketcher_BSplineDecreaseKnotMultiplicity",
  "Sketcher_BSplineDegree",
  "Sketcher_BSplineIncreaseDegree",
  "Sketcher_BSplineIncreaseKnotMultiplicity",
  "Sketcher_BSplineKnotMultiplicity",
  "Sketcher_BSplinePolygon",
  "Sketcher_CarbonCopy_Constr",
  "Sketcher_CarbonCopy",
  "Sketcher_Clone",
  "Sketcher_CloseShape",
  "Sketcher_Conics_Constr",
  "Sketcher_Conics_Ellipse_3points",
  "Sketcher_Conics_Ellipse_Center",
  "Sketcher_Conics",
  "Sketcher_ConnectLines",
  "Sketcher_ConstrainBlock",
  "Sketcher_ConstrainCoincident",
  "Sketcher_ConstrainDistance",
  "Sketcher_ConstrainHorizontal",
  "Sketcher_ConstrainLock_Driven",
  "Sketcher_ConstrainLock",
  "Sketcher_ConstrainParallel",
  "Sketcher_ConstrainVertical",
  "Sketcher_Copy",
  "Sketcher_Create3PointArc_Constr",
  "Sketcher_Create3PointArc",
  "Sketcher_Create3PointCircle_Constr",
  "Sketcher_Create3PointCircle",
  "Sketcher_CreateArc_Constr",
  "Sketcher_CreateArc",
  "Sketcher_CreateBSpline_Constr",
  "Sketcher_CreateBSpline",
  "Sketcher_CreateCircle_Constr",
  "Sketcher_CreateCircle",
  "Sketcher_CreateEllipse_3points_Constr",
  "Sketcher_CreateEllipse_3points",
  "Sketcher_CreateEllipse_Constr",
  "Sketcher_CreateEllipse",
  "Sketcher_CreateFillet",
  "Sketcher_CreateHeptagon_Constr",
  "Sketcher_CreateHeptagon",
  "Sketcher_CreateHexagon_Constr",
  "Sketcher_CreateHexagon",
  "Sketcher_CreateLine_Constr",
  "Sketcher_CreateLine",
  "Sketcher_CreateOctagon_Constr",
  "Sketcher_CreateOctagon",
  "Sketcher_CreatePentagon_Constr",
  "Sketcher_CreatePentagon",
  "Sketcher_Create_Periodic_BSpline_Constr",
  "Sketcher_Create_Periodic_BSpline",
  "Sketcher_CreatePoint",
  "Sketcher_CreatePolyline_Constr",
  "Sketcher_CreatePolyline",
  "Sketcher_CreateRectangle_Constr",
  "Sketcher_CreateRectangle",
  "Sketcher_CreateRegularPolygon_Constr",
  "Sketcher_CreateRegularPolygon",
  "Sketcher_CreateSlot_Constr",
  "Sketcher_CreateSlot",
  "Sketcher_CreateSquare_Constr",
  "Sketcher_CreateSquare",
  "Sketcher_CreateText",
  "Sketcher_CreateTriangle_Constr",
  "Sketcher_CreateTriangle",
  "Sketcher_DraftLine",
  "Sketcher_EditSketch",
  "Sketcher_Element_Arc_Edge",
  "Sketcher_Element_Arc_EndPoint",
  "Sketcher_Element_Arc_MidPoint",
  "Sketcher_Element_Arc_StartingPoint",
  "Sketcher_Element_BSpline_Edge",
  "Sketcher_Element_BSpline_EndPoint",
  "Sketcher_Element_BSpline_StartPoint",
  "Sketcher_Element_Circle_Edge",
  "Sketcher_Element_Circle_MidPoint",
  "Sketcher_Element_Ellipse_All",
  "Sketcher_Element_Ellipse_CentrePoint",
  "Sketcher_Element_Ellipse_Edge_1",
  "Sketcher_Element_Ellipse_Edge_2",
  "Sketcher_Element_Ellipse_Focus1",
  "Sketcher_Element_Ellipse_Focus2",
  "Sketcher_Element_Ellipse_MajorAxis",
  "Sketcher_Element_Ellipse_MinorAxis",
  "Sketcher_Element_Elliptical_Arc_Centre_Point",
  "Sketcher_Element_Elliptical_Arc_Edge",
  "Sketcher_Element_Elliptical_Arc_End_Point",
  "Sketcher_Element_Elliptical_Arc_Start_Point",
  "Sketcher_Element_Hyperbolic_Arc_Centre_Point",
  "Sketcher_Element_Hyperbolic_Arc_Edge",
  "Sketcher_Element_Hyperbolic_Arc_End_Point",
  "Sketcher_Element_Hyperbolic_Arc_Start_Point",
  "Sketcher_Element_Line_Edge",
  "Sketcher_Element_Line_EndPoint",
  "Sketcher_Element_Line_StartingPoint",
  "Sketcher_Element_Parabolic_Arc_Centre_Point",
  "Sketcher_Element_Parabolic_Arc_Edge",
  "Sketcher_Element_Parabolic_Arc_End_Point",
  "Sketcher_Element_Parabolic_Arc_Start_Point",
  "Sketcher_Element_Point_StartingPoint",
  "Sketcher_Element_SelectionTypeInvalid",
  "Sketcher_Elliptical_Arc_Constr",
  "Sketcher_Elliptical_Arc",
  "Sketcher_Extend",
  "Sketcher_External",
  "Sketcher_Hyperbolic_Arc_Constr",
  "Sketcher_Hyperbolic_Arc",
  "Sketcher_LeaveSketch",
  "Sketcher_MapSketch",
  "Sketcher_MergeSketch",
  "Sketcher_MirrorSketch",
  "Sketcher_Move",
  "Sketcher_NewSketch",
  "Sketcher_Parabolic_Arc_Constr",
  "Sketcher_Parabolic_Arc",
  "Sketcher_ProfilesHexagon1",
  "Sketcher_RectangularArray",
  "Sketcher_SelectConflictingConstraints",
  "Sketcher_SelectConstraints",
  "Sketcher_SelectElementsAssociatedWithConstraints",
  "Sketcher_SelectElementsWithDoFs",
  "Sketcher_SelectHorizontalAxis",
  "Sketcher_SelectOrigin",
  "Sketcher_SelectRedundantConstraints",
  "Sketcher_SelectVerticalAxis",
  "Sketcher_Sketch",
  "Sketcher_SwitchVirtualSpace",
  "Sketcher_Symmetry",
  "Sketcher_ToggleActiveConstraint",
  "Sketcher_Toggle_Constraint_Driven",
  "Sketcher_Toggle_Constraint_Driving",
  "Sketcher_ToggleConstraint",
  "Sketcher_ToggleConstruction_old",
  "Sketcher_ToggleConstruction",
  "Sketcher_ToggleNormal",
  "Sketcher_Trimming",
  "Sketcher_ViewSection",
  "Sketcher_ViewSketch",
  "SketcherWorkbench",
  "slic3r-tools_workbench_icon",
  "Snap_Angle",
  "Snap_Center",
  "Snap_Dimensions",
  "Snap_Endpoint",
  "Snap_Extension",
  "Snap_Grid",
  "Snap_Intersection",
  "Snap_Lock",
  "Snap_Midpoint",
  "Snap_Near",
  "Snap_Ortho",
  "Snap_Parallel",
  "Snap_Perpendicular",
  "Snap_Special",
  "Snap_WorkingPlane",
  "solid",
  "spaceball_button",
  "splitter_horizontal_dark",
  "splitter_horizontal_light",
  "splitter_vertical_dark",
  "splitter_vertical_light",
  "SpNav-PanLR",
  "SpNav-PanUD",
  "SpNav-Roll",
  "SpNav-Spin",
  "SpNav-Tilt",
  "SpNav-Zoom",
  "SpreadsheetAlias",
  "SpreadsheetAlignBottom",
  "SpreadsheetAlignCenter",
  "SpreadsheetAlignLeft",
  "SpreadsheetAlignRight",
  "SpreadsheetAlignTop",
  "SpreadsheetAlignVCenter",
  "SpreadsheetController",
  "SpreadsheetExport",
  "SpreadsheetImport",
  "SpreadsheetMergeCells",
  "SpreadsheetPropertyController",
  "SpreadsheetSplitCell",
  "SpreadsheetStyleBold",
  "SpreadsheetStyleItalic",
  "SpreadsheetStyleUnderline",
  "Spreadsheet",
  "SpreadsheetWorkbench",
  "SquareDown",
  "square",
  "SquareUp",
  "StartWorkbench",
  "Std_Axis",
  "Std_CoordinateSystem_alt",
  "Std_CoordinateSystem",
  "Std_Placement",
  "Std_Plane",
  "Std_Tool10",
  "Std_Tool11",
  "Std_Tool12",
  "Std_Tool1",
  "Std_Tool2",
  "Std_Tool3",
  "Std_Tool4",
  "Std_Tool5",
  "Std_Tool6",
  "Std_Tool7",
  "Std_Tool8",
  "Std_Tool9",
  "Std_ViewScreenShot",
  "Std_WindowCascade",
  "Std_WindowNext",
  "Std_WindowPrev",
  "Std_WindowTileVer",
  "steel",
  "straightness",
  "Surface_Cut",
  "Surface_Filling",
  "Surface",
  "symmetrie",
  "techdraw-2linecenterline",
  "techdraw-2pointcenterline",
  "TechDraw_3PtAngleDimension",
  "techdraw-ActiveView",
  "TechDraw_AngleDimension",
  "techdraw-annotation",
  "techdraw-ArchView",
  "TechDraw_Balloon",
  "techdraw-ClipGroupAdd",
  "techdraw-ClipGroupRemove",
  "techdraw-ClipGroup",
  "techdraw-CosmeticEraser",
  "techdraw-DecorateLine",
  "techdraw-DetailView",
  "TechDraw_DiameterDimension",
  "TechDraw_Dimension_Link",
  "TechDraw_Dimension",
  "techdraw-DraftView",
  "techdraw-ExportPageDXF",
  "techdraw-ExportPageSVG",
  "techdraw-facecenterline",
  "techdraw-facedecor",
  "techdraw-GeometricHatch",
  "techdraw-hatch",
  "TechDraw_HorizontalDimension",
  "TechDraw_HorizontalExtentDimension",
  "techdraw-image",
  "TechDraw_LengthDimension",
  "techdraw-midpoint",
  "techdraw-mline",
  "techdraw-multiview",
  "techdraw-PageDefault",
  "TechDraw_Pages",
  "techdraw-PageTemplate",
  "techdraw-point",
  "TechDraw_ProjBottom",
  "techdraw-ProjectionGroup",
  "TechDraw_ProjFrontBottomLeft",
  "TechDraw_ProjFrontBottomRight",
  "TechDraw_ProjFront",
  "TechDraw_ProjFrontTopLeft",
  "TechDraw_ProjFrontTopRight",
  "TechDraw_ProjLeft",
  "TechDraw_ProjRear",
  "TechDraw_ProjRight",
  "TechDraw_ProjTop",
  "techdraw-quadrant",
  "TechDraw_RadiusDimension",
  "techdraw-RedrawPage",
  "techdraw-RichTextAnnotation",
  "techdraw-SectionView",
  "techdraw-showall",
  "techdraw-SpreadsheetView",
  "techdraw-symbol",
  "techdraw-tile",
  "techdraw-toggleframe",
  "TechDraw_Tree_Annotation",
  "TechDraw_Tree_Hatch",
  "TechDraw_Tree_Multi",
  "TechDraw_Tree_Page",
  "TechDraw_Tree_Page_Sync",
  "TechDraw_Tree_PageTemplate",
  "TechDraw_Tree_Page_Unsync",
  "TechDraw_Tree_ProjGroup",
  "TechDraw_Tree_Section",
  "TechDraw_Tree_Spreadsheet",
  "TechDraw_Tree_Symbol",
  "TechDraw_Tree_View",
  "TechDraw_VerticalDimension",
  "TechDraw_VerticalExtentDimension",
  "techdraw-View",
  "techdraw-weldsymbol",
  "_TEMPLATEPY_Workbench",
  "TestHatch",
  "TestSymbol",
  "TestTemplate",
  "TestWorkbench",
  "textBold",
  "TextDocument",
  "textItalic",
  "textStrike",
  "textUnderline",
  "ThreadProfile_workbench_icon",
  "timber_workbench_icon",
  "titanium",
  "tolerance_editable",
  "total run-out",
  "transparent",
  "Tree_Annotation",
  "Tree_Dimension",
  "tree-doc-collapse",
  "tree-doc-multi",
  "tree-doc-single",
  "tree-goto-sel",
  "tree-item-drag",
  "Tree_Mesh",
  "Tree_Part2D",
  "Tree_Part_Box_Parametric",
  "Tree_Part_Cone_Parametric",
  "Tree_Part_Cylinder_Parametric",
  "Tree_PartDesign_Pad",
  "Tree_PartDesign_Revolution",
  "Tree_Part_Ellipsoid_Parametric",
  "Tree_Part_Plane_Parametric",
  "Tree_Part_Prism",
  "Tree_Part_Sphere_Parametric",
  "Tree_Part",
  "Tree_Part_Torus_Parametric",
  "Tree_Part_Wedge",
  "tree-pre-sel",
  "Tree_Python",
  "tree-rec-sel",
  "tree-sync-pla",
  "tree-sync-sel",
  "tree-sync-view",
  "triangle",
  "type_class",
  "type_enum",
  "type_module",
  "undock_dark",
  "undock_light",
  "Unlink",
  "up_arrow_darker",
  "up_arrow_dark",
  "up_arrow_disabled_dark",
  "up_arrow_disabled_light",
  "up_arrow_lighter",
  "up_arrow_light",
  "up-down_arrow_darker",
  "up-down_arrow_dark",
  "up-down_arrow_disabled_dark",
  "up-down_arrow_disabled_light",
  "up-down_arrow_lighter",
  "up-down_arrow_light",
  "user",
  "USLetter_Landscape_blank",
  "USLetter_Landscape",
  "utilities-terminal",
  "v-bit",
  "VDown",
  "view-axonometric",
  "view-bottom",
  "view-front",
  "view-fullscreen",
  "view-isometric",
  "view-left",
  "view-measurement",
  "view-perspective",
  "view-rear",
  "view-refresh",
  "view-right",
  "view-rotate-left",
  "view-rotate-right",
  "view-select",
  "View",
  "view-top",
  "view-unselectable",
  "Vmovetoolbar_light",
  "Vsepartoolbar_dark",
  "Vsepartoolbar_light",
  "VUp",
  "web-browser",
  "web-home",
  "web-next",
  "web-previous",
  "web-refresh",
  "web-set-url",
  "web-sketchfab",
  "web-stop",
  "WebTools_workbench_icon",
  "WebWorkbench",
  "web-zoom-in",
  "web-zoom-out",
  "WhatsThis",
  "window-new",
  "WizardShaft",
  "woodgrain",
  "wood",
  "workfeature_workbench_icon",
  "yaml-workspace_workbench_icon",
  "zinc",
  "zoom-all",
  "zoom-border",
  "zoom-fit-best",
  "zoom-in",
  "zoom-out",
  "zoom-selection",
];

toolbarGlobalObject.commandList = [{
    "command": "Arch_3Views",
    "iconFile": "Arch_3Views",
    "toolTip": "Arch_3Views",
    "groups": []
  },
  {
    "command": "Arch_Add",
    "iconFile": "Arch_Add",
    "toolTip": "Arch_Add",
    "groups": []
  },
  {
    "command": "Arch_AxisTools",
    "iconFile": "",
    "toolTip": "Arch_AxisTools",
    "groups": []
  },
  {
    "command": "Arch_Building",
    "iconFile": "Arch_Building",
    "toolTip": "Arch_Building",
    "groups": []
  },
  {
    "command": "Arch_BuildingPart",
    "iconFile": "Arch_BuildingPart",
    "toolTip": "Arch_BuildingPart",
    "groups": []
  },
  {
    "command": "Arch_Check",
    "iconFile": "Arch_Check",
    "toolTip": "Arch_Check",
    "groups": []
  },
  {
    "command": "Arch_CloneComponent",
    "iconFile": "",
    "toolTip": "Arch_CloneComponent",
    "groups": []
  },
  {
    "command": "Arch_CloseHoles",
    "iconFile": "Arch_CloseHoles",
    "toolTip": "Arch_CloseHoles",
    "groups": []
  },
  {
    "command": "Arch_Component",
    "iconFile": "Arch_Component",
    "toolTip": "Arch_Component",
    "groups": []
  },
  {
    "command": "Arch_CutPlane",
    "iconFile": "Arch_CutPlane",
    "toolTip": "Arch_CutPlane",
    "groups": []
  },
  {
    "command": "Arch_Equipment",
    "iconFile": "Arch_Equipment",
    "toolTip": "Arch_Equipment",
    "groups": []
  },
  {
    "command": "Arch_Floor",
    "iconFile": "Arch_Floor",
    "toolTip": "Arch_Floor",
    "groups": []
  },
  {
    "command": "Arch_Frame",
    "iconFile": "Arch_Frame",
    "toolTip": "Arch_Frame",
    "groups": []
  },
  {
    "command": "Arch_IfcExplorer",
    "iconFile": "",
    "toolTip": "Arch_IfcExplorer",
    "groups": []
  },
  {
    "command": "Arch_IfcSpreadsheet",
    "iconFile": "",
    "toolTip": "Arch_IfcSpreadsheet",
    "groups": []
  },
  {
    "command": "Arch_MaterialTools",
    "iconFile": "",
    "toolTip": "Arch_MaterialTools",
    "groups": []
  },
  {
    "command": "Arch_MergeWalls",
    "iconFile": "Arch_MergeWalls",
    "toolTip": "Arch_MergeWalls",
    "groups": []
  },
  {
    "command": "Arch_MeshToShape",
    "iconFile": "Arch_MeshToShape",
    "toolTip": "Arch_MeshToShape",
    "groups": []
  },
  {
    "command": "Arch_PanelTools",
    "iconFile": "",
    "toolTip": "Arch_PanelTools",
    "groups": []
  },
  {
    "command": "Arch_PipeTools",
    "iconFile": "",
    "toolTip": "Arch_PipeTools",
    "groups": []
  },
  {
    "command": "Arch_Rebar",
    "iconFile": "Arch_Rebar",
    "toolTip": "Arch_Rebar",
    "groups": []
  },
  {
    "command": "Arch_Reference",
    "iconFile": "Arch_Reference",
    "toolTip": "Arch_Reference",
    "groups": []
  },
  {
    "command": "Arch_Remove",
    "iconFile": "Arch_Remove",
    "toolTip": "Arch_Remove",
    "groups": []
  },
  {
    "command": "Arch_RemoveShape",
    "iconFile": "Arch_RemoveShape",
    "toolTip": "Arch_RemoveShape",
    "groups": []
  },
  {
    "command": "Arch_Roof",
    "iconFile": "Arch_Roof",
    "toolTip": "Arch_Roof",
    "groups": []
  },
  {
    "command": "Arch_Schedule",
    "iconFile": "Arch_Schedule",
    "toolTip": "Arch_Schedule",
    "groups": []
  },
  {
    "command": "Arch_SectionPlane",
    "iconFile": "Arch_SectionPlane",
    "toolTip": "Arch_SectionPlane",
    "groups": []
  },
  {
    "command": "Arch_SelectNonSolidMeshes",
    "iconFile": "",
    "toolTip": "Arch_SelectNonSolidMeshes",
    "groups": []
  },
  {
    "command": "Arch_Site",
    "iconFile": "Arch_Site",
    "toolTip": "Arch_Site",
    "groups": []
  },
  {
    "command": "Arch_Space",
    "iconFile": "Arch_Space",
    "toolTip": "Arch_Space",
    "groups": []
  },
  {
    "command": "Arch_SplitMesh",
    "iconFile": "Arch_SplitMesh",
    "toolTip": "Arch_SplitMesh",
    "groups": []
  },
  {
    "command": "Arch_Stairs",
    "iconFile": "Arch_Stairs",
    "toolTip": "Arch_Stairs",
    "groups": []
  },
  {
    "command": "Arch_Structure",
    "iconFile": "Arch_Structure",
    "toolTip": "Arch_Structure",
    "groups": []
  },
  {
    "command": "Arch_Survey",
    "iconFile": "Arch_Survey",
    "toolTip": "Arch_Survey",
    "groups": []
  },
  {
    "command": "Arch_ToggleIfcBrepFlag",
    "iconFile": "Arch_ToggleIfcBrepFlag",
    "toolTip": "Arch_ToggleIfcBrepFlag",
    "groups": []
  },
  {
    "command": "Arch_ToggleSubs",
    "iconFile": "Arch_ToggleSubs",
    "toolTip": "Arch_ToggleSubs",
    "groups": []
  },
  {
    "command": "Arch_Wall",
    "iconFile": "Arch_Wall",
    "toolTip": "Arch_Wall",
    "groups": []
  },
  {
    "command": "Arch_Window",
    "iconFile": "Arch_Window",
    "toolTip": "Arch_Window",
    "groups": []
  },
  {
    "command": "Draft_AddConstruction",
    "iconFile": "",
    "toolTip": "Draft_AddConstruction",
    "groups": []
  },
  {
    "command": "Draft_AddPoint",
    "iconFile": "Draft_AddPoint",
    "toolTip": "Draft_AddPoint",
    "groups": []
  },
  {
    "command": "Draft_AddToGroup",
    "iconFile": "Draft_AddToGroup",
    "toolTip": "Draft_AddToGroup",
    "groups": []
  },
  {
    "command": "Draft_ApplyStyle",
    "iconFile": "",
    "toolTip": "Draft_ApplyStyle",
    "groups": []
  },
  {
    "command": "Draft_Arc",
    "iconFile": "Draft_Arc",
    "toolTip": "Draft_Arc",
    "groups": []
  },
  {
    "command": "Draft_Array",
    "iconFile": "Draft_Array",
    "toolTip": "Draft_Array",
    "groups": []
  },
  {
    "command": "Draft_AutoGroup",
    "iconFile": "Draft_AutoGroup",
    "toolTip": "Draft_AutoGroup",
    "groups": []
  },
  {
    "command": "Draft_BezCurve",
    "iconFile": "Draft_BezCurve",
    "toolTip": "Draft_BezCurve",
    "groups": []
  },
  {
    "command": "Draft_BSpline",
    "iconFile": "Draft_BSpline",
    "toolTip": "Draft_BSpline",
    "groups": []
  },
  {
    "command": "Draft_Circle",
    "iconFile": "Draft_Circle",
    "toolTip": "Draft_Circle",
    "groups": []
  },
  {
    "command": "Draft_Clone",
    "iconFile": "Draft_Clone",
    "toolTip": "Draft_Clone",
    "groups": []
  },
  {
    "command": "Draft_CloseLine",
    "iconFile": "",
    "toolTip": "Draft_CloseLine",
    "groups": []
  },
  {
    "command": "Draft_DelPoint",
    "iconFile": "Draft_DelPoint",
    "toolTip": "Draft_DelPoint",
    "groups": []
  },
  {
    "command": "Draft_Dimension",
    "iconFile": "Draft_Dimension",
    "toolTip": "Draft_Dimension",
    "groups": []
  },
  {
    "command": "Draft_Downgrade",
    "iconFile": "Draft_Downgrade",
    "toolTip": "Draft_Downgrade",
    "groups": []
  },
  {
    "command": "Draft_Draft2Sketch",
    "iconFile": "Draft_Draft2Sketch",
    "toolTip": "Draft_Draft2Sketch",
    "groups": []
  },
  {
    "command": "Draft_Drawing",
    "iconFile": "Draft_Drawing",
    "toolTip": "Draft_Drawing",
    "groups": []
  },
  {
    "command": "Draft_Edit",
    "iconFile": "Draft_Edit",
    "toolTip": "Draft_Edit",
    "groups": []
  },
  {
    "command": "Draft_Ellipse",
    "iconFile": "Draft_Ellipse",
    "toolTip": "Draft_Ellipse",
    "groups": []
  },
  {
    "command": "Draft_Facebinder",
    "iconFile": "Draft_Facebinder",
    "toolTip": "Draft_Facebinder",
    "groups": []
  },
  {
    "command": "Draft_FinishLine",
    "iconFile": "",
    "toolTip": "Draft_FinishLine",
    "groups": []
  },
  {
    "command": "Draft_FlipDimension",
    "iconFile": "Draft_FlipDimension",
    "toolTip": "Draft_FlipDimension",
    "groups": []
  },
  {
    "command": "Draft_Heal",
    "iconFile": "Draft_Heal",
    "toolTip": "Draft_Heal",
    "groups": []
  },
  {
    "command": "Draft_Join",
    "iconFile": "Draft_Join",
    "toolTip": "Draft_Join",
    "groups": []
  },
  {
    "command": "Draft_Label",
    "iconFile": "Draft_Label",
    "toolTip": "Draft_Label",
    "groups": []
  },
  {
    "command": "Draft_Line",
    "iconFile": "Draft_Line",
    "toolTip": "Draft_Line",
    "groups": []
  },
  {
    "command": "Draft_Mirror",
    "iconFile": "Draft_Mirror",
    "toolTip": "Draft_Mirror",
    "groups": []
  },
  {
    "command": "Draft_Move",
    "iconFile": "Draft_Move",
    "toolTip": "Draft_Move",
    "groups": []
  },
  {
    "command": "Draft_Offset",
    "iconFile": "Draft_Offset",
    "toolTip": "Draft_Offset",
    "groups": []
  },
  {
    "command": "Draft_PathArray",
    "iconFile": "Draft_PathArray",
    "toolTip": "Draft_PathArray",
    "groups": []
  },
  {
    "command": "Draft_Point",
    "iconFile": "Draft_Point",
    "toolTip": "Draft_Point",
    "groups": []
  },
  {
    "command": "Draft_PointArray",
    "iconFile": "Draft_PointArray",
    "toolTip": "Draft_PointArray",
    "groups": []
  },
  {
    "command": "Draft_Polygon",
    "iconFile": "Draft_Polygon",
    "toolTip": "Draft_Polygon",
    "groups": []
  },
  {
    "command": "Draft_Rectangle",
    "iconFile": "Draft_Rectangle",
    "toolTip": "Draft_Rectangle",
    "groups": []
  },
  {
    "command": "Draft_Rotate",
    "iconFile": "Draft_Rotate",
    "toolTip": "Draft_Rotate",
    "groups": []
  },
  {
    "command": "Draft_Scale",
    "iconFile": "Draft_Scale",
    "toolTip": "Draft_Scale",
    "groups": []
  },
  {
    "command": "Draft_SelectGroup",
    "iconFile": "Draft_SelectGroup",
    "toolTip": "Draft_SelectGroup",
    "groups": []
  },
  {
    "command": "Draft_SelectPlane",
    "iconFile": "Draft_SelectPlane",
    "toolTip": "Draft_SelectPlane",
    "groups": []
  },
  {
    "command": "Draft_SetWorkingPlaneProxy",
    "iconFile": "",
    "toolTip": "Draft_SetWorkingPlaneProxy",
    "groups": []
  },
  {
    "command": "Draft_Shape2DView",
    "iconFile": "",
    "toolTip": "Draft_Shape2DView",
    "groups": []
  },
  {
    "command": "Draft_ShapeString",
    "iconFile": "Draft_ShapeString",
    "toolTip": "Draft_ShapeString",
    "groups": []
  },
  {
    "command": "Draft_ShowSnapBar",
    "iconFile": "",
    "toolTip": "Draft_ShowSnapBar",
    "groups": []
  },
  {
    "command": "Draft_Slope",
    "iconFile": "Draft_Slope",
    "toolTip": "Draft_Slope",
    "groups": []
  },
  {
    "command": "Draft_Snap_Angle",
    "iconFile": "",
    "toolTip": "Draft_Snap_Angle",
    "groups": []
  },
  {
    "command": "Draft_Snap_Center",
    "iconFile": "",
    "toolTip": "Draft_Snap_Center",
    "groups": []
  },
  {
    "command": "Draft_Snap_Dimensions",
    "iconFile": "",
    "toolTip": "Draft_Snap_Dimensions",
    "groups": []
  },
  {
    "command": "Draft_Snap_Endpoint",
    "iconFile": "",
    "toolTip": "Draft_Snap_Endpoint",
    "groups": []
  },
  {
    "command": "Draft_Snap_Extension",
    "iconFile": "",
    "toolTip": "Draft_Snap_Extension",
    "groups": []
  },
  {
    "command": "Draft_Snap_Grid",
    "iconFile": "",
    "toolTip": "Draft_Snap_Grid",
    "groups": []
  },
  {
    "command": "Draft_Snap_Intersection",
    "iconFile": "",
    "toolTip": "Draft_Snap_Intersection",
    "groups": []
  },
  {
    "command": "Draft_Snap_Lock",
    "iconFile": "",
    "toolTip": "Draft_Snap_Lock",
    "groups": []
  },
  {
    "command": "Draft_Snap_Midpoint",
    "iconFile": "",
    "toolTip": "Draft_Snap_Midpoint",
    "groups": []
  },
  {
    "command": "Draft_Snap_Near",
    "iconFile": "",
    "toolTip": "Draft_Snap_Near",
    "groups": []
  },
  {
    "command": "Draft_Snap_Ortho",
    "iconFile": "",
    "toolTip": "Draft_Snap_Ortho",
    "groups": []
  },
  {
    "command": "Draft_Snap_Parallel",
    "iconFile": "",
    "toolTip": "Draft_Snap_Parallel",
    "groups": []
  },
  {
    "command": "Draft_Snap_Perpendicular",
    "iconFile": "",
    "toolTip": "Draft_Snap_Perpendicular",
    "groups": []
  },
  {
    "command": "Draft_Snap_Special",
    "iconFile": "",
    "toolTip": "Draft_Snap_Special",
    "groups": []
  },
  {
    "command": "Draft_Snap_WorkingPlane",
    "iconFile": "",
    "toolTip": "Draft_Snap_WorkingPlane",
    "groups": []
  },
  {
    "command": "Draft_Split",
    "iconFile": "Draft_Split",
    "toolTip": "Draft_Split",
    "groups": []
  },
  {
    "command": "Draft_Stretch",
    "iconFile": "Draft_Stretch",
    "toolTip": "Draft_Stretch",
    "groups": []
  },
  {
    "command": "Draft_Text",
    "iconFile": "Draft_Text",
    "toolTip": "Draft_Text",
    "groups": []
  },
  {
    "command": "Draft_ToggleConstructionMode",
    "iconFile": "",
    "toolTip": "Draft_ToggleConstructionMode",
    "groups": []
  },
  {
    "command": "Draft_ToggleContinueMode",
    "iconFile": "",
    "toolTip": "Draft_ToggleContinueMode",
    "groups": []
  },
  {
    "command": "Draft_ToggleDisplayMode",
    "iconFile": "",
    "toolTip": "Draft_ToggleDisplayMode",
    "groups": []
  },
  {
    "command": "Draft_ToggleGrid",
    "iconFile": "",
    "toolTip": "Draft_ToggleGrid",
    "groups": []
  },
  {
    "command": "Draft_Trimex",
    "iconFile": "Draft_Trimex",
    "toolTip": "Draft_Trimex",
    "groups": []
  },
  {
    "command": "Draft_UndoLine",
    "iconFile": "",
    "toolTip": "Draft_UndoLine",
    "groups": []
  },
  {
    "command": "Draft_Upgrade",
    "iconFile": "Draft_Upgrade",
    "toolTip": "Draft_Upgrade",
    "groups": []
  },
  {
    "command": "Draft_VisGroup",
    "iconFile": "Draft_VisGroup",
    "toolTip": "Draft_VisGroup",
    "groups": []
  },
  {
    "command": "Draft_Wire",
    "iconFile": "Draft_Wire",
    "toolTip": "Draft_Wire",
    "groups": []
  },
  {
    "command": "Draft_WireToBSpline",
    "iconFile": "Draft_WireToBSpline",
    "toolTip": "Draft_WireToBSpline",
    "groups": []
  },
  {
    "command": "Drawing_Annotation",
    "iconFile": "",
    "toolTip": "Drawing_Annotation",
    "groups": []
  },
  {
    "command": "Drawing_Clip",
    "iconFile": "",
    "toolTip": "Drawing_Clip",
    "groups": []
  },
  {
    "command": "Drawing_DraftView",
    "iconFile": "",
    "toolTip": "Drawing_DraftView",
    "groups": []
  },
  {
    "command": "Drawing_ExportPage",
    "iconFile": "",
    "toolTip": "Drawing_ExportPage",
    "groups": []
  },
  {
    "command": "Drawing_NewPage",
    "iconFile": "",
    "toolTip": "Drawing_NewPage",
    "groups": []
  },
  {
    "command": "Drawing_NewView",
    "iconFile": "",
    "toolTip": "Drawing_NewView",
    "groups": []
  },
  {
    "command": "Drawing_Open",
    "iconFile": "",
    "toolTip": "Drawing_Open",
    "groups": []
  },
  {
    "command": "Drawing_OpenBrowserView",
    "iconFile": "",
    "toolTip": "Drawing_OpenBrowserView",
    "groups": []
  },
  {
    "command": "Drawing_OrthoViews",
    "iconFile": "",
    "toolTip": "Drawing_OrthoViews",
    "groups": []
  },
  {
    "command": "Drawing_ProjectShape",
    "iconFile": "",
    "toolTip": "Drawing_ProjectShape",
    "groups": []
  },
  {
    "command": "Drawing_SpreadsheetView",
    "iconFile": "",
    "toolTip": "Drawing_SpreadsheetView",
    "groups": []
  },
  {
    "command": "Drawing_Symbol",
    "iconFile": "",
    "toolTip": "Drawing_Symbol",
    "groups": []
  },
  {
    "command": "FEM_Analysis",
    "iconFile": "",
    "toolTip": "FEM_Analysis",
    "groups": []
  },
  {
    "command": "FEM_ClippingPlaneAdd",
    "iconFile": "",
    "toolTip": "FEM_ClippingPlaneAdd",
    "groups": []
  },
  {
    "command": "FEM_ClippingPlaneRemoveAll",
    "iconFile": "",
    "toolTip": "FEM_ClippingPlaneRemoveAll",
    "groups": []
  },
  {
    "command": "FEM_ConstraintBearing",
    "iconFile": "",
    "toolTip": "FEM_ConstraintBearing",
    "groups": []
  },
  {
    "command": "FEM_ConstraintBodyHeatSource",
    "iconFile": "",
    "toolTip": "FEM_ConstraintBodyHeatSource",
    "groups": []
  },
  {
    "command": "FEM_ConstraintContact",
    "iconFile": "",
    "toolTip": "FEM_ConstraintContact",
    "groups": []
  },
  {
    "command": "FEM_ConstraintDisplacement",
    "iconFile": "",
    "toolTip": "FEM_ConstraintDisplacement",
    "groups": []
  },
  {
    "command": "FEM_ConstraintElectrostaticPotential",
    "iconFile": "",
    "toolTip": "FEM_ConstraintElectrostaticPotential",
    "groups": []
  },
  {
    "command": "FEM_ConstraintFixed",
    "iconFile": "",
    "toolTip": "FEM_ConstraintFixed",
    "groups": []
  },
  {
    "command": "FEM_ConstraintFlowVelocity",
    "iconFile": "",
    "toolTip": "FEM_ConstraintFlowVelocity",
    "groups": []
  },
  {
    "command": "FEM_ConstraintFluidBoundary",
    "iconFile": "",
    "toolTip": "FEM_ConstraintFluidBoundary",
    "groups": []
  },
  {
    "command": "FEM_ConstraintForce",
    "iconFile": "",
    "toolTip": "FEM_ConstraintForce",
    "groups": []
  },
  {
    "command": "FEM_ConstraintGear",
    "iconFile": "",
    "toolTip": "FEM_ConstraintGear",
    "groups": []
  },
  {
    "command": "FEM_ConstraintHeatflux",
    "iconFile": "",
    "toolTip": "FEM_ConstraintHeatflux",
    "groups": []
  },
  {
    "command": "FEM_ConstraintInitialFlowVelocity",
    "iconFile": "",
    "toolTip": "FEM_ConstraintInitialFlowVelocity",
    "groups": []
  },
  {
    "command": "FEM_ConstraintInitialTemperature",
    "iconFile": "",
    "toolTip": "FEM_ConstraintInitialTemperature",
    "groups": []
  },
  {
    "command": "FEM_ConstraintPlaneRotation",
    "iconFile": "",
    "toolTip": "FEM_ConstraintPlaneRotation",
    "groups": []
  },
  {
    "command": "FEM_ConstraintPressure",
    "iconFile": "",
    "toolTip": "FEM_ConstraintPressure",
    "groups": []
  },
  {
    "command": "FEM_ConstraintPulley",
    "iconFile": "",
    "toolTip": "FEM_ConstraintPulley",
    "groups": []
  },
  {
    "command": "FEM_ConstraintSelfWeight",
    "iconFile": "",
    "toolTip": "FEM_ConstraintSelfWeight",
    "groups": []
  },
  {
    "command": "FEM_ConstraintTemperature",
    "iconFile": "",
    "toolTip": "FEM_ConstraintTemperature",
    "groups": []
  },
  {
    "command": "FEM_ConstraintTransform",
    "iconFile": "",
    "toolTip": "FEM_ConstraintTransform",
    "groups": []
  },
  {
    "command": "FEM_CreateNodesSet",
    "iconFile": "",
    "toolTip": "FEM_CreateNodesSet",
    "groups": []
  },
  {
    "command": "FEM_ElementFluid1D",
    "iconFile": "",
    "toolTip": "FEM_ElementFluid1D",
    "groups": []
  },
  {
    "command": "FEM_ElementGeometry1D",
    "iconFile": "",
    "toolTip": "FEM_ElementGeometry1D",
    "groups": []
  },
  {
    "command": "FEM_ElementGeometry2D",
    "iconFile": "",
    "toolTip": "FEM_ElementGeometry2D",
    "groups": []
  },
  {
    "command": "FEM_ElementRotation1D",
    "iconFile": "",
    "toolTip": "FEM_ElementRotation1D",
    "groups": []
  },
  {
    "command": "FEM_EquationElasticity",
    "iconFile": "",
    "toolTip": "FEM_EquationElasticity",
    "groups": []
  },
  {
    "command": "FEM_EquationElectrostatic",
    "iconFile": "",
    "toolTip": "FEM_EquationElectrostatic",
    "groups": []
  },
  {
    "command": "FEM_EquationFlow",
    "iconFile": "",
    "toolTip": "FEM_EquationFlow",
    "groups": []
  },
  {
    "command": "FEM_EquationFluxsolver",
    "iconFile": "",
    "toolTip": "FEM_EquationFluxsolver",
    "groups": []
  },
  {
    "command": "FEM_EquationHeat",
    "iconFile": "",
    "toolTip": "FEM_EquationHeat",
    "groups": []
  },
  {
    "command": "FEM_FEMMesh2Mesh",
    "iconFile": "",
    "toolTip": "FEM_FEMMesh2Mesh",
    "groups": []
  },
  {
    "command": "FEM_MaterialEditor",
    "iconFile": "",
    "toolTip": "FEM_MaterialEditor",
    "groups": []
  },
  {
    "command": "FEM_MaterialFluid",
    "iconFile": "",
    "toolTip": "FEM_MaterialFluid",
    "groups": []
  },
  {
    "command": "FEM_MaterialMechanicalNonlinear",
    "iconFile": "",
    "toolTip": "FEM_MaterialMechanicalNonlinear",
    "groups": []
  },
  {
    "command": "FEM_MaterialSolid",
    "iconFile": "",
    "toolTip": "FEM_MaterialSolid",
    "groups": []
  },
  {
    "command": "FEM_MeshBoundaryLayer",
    "iconFile": "",
    "toolTip": "FEM_MeshBoundaryLayer",
    "groups": []
  },
  {
    "command": "FEM_MeshGmshFromShape",
    "iconFile": "",
    "toolTip": "FEM_MeshGmshFromShape",
    "groups": []
  },
  {
    "command": "FEM_MeshGroup",
    "iconFile": "",
    "toolTip": "FEM_MeshGroup",
    "groups": []
  },
  {
    "command": "FEM_MeshRegion",
    "iconFile": "",
    "toolTip": "FEM_MeshRegion",
    "groups": []
  },
  {
    "command": "FEM_PostApplyChanges",
    "iconFile": "",
    "toolTip": "FEM_PostApplyChanges",
    "groups": []
  },
  {
    "command": "FEM_PostCreateClipFilter",
    "iconFile": "",
    "toolTip": "FEM_PostCreateClipFilter",
    "groups": []
  },
  {
    "command": "FEM_PostCreateCutFilter",
    "iconFile": "",
    "toolTip": "FEM_PostCreateCutFilter",
    "groups": []
  },
  {
    "command": "FEM_PostCreateDataAlongLineFilter",
    "iconFile": "",
    "toolTip": "FEM_PostCreateDataAlongLineFilter",
    "groups": []
  },
  {
    "command": "FEM_PostCreateDataAtPointFilter",
    "iconFile": "",
    "toolTip": "FEM_PostCreateDataAtPointFilter",
    "groups": []
  },
  {
    "command": "FEM_PostCreateFunctions",
    "iconFile": "",
    "toolTip": "FEM_PostCreateFunctions",
    "groups": []
  },
  {
    "command": "FEM_PostCreateLinearizedStressesFilter",
    "iconFile": "",
    "toolTip": "FEM_PostCreateLinearizedStressesFilter",
    "groups": []
  },
  {
    "command": "FEM_PostCreateScalarClipFilter",
    "iconFile": "",
    "toolTip": "FEM_PostCreateScalarClipFilter",
    "groups": []
  },
  {
    "command": "FEM_PostCreateWarpVectorFilter",
    "iconFile": "",
    "toolTip": "FEM_PostCreateWarpVectorFilter",
    "groups": []
  },
  {
    "command": "FEM_PostPipelineFromResult",
    "iconFile": "",
    "toolTip": "FEM_PostPipelineFromResult",
    "groups": []
  },
  {
    "command": "FEM_ResultShow",
    "iconFile": "",
    "toolTip": "FEM_ResultShow",
    "groups": []
  },
  {
    "command": "FEM_ResultsPurge",
    "iconFile": "",
    "toolTip": "FEM_ResultsPurge",
    "groups": []
  },
  {
    "command": "FEM_SolverCalculiX",
    "iconFile": "",
    "toolTip": "FEM_SolverCalculiX",
    "groups": []
  },
  {
    "command": "FEM_SolverCalculixCxxtools",
    "iconFile": "",
    "toolTip": "FEM_SolverCalculixCxxtools",
    "groups": []
  },
  {
    "command": "FEM_SolverControl",
    "iconFile": "",
    "toolTip": "FEM_SolverControl",
    "groups": []
  },
  {
    "command": "FEM_SolverElmer",
    "iconFile": "",
    "toolTip": "FEM_SolverElmer",
    "groups": []
  },
  {
    "command": "FEM_SolverRun",
    "iconFile": "",
    "toolTip": "FEM_SolverRun",
    "groups": []
  },
  {
    "command": "FEM_SolverZ88",
    "iconFile": "",
    "toolTip": "FEM_SolverZ88",
    "groups": []
  },
  {
    "command": "Image_CreateImagePlane",
    "iconFile": "Image_CreateImagePlane",
    "toolTip": "Image_CreateImagePlane",
    "groups": []
  },
  {
    "command": "Image_Open",
    "iconFile": "Image_Open",
    "toolTip": "Image_Open",
    "groups": []
  },
  {
    "command": "Image_Scaling",
    "iconFile": "Image_Scaling",
    "toolTip": "Image_Scaling",
    "groups": []
  },
  {
    "command": "Inspection_InspectElement",
    "iconFile": "",
    "toolTip": "Inspection_InspectElement",
    "groups": []
  },
  {
    "command": "Inspection_VisualInspection",
    "iconFile": "",
    "toolTip": "Inspection_VisualInspection",
    "groups": []
  },
  {
    "command": "Mesh_AddFacet",
    "iconFile": "",
    "toolTip": "Mesh_AddFacet",
    "groups": []
  },
  {
    "command": "Mesh_BoundingBox",
    "iconFile": "",
    "toolTip": "Mesh_BoundingBox",
    "groups": []
  },
  {
    "command": "Mesh_BuildRegularSolid",
    "iconFile": "",
    "toolTip": "Mesh_BuildRegularSolid",
    "groups": []
  },
  {
    "command": "Mesh_CurvatureInfo",
    "iconFile": "",
    "toolTip": "Mesh_CurvatureInfo",
    "groups": []
  },
  {
    "command": "Mesh_Difference",
    "iconFile": "",
    "toolTip": "Mesh_Difference",
    "groups": []
  },
  {
    "command": "Mesh_EvaluateFacet",
    "iconFile": "",
    "toolTip": "Mesh_EvaluateFacet",
    "groups": []
  },
  {
    "command": "Mesh_EvaluateSolid",
    "iconFile": "",
    "toolTip": "Mesh_EvaluateSolid",
    "groups": []
  },
  {
    "command": "Mesh_Evaluation",
    "iconFile": "",
    "toolTip": "Mesh_Evaluation",
    "groups": []
  },
  {
    "command": "Mesh_Export",
    "iconFile": "",
    "toolTip": "Mesh_Export",
    "groups": []
  },
  {
    "command": "Mesh_FillInteractiveHole",
    "iconFile": "",
    "toolTip": "Mesh_FillInteractiveHole",
    "groups": []
  },
  {
    "command": "Mesh_FillupHoles",
    "iconFile": "",
    "toolTip": "Mesh_FillupHoles",
    "groups": []
  },
  {
    "command": "Mesh_FlipNormals",
    "iconFile": "",
    "toolTip": "Mesh_FlipNormals",
    "groups": []
  },
  {
    "command": "Mesh_FromPartShape",
    "iconFile": "",
    "toolTip": "Mesh_FromPartShape",
    "groups": []
  },
  {
    "command": "Mesh_HarmonizeNormals",
    "iconFile": "",
    "toolTip": "Mesh_HarmonizeNormals",
    "groups": []
  },
  {
    "command": "Mesh_Import",
    "iconFile": "",
    "toolTip": "Mesh_Import",
    "groups": []
  },
  {
    "command": "Mesh_Intersection",
    "iconFile": "",
    "toolTip": "Mesh_Intersection",
    "groups": []
  },
  {
    "command": "Mesh_Merge",
    "iconFile": "",
    "toolTip": "Mesh_Merge",
    "groups": []
  },
  {
    "command": "Mesh_PolyCut",
    "iconFile": "",
    "toolTip": "Mesh_PolyCut",
    "groups": []
  },
  {
    "command": "Mesh_PolyTrim",
    "iconFile": "",
    "toolTip": "Mesh_PolyTrim",
    "groups": []
  },
  {
    "command": "Mesh_RemoveCompByHand",
    "iconFile": "",
    "toolTip": "Mesh_RemoveCompByHand",
    "groups": []
  },
  {
    "command": "Mesh_RemoveComponents",
    "iconFile": "",
    "toolTip": "Mesh_RemoveComponents",
    "groups": []
  },
  {
    "command": "Mesh_Scale",
    "iconFile": "",
    "toolTip": "Mesh_Scale",
    "groups": []
  },
  {
    "command": "Mesh_SectionByPlane",
    "iconFile": "",
    "toolTip": "Mesh_SectionByPlane",
    "groups": []
  },
  {
    "command": "Mesh_Segmentation",
    "iconFile": "",
    "toolTip": "Mesh_Segmentation",
    "groups": []
  },
  {
    "command": "Mesh_SegmentationBestFit",
    "iconFile": "",
    "toolTip": "Mesh_SegmentationBestFit",
    "groups": []
  },
  {
    "command": "Mesh_Smoothing",
    "iconFile": "",
    "toolTip": "Mesh_Smoothing",
    "groups": []
  },
  {
    "command": "Mesh_TrimByPlane",
    "iconFile": "",
    "toolTip": "Mesh_TrimByPlane",
    "groups": []
  },
  {
    "command": "Mesh_Union",
    "iconFile": "",
    "toolTip": "Mesh_Union",
    "groups": []
  },
  {
    "command": "Mesh_VertexCurvature",
    "iconFile": "",
    "toolTip": "Mesh_VertexCurvature",
    "groups": []
  },
  {
    "command": "OpenSCAD_Edgestofaces",
    "iconFile": "",
    "toolTip": "OpenSCAD_Edgestofaces",
    "groups": []
  },
  {
    "command": "OpenSCAD_ExpandPlacements",
    "iconFile": "",
    "toolTip": "OpenSCAD_ExpandPlacements",
    "groups": []
  },
  {
    "command": "OpenSCAD_ExplodeGroup",
    "iconFile": "",
    "toolTip": "OpenSCAD_ExplodeGroup",
    "groups": []
  },
  {
    "command": "OpenSCAD_IncreaseToleranceFeature",
    "iconFile": "OpenSCAD_IncreaseToleranceFeature",
    "toolTip": "OpenSCAD_IncreaseToleranceFeature",
    "groups": []
  },
  {
    "command": "OpenSCAD_RefineShapeFeature",
    "iconFile": "OpenSCAD_RefineShapeFeature",
    "toolTip": "OpenSCAD_RefineShapeFeature",
    "groups": []
  },
  {
    "command": "OpenSCAD_RemoveSubtree",
    "iconFile": "OpenSCAD_RemoveSubtree",
    "toolTip": "OpenSCAD_RemoveSubtree",
    "groups": []
  },
  {
    "command": "OpenSCAD_ReplaceObject",
    "iconFile": "OpenSCAD_ReplaceObject",
    "toolTip": "OpenSCAD_ReplaceObject",
    "groups": []
  },
  {
    "command": "Part_Boolean",
    "iconFile": "",
    "toolTip": "Part_Boolean",
    "groups": []
  },
  {
    "command": "Part_BooleanFragments",
    "iconFile": "Part_BooleanFragments",
    "toolTip": "Part_BooleanFragments",
    "groups": []
  },
  {
    "command": "Part_Box",
    "iconFile": "Part_Box",
    "toolTip": "Part_Box",
    "groups": []
  },
  {
    "command": "Part_BoxSelection",
    "iconFile": "Part_BoxSelection",
    "toolTip": "Part_BoxSelection",
    "groups": []
  },
  {
    "command": "Part_Builder",
    "iconFile": "",
    "toolTip": "Part_Builder",
    "groups": []
  },
  {
    "command": "Part_Chamfer",
    "iconFile": "Part_Chamfer",
    "toolTip": "Part_Chamfer",
    "groups": []
  },
  {
    "command": "Part_CheckGeometry",
    "iconFile": "Part_CheckGeometry",
    "toolTip": "Part_CheckGeometry",
    "groups": []
  },
  {
    "command": "Part_Common",
    "iconFile": "Part_Common",
    "toolTip": "Part_Common",
    "groups": []
  },
  {
    "command": "Part_CompCompoundTools",
    "iconFile": "",
    "toolTip": "Part_CompCompoundTools",
    "groups": []
  },
  {
    "command": "Part_CompJoinFeatures",
    "iconFile": "",
    "toolTip": "Part_CompJoinFeatures",
    "groups": []
  },
  {
    "command": "Part_CompOffset",
    "iconFile": "",
    "toolTip": "Part_CompOffset",
    "groups": []
  },
  {
    "command": "Part_Compound",
    "iconFile": "Part_Compound",
    "toolTip": "Part_Compound",
    "groups": []
  },
  {
    "command": "Part_CompoundFilter",
    "iconFile": "Part_CompoundFilter",
    "toolTip": "Part_CompoundFilter",
    "groups": []
  },
  {
    "command": "Part_CompSplitFeatures",
    "iconFile": "",
    "toolTip": "Part_CompSplitFeatures",
    "groups": []
  },
  {
    "command": "Part_Cone",
    "iconFile": "Part_Cone",
    "toolTip": "Part_Cone",
    "groups": []
  },
  {
    "command": "Part_CrossSections",
    "iconFile": "Part_CrossSections",
    "toolTip": "Part_CrossSections",
    "groups": []
  },
  {
    "command": "Part_Cut",
    "iconFile": "Part_Cut",
    "toolTip": "Part_Cut",
    "groups": []
  },
  {
    "command": "Part_Cylinder",
    "iconFile": "Part_Cylinder",
    "toolTip": "Part_Cylinder",
    "groups": []
  },
  {
    "command": "Part_Defeaturing",
    "iconFile": "Part_Defeaturing",
    "toolTip": "Part_Defeaturing",
    "groups": []
  },
  {
    "command": "Part_EditAttachment",
    "iconFile": "",
    "toolTip": "Part_EditAttachment",
    "groups": []
  },
  {
    "command": "Part_ExplodeCompound",
    "iconFile": "Part_ExplodeCompound",
    "toolTip": "Part_ExplodeCompound",
    "groups": []
  },
  {
    "command": "Part_Export",
    "iconFile": "Part_Export",
    "toolTip": "Part_Export",
    "groups": []
  },
  {
    "command": "Part_Extrude",
    "iconFile": "Part_Extrude",
    "toolTip": "Part_Extrude",
    "groups": []
  },
  {
    "command": "Part_Fillet",
    "iconFile": "Part_Fillet",
    "toolTip": "Part_Fillet",
    "groups": []
  },
  {
    "command": "Part_Fuse",
    "iconFile": "Part_Fuse",
    "toolTip": "Part_Fuse",
    "groups": []
  },
  {
    "command": "Part_Import",
    "iconFile": "Part_Import",
    "toolTip": "Part_Import",
    "groups": []
  },
  {
    "command": "Part_JoinConnect",
    "iconFile": "Part_JoinConnect",
    "toolTip": "Part_JoinConnect",
    "groups": []
  },
  {
    "command": "Part_JoinCutout",
    "iconFile": "Part_JoinCutout",
    "toolTip": "Part_JoinCutout",
    "groups": []
  },
  {
    "command": "Part_JoinEmbed",
    "iconFile": "Part_JoinEmbed",
    "toolTip": "Part_JoinEmbed",
    "groups": []
  },
  {
    "command": "Part_Loft",
    "iconFile": "Part_Loft",
    "toolTip": "Part_Loft",
    "groups": []
  },
  {
    "command": "Part_MakeFace",
    "iconFile": "",
    "toolTip": "Part_MakeFace",
    "groups": []
  },
  {
    "command": "Part_MakeSolid",
    "iconFile": "",
    "toolTip": "Part_MakeSolid",
    "groups": []
  },
  {
    "command": "Part_MakeTube",
    "iconFile": "",
    "toolTip": "Part_MakeTube",
    "groups": []
  },
  {
    "command": "Part_Measure_Angular",
    "iconFile": "Part_Measure_Angular",
    "toolTip": "Part_Measure_Angular",
    "groups": []
  },
  {
    "command": "Part_Measure_Clear_All",
    "iconFile": "Part_Measure_Clear_All",
    "toolTip": "Part_Measure_Clear_All",
    "groups": []
  },
  {
    "command": "Part_Measure_Linear",
    "iconFile": "Part_Measure_Linear",
    "toolTip": "Part_Measure_Linear",
    "groups": []
  },
  {
    "command": "Part_Measure_Toggle_3d",
    "iconFile": "Part_Measure_Toggle_3d",
    "toolTip": "Part_Measure_Toggle_3d",
    "groups": []
  },
  {
    "command": "Part_Measure_Toggle_All",
    "iconFile": "Part_Measure_Toggle_All",
    "toolTip": "Part_Measure_Toggle_All",
    "groups": []
  },
  {
    "command": "Part_Measure_Toggle_Delta",
    "iconFile": "Part_Measure_Toggle_Delta",
    "toolTip": "Part_Measure_Toggle_Delta",
    "groups": []
  },
  {
    "command": "Part_Mirror",
    "iconFile": "Part_Mirror",
    "toolTip": "Part_Mirror",
    "groups": []
  },
  {
    "command": "Part_Offset",
    "iconFile": "Part_Offset",
    "toolTip": "Part_Offset",
    "groups": []
  },
  {
    "command": "Part_Offset2D",
    "iconFile": "Part_Offset2D",
    "toolTip": "Part_Offset2D",
    "groups": []
  },
  {
    "command": "Part_Primitives",
    "iconFile": "",
    "toolTip": "Part_Primitives",
    "groups": []
  },
  {
    "command": "Part_RefineShape",
    "iconFile": "",
    "toolTip": "Part_RefineShape",
    "groups": []
  },
  {
    "command": "Part_ReverseShape",
    "iconFile": "",
    "toolTip": "Part_ReverseShape",
    "groups": []
  },
  {
    "command": "Part_Revolve",
    "iconFile": "Part_Revolve",
    "toolTip": "Part_Revolve",
    "groups": []
  },
  {
    "command": "Part_RuledSurface",
    "iconFile": "Part_RuledSurface",
    "toolTip": "Part_RuledSurface",
    "groups": []
  },
  {
    "command": "Part_Section",
    "iconFile": "Part_Section",
    "toolTip": "Part_Section",
    "groups": []
  },
  {
    "command": "Part_ShapeFromMesh",
    "iconFile": "",
    "toolTip": "Part_ShapeFromMesh",
    "groups": []
  },
  {
    "command": "Part_SimpleCopy",
    "iconFile": "",
    "toolTip": "Part_SimpleCopy",
    "groups": []
  },
  {
    "command": "Part_Slice",
    "iconFile": "Part_Slice",
    "toolTip": "Part_Slice",
    "groups": []
  },
  {
    "command": "Part_SliceApart",
    "iconFile": "Part_SliceApart",
    "toolTip": "Part_SliceApart",
    "groups": []
  },
  {
    "command": "Part_Sphere",
    "iconFile": "Part_Sphere",
    "toolTip": "Part_Sphere",
    "groups": []
  },
  {
    "command": "Part_Sweep",
    "iconFile": "Part_Sweep",
    "toolTip": "Part_Sweep",
    "groups": []
  },
  {
    "command": "Part_Thickness",
    "iconFile": "Part_Thickness",
    "toolTip": "Part_Thickness",
    "groups": []
  },
  {
    "command": "Part_Torus",
    "iconFile": "Part_Torus",
    "toolTip": "Part_Torus",
    "groups": []
  },
  {
    "command": "Part_XOR",
    "iconFile": "Part_XOR",
    "toolTip": "Part_XOR",
    "groups": []
  },
  {
    "command": "PartDesign_AdditiveBox",
    "iconFile": "",
    "toolTip": "PartDesign_AdditiveBox",
    "groups": []
  },
  {
    "command": "PartDesign_AdditiveCone",
    "iconFile": "",
    "toolTip": "PartDesign_AdditiveCone",
    "groups": []
  },
  {
    "command": "PartDesign_AdditiveCylinder",
    "iconFile": "",
    "toolTip": "PartDesign_AdditiveCylinder",
    "groups": []
  },
  {
    "command": "PartDesign_AdditiveEllipsoid",
    "iconFile": "",
    "toolTip": "PartDesign_AdditiveEllipsoid",
    "groups": []
  },
  {
    "command": "PartDesign_AdditiveLoft",
    "iconFile": "",
    "toolTip": "PartDesign_AdditiveLoft",
    "groups": []
  },
  {
    "command": "PartDesign_AdditivePipe",
    "iconFile": "",
    "toolTip": "PartDesign_AdditivePipe",
    "groups": []
  },
  {
    "command": "PartDesign_AdditivePrism",
    "iconFile": "",
    "toolTip": "PartDesign_AdditivePrism",
    "groups": []
  },
  {
    "command": "PartDesign_AdditiveSphere",
    "iconFile": "",
    "toolTip": "PartDesign_AdditiveSphere",
    "groups": []
  },
  {
    "command": "PartDesign_AdditiveTorus",
    "iconFile": "",
    "toolTip": "PartDesign_AdditiveTorus",
    "groups": []
  },
  {
    "command": "PartDesign_AdditiveWedge",
    "iconFile": "",
    "toolTip": "PartDesign_AdditiveWedge",
    "groups": []
  },
  {
    "command": "PartDesign_Body",
    "iconFile": "PartDesign_Body",
    "toolTip": "PartDesign_Body",
    "groups": []
  },
  {
    "command": "PartDesign_Boolean",
    "iconFile": "PartDesign_Boolean",
    "toolTip": "PartDesign_Boolean",
    "groups": []
  },
  {
    "command": "PartDesign_Chamfer",
    "iconFile": "PartDesign_Chamfer",
    "toolTip": "PartDesign_Chamfer",
    "groups": []
  },
  {
    "command": "PartDesign_Clone",
    "iconFile": "PartDesign_Clone",
    "toolTip": "PartDesign_Clone",
    "groups": []
  },
  {
    "command": "PartDesign_CompPrimitiveAdditive",
    "iconFile": "",
    "toolTip": "PartDesign_CompPrimitiveAdditive",
    "groups": []
  },
  {
    "command": "PartDesign_CompPrimitiveSubtractive",
    "iconFile": "",
    "toolTip": "PartDesign_CompPrimitiveSubtractive",
    "groups": []
  },
  {
    "command": "PartDesign_CoordinateSystem",
    "iconFile": "PartDesign_CoordinateSystem",
    "toolTip": "PartDesign_CoordinateSystem",
    "groups": []
  },
  {
    "command": "PartDesign_Draft",
    "iconFile": "PartDesign_Draft",
    "toolTip": "PartDesign_Draft",
    "groups": []
  },
  {
    "command": "PartDesign_DuplicateSelection",
    "iconFile": "",
    "toolTip": "PartDesign_DuplicateSelection",
    "groups": []
  },
  {
    "command": "PartDesign_Fillet",
    "iconFile": "PartDesign_Fillet",
    "toolTip": "PartDesign_Fillet",
    "groups": []
  },
  {
    "command": "PartDesign_Groove",
    "iconFile": "PartDesign_Groove",
    "toolTip": "PartDesign_Groove",
    "groups": []
  },
  {
    "command": "PartDesign_Hole",
    "iconFile": "PartDesign_Hole",
    "toolTip": "PartDesign_Hole",
    "groups": []
  },
  {
    "command": "PartDesign_InvoluteGear",
    "iconFile": "PartDesign_InvoluteGear",
    "toolTip": "PartDesign_InvoluteGear",
    "groups": []
  },
  {
    "command": "PartDesign_Line",
    "iconFile": "PartDesign_Line",
    "toolTip": "PartDesign_Line",
    "groups": []
  },
  {
    "command": "PartDesign_LinearPattern",
    "iconFile": "PartDesign_LinearPattern",
    "toolTip": "PartDesign_LinearPattern",
    "groups": []
  },
  {
    "command": "PartDesign_Migrate",
    "iconFile": "",
    "toolTip": "PartDesign_Migrate",
    "groups": []
  },
  {
    "command": "PartDesign_Mirrored",
    "iconFile": "PartDesign_Mirrored",
    "toolTip": "PartDesign_Mirrored",
    "groups": []
  },
  {
    "command": "PartDesign_MultiTransform",
    "iconFile": "PartDesign_MultiTransform",
    "toolTip": "PartDesign_MultiTransform",
    "groups": []
  },
  {
    "command": "PartDesign_NewSketch",
    "iconFile": "",
    "toolTip": "PartDesign_NewSketch",
    "groups": []
  },
  {
    "command": "PartDesign_Pad",
    "iconFile": "PartDesign_Pad",
    "toolTip": "PartDesign_Pad",
    "groups": []
  },
  {
    "command": "PartDesign_Plane",
    "iconFile": "PartDesign_Plane",
    "toolTip": "PartDesign_Plane",
    "groups": []
  },
  {
    "command": "PartDesign_Pocket",
    "iconFile": "PartDesign_Pocket",
    "toolTip": "PartDesign_Pocket",
    "groups": []
  },
  {
    "command": "PartDesign_Point",
    "iconFile": "PartDesign_Point",
    "toolTip": "PartDesign_Point",
    "groups": []
  },
  {
    "command": "PartDesign_PolarPattern",
    "iconFile": "PartDesign_PolarPattern",
    "toolTip": "PartDesign_PolarPattern",
    "groups": []
  },
  {
    "command": "PartDesign_Revolution",
    "iconFile": "PartDesign_Revolution",
    "toolTip": "PartDesign_Revolution",
    "groups": []
  },
  {
    "command": "PartDesign_ShapeBinder",
    "iconFile": "PartDesign_ShapeBinder",
    "toolTip": "PartDesign_ShapeBinder",
    "groups": []
  },
  {
    "command": "PartDesign_SubtractiveBox",
    "iconFile": "",
    "toolTip": "PartDesign_SubtractiveBox",
    "groups": []
  },
  {
    "command": "PartDesign_SubtractiveCone",
    "iconFile": "",
    "toolTip": "PartDesign_SubtractiveCone",
    "groups": []
  },
  {
    "command": "PartDesign_SubtractiveCylinder",
    "iconFile": "",
    "toolTip": "PartDesign_SubtractiveCylinder",
    "groups": []
  },
  {
    "command": "PartDesign_SubtractiveEllipsoid",
    "iconFile": "",
    "toolTip": "PartDesign_SubtractiveEllipsoid",
    "groups": []
  },
  {
    "command": "PartDesign_SubtractiveLoft",
    "iconFile": "",
    "toolTip": "PartDesign_SubtractiveLoft",
    "groups": []
  },
  {
    "command": "PartDesign_SubtractivePipe",
    "iconFile": "",
    "toolTip": "PartDesign_SubtractivePipe",
    "groups": []
  },
  {
    "command": "PartDesign_SubtractivePrism",
    "iconFile": "",
    "toolTip": "PartDesign_SubtractivePrism",
    "groups": []
  },
  {
    "command": "PartDesign_SubtractiveSphere",
    "iconFile": "",
    "toolTip": "PartDesign_SubtractiveSphere",
    "groups": []
  },
  {
    "command": "PartDesign_SubtractiveTorus",
    "iconFile": "",
    "toolTip": "PartDesign_SubtractiveTorus",
    "groups": []
  },
  {
    "command": "PartDesign_SubtractiveWedge",
    "iconFile": "",
    "toolTip": "PartDesign_SubtractiveWedge",
    "groups": []
  },
  {
    "command": "PartDesign_Thickness",
    "iconFile": "PartDesign_Thickness",
    "toolTip": "PartDesign_Thickness",
    "groups": []
  },
  {
    "command": "PartDesign_WizardShaft",
    "iconFile": "",
    "toolTip": "PartDesign_WizardShaft",
    "groups": []
  },
  {
    "command": "Path_Adaptive",
    "iconFile": "",
    "toolTip": "Path_Adaptive",
    "groups": []
  },
  {
    "command": "Path_Array",
    "iconFile": "",
    "toolTip": "Path_Array",
    "groups": []
  },
  {
    "command": "Path_Comment",
    "iconFile": "",
    "toolTip": "Path_Comment",
    "groups": []
  },
  {
    "command": "Path_Contour",
    "iconFile": "",
    "toolTip": "Path_Contour",
    "groups": []
  },
  {
    "command": "Path_Custom",
    "iconFile": "",
    "toolTip": "Path_Custom",
    "groups": []
  },
  {
    "command": "Path_Deburr",
    "iconFile": "",
    "toolTip": "Path_Deburr",
    "groups": []
  },
  {
    "command": "Path_DressupAxisMap",
    "iconFile": "",
    "toolTip": "Path_DressupAxisMap",
    "groups": []
  },
  {
    "command": "Path_DressupDogbone",
    "iconFile": "",
    "toolTip": "Path_DressupDogbone",
    "groups": []
  },
  {
    "command": "Path_DressupDragKnife",
    "iconFile": "",
    "toolTip": "Path_DressupDragKnife",
    "groups": []
  },
  {
    "command": "Path_DressupLeadInOut",
    "iconFile": "",
    "toolTip": "Path_DressupLeadInOut",
    "groups": []
  },
  {
    "command": "Path_DressupRampEntry",
    "iconFile": "",
    "toolTip": "Path_DressupRampEntry",
    "groups": []
  },
  {
    "command": "Path_DressupTag",
    "iconFile": "",
    "toolTip": "Path_DressupTag",
    "groups": []
  },
  {
    "command": "Path_Drilling",
    "iconFile": "",
    "toolTip": "Path_Drilling",
    "groups": []
  },
  {
    "command": "Path_Engrave",
    "iconFile": "",
    "toolTip": "Path_Engrave",
    "groups": []
  },
  {
    "command": "Path_EngraveTools",
    "iconFile": "",
    "toolTip": "Path_EngraveTools",
    "groups": []
  },
  {
    "command": "Path_ExportTemplate",
    "iconFile": "",
    "toolTip": "Path_ExportTemplate",
    "groups": []
  },
  {
    "command": "Path_Fixture",
    "iconFile": "",
    "toolTip": "Path_Fixture",
    "groups": []
  },
  {
    "command": "Path_Helix",
    "iconFile": "",
    "toolTip": "Path_Helix",
    "groups": []
  },
  {
    "command": "Path_Inspect",
    "iconFile": "",
    "toolTip": "Path_Inspect",
    "groups": []
  },
  {
    "command": "Path_Job",
    "iconFile": "",
    "toolTip": "Path_Job",
    "groups": []
  },
  {
    "command": "Path_MillFace",
    "iconFile": "",
    "toolTip": "Path_MillFace",
    "groups": []
  },
  {
    "command": "Path_OperationCopy",
    "iconFile": "",
    "toolTip": "Path_OperationCopy",
    "groups": []
  },
  {
    "command": "Path_Pocket_3D",
    "iconFile": "",
    "toolTip": "Path_Pocket_3D",
    "groups": []
  },
  {
    "command": "Path_Pocket_Shape",
    "iconFile": "",
    "toolTip": "Path_Pocket_Shape",
    "groups": []
  },
  {
    "command": "Path_Post",
    "iconFile": "",
    "toolTip": "Path_Post",
    "groups": []
  },
  {
    "command": "Path_Profile_Edges",
    "iconFile": "",
    "toolTip": "Path_Profile_Edges",
    "groups": []
  },
  {
    "command": "Path_Profile_Faces",
    "iconFile": "",
    "toolTip": "Path_Profile_Faces",
    "groups": []
  },
  {
    "command": "Path_SelectLoop",
    "iconFile": "",
    "toolTip": "Path_SelectLoop",
    "groups": []
  },
  {
    "command": "Path_SimpleCopy",
    "iconFile": "",
    "toolTip": "Path_SimpleCopy",
    "groups": []
  },
  {
    "command": "Path_Simulator",
    "iconFile": "",
    "toolTip": "Path_Simulator",
    "groups": []
  },
  {
    "command": "Path_Stop",
    "iconFile": "",
    "toolTip": "Path_Stop",
    "groups": []
  },
  {
    "command": "Path_ToolLibraryEdit",
    "iconFile": "",
    "toolTip": "Path_ToolLibraryEdit",
    "groups": []
  },
  {
    "command": "Plot_Axes",
    "iconFile": "",
    "toolTip": "Plot_Axes",
    "groups": []
  },
  {
    "command": "Plot_Grid",
    "iconFile": "",
    "toolTip": "Plot_Grid",
    "groups": []
  },
  {
    "command": "Plot_Labels",
    "iconFile": "",
    "toolTip": "Plot_Labels",
    "groups": []
  },
  {
    "command": "Plot_Legend",
    "iconFile": "",
    "toolTip": "Plot_Legend",
    "groups": []
  },
  {
    "command": "Plot_Positions",
    "iconFile": "",
    "toolTip": "Plot_Positions",
    "groups": []
  },
  {
    "command": "Plot_SaveFig",
    "iconFile": "",
    "toolTip": "Plot_SaveFig",
    "groups": []
  },
  {
    "command": "Plot_Series",
    "iconFile": "",
    "toolTip": "Plot_Series",
    "groups": []
  },
  {
    "command": "Points_Convert",
    "iconFile": "",
    "toolTip": "Points_Convert",
    "groups": []
  },
  {
    "command": "Points_Export",
    "iconFile": "",
    "toolTip": "Points_Export",
    "groups": []
  },
  {
    "command": "Points_Import",
    "iconFile": "",
    "toolTip": "Points_Import",
    "groups": []
  },
  {
    "command": "Points_Merge",
    "iconFile": "",
    "toolTip": "Points_Merge",
    "groups": []
  },
  {
    "command": "Points_PolyCut",
    "iconFile": "",
    "toolTip": "Points_PolyCut",
    "groups": []
  },
  {
    "command": "Raytracing_ExportProject",
    "iconFile": "",
    "toolTip": "Raytracing_ExportProject",
    "groups": []
  },
  {
    "command": "Raytracing_NewLuxProject",
    "iconFile": "",
    "toolTip": "Raytracing_NewLuxProject",
    "groups": []
  },
  {
    "command": "Raytracing_NewPartSegment",
    "iconFile": "",
    "toolTip": "Raytracing_NewPartSegment",
    "groups": []
  },
  {
    "command": "Raytracing_NewPovrayProject",
    "iconFile": "",
    "toolTip": "Raytracing_NewPovrayProject",
    "groups": []
  },
  {
    "command": "Raytracing_Render",
    "iconFile": "",
    "toolTip": "Raytracing_Render",
    "groups": []
  },
  {
    "command": "Raytracing_ResetCamera",
    "iconFile": "",
    "toolTip": "Raytracing_ResetCamera",
    "groups": []
  },
  {
    "command": "Raytracing_WriteCamera",
    "iconFile": "",
    "toolTip": "Raytracing_WriteCamera",
    "groups": []
  },
  {
    "command": "Raytracing_WritePart",
    "iconFile": "",
    "toolTip": "Raytracing_WritePart",
    "groups": []
  },
  {
    "command": "Raytracing_WriteView",
    "iconFile": "",
    "toolTip": "Raytracing_WriteView",
    "groups": []
  },
  {
    "command": "Reen_ApproxPlane",
    "iconFile": "",
    "toolTip": "Reen_ApproxPlane",
    "groups": []
  },
  {
    "command": "Reen_ApproxSurface",
    "iconFile": "",
    "toolTip": "Reen_ApproxSurface",
    "groups": []
  },
  {
    "command": "Reen_PoissonReconstruction",
    "iconFile": "",
    "toolTip": "Reen_PoissonReconstruction",
    "groups": []
  },
  {
    "command": "Reen_ViewTriangulation",
    "iconFile": "",
    "toolTip": "Reen_ViewTriangulation",
    "groups": []
  },
  {
    "command": "Robot_AddToolShape",
    "iconFile": "",
    "toolTip": "Robot_AddToolShape",
    "groups": []
  },
  {
    "command": "Robot_Create",
    "iconFile": "",
    "toolTip": "Robot_Create",
    "groups": []
  },
  {
    "command": "Robot_CreateTrajectory",
    "iconFile": "Robot_CreateTrajectory",
    "toolTip": "Robot_CreateTrajectory",
    "groups": []
  },
  {
    "command": "Robot_Edge2Trac",
    "iconFile": "Robot_Edge2Trac",
    "toolTip": "Robot_Edge2Trac",
    "groups": []
  },
  {
    "command": "Robot_ExportKukaCompact",
    "iconFile": "",
    "toolTip": "Robot_ExportKukaCompact",
    "groups": []
  },
  {
    "command": "Robot_ExportKukaFull",
    "iconFile": "",
    "toolTip": "Robot_ExportKukaFull",
    "groups": []
  },
  {
    "command": "Robot_InsertKukaIR125",
    "iconFile": "",
    "toolTip": "Robot_InsertKukaIR125",
    "groups": []
  },
  {
    "command": "Robot_InsertKukaIR16",
    "iconFile": "",
    "toolTip": "Robot_InsertKukaIR16",
    "groups": []
  },
  {
    "command": "Robot_InsertKukaIR210",
    "iconFile": "",
    "toolTip": "Robot_InsertKukaIR210",
    "groups": []
  },
  {
    "command": "Robot_InsertKukaIR500",
    "iconFile": "",
    "toolTip": "Robot_InsertKukaIR500",
    "groups": []
  },
  {
    "command": "Robot_InsertWaypoint",
    "iconFile": "Robot_InsertWaypoint",
    "toolTip": "Robot_InsertWaypoint",
    "groups": []
  },
  {
    "command": "Robot_InsertWaypointPreselect",
    "iconFile": "",
    "toolTip": "Robot_InsertWaypointPreselect",
    "groups": []
  },
  {
    "command": "Robot_RestoreHomePos",
    "iconFile": "Robot_RestoreHomePos",
    "toolTip": "Robot_RestoreHomePos",
    "groups": []
  },
  {
    "command": "Robot_SetDefaultOrientation",
    "iconFile": "Robot_SetDefaultOrientation",
    "toolTip": "Robot_SetDefaultOrientation",
    "groups": []
  },
  {
    "command": "Robot_SetDefaultValues",
    "iconFile": "Robot_SetDefaultValues",
    "toolTip": "Robot_SetDefaultValues",
    "groups": []
  },
  {
    "command": "Robot_SetHomePos",
    "iconFile": "Robot_SetHomePos",
    "toolTip": "Robot_SetHomePos",
    "groups": []
  },
  {
    "command": "Robot_Simulate",
    "iconFile": "Robot_Simulate",
    "toolTip": "Robot_Simulate",
    "groups": []
  },
  {
    "command": "Robot_TrajectoryCompound",
    "iconFile": "Robot_TrajectoryCompound",
    "toolTip": "Robot_TrajectoryCompound",
    "groups": []
  },
  {
    "command": "Robot_TrajectoryDressUp",
    "iconFile": "Robot_TrajectoryDressUp",
    "toolTip": "Robot_TrajectoryDressUp",
    "groups": []
  },
  {
    "command": "Ship_AreasCurve",
    "iconFile": "",
    "toolTip": "Ship_AreasCurve",
    "groups": []
  },
  {
    "command": "Ship_Capacity",
    "iconFile": "",
    "toolTip": "Ship_Capacity",
    "groups": []
  },
  {
    "command": "Ship_CreateShip",
    "iconFile": "",
    "toolTip": "Ship_CreateShip",
    "groups": []
  },
  {
    "command": "Ship_GZ",
    "iconFile": "Ship_GZ",
    "toolTip": "Ship_GZ",
    "groups": []
  },
  {
    "command": "Ship_Hydrostatics",
    "iconFile": "Ship_Hydrostatics",
    "toolTip": "Ship_Hydrostatics",
    "groups": []
  },
  {
    "command": "Ship_LoadCondition",
    "iconFile": "Ship_LoadCondition",
    "toolTip": "Ship_LoadCondition",
    "groups": []
  },
  {
    "command": "Ship_LoadExample",
    "iconFile": "",
    "toolTip": "Ship_LoadExample",
    "groups": []
  },
  {
    "command": "Ship_OutlineDraw",
    "iconFile": "Ship_OutlineDraw",
    "toolTip": "Ship_OutlineDraw",
    "groups": []
  },
  {
    "command": "Ship_Tank",
    "iconFile": "Ship_Tank",
    "toolTip": "Ship_Tank",
    "groups": []
  },
  {
    "command": "Ship_Weight",
    "iconFile": "Ship_Weight",
    "toolTip": "Ship_Weight",
    "groups": []
  },
  {
    "command": "Sketcher_BSplineComb",
    "iconFile": "Sketcher_BSplineComb",
    "toolTip": "Sketcher_BSplineComb",
    "groups": []
  },
  {
    "command": "Sketcher_BSplineConvertToNURB",
    "iconFile": "",
    "toolTip": "Sketcher_BSplineConvertToNURB",
    "groups": []
  },
  {
    "command": "Sketcher_BSplineDecreaseKnotMultiplicity",
    "iconFile": "Sketcher_BSplineDecreaseKnotMultiplicity",
    "toolTip": "Sketcher_BSplineDecreaseKnotMultiplicity",
    "groups": []
  },
  {
    "command": "Sketcher_BSplineDegree",
    "iconFile": "Sketcher_BSplineDegree",
    "toolTip": "Sketcher_BSplineDegree",
    "groups": []
  },
  {
    "command": "Sketcher_BSplineIncreaseDegree",
    "iconFile": "Sketcher_BSplineIncreaseDegree",
    "toolTip": "Sketcher_BSplineIncreaseDegree",
    "groups": []
  },
  {
    "command": "Sketcher_BSplineIncreaseKnotMultiplicity",
    "iconFile": "Sketcher_BSplineIncreaseKnotMultiplicity",
    "toolTip": "Sketcher_BSplineIncreaseKnotMultiplicity",
    "groups": []
  },
  {
    "command": "Sketcher_BSplineKnotMultiplicity",
    "iconFile": "Sketcher_BSplineKnotMultiplicity",
    "toolTip": "Sketcher_BSplineKnotMultiplicity",
    "groups": []
  },
  {
    "command": "Sketcher_BSplinePolygon",
    "iconFile": "Sketcher_BSplinePolygon",
    "toolTip": "Sketcher_BSplinePolygon",
    "groups": []
  },
  {
    "command": "Sketcher_CarbonCopy",
    "iconFile": "Sketcher_CarbonCopy",
    "toolTip": "Sketcher_CarbonCopy",
    "groups": []
  },
  {
    "command": "Sketcher_Clone",
    "iconFile": "Sketcher_Clone",
    "toolTip": "Sketcher_Clone",
    "groups": []
  },
  {
    "command": "Sketcher_CloseShape",
    "iconFile": "Sketcher_CloseShape",
    "toolTip": "Sketcher_CloseShape",
    "groups": []
  },
  {
    "command": "Sketcher_CompBSplineShowHideGeometryInformation",
    "iconFile": "",
    "toolTip": "Sketcher_CompBSplineShowHideGeometryInformation",
    "groups": []
  },
  {
    "command": "Sketcher_CompConstrainRadDia",
    "iconFile": "",
    "toolTip": "Sketcher_CompConstrainRadDia",
    "groups": []
  },
  {
    "command": "Sketcher_CompCopy",
    "iconFile": "",
    "toolTip": "Sketcher_CompCopy",
    "groups": []
  },
  {
    "command": "Sketcher_CompCreateArc",
    "iconFile": "",
    "toolTip": "Sketcher_CompCreateArc",
    "groups": []
  },
  {
    "command": "Sketcher_CompCreateBSpline",
    "iconFile": "",
    "toolTip": "Sketcher_CompCreateBSpline",
    "groups": []
  },
  {
    "command": "Sketcher_CompCreateCircle",
    "iconFile": "",
    "toolTip": "Sketcher_CompCreateCircle",
    "groups": []
  },
  {
    "command": "Sketcher_CompCreateConic",
    "iconFile": "",
    "toolTip": "Sketcher_CompCreateConic",
    "groups": []
  },
  {
    "command": "Sketcher_CompCreateRegularPolygon",
    "iconFile": "",
    "toolTip": "Sketcher_CompCreateRegularPolygon",
    "groups": []
  },
  {
    "command": "Sketcher_CompModifyKnotMultiplicity",
    "iconFile": "",
    "toolTip": "Sketcher_CompModifyKnotMultiplicity",
    "groups": []
  },
  {
    "command": "Sketcher_ConnectLines",
    "iconFile": "Sketcher_ConnectLines",
    "toolTip": "Sketcher_ConnectLines",
    "groups": []
  },
  {
    "command": "Sketcher_ConstrainAngle",
    "iconFile": "",
    "toolTip": "Sketcher_ConstrainAngle",
    "groups": []
  },
  {
    "command": "Sketcher_ConstrainBlock",
    "iconFile": "Sketcher_ConstrainBlock",
    "toolTip": "Sketcher_ConstrainBlock",
    "groups": []
  },
  {
    "command": "Sketcher_ConstrainCoincident",
    "iconFile": "Sketcher_ConstrainCoincident",
    "toolTip": "Sketcher_ConstrainCoincident",
    "groups": []
  },
  {
    "command": "Sketcher_ConstrainDiameter",
    "iconFile": "",
    "toolTip": "Sketcher_ConstrainDiameter",
    "groups": []
  },
  {
    "command": "Sketcher_ConstrainDistance",
    "iconFile": "Sketcher_ConstrainDistance",
    "toolTip": "Sketcher_ConstrainDistance",
    "groups": []
  },
  {
    "command": "Sketcher_ConstrainDistanceX",
    "iconFile": "",
    "toolTip": "Sketcher_ConstrainDistanceX",
    "groups": []
  },
  {
    "command": "Sketcher_ConstrainDistanceY",
    "iconFile": "",
    "toolTip": "Sketcher_ConstrainDistanceY",
    "groups": []
  },
  {
    "command": "Sketcher_ConstrainEqual",
    "iconFile": "",
    "toolTip": "Sketcher_ConstrainEqual",
    "groups": []
  },
  {
    "command": "Sketcher_ConstrainHorizontal",
    "iconFile": "Sketcher_ConstrainHorizontal",
    "toolTip": "Sketcher_ConstrainHorizontal",
    "groups": []
  },
  {
    "command": "Sketcher_ConstrainInternalAlignment",
    "iconFile": "",
    "toolTip": "Sketcher_ConstrainInternalAlignment",
    "groups": []
  },
  {
    "command": "Sketcher_ConstrainLock",
    "iconFile": "Sketcher_ConstrainLock",
    "toolTip": "Sketcher_ConstrainLock",
    "groups": []
  },
  {
    "command": "Sketcher_ConstrainParallel",
    "iconFile": "Sketcher_ConstrainParallel",
    "toolTip": "Sketcher_ConstrainParallel",
    "groups": []
  },
  {
    "command": "Sketcher_ConstrainPerpendicular",
    "iconFile": "",
    "toolTip": "Sketcher_ConstrainPerpendicular",
    "groups": []
  },
  {
    "command": "Sketcher_ConstrainPointOnObject",
    "iconFile": "",
    "toolTip": "Sketcher_ConstrainPointOnObject",
    "groups": []
  },
  {
    "command": "Sketcher_ConstrainRadius",
    "iconFile": "",
    "toolTip": "Sketcher_ConstrainRadius",
    "groups": []
  },
  {
    "command": "Sketcher_ConstrainSnellsLaw",
    "iconFile": "",
    "toolTip": "Sketcher_ConstrainSnellsLaw",
    "groups": []
  },
  {
    "command": "Sketcher_ConstrainSymmetric",
    "iconFile": "",
    "toolTip": "Sketcher_ConstrainSymmetric",
    "groups": []
  },
  {
    "command": "Sketcher_ConstrainTangent",
    "iconFile": "",
    "toolTip": "Sketcher_ConstrainTangent",
    "groups": []
  },
  {
    "command": "Sketcher_ConstrainVertical",
    "iconFile": "Sketcher_ConstrainVertical",
    "toolTip": "Sketcher_ConstrainVertical",
    "groups": []
  },
  {
    "command": "Sketcher_Copy",
    "iconFile": "Sketcher_Copy",
    "toolTip": "Sketcher_Copy",
    "groups": []
  },
  {
    "command": "Sketcher_Create3PointArc",
    "iconFile": "Sketcher_Create3PointArc",
    "toolTip": "Sketcher_Create3PointArc",
    "groups": []
  },
  {
    "command": "Sketcher_Create3PointCircle",
    "iconFile": "Sketcher_Create3PointCircle",
    "toolTip": "Sketcher_Create3PointCircle",
    "groups": []
  },
  {
    "command": "Sketcher_CreateArc",
    "iconFile": "Sketcher_CreateArc",
    "toolTip": "Sketcher_CreateArc",
    "groups": []
  },
  {
    "command": "Sketcher_CreateArcOfEllipse",
    "iconFile": "",
    "toolTip": "Sketcher_CreateArcOfEllipse",
    "groups": []
  },
  {
    "command": "Sketcher_CreateArcOfHyperbola",
    "iconFile": "",
    "toolTip": "Sketcher_CreateArcOfHyperbola",
    "groups": []
  },
  {
    "command": "Sketcher_CreateArcOfParabola",
    "iconFile": "",
    "toolTip": "Sketcher_CreateArcOfParabola",
    "groups": []
  },
  {
    "command": "Sketcher_CreateBSpline",
    "iconFile": "Sketcher_CreateBSpline",
    "toolTip": "Sketcher_CreateBSpline",
    "groups": []
  },
  {
    "command": "Sketcher_CreateCircle",
    "iconFile": "Sketcher_CreateCircle",
    "toolTip": "Sketcher_CreateCircle",
    "groups": []
  },
  {
    "command": "Sketcher_CreateEllipseBy3Points",
    "iconFile": "",
    "toolTip": "Sketcher_CreateEllipseBy3Points",
    "groups": []
  },
  {
    "command": "Sketcher_CreateEllipseByCenter",
    "iconFile": "",
    "toolTip": "Sketcher_CreateEllipseByCenter",
    "groups": []
  },
  {
    "command": "Sketcher_CreateFillet",
    "iconFile": "Sketcher_CreateFillet",
    "toolTip": "Sketcher_CreateFillet",
    "groups": []
  },
  {
    "command": "Sketcher_CreateHeptagon",
    "iconFile": "Sketcher_CreateHeptagon",
    "toolTip": "Sketcher_CreateHeptagon",
    "groups": []
  },
  {
    "command": "Sketcher_CreateHexagon",
    "iconFile": "Sketcher_CreateHexagon",
    "toolTip": "Sketcher_CreateHexagon",
    "groups": []
  },
  {
    "command": "Sketcher_CreateLine",
    "iconFile": "Sketcher_CreateLine",
    "toolTip": "Sketcher_CreateLine",
    "groups": []
  },
  {
    "command": "Sketcher_CreateOctagon",
    "iconFile": "Sketcher_CreateOctagon",
    "toolTip": "Sketcher_CreateOctagon",
    "groups": []
  },
  {
    "command": "Sketcher_CreatePentagon",
    "iconFile": "Sketcher_CreatePentagon",
    "toolTip": "Sketcher_CreatePentagon",
    "groups": []
  },
  {
    "command": "Sketcher_CreatePeriodicBSpline",
    "iconFile": "",
    "toolTip": "Sketcher_CreatePeriodicBSpline",
    "groups": []
  },
  {
    "command": "Sketcher_CreatePoint",
    "iconFile": "Sketcher_CreatePoint",
    "toolTip": "Sketcher_CreatePoint",
    "groups": []
  },
  {
    "command": "Sketcher_CreatePolyline",
    "iconFile": "Sketcher_CreatePolyline",
    "toolTip": "Sketcher_CreatePolyline",
    "groups": []
  },
  {
    "command": "Sketcher_CreateRectangle",
    "iconFile": "Sketcher_CreateRectangle",
    "toolTip": "Sketcher_CreateRectangle",
    "groups": []
  },
  {
    "command": "Sketcher_CreateSlot",
    "iconFile": "Sketcher_CreateSlot",
    "toolTip": "Sketcher_CreateSlot",
    "groups": []
  },
  {
    "command": "Sketcher_CreateSquare",
    "iconFile": "Sketcher_CreateSquare",
    "toolTip": "Sketcher_CreateSquare",
    "groups": []
  },
  {
    "command": "Sketcher_CreateTriangle",
    "iconFile": "Sketcher_CreateTriangle",
    "toolTip": "Sketcher_CreateTriangle",
    "groups": []
  },
  {
    "command": "Sketcher_DeleteAllConstraints",
    "iconFile": "",
    "toolTip": "Sketcher_DeleteAllConstraints",
    "groups": []
  },
  {
    "command": "Sketcher_DeleteAllGeometry",
    "iconFile": "",
    "toolTip": "Sketcher_DeleteAllGeometry",
    "groups": []
  },
  {
    "command": "Sketcher_EditSketch",
    "iconFile": "Sketcher_EditSketch",
    "toolTip": "Sketcher_EditSketch",
    "groups": []
  },
  {
    "command": "Sketcher_Extend",
    "iconFile": "Sketcher_Extend",
    "toolTip": "Sketcher_Extend",
    "groups": []
  },
  {
    "command": "Sketcher_External",
    "iconFile": "Sketcher_External",
    "toolTip": "Sketcher_External",
    "groups": []
  },
  {
    "command": "Sketcher_LeaveSketch",
    "iconFile": "Sketcher_LeaveSketch",
    "toolTip": "Sketcher_LeaveSketch",
    "groups": []
  },
  {
    "command": "Sketcher_MapSketch",
    "iconFile": "Sketcher_MapSketch",
    "toolTip": "Sketcher_MapSketch",
    "groups": []
  },
  {
    "command": "Sketcher_MergeSketches",
    "iconFile": "",
    "toolTip": "Sketcher_MergeSketches",
    "groups": []
  },
  {
    "command": "Sketcher_MirrorSketch",
    "iconFile": "Sketcher_MirrorSketch",
    "toolTip": "Sketcher_MirrorSketch",
    "groups": []
  },
  {
    "command": "Sketcher_Move",
    "iconFile": "Sketcher_Move",
    "toolTip": "Sketcher_Move",
    "groups": []
  },
  {
    "command": "Sketcher_NewSketch",
    "iconFile": "Sketcher_NewSketch",
    "toolTip": "Sketcher_NewSketch",
    "groups": []
  },
  {
    "command": "Sketcher_ProfilesHexagon1",
    "iconFile": "Sketcher_ProfilesHexagon1",
    "toolTip": "Sketcher_ProfilesHexagon1",
    "groups": []
  },
  {
    "command": "Sketcher_RectangularArray",
    "iconFile": "Sketcher_RectangularArray",
    "toolTip": "Sketcher_RectangularArray",
    "groups": []
  },
  {
    "command": "Sketcher_ReorientSketch",
    "iconFile": "",
    "toolTip": "Sketcher_ReorientSketch",
    "groups": []
  },
  {
    "command": "Sketcher_RestoreInternalAlignmentGeometry",
    "iconFile": "",
    "toolTip": "Sketcher_RestoreInternalAlignmentGeometry",
    "groups": []
  },
  {
    "command": "Sketcher_SelectConflictingConstraints",
    "iconFile": "Sketcher_SelectConflictingConstraints",
    "toolTip": "Sketcher_SelectConflictingConstraints",
    "groups": []
  },
  {
    "command": "Sketcher_SelectConstraints",
    "iconFile": "Sketcher_SelectConstraints",
    "toolTip": "Sketcher_SelectConstraints",
    "groups": []
  },
  {
    "command": "Sketcher_SelectElementsAssociatedWithConstraints",
    "iconFile": "Sketcher_SelectElementsAssociatedWithConstraints",
    "toolTip": "Sketcher_SelectElementsAssociatedWithConstraints",
    "groups": []
  },
  {
    "command": "Sketcher_SelectElementsWithDoFs",
    "iconFile": "Sketcher_SelectElementsWithDoFs",
    "toolTip": "Sketcher_SelectElementsWithDoFs",
    "groups": []
  },
  {
    "command": "Sketcher_SelectHorizontalAxis",
    "iconFile": "Sketcher_SelectHorizontalAxis",
    "toolTip": "Sketcher_SelectHorizontalAxis",
    "groups": []
  },
  {
    "command": "Sketcher_SelectOrigin",
    "iconFile": "Sketcher_SelectOrigin",
    "toolTip": "Sketcher_SelectOrigin",
    "groups": []
  },
  {
    "command": "Sketcher_SelectRedundantConstraints",
    "iconFile": "Sketcher_SelectRedundantConstraints",
    "toolTip": "Sketcher_SelectRedundantConstraints",
    "groups": []
  },
  {
    "command": "Sketcher_SelectVerticalAxis",
    "iconFile": "Sketcher_SelectVerticalAxis",
    "toolTip": "Sketcher_SelectVerticalAxis",
    "groups": []
  },
  {
    "command": "Sketcher_SwitchVirtualSpace",
    "iconFile": "Sketcher_SwitchVirtualSpace",
    "toolTip": "Sketcher_SwitchVirtualSpace",
    "groups": []
  },
  {
    "command": "Sketcher_Symmetry",
    "iconFile": "Sketcher_Symmetry",
    "toolTip": "Sketcher_Symmetry",
    "groups": []
  },
  {
    "command": "Sketcher_ToggleConstruction",
    "iconFile": "Sketcher_ToggleConstruction",
    "toolTip": "Sketcher_ToggleConstruction",
    "groups": []
  },
  {
    "command": "Sketcher_ToggleDrivingConstraint",
    "iconFile": "",
    "toolTip": "Sketcher_ToggleDrivingConstraint",
    "groups": []
  },
  {
    "command": "Sketcher_Trimming",
    "iconFile": "Sketcher_Trimming",
    "toolTip": "Sketcher_Trimming",
    "groups": []
  },
  {
    "command": "Sketcher_ValidateSketch",
    "iconFile": "",
    "toolTip": "Sketcher_ValidateSketch",
    "groups": []
  },
  {
    "command": "Sketcher_ViewSection",
    "iconFile": "Sketcher_ViewSection",
    "toolTip": "Sketcher_ViewSection",
    "groups": []
  },
  {
    "command": "Sketcher_ViewSketch",
    "iconFile": "Sketcher_ViewSketch",
    "toolTip": "Sketcher_ViewSketch",
    "groups": []
  },
  {
    "command": "Spreadsheet_AlignBottom",
    "iconFile": "",
    "toolTip": "Spreadsheet_AlignBottom",
    "groups": []
  },
  {
    "command": "Spreadsheet_AlignCenter",
    "iconFile": "",
    "toolTip": "Spreadsheet_AlignCenter",
    "groups": []
  },
  {
    "command": "Spreadsheet_AlignLeft",
    "iconFile": "",
    "toolTip": "Spreadsheet_AlignLeft",
    "groups": []
  },
  {
    "command": "Spreadsheet_AlignRight",
    "iconFile": "",
    "toolTip": "Spreadsheet_AlignRight",
    "groups": []
  },
  {
    "command": "Spreadsheet_AlignTop",
    "iconFile": "",
    "toolTip": "Spreadsheet_AlignTop",
    "groups": []
  },
  {
    "command": "Spreadsheet_AlignVCenter",
    "iconFile": "",
    "toolTip": "Spreadsheet_AlignVCenter",
    "groups": []
  },
  {
    "command": "Spreadsheet_CreateSheet",
    "iconFile": "",
    "toolTip": "Spreadsheet_CreateSheet",
    "groups": []
  },
  {
    "command": "Spreadsheet_Export",
    "iconFile": "",
    "toolTip": "Spreadsheet_Export",
    "groups": []
  },
  {
    "command": "Spreadsheet_Import",
    "iconFile": "",
    "toolTip": "Spreadsheet_Import",
    "groups": []
  },
  {
    "command": "Spreadsheet_MergeCells",
    "iconFile": "",
    "toolTip": "Spreadsheet_MergeCells",
    "groups": []
  },
  {
    "command": "Spreadsheet_SetAlias",
    "iconFile": "",
    "toolTip": "Spreadsheet_SetAlias",
    "groups": []
  },
  {
    "command": "Spreadsheet_SplitCell",
    "iconFile": "",
    "toolTip": "Spreadsheet_SplitCell",
    "groups": []
  },
  {
    "command": "Spreadsheet_StyleBold",
    "iconFile": "",
    "toolTip": "Spreadsheet_StyleBold",
    "groups": []
  },
  {
    "command": "Spreadsheet_StyleItalic",
    "iconFile": "",
    "toolTip": "Spreadsheet_StyleItalic",
    "groups": []
  },
  {
    "command": "Spreadsheet_StyleUnderline",
    "iconFile": "",
    "toolTip": "Spreadsheet_StyleUnderline",
    "groups": []
  },
  {
    "command": "Start_StartPage",
    "iconFile": "",
    "toolTip": "Start_StartPage",
    "groups": []
  },
  {
    "command": "Std_About",
    "iconFile": "",
    "toolTip": "Std_About",
    "groups": []
  },
  {
    "command": "Std_ActivateNextWindow",
    "iconFile": "",
    "toolTip": "Std_ActivateNextWindow",
    "groups": []
  },
  {
    "command": "Std_ActivatePrevWindow",
    "iconFile": "",
    "toolTip": "Std_ActivatePrevWindow",
    "groups": []
  },
  {
    "command": "Std_AddonMgr",
    "iconFile": "",
    "toolTip": "Std_AddonMgr",
    "groups": []
  },
  {
    "command": "Std_Alignment",
    "iconFile": "",
    "toolTip": "Std_Alignment",
    "groups": []
  },
  {
    "command": "Std_ArrangeIcons",
    "iconFile": "",
    "toolTip": "Std_ArrangeIcons",
    "groups": []
  },
  {
    "command": "Std_AxisCross",
    "iconFile": "",
    "toolTip": "Std_AxisCross",
    "groups": []
  },
  {
    "command": "Std_BoxSelection",
    "iconFile": "",
    "toolTip": "Std_BoxSelection",
    "groups": []
  },
  {
    "command": "Std_CascadeWindows",
    "iconFile": "",
    "toolTip": "Std_CascadeWindows",
    "groups": []
  },
  {
    "command": "Std_CloseActiveWindow",
    "iconFile": "",
    "toolTip": "Std_CloseActiveWindow",
    "groups": []
  },
  {
    "command": "Std_CloseAllWindows",
    "iconFile": "",
    "toolTip": "Std_CloseAllWindows",
    "groups": []
  },
  {
    "command": "Std_Copy",
    "iconFile": "",
    "toolTip": "Std_Copy",
    "groups": []
  },
  {
    "command": "Std_Cut",
    "iconFile": "",
    "toolTip": "Std_Cut",
    "groups": []
  },
  {
    "command": "Std_Delete",
    "iconFile": "",
    "toolTip": "Std_Delete",
    "groups": []
  },
  {
    "command": "Std_DemoMode",
    "iconFile": "",
    "toolTip": "Std_DemoMode",
    "groups": []
  },
  {
    "command": "Std_DlgCustomize",
    "iconFile": "",
    "toolTip": "Std_DlgCustomize",
    "groups": []
  },
  {
    "command": "Std_DlgMacroExecute",
    "iconFile": "",
    "toolTip": "Std_DlgMacroExecute",
    "groups": []
  },
  {
    "command": "Std_DlgMacroExecuteDirect",
    "iconFile": "",
    "toolTip": "Std_DlgMacroExecuteDirect",
    "groups": []
  },
  {
    "command": "Std_DlgMacroRecord",
    "iconFile": "",
    "toolTip": "Std_DlgMacroRecord",
    "groups": []
  },
  {
    "command": "Std_DlgParameter",
    "iconFile": "",
    "toolTip": "Std_DlgParameter",
    "groups": []
  },
  {
    "command": "Std_DlgPreferences",
    "iconFile": "",
    "toolTip": "Std_DlgPreferences",
    "groups": []
  },
  {
    "command": "Std_DockViewMenu",
    "iconFile": "",
    "toolTip": "Std_DockViewMenu",
    "groups": []
  },
  {
    "command": "Std_DrawStyle",
    "iconFile": "",
    "toolTip": "Std_DrawStyle",
    "groups": []
  },
  {
    "command": "Std_DrawStyleAsIs",
    "iconFile": "",
    "toolTip": "Std_DrawStyleAsIs",
    "groups": []
  },
  {
    "command": "Std_DrawStyleFlatLines",
    "iconFile": "",
    "toolTip": "Std_DrawStyleFlatLines",
    "groups": []
  },
  {
    "command": "Std_DrawStyleHiddenLine",
    "iconFile": "",
    "toolTip": "Std_DrawStyleHiddenLine",
    "groups": []
  },
  {
    "command": "Std_DrawStyleNoShading",
    "iconFile": "",
    "toolTip": "Std_DrawStyleNoShading",
    "groups": []
  },
  {
    "command": "Std_DrawStylePoints",
    "iconFile": "",
    "toolTip": "Std_DrawStylePoints",
    "groups": []
  },
  {
    "command": "Std_DrawStyleShaded",
    "iconFile": "",
    "toolTip": "Std_DrawStyleShaded",
    "groups": []
  },
  {
    "command": "Std_DrawStyleWireframe",
    "iconFile": "",
    "toolTip": "Std_DrawStyleWireframe",
    "groups": []
  },
  {
    "command": "Std_DuplicateSelection",
    "iconFile": "",
    "toolTip": "Std_DuplicateSelection",
    "groups": []
  },
  {
    "command": "Std_Edit",
    "iconFile": "",
    "toolTip": "Std_Edit",
    "groups": []
  },
  {
    "command": "Std_Export",
    "iconFile": "",
    "toolTip": "Std_Export",
    "groups": []
  },
  {
    "command": "Std_ExportGraphviz",
    "iconFile": "",
    "toolTip": "Std_ExportGraphviz",
    "groups": []
  },
  {
    "command": "Std_FreeCADFAQ",
    "iconFile": "",
    "toolTip": "Std_FreeCADFAQ",
    "groups": []
  },
  {
    "command": "Std_FreeCADForum",
    "iconFile": "",
    "toolTip": "Std_FreeCADForum",
    "groups": []
  },
  {
    "command": "Std_FreeCADPowerUserHub",
    "iconFile": "",
    "toolTip": "Std_FreeCADPowerUserHub",
    "groups": []
  },
  {
    "command": "Std_FreeCADUserHub",
    "iconFile": "",
    "toolTip": "Std_FreeCADUserHub",
    "groups": []
  },
  {
    "command": "Std_FreeCADWebsite",
    "iconFile": "",
    "toolTip": "Std_FreeCADWebsite",
    "groups": []
  },
  {
    "command": "Std_FreezeViews",
    "iconFile": "",
    "toolTip": "Std_FreezeViews",
    "groups": []
  },
  {
    "command": "Std_Group",
    "iconFile": "",
    "toolTip": "Std_Group",
    "groups": []
  },
  {
    "command": "Std_HideObjects",
    "iconFile": "",
    "toolTip": "Std_HideObjects",
    "groups": []
  },
  {
    "command": "Std_HideSelection",
    "iconFile": "",
    "toolTip": "Std_HideSelection",
    "groups": []
  },
  {
    "command": "Std_Import",
    "iconFile": "",
    "toolTip": "Std_Import",
    "groups": []
  },
  {
    "command": "Std_MacroStartDebug",
    "iconFile": "",
    "toolTip": "Std_MacroStartDebug",
    "groups": []
  },
  {
    "command": "Std_MacroStepInto",
    "iconFile": "",
    "toolTip": "Std_MacroStepInto",
    "groups": []
  },
  {
    "command": "Std_MacroStepOver",
    "iconFile": "",
    "toolTip": "Std_MacroStepOver",
    "groups": []
  },
  {
    "command": "Std_MacroStopDebug",
    "iconFile": "",
    "toolTip": "Std_MacroStopDebug",
    "groups": []
  },
  {
    "command": "Std_MacroStopRecord",
    "iconFile": "",
    "toolTip": "Std_MacroStopRecord",
    "groups": []
  },
  {
    "command": "Std_MainFullscreen",
    "iconFile": "",
    "toolTip": "Std_MainFullscreen",
    "groups": []
  },
  {
    "command": "Std_MeasureDistance",
    "iconFile": "",
    "toolTip": "Std_MeasureDistance",
    "groups": []
  },
  {
    "command": "Std_MergeProjects",
    "iconFile": "",
    "toolTip": "Std_MergeProjects",
    "groups": []
  },
  {
    "command": "Std_New",
    "iconFile": "",
    "toolTip": "Std_New",
    "groups": []
  },
  {
    "command": "Std_OnlineHelp",
    "iconFile": "",
    "toolTip": "Std_OnlineHelp",
    "groups": []
  },
  {
    "command": "Std_Open",
    "iconFile": "",
    "toolTip": "Std_Open",
    "groups": []
  },
  {
    "command": "Std_OrthographicCamera",
    "iconFile": "",
    "toolTip": "Std_OrthographicCamera",
    "groups": []
  },
  {
    "command": "Std_Part",
    "iconFile": "",
    "toolTip": "Std_Part",
    "groups": []
  },
  {
    "command": "Std_Paste",
    "iconFile": "",
    "toolTip": "Std_Paste",
    "groups": []
  },
  {
    "command": "Std_PerspectiveCamera",
    "iconFile": "",
    "toolTip": "Std_PerspectiveCamera",
    "groups": []
  },
  {
    "command": "Std_Placement",
    "iconFile": "Std_Placement",
    "toolTip": "Std_Placement",
    "groups": []
  },
  {
    "command": "Std_Print",
    "iconFile": "",
    "toolTip": "Std_Print",
    "groups": []
  },
  {
    "command": "Std_PrintPdf",
    "iconFile": "",
    "toolTip": "Std_PrintPdf",
    "groups": []
  },
  {
    "command": "Std_PrintPreview",
    "iconFile": "",
    "toolTip": "Std_PrintPreview",
    "groups": []
  },
  {
    "command": "Std_ProjectInfo",
    "iconFile": "",
    "toolTip": "Std_ProjectInfo",
    "groups": []
  },
  {
    "command": "Std_ProjectUtil",
    "iconFile": "",
    "toolTip": "Std_ProjectUtil",
    "groups": []
  },
  {
    "command": "Std_PythonHelp",
    "iconFile": "",
    "toolTip": "Std_PythonHelp",
    "groups": []
  },
  {
    "command": "Std_Quit",
    "iconFile": "",
    "toolTip": "Std_Quit",
    "groups": []
  },
  {
    "command": "Std_RandomColor",
    "iconFile": "",
    "toolTip": "Std_RandomColor",
    "groups": []
  },
  {
    "command": "Std_RecentFiles",
    "iconFile": "",
    "toolTip": "Std_RecentFiles",
    "groups": []
  },
  {
    "command": "Std_Redo",
    "iconFile": "",
    "toolTip": "Std_Redo",
    "groups": []
  },
  {
    "command": "Std_Refresh",
    "iconFile": "",
    "toolTip": "Std_Refresh",
    "groups": []
  },
  {
    "command": "Std_Revert",
    "iconFile": "",
    "toolTip": "Std_Revert",
    "groups": []
  },
  {
    "command": "Std_Save",
    "iconFile": "",
    "toolTip": "Std_Save",
    "groups": []
  },
  {
    "command": "Std_SaveAs",
    "iconFile": "",
    "toolTip": "Std_SaveAs",
    "groups": []
  },
  {
    "command": "Std_SaveCopy",
    "iconFile": "",
    "toolTip": "Std_SaveCopy",
    "groups": []
  },
  {
    "command": "Std_SceneInspector",
    "iconFile": "",
    "toolTip": "Std_SceneInspector",
    "groups": []
  },
  {
    "command": "Std_SelectAll",
    "iconFile": "",
    "toolTip": "Std_SelectAll",
    "groups": []
  },
  {
    "command": "Std_SelectVisibleObjects",
    "iconFile": "",
    "toolTip": "Std_SelectVisibleObjects",
    "groups": []
  },
  {
    "command": "Std_SetAppearance",
    "iconFile": "",
    "toolTip": "Std_SetAppearance",
    "groups": []
  },
  {
    "command": "Std_ShowObjects",
    "iconFile": "",
    "toolTip": "Std_ShowObjects",
    "groups": []
  },
  {
    "command": "Std_ShowSelection",
    "iconFile": "",
    "toolTip": "Std_ShowSelection",
    "groups": []
  },
  {
    "command": "Std_TestQM",
    "iconFile": "",
    "toolTip": "Std_TestQM",
    "groups": []
  },
  {
    "command": "Std_TestReloadQM",
    "iconFile": "",
    "toolTip": "Std_TestReloadQM",
    "groups": []
  },
  {
    "command": "Std_TextureMapping",
    "iconFile": "",
    "toolTip": "Std_TextureMapping",
    "groups": []
  },
  {
    "command": "Std_TileWindows",
    "iconFile": "",
    "toolTip": "Std_TileWindows",
    "groups": []
  },
  {
    "command": "Std_ToggleBreakpoint",
    "iconFile": "",
    "toolTip": "Std_ToggleBreakpoint",
    "groups": []
  },
  {
    "command": "Std_ToggleClipPlane",
    "iconFile": "",
    "toolTip": "Std_ToggleClipPlane",
    "groups": []
  },
  {
    "command": "Std_ToggleNavigation",
    "iconFile": "",
    "toolTip": "Std_ToggleNavigation",
    "groups": []
  },
  {
    "command": "Std_ToggleObjects",
    "iconFile": "",
    "toolTip": "Std_ToggleObjects",
    "groups": []
  },
  {
    "command": "Std_ToggleSelectability",
    "iconFile": "",
    "toolTip": "Std_ToggleSelectability",
    "groups": []
  },
  {
    "command": "Std_ToggleVisibility",
    "iconFile": "",
    "toolTip": "Std_ToggleVisibility",
    "groups": []
  },
  {
    "command": "Std_ToolBarMenu",
    "iconFile": "",
    "toolTip": "Std_ToolBarMenu",
    "groups": []
  },
  {
    "command": "Std_TreeCollapseDocument",
    "iconFile": "",
    "toolTip": "Std_TreeCollapseDocument",
    "groups": []
  },
  {
    "command": "Std_TreeMultiDocument",
    "iconFile": "",
    "toolTip": "Std_TreeMultiDocument",
    "groups": []
  },
  {
    "command": "Std_TreeSingleDocument",
    "iconFile": "",
    "toolTip": "Std_TreeSingleDocument",
    "groups": []
  },
  {
    "command": "Std_TreeViewDocument",
    "iconFile": "",
    "toolTip": "Std_TreeViewDocument",
    "groups": []
  },
  {
    "command": "Std_Undo",
    "iconFile": "",
    "toolTip": "Std_Undo",
    "groups": []
  },
  {
    "command": "Std_UnitsCalculator",
    "iconFile": "",
    "toolTip": "Std_UnitsCalculator",
    "groups": []
  },
  {
    "command": "Std_ViewBottom",
    "iconFile": "",
    "toolTip": "Std_ViewBottom",
    "groups": []
  },
  {
    "command": "Std_ViewBoxZoom",
    "iconFile": "",
    "toolTip": "Std_ViewBoxZoom",
    "groups": []
  },
  {
    "command": "Std_ViewCreate",
    "iconFile": "",
    "toolTip": "Std_ViewCreate",
    "groups": []
  },
  {
    "command": "Std_ViewDimetric",
    "iconFile": "",
    "toolTip": "Std_ViewDimetric",
    "groups": []
  },
  {
    "command": "Std_ViewDock",
    "iconFile": "",
    "toolTip": "Std_ViewDock",
    "groups": []
  },
  {
    "command": "Std_ViewDockUndockFullscreen",
    "iconFile": "",
    "toolTip": "Std_ViewDockUndockFullscreen",
    "groups": []
  },
  {
    "command": "Std_ViewFitAll",
    "iconFile": "",
    "toolTip": "Std_ViewFitAll",
    "groups": []
  },
  {
    "command": "Std_ViewFitSelection",
    "iconFile": "",
    "toolTip": "Std_ViewFitSelection",
    "groups": []
  },
  {
    "command": "Std_ViewFront",
    "iconFile": "",
    "toolTip": "Std_ViewFront",
    "groups": []
  },
  {
    "command": "Std_ViewFullscreen",
    "iconFile": "",
    "toolTip": "Std_ViewFullscreen",
    "groups": []
  },
  {
    "command": "Std_ViewIsometric",
    "iconFile": "",
    "toolTip": "Std_ViewIsometric",
    "groups": []
  },
  {
    "command": "Std_ViewIvIssueCamPos",
    "iconFile": "",
    "toolTip": "Std_ViewIvIssueCamPos",
    "groups": []
  },
  {
    "command": "Std_ViewIvStereoInterleavedColumns",
    "iconFile": "",
    "toolTip": "Std_ViewIvStereoInterleavedColumns",
    "groups": []
  },
  {
    "command": "Std_ViewIvStereoInterleavedRows",
    "iconFile": "",
    "toolTip": "Std_ViewIvStereoInterleavedRows",
    "groups": []
  },
  {
    "command": "Std_ViewIvStereoOff",
    "iconFile": "",
    "toolTip": "Std_ViewIvStereoOff",
    "groups": []
  },
  {
    "command": "Std_ViewIvStereoQuadBuff",
    "iconFile": "",
    "toolTip": "Std_ViewIvStereoQuadBuff",
    "groups": []
  },
  {
    "command": "Std_ViewIvStereoRedGreen",
    "iconFile": "",
    "toolTip": "Std_ViewIvStereoRedGreen",
    "groups": []
  },
  {
    "command": "Std_ViewLeft",
    "iconFile": "",
    "toolTip": "Std_ViewLeft",
    "groups": []
  },
  {
    "command": "Std_ViewRear",
    "iconFile": "",
    "toolTip": "Std_ViewRear",
    "groups": []
  },
  {
    "command": "Std_ViewRight",
    "iconFile": "",
    "toolTip": "Std_ViewRight",
    "groups": []
  },
  {
    "command": "Std_ViewRotateLeft",
    "iconFile": "",
    "toolTip": "Std_ViewRotateLeft",
    "groups": []
  },
  {
    "command": "Std_ViewRotateRight",
    "iconFile": "",
    "toolTip": "Std_ViewRotateRight",
    "groups": []
  },
  {
    "command": "Std_ViewScreenShot",
    "iconFile": "Std_ViewScreenShot",
    "toolTip": "Std_ViewScreenShot",
    "groups": []
  },
  {
    "command": "Std_ViewStatusBar",
    "iconFile": "",
    "toolTip": "Std_ViewStatusBar",
    "groups": []
  },
  {
    "command": "Std_ViewTop",
    "iconFile": "",
    "toolTip": "Std_ViewTop",
    "groups": []
  },
  {
    "command": "Std_ViewTrimetric",
    "iconFile": "",
    "toolTip": "Std_ViewTrimetric",
    "groups": []
  },
  {
    "command": "Std_ViewUndock",
    "iconFile": "",
    "toolTip": "Std_ViewUndock",
    "groups": []
  },
  {
    "command": "Std_ViewZoomIn",
    "iconFile": "",
    "toolTip": "Std_ViewZoomIn",
    "groups": []
  },
  {
    "command": "Std_ViewZoomOut",
    "iconFile": "",
    "toolTip": "Std_ViewZoomOut",
    "groups": []
  },
  {
    "command": "Std_WhatsThis",
    "iconFile": "",
    "toolTip": "Std_WhatsThis",
    "groups": []
  },
  {
    "command": "Std_Windows",
    "iconFile": "",
    "toolTip": "Std_Windows",
    "groups": []
  },
  {
    "command": "Std_Workbench",
    "iconFile": "",
    "toolTip": "Std_Workbench",
    "groups": []
  },
  {
    "command": "Surface_CurveOnMesh",
    "iconFile": "",
    "toolTip": "Surface_CurveOnMesh",
    "groups": []
  },
  {
    "command": "Surface_ExtendFace",
    "iconFile": "",
    "toolTip": "Surface_ExtendFace",
    "groups": []
  },
  {
    "command": "Surface_Filling",
    "iconFile": "Surface_Filling",
    "toolTip": "Surface_Filling",
    "groups": []
  },
  {
    "command": "Surface_GeomFillSurface",
    "iconFile": "",
    "toolTip": "Surface_GeomFillSurface",
    "groups": []
  },
  {
    "command": "TechDraw_Annotation",
    "iconFile": "",
    "toolTip": "TechDraw_Annotation",
    "groups": []
  },
  {
    "command": "TechDraw_ArchView",
    "iconFile": "",
    "toolTip": "TechDraw_ArchView",
    "groups": []
  },
  {
    "command": "TechDraw_Clip",
    "iconFile": "",
    "toolTip": "TechDraw_Clip",
    "groups": []
  },
  {
    "command": "TechDraw_ClipMinus",
    "iconFile": "",
    "toolTip": "TechDraw_ClipMinus",
    "groups": []
  },
  {
    "command": "TechDraw_ClipPlus",
    "iconFile": "",
    "toolTip": "TechDraw_ClipPlus",
    "groups": []
  },
  {
    "command": "TechDraw_DraftView",
    "iconFile": "",
    "toolTip": "TechDraw_DraftView",
    "groups": []
  },
  {
    "command": "TechDraw_ExportPage",
    "iconFile": "",
    "toolTip": "TechDraw_ExportPage",
    "groups": []
  },
  {
    "command": "TechDraw_ExportPageDxf",
    "iconFile": "",
    "toolTip": "TechDraw_ExportPageDxf",
    "groups": []
  },
  {
    "command": "TechDraw_Image",
    "iconFile": "",
    "toolTip": "TechDraw_Image",
    "groups": []
  },
  {
    "command": "TechDraw_LinkDimension",
    "iconFile": "",
    "toolTip": "TechDraw_LinkDimension",
    "groups": []
  },
  {
    "command": "TechDraw_NewAngle3PtDimension",
    "iconFile": "",
    "toolTip": "TechDraw_NewAngle3PtDimension",
    "groups": []
  },
  {
    "command": "TechDraw_NewAngleDimension",
    "iconFile": "",
    "toolTip": "TechDraw_NewAngleDimension",
    "groups": []
  },
  {
    "command": "TechDraw_NewDiameterDimension",
    "iconFile": "",
    "toolTip": "TechDraw_NewDiameterDimension",
    "groups": []
  },
  {
    "command": "TechDraw_NewDistanceXDimension",
    "iconFile": "",
    "toolTip": "TechDraw_NewDistanceXDimension",
    "groups": []
  },
  {
    "command": "TechDraw_NewDistanceYDimension",
    "iconFile": "",
    "toolTip": "TechDraw_NewDistanceYDimension",
    "groups": []
  },
  {
    "command": "TechDraw_NewGeomHatch",
    "iconFile": "",
    "toolTip": "TechDraw_NewGeomHatch",
    "groups": []
  },
  {
    "command": "TechDraw_NewHatch",
    "iconFile": "",
    "toolTip": "TechDraw_NewHatch",
    "groups": []
  },
  {
    "command": "TechDraw_NewLengthDimension",
    "iconFile": "",
    "toolTip": "TechDraw_NewLengthDimension",
    "groups": []
  },
  {
    "command": "TechDraw_NewPage",
    "iconFile": "",
    "toolTip": "TechDraw_NewPage",
    "groups": []
  },
  {
    "command": "TechDraw_NewPageDef",
    "iconFile": "",
    "toolTip": "TechDraw_NewPageDef",
    "groups": []
  },
  {
    "command": "TechDraw_NewRadiusDimension",
    "iconFile": "",
    "toolTip": "TechDraw_NewRadiusDimension",
    "groups": []
  },
  {
    "command": "TechDraw_NewView",
    "iconFile": "",
    "toolTip": "TechDraw_NewView",
    "groups": []
  },
  {
    "command": "TechDraw_NewViewDetail",
    "iconFile": "",
    "toolTip": "TechDraw_NewViewDetail",
    "groups": []
  },
  {
    "command": "TechDraw_NewViewSection",
    "iconFile": "",
    "toolTip": "TechDraw_NewViewSection",
    "groups": []
  },
  {
    "command": "TechDraw_ProjGroup",
    "iconFile": "",
    "toolTip": "TechDraw_ProjGroup",
    "groups": []
  },
  {
    "command": "TechDraw_Spreadsheet",
    "iconFile": "",
    "toolTip": "TechDraw_Spreadsheet",
    "groups": []
  },
  {
    "command": "TechDraw_Symbol",
    "iconFile": "",
    "toolTip": "TechDraw_Symbol",
    "groups": []
  },
  {
    "command": "TechDraw_ToggleFrame",
    "iconFile": "",
    "toolTip": "TechDraw_ToggleFrame",
    "groups": []
  },
  {
    "command": "View_Measure_Clear_All",
    "iconFile": "",
    "toolTip": "View_Measure_Clear_All",
    "groups": []
  },
  {
    "command": "View_Measure_Toggle_All",
    "iconFile": "",
    "toolTip": "View_Measure_Toggle_All",
    "groups": []
  },
  {
    "command": "Web_BrowserBack",
    "iconFile": "",
    "toolTip": "Web_BrowserBack",
    "groups": []
  },
  {
    "command": "Web_BrowserNext",
    "iconFile": "",
    "toolTip": "Web_BrowserNext",
    "groups": []
  },
  {
    "command": "Web_BrowserRefresh",
    "iconFile": "",
    "toolTip": "Web_BrowserRefresh",
    "groups": []
  },
  {
    "command": "Web_BrowserStop",
    "iconFile": "",
    "toolTip": "Web_BrowserStop",
    "groups": []
  },
  {
    "command": "Web_BrowserZoomIn",
    "iconFile": "",
    "toolTip": "Web_BrowserZoomIn",
    "groups": []
  },
  {
    "command": "Web_BrowserZoomOut",
    "iconFile": "",
    "toolTip": "Web_BrowserZoomOut",
    "groups": []
  },
  {
    "command": "Web_OpenWebsite",
    "iconFile": "",
    "toolTip": "Web_OpenWebsite",
    "groups": []
  },
  {
    "command": "Arch_3Views",
    "iconFile": "Arch_3Views",
    "toolTip": "Arch_3Views",
    "groups": []
  },
  {
    "command": "Arch_Add",
    "iconFile": "Arch_Add",
    "toolTip": "Arch_Add",
    "groups": []
  },
  {
    "command": "Arch_AxisTools",
    "iconFile": "",
    "toolTip": "Arch_AxisTools",
    "groups": []
  },
  {
    "command": "Arch_Building",
    "iconFile": "Arch_Building",
    "toolTip": "Arch_Building",
    "groups": []
  },
  {
    "command": "Arch_BuildingPart",
    "iconFile": "Arch_BuildingPart",
    "toolTip": "Arch_BuildingPart",
    "groups": []
  },
  {
    "command": "Arch_Check",
    "iconFile": "Arch_Check",
    "toolTip": "Arch_Check",
    "groups": []
  },
  {
    "command": "Arch_CloneComponent",
    "iconFile": "",
    "toolTip": "Arch_CloneComponent",
    "groups": []
  },
  {
    "command": "Arch_CloseHoles",
    "iconFile": "Arch_CloseHoles",
    "toolTip": "Arch_CloseHoles",
    "groups": []
  },
  {
    "command": "Arch_Component",
    "iconFile": "Arch_Component",
    "toolTip": "Arch_Component",
    "groups": []
  },
  {
    "command": "Arch_CutPlane",
    "iconFile": "Arch_CutPlane",
    "toolTip": "Arch_CutPlane",
    "groups": []
  },
  {
    "command": "Arch_Equipment",
    "iconFile": "Arch_Equipment",
    "toolTip": "Arch_Equipment",
    "groups": []
  },
  {
    "command": "Arch_Floor",
    "iconFile": "Arch_Floor",
    "toolTip": "Arch_Floor",
    "groups": []
  },
  {
    "command": "Arch_Frame",
    "iconFile": "Arch_Frame",
    "toolTip": "Arch_Frame",
    "groups": []
  },
  {
    "command": "Arch_IfcExplorer",
    "iconFile": "",
    "toolTip": "Arch_IfcExplorer",
    "groups": []
  },
  {
    "command": "Arch_IfcSpreadsheet",
    "iconFile": "",
    "toolTip": "Arch_IfcSpreadsheet",
    "groups": []
  },
  {
    "command": "Arch_MaterialTools",
    "iconFile": "",
    "toolTip": "Arch_MaterialTools",
    "groups": []
  },
  {
    "command": "Arch_MergeWalls",
    "iconFile": "Arch_MergeWalls",
    "toolTip": "Arch_MergeWalls",
    "groups": []
  },
  {
    "command": "Arch_MeshToShape",
    "iconFile": "Arch_MeshToShape",
    "toolTip": "Arch_MeshToShape",
    "groups": []
  },
  {
    "command": "Arch_PanelTools",
    "iconFile": "",
    "toolTip": "Arch_PanelTools",
    "groups": []
  },
  {
    "command": "Arch_PipeTools",
    "iconFile": "",
    "toolTip": "Arch_PipeTools",
    "groups": []
  },
  {
    "command": "Arch_Rebar",
    "iconFile": "Arch_Rebar",
    "toolTip": "Arch_Rebar",
    "groups": []
  },
  {
    "command": "Arch_Reference",
    "iconFile": "Arch_Reference",
    "toolTip": "Arch_Reference",
    "groups": []
  },
  {
    "command": "Arch_Remove",
    "iconFile": "Arch_Remove",
    "toolTip": "Arch_Remove",
    "groups": []
  },
  {
    "command": "Arch_RemoveShape",
    "iconFile": "Arch_RemoveShape",
    "toolTip": "Arch_RemoveShape",
    "groups": []
  },
  {
    "command": "Arch_Roof",
    "iconFile": "Arch_Roof",
    "toolTip": "Arch_Roof",
    "groups": []
  },
  {
    "command": "Arch_Schedule",
    "iconFile": "Arch_Schedule",
    "toolTip": "Arch_Schedule",
    "groups": []
  },
  {
    "command": "Arch_SectionPlane",
    "iconFile": "Arch_SectionPlane",
    "toolTip": "Arch_SectionPlane",
    "groups": []
  },
  {
    "command": "Arch_SelectNonSolidMeshes",
    "iconFile": "",
    "toolTip": "Arch_SelectNonSolidMeshes",
    "groups": []
  },
  {
    "command": "Arch_Site",
    "iconFile": "Arch_Site",
    "toolTip": "Arch_Site",
    "groups": []
  },
  {
    "command": "Arch_Space",
    "iconFile": "Arch_Space",
    "toolTip": "Arch_Space",
    "groups": []
  },
  {
    "command": "Arch_SplitMesh",
    "iconFile": "Arch_SplitMesh",
    "toolTip": "Arch_SplitMesh",
    "groups": []
  },
  {
    "command": "Arch_Stairs",
    "iconFile": "Arch_Stairs",
    "toolTip": "Arch_Stairs",
    "groups": []
  },
  {
    "command": "Arch_Structure",
    "iconFile": "Arch_Structure",
    "toolTip": "Arch_Structure",
    "groups": []
  },
  {
    "command": "Arch_Survey",
    "iconFile": "Arch_Survey",
    "toolTip": "Arch_Survey",
    "groups": []
  },
  {
    "command": "Arch_ToggleIfcBrepFlag",
    "iconFile": "Arch_ToggleIfcBrepFlag",
    "toolTip": "Arch_ToggleIfcBrepFlag",
    "groups": []
  },
  {
    "command": "Arch_ToggleSubs",
    "iconFile": "Arch_ToggleSubs",
    "toolTip": "Arch_ToggleSubs",
    "groups": []
  },
  {
    "command": "Arch_Wall",
    "iconFile": "Arch_Wall",
    "toolTip": "Arch_Wall",
    "groups": []
  },
  {
    "command": "Arch_Window",
    "iconFile": "Arch_Window",
    "toolTip": "Arch_Window",
    "groups": []
  },
  {
    "command": "Draft_AddConstruction",
    "iconFile": "",
    "toolTip": "Draft_AddConstruction",
    "groups": []
  },
  {
    "command": "Draft_AddPoint",
    "iconFile": "Draft_AddPoint",
    "toolTip": "Draft_AddPoint",
    "groups": []
  },
  {
    "command": "Draft_AddToGroup",
    "iconFile": "Draft_AddToGroup",
    "toolTip": "Draft_AddToGroup",
    "groups": []
  },
  {
    "command": "Draft_ApplyStyle",
    "iconFile": "",
    "toolTip": "Draft_ApplyStyle",
    "groups": []
  },
  {
    "command": "Draft_Arc",
    "iconFile": "Draft_Arc",
    "toolTip": "Draft_Arc",
    "groups": []
  },
  {
    "command": "Draft_Array",
    "iconFile": "Draft_Array",
    "toolTip": "Draft_Array",
    "groups": []
  },
  {
    "command": "Draft_AutoGroup",
    "iconFile": "Draft_AutoGroup",
    "toolTip": "Draft_AutoGroup",
    "groups": []
  },
  {
    "command": "Draft_BezCurve",
    "iconFile": "Draft_BezCurve",
    "toolTip": "Draft_BezCurve",
    "groups": []
  },
  {
    "command": "Draft_BSpline",
    "iconFile": "Draft_BSpline",
    "toolTip": "Draft_BSpline",
    "groups": []
  },
  {
    "command": "Draft_Circle",
    "iconFile": "Draft_Circle",
    "toolTip": "Draft_Circle",
    "groups": []
  },
  {
    "command": "Draft_Clone",
    "iconFile": "Draft_Clone",
    "toolTip": "Draft_Clone",
    "groups": []
  },
  {
    "command": "Draft_CloseLine",
    "iconFile": "",
    "toolTip": "Draft_CloseLine",
    "groups": []
  },
  {
    "command": "Draft_DelPoint",
    "iconFile": "Draft_DelPoint",
    "toolTip": "Draft_DelPoint",
    "groups": []
  },
  {
    "command": "Draft_Dimension",
    "iconFile": "Draft_Dimension",
    "toolTip": "Draft_Dimension",
    "groups": []
  },
  {
    "command": "Draft_Downgrade",
    "iconFile": "Draft_Downgrade",
    "toolTip": "Draft_Downgrade",
    "groups": []
  },
  {
    "command": "Draft_Draft2Sketch",
    "iconFile": "Draft_Draft2Sketch",
    "toolTip": "Draft_Draft2Sketch",
    "groups": []
  },
  {
    "command": "Draft_Drawing",
    "iconFile": "Draft_Drawing",
    "toolTip": "Draft_Drawing",
    "groups": []
  },
  {
    "command": "Draft_Edit",
    "iconFile": "Draft_Edit",
    "toolTip": "Draft_Edit",
    "groups": []
  },
  {
    "command": "Draft_Ellipse",
    "iconFile": "Draft_Ellipse",
    "toolTip": "Draft_Ellipse",
    "groups": []
  },
  {
    "command": "Draft_Facebinder",
    "iconFile": "Draft_Facebinder",
    "toolTip": "Draft_Facebinder",
    "groups": []
  },
  {
    "command": "Draft_FinishLine",
    "iconFile": "",
    "toolTip": "Draft_FinishLine",
    "groups": []
  },
  {
    "command": "Draft_FlipDimension",
    "iconFile": "Draft_FlipDimension",
    "toolTip": "Draft_FlipDimension",
    "groups": []
  },
  {
    "command": "Draft_Heal",
    "iconFile": "Draft_Heal",
    "toolTip": "Draft_Heal",
    "groups": []
  },
  {
    "command": "Draft_Join",
    "iconFile": "Draft_Join",
    "toolTip": "Draft_Join",
    "groups": []
  },
  {
    "command": "Draft_Label",
    "iconFile": "Draft_Label",
    "toolTip": "Draft_Label",
    "groups": []
  },
  {
    "command": "Draft_Line",
    "iconFile": "Draft_Line",
    "toolTip": "Draft_Line",
    "groups": []
  },
  {
    "command": "Draft_Mirror",
    "iconFile": "Draft_Mirror",
    "toolTip": "Draft_Mirror",
    "groups": []
  },
  {
    "command": "Draft_Move",
    "iconFile": "Draft_Move",
    "toolTip": "Draft_Move",
    "groups": []
  },
  {
    "command": "Draft_Offset",
    "iconFile": "Draft_Offset",
    "toolTip": "Draft_Offset",
    "groups": []
  },
  {
    "command": "Draft_PathArray",
    "iconFile": "Draft_PathArray",
    "toolTip": "Draft_PathArray",
    "groups": []
  },
  {
    "command": "Draft_Point",
    "iconFile": "Draft_Point",
    "toolTip": "Draft_Point",
    "groups": []
  },
  {
    "command": "Draft_PointArray",
    "iconFile": "Draft_PointArray",
    "toolTip": "Draft_PointArray",
    "groups": []
  },
  {
    "command": "Draft_Polygon",
    "iconFile": "Draft_Polygon",
    "toolTip": "Draft_Polygon",
    "groups": []
  },
  {
    "command": "Draft_Rectangle",
    "iconFile": "Draft_Rectangle",
    "toolTip": "Draft_Rectangle",
    "groups": []
  },
  {
    "command": "Draft_Rotate",
    "iconFile": "Draft_Rotate",
    "toolTip": "Draft_Rotate",
    "groups": []
  },
  {
    "command": "Draft_Scale",
    "iconFile": "Draft_Scale",
    "toolTip": "Draft_Scale",
    "groups": []
  },
  {
    "command": "Draft_SelectGroup",
    "iconFile": "Draft_SelectGroup",
    "toolTip": "Draft_SelectGroup",
    "groups": []
  },
  {
    "command": "Draft_SelectPlane",
    "iconFile": "Draft_SelectPlane",
    "toolTip": "Draft_SelectPlane",
    "groups": []
  },
  {
    "command": "Draft_SetWorkingPlaneProxy",
    "iconFile": "",
    "toolTip": "Draft_SetWorkingPlaneProxy",
    "groups": []
  },
  {
    "command": "Draft_Shape2DView",
    "iconFile": "",
    "toolTip": "Draft_Shape2DView",
    "groups": []
  },
  {
    "command": "Draft_ShapeString",
    "iconFile": "Draft_ShapeString",
    "toolTip": "Draft_ShapeString",
    "groups": []
  },
  {
    "command": "Draft_ShowSnapBar",
    "iconFile": "",
    "toolTip": "Draft_ShowSnapBar",
    "groups": []
  },
  {
    "command": "Draft_Slope",
    "iconFile": "Draft_Slope",
    "toolTip": "Draft_Slope",
    "groups": []
  },
  {
    "command": "Draft_Snap_Angle",
    "iconFile": "",
    "toolTip": "Draft_Snap_Angle",
    "groups": []
  },
  {
    "command": "Draft_Snap_Center",
    "iconFile": "",
    "toolTip": "Draft_Snap_Center",
    "groups": []
  },
  {
    "command": "Draft_Snap_Dimensions",
    "iconFile": "",
    "toolTip": "Draft_Snap_Dimensions",
    "groups": []
  },
  {
    "command": "Draft_Snap_Endpoint",
    "iconFile": "",
    "toolTip": "Draft_Snap_Endpoint",
    "groups": []
  },
  {
    "command": "Draft_Snap_Extension",
    "iconFile": "",
    "toolTip": "Draft_Snap_Extension",
    "groups": []
  },
  {
    "command": "Draft_Snap_Grid",
    "iconFile": "",
    "toolTip": "Draft_Snap_Grid",
    "groups": []
  },
  {
    "command": "Draft_Snap_Intersection",
    "iconFile": "",
    "toolTip": "Draft_Snap_Intersection",
    "groups": []
  },
  {
    "command": "Draft_Snap_Lock",
    "iconFile": "",
    "toolTip": "Draft_Snap_Lock",
    "groups": []
  },
  {
    "command": "Draft_Snap_Midpoint",
    "iconFile": "",
    "toolTip": "Draft_Snap_Midpoint",
    "groups": []
  },
  {
    "command": "Draft_Snap_Near",
    "iconFile": "",
    "toolTip": "Draft_Snap_Near",
    "groups": []
  },
  {
    "command": "Draft_Snap_Ortho",
    "iconFile": "",
    "toolTip": "Draft_Snap_Ortho",
    "groups": []
  },
  {
    "command": "Draft_Snap_Parallel",
    "iconFile": "",
    "toolTip": "Draft_Snap_Parallel",
    "groups": []
  },
  {
    "command": "Draft_Snap_Perpendicular",
    "iconFile": "",
    "toolTip": "Draft_Snap_Perpendicular",
    "groups": []
  },
  {
    "command": "Draft_Snap_Special",
    "iconFile": "",
    "toolTip": "Draft_Snap_Special",
    "groups": []
  },
  {
    "command": "Draft_Snap_WorkingPlane",
    "iconFile": "",
    "toolTip": "Draft_Snap_WorkingPlane",
    "groups": []
  },
  {
    "command": "Draft_Split",
    "iconFile": "Draft_Split",
    "toolTip": "Draft_Split",
    "groups": []
  },
  {
    "command": "Draft_Stretch",
    "iconFile": "Draft_Stretch",
    "toolTip": "Draft_Stretch",
    "groups": []
  },
  {
    "command": "Draft_Text",
    "iconFile": "Draft_Text",
    "toolTip": "Draft_Text",
    "groups": []
  },
  {
    "command": "Draft_ToggleConstructionMode",
    "iconFile": "",
    "toolTip": "Draft_ToggleConstructionMode",
    "groups": []
  },
  {
    "command": "Draft_ToggleContinueMode",
    "iconFile": "",
    "toolTip": "Draft_ToggleContinueMode",
    "groups": []
  },
  {
    "command": "Draft_ToggleDisplayMode",
    "iconFile": "",
    "toolTip": "Draft_ToggleDisplayMode",
    "groups": []
  },
  {
    "command": "Draft_ToggleGrid",
    "iconFile": "",
    "toolTip": "Draft_ToggleGrid",
    "groups": []
  },
  {
    "command": "Draft_Trimex",
    "iconFile": "Draft_Trimex",
    "toolTip": "Draft_Trimex",
    "groups": []
  },
  {
    "command": "Draft_UndoLine",
    "iconFile": "",
    "toolTip": "Draft_UndoLine",
    "groups": []
  },
  {
    "command": "Draft_Upgrade",
    "iconFile": "Draft_Upgrade",
    "toolTip": "Draft_Upgrade",
    "groups": []
  },
  {
    "command": "Draft_VisGroup",
    "iconFile": "Draft_VisGroup",
    "toolTip": "Draft_VisGroup",
    "groups": []
  },
  {
    "command": "Draft_Wire",
    "iconFile": "Draft_Wire",
    "toolTip": "Draft_Wire",
    "groups": []
  },
  {
    "command": "Draft_WireToBSpline",
    "iconFile": "Draft_WireToBSpline",
    "toolTip": "Draft_WireToBSpline",
    "groups": []
  },
  {
    "command": "Drawing_Annotation",
    "iconFile": "",
    "toolTip": "Drawing_Annotation",
    "groups": []
  },
  {
    "command": "Drawing_Clip",
    "iconFile": "",
    "toolTip": "Drawing_Clip",
    "groups": []
  },
  {
    "command": "Drawing_DraftView",
    "iconFile": "",
    "toolTip": "Drawing_DraftView",
    "groups": []
  },
  {
    "command": "Drawing_ExportPage",
    "iconFile": "",
    "toolTip": "Drawing_ExportPage",
    "groups": []
  },
  {
    "command": "Drawing_NewPage",
    "iconFile": "",
    "toolTip": "Drawing_NewPage",
    "groups": []
  },
  {
    "command": "Drawing_NewView",
    "iconFile": "",
    "toolTip": "Drawing_NewView",
    "groups": []
  },
  {
    "command": "Drawing_Open",
    "iconFile": "",
    "toolTip": "Drawing_Open",
    "groups": []
  },
  {
    "command": "Drawing_OpenBrowserView",
    "iconFile": "",
    "toolTip": "Drawing_OpenBrowserView",
    "groups": []
  },
  {
    "command": "Drawing_OrthoViews",
    "iconFile": "",
    "toolTip": "Drawing_OrthoViews",
    "groups": []
  },
  {
    "command": "Drawing_ProjectShape",
    "iconFile": "",
    "toolTip": "Drawing_ProjectShape",
    "groups": []
  },
  {
    "command": "Drawing_SpreadsheetView",
    "iconFile": "",
    "toolTip": "Drawing_SpreadsheetView",
    "groups": []
  },
  {
    "command": "Drawing_Symbol",
    "iconFile": "",
    "toolTip": "Drawing_Symbol",
    "groups": []
  },
  {
    "command": "FEM_Analysis",
    "iconFile": "",
    "toolTip": "FEM_Analysis",
    "groups": []
  },
  {
    "command": "FEM_ClippingPlaneAdd",
    "iconFile": "",
    "toolTip": "FEM_ClippingPlaneAdd",
    "groups": []
  },
  {
    "command": "FEM_ClippingPlaneRemoveAll",
    "iconFile": "",
    "toolTip": "FEM_ClippingPlaneRemoveAll",
    "groups": []
  },
  {
    "command": "FEM_ConstraintBearing",
    "iconFile": "",
    "toolTip": "FEM_ConstraintBearing",
    "groups": []
  },
  {
    "command": "FEM_ConstraintBodyHeatSource",
    "iconFile": "",
    "toolTip": "FEM_ConstraintBodyHeatSource",
    "groups": []
  },
  {
    "command": "FEM_ConstraintContact",
    "iconFile": "",
    "toolTip": "FEM_ConstraintContact",
    "groups": []
  },
  {
    "command": "FEM_ConstraintDisplacement",
    "iconFile": "",
    "toolTip": "FEM_ConstraintDisplacement",
    "groups": []
  },
  {
    "command": "FEM_ConstraintElectrostaticPotential",
    "iconFile": "",
    "toolTip": "FEM_ConstraintElectrostaticPotential",
    "groups": []
  },
  {
    "command": "FEM_ConstraintFixed",
    "iconFile": "",
    "toolTip": "FEM_ConstraintFixed",
    "groups": []
  },
  {
    "command": "FEM_ConstraintFlowVelocity",
    "iconFile": "",
    "toolTip": "FEM_ConstraintFlowVelocity",
    "groups": []
  },
  {
    "command": "FEM_ConstraintFluidBoundary",
    "iconFile": "",
    "toolTip": "FEM_ConstraintFluidBoundary",
    "groups": []
  },
  {
    "command": "FEM_ConstraintForce",
    "iconFile": "",
    "toolTip": "FEM_ConstraintForce",
    "groups": []
  },
  {
    "command": "FEM_ConstraintGear",
    "iconFile": "",
    "toolTip": "FEM_ConstraintGear",
    "groups": []
  },
  {
    "command": "FEM_ConstraintHeatflux",
    "iconFile": "",
    "toolTip": "FEM_ConstraintHeatflux",
    "groups": []
  },
  {
    "command": "FEM_ConstraintInitialFlowVelocity",
    "iconFile": "",
    "toolTip": "FEM_ConstraintInitialFlowVelocity",
    "groups": []
  },
  {
    "command": "FEM_ConstraintInitialTemperature",
    "iconFile": "",
    "toolTip": "FEM_ConstraintInitialTemperature",
    "groups": []
  },
  {
    "command": "FEM_ConstraintPlaneRotation",
    "iconFile": "",
    "toolTip": "FEM_ConstraintPlaneRotation",
    "groups": []
  },
  {
    "command": "FEM_ConstraintPressure",
    "iconFile": "",
    "toolTip": "FEM_ConstraintPressure",
    "groups": []
  },
  {
    "command": "FEM_ConstraintPulley",
    "iconFile": "",
    "toolTip": "FEM_ConstraintPulley",
    "groups": []
  },
  {
    "command": "FEM_ConstraintSelfWeight",
    "iconFile": "",
    "toolTip": "FEM_ConstraintSelfWeight",
    "groups": []
  },
  {
    "command": "FEM_ConstraintTemperature",
    "iconFile": "",
    "toolTip": "FEM_ConstraintTemperature",
    "groups": []
  },
  {
    "command": "FEM_ConstraintTransform",
    "iconFile": "",
    "toolTip": "FEM_ConstraintTransform",
    "groups": []
  },
  {
    "command": "FEM_CreateNodesSet",
    "iconFile": "",
    "toolTip": "FEM_CreateNodesSet",
    "groups": []
  },
  {
    "command": "FEM_ElementFluid1D",
    "iconFile": "",
    "toolTip": "FEM_ElementFluid1D",
    "groups": []
  },
  {
    "command": "FEM_ElementGeometry1D",
    "iconFile": "",
    "toolTip": "FEM_ElementGeometry1D",
    "groups": []
  },
  {
    "command": "FEM_ElementGeometry2D",
    "iconFile": "",
    "toolTip": "FEM_ElementGeometry2D",
    "groups": []
  },
  {
    "command": "FEM_ElementRotation1D",
    "iconFile": "",
    "toolTip": "FEM_ElementRotation1D",
    "groups": []
  },
  {
    "command": "FEM_EquationElasticity",
    "iconFile": "",
    "toolTip": "FEM_EquationElasticity",
    "groups": []
  },
  {
    "command": "FEM_EquationElectrostatic",
    "iconFile": "",
    "toolTip": "FEM_EquationElectrostatic",
    "groups": []
  },
  {
    "command": "FEM_EquationFlow",
    "iconFile": "",
    "toolTip": "FEM_EquationFlow",
    "groups": []
  },
  {
    "command": "FEM_EquationFluxsolver",
    "iconFile": "",
    "toolTip": "FEM_EquationFluxsolver",
    "groups": []
  },
  {
    "command": "FEM_EquationHeat",
    "iconFile": "",
    "toolTip": "FEM_EquationHeat",
    "groups": []
  },
  {
    "command": "FEM_FEMMesh2Mesh",
    "iconFile": "",
    "toolTip": "FEM_FEMMesh2Mesh",
    "groups": []
  },
  {
    "command": "FEM_MaterialEditor",
    "iconFile": "",
    "toolTip": "FEM_MaterialEditor",
    "groups": []
  },
  {
    "command": "FEM_MaterialFluid",
    "iconFile": "",
    "toolTip": "FEM_MaterialFluid",
    "groups": []
  },
  {
    "command": "FEM_MaterialMechanicalNonlinear",
    "iconFile": "",
    "toolTip": "FEM_MaterialMechanicalNonlinear",
    "groups": []
  },
  {
    "command": "FEM_MaterialSolid",
    "iconFile": "",
    "toolTip": "FEM_MaterialSolid",
    "groups": []
  },
  {
    "command": "FEM_MeshBoundaryLayer",
    "iconFile": "",
    "toolTip": "FEM_MeshBoundaryLayer",
    "groups": []
  },
  {
    "command": "FEM_MeshGmshFromShape",
    "iconFile": "",
    "toolTip": "FEM_MeshGmshFromShape",
    "groups": []
  },
  {
    "command": "FEM_MeshGroup",
    "iconFile": "",
    "toolTip": "FEM_MeshGroup",
    "groups": []
  },
  {
    "command": "FEM_MeshRegion",
    "iconFile": "",
    "toolTip": "FEM_MeshRegion",
    "groups": []
  },
  {
    "command": "FEM_PostApplyChanges",
    "iconFile": "",
    "toolTip": "FEM_PostApplyChanges",
    "groups": []
  },
  {
    "command": "FEM_PostCreateClipFilter",
    "iconFile": "",
    "toolTip": "FEM_PostCreateClipFilter",
    "groups": []
  },
  {
    "command": "FEM_PostCreateCutFilter",
    "iconFile": "",
    "toolTip": "FEM_PostCreateCutFilter",
    "groups": []
  },
  {
    "command": "FEM_PostCreateDataAlongLineFilter",
    "iconFile": "",
    "toolTip": "FEM_PostCreateDataAlongLineFilter",
    "groups": []
  },
  {
    "command": "FEM_PostCreateDataAtPointFilter",
    "iconFile": "",
    "toolTip": "FEM_PostCreateDataAtPointFilter",
    "groups": []
  },
  {
    "command": "FEM_PostCreateFunctions",
    "iconFile": "",
    "toolTip": "FEM_PostCreateFunctions",
    "groups": []
  },
  {
    "command": "FEM_PostCreateLinearizedStressesFilter",
    "iconFile": "",
    "toolTip": "FEM_PostCreateLinearizedStressesFilter",
    "groups": []
  },
  {
    "command": "FEM_PostCreateScalarClipFilter",
    "iconFile": "",
    "toolTip": "FEM_PostCreateScalarClipFilter",
    "groups": []
  },
  {
    "command": "FEM_PostCreateWarpVectorFilter",
    "iconFile": "",
    "toolTip": "FEM_PostCreateWarpVectorFilter",
    "groups": []
  },
  {
    "command": "FEM_PostPipelineFromResult",
    "iconFile": "",
    "toolTip": "FEM_PostPipelineFromResult",
    "groups": []
  },
  {
    "command": "FEM_ResultShow",
    "iconFile": "",
    "toolTip": "FEM_ResultShow",
    "groups": []
  },
  {
    "command": "FEM_ResultsPurge",
    "iconFile": "",
    "toolTip": "FEM_ResultsPurge",
    "groups": []
  },
  {
    "command": "FEM_SolverCalculiX",
    "iconFile": "",
    "toolTip": "FEM_SolverCalculiX",
    "groups": []
  },
  {
    "command": "FEM_SolverCalculixCxxtools",
    "iconFile": "",
    "toolTip": "FEM_SolverCalculixCxxtools",
    "groups": []
  },
  {
    "command": "FEM_SolverControl",
    "iconFile": "",
    "toolTip": "FEM_SolverControl",
    "groups": []
  },
  {
    "command": "FEM_SolverElmer",
    "iconFile": "",
    "toolTip": "FEM_SolverElmer",
    "groups": []
  },
  {
    "command": "FEM_SolverRun",
    "iconFile": "",
    "toolTip": "FEM_SolverRun",
    "groups": []
  },
  {
    "command": "FEM_SolverZ88",
    "iconFile": "",
    "toolTip": "FEM_SolverZ88",
    "groups": []
  },
  {
    "command": "Image_CreateImagePlane",
    "iconFile": "Image_CreateImagePlane",
    "toolTip": "Image_CreateImagePlane",
    "groups": []
  },
  {
    "command": "Image_Open",
    "iconFile": "Image_Open",
    "toolTip": "Image_Open",
    "groups": []
  },
  {
    "command": "Image_Scaling",
    "iconFile": "Image_Scaling",
    "toolTip": "Image_Scaling",
    "groups": []
  },
  {
    "command": "Inspection_InspectElement",
    "iconFile": "",
    "toolTip": "Inspection_InspectElement",
    "groups": []
  },
  {
    "command": "Inspection_VisualInspection",
    "iconFile": "",
    "toolTip": "Inspection_VisualInspection",
    "groups": []
  },
  {
    "command": "Mesh_AddFacet",
    "iconFile": "",
    "toolTip": "Mesh_AddFacet",
    "groups": []
  },
  {
    "command": "Mesh_BoundingBox",
    "iconFile": "",
    "toolTip": "Mesh_BoundingBox",
    "groups": []
  },
  {
    "command": "Mesh_BuildRegularSolid",
    "iconFile": "",
    "toolTip": "Mesh_BuildRegularSolid",
    "groups": []
  },
  {
    "command": "Mesh_CurvatureInfo",
    "iconFile": "",
    "toolTip": "Mesh_CurvatureInfo",
    "groups": []
  },
  {
    "command": "Mesh_Difference",
    "iconFile": "",
    "toolTip": "Mesh_Difference",
    "groups": []
  },
  {
    "command": "Mesh_EvaluateFacet",
    "iconFile": "",
    "toolTip": "Mesh_EvaluateFacet",
    "groups": []
  },
  {
    "command": "Mesh_EvaluateSolid",
    "iconFile": "",
    "toolTip": "Mesh_EvaluateSolid",
    "groups": []
  },
  {
    "command": "Mesh_Evaluation",
    "iconFile": "",
    "toolTip": "Mesh_Evaluation",
    "groups": []
  },
  {
    "command": "Mesh_Export",
    "iconFile": "",
    "toolTip": "Mesh_Export",
    "groups": []
  },
  {
    "command": "Mesh_FillInteractiveHole",
    "iconFile": "",
    "toolTip": "Mesh_FillInteractiveHole",
    "groups": []
  },
  {
    "command": "Mesh_FillupHoles",
    "iconFile": "",
    "toolTip": "Mesh_FillupHoles",
    "groups": []
  },
  {
    "command": "Mesh_FlipNormals",
    "iconFile": "",
    "toolTip": "Mesh_FlipNormals",
    "groups": []
  },
  {
    "command": "Mesh_FromPartShape",
    "iconFile": "",
    "toolTip": "Mesh_FromPartShape",
    "groups": []
  },
  {
    "command": "Mesh_HarmonizeNormals",
    "iconFile": "",
    "toolTip": "Mesh_HarmonizeNormals",
    "groups": []
  },
  {
    "command": "Mesh_Import",
    "iconFile": "",
    "toolTip": "Mesh_Import",
    "groups": []
  },
  {
    "command": "Mesh_Intersection",
    "iconFile": "",
    "toolTip": "Mesh_Intersection",
    "groups": []
  },
  {
    "command": "Mesh_Merge",
    "iconFile": "",
    "toolTip": "Mesh_Merge",
    "groups": []
  },
  {
    "command": "Mesh_PolyCut",
    "iconFile": "",
    "toolTip": "Mesh_PolyCut",
    "groups": []
  },
  {
    "command": "Mesh_PolyTrim",
    "iconFile": "",
    "toolTip": "Mesh_PolyTrim",
    "groups": []
  },
  {
    "command": "Mesh_RemoveCompByHand",
    "iconFile": "",
    "toolTip": "Mesh_RemoveCompByHand",
    "groups": []
  },
  {
    "command": "Mesh_RemoveComponents",
    "iconFile": "",
    "toolTip": "Mesh_RemoveComponents",
    "groups": []
  },
  {
    "command": "Mesh_Scale",
    "iconFile": "",
    "toolTip": "Mesh_Scale",
    "groups": []
  },
  {
    "command": "Mesh_SectionByPlane",
    "iconFile": "",
    "toolTip": "Mesh_SectionByPlane",
    "groups": []
  },
  {
    "command": "Mesh_Segmentation",
    "iconFile": "",
    "toolTip": "Mesh_Segmentation",
    "groups": []
  },
  {
    "command": "Mesh_SegmentationBestFit",
    "iconFile": "",
    "toolTip": "Mesh_SegmentationBestFit",
    "groups": []
  },
  {
    "command": "Mesh_Smoothing",
    "iconFile": "",
    "toolTip": "Mesh_Smoothing",
    "groups": []
  },
  {
    "command": "Mesh_TrimByPlane",
    "iconFile": "",
    "toolTip": "Mesh_TrimByPlane",
    "groups": []
  },
  {
    "command": "Mesh_Union",
    "iconFile": "",
    "toolTip": "Mesh_Union",
    "groups": []
  },
  {
    "command": "Mesh_VertexCurvature",
    "iconFile": "",
    "toolTip": "Mesh_VertexCurvature",
    "groups": []
  },
  {
    "command": "OpenSCAD_Edgestofaces",
    "iconFile": "",
    "toolTip": "OpenSCAD_Edgestofaces",
    "groups": []
  },
  {
    "command": "OpenSCAD_ExpandPlacements",
    "iconFile": "",
    "toolTip": "OpenSCAD_ExpandPlacements",
    "groups": []
  },
  {
    "command": "OpenSCAD_ExplodeGroup",
    "iconFile": "",
    "toolTip": "OpenSCAD_ExplodeGroup",
    "groups": []
  },
  {
    "command": "OpenSCAD_IncreaseToleranceFeature",
    "iconFile": "OpenSCAD_IncreaseToleranceFeature",
    "toolTip": "OpenSCAD_IncreaseToleranceFeature",
    "groups": []
  },
  {
    "command": "OpenSCAD_RefineShapeFeature",
    "iconFile": "OpenSCAD_RefineShapeFeature",
    "toolTip": "OpenSCAD_RefineShapeFeature",
    "groups": []
  },
  {
    "command": "OpenSCAD_RemoveSubtree",
    "iconFile": "OpenSCAD_RemoveSubtree",
    "toolTip": "OpenSCAD_RemoveSubtree",
    "groups": []
  },
  {
    "command": "OpenSCAD_ReplaceObject",
    "iconFile": "OpenSCAD_ReplaceObject",
    "toolTip": "OpenSCAD_ReplaceObject",
    "groups": []
  },
  {
    "command": "Part_Boolean",
    "iconFile": "",
    "toolTip": "Part_Boolean",
    "groups": []
  },
  {
    "command": "Part_BooleanFragments",
    "iconFile": "Part_BooleanFragments",
    "toolTip": "Part_BooleanFragments",
    "groups": []
  },
  {
    "command": "Part_Box",
    "iconFile": "Part_Box",
    "toolTip": "Part_Box",
    "groups": []
  },
  {
    "command": "Part_BoxSelection",
    "iconFile": "Part_BoxSelection",
    "toolTip": "Part_BoxSelection",
    "groups": []
  },
  {
    "command": "Part_Builder",
    "iconFile": "",
    "toolTip": "Part_Builder",
    "groups": []
  },
  {
    "command": "Part_Chamfer",
    "iconFile": "Part_Chamfer",
    "toolTip": "Part_Chamfer",
    "groups": []
  },
  {
    "command": "Part_CheckGeometry",
    "iconFile": "Part_CheckGeometry",
    "toolTip": "Part_CheckGeometry",
    "groups": []
  },
  {
    "command": "Part_Common",
    "iconFile": "Part_Common",
    "toolTip": "Part_Common",
    "groups": []
  },
  {
    "command": "Part_CompCompoundTools",
    "iconFile": "",
    "toolTip": "Part_CompCompoundTools",
    "groups": []
  },
  {
    "command": "Part_CompJoinFeatures",
    "iconFile": "",
    "toolTip": "Part_CompJoinFeatures",
    "groups": []
  },
  {
    "command": "Part_CompOffset",
    "iconFile": "",
    "toolTip": "Part_CompOffset",
    "groups": []
  },
  {
    "command": "Part_Compound",
    "iconFile": "Part_Compound",
    "toolTip": "Part_Compound",
    "groups": []
  },
  {
    "command": "Part_CompoundFilter",
    "iconFile": "Part_CompoundFilter",
    "toolTip": "Part_CompoundFilter",
    "groups": []
  },
  {
    "command": "Part_CompSplitFeatures",
    "iconFile": "",
    "toolTip": "Part_CompSplitFeatures",
    "groups": []
  },
  {
    "command": "Part_Cone",
    "iconFile": "Part_Cone",
    "toolTip": "Part_Cone",
    "groups": []
  },
  {
    "command": "Part_CrossSections",
    "iconFile": "Part_CrossSections",
    "toolTip": "Part_CrossSections",
    "groups": []
  },
  {
    "command": "Part_Cut",
    "iconFile": "Part_Cut",
    "toolTip": "Part_Cut",
    "groups": []
  },
  {
    "command": "Part_Cylinder",
    "iconFile": "Part_Cylinder",
    "toolTip": "Part_Cylinder",
    "groups": []
  },
  {
    "command": "Part_Defeaturing",
    "iconFile": "Part_Defeaturing",
    "toolTip": "Part_Defeaturing",
    "groups": []
  },
  {
    "command": "Part_EditAttachment",
    "iconFile": "",
    "toolTip": "Part_EditAttachment",
    "groups": []
  },
  {
    "command": "Part_ExplodeCompound",
    "iconFile": "Part_ExplodeCompound",
    "toolTip": "Part_ExplodeCompound",
    "groups": []
  },
  {
    "command": "Part_Export",
    "iconFile": "Part_Export",
    "toolTip": "Part_Export",
    "groups": []
  },
  {
    "command": "Part_Extrude",
    "iconFile": "Part_Extrude",
    "toolTip": "Part_Extrude",
    "groups": []
  },
  {
    "command": "Part_Fillet",
    "iconFile": "Part_Fillet",
    "toolTip": "Part_Fillet",
    "groups": []
  },
  {
    "command": "Part_Fuse",
    "iconFile": "Part_Fuse",
    "toolTip": "Part_Fuse",
    "groups": []
  },
  {
    "command": "Part_Import",
    "iconFile": "Part_Import",
    "toolTip": "Part_Import",
    "groups": []
  },
  {
    "command": "Part_JoinConnect",
    "iconFile": "Part_JoinConnect",
    "toolTip": "Part_JoinConnect",
    "groups": []
  },
  {
    "command": "Part_JoinCutout",
    "iconFile": "Part_JoinCutout",
    "toolTip": "Part_JoinCutout",
    "groups": []
  },
  {
    "command": "Part_JoinEmbed",
    "iconFile": "Part_JoinEmbed",
    "toolTip": "Part_JoinEmbed",
    "groups": []
  },
  {
    "command": "Part_Loft",
    "iconFile": "Part_Loft",
    "toolTip": "Part_Loft",
    "groups": []
  },
  {
    "command": "Part_MakeFace",
    "iconFile": "",
    "toolTip": "Part_MakeFace",
    "groups": []
  },
  {
    "command": "Part_MakeSolid",
    "iconFile": "",
    "toolTip": "Part_MakeSolid",
    "groups": []
  },
  {
    "command": "Part_MakeTube",
    "iconFile": "",
    "toolTip": "Part_MakeTube",
    "groups": []
  },
  {
    "command": "Part_Measure_Angular",
    "iconFile": "Part_Measure_Angular",
    "toolTip": "Part_Measure_Angular",
    "groups": []
  },
  {
    "command": "Part_Measure_Clear_All",
    "iconFile": "Part_Measure_Clear_All",
    "toolTip": "Part_Measure_Clear_All",
    "groups": []
  },
  {
    "command": "Part_Measure_Linear",
    "iconFile": "Part_Measure_Linear",
    "toolTip": "Part_Measure_Linear",
    "groups": []
  },
  {
    "command": "Part_Measure_Toggle_3d",
    "iconFile": "Part_Measure_Toggle_3d",
    "toolTip": "Part_Measure_Toggle_3d",
    "groups": []
  },
  {
    "command": "Part_Measure_Toggle_All",
    "iconFile": "Part_Measure_Toggle_All",
    "toolTip": "Part_Measure_Toggle_All",
    "groups": []
  },
  {
    "command": "Part_Measure_Toggle_Delta",
    "iconFile": "Part_Measure_Toggle_Delta",
    "toolTip": "Part_Measure_Toggle_Delta",
    "groups": []
  },
  {
    "command": "Part_Mirror",
    "iconFile": "Part_Mirror",
    "toolTip": "Part_Mirror",
    "groups": []
  },
  {
    "command": "Part_Offset",
    "iconFile": "Part_Offset",
    "toolTip": "Part_Offset",
    "groups": []
  },
  {
    "command": "Part_Offset2D",
    "iconFile": "Part_Offset2D",
    "toolTip": "Part_Offset2D",
    "groups": []
  },
  {
    "command": "Part_Primitives",
    "iconFile": "",
    "toolTip": "Part_Primitives",
    "groups": []
  },
  {
    "command": "Part_RefineShape",
    "iconFile": "",
    "toolTip": "Part_RefineShape",
    "groups": []
  },
  {
    "command": "Part_ReverseShape",
    "iconFile": "",
    "toolTip": "Part_ReverseShape",
    "groups": []
  },
  {
    "command": "Part_Revolve",
    "iconFile": "Part_Revolve",
    "toolTip": "Part_Revolve",
    "groups": []
  },
  {
    "command": "Part_RuledSurface",
    "iconFile": "Part_RuledSurface",
    "toolTip": "Part_RuledSurface",
    "groups": []
  },
  {
    "command": "Part_Section",
    "iconFile": "Part_Section",
    "toolTip": "Part_Section",
    "groups": []
  },
  {
    "command": "Part_ShapeFromMesh",
    "iconFile": "",
    "toolTip": "Part_ShapeFromMesh",
    "groups": []
  },
  {
    "command": "Part_SimpleCopy",
    "iconFile": "",
    "toolTip": "Part_SimpleCopy",
    "groups": []
  },
  {
    "command": "Part_Slice",
    "iconFile": "Part_Slice",
    "toolTip": "Part_Slice",
    "groups": []
  },
  {
    "command": "Part_SliceApart",
    "iconFile": "Part_SliceApart",
    "toolTip": "Part_SliceApart",
    "groups": []
  },
  {
    "command": "Part_Sphere",
    "iconFile": "Part_Sphere",
    "toolTip": "Part_Sphere",
    "groups": []
  },
  {
    "command": "Part_Sweep",
    "iconFile": "Part_Sweep",
    "toolTip": "Part_Sweep",
    "groups": []
  },
  {
    "command": "Part_Thickness",
    "iconFile": "Part_Thickness",
    "toolTip": "Part_Thickness",
    "groups": []
  },
  {
    "command": "Part_Torus",
    "iconFile": "Part_Torus",
    "toolTip": "Part_Torus",
    "groups": []
  },
  {
    "command": "Part_XOR",
    "iconFile": "Part_XOR",
    "toolTip": "Part_XOR",
    "groups": []
  },
  {
    "command": "PartDesign_AdditiveBox",
    "iconFile": "",
    "toolTip": "PartDesign_AdditiveBox",
    "groups": []
  },
  {
    "command": "PartDesign_AdditiveCone",
    "iconFile": "",
    "toolTip": "PartDesign_AdditiveCone",
    "groups": []
  },
  {
    "command": "PartDesign_AdditiveCylinder",
    "iconFile": "",
    "toolTip": "PartDesign_AdditiveCylinder",
    "groups": []
  },
  {
    "command": "PartDesign_AdditiveEllipsoid",
    "iconFile": "",
    "toolTip": "PartDesign_AdditiveEllipsoid",
    "groups": []
  },
  {
    "command": "PartDesign_AdditiveLoft",
    "iconFile": "",
    "toolTip": "PartDesign_AdditiveLoft",
    "groups": []
  },
  {
    "command": "PartDesign_AdditivePipe",
    "iconFile": "",
    "toolTip": "PartDesign_AdditivePipe",
    "groups": []
  },
  {
    "command": "PartDesign_AdditivePrism",
    "iconFile": "",
    "toolTip": "PartDesign_AdditivePrism",
    "groups": []
  },
  {
    "command": "PartDesign_AdditiveSphere",
    "iconFile": "",
    "toolTip": "PartDesign_AdditiveSphere",
    "groups": []
  },
  {
    "command": "PartDesign_AdditiveTorus",
    "iconFile": "",
    "toolTip": "PartDesign_AdditiveTorus",
    "groups": []
  },
  {
    "command": "PartDesign_AdditiveWedge",
    "iconFile": "",
    "toolTip": "PartDesign_AdditiveWedge",
    "groups": []
  },
  {
    "command": "PartDesign_Body",
    "iconFile": "PartDesign_Body",
    "toolTip": "PartDesign_Body",
    "groups": []
  },
  {
    "command": "PartDesign_Boolean",
    "iconFile": "PartDesign_Boolean",
    "toolTip": "PartDesign_Boolean",
    "groups": []
  },
  {
    "command": "PartDesign_Chamfer",
    "iconFile": "PartDesign_Chamfer",
    "toolTip": "PartDesign_Chamfer",
    "groups": []
  },
  {
    "command": "PartDesign_Clone",
    "iconFile": "PartDesign_Clone",
    "toolTip": "PartDesign_Clone",
    "groups": []
  },
  {
    "command": "PartDesign_CompPrimitiveAdditive",
    "iconFile": "",
    "toolTip": "PartDesign_CompPrimitiveAdditive",
    "groups": []
  },
  {
    "command": "PartDesign_CompPrimitiveSubtractive",
    "iconFile": "",
    "toolTip": "PartDesign_CompPrimitiveSubtractive",
    "groups": []
  },
  {
    "command": "PartDesign_CoordinateSystem",
    "iconFile": "PartDesign_CoordinateSystem",
    "toolTip": "PartDesign_CoordinateSystem",
    "groups": []
  },
  {
    "command": "PartDesign_Draft",
    "iconFile": "PartDesign_Draft",
    "toolTip": "PartDesign_Draft",
    "groups": []
  },
  {
    "command": "PartDesign_DuplicateSelection",
    "iconFile": "",
    "toolTip": "PartDesign_DuplicateSelection",
    "groups": []
  },
  {
    "command": "PartDesign_Fillet",
    "iconFile": "PartDesign_Fillet",
    "toolTip": "PartDesign_Fillet",
    "groups": []
  },
  {
    "command": "PartDesign_Groove",
    "iconFile": "PartDesign_Groove",
    "toolTip": "PartDesign_Groove",
    "groups": []
  },
  {
    "command": "PartDesign_Hole",
    "iconFile": "PartDesign_Hole",
    "toolTip": "PartDesign_Hole",
    "groups": []
  },
  {
    "command": "PartDesign_InvoluteGear",
    "iconFile": "PartDesign_InvoluteGear",
    "toolTip": "PartDesign_InvoluteGear",
    "groups": []
  },
  {
    "command": "PartDesign_Line",
    "iconFile": "PartDesign_Line",
    "toolTip": "PartDesign_Line",
    "groups": []
  },
  {
    "command": "PartDesign_LinearPattern",
    "iconFile": "PartDesign_LinearPattern",
    "toolTip": "PartDesign_LinearPattern",
    "groups": []
  },
  {
    "command": "PartDesign_Migrate",
    "iconFile": "",
    "toolTip": "PartDesign_Migrate",
    "groups": []
  },
  {
    "command": "PartDesign_Mirrored",
    "iconFile": "PartDesign_Mirrored",
    "toolTip": "PartDesign_Mirrored",
    "groups": []
  },
  {
    "command": "PartDesign_MultiTransform",
    "iconFile": "PartDesign_MultiTransform",
    "toolTip": "PartDesign_MultiTransform",
    "groups": []
  },
  {
    "command": "PartDesign_NewSketch",
    "iconFile": "",
    "toolTip": "PartDesign_NewSketch",
    "groups": []
  },
  {
    "command": "PartDesign_Pad",
    "iconFile": "PartDesign_Pad",
    "toolTip": "PartDesign_Pad",
    "groups": []
  },
  {
    "command": "PartDesign_Plane",
    "iconFile": "PartDesign_Plane",
    "toolTip": "PartDesign_Plane",
    "groups": []
  },
  {
    "command": "PartDesign_Pocket",
    "iconFile": "PartDesign_Pocket",
    "toolTip": "PartDesign_Pocket",
    "groups": []
  },
  {
    "command": "PartDesign_Point",
    "iconFile": "PartDesign_Point",
    "toolTip": "PartDesign_Point",
    "groups": []
  },
  {
    "command": "PartDesign_PolarPattern",
    "iconFile": "PartDesign_PolarPattern",
    "toolTip": "PartDesign_PolarPattern",
    "groups": []
  },
  {
    "command": "PartDesign_Revolution",
    "iconFile": "PartDesign_Revolution",
    "toolTip": "PartDesign_Revolution",
    "groups": []
  },
  {
    "command": "PartDesign_ShapeBinder",
    "iconFile": "PartDesign_ShapeBinder",
    "toolTip": "PartDesign_ShapeBinder",
    "groups": []
  },
  {
    "command": "PartDesign_SubtractiveBox",
    "iconFile": "",
    "toolTip": "PartDesign_SubtractiveBox",
    "groups": []
  },
  {
    "command": "PartDesign_SubtractiveCone",
    "iconFile": "",
    "toolTip": "PartDesign_SubtractiveCone",
    "groups": []
  },
  {
    "command": "PartDesign_SubtractiveCylinder",
    "iconFile": "",
    "toolTip": "PartDesign_SubtractiveCylinder",
    "groups": []
  },
  {
    "command": "PartDesign_SubtractiveEllipsoid",
    "iconFile": "",
    "toolTip": "PartDesign_SubtractiveEllipsoid",
    "groups": []
  },
  {
    "command": "PartDesign_SubtractiveLoft",
    "iconFile": "",
    "toolTip": "PartDesign_SubtractiveLoft",
    "groups": []
  },
  {
    "command": "PartDesign_SubtractivePipe",
    "iconFile": "",
    "toolTip": "PartDesign_SubtractivePipe",
    "groups": []
  },
  {
    "command": "PartDesign_SubtractivePrism",
    "iconFile": "",
    "toolTip": "PartDesign_SubtractivePrism",
    "groups": []
  },
  {
    "command": "PartDesign_SubtractiveSphere",
    "iconFile": "",
    "toolTip": "PartDesign_SubtractiveSphere",
    "groups": []
  },
  {
    "command": "PartDesign_SubtractiveTorus",
    "iconFile": "",
    "toolTip": "PartDesign_SubtractiveTorus",
    "groups": []
  },
  {
    "command": "PartDesign_SubtractiveWedge",
    "iconFile": "",
    "toolTip": "PartDesign_SubtractiveWedge",
    "groups": []
  },
  {
    "command": "PartDesign_Thickness",
    "iconFile": "PartDesign_Thickness",
    "toolTip": "PartDesign_Thickness",
    "groups": []
  },
  {
    "command": "PartDesign_WizardShaft",
    "iconFile": "",
    "toolTip": "PartDesign_WizardShaft",
    "groups": []
  },
  {
    "command": "Path_Adaptive",
    "iconFile": "",
    "toolTip": "Path_Adaptive",
    "groups": []
  },
  {
    "command": "Path_Array",
    "iconFile": "",
    "toolTip": "Path_Array",
    "groups": []
  },
  {
    "command": "Path_Comment",
    "iconFile": "",
    "toolTip": "Path_Comment",
    "groups": []
  },
  {
    "command": "Path_Contour",
    "iconFile": "",
    "toolTip": "Path_Contour",
    "groups": []
  },
  {
    "command": "Path_Custom",
    "iconFile": "",
    "toolTip": "Path_Custom",
    "groups": []
  },
  {
    "command": "Path_Deburr",
    "iconFile": "",
    "toolTip": "Path_Deburr",
    "groups": []
  },
  {
    "command": "Path_DressupAxisMap",
    "iconFile": "",
    "toolTip": "Path_DressupAxisMap",
    "groups": []
  },
  {
    "command": "Path_DressupDogbone",
    "iconFile": "",
    "toolTip": "Path_DressupDogbone",
    "groups": []
  },
  {
    "command": "Path_DressupDragKnife",
    "iconFile": "",
    "toolTip": "Path_DressupDragKnife",
    "groups": []
  },
  {
    "command": "Path_DressupLeadInOut",
    "iconFile": "",
    "toolTip": "Path_DressupLeadInOut",
    "groups": []
  },
  {
    "command": "Path_DressupRampEntry",
    "iconFile": "",
    "toolTip": "Path_DressupRampEntry",
    "groups": []
  },
  {
    "command": "Path_DressupTag",
    "iconFile": "",
    "toolTip": "Path_DressupTag",
    "groups": []
  },
  {
    "command": "Path_Drilling",
    "iconFile": "",
    "toolTip": "Path_Drilling",
    "groups": []
  },
  {
    "command": "Path_Engrave",
    "iconFile": "",
    "toolTip": "Path_Engrave",
    "groups": []
  },
  {
    "command": "Path_EngraveTools",
    "iconFile": "",
    "toolTip": "Path_EngraveTools",
    "groups": []
  },
  {
    "command": "Path_ExportTemplate",
    "iconFile": "",
    "toolTip": "Path_ExportTemplate",
    "groups": []
  },
  {
    "command": "Path_Fixture",
    "iconFile": "",
    "toolTip": "Path_Fixture",
    "groups": []
  },
  {
    "command": "Path_Helix",
    "iconFile": "",
    "toolTip": "Path_Helix",
    "groups": []
  },
  {
    "command": "Path_Inspect",
    "iconFile": "",
    "toolTip": "Path_Inspect",
    "groups": []
  },
  {
    "command": "Path_Job",
    "iconFile": "",
    "toolTip": "Path_Job",
    "groups": []
  },
  {
    "command": "Path_MillFace",
    "iconFile": "",
    "toolTip": "Path_MillFace",
    "groups": []
  },
  {
    "command": "Path_OperationCopy",
    "iconFile": "",
    "toolTip": "Path_OperationCopy",
    "groups": []
  },
  {
    "command": "Path_Pocket_3D",
    "iconFile": "",
    "toolTip": "Path_Pocket_3D",
    "groups": []
  },
  {
    "command": "Path_Pocket_Shape",
    "iconFile": "",
    "toolTip": "Path_Pocket_Shape",
    "groups": []
  },
  {
    "command": "Path_Post",
    "iconFile": "",
    "toolTip": "Path_Post",
    "groups": []
  },
  {
    "command": "Path_Profile_Edges",
    "iconFile": "",
    "toolTip": "Path_Profile_Edges",
    "groups": []
  },
  {
    "command": "Path_Profile_Faces",
    "iconFile": "",
    "toolTip": "Path_Profile_Faces",
    "groups": []
  },
  {
    "command": "Path_SelectLoop",
    "iconFile": "",
    "toolTip": "Path_SelectLoop",
    "groups": []
  },
  {
    "command": "Path_SimpleCopy",
    "iconFile": "",
    "toolTip": "Path_SimpleCopy",
    "groups": []
  },
  {
    "command": "Path_Simulator",
    "iconFile": "",
    "toolTip": "Path_Simulator",
    "groups": []
  },
  {
    "command": "Path_Stop",
    "iconFile": "",
    "toolTip": "Path_Stop",
    "groups": []
  },
  {
    "command": "Path_ToolLibraryEdit",
    "iconFile": "",
    "toolTip": "Path_ToolLibraryEdit",
    "groups": []
  },
  {
    "command": "Plot_Axes",
    "iconFile": "",
    "toolTip": "Plot_Axes",
    "groups": []
  },
  {
    "command": "Plot_Grid",
    "iconFile": "",
    "toolTip": "Plot_Grid",
    "groups": []
  },
  {
    "command": "Plot_Labels",
    "iconFile": "",
    "toolTip": "Plot_Labels",
    "groups": []
  },
  {
    "command": "Plot_Legend",
    "iconFile": "",
    "toolTip": "Plot_Legend",
    "groups": []
  },
  {
    "command": "Plot_Positions",
    "iconFile": "",
    "toolTip": "Plot_Positions",
    "groups": []
  },
  {
    "command": "Plot_SaveFig",
    "iconFile": "",
    "toolTip": "Plot_SaveFig",
    "groups": []
  },
  {
    "command": "Plot_Series",
    "iconFile": "",
    "toolTip": "Plot_Series",
    "groups": []
  },
  {
    "command": "Points_Convert",
    "iconFile": "",
    "toolTip": "Points_Convert",
    "groups": []
  },
  {
    "command": "Points_Export",
    "iconFile": "",
    "toolTip": "Points_Export",
    "groups": []
  },
  {
    "command": "Points_Import",
    "iconFile": "",
    "toolTip": "Points_Import",
    "groups": []
  },
  {
    "command": "Points_Merge",
    "iconFile": "",
    "toolTip": "Points_Merge",
    "groups": []
  },
  {
    "command": "Points_PolyCut",
    "iconFile": "",
    "toolTip": "Points_PolyCut",
    "groups": []
  },
  {
    "command": "Raytracing_ExportProject",
    "iconFile": "",
    "toolTip": "Raytracing_ExportProject",
    "groups": []
  },
  {
    "command": "Raytracing_NewLuxProject",
    "iconFile": "",
    "toolTip": "Raytracing_NewLuxProject",
    "groups": []
  },
  {
    "command": "Raytracing_NewPartSegment",
    "iconFile": "",
    "toolTip": "Raytracing_NewPartSegment",
    "groups": []
  },
  {
    "command": "Raytracing_NewPovrayProject",
    "iconFile": "",
    "toolTip": "Raytracing_NewPovrayProject",
    "groups": []
  },
  {
    "command": "Raytracing_Render",
    "iconFile": "",
    "toolTip": "Raytracing_Render",
    "groups": []
  },
  {
    "command": "Raytracing_ResetCamera",
    "iconFile": "",
    "toolTip": "Raytracing_ResetCamera",
    "groups": []
  },
  {
    "command": "Raytracing_WriteCamera",
    "iconFile": "",
    "toolTip": "Raytracing_WriteCamera",
    "groups": []
  },
  {
    "command": "Raytracing_WritePart",
    "iconFile": "",
    "toolTip": "Raytracing_WritePart",
    "groups": []
  },
  {
    "command": "Raytracing_WriteView",
    "iconFile": "",
    "toolTip": "Raytracing_WriteView",
    "groups": []
  },
  {
    "command": "Reen_ApproxPlane",
    "iconFile": "",
    "toolTip": "Reen_ApproxPlane",
    "groups": []
  },
  {
    "command": "Reen_ApproxSurface",
    "iconFile": "",
    "toolTip": "Reen_ApproxSurface",
    "groups": []
  },
  {
    "command": "Reen_PoissonReconstruction",
    "iconFile": "",
    "toolTip": "Reen_PoissonReconstruction",
    "groups": []
  },
  {
    "command": "Reen_ViewTriangulation",
    "iconFile": "",
    "toolTip": "Reen_ViewTriangulation",
    "groups": []
  },
  {
    "command": "Robot_AddToolShape",
    "iconFile": "",
    "toolTip": "Robot_AddToolShape",
    "groups": []
  },
  {
    "command": "Robot_Create",
    "iconFile": "",
    "toolTip": "Robot_Create",
    "groups": []
  },
  {
    "command": "Robot_CreateTrajectory",
    "iconFile": "Robot_CreateTrajectory",
    "toolTip": "Robot_CreateTrajectory",
    "groups": []
  },
  {
    "command": "Robot_Edge2Trac",
    "iconFile": "Robot_Edge2Trac",
    "toolTip": "Robot_Edge2Trac",
    "groups": []
  },
  {
    "command": "Robot_ExportKukaCompact",
    "iconFile": "",
    "toolTip": "Robot_ExportKukaCompact",
    "groups": []
  },
  {
    "command": "Robot_ExportKukaFull",
    "iconFile": "",
    "toolTip": "Robot_ExportKukaFull",
    "groups": []
  },
  {
    "command": "Robot_InsertKukaIR125",
    "iconFile": "",
    "toolTip": "Robot_InsertKukaIR125",
    "groups": []
  },
  {
    "command": "Robot_InsertKukaIR16",
    "iconFile": "",
    "toolTip": "Robot_InsertKukaIR16",
    "groups": []
  },
  {
    "command": "Robot_InsertKukaIR210",
    "iconFile": "",
    "toolTip": "Robot_InsertKukaIR210",
    "groups": []
  },
  {
    "command": "Robot_InsertKukaIR500",
    "iconFile": "",
    "toolTip": "Robot_InsertKukaIR500",
    "groups": []
  },
  {
    "command": "Robot_InsertWaypoint",
    "iconFile": "Robot_InsertWaypoint",
    "toolTip": "Robot_InsertWaypoint",
    "groups": []
  },
  {
    "command": "Robot_InsertWaypointPreselect",
    "iconFile": "",
    "toolTip": "Robot_InsertWaypointPreselect",
    "groups": []
  },
  {
    "command": "Robot_RestoreHomePos",
    "iconFile": "Robot_RestoreHomePos",
    "toolTip": "Robot_RestoreHomePos",
    "groups": []
  },
  {
    "command": "Robot_SetDefaultOrientation",
    "iconFile": "Robot_SetDefaultOrientation",
    "toolTip": "Robot_SetDefaultOrientation",
    "groups": []
  },
  {
    "command": "Robot_SetDefaultValues",
    "iconFile": "Robot_SetDefaultValues",
    "toolTip": "Robot_SetDefaultValues",
    "groups": []
  },
  {
    "command": "Robot_SetHomePos",
    "iconFile": "Robot_SetHomePos",
    "toolTip": "Robot_SetHomePos",
    "groups": []
  },
  {
    "command": "Robot_Simulate",
    "iconFile": "Robot_Simulate",
    "toolTip": "Robot_Simulate",
    "groups": []
  },
  {
    "command": "Robot_TrajectoryCompound",
    "iconFile": "Robot_TrajectoryCompound",
    "toolTip": "Robot_TrajectoryCompound",
    "groups": []
  },
  {
    "command": "Robot_TrajectoryDressUp",
    "iconFile": "Robot_TrajectoryDressUp",
    "toolTip": "Robot_TrajectoryDressUp",
    "groups": []
  },
  {
    "command": "Ship_AreasCurve",
    "iconFile": "",
    "toolTip": "Ship_AreasCurve",
    "groups": []
  },
  {
    "command": "Ship_Capacity",
    "iconFile": "",
    "toolTip": "Ship_Capacity",
    "groups": []
  },
  {
    "command": "Ship_CreateShip",
    "iconFile": "",
    "toolTip": "Ship_CreateShip",
    "groups": []
  },
  {
    "command": "Ship_GZ",
    "iconFile": "Ship_GZ",
    "toolTip": "Ship_GZ",
    "groups": []
  },
  {
    "command": "Ship_Hydrostatics",
    "iconFile": "Ship_Hydrostatics",
    "toolTip": "Ship_Hydrostatics",
    "groups": []
  },
  {
    "command": "Ship_LoadCondition",
    "iconFile": "Ship_LoadCondition",
    "toolTip": "Ship_LoadCondition",
    "groups": []
  },
  {
    "command": "Ship_LoadExample",
    "iconFile": "",
    "toolTip": "Ship_LoadExample",
    "groups": []
  },
  {
    "command": "Ship_OutlineDraw",
    "iconFile": "Ship_OutlineDraw",
    "toolTip": "Ship_OutlineDraw",
    "groups": []
  },
  {
    "command": "Ship_Tank",
    "iconFile": "Ship_Tank",
    "toolTip": "Ship_Tank",
    "groups": []
  },
  {
    "command": "Ship_Weight",
    "iconFile": "Ship_Weight",
    "toolTip": "Ship_Weight",
    "groups": []
  },
  {
    "command": "Sketcher_BSplineComb",
    "iconFile": "Sketcher_BSplineComb",
    "toolTip": "Sketcher_BSplineComb",
    "groups": []
  },
  {
    "command": "Sketcher_BSplineConvertToNURB",
    "iconFile": "",
    "toolTip": "Sketcher_BSplineConvertToNURB",
    "groups": []
  },
  {
    "command": "Sketcher_BSplineDecreaseKnotMultiplicity",
    "iconFile": "Sketcher_BSplineDecreaseKnotMultiplicity",
    "toolTip": "Sketcher_BSplineDecreaseKnotMultiplicity",
    "groups": []
  },
  {
    "command": "Sketcher_BSplineDegree",
    "iconFile": "Sketcher_BSplineDegree",
    "toolTip": "Sketcher_BSplineDegree",
    "groups": []
  },
  {
    "command": "Sketcher_BSplineIncreaseDegree",
    "iconFile": "Sketcher_BSplineIncreaseDegree",
    "toolTip": "Sketcher_BSplineIncreaseDegree",
    "groups": []
  },
  {
    "command": "Sketcher_BSplineIncreaseKnotMultiplicity",
    "iconFile": "Sketcher_BSplineIncreaseKnotMultiplicity",
    "toolTip": "Sketcher_BSplineIncreaseKnotMultiplicity",
    "groups": []
  },
  {
    "command": "Sketcher_BSplineKnotMultiplicity",
    "iconFile": "Sketcher_BSplineKnotMultiplicity",
    "toolTip": "Sketcher_BSplineKnotMultiplicity",
    "groups": []
  },
  {
    "command": "Sketcher_BSplinePolygon",
    "iconFile": "Sketcher_BSplinePolygon",
    "toolTip": "Sketcher_BSplinePolygon",
    "groups": []
  },
  {
    "command": "Sketcher_CarbonCopy",
    "iconFile": "Sketcher_CarbonCopy",
    "toolTip": "Sketcher_CarbonCopy",
    "groups": []
  },
  {
    "command": "Sketcher_Clone",
    "iconFile": "Sketcher_Clone",
    "toolTip": "Sketcher_Clone",
    "groups": []
  },
  {
    "command": "Sketcher_CloseShape",
    "iconFile": "Sketcher_CloseShape",
    "toolTip": "Sketcher_CloseShape",
    "groups": []
  },
  {
    "command": "Sketcher_CompBSplineShowHideGeometryInformation",
    "iconFile": "",
    "toolTip": "Sketcher_CompBSplineShowHideGeometryInformation",
    "groups": []
  },
  {
    "command": "Sketcher_CompConstrainRadDia",
    "iconFile": "",
    "toolTip": "Sketcher_CompConstrainRadDia",
    "groups": []
  },
  {
    "command": "Sketcher_CompCopy",
    "iconFile": "",
    "toolTip": "Sketcher_CompCopy",
    "groups": []
  },
  {
    "command": "Sketcher_CompCreateArc",
    "iconFile": "",
    "toolTip": "Sketcher_CompCreateArc",
    "groups": []
  },
  {
    "command": "Sketcher_CompCreateBSpline",
    "iconFile": "",
    "toolTip": "Sketcher_CompCreateBSpline",
    "groups": []
  },
  {
    "command": "Sketcher_CompCreateCircle",
    "iconFile": "",
    "toolTip": "Sketcher_CompCreateCircle",
    "groups": []
  },
  {
    "command": "Sketcher_CompCreateConic",
    "iconFile": "",
    "toolTip": "Sketcher_CompCreateConic",
    "groups": []
  },
  {
    "command": "Sketcher_CompCreateRegularPolygon",
    "iconFile": "",
    "toolTip": "Sketcher_CompCreateRegularPolygon",
    "groups": []
  },
  {
    "command": "Sketcher_CompModifyKnotMultiplicity",
    "iconFile": "",
    "toolTip": "Sketcher_CompModifyKnotMultiplicity",
    "groups": []
  },
  {
    "command": "Sketcher_ConnectLines",
    "iconFile": "Sketcher_ConnectLines",
    "toolTip": "Sketcher_ConnectLines",
    "groups": []
  },
  {
    "command": "Sketcher_ConstrainAngle",
    "iconFile": "",
    "toolTip": "Sketcher_ConstrainAngle",
    "groups": []
  },
  {
    "command": "Sketcher_ConstrainBlock",
    "iconFile": "Sketcher_ConstrainBlock",
    "toolTip": "Sketcher_ConstrainBlock",
    "groups": []
  },
  {
    "command": "Sketcher_ConstrainCoincident",
    "iconFile": "Sketcher_ConstrainCoincident",
    "toolTip": "Sketcher_ConstrainCoincident",
    "groups": []
  },
  {
    "command": "Sketcher_ConstrainDiameter",
    "iconFile": "",
    "toolTip": "Sketcher_ConstrainDiameter",
    "groups": []
  },
  {
    "command": "Sketcher_ConstrainDistance",
    "iconFile": "Sketcher_ConstrainDistance",
    "toolTip": "Sketcher_ConstrainDistance",
    "groups": []
  },
  {
    "command": "Sketcher_ConstrainDistanceX",
    "iconFile": "",
    "toolTip": "Sketcher_ConstrainDistanceX",
    "groups": []
  },
  {
    "command": "Sketcher_ConstrainDistanceY",
    "iconFile": "",
    "toolTip": "Sketcher_ConstrainDistanceY",
    "groups": []
  },
  {
    "command": "Sketcher_ConstrainEqual",
    "iconFile": "",
    "toolTip": "Sketcher_ConstrainEqual",
    "groups": []
  },
  {
    "command": "Sketcher_ConstrainHorizontal",
    "iconFile": "Sketcher_ConstrainHorizontal",
    "toolTip": "Sketcher_ConstrainHorizontal",
    "groups": []
  },
  {
    "command": "Sketcher_ConstrainInternalAlignment",
    "iconFile": "",
    "toolTip": "Sketcher_ConstrainInternalAlignment",
    "groups": []
  },
  {
    "command": "Sketcher_ConstrainLock",
    "iconFile": "Sketcher_ConstrainLock",
    "toolTip": "Sketcher_ConstrainLock",
    "groups": []
  },
  {
    "command": "Sketcher_ConstrainParallel",
    "iconFile": "Sketcher_ConstrainParallel",
    "toolTip": "Sketcher_ConstrainParallel",
    "groups": []
  },
  {
    "command": "Sketcher_ConstrainPerpendicular",
    "iconFile": "",
    "toolTip": "Sketcher_ConstrainPerpendicular",
    "groups": []
  },
  {
    "command": "Sketcher_ConstrainPointOnObject",
    "iconFile": "",
    "toolTip": "Sketcher_ConstrainPointOnObject",
    "groups": []
  },
  {
    "command": "Sketcher_ConstrainRadius",
    "iconFile": "",
    "toolTip": "Sketcher_ConstrainRadius",
    "groups": []
  },
  {
    "command": "Sketcher_ConstrainSnellsLaw",
    "iconFile": "",
    "toolTip": "Sketcher_ConstrainSnellsLaw",
    "groups": []
  },
  {
    "command": "Sketcher_ConstrainSymmetric",
    "iconFile": "",
    "toolTip": "Sketcher_ConstrainSymmetric",
    "groups": []
  },
  {
    "command": "Sketcher_ConstrainTangent",
    "iconFile": "",
    "toolTip": "Sketcher_ConstrainTangent",
    "groups": []
  },
  {
    "command": "Sketcher_ConstrainVertical",
    "iconFile": "Sketcher_ConstrainVertical",
    "toolTip": "Sketcher_ConstrainVertical",
    "groups": []
  },
  {
    "command": "Sketcher_Copy",
    "iconFile": "Sketcher_Copy",
    "toolTip": "Sketcher_Copy",
    "groups": []
  },
  {
    "command": "Sketcher_Create3PointArc",
    "iconFile": "Sketcher_Create3PointArc",
    "toolTip": "Sketcher_Create3PointArc",
    "groups": []
  },
  {
    "command": "Sketcher_Create3PointCircle",
    "iconFile": "Sketcher_Create3PointCircle",
    "toolTip": "Sketcher_Create3PointCircle",
    "groups": []
  },
  {
    "command": "Sketcher_CreateArc",
    "iconFile": "Sketcher_CreateArc",
    "toolTip": "Sketcher_CreateArc",
    "groups": []
  },
  {
    "command": "Sketcher_CreateArcOfEllipse",
    "iconFile": "",
    "toolTip": "Sketcher_CreateArcOfEllipse",
    "groups": []
  },
  {
    "command": "Sketcher_CreateArcOfHyperbola",
    "iconFile": "",
    "toolTip": "Sketcher_CreateArcOfHyperbola",
    "groups": []
  },
  {
    "command": "Sketcher_CreateArcOfParabola",
    "iconFile": "",
    "toolTip": "Sketcher_CreateArcOfParabola",
    "groups": []
  },
  {
    "command": "Sketcher_CreateBSpline",
    "iconFile": "Sketcher_CreateBSpline",
    "toolTip": "Sketcher_CreateBSpline",
    "groups": []
  },
  {
    "command": "Sketcher_CreateCircle",
    "iconFile": "Sketcher_CreateCircle",
    "toolTip": "Sketcher_CreateCircle",
    "groups": []
  },
  {
    "command": "Sketcher_CreateEllipseBy3Points",
    "iconFile": "",
    "toolTip": "Sketcher_CreateEllipseBy3Points",
    "groups": []
  },
  {
    "command": "Sketcher_CreateEllipseByCenter",
    "iconFile": "",
    "toolTip": "Sketcher_CreateEllipseByCenter",
    "groups": []
  },
  {
    "command": "Sketcher_CreateFillet",
    "iconFile": "Sketcher_CreateFillet",
    "toolTip": "Sketcher_CreateFillet",
    "groups": []
  },
  {
    "command": "Sketcher_CreateHeptagon",
    "iconFile": "Sketcher_CreateHeptagon",
    "toolTip": "Sketcher_CreateHeptagon",
    "groups": []
  },
  {
    "command": "Sketcher_CreateHexagon",
    "iconFile": "Sketcher_CreateHexagon",
    "toolTip": "Sketcher_CreateHexagon",
    "groups": []
  },
  {
    "command": "Sketcher_CreateLine",
    "iconFile": "Sketcher_CreateLine",
    "toolTip": "Sketcher_CreateLine",
    "groups": []
  },
  {
    "command": "Sketcher_CreateOctagon",
    "iconFile": "Sketcher_CreateOctagon",
    "toolTip": "Sketcher_CreateOctagon",
    "groups": []
  },
  {
    "command": "Sketcher_CreatePentagon",
    "iconFile": "Sketcher_CreatePentagon",
    "toolTip": "Sketcher_CreatePentagon",
    "groups": []
  },
  {
    "command": "Sketcher_CreatePeriodicBSpline",
    "iconFile": "",
    "toolTip": "Sketcher_CreatePeriodicBSpline",
    "groups": []
  },
  {
    "command": "Sketcher_CreatePoint",
    "iconFile": "Sketcher_CreatePoint",
    "toolTip": "Sketcher_CreatePoint",
    "groups": []
  },
  {
    "command": "Sketcher_CreatePolyline",
    "iconFile": "Sketcher_CreatePolyline",
    "toolTip": "Sketcher_CreatePolyline",
    "groups": []
  },
  {
    "command": "Sketcher_CreateRectangle",
    "iconFile": "Sketcher_CreateRectangle",
    "toolTip": "Sketcher_CreateRectangle",
    "groups": []
  },
  {
    "command": "Sketcher_CreateSlot",
    "iconFile": "Sketcher_CreateSlot",
    "toolTip": "Sketcher_CreateSlot",
    "groups": []
  },
  {
    "command": "Sketcher_CreateSquare",
    "iconFile": "Sketcher_CreateSquare",
    "toolTip": "Sketcher_CreateSquare",
    "groups": []
  },
  {
    "command": "Sketcher_CreateTriangle",
    "iconFile": "Sketcher_CreateTriangle",
    "toolTip": "Sketcher_CreateTriangle",
    "groups": []
  },
  {
    "command": "Sketcher_DeleteAllConstraints",
    "iconFile": "",
    "toolTip": "Sketcher_DeleteAllConstraints",
    "groups": []
  },
  {
    "command": "Sketcher_DeleteAllGeometry",
    "iconFile": "",
    "toolTip": "Sketcher_DeleteAllGeometry",
    "groups": []
  },
  {
    "command": "Sketcher_EditSketch",
    "iconFile": "Sketcher_EditSketch",
    "toolTip": "Sketcher_EditSketch",
    "groups": []
  },
  {
    "command": "Sketcher_Extend",
    "iconFile": "Sketcher_Extend",
    "toolTip": "Sketcher_Extend",
    "groups": []
  },
  {
    "command": "Sketcher_External",
    "iconFile": "Sketcher_External",
    "toolTip": "Sketcher_External",
    "groups": []
  },
  {
    "command": "Sketcher_LeaveSketch",
    "iconFile": "Sketcher_LeaveSketch",
    "toolTip": "Sketcher_LeaveSketch",
    "groups": []
  },
  {
    "command": "Sketcher_MapSketch",
    "iconFile": "Sketcher_MapSketch",
    "toolTip": "Sketcher_MapSketch",
    "groups": []
  },
  {
    "command": "Sketcher_MergeSketches",
    "iconFile": "",
    "toolTip": "Sketcher_MergeSketches",
    "groups": []
  },
  {
    "command": "Sketcher_MirrorSketch",
    "iconFile": "Sketcher_MirrorSketch",
    "toolTip": "Sketcher_MirrorSketch",
    "groups": []
  },
  {
    "command": "Sketcher_Move",
    "iconFile": "Sketcher_Move",
    "toolTip": "Sketcher_Move",
    "groups": []
  },
  {
    "command": "Sketcher_NewSketch",
    "iconFile": "Sketcher_NewSketch",
    "toolTip": "Sketcher_NewSketch",
    "groups": []
  },
  {
    "command": "Sketcher_ProfilesHexagon1",
    "iconFile": "Sketcher_ProfilesHexagon1",
    "toolTip": "Sketcher_ProfilesHexagon1",
    "groups": []
  },
  {
    "command": "Sketcher_RectangularArray",
    "iconFile": "Sketcher_RectangularArray",
    "toolTip": "Sketcher_RectangularArray",
    "groups": []
  },
  {
    "command": "Sketcher_ReorientSketch",
    "iconFile": "",
    "toolTip": "Sketcher_ReorientSketch",
    "groups": []
  },
  {
    "command": "Sketcher_RestoreInternalAlignmentGeometry",
    "iconFile": "",
    "toolTip": "Sketcher_RestoreInternalAlignmentGeometry",
    "groups": []
  },
  {
    "command": "Sketcher_SelectConflictingConstraints",
    "iconFile": "Sketcher_SelectConflictingConstraints",
    "toolTip": "Sketcher_SelectConflictingConstraints",
    "groups": []
  },
  {
    "command": "Sketcher_SelectConstraints",
    "iconFile": "Sketcher_SelectConstraints",
    "toolTip": "Sketcher_SelectConstraints",
    "groups": []
  },
  {
    "command": "Sketcher_SelectElementsAssociatedWithConstraints",
    "iconFile": "Sketcher_SelectElementsAssociatedWithConstraints",
    "toolTip": "Sketcher_SelectElementsAssociatedWithConstraints",
    "groups": []
  },
  {
    "command": "Sketcher_SelectElementsWithDoFs",
    "iconFile": "Sketcher_SelectElementsWithDoFs",
    "toolTip": "Sketcher_SelectElementsWithDoFs",
    "groups": []
  },
  {
    "command": "Sketcher_SelectHorizontalAxis",
    "iconFile": "Sketcher_SelectHorizontalAxis",
    "toolTip": "Sketcher_SelectHorizontalAxis",
    "groups": []
  },
  {
    "command": "Sketcher_SelectOrigin",
    "iconFile": "Sketcher_SelectOrigin",
    "toolTip": "Sketcher_SelectOrigin",
    "groups": []
  },
  {
    "command": "Sketcher_SelectRedundantConstraints",
    "iconFile": "Sketcher_SelectRedundantConstraints",
    "toolTip": "Sketcher_SelectRedundantConstraints",
    "groups": []
  },
  {
    "command": "Sketcher_SelectVerticalAxis",
    "iconFile": "Sketcher_SelectVerticalAxis",
    "toolTip": "Sketcher_SelectVerticalAxis",
    "groups": []
  },
  {
    "command": "Sketcher_SwitchVirtualSpace",
    "iconFile": "Sketcher_SwitchVirtualSpace",
    "toolTip": "Sketcher_SwitchVirtualSpace",
    "groups": []
  },
  {
    "command": "Sketcher_Symmetry",
    "iconFile": "Sketcher_Symmetry",
    "toolTip": "Sketcher_Symmetry",
    "groups": []
  },
  {
    "command": "Sketcher_ToggleConstruction",
    "iconFile": "Sketcher_ToggleConstruction",
    "toolTip": "Sketcher_ToggleConstruction",
    "groups": []
  },
  {
    "command": "Sketcher_ToggleDrivingConstraint",
    "iconFile": "",
    "toolTip": "Sketcher_ToggleDrivingConstraint",
    "groups": []
  },
  {
    "command": "Sketcher_Trimming",
    "iconFile": "Sketcher_Trimming",
    "toolTip": "Sketcher_Trimming",
    "groups": []
  },
  {
    "command": "Sketcher_ValidateSketch",
    "iconFile": "",
    "toolTip": "Sketcher_ValidateSketch",
    "groups": []
  },
  {
    "command": "Sketcher_ViewSection",
    "iconFile": "Sketcher_ViewSection",
    "toolTip": "Sketcher_ViewSection",
    "groups": []
  },
  {
    "command": "Sketcher_ViewSketch",
    "iconFile": "Sketcher_ViewSketch",
    "toolTip": "Sketcher_ViewSketch",
    "groups": []
  },
  {
    "command": "Spreadsheet_AlignBottom",
    "iconFile": "",
    "toolTip": "Spreadsheet_AlignBottom",
    "groups": []
  },
  {
    "command": "Spreadsheet_AlignCenter",
    "iconFile": "",
    "toolTip": "Spreadsheet_AlignCenter",
    "groups": []
  },
  {
    "command": "Spreadsheet_AlignLeft",
    "iconFile": "",
    "toolTip": "Spreadsheet_AlignLeft",
    "groups": []
  },
  {
    "command": "Spreadsheet_AlignRight",
    "iconFile": "",
    "toolTip": "Spreadsheet_AlignRight",
    "groups": []
  },
  {
    "command": "Spreadsheet_AlignTop",
    "iconFile": "",
    "toolTip": "Spreadsheet_AlignTop",
    "groups": []
  },
  {
    "command": "Spreadsheet_AlignVCenter",
    "iconFile": "",
    "toolTip": "Spreadsheet_AlignVCenter",
    "groups": []
  },
  {
    "command": "Spreadsheet_CreateSheet",
    "iconFile": "",
    "toolTip": "Spreadsheet_CreateSheet",
    "groups": []
  },
  {
    "command": "Spreadsheet_Export",
    "iconFile": "",
    "toolTip": "Spreadsheet_Export",
    "groups": []
  },
  {
    "command": "Spreadsheet_Import",
    "iconFile": "",
    "toolTip": "Spreadsheet_Import",
    "groups": []
  },
  {
    "command": "Spreadsheet_MergeCells",
    "iconFile": "",
    "toolTip": "Spreadsheet_MergeCells",
    "groups": []
  },
  {
    "command": "Spreadsheet_SetAlias",
    "iconFile": "",
    "toolTip": "Spreadsheet_SetAlias",
    "groups": []
  },
  {
    "command": "Spreadsheet_SplitCell",
    "iconFile": "",
    "toolTip": "Spreadsheet_SplitCell",
    "groups": []
  },
  {
    "command": "Spreadsheet_StyleBold",
    "iconFile": "",
    "toolTip": "Spreadsheet_StyleBold",
    "groups": []
  },
  {
    "command": "Spreadsheet_StyleItalic",
    "iconFile": "",
    "toolTip": "Spreadsheet_StyleItalic",
    "groups": []
  },
  {
    "command": "Spreadsheet_StyleUnderline",
    "iconFile": "",
    "toolTip": "Spreadsheet_StyleUnderline",
    "groups": []
  },
  {
    "command": "Start_StartPage",
    "iconFile": "",
    "toolTip": "Start_StartPage",
    "groups": []
  },
  {
    "command": "Std_About",
    "iconFile": "",
    "toolTip": "Std_About",
    "groups": []
  },
  {
    "command": "Std_ActivateNextWindow",
    "iconFile": "",
    "toolTip": "Std_ActivateNextWindow",
    "groups": []
  },
  {
    "command": "Std_ActivatePrevWindow",
    "iconFile": "",
    "toolTip": "Std_ActivatePrevWindow",
    "groups": []
  },
  {
    "command": "Std_AddonMgr",
    "iconFile": "",
    "toolTip": "Std_AddonMgr",
    "groups": []
  },
  {
    "command": "Std_Alignment",
    "iconFile": "",
    "toolTip": "Std_Alignment",
    "groups": []
  },
  {
    "command": "Std_ArrangeIcons",
    "iconFile": "",
    "toolTip": "Std_ArrangeIcons",
    "groups": []
  },
  {
    "command": "Std_AxisCross",
    "iconFile": "",
    "toolTip": "Std_AxisCross",
    "groups": []
  },
  {
    "command": "Std_BoxSelection",
    "iconFile": "",
    "toolTip": "Std_BoxSelection",
    "groups": []
  },
  {
    "command": "Std_CascadeWindows",
    "iconFile": "",
    "toolTip": "Std_CascadeWindows",
    "groups": []
  },
  {
    "command": "Std_CloseActiveWindow",
    "iconFile": "",
    "toolTip": "Std_CloseActiveWindow",
    "groups": []
  },
  {
    "command": "Std_CloseAllWindows",
    "iconFile": "",
    "toolTip": "Std_CloseAllWindows",
    "groups": []
  },
  {
    "command": "Std_Copy",
    "iconFile": "",
    "toolTip": "Std_Copy",
    "groups": []
  },
  {
    "command": "Std_Cut",
    "iconFile": "",
    "toolTip": "Std_Cut",
    "groups": []
  },
  {
    "command": "Std_Delete",
    "iconFile": "",
    "toolTip": "Std_Delete",
    "groups": []
  },
  {
    "command": "Std_DemoMode",
    "iconFile": "",
    "toolTip": "Std_DemoMode",
    "groups": []
  },
  {
    "command": "Std_DlgCustomize",
    "iconFile": "",
    "toolTip": "Std_DlgCustomize",
    "groups": []
  },
  {
    "command": "Std_DlgMacroExecute",
    "iconFile": "",
    "toolTip": "Std_DlgMacroExecute",
    "groups": []
  },
  {
    "command": "Std_DlgMacroExecuteDirect",
    "iconFile": "",
    "toolTip": "Std_DlgMacroExecuteDirect",
    "groups": []
  },
  {
    "command": "Std_DlgMacroRecord",
    "iconFile": "",
    "toolTip": "Std_DlgMacroRecord",
    "groups": []
  },
  {
    "command": "Std_DlgParameter",
    "iconFile": "",
    "toolTip": "Std_DlgParameter",
    "groups": []
  },
  {
    "command": "Std_DlgPreferences",
    "iconFile": "",
    "toolTip": "Std_DlgPreferences",
    "groups": []
  },
  {
    "command": "Std_DockViewMenu",
    "iconFile": "",
    "toolTip": "Std_DockViewMenu",
    "groups": []
  },
  {
    "command": "Std_DrawStyle",
    "iconFile": "",
    "toolTip": "Std_DrawStyle",
    "groups": []
  },
  {
    "command": "Std_DrawStyleAsIs",
    "iconFile": "",
    "toolTip": "Std_DrawStyleAsIs",
    "groups": []
  },
  {
    "command": "Std_DrawStyleFlatLines",
    "iconFile": "",
    "toolTip": "Std_DrawStyleFlatLines",
    "groups": []
  },
  {
    "command": "Std_DrawStyleHiddenLine",
    "iconFile": "",
    "toolTip": "Std_DrawStyleHiddenLine",
    "groups": []
  },
  {
    "command": "Std_DrawStyleNoShading",
    "iconFile": "",
    "toolTip": "Std_DrawStyleNoShading",
    "groups": []
  },
  {
    "command": "Std_DrawStylePoints",
    "iconFile": "",
    "toolTip": "Std_DrawStylePoints",
    "groups": []
  },
  {
    "command": "Std_DrawStyleShaded",
    "iconFile": "",
    "toolTip": "Std_DrawStyleShaded",
    "groups": []
  },
  {
    "command": "Std_DrawStyleWireframe",
    "iconFile": "",
    "toolTip": "Std_DrawStyleWireframe",
    "groups": []
  },
  {
    "command": "Std_DuplicateSelection",
    "iconFile": "",
    "toolTip": "Std_DuplicateSelection",
    "groups": []
  },
  {
    "command": "Std_Edit",
    "iconFile": "",
    "toolTip": "Std_Edit",
    "groups": []
  },
  {
    "command": "Std_Export",
    "iconFile": "",
    "toolTip": "Std_Export",
    "groups": []
  },
  {
    "command": "Std_ExportGraphviz",
    "iconFile": "",
    "toolTip": "Std_ExportGraphviz",
    "groups": []
  },
  {
    "command": "Std_FreeCADFAQ",
    "iconFile": "",
    "toolTip": "Std_FreeCADFAQ",
    "groups": []
  },
  {
    "command": "Std_FreeCADForum",
    "iconFile": "",
    "toolTip": "Std_FreeCADForum",
    "groups": []
  },
  {
    "command": "Std_FreeCADPowerUserHub",
    "iconFile": "",
    "toolTip": "Std_FreeCADPowerUserHub",
    "groups": []
  },
  {
    "command": "Std_FreeCADUserHub",
    "iconFile": "",
    "toolTip": "Std_FreeCADUserHub",
    "groups": []
  },
  {
    "command": "Std_FreeCADWebsite",
    "iconFile": "",
    "toolTip": "Std_FreeCADWebsite",
    "groups": []
  },
  {
    "command": "Std_FreezeViews",
    "iconFile": "",
    "toolTip": "Std_FreezeViews",
    "groups": []
  },
  {
    "command": "Std_Group",
    "iconFile": "",
    "toolTip": "Std_Group",
    "groups": []
  },
  {
    "command": "Std_HideObjects",
    "iconFile": "",
    "toolTip": "Std_HideObjects",
    "groups": []
  },
  {
    "command": "Std_HideSelection",
    "iconFile": "",
    "toolTip": "Std_HideSelection",
    "groups": []
  },
  {
    "command": "Std_Import",
    "iconFile": "",
    "toolTip": "Std_Import",
    "groups": []
  },
  {
    "command": "Std_MacroStartDebug",
    "iconFile": "",
    "toolTip": "Std_MacroStartDebug",
    "groups": []
  },
  {
    "command": "Std_MacroStepInto",
    "iconFile": "",
    "toolTip": "Std_MacroStepInto",
    "groups": []
  },
  {
    "command": "Std_MacroStepOver",
    "iconFile": "",
    "toolTip": "Std_MacroStepOver",
    "groups": []
  },
  {
    "command": "Std_MacroStopDebug",
    "iconFile": "",
    "toolTip": "Std_MacroStopDebug",
    "groups": []
  },
  {
    "command": "Std_MacroStopRecord",
    "iconFile": "",
    "toolTip": "Std_MacroStopRecord",
    "groups": []
  },
  {
    "command": "Std_MainFullscreen",
    "iconFile": "",
    "toolTip": "Std_MainFullscreen",
    "groups": []
  },
  {
    "command": "Std_MeasureDistance",
    "iconFile": "",
    "toolTip": "Std_MeasureDistance",
    "groups": []
  },
  {
    "command": "Std_MergeProjects",
    "iconFile": "",
    "toolTip": "Std_MergeProjects",
    "groups": []
  },
  {
    "command": "Std_New",
    "iconFile": "",
    "toolTip": "Std_New",
    "groups": []
  },
  {
    "command": "Std_OnlineHelp",
    "iconFile": "",
    "toolTip": "Std_OnlineHelp",
    "groups": []
  },
  {
    "command": "Std_Open",
    "iconFile": "",
    "toolTip": "Std_Open",
    "groups": []
  },
  {
    "command": "Std_OrthographicCamera",
    "iconFile": "",
    "toolTip": "Std_OrthographicCamera",
    "groups": []
  },
  {
    "command": "Std_Part",
    "iconFile": "",
    "toolTip": "Std_Part",
    "groups": []
  },
  {
    "command": "Std_Paste",
    "iconFile": "",
    "toolTip": "Std_Paste",
    "groups": []
  },
  {
    "command": "Std_PerspectiveCamera",
    "iconFile": "",
    "toolTip": "Std_PerspectiveCamera",
    "groups": []
  },
  {
    "command": "Std_Placement",
    "iconFile": "Std_Placement",
    "toolTip": "Std_Placement",
    "groups": []
  },
  {
    "command": "Std_Print",
    "iconFile": "",
    "toolTip": "Std_Print",
    "groups": []
  },
  {
    "command": "Std_PrintPdf",
    "iconFile": "",
    "toolTip": "Std_PrintPdf",
    "groups": []
  },
  {
    "command": "Std_PrintPreview",
    "iconFile": "",
    "toolTip": "Std_PrintPreview",
    "groups": []
  },
  {
    "command": "Std_ProjectInfo",
    "iconFile": "",
    "toolTip": "Std_ProjectInfo",
    "groups": []
  },
  {
    "command": "Std_ProjectUtil",
    "iconFile": "",
    "toolTip": "Std_ProjectUtil",
    "groups": []
  },
  {
    "command": "Std_PythonHelp",
    "iconFile": "",
    "toolTip": "Std_PythonHelp",
    "groups": []
  },
  {
    "command": "Std_Quit",
    "iconFile": "",
    "toolTip": "Std_Quit",
    "groups": []
  },
  {
    "command": "Std_RandomColor",
    "iconFile": "",
    "toolTip": "Std_RandomColor",
    "groups": []
  },
  {
    "command": "Std_RecentFiles",
    "iconFile": "",
    "toolTip": "Std_RecentFiles",
    "groups": []
  },
  {
    "command": "Std_Redo",
    "iconFile": "",
    "toolTip": "Std_Redo",
    "groups": []
  },
  {
    "command": "Std_Refresh",
    "iconFile": "",
    "toolTip": "Std_Refresh",
    "groups": []
  },
  {
    "command": "Std_Revert",
    "iconFile": "",
    "toolTip": "Std_Revert",
    "groups": []
  },
  {
    "command": "Std_Save",
    "iconFile": "",
    "toolTip": "Std_Save",
    "groups": []
  },
  {
    "command": "Std_SaveAs",
    "iconFile": "",
    "toolTip": "Std_SaveAs",
    "groups": []
  },
  {
    "command": "Std_SaveCopy",
    "iconFile": "",
    "toolTip": "Std_SaveCopy",
    "groups": []
  },
  {
    "command": "Std_SceneInspector",
    "iconFile": "",
    "toolTip": "Std_SceneInspector",
    "groups": []
  },
  {
    "command": "Std_SelectAll",
    "iconFile": "",
    "toolTip": "Std_SelectAll",
    "groups": []
  },
  {
    "command": "Std_SelectVisibleObjects",
    "iconFile": "",
    "toolTip": "Std_SelectVisibleObjects",
    "groups": []
  },
  {
    "command": "Std_SetAppearance",
    "iconFile": "",
    "toolTip": "Std_SetAppearance",
    "groups": []
  },
  {
    "command": "Std_ShowObjects",
    "iconFile": "",
    "toolTip": "Std_ShowObjects",
    "groups": []
  },
  {
    "command": "Std_ShowSelection",
    "iconFile": "",
    "toolTip": "Std_ShowSelection",
    "groups": []
  },
  {
    "command": "Std_TestQM",
    "iconFile": "",
    "toolTip": "Std_TestQM",
    "groups": []
  },
  {
    "command": "Std_TestReloadQM",
    "iconFile": "",
    "toolTip": "Std_TestReloadQM",
    "groups": []
  },
  {
    "command": "Std_TextureMapping",
    "iconFile": "",
    "toolTip": "Std_TextureMapping",
    "groups": []
  },
  {
    "command": "Std_TileWindows",
    "iconFile": "",
    "toolTip": "Std_TileWindows",
    "groups": []
  },
  {
    "command": "Std_ToggleBreakpoint",
    "iconFile": "",
    "toolTip": "Std_ToggleBreakpoint",
    "groups": []
  },
  {
    "command": "Std_ToggleClipPlane",
    "iconFile": "",
    "toolTip": "Std_ToggleClipPlane",
    "groups": []
  },
  {
    "command": "Std_ToggleNavigation",
    "iconFile": "",
    "toolTip": "Std_ToggleNavigation",
    "groups": []
  },
  {
    "command": "Std_ToggleObjects",
    "iconFile": "",
    "toolTip": "Std_ToggleObjects",
    "groups": []
  },
  {
    "command": "Std_ToggleSelectability",
    "iconFile": "",
    "toolTip": "Std_ToggleSelectability",
    "groups": []
  },
  {
    "command": "Std_ToggleVisibility",
    "iconFile": "",
    "toolTip": "Std_ToggleVisibility",
    "groups": []
  },
  {
    "command": "Std_ToolBarMenu",
    "iconFile": "",
    "toolTip": "Std_ToolBarMenu",
    "groups": []
  },
  {
    "command": "Std_TreeCollapseDocument",
    "iconFile": "",
    "toolTip": "Std_TreeCollapseDocument",
    "groups": []
  },
  {
    "command": "Std_TreeMultiDocument",
    "iconFile": "",
    "toolTip": "Std_TreeMultiDocument",
    "groups": []
  },
  {
    "command": "Std_TreeSingleDocument",
    "iconFile": "",
    "toolTip": "Std_TreeSingleDocument",
    "groups": []
  },
  {
    "command": "Std_TreeViewDocument",
    "iconFile": "",
    "toolTip": "Std_TreeViewDocument",
    "groups": []
  },
  {
    "command": "Std_Undo",
    "iconFile": "",
    "toolTip": "Std_Undo",
    "groups": []
  },
  {
    "command": "Std_UnitsCalculator",
    "iconFile": "",
    "toolTip": "Std_UnitsCalculator",
    "groups": []
  },
  {
    "command": "Std_ViewBottom",
    "iconFile": "",
    "toolTip": "Std_ViewBottom",
    "groups": []
  },
  {
    "command": "Std_ViewBoxZoom",
    "iconFile": "",
    "toolTip": "Std_ViewBoxZoom",
    "groups": []
  },
  {
    "command": "Std_ViewCreate",
    "iconFile": "",
    "toolTip": "Std_ViewCreate",
    "groups": []
  },
  {
    "command": "Std_ViewDimetric",
    "iconFile": "",
    "toolTip": "Std_ViewDimetric",
    "groups": []
  },
  {
    "command": "Std_ViewDock",
    "iconFile": "",
    "toolTip": "Std_ViewDock",
    "groups": []
  },
  {
    "command": "Std_ViewDockUndockFullscreen",
    "iconFile": "",
    "toolTip": "Std_ViewDockUndockFullscreen",
    "groups": []
  },
  {
    "command": "Std_ViewFitAll",
    "iconFile": "",
    "toolTip": "Std_ViewFitAll",
    "groups": []
  },
  {
    "command": "Std_ViewFitSelection",
    "iconFile": "",
    "toolTip": "Std_ViewFitSelection",
    "groups": []
  },
  {
    "command": "Std_ViewFront",
    "iconFile": "",
    "toolTip": "Std_ViewFront",
    "groups": []
  },
  {
    "command": "Std_ViewFullscreen",
    "iconFile": "",
    "toolTip": "Std_ViewFullscreen",
    "groups": []
  },
  {
    "command": "Std_ViewIsometric",
    "iconFile": "",
    "toolTip": "Std_ViewIsometric",
    "groups": []
  },
  {
    "command": "Std_ViewIvIssueCamPos",
    "iconFile": "",
    "toolTip": "Std_ViewIvIssueCamPos",
    "groups": []
  },
  {
    "command": "Std_ViewIvStereoInterleavedColumns",
    "iconFile": "",
    "toolTip": "Std_ViewIvStereoInterleavedColumns",
    "groups": []
  },
  {
    "command": "Std_ViewIvStereoInterleavedRows",
    "iconFile": "",
    "toolTip": "Std_ViewIvStereoInterleavedRows",
    "groups": []
  },
  {
    "command": "Std_ViewIvStereoOff",
    "iconFile": "",
    "toolTip": "Std_ViewIvStereoOff",
    "groups": []
  },
  {
    "command": "Std_ViewIvStereoQuadBuff",
    "iconFile": "",
    "toolTip": "Std_ViewIvStereoQuadBuff",
    "groups": []
  },
  {
    "command": "Std_ViewIvStereoRedGreen",
    "iconFile": "",
    "toolTip": "Std_ViewIvStereoRedGreen",
    "groups": []
  },
  {
    "command": "Std_ViewLeft",
    "iconFile": "",
    "toolTip": "Std_ViewLeft",
    "groups": []
  },
  {
    "command": "Std_ViewRear",
    "iconFile": "",
    "toolTip": "Std_ViewRear",
    "groups": []
  },
  {
    "command": "Std_ViewRight",
    "iconFile": "",
    "toolTip": "Std_ViewRight",
    "groups": []
  },
  {
    "command": "Std_ViewRotateLeft",
    "iconFile": "",
    "toolTip": "Std_ViewRotateLeft",
    "groups": []
  },
  {
    "command": "Std_ViewRotateRight",
    "iconFile": "",
    "toolTip": "Std_ViewRotateRight",
    "groups": []
  },
  {
    "command": "Std_ViewScreenShot",
    "iconFile": "Std_ViewScreenShot",
    "toolTip": "Std_ViewScreenShot",
    "groups": []
  },
  {
    "command": "Std_ViewStatusBar",
    "iconFile": "",
    "toolTip": "Std_ViewStatusBar",
    "groups": []
  },
  {
    "command": "Std_ViewTop",
    "iconFile": "",
    "toolTip": "Std_ViewTop",
    "groups": []
  },
  {
    "command": "Std_ViewTrimetric",
    "iconFile": "",
    "toolTip": "Std_ViewTrimetric",
    "groups": []
  },
  {
    "command": "Std_ViewUndock",
    "iconFile": "",
    "toolTip": "Std_ViewUndock",
    "groups": []
  },
  {
    "command": "Std_ViewZoomIn",
    "iconFile": "",
    "toolTip": "Std_ViewZoomIn",
    "groups": []
  },
  {
    "command": "Std_ViewZoomOut",
    "iconFile": "",
    "toolTip": "Std_ViewZoomOut",
    "groups": []
  },
  {
    "command": "Std_WhatsThis",
    "iconFile": "",
    "toolTip": "Std_WhatsThis",
    "groups": []
  },
  {
    "command": "Std_Windows",
    "iconFile": "",
    "toolTip": "Std_Windows",
    "groups": []
  },
  {
    "command": "Std_Workbench",
    "iconFile": "",
    "toolTip": "Std_Workbench",
    "groups": []
  },
  {
    "command": "Surface_CurveOnMesh",
    "iconFile": "",
    "toolTip": "Surface_CurveOnMesh",
    "groups": []
  },
  {
    "command": "Surface_ExtendFace",
    "iconFile": "",
    "toolTip": "Surface_ExtendFace",
    "groups": []
  },
  {
    "command": "Surface_Filling",
    "iconFile": "Surface_Filling",
    "toolTip": "Surface_Filling",
    "groups": []
  },
  {
    "command": "Surface_GeomFillSurface",
    "iconFile": "",
    "toolTip": "Surface_GeomFillSurface",
    "groups": []
  },
  {
    "command": "TechDraw_Annotation",
    "iconFile": "",
    "toolTip": "TechDraw_Annotation",
    "groups": []
  },
  {
    "command": "TechDraw_ArchView",
    "iconFile": "",
    "toolTip": "TechDraw_ArchView",
    "groups": []
  },
  {
    "command": "TechDraw_Clip",
    "iconFile": "",
    "toolTip": "TechDraw_Clip",
    "groups": []
  },
  {
    "command": "TechDraw_ClipMinus",
    "iconFile": "",
    "toolTip": "TechDraw_ClipMinus",
    "groups": []
  },
  {
    "command": "TechDraw_ClipPlus",
    "iconFile": "",
    "toolTip": "TechDraw_ClipPlus",
    "groups": []
  },
  {
    "command": "TechDraw_DraftView",
    "iconFile": "",
    "toolTip": "TechDraw_DraftView",
    "groups": []
  },
  {
    "command": "TechDraw_ExportPage",
    "iconFile": "",
    "toolTip": "TechDraw_ExportPage",
    "groups": []
  },
  {
    "command": "TechDraw_ExportPageDxf",
    "iconFile": "",
    "toolTip": "TechDraw_ExportPageDxf",
    "groups": []
  },
  {
    "command": "TechDraw_Image",
    "iconFile": "",
    "toolTip": "TechDraw_Image",
    "groups": []
  },
  {
    "command": "TechDraw_LinkDimension",
    "iconFile": "",
    "toolTip": "TechDraw_LinkDimension",
    "groups": []
  },
  {
    "command": "TechDraw_NewAngle3PtDimension",
    "iconFile": "",
    "toolTip": "TechDraw_NewAngle3PtDimension",
    "groups": []
  },
  {
    "command": "TechDraw_NewAngleDimension",
    "iconFile": "",
    "toolTip": "TechDraw_NewAngleDimension",
    "groups": []
  },
  {
    "command": "TechDraw_NewDiameterDimension",
    "iconFile": "",
    "toolTip": "TechDraw_NewDiameterDimension",
    "groups": []
  },
  {
    "command": "TechDraw_NewDistanceXDimension",
    "iconFile": "",
    "toolTip": "TechDraw_NewDistanceXDimension",
    "groups": []
  },
  {
    "command": "TechDraw_NewDistanceYDimension",
    "iconFile": "",
    "toolTip": "TechDraw_NewDistanceYDimension",
    "groups": []
  },
  {
    "command": "TechDraw_NewGeomHatch",
    "iconFile": "",
    "toolTip": "TechDraw_NewGeomHatch",
    "groups": []
  },
  {
    "command": "TechDraw_NewHatch",
    "iconFile": "",
    "toolTip": "TechDraw_NewHatch",
    "groups": []
  },
  {
    "command": "TechDraw_NewLengthDimension",
    "iconFile": "",
    "toolTip": "TechDraw_NewLengthDimension",
    "groups": []
  },
  {
    "command": "TechDraw_NewPage",
    "iconFile": "",
    "toolTip": "TechDraw_NewPage",
    "groups": []
  },
  {
    "command": "TechDraw_NewPageDef",
    "iconFile": "",
    "toolTip": "TechDraw_NewPageDef",
    "groups": []
  },
  {
    "command": "TechDraw_NewRadiusDimension",
    "iconFile": "",
    "toolTip": "TechDraw_NewRadiusDimension",
    "groups": []
  },
  {
    "command": "TechDraw_NewView",
    "iconFile": "",
    "toolTip": "TechDraw_NewView",
    "groups": []
  },
  {
    "command": "TechDraw_NewViewDetail",
    "iconFile": "",
    "toolTip": "TechDraw_NewViewDetail",
    "groups": []
  },
  {
    "command": "TechDraw_NewViewSection",
    "iconFile": "",
    "toolTip": "TechDraw_NewViewSection",
    "groups": []
  },
  {
    "command": "TechDraw_ProjGroup",
    "iconFile": "",
    "toolTip": "TechDraw_ProjGroup",
    "groups": []
  },
  {
    "command": "TechDraw_Spreadsheet",
    "iconFile": "",
    "toolTip": "TechDraw_Spreadsheet",
    "groups": []
  },
  {
    "command": "TechDraw_Symbol",
    "iconFile": "",
    "toolTip": "TechDraw_Symbol",
    "groups": []
  },
  {
    "command": "TechDraw_ToggleFrame",
    "iconFile": "",
    "toolTip": "TechDraw_ToggleFrame",
    "groups": []
  },
  {
    "command": "View_Measure_Clear_All",
    "iconFile": "",
    "toolTip": "View_Measure_Clear_All",
    "groups": []
  },
  {
    "command": "View_Measure_Toggle_All",
    "iconFile": "",
    "toolTip": "View_Measure_Toggle_All",
    "groups": []
  },
  {
    "command": "Web_BrowserBack",
    "iconFile": "",
    "toolTip": "Web_BrowserBack",
    "groups": []
  },
  {
    "command": "Web_BrowserNext",
    "iconFile": "",
    "toolTip": "Web_BrowserNext",
    "groups": []
  },
  {
    "command": "Web_BrowserRefresh",
    "iconFile": "",
    "toolTip": "Web_BrowserRefresh",
    "groups": []
  },
  {
    "command": "Web_BrowserStop",
    "iconFile": "",
    "toolTip": "Web_BrowserStop",
    "groups": []
  },
  {
    "command": "Web_BrowserZoomIn",
    "iconFile": "",
    "toolTip": "Web_BrowserZoomIn",
    "groups": []
  },
  {
    "command": "Web_BrowserZoomOut",
    "iconFile": "",
    "toolTip": "Web_BrowserZoomOut",
    "groups": []
  },
  {
    "command": "Web_OpenWebsite",
    "iconFile": "",
    "toolTip": "Web_OpenWebsite",
    "groups": []
  }
];
