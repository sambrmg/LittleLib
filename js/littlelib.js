var jsonMenu = [
    { 
        "label": "item 1", 
        "href": " ",
        "n": [
            {
                "label":"subitem 1", 
                "href": "#",
                "n": [{
                    "label":"Google",
                    "href": "http://www.google.com.br"
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
    var llMainMenu = document.querySelector(".ll-main-menu");
    llMainMenu.appendChild(createNodeUl(jsonObj, ""));

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
        if( allUlMainMenu[i].nextSibling){
            allUlMainMenu[i].classList.add("icon-plus");
        }
        allUlMainMenu[i].addEventListener('click', function (event) {
            var el = event.target;
            var elHref = el.getAttribute('href').trim();

            if(elHref === "#" || 
                elHref == ""){
                event.preventDefault();
            }
            
            event.target.classList.toggle("icon-plus");
            event.target.classList.toggle("icon-minus")
            el.nextSibling.classList.toggle("open"); 
        });
    }
}

createMenu(jsonMenu);
