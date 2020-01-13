{"filter":false,"title":"FC-APP.js","tooltip":"/FC-APP.js","undoManager":{"mark":100,"position":100,"stack":[[{"start":{"row":237,"column":8},"end":{"row":237,"column":20},"action":"insert","lines":["widthOfIcons"],"id":208}],[{"start":{"row":237,"column":8},"end":{"row":237,"column":20},"action":"remove","lines":["widthOfIcons"],"id":209},{"start":{"row":237,"column":8},"end":{"row":237,"column":40},"action":"insert","lines":["toolbarGlobalObject.widthOfIcons"]}],[{"start":{"row":237,"column":40},"end":{"row":237,"column":41},"action":"insert","lines":[" "],"id":210},{"start":{"row":237,"column":41},"end":{"row":237,"column":42},"action":"insert","lines":[">"]}],[{"start":{"row":237,"column":42},"end":{"row":237,"column":43},"action":"insert","lines":[" "],"id":211},{"start":{"row":237,"column":43},"end":{"row":237,"column":44},"action":"insert","lines":["1"]}],[{"start":{"row":237,"column":44},"end":{"row":237,"column":45},"action":"insert","lines":["0"],"id":212}],[{"start":{"row":237,"column":46},"end":{"row":237,"column":47},"action":"insert","lines":[" "],"id":213}],[{"start":{"row":237,"column":47},"end":{"row":237,"column":79},"action":"insert","lines":["toolbarGlobalObject.widthOfIcons"],"id":214}],[{"start":{"row":237,"column":79},"end":{"row":237,"column":80},"action":"insert","lines":[" "],"id":215},{"start":{"row":237,"column":80},"end":{"row":237,"column":81},"action":"insert","lines":["="]}],[{"start":{"row":237,"column":81},"end":{"row":237,"column":82},"action":"insert","lines":[" "],"id":216},{"start":{"row":237,"column":82},"end":{"row":237,"column":83},"action":"insert","lines":["4"]},{"start":{"row":237,"column":83},"end":{"row":237,"column":84},"action":"insert","lines":["0"]}],[{"start":{"row":238,"column":0},"end":{"row":238,"column":22},"action":"remove","lines":["    widthOfIcons = 30;"],"id":217}],[{"start":{"row":237,"column":84},"end":{"row":237,"column":85},"action":"insert","lines":[";"],"id":218}],[{"start":{"row":236,"column":0},"end":{"row":236,"column":52},"action":"remove","lines":["    widthOfIcons = toolbarGlobalObject.widthOfIcons;"],"id":219}],[{"start":{"row":237,"column":85},"end":{"row":238,"column":0},"action":"insert","lines":["",""],"id":220},{"start":{"row":238,"column":0},"end":{"row":238,"column":4},"action":"insert","lines":["    "]}],[{"start":{"row":238,"column":4},"end":{"row":238,"column":56},"action":"insert","lines":["    widthOfIcons = toolbarGlobalObject.widthOfIcons;"],"id":221}],[{"start":{"row":238,"column":6},"end":{"row":238,"column":8},"action":"remove","lines":["  "],"id":222},{"start":{"row":238,"column":4},"end":{"row":238,"column":6},"action":"remove","lines":["  "]}],[{"start":{"row":201,"column":46},"end":{"row":202,"column":0},"action":"insert","lines":["",""],"id":223},{"start":{"row":202,"column":0},"end":{"row":202,"column":2},"action":"insert","lines":["  "]},{"start":{"row":202,"column":2},"end":{"row":203,"column":0},"action":"insert","lines":["",""]},{"start":{"row":203,"column":0},"end":{"row":203,"column":2},"action":"insert","lines":["  "]},{"start":{"row":203,"column":2},"end":{"row":204,"column":0},"action":"insert","lines":["",""]},{"start":{"row":204,"column":0},"end":{"row":204,"column":2},"action":"insert","lines":["  "]},{"start":{"row":204,"column":2},"end":{"row":205,"column":0},"action":"insert","lines":["",""]},{"start":{"row":205,"column":0},"end":{"row":205,"column":2},"action":"insert","lines":["  "]},{"start":{"row":205,"column":2},"end":{"row":206,"column":0},"action":"insert","lines":["",""]},{"start":{"row":206,"column":0},"end":{"row":206,"column":2},"action":"insert","lines":["  "]},{"start":{"row":206,"column":2},"end":{"row":207,"column":0},"action":"insert","lines":["",""]},{"start":{"row":207,"column":0},"end":{"row":207,"column":2},"action":"insert","lines":["  "]},{"start":{"row":207,"column":2},"end":{"row":208,"column":0},"action":"insert","lines":["",""]},{"start":{"row":208,"column":0},"end":{"row":208,"column":2},"action":"insert","lines":["  "]}],[{"start":{"row":206,"column":2},"end":{"row":225,"column":46},"action":"insert","lines":["  newButtonStuff = {","    onclick: `","\t\t\t\t\t\t\t\toutput = JSON.stringify(toolbarGlobalObject);","\t\t\t\t\t\t\t\t","\t\t\t\t\t\t\t\tvar a = window.document.createElement('a');","\t\t\t\t\t\t\t\ta.href = window.URL.createObjectURL(new Blob([output], {type: 'text/json'}));","\t\t\t\t\t\t\t\ta.download = 'settings.json';","\t\t\t\t\t\t\t\t","\t\t\t\t\t\t\t\t// Append anchor to body.","\t\t\t\t\t\t\t\tdocument.body.appendChild(a);","\t\t\t\t\t\t\t\ta.click();","\t\t\t\t\t\t\t\t","\t\t\t\t\t\t\t\t// Remove anchor from body","\t\t\t\t\t\t\t\tdocument.body.removeChild(a);","\t\t\t\t\t\t\t`,","    text: \"Save Toolbar configuration\",","  };","  $('#toolBarRightClickMenue').append($('<button>', newButtonStuff));","","  $('#toolBarRightClickMenue').append(\"<br>\");"],"id":224}],[{"start":{"row":208,"column":0},"end":{"row":219,"column":37},"action":"remove","lines":["\t\t\t\t\t\t\t\toutput = JSON.stringify(toolbarGlobalObject);","\t\t\t\t\t\t\t\t","\t\t\t\t\t\t\t\tvar a = window.document.createElement('a');","\t\t\t\t\t\t\t\ta.href = window.URL.createObjectURL(new Blob([output], {type: 'text/json'}));","\t\t\t\t\t\t\t\ta.download = 'settings.json';","\t\t\t\t\t\t\t\t","\t\t\t\t\t\t\t\t// Append anchor to body.","\t\t\t\t\t\t\t\tdocument.body.appendChild(a);","\t\t\t\t\t\t\t\ta.click();","\t\t\t\t\t\t\t\t","\t\t\t\t\t\t\t\t// Remove anchor from body","\t\t\t\t\t\t\t\tdocument.body.removeChild(a);"],"id":225},{"start":{"row":208,"column":0},"end":{"row":208,"column":1},"action":"insert","lines":["]"]}],[{"start":{"row":208,"column":0},"end":{"row":208,"column":1},"action":"remove","lines":["]"],"id":226}],[{"start":{"row":208,"column":0},"end":{"row":208,"column":2},"action":"insert","lines":["  "],"id":227}],[{"start":{"row":208,"column":2},"end":{"row":208,"column":3},"action":"insert","lines":["p"],"id":228},{"start":{"row":208,"column":3},"end":{"row":208,"column":4},"action":"insert","lines":["r"]},{"start":{"row":208,"column":4},"end":{"row":208,"column":5},"action":"insert","lines":["o"]},{"start":{"row":208,"column":5},"end":{"row":208,"column":6},"action":"insert","lines":["m"]},{"start":{"row":208,"column":6},"end":{"row":208,"column":7},"action":"insert","lines":["p"]},{"start":{"row":208,"column":7},"end":{"row":208,"column":8},"action":"insert","lines":["t"]}],[{"start":{"row":208,"column":8},"end":{"row":208,"column":10},"action":"insert","lines":["()"],"id":229}],[{"start":{"row":208,"column":9},"end":{"row":208,"column":10},"action":"insert","lines":["\""],"id":230},{"start":{"row":208,"column":10},"end":{"row":208,"column":11},"action":"insert","lines":["t"]},{"start":{"row":208,"column":11},"end":{"row":208,"column":12},"action":"insert","lines":["o"]},{"start":{"row":208,"column":12},"end":{"row":208,"column":13},"action":"insert","lines":["o"]}],[{"start":{"row":208,"column":13},"end":{"row":208,"column":14},"action":"insert","lines":["l"],"id":231},{"start":{"row":208,"column":14},"end":{"row":208,"column":15},"action":"insert","lines":["b"]},{"start":{"row":208,"column":15},"end":{"row":208,"column":16},"action":"insert","lines":["a"]},{"start":{"row":208,"column":16},"end":{"row":208,"column":17},"action":"insert","lines":["r"]}],[{"start":{"row":208,"column":17},"end":{"row":208,"column":18},"action":"insert","lines":[" "],"id":232},{"start":{"row":208,"column":18},"end":{"row":208,"column":19},"action":"insert","lines":["i"]},{"start":{"row":208,"column":19},"end":{"row":208,"column":20},"action":"insert","lines":["d"]},{"start":{"row":208,"column":20},"end":{"row":208,"column":21},"action":"insert","lines":["o"]}],[{"start":{"row":208,"column":20},"end":{"row":208,"column":21},"action":"remove","lines":["o"],"id":233},{"start":{"row":208,"column":19},"end":{"row":208,"column":20},"action":"remove","lines":["d"]}],[{"start":{"row":208,"column":19},"end":{"row":208,"column":20},"action":"insert","lines":["c"],"id":234},{"start":{"row":208,"column":20},"end":{"row":208,"column":21},"action":"insert","lines":["o"]},{"start":{"row":208,"column":21},"end":{"row":208,"column":22},"action":"insert","lines":["n"]}],[{"start":{"row":208,"column":22},"end":{"row":208,"column":23},"action":"insert","lines":[" "],"id":235},{"start":{"row":208,"column":23},"end":{"row":208,"column":24},"action":"insert","lines":["s"]},{"start":{"row":208,"column":24},"end":{"row":208,"column":25},"action":"insert","lines":["i"]},{"start":{"row":208,"column":25},"end":{"row":208,"column":26},"action":"insert","lines":["z"]},{"start":{"row":208,"column":26},"end":{"row":208,"column":27},"action":"insert","lines":["e"]}],[{"start":{"row":208,"column":27},"end":{"row":208,"column":28},"action":"insert","lines":[" "],"id":236},{"start":{"row":208,"column":28},"end":{"row":208,"column":29},"action":"insert","lines":["i"]},{"start":{"row":208,"column":29},"end":{"row":208,"column":30},"action":"insert","lines":["n"]}],[{"start":{"row":208,"column":30},"end":{"row":208,"column":31},"action":"insert","lines":[" "],"id":237},{"start":{"row":208,"column":31},"end":{"row":208,"column":32},"action":"insert","lines":["p"]},{"start":{"row":208,"column":32},"end":{"row":208,"column":33},"action":"insert","lines":["i"]}],[{"start":{"row":208,"column":33},"end":{"row":208,"column":34},"action":"insert","lines":["x"],"id":238},{"start":{"row":208,"column":34},"end":{"row":208,"column":35},"action":"insert","lines":["e"]},{"start":{"row":208,"column":35},"end":{"row":208,"column":36},"action":"insert","lines":["l"]},{"start":{"row":208,"column":36},"end":{"row":208,"column":37},"action":"insert","lines":["s"]}],[{"start":{"row":208,"column":37},"end":{"row":208,"column":38},"action":"insert","lines":["\""],"id":239}],[{"start":{"row":208,"column":38},"end":{"row":208,"column":39},"action":"insert","lines":[","],"id":240}],[{"start":{"row":208,"column":39},"end":{"row":208,"column":40},"action":"insert","lines":[" "],"id":241}],[{"start":{"row":208,"column":40},"end":{"row":208,"column":72},"action":"insert","lines":["toolbarGlobalObject.widthOfIcons"],"id":242}],[{"start":{"row":208,"column":2},"end":{"row":208,"column":34},"action":"insert","lines":["toolbarGlobalObject.widthOfIcons"],"id":243}],[{"start":{"row":208,"column":34},"end":{"row":208,"column":35},"action":"insert","lines":[" "],"id":244},{"start":{"row":208,"column":35},"end":{"row":208,"column":36},"action":"insert","lines":["="]}],[{"start":{"row":208,"column":36},"end":{"row":208,"column":37},"action":"insert","lines":[" "],"id":245}],[{"start":{"row":208,"column":108},"end":{"row":208,"column":109},"action":"insert","lines":[";"],"id":246}],[{"start":{"row":208,"column":109},"end":{"row":209,"column":0},"action":"insert","lines":["",""],"id":247},{"start":{"row":209,"column":0},"end":{"row":209,"column":2},"action":"insert","lines":["  "]}],[{"start":{"row":209,"column":2},"end":{"row":209,"column":29},"action":"insert","lines":["buildToolGroupPalletDivs();"],"id":248}],[{"start":{"row":208,"column":0},"end":{"row":208,"column":2},"action":"insert","lines":["  "],"id":249},{"start":{"row":209,"column":0},"end":{"row":209,"column":2},"action":"insert","lines":["  "]}],[{"start":{"row":208,"column":0},"end":{"row":208,"column":2},"action":"insert","lines":["  "],"id":250},{"start":{"row":209,"column":0},"end":{"row":209,"column":2},"action":"insert","lines":["  "]}],[{"start":{"row":208,"column":0},"end":{"row":208,"column":2},"action":"insert","lines":["  "],"id":251},{"start":{"row":209,"column":0},"end":{"row":209,"column":2},"action":"insert","lines":["  "]}],[{"start":{"row":208,"column":0},"end":{"row":208,"column":2},"action":"insert","lines":["  "],"id":252},{"start":{"row":209,"column":0},"end":{"row":209,"column":2},"action":"insert","lines":["  "]}],[{"start":{"row":208,"column":0},"end":{"row":208,"column":2},"action":"insert","lines":["  "],"id":253},{"start":{"row":209,"column":0},"end":{"row":209,"column":2},"action":"insert","lines":["  "]}],[{"start":{"row":208,"column":0},"end":{"row":208,"column":2},"action":"insert","lines":["  "],"id":254},{"start":{"row":209,"column":0},"end":{"row":209,"column":2},"action":"insert","lines":["  "]}],[{"start":{"row":253,"column":0},"end":{"row":254,"column":52},"action":"remove","lines":["    if (toolbarGlobalObject.widthOfIcons > 10) toolbarGlobalObject.widthOfIcons = 40;","    widthOfIcons = toolbarGlobalObject.widthOfIcons;"],"id":255}],[{"start":{"row":252,"column":0},"end":{"row":253,"column":0},"action":"remove","lines":["",""],"id":256},{"start":{"row":251,"column":0},"end":{"row":252,"column":0},"action":"remove","lines":["",""]}],[{"start":{"row":244,"column":0},"end":{"row":245,"column":0},"action":"insert","lines":["",""],"id":257},{"start":{"row":245,"column":0},"end":{"row":246,"column":0},"action":"insert","lines":["",""]},{"start":{"row":246,"column":0},"end":{"row":247,"column":0},"action":"insert","lines":["",""]}],[{"start":{"row":245,"column":0},"end":{"row":246,"column":52},"action":"insert","lines":["    if (toolbarGlobalObject.widthOfIcons > 10) toolbarGlobalObject.widthOfIcons = 40;","    widthOfIcons = toolbarGlobalObject.widthOfIcons;"],"id":258}],[{"start":{"row":245,"column":0},"end":{"row":245,"column":2},"action":"remove","lines":["  "],"id":259},{"start":{"row":246,"column":0},"end":{"row":246,"column":2},"action":"remove","lines":["  "]}],[{"start":{"row":245,"column":39},"end":{"row":245,"column":40},"action":"remove","lines":[">"],"id":260},{"start":{"row":245,"column":39},"end":{"row":245,"column":40},"action":"insert","lines":["<"]}],[{"start":{"row":202,"column":0},"end":{"row":215,"column":46},"action":"remove","lines":["  ","  ","  ","  ","    newButtonStuff = {","    onclick: `","              toolbarGlobalObject.widthOfIcons = prompt(\"toolbar icon size in pixels\", toolbarGlobalObject.widthOfIcons);","              buildToolGroupPalletDivs();","\t\t\t\t\t\t\t`,","    text: \"Save Toolbar configuration\",","  };","  $('#toolBarRightClickMenue').append($('<button>', newButtonStuff));","","  $('#toolBarRightClickMenue').append(\"<br>\");"],"id":261}],[{"start":{"row":179,"column":0},"end":{"row":192,"column":46},"action":"insert","lines":["  ","  ","  ","  ","    newButtonStuff = {","    onclick: `","              toolbarGlobalObject.widthOfIcons = prompt(\"toolbar icon size in pixels\", toolbarGlobalObject.widthOfIcons);","              buildToolGroupPalletDivs();","\t\t\t\t\t\t\t`,","    text: \"Save Toolbar configuration\",","  };","  $('#toolBarRightClickMenue').append($('<button>', newButtonStuff));","","  $('#toolBarRightClickMenue').append(\"<br>\");"],"id":262}],[{"start":{"row":188,"column":11},"end":{"row":188,"column":37},"action":"remove","lines":["Save Toolbar configuration"],"id":263}],[{"start":{"row":188,"column":11},"end":{"row":188,"column":12},"action":"insert","lines":["S"],"id":264},{"start":{"row":188,"column":12},"end":{"row":188,"column":13},"action":"insert","lines":["a"]},{"start":{"row":188,"column":13},"end":{"row":188,"column":14},"action":"insert","lines":["\\"]},{"start":{"row":188,"column":14},"end":{"row":188,"column":15},"action":"insert","lines":["\\"]},{"start":{"row":188,"column":15},"end":{"row":188,"column":16},"action":"insert","lines":["\\"]}],[{"start":{"row":188,"column":15},"end":{"row":188,"column":16},"action":"remove","lines":["\\"],"id":265},{"start":{"row":188,"column":14},"end":{"row":188,"column":15},"action":"remove","lines":["\\"]},{"start":{"row":188,"column":13},"end":{"row":188,"column":14},"action":"remove","lines":["\\"]}],[{"start":{"row":188,"column":13},"end":{"row":188,"column":14},"action":"insert","lines":["v"],"id":266},{"start":{"row":188,"column":14},"end":{"row":188,"column":15},"action":"insert","lines":["e"]}],[{"start":{"row":188,"column":15},"end":{"row":188,"column":16},"action":"insert","lines":[" "],"id":267}],[{"start":{"row":188,"column":16},"end":{"row":188,"column":17},"action":"insert","lines":["]"],"id":268},{"start":{"row":188,"column":17},"end":{"row":188,"column":18},"action":"insert","lines":["]"]}],[{"start":{"row":188,"column":17},"end":{"row":188,"column":18},"action":"remove","lines":["]"],"id":269},{"start":{"row":188,"column":16},"end":{"row":188,"column":17},"action":"remove","lines":["]"]},{"start":{"row":188,"column":15},"end":{"row":188,"column":16},"action":"remove","lines":[" "]},{"start":{"row":188,"column":14},"end":{"row":188,"column":15},"action":"remove","lines":["e"]},{"start":{"row":188,"column":13},"end":{"row":188,"column":14},"action":"remove","lines":["v"]},{"start":{"row":188,"column":12},"end":{"row":188,"column":13},"action":"remove","lines":["a"]},{"start":{"row":188,"column":11},"end":{"row":188,"column":12},"action":"remove","lines":["S"]}],[{"start":{"row":188,"column":11},"end":{"row":188,"column":12},"action":"insert","lines":["S"],"id":270},{"start":{"row":188,"column":12},"end":{"row":188,"column":13},"action":"insert","lines":["e"]},{"start":{"row":188,"column":13},"end":{"row":188,"column":14},"action":"insert","lines":["t"]}],[{"start":{"row":188,"column":14},"end":{"row":188,"column":15},"action":"insert","lines":[" "],"id":271},{"start":{"row":188,"column":15},"end":{"row":188,"column":16},"action":"insert","lines":["I"]}],[{"start":{"row":188,"column":15},"end":{"row":188,"column":16},"action":"remove","lines":["I"],"id":272}],[{"start":{"row":188,"column":15},"end":{"row":188,"column":16},"action":"insert","lines":["i"],"id":273},{"start":{"row":188,"column":16},"end":{"row":188,"column":17},"action":"insert","lines":["c"]},{"start":{"row":188,"column":17},"end":{"row":188,"column":18},"action":"insert","lines":["o"]},{"start":{"row":188,"column":18},"end":{"row":188,"column":19},"action":"insert","lines":["n"]}],[{"start":{"row":188,"column":19},"end":{"row":188,"column":20},"action":"insert","lines":[" "],"id":274},{"start":{"row":188,"column":20},"end":{"row":188,"column":21},"action":"insert","lines":["s"]},{"start":{"row":188,"column":21},"end":{"row":188,"column":22},"action":"insert","lines":["i"]},{"start":{"row":188,"column":22},"end":{"row":188,"column":23},"action":"insert","lines":["z"]}],[{"start":{"row":188,"column":23},"end":{"row":188,"column":24},"action":"insert","lines":["e"],"id":275}],[{"start":{"row":18,"column":0},"end":{"row":19,"column":0},"action":"insert","lines":["",""],"id":276},{"start":{"row":19,"column":0},"end":{"row":20,"column":0},"action":"insert","lines":["",""]}],[{"start":{"row":18,"column":0},"end":{"row":19,"column":0},"action":"insert","lines":["",""],"id":277}],[{"start":{"row":19,"column":0},"end":{"row":20,"column":41},"action":"insert","lines":["var scr = $('#box')[0].scrollHeight;","$('#box').animate({scrollTop: scr},2000);"],"id":278}],[{"start":{"row":19,"column":13},"end":{"row":19,"column":17},"action":"remove","lines":["#box"],"id":279},{"start":{"row":19,"column":13},"end":{"row":19,"column":37},"action":"insert","lines":["#pythonCodeResponseAreaA"]}],[{"start":{"row":20,"column":3},"end":{"row":20,"column":7},"action":"remove","lines":["#box"],"id":280},{"start":{"row":20,"column":3},"end":{"row":20,"column":27},"action":"insert","lines":["#pythonCodeResponseAreaA"]}],[{"start":{"row":24,"column":0},"end":{"row":24,"column":101},"action":"remove","lines":["  $('#pythonCodeResponseAreaB').animate({ scrollTop: $('#pythonCodeResponseAreaB').scrollHeight }, );"],"id":281},{"start":{"row":24,"column":0},"end":{"row":25,"column":61},"action":"insert","lines":["var scr = $('#pythonCodeResponseAreaA')[0].scrollHeight;","$('#pythonCodeResponseAreaA').animate({scrollTop: scr},2000);"]}],[{"start":{"row":24,"column":36},"end":{"row":24,"column":37},"action":"remove","lines":["A"],"id":282},{"start":{"row":24,"column":36},"end":{"row":24,"column":37},"action":"insert","lines":["B"]}],[{"start":{"row":25,"column":26},"end":{"row":25,"column":27},"action":"remove","lines":["A"],"id":283},{"start":{"row":25,"column":26},"end":{"row":25,"column":27},"action":"insert","lines":["B"]}],[{"start":{"row":19,"column":0},"end":{"row":19,"column":2},"action":"insert","lines":["  "],"id":284},{"start":{"row":20,"column":0},"end":{"row":20,"column":2},"action":"insert","lines":["  "]},{"start":{"row":20,"column":41},"end":{"row":20,"column":42},"action":"insert","lines":[" "]},{"start":{"row":20,"column":56},"end":{"row":20,"column":57},"action":"insert","lines":[" "]},{"start":{"row":20,"column":59},"end":{"row":20,"column":60},"action":"insert","lines":[" "]},{"start":{"row":24,"column":0},"end":{"row":24,"column":2},"action":"insert","lines":["  "]},{"start":{"row":25,"column":0},"end":{"row":25,"column":2},"action":"insert","lines":["  "]},{"start":{"row":25,"column":41},"end":{"row":25,"column":42},"action":"insert","lines":[" "]},{"start":{"row":25,"column":56},"end":{"row":25,"column":57},"action":"insert","lines":[" "]},{"start":{"row":25,"column":59},"end":{"row":25,"column":60},"action":"insert","lines":[" "]},{"start":{"row":184,"column":0},"end":{"row":184,"column":2},"action":"remove","lines":["  "]},{"start":{"row":185,"column":0},"end":{"row":185,"column":2},"action":"remove","lines":["  "]},{"start":{"row":186,"column":0},"end":{"row":186,"column":2},"action":"remove","lines":["  "]},{"start":{"row":187,"column":0},"end":{"row":187,"column":2},"action":"remove","lines":["  "]},{"start":{"row":188,"column":0},"end":{"row":188,"column":2},"action":"remove","lines":["  "]},{"start":{"row":221,"column":0},"end":{"row":221,"column":2},"action":"remove","lines":["  "]},{"start":{"row":222,"column":0},"end":{"row":222,"column":2},"action":"remove","lines":["  "]},{"start":{"row":264,"column":108},"end":{"row":264,"column":109},"action":"insert","lines":[" "]}],[{"start":{"row":16,"column":101},"end":{"row":16,"column":102},"action":"insert","lines":["2"],"id":285},{"start":{"row":16,"column":102},"end":{"row":16,"column":103},"action":"insert","lines":["0"]},{"start":{"row":16,"column":103},"end":{"row":16,"column":104},"action":"insert","lines":["0"]},{"start":{"row":16,"column":104},"end":{"row":16,"column":105},"action":"insert","lines":["0"]}],[{"start":{"row":23,"column":72},"end":{"row":24,"column":0},"action":"insert","lines":["",""],"id":286},{"start":{"row":24,"column":0},"end":{"row":24,"column":2},"action":"insert","lines":["  "]}],[{"start":{"row":24,"column":2},"end":{"row":24,"column":105},"action":"insert","lines":["$('#pythonCodeResponseAreaA').animate({ scrollTop: $('#pythonCodeResponseAreaA').scrollHeight }, 2000);"],"id":287}],[{"start":{"row":24,"column":79},"end":{"row":24,"column":80},"action":"remove","lines":["A"],"id":288},{"start":{"row":24,"column":79},"end":{"row":24,"column":80},"action":"insert","lines":["B"]}],[{"start":{"row":24,"column":28},"end":{"row":24,"column":29},"action":"remove","lines":["A"],"id":289},{"start":{"row":24,"column":28},"end":{"row":24,"column":29},"action":"insert","lines":["B"]}],[{"start":{"row":24,"column":82},"end":{"row":24,"column":84},"action":"insert","lines":["[]"],"id":290}],[{"start":{"row":24,"column":83},"end":{"row":24,"column":84},"action":"insert","lines":["0"],"id":291}],[{"start":{"row":16,"column":84},"end":{"row":16,"column":86},"action":"insert","lines":["[]"],"id":292}],[{"start":{"row":16,"column":85},"end":{"row":16,"column":86},"action":"insert","lines":["0"],"id":293}],[{"start":{"row":25,"column":2},"end":{"row":25,"column":5},"action":"insert","lines":["// "],"id":294},{"start":{"row":26,"column":2},"end":{"row":26,"column":5},"action":"insert","lines":["// "]}],[{"start":{"row":19,"column":2},"end":{"row":19,"column":5},"action":"insert","lines":["// "],"id":295},{"start":{"row":20,"column":2},"end":{"row":20,"column":5},"action":"insert","lines":["// "]}],[{"start":{"row":25,"column":0},"end":{"row":26,"column":69},"action":"remove","lines":["  // var scr = $('#pythonCodeResponseAreaB')[0].scrollHeight;","  // $('#pythonCodeResponseAreaB').animate({ scrollTop: scr }, 2000);"],"id":296}],[{"start":{"row":19,"column":0},"end":{"row":20,"column":69},"action":"remove","lines":["  // var scr = $('#pythonCodeResponseAreaA')[0].scrollHeight;","  // $('#pythonCodeResponseAreaA').animate({ scrollTop: scr }, 2000);"],"id":297},{"start":{"row":18,"column":0},"end":{"row":19,"column":0},"action":"remove","lines":["",""]}],[{"start":{"row":16,"column":107},"end":{"row":16,"column":108},"action":"remove","lines":["0"],"id":298}],[{"start":{"row":22,"column":105},"end":{"row":22,"column":106},"action":"remove","lines":["0"],"id":299}],[{"start":{"row":21,"column":64},"end":{"row":21,"column":65},"action":"insert","lines":["1"],"id":300}],[{"start":{"row":23,"column":0},"end":{"row":24,"column":0},"action":"insert","lines":["",""],"id":301},{"start":{"row":24,"column":0},"end":{"row":25,"column":0},"action":"insert","lines":["",""]}],[{"start":{"row":24,"column":0},"end":{"row":25,"column":107},"action":"insert","lines":["  $('#pythonCodeResponseAreaB').html(await $.get(\"./files/FC-log1.txt\"));","  $('#pythonCodeResponseAreaB').animate({ scrollTop: $('#pythonCodeResponseAreaB')[0].scrollHeight }, 200);"],"id":302}],[{"start":{"row":24,"column":64},"end":{"row":24,"column":65},"action":"remove","lines":["1"],"id":303},{"start":{"row":24,"column":64},"end":{"row":24,"column":65},"action":"insert","lines":["2"]}],[{"start":{"row":25,"column":79},"end":{"row":25,"column":80},"action":"remove","lines":["B"],"id":304},{"start":{"row":25,"column":79},"end":{"row":25,"column":80},"action":"insert","lines":["C"]}],[{"start":{"row":25,"column":28},"end":{"row":25,"column":29},"action":"remove","lines":["B"],"id":305},{"start":{"row":25,"column":28},"end":{"row":25,"column":29},"action":"insert","lines":["C"]}],[{"start":{"row":24,"column":28},"end":{"row":24,"column":29},"action":"remove","lines":["B"],"id":306},{"start":{"row":24,"column":28},"end":{"row":24,"column":29},"action":"insert","lines":["C"]}],[{"start":{"row":21,"column":66},"end":{"row":21,"column":69},"action":"remove","lines":["txt"],"id":307},{"start":{"row":21,"column":66},"end":{"row":21,"column":67},"action":"insert","lines":["l"]},{"start":{"row":21,"column":67},"end":{"row":21,"column":68},"action":"insert","lines":["o"]},{"start":{"row":21,"column":68},"end":{"row":21,"column":69},"action":"insert","lines":["g"]}],[{"start":{"row":24,"column":66},"end":{"row":24,"column":69},"action":"remove","lines":["txt"],"id":308},{"start":{"row":24,"column":66},"end":{"row":24,"column":67},"action":"insert","lines":["l"]},{"start":{"row":24,"column":67},"end":{"row":24,"column":68},"action":"insert","lines":["o"]},{"start":{"row":24,"column":68},"end":{"row":24,"column":69},"action":"insert","lines":["g"]}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":22,"column":61},"end":{"row":22,"column":61},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":47,"state":"start","mode":"ace/mode/javascript"}},"timestamp":1578880731460,"hash":"b446bf045d4f045fae917e8dcff875cb3735358a"}