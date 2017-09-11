var jsonMenu = [
    { 
        "label": "item 1", 
        "href": "#",
        "n2": {
                "label":"subitem 1", 
                "href": "#",
                "n3": {
                    "label":"sub-subitem 1",
                    "href": "#"
                }
            } 
    },
    { "label": "item 2", "href": "#" },
    { "label": "item 3", "href": "#" },
    { "label": "item 4", "href": "#" },
    { "label": "item 5", "href": "#" },
    { "label": "item 6", "href": "#" },
    { "label": "item 7", "href": "#" },
    { "label": "item 8", "href": "#" },
    { "label": "item 9", "href": "#" }
];

function llAddLiToUl(obj){
    var llMainMenu = document.querySelector(".ll-main-menu ul");
    for(var i in obj) { 
        if (obj.hasOwnProperty(i)) {
            var li = document.createElement("li");  
            var a = document.createElement("a");  
            var text  = document.createTextNode(obj[i].label);
            a.appendChild(text);
            li.appendChild(a);
            console.log(a);
            console.log(li);
            llMainMenu.appendChild(li);
        }
     }
}
//llAddLiToUl(jsonMenu);
