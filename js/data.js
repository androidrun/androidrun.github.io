/**
 * by @androidrun
 */
'use strict';

const ___database = (()=>{

    let _data;

    const DOMStrings = {
        btnPrevious:'.previous',
        btnNext:'.next',
        btnPages:'.page-item',
        btnNumbers:'.page-numbers',
        btnDisabled:'.disabled',
        appRow:'.app-row',
        pagDown:'.pag-down',
        pagOver:'.pag-over',
        lastPage:'.last-page',
        inputSearch:'.input-search',
        btnSearch:'.btn-search',
        appCol:'.app-col'
    };

    function displayData(n){

        const truncate = (input, wide) => input.length > wide ? `${input.substring(0, wide)}...` : input;
        const removeData = ()=> {
            let appCol = document.querySelectorAll(DOMStrings.appCol);
            if(appCol != null){
                appCol.forEach(el =>{
                    el.remove();
                });
            }
            
        };
        const addData = ()=>{
            let first = (n-1)*10; 
            let last = (first + 9) > _data.app.length ? _data.app.length-1 : first + 9;
            for(let i = first; i <= last; i++){ 

                let app =_data.app[i];
        
                let appCOL_HTML=`<div class="col-xs-3 m-1 app-col"><div class="card app-card"><img class="card-img-top img-app" src="https://raw.githubusercontent.com/androidrun/androidrun-img/main/${app.id}.png" alt="${app.name}"><div class="card-body" style="text-align: center;"><h5 class="card-title" data-toggle="tooltip" data-placement="bottom" title="${app.name}">${truncate(app.name, 12)}</h5><p class="card-text">Version: ${truncate(app.desc.v, 12)}</br>Mod: ${app.desc.m}</p><a href="https://bit.ly/androidrun-${app.id.replaceAll('.','-')}" class="btn btn-primary btn-download mr-2" data-toggle="tooltip" data-placement="bottom" title="Download"><i class="fa fa-download btn-icon-prepend mdi-20px"></i></a><a href="https://play.google.com/store/apps/details?id=${app.id}" class="btn btn-success btn-gplay mr-2" data-toggle="tooltip" data-placement="bottom" title="Go to GooglePlay"><i class="fa fa-android btn-icon-prepend mdi-20px"></i></a><a href="${encodeURI('/app.html?id='+app.id+'&v='+app.desc.v+'&m='+app.desc.m+'&n='+app.name)}" class="btn btn-secondary btn-share mr-2" data-toggle="tooltip" data-placement="bottom" title="Share"><i class="fa fa-share btn-icon-prepend mdi-20px"></i></a></div></div></div>`;

        
                let appROW = document.querySelector(DOMStrings.appRow);
                appROW.insertAdjacentHTML('beforebegin', appCOL_HTML);
            }
        }

        removeData();
        addData();

    };

    function enabledPage(n){

        let btnDisabled, btnEnable;

        window.history.pushState({}, '', `/?p=${n}`);

        /* remove last enabled */
        btnDisabled = document.querySelector(DOMStrings.btnDisabled);

        if(btnDisabled != null){

            if(btnDisabled.firstElementChild.dataset.id == n) return false;

            btnDisabled.firstElementChild.classList.remove('disabled');
            btnDisabled.classList.remove('disabled');
        }

        btnEnable = document.querySelector(`${DOMStrings.btnNumbers}[data-id="${n}"]`);
        btnEnable.classList.add('disabled');
        btnEnable.parentElement.classList.add('disabled');

        displayData(n);
    };

    function pagination(total){

        let n,pages,btnNext,btnPage_HTML, pgOver, pgDown;

        /* update page search */
        window.history.pushState({}, '', '/?p=1');

        n = total/10;
        pages = (n === parseInt(n)) ? n : parseInt(n)+1;

        pgOver = document.querySelector(DOMStrings.pagOver);
        pgDown = document.querySelector(DOMStrings.pagDown);


        if(pages <= 10 && pages> 0){
        
            try { pgDown.hidden = false; pgOver.remove() } catch (e) {}

            btnNext = document.querySelector(DOMStrings.btnNext);

            /* add btn page numbers */
            for(let i = 1; i <= pages; i++){ 
                btnPage_HTML=`<li class="page-item"><a class="page-link bg-dark page-numbers" data-id="${i}">${i}</a></li>`;
                btnNext.insertAdjacentHTML('beforebegin', btnPage_HTML);
            }

            /* event btn page */
            document.querySelectorAll(DOMStrings.btnNumbers).forEach(btnPage => {
                btnPage.addEventListener('click', (event)=>{
                    enabledPage(event.target.dataset.id);
                });
            });

            } else if(pages > 10){

                let lastPag;

                try { pgOver.hidden = false; pgDown.remove() } catch (e) {}

                lastPag = document.querySelector(DOMStrings.lastPage);
                lastPag.textContent = pages;
                lastPag.dataset.id = pages;

                /* event btn page */
                document.querySelectorAll(DOMStrings.btnNumbers).forEach(btnPage => {
                    btnPage.addEventListener('click', (event)=>{

                        let pg = event.target;
                        let id = parseInt(pg.dataset.id);

                        /* midle btn action */
                        if(pg.classList.contains('midle-gp')){
                        enabledPage(id);
                        };

                        /* first btn action */
                        if(pg.classList.contains('first-gp')){
                            if(id > 2){
                                for(let i=id-2, j=1; i<= id; i++, j++){ 
                                    let btn=document.querySelectorAll(DOMStrings.btnNumbers)[j]; 
                                    btn.textContent=i; 
                                    btn.dataset.id=i; 
                                }; 
                                enabledPage(id); 
                            } else { 
                                enabledPage(id); 
                            } 
                        }; 
                        
                        /* last btn action */
                        if(pg.classList.contains('last-gp')){ 
                            if(id < pages-1){ 
                                for(let i=id, j=1; i<=id+2; i++, j++){ 
                                    let btn=document.querySelectorAll(DOMStrings.btnNumbers)[j]; 
                                    btn.textContent=i; 
                                    btn.dataset.id=i; 
                                }; 
                                enabledPage(id); 
                            } else { 
                                enabledPage(id); 
                            } 
                        }; 
                    }); 
                }); 
                    
                /* previw */ 
                document.querySelector(DOMStrings.btnPrevious).addEventListener('click', ()=>{

                    let pg = document.querySelector('.page-numbers.disabled');
                    let id = pg.dataset.id;

                    if(id != 1){
                        if(pg.classList.contains('midle-gp')){
                            enabledPage(id-1);
                        };

                        if(pg.classList.contains('last-gp')){
                        enabledPage(id-1);
                        };

                        if(pg.classList.contains('first-gp')){
                            if(id > 2){
                                for(let i=id-2, j=1; i<= id; i++, j++){ 
                                    let btn=document.querySelectorAll(DOMStrings.btnNumbers)[j]; 
                                    btn.textContent=i; 
                                    btn.dataset.id=i; 
                                } 
                                enabledPage(id-1); 
                            } else { 
                                enabledPage(id-1); 
                            } 
                        } 
                    } 
                }); 
                
                /* next */ 
                document.querySelector(DOMStrings.btnNext).addEventListener('click', ()=>{

                    let pg = document.querySelector('.page-numbers.disabled');
                    let id = parseInt(pg.dataset.id);

                    if(!pg.classList.contains('last-page')){

                        if(pg.classList.contains('first-page')){
                            enabledPage(id+1);
                        }
                        if(pg.classList.contains('midle-gp')){
                            enabledPage(id+1);
                        }
                        if(pg.classList.contains('first-gp')){
                            enabledPage(id+1);
                        }
                        if(pg.classList.contains('last-gp')){
                            if(id < pages-1){ 
                                for(let i=id, j=1; i<=id+2; i++, j++){ 
                                    let btn=document.querySelectorAll(DOMStrings.btnNumbers)[j]; 
                                    btn.textContent=i; 
                                    btn.dataset.id=i; 
                                } 
                                enabledPage(id+1); 
                            } else { 
                                enabledPage(id+1); 
                            } 
                        } 
                    } 
                }); 
                
                document.querySelector('.first-page').addEventListener('click', ()=>{

                    enabledPage(1);

                    for(let i=2, j=1; i<=4; i++, j++){ 
                        let btn=document.querySelectorAll(DOMStrings.btnNumbers)[j]; 
                        btn.textContent=i; btn.dataset.id=i; 
                    } 
                }); 
                
                document.querySelector('.last-page').addEventListener('click', ()=>{
                    
                    enabledPage(pages);

                    for(let i=pages-3, j=1; i<=pages-1; i++, j++){ 
                        let btn=document.querySelectorAll(DOMStrings.btnNumbers)[j]; 
                        btn.textContent=i; btn.dataset.id=i; 
                    } 
                }); 
            } else { 
                return console.log('>[] Something went wrong loadding the data!');
        }
            enabledPage(1);
    };

    function init(data){

        let appList = data.app;

        /* paggination */
        pagination(appList.length);

        /* event search */
        $('form input').keydown(function (e) {
            if (e.keyCode == 13) {
                e.preventDefault();
                return false;
            }
        });

        function searchApp(search){
            let querySearch = [];

            if(search != '' || search != null){

                data.app.forEach(app =>{          
                    if(app.name.toLowerCase().includes(search.toLowerCase())){
                        querySearch.push(app);
                    }
                });

                if(querySearch.length > 0){

                    /* set data */

                    const truncate = (input, wide) => input.length > wide ? `${input.substring(0, wide)}...` : input;

                    let appROW = document.querySelector(DOMStrings.appRow);

                    /* try remove data */

                    let appCol = document.querySelectorAll('.app-col');

                    if(appCol != null){
                        appCol.forEach(el =>{
                        el.remove();
                        });
                    }

                    for(let i = 0; i<=querySearch.length-1; i++){
                                    
                        let app=querySearch[i];
                        let appCOL_HTML=`<div class="col-xs-3 m-1 app-col"><div class="card app-card"><img class="card-img-top img-app" src="https://raw.githubusercontent.com/androidrun/androidrun-img/main/${app.id}.png" alt="${app.name}"><div class="card-body" style="text-align: center;"><h5 class="card-title" data-toggle="tooltip" data-placement="bottom" title="${app.name}">${truncate(app.name, 12)}</h5><p class="card-text">Version: ${truncate(app.desc.v, 12)}</br>Mod: ${app.desc.m}</p><a href="https://bit.ly/androidrun-${app.id.replaceAll('.','-')}" class="btn btn-primary btn-download mr-2" data-toggle="tooltip" data-placement="bottom" title="Download"><i class="fa fa-download btn-icon-prepend mdi-20px"></i></a><a href="https://play.google.com/store/apps/details?id=${app.id}" class="btn btn-success btn-gplay mr-2" data-toggle="tooltip" data-placement="bottom" title="Go to GooglePlay"><i class="fa fa-android btn-icon-prepend mdi-20px"></i></a><a href="${encodeURI('/app.html?id='+app.id+'&v='+app.desc.v+'&m='+app.desc.m+'&n='+app.name)}" class="btn btn-secondary btn-share mr-2" data-toggle="tooltip" data-placement="bottom" title="Share"><i class="fa fa-share btn-icon-prepend mdi-20px"></i></a></div></div></div>`;

                        appROW.insertAdjacentHTML('beforebegin', appCOL_HTML);

                    }

                }
            }
        }

        document.querySelector(DOMStrings.inputSearch).addEventListener('keydown', (e)=>{
            if (e.keyCode == 13) {
                let search = document.querySelector(DOMStrings.inputSearch).value;
                searchApp(search);
            }
        });

        document.querySelector(DOMStrings.btnSearch).addEventListener('click', ()=>{
            let search = document.querySelector(DOMStrings.inputSearch).value;
            searchApp(search);                   
        });

    };

    /* get data */
    $.getJSON('https://raw.githubusercontent.com/androidrun/androidrun-data/main/data.json',
        function(data){
            console.log("Success!");
            console.log(data);
            _data = data;
            init(_data);
        })
    .done(function() { console.log('getJSON request succeeded!'); })
    .fail(function(jqXHR, textStatus, errorThrown) { console.log('getJSON request failed! ' + textStatus); })
    .always(function() { console.log('getJSON request ended!'); });

})();