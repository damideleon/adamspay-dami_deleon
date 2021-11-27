/**
 *      routing.js 
 *      @version: v0.3;
 *      @author: Damián De León
 *      @email: damideleon97@gmail.com
 */

/**
 *  Cómo usar / How to use
 *  <div id="vista"></div>
 *  <script type="text/javascript">
 *   Routing.when({
 *       path : "/",
 *       template : "template/home.html"
 *   }).other({
 *       template : "template/error.html"
 *   }).default({
 *       path : "/",
 *       template : "template/home.html"
 *   }).on();
 *	</script>
 */

/*global $, Routing, window*/

var Routing = {};

//var _url_ = '', _root_ = '', user = Cookies.get('user');

Routing.url = { "when": [] };

Routing.default = function (_routes_) {
    Routing.url.default = _routes_;
    return Routing;
};

Routing.when = function (_routes_) {
    Routing.url.when.push(_routes_);
    return Routing;
};

Routing.other = function (_routes_) {
    Routing.url.other = _routes_;
    return Routing;
};

Routing.unautorized = function (_routes_) {
    Routing.url.unautorized = _routes_;
    return Routing;
};

Routing.redirect = function (url) {
    var u = window.location.hash.slice(1).split('?');
    return url.path === u[0];
};
/*
Routing.cambiar_rutas = function () {

    if (window.location.hash.slice(1) === '') {
        Routing.cargar(Routing.url.default.template);
        return false;
    }

    var rutas = Routing.url.when.filter(Routing.redirect);

    if (rutas.length > 0) {
        Routing.cargar(rutas[0].template);
    } else {
        Routing.cargar(Routing.url.other.template);
        return false;
    }

};*/

Routing.cambiar_rutas = ()=>{
    if (window.location.hash.slice(1) === '') {
        return false;
    }
    
    Routing.cargar(window.location.hash.slice(1));
}



Routing.on = function () {
    Routing.cambiar_rutas();
};


Routing.cargar = function (url) {
    $.ajax({
        url: url,
        method: "GET",
        dataType: "html",

        beforeSend: function () {
            $("#vista").html('<div class="progress"><div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 75%"></div></div>');
        },
        success: function (response, status, jqXHR) {
            $("#vista").html(response);
        },
        error: (response)=>{
            $("#vista").html(response);
        }
    });
};

function urlParam(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    } else {
        return results[1] || 0;
    }
}

window.addEventListener('hashchange', function () {
    Routing.cambiar_rutas();
});


