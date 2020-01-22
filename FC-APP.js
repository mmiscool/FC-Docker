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

  if (newToolGroupName) {
    toolbarGlobalObject.toolGroups.push({
      name: newToolGroupName,
      icons: [],
    });
  }



}










async function groupListIconRightClick(x, y, e) {
  event.preventDefault();
  event.stopPropagation();
  $("#toolBarRightClickMenue").empty();
  //alert(e.pageX + "," + e.pageY);


  
  if (y !== null) {
    
    newButtonStuff = {
      onclick: "toolbarGlobalObject.toolGroups[" + x + "].icons.move(" + y + "," + y + "-1);buildToolGroupPalletDivs();",
      text: "<",
    };
    $('#toolBarRightClickMenue').append($('<button>', newButtonStuff));


    newButtonStuff = {
      onclick: "toolbarGlobalObject.toolGroups[" + x + "].icons.move(" + y + "," + y + "+1);buildToolGroupPalletDivs();",
      text: ">",
    };
    $('#toolBarRightClickMenue').append($('<button>', newButtonStuff));

    newButtonStuff = {
      onclick: `if(confirm('Confirm delete tool group')) {
        toolbarGlobalObject.toolGroups[" + x + "].icons.splice(" + y + ",1);
        buildToolGroupPalletDivs();
        }`,
      text: "X",
    };
    $('#toolBarRightClickMenue').append($('<button>', newButtonStuff));
    
    $('#toolBarRightClickMenue').append("Icon:");

    $('#toolBarRightClickMenue').append("<br>");


  }





  if (x !== null) {

    newButtonStuff = {
      onclick: "toolbarGlobalObject.toolGroups.move(" + x + "," + x + "-1);buildToolGroupPalletDivs();",
      text: " <",
    };
    $('#toolBarRightClickMenue').append($('<button>', newButtonStuff));


    newButtonStuff = {
      onclick: "toolbarGlobalObject.toolGroups.move(" + x + "," + x + "+1);buildToolGroupPalletDivs();",
      text: ">",
    };
    $('#toolBarRightClickMenue').append($('<button>', newButtonStuff));


    newButtonStuff = {
      onclick: `if(confirm('Confirm delete tool group')){
        toolbarGlobalObject.toolGroups.splice(" + x + ",1);
        buildToolGroupPalletDivs();}`,
      text: "X",
    };
    $('#toolBarRightClickMenue').append($('<button>', newButtonStuff));
    
    $('#toolBarRightClickMenue').append("Group");

    $('#toolBarRightClickMenue').append("<br>");



    newButtonStuff = {
      onclick: `

                workbenctToEditToolBarsFor = undefined;
                //alert(activeWorkbench + "     " + "` + x + `");
                while (workbenctToEditToolBarsFor == undefined){
                  for (i = 0; i < toolbarGlobalObject.workbenches.length; i++) {
                    if (activeWorkbench == toolbarGlobalObject.workbenches[i].name) workbenctToEditToolBarsFor = i;
                  }
                  if (workbenctToEditToolBarsFor == undefined){
                    toolbarGlobalObject.workbenches.push({
                      name: activeWorkbench,
                      toolGroups: [],
                    });
                  }
                }
                
                if (toolbarGlobalObject.workbenches[workbenctToEditToolBarsFor].toolGroups.includes(toolbarGlobalObject.toolGroups[` + x + `].name)){
   
                  toolbarGlobalObject.workbenches[workbenctToEditToolBarsFor].toolGroups =
                  toolbarGlobalObject.workbenches[workbenctToEditToolBarsFor].toolGroups.filter(e => e !== toolbarGlobalObject.toolGroups[` + x + `].name);
                  
                  
                }else{
                  toolbarGlobalObject.workbenches[workbenctToEditToolBarsFor].toolGroups.push(toolbarGlobalObject.toolGroups[` + x + `].name);
                }
                
                
                
                buildToolGroupPalletDivs();
                
  							`,
    style:"width:100%",
  							
      text: "Toggle exclude From Workbench",
      
    };
    $('#toolBarRightClickMenue').append($('<button>', newButtonStuff));

    $('#toolBarRightClickMenue').append("<br>");


  }



  newButtonStuff = {
    onclick: `  
              createNewToolGroup();
              buildToolGroupPalletDivs();
              `,
    text: "New Tool Group",
    style:"width:100%",
  };
  $('#toolBarRightClickMenue').append($('<button>', newButtonStuff));

  $('#toolBarRightClickMenue').append("<br>");



  newButtonStuff = {
    onclick: `
                newNameForToolGroup = prompt("New Group Name", toolbarGlobalObject.toolGroups[` + x + `].name);
                if(newNameForToolGroup) toolbarGlobalObject.toolGroups[` + x + `].name = newNameForToolGroup;
    						buildToolGroupPalletDivs();
    						`,
    text: "Rename Tool Group",
    style:"width:100%",
  };
  $('#toolBarRightClickMenue').append($('<button>', newButtonStuff));

  $('#toolBarRightClickMenue').append("<br>");



  newButtonStuff = {
    onclick: `
                currentAplicationMode = "iconEditor";  
                loadIconPalletForSettings(); 
                $("#settings").show(); 
                $("#application").hide();
                buildToolGroupPalletDivs();
                `,
    style:"width:100%",
    text: "Edit Icons",
  };
  $('#toolBarRightClickMenue').append($('<button>', newButtonStuff));

  $('#toolBarRightClickMenue').append("<br>");




  newButtonStuff = {
    onclick: `
              toolbarGlobalObject.widthOfIcons = prompt("toolbar icon size in pixels", toolbarGlobalObject.widthOfIcons);
              buildToolGroupPalletDivs();
							`,
    style:"width:100%",
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
    style:"width:100%",
    text: "Save Toolbar configuration",
  };
  $('#toolBarRightClickMenue').append($('<button>', newButtonStuff));

  $('#toolBarRightClickMenue').append("<br>");




  


  $("#toolBarRightClickMenue").show();
  
  if ( $( window ).width() - $("#toolBarRightClickMenue").width() < e.pageX){
    $("#toolBarRightClickMenue").css("left", $( window ).width() - $("#toolBarRightClickMenue").width());
  }else{
    $("#toolBarRightClickMenue").css("left", e.pageX);
  }
  
  
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


  toolGroupsAlowedInWorkbench = await toolbarGlobalObject.workbenches.find(obj => { return obj.name === activeWorkbench });

  if (toolGroupsAlowedInWorkbench == undefined) {
    toolGroupsAlowedInWorkbench = {};
    toolGroupsAlowedInWorkbench.toolGroups = [];
  }
  //alert(JSON.stringify(toolGroupsAlowedInWorkbench));



  for (var x = 0; x < toolbarGlobalObject.toolGroups.length; x++) {
    currentGroup = toolbarGlobalObject.toolGroups[x];
    //console.log(currentGroup.name);
    currentGroup.name = currentGroup.name.replace(" ", "_");

    //need to create the div and calcualte width of div



    widthOfDivCalculated = widthOfIcons;
    if (currentGroup.icons.length > 0) {
      widthOfDivCalculated = widthOfDivCalculated * Math.ceil((currentGroup.icons.length) / Math.floor(90 / widthOfDivCalculated));
    }


    tooGroupDiv = {
      id: "toolGroup_" + currentGroup.name,
      style: "border-style: dotted;overflow:hidden; white-space:wrap; display: inline-block; height:145px;width:" + widthOfDivCalculated + "px;",
      ondrop: "event.preventDefault();catchDropIconToGroup(" + x + ");",
      ondragover: "event.preventDefault();",
      oncontextmenu: "groupListIconRightClick(" + x + ",null , event);",
    };



    $('#commandIcons').append($('<div>', tooGroupDiv));

    if (currentAplicationMode !== "iconEditor") {
      if (toolGroupsAlowedInWorkbench.toolGroups.includes(currentGroup.name)) $('#toolGroup_' + currentGroup.name).hide();
    }

    if (toolGroupsAlowedInWorkbench.toolGroups.includes(currentGroup.name)) $('#toolGroup_' + currentGroup.name).css({ 'background-color': 'pink' });


    $('#toolGroup_' + currentGroup.name).html(currentGroup.name + "<br>");

    iconRosCreated = 1;
    for (var i = 0; i < currentGroup.icons.length; i++) {
      currentIcon = currentGroup.icons[i];
      //console.log(currentIcon);

      //needs to be worked out how to get the command from the command name
      currentCommand = await toolbarGlobalObject.commandList.find(obj => { return obj.command === currentIcon });
      //alert(JSON.stringify(currentCommand));


      commandButtonSettings = {
        id: 'commandIcon_' + currentCommand.command,
        alt: currentCommand.command,
        src: 'icons/' + currentCommand.iconFile.toLowerCase().replace(/-/g, '_') + '.svg',
        onclick: "doCommand('" + currentCommand.command + "')",
        style: "white-space:wrap;",
        title: currentCommand.toolTip,
        width: widthOfIcons + "px",
        height: widthOfIcons + "px",
        oncontextmenu: "groupListIconRightClick(" + x + "," + i + ", event);",
      };


      if (widthOfIcons * i == widthOfDivCalculated * iconRosCreated) {
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
    iconlist = await $.get('./icons/list.txt');
    toolbarGlobalObject.listOfIcons = iconlist.replace(/\r\n/g, "\n").split("\n");


    for (var i = 0; i < toolbarGlobalObject.listOfIcons.length; i++) {
      currentIcon = toolbarGlobalObject.listOfIcons[i];
      $('#iconPalletForSettings').append($('<img>', {
        id: '',
        alt: currentIcon,
        src: 'icons/' + currentIcon.toLowerCase().replace(/-/g, '_'),
        onclick: "$('#commandEditor_iconFile').val('" + currentIcon.replace(".svg", "") + "'); saveCommandIcon() ;",
        title: currentIcon,
        width: "40px",
        height: "40px",
      }));
    }
  }


}








async function callAfterLoading() {

  await window.history.pushState('FreeCAD', 'FreeCAD', '?autoconnect=true&reconnect=true&reconnect_delay=5000&resize=remote&path=' + window.location.pathname);



  await $("#application").load('./vnc.html', function(responseTxt, statusTxt, xhr) {

    $("#noVNC_control_bar_anchor").hide();
    $("#noVNC_container").css('border-bottom-right-radius', 0);
    $("body").css('background-color', "white");



    setResolution();

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
    alert("No user settings present. Loading from settings file on server");
    console.log("No user settings present. Loading from settings file on server");
    toolbarGlobalObject = await $.get('./settings.json');
  }

  //loadIconPalletForSettings();

  showCommads();
  activeWorkbench = "";
  loadWorkbenches();
  getCurrentWorkbench();
  buildToolGroupPalletDivs();

  window.setInterval(function() {
    document.title = "FreeCAD Cloud by mmiscool";

    getCurrentWorkbench();
    $("#noVNC_fallback_error").hide();

  }, 1000);


  window.setInterval(async function() {
    //alert($('#currentWorkbench').has('option').length);
    if ($('#currentWorkbench').has('option').length < 0) await loadWorkbenches();
  }, 10000);



}

async function setResolution() {
  yyy = parseInt($("#application").height()) - 1;
  xxx = parseInt($("#application").width()) - 1;
  await $.get('./res/' + '~xrandr --fb ' + xxx + 'x' + yyy);
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
    bla = await $.get('./cmd/' + commandToDo);
    //alert(bla);
    if (bla.toUpperCase().indexOf("ERROR") > -1) alert(bla);
  }

  getCurrentWorkbench();
}




async function loadWorkbenches() {

    bla = await $.get('./cmd/listWorkbenches');




  excludeWorkbenches = [
    "NoneWorkbench",
    "ArchWorkbench",
    "CompleteWorkbench",
    "DrawingWorkbench",
    "ImageWorkbench",
    "InspectionWorkbench",
    "OpenSCADWorkbench",
    "PathWorkbench",
    "PlotWorkbench",
    "PointsWorkbench",
    "RaytracingWorkbench",
    "ReverseEngineeringWorkbench",
    "RobotWorkbench",
    "ShipWorkbench",
    "SurfaceWorkbench",
    "TechDrawWorkbench",
    "TestWorkbench",
    "WebWorkbench",
    "StartWorkbench",
  ];





  $('#currentWorkbench').empty();
  avaiableWorkbenches = [];

  blabla = bla.split("'");
  blabla.sort();
  for (i = 0; i < blabla.length; i++) {
    if (blabla[i].indexOf("{") == -1 & blabla[i].indexOf(">") == -1) {
      blabla[i] = blabla[i].trim();
      avaiableWorkbenches.push(blabla[i]);
      if (!excludeWorkbenches.includes(blabla[i])) {
        $('#currentWorkbench').append('<option value="' + blabla[i] + '">' + blabla[i] + '</option>');
      }

    }

  }

  console.log(JSON.stringify(avaiableWorkbenches));

  activeWorkbench = await $.get('./cmd/activeWorkbench');

  $("#currentWorkbench").val(activeWorkbench)
}



async function getCurrentWorkbench() {
  ActuallyCurrentActiveWorkbench = activeWorkbench;
  workbenchAndIconDataFromCad = JSON.parse(await $.get('./cmd/activeWorkbench'));



  if (workbenchAndIconDataFromCad.currentWorkbenchName !== undefined) {
    activeWorkbench = workbenchAndIconDataFromCad.currentWorkbenchName;

  }

  if (ActuallyCurrentActiveWorkbench != activeWorkbench) {
    $("#currentWorkbench").val(activeWorkbench);
    buildToolGroupPalletDivs();
  }

  if($("#currentWorkbench").val() != activeWorkbench) $("#currentWorkbench").val(activeWorkbench);



  $('#commandIcons').find('img').addClass('toolIconDisabled');





  for (i = 0; i < workbenchAndIconDataFromCad.toolIcons.length; i++) {
    if (workbenchAndIconDataFromCad.toolIcons[i].indexOf("&") == -1) {
      $('#commandIcon_' + workbenchAndIconDataFromCad.toolIcons[i]).removeClass('toolIconDisabled');
      $('#commandIcons').find('img').addClass('toolIcon');
    }
  }





  // 'commandIcon_' 


}


activeWorkbench = "";

async function setActiveWorkbench(workbenchToActivate) {

  bla = await $.get('./cmd/python Gui.activateWorkbench("' + workbenchToActivate + '")');
  activeWorkbench = workbenchToActivate;
  buildToolGroupPalletDivs();
}






async function showCommads() {
  $("#commands").empty();
  $("#commandIcons").empty();
  $('#commandsEditorList').empty();


  for (var i = 0; i < toolbarGlobalObject.commandList.length; i++) {
    
    if (toolbarGlobalObject.commandList[i].iconFile == "mouse_pointer") toolbarGlobalObject.commandList[i].iconFile = toolbarGlobalObject.commandList[i].command;

    toolbarGlobalObject.commandList[i].iconFile = toolbarGlobalObject.commandList[i].iconFile.toLowerCase().replace(/-/g, '_');
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