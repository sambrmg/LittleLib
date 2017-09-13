var jsonMenu = [
    { 
        "label": "item 1", 
        "href": "#",
        "n": [
            {
                "label":"subitem 1", 
                "href": "#",
                "n": [{
                    "label":"sub-subitem 1.1",
                    "href": "#"
                }]
            },{
                "label":"subitem 2", 
                "href": "#",
                "n": [{
                    "label":"sub-subitem 2.1",
                    "href": "#"
                },
                {
                    "label":"sub-subitem 2.2",
                    "href": "#"
                }]
            }
        ]
    },
    { "label": "item 2", "href": "#" },
    { "label": "item 3", "href": "#" },
    { "label": "item 4", "href": "#" },
    { "label": "item 5", "href": "#" },
    { "label": "item 6", "href": "#" },
    { "label": "item 7", "href": "#", "n": [
        {
            "label":"subitem 1", 
            "href": "#",
            "n": [{
                "label":"sub-subitem 1.1",
                "href": "#"
            }]
        },{
            "label":"subitem 2", 
            "href": "#",
            "n": [{
                "label":"sub-subitem 2.1",
                "href": "#"
            },
            {
                "label":"sub-subitem 2.2",
                "href": "#"
            }]
        }
    ]},
    { "label": "item 8", "href": "#" },
    { "label": "item 9", "href": "#" }
];

function createMenu(jsonObj){
    var ul = "";
    document.querySelector(".ll-main-menu").innerHTML = createNodeUl(jsonObj, ul);
}

function createNodeUl(jsonObj, ul){
    var elUl = "";
    for(var i in jsonObj) {
        if (jsonObj.hasOwnProperty(i)) {
            if(typeof jsonObj[i].n === "undefined"){
                elUl = elUl + createNodeLi(jsonObj[i].label, jsonObj[i].href, "");
            }else{
                var ul = createNodeUl(jsonObj[i].n);
                elUl = elUl + createNodeLi(jsonObj[i].label, jsonObj[i].href, ul);
            }
        }
        
    }
    return createElementUl(elUl);
}

function createNodeLi(label, href, ul){
    var elA = createElementAhref(label, href);
    var elLi = createElementLi(elA, ul);
    return elLi;
}

function createElementAhref(label, href){
    return "<a href="+href+" >"+label+"</a>";
}

function createElementLi(elA, ul){
    return "<li>"+elA+ul+"</li>";
}

function createElementUl(listOfLi){
    return "<ul>"+listOfLi+"</ul>";
}

createMenu(jsonMenu);
