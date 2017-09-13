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

    var llMainMenu = document.querySelector(".ll-main-menu");
    llMainMenu.appendChild(createNodeUl(jsonObj, ul));

    getAllUlMainMenu();
}

function createNodeUl(jsonObj, ul){
    var elUl = document.createElement("ul");
    
    for(var i in jsonObj) {
        if (jsonObj.hasOwnProperty(i)) {
            if(typeof jsonObj[i].n === "undefined"){
                elUl.appendChild(createNodeLi(jsonObj[i].label, jsonObj[i].href, ""));
            }else{
                var ul = createNodeUl(jsonObj[i].n);
                elUl.appendChild(createNodeLi(jsonObj[i].label, jsonObj[i].href, ul));
            }
        }
        
    }

    return elUl;
}

function createNodeLi(label, href, ul){
    var elA = createElementAhref(label, href);
    var elLi = createElementLi(elA, ul);

    return elLi;
}

function createElementAhref(label, href){
    var elA = document.createElement("a");        
    var text = document.createTextNode(label);
    elA.appendChild(text);    
    elA.setAttribute('href', href);

    return elA;
}

function createElementLi(elA, ul){
    var elLi = document.createElement("li");
    elLi.appendChild(elA);
    if(ul !== ""){
        elLi.appendChild(ul);
    }
    
    return elLi;
}

function getAllUlMainMenu(){
    var allUlMainMenu = document.querySelectorAll('.ll-main-menu a');
    for (var i = 0; i < allUlMainMenu.length; i++) {
        allUlMainMenu[i].addEventListener('click', function (event) {
            event.preventDefault();
    
            console.log(event.target);
        });
    }
}

createMenu(jsonMenu);
