//alert("ok");

$("#menu").find('li').find('a').on("click", function(){
    $("#menu").find('li').each(function(){
        $(this).find('a').removeClass("active");
        $(this).prop("aria-current", false);
    });
    $(this).addClass("active");
    $(this).prop("aria-current", "page");
});

/**
 * @param {Array} campos Escribir los <b>id</b>'s de los campos a verificar
 * @return {boolean} Retorna <b>true</b> si todos los campos han sido llenados
 * @example <pre>validar_campo(["campo1", "campo2", "campoN"])</pre>
 * @author dami_deleon
 */
/*global $, Handlebars, alertify*/
function validar_campo(campos) {
    var valido = true;
    var totalCampos = campos.length;
    for (var i = 0; i < totalCampos; i++) {
        if ($("#" + campos[i]).val().trim() === '' || $("#" + campos[i]).val() === "0" || $("#" + campos[i]).val() == undefined) {
            $("#" + campos[i]).addClass('is-invalid');
            valido = false;
        } else {
            $("#" + campos[i]).removeClass('is-invalid').addClass('is-valid');
        }
    }
    return valido;
}


$(".clickable-row").on("click", function(e){
    $(".clickable-row").each(function(){
        $(this).removeClass("active");
    });
    $(this).addClass("active");
})

context.dataindex = 0;


/**
 * 
 * @param {*} opts 
 */
jQuery.fn.activarFila = function (opts) {

    var id = $(this[0]).attr("id");
/*    $("#" + id).on('click', '.clickable-row', function () {
        if ($(this).hasClass('table-active')) {
            $(this).removeClass('table-active');
        } else {
            $(this).addClass('table-active').siblings().removeClass('table-active');
            context.dataindex = Number($(this).attr('data-index'));
        }
    });
*/
    $("#"+id).on('contextmenu', '.clickable-row', function (e) {
        e.preventDefault(); 
        if ($(this).hasClass('table-active')) {
            $(this).removeClass('table-active');
        } else {
            $(this).addClass('table-active').siblings().removeClass('table-active');
            context.dataindex = Number($(this).attr('data-index'));
        }
    });
};


//Sobreescribe tema de Alertify
alertify.defaults.transition = "slide";
alertify.defaults.theme.ok = "btn btn-success";
alertify.defaults.theme.cancel = "btn btn-danger";
alertify.defaults.theme.input = "form-control";
alertify.defaults.glossary.title = document.title;
alertify.defaults.glossary.ok = 'Aceptar';
alertify.defaults.glossary.cancel = 'Cancelar';