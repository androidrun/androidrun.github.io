'use strict';
const __app = (()=>{


    function displayApp(app){

        document.title = app.n + ' - Androidrun';
        document.querySelector("link[rel~='icon']").href = `https://raw.githubusercontent.com/androidrun/androidrun-img/main/${app.id}.png`;

        let app_HTML = `<div class="row justify-content-md-center mt-5">
        <div class="col-xs-2 col-lg-auto app-col p-1">
          <div class="card app-card mx-auto" style="padding:0; width:20em">
            <img class="card-img-top img-app" src="https://raw.githubusercontent.com/androidrun/androidrun-img/main/${app.id}.png" alt="${app.n}">
            <div class="card-body" style="text-align: center;">
              <h5 class="card-title" data-toggle="tooltip" data-placement="bottom" title="${app.n}">${app.n}</h5>
              <p class="card-text">Version: ${app.v}</br>Mod: ${app.m}</p>
              <a href="https://bit.ly/androidrun-${app.id.replaceAll('.','-')}" class="btn btn-primary btn-download mr-1" data-toggle="tooltip" data-placement="bottom" title="Download"><i class="fa fa-download btn-icon-prepend mdi-20px"></i></a><a href="https://play.google.com/store/apps/details?id=${app.id}" class="btn btn-success btn-gplay mr-1" data-toggle="tooltip" data-placement="bottom" title="Go to GooglePlay"><i class="fa fa-android btn-icon-prepend mdi-20px"></i></a></div></div></div>
      </div>
       
      </div>`;

        let baseApp = document.querySelector('.featurette-divider');
        baseApp.insertAdjacentHTML('beforebegin', app_HTML);


    }

    const urlP = (() => {

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        let id,v,m,n;

        if(urlParams.has('id') && urlParams.has('v') && urlParams.has('m') && urlParams.has('n')) {

            id = urlParams.get('id');
            v = urlParams.get('v');
            m = urlParams.get('m');
            n = urlParams.get('n');

            displayApp({id:id,n:n,v:v,m:m});
        
        } else {
            location.replace('/');
            return {error:console.log('> [404] page not found!')}
        }

  })();


})();