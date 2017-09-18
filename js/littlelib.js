var jsonMenu = [
    { "label": "Amazon", "href": "http://www.amazon.com" },
    { "label": "Apple", "href": "#", "n": [
        {
            "label":"Mac", 
            "href": "#",
            "n": [{
                "label":"Macbook",
                "href": "https://www.apple.com/macbook/"
            },{
                "label":"iMac",
                "href": "https://www.apple.com/imac/"
            },{
                "label":"Mac Pro",
                "href": "https://www.apple.com/mac-pro/"
            }]
        },{
            "label":"iPhone", 
            "href": "#",
            "n": [{
                "label":"iPhone X",
                "href": "https://www.apple.com/iphone-x/"
            },
            {
                "label":"iPhone 8",
                "href": "https://www.apple.com/iphone-8/"
            }]
        }
    ]},
    { "label": "Asus", "href": "http://www.asus.com" },
    { "label": "Google", "href": "" , "n": [
        {
            "label":"Maps", 
            "href": "https://www.google.com.br/maps/"
        },{
            "label":"My Account", 
            "href": "#",
            "n": [{
                "label":"Security",
                "href": "https://myaccount.google.com/security"
            },
            {
                "label":"Privacy",
                "href": "https://myaccount.google.com/privacy"
            }]
        }
    ]},
    { "label": "Facebook", "href": "http://www.facebook.com" },
    { "label": "Microsoft", "href": "http://www.microsoft.com" },
];

var jsonObjMenu = [];
var hasOccurrence = false;

var options = {
    search: true,
    searchLabel: 'Search on menu'
};

function findInNodes(jsonObj, label){
    var newObj = [];
    for(var i in jsonObj) {
        var re = new RegExp(label, "i");
        var res = re.exec(jsonObj[i].label);
        this.hasOccurrence = false;
        if(typeof jsonObj[i].n !== "undefined"){
            findInNodesRecursive(jsonObj[i].n, label);
        }
        if(res !== null || this.hasOccurrence){
            newObj.push(jsonObj[i]);
        }
    }
    return newObj;
}

function findInNodesRecursive(jsonObj, label){
    
    for(var i in jsonObj) {
        
        if(typeof jsonObj[i].n !== "undefined"){
            findInNodesRecursive(jsonObj[i].n, label);
        }else{
            var re = new RegExp(label, "i");
            var res = re.exec(jsonObj[i].label);
            if(this.hasOccurrence == false){
                if(res !== null){
                    this.hasOccurrence = true;
                    return;
                }
            }
        }
    }
}

function createMenu(jsonObj, llMainMenu){
    llMainMenu.appendChild(createNodeUl(jsonObj, ""));
    addEventClickHref();
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

function addEventClickHref(){
    var allUlMainMenu = document.querySelectorAll('.ll-main-menu a');
    for (var i = 0; i < allUlMainMenu.length; i++) {
        if( allUlMainMenu[i].nextSibling){
            allUlMainMenu[i].classList.add("icon-plus");
        }
        allUlMainMenu[i].addEventListener('click', 
            function (event) {
            var el = event.target;
            var elHref = el.getAttribute('href').trim();
            if(elHref === "#" || 
                elHref == ""){
                event.preventDefault();
            }
            if( el.classList.contains("icon-plus") || 
                el.classList.contains("icon-minus") ){
                el.classList.toggle("icon-plus");
                el.classList.toggle("icon-minus");
            }
            el.nextSibling.classList.toggle("open"); 
        });
    }
}
function createSearch(llMainMenu){

    var elSection = document.createElement("section");
    var elForm = document.createElement("form");

    var elLabel = document.createElement("label");
    var textLabel = document.createTextNode(this.options.searchLabel);
    elLabel.appendChild(textLabel);

    var elInput = document.createElement("input");
    elInput.setAttribute('name', 'searchMenu');
    elInput.setAttribute('id', 'searchMenu');

    elForm.appendChild(elLabel);
    elForm.appendChild(elInput);
    
    elSection.appendChild(elForm);

    llMainMenu.appendChild(elSection);
}
function initMenu(jsonObjMenu, newOptions){
    //this.options = newOptions;
    var llMainMenu = document.querySelector(".ll-main-menu");

    this.jsonObjMenu = jsonObjMenu;

    if(this.options.search){
        createSearch(llMainMenu);
        document.querySelector("#searchMenu").addEventListener('keypress', 
        function (event) {
            if(event.keyCode == 13){
                event.preventDefault();
            }
        });
        document.querySelector("#searchMenu").addEventListener('keyup', 
        function (event) {
            if(event.target.value.trim().length > 0){
                var newObj = findInNodes(jsonObjMenu, event.target.value);
                clearAllUlMenu();
                createMenu(newObj, llMainMenu);
            }else{
                clearAllUlMenu();
                createMenu(jsonObjMenu, llMainMenu);
            }
        });
    }

    createMenu(jsonObjMenu, llMainMenu);
    
    
}
function clearAllUlMenu(){
    var llMainMenu = document.querySelector(".ll-main-menu");
    var ul = document.querySelector(".ll-main-menu ul");
    llMainMenu.removeChild(ul);
}

initMenu(jsonMenu);
