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