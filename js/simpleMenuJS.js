(function(){
    
    var hasOccurrence = false;

    this.simpleMenuJSOptions = {
        search: true,
        searchLabel: 'Search on menu',
        menuHorizontal: true
    };

    function findInNodes(jsonObj, label){
        var newObj = [];
        for(var i in jsonObj) {
            var re = new RegExp(label, "i");
            var res = re.exec(jsonObj[i].label);
            hasOccurrence = false;
            if(typeof jsonObj[i].n !== "undefined"){
                findInNodesRecursive(jsonObj[i].n, label);
            }
            if(res !== null || hasOccurrence){
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
                if(hasOccurrence == false){
                    if(res !== null){
                        hasOccurrence = true;
                        return;
                    }
                }
            }
        }
    }

    function createMenu(jsonObj, simpleMenuJS){
        simpleMenuJS.appendChild(createNodeUl(jsonObj, ""));
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
        var allUlMainMenu = document.querySelectorAll('.simple-menu-js a');
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
    function createSearch(simpleMenuJS){

        var elSection = document.createElement("section");
        var elForm = document.createElement("form");

        var elLabel = document.createElement("label");
        var textLabel = document.createTextNode(this.simpleMenuJSOptions.searchLabel);
        elLabel.appendChild(textLabel);

        var elInput = document.createElement("input");
        elInput.setAttribute('name', 'searchMenu');
        elInput.setAttribute('id', 'searchMenu');

        elForm.appendChild(elLabel);
        elForm.appendChild(elInput);
        
        elSection.appendChild(elForm);

        simpleMenuJS.appendChild(elSection);
    }
    this.simpleMenuJSinit = function (jsonObjMenu){
        var simpleMenuJS = document.querySelector(".simple-menu-js");

        if(this.simpleMenuJSOptions.search){
            createSearch(simpleMenuJS);
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
                    createMenu(newObj, simpleMenuJS);
                }else{
                    clearAllUlMenu();
                    createMenu(jsonObjMenu, simpleMenuJS);
                }
            });
        }
        createMenu(jsonObjMenu, simpleMenuJS);
    }

    function clearAllUlMenu(){
        var simpleMenuJS = document.querySelector(".simple-menu-js");
        var ul = document.querySelector(".simple-menu-js ul");
        simpleMenuJS.removeChild(ul);
    }
})();

this.simpleMenuJSinit(jsonMenu);