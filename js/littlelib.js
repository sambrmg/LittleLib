var jsonMenu = {
            1: { "label": "item 1", "href": "" },
            2: { "label": "item 2", "href": "" },
            3: { "label": "item 3", "href": "" },
            4: { "label": "item 4", "href": "" },
            5: { "label": "item 5", "href": "" },
            6: { "label": "item 6", "href": "" },
            7: { "label": "item 7", "href": "" },
            8: { "label": "item 8", "href": "" },
            9: { "label": "item 9", "href": "" }
    };

var llMainMenu = document.querySelector(".ll-main-menu ul");

function llAddLiToUl(jsonMenu, llMainMenu){
    for(var i in jsonMenu) { 
        if (jsonMenu.hasOwnProperty(i)) {
            var li = document.createElement("li");  
            var a = document.createElement("a");  
            var text  = document.createTextNode(jsonMenu[i].label);
            a.appendChild(text);
            li.appendChild(a);

            llMainMenu.appendChild(li);
        }
     }
}
llAddLiToUl(jsonMenu, llMainMenu);