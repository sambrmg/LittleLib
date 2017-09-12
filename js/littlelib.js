var jsonMenu = [
    { 
        "label": "item 1", 
        "href": "#",
        "n": {
                "label":"subitem 1", 
                "href": "#",
                "n": {
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
    var elUl = "";
    for(var i in obj) {
        if (typeof obj[i].n !== "undefined"){
            
        }
        if (obj.hasOwnProperty(i)) {
            var elA = createElementAhref(obj[i].label, obj[i].href);
            var elLi = createElementLi(elA);
            elUl = elUl + elLi;
        }
    }
    document.querySelector(".ll-main-menu").innerHTML = createElementUl(elUl);
}

function createElementAhref(label, href){
    return "<a href="+href+" >"+label+"</a>";
}

function createElementLi(elA){
    return "<li>"+elA+"</li>";
}

function createElementUl(listOfLi){
    return "<ul>"+listOfLi+"</ul>";
}

llAddLiToUl(jsonMenu);
