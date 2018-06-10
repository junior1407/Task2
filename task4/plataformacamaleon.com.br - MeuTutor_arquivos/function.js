$(document).ready(function () {
    $navBarInfoStudent = $("#navbar-info-student");
    $navBarAvatar = $("#navbar-avatar");

    setAllImageResponsive();
    $('.infinite-scroll').jscroll();

    restartContentArea();

    $('.jspDrag').hide();
    $('.jspScrollable').mouseenter(function () {
        $('.content-area .jspDrag').stop(true, true).fadeIn('slow');
    });
    $('.jspScrollable').mouseleave(function () {
        $('.content-area .jspDrag').stop(true, true).fadeOut('slow');
    });
    // ao clicar no menu do menu lateral, abrir o submenu
    $(".sidebar-nav li a").click(function ()
    {
        // verifica se nao tem a classe noActionJs, que indica que nao eh para executar essa acao
        if (!$(this).hasClass("noActionJs"))
        {
            // coloca todos os menus para trás
            $(".submenu").css("z-index", "10");

            // remove o atributo de div selecionada
            $("#sidebar-wrapper a").removeClass("selected");

            // adiciona a classe selected na div clicada
            $(this).addClass("selected");

            var divId = $(this).attr("id");
            $("#sub" + divId).css("left", "60px").css("z-index", "100");

            // abre os outros menus - para caso ele mude com eles já aberto
            $(".submenu").css("left", "60px");

            // reduz a logo
            $("#logo_instituicao").hide();
            $("#logo_instituicao_mini").show();

            $("#school_name_sidebar").hide();

            // coloca o texto na vertical
            $("#modulo_tipo h5").addClass("rotate");
        }
    });

    // fechar menu ao colocar o mouse no centro
    $("#page-content-wrapper").mouseover(function () {
        closeMenu();
    });

    activeTooltip();

//  minPositionFooter();
});

function minPositionFooter()
{
    var heightBody = $("body").height();
    var heightWindow = $(window).height();
    var heightfooter = $("#footer-not-index").height();

    if (heightBody < heightWindow) {
        // 15 é a parte que passa do toti
        var rest = heightWindow - heightBody - ((heightfooter * 2) + 15);
        $("#footer-not-index").css("margin-top", rest);
    }
}

$(window).resize(function () {
//    console.log($(window).width());
//$("#footer").css("top", $(document).height());
    restartContentArea();
});

var intervalToCloseMenu;
var countToCloseMenu = 0;

var codigo = {
    ok: 200,
    service_unavailable: 503,
    autentiticacao_invalida: 511,
    questao_errada: 601,
    finalizou_assunto: 603
};

function isOk(codigoRetorno)
{
    if(codigoRetorno.hasOwnProperty('code')){
        return (parseInt(codigoRetorno.code) == codigo.ok)
    } else if(codigoRetorno.hasOwnProperty('status')){
        return (parseInt(codigoRetorno.status) == codigo.ok)
    } else {
        return (codigoRetorno == codigo.ok);
    }
}

function restartFormatDatePicker() {
    restartDatePicker();
}

function addFunctionOnCloseInDatePicker() {
    restartDatePicker();
}

function startDatePicker()
{
    $(".datepicker").datetimepicker({
        minDate: new Date(),
        sideBySide: true,
        locale: 'pt-br',
        format: 'DD/MM/YYYY HH:mm'
    });
}

function restartDatePicker()
{
    $(".datepicker").datetimepicker({
        sideBySide: true,
        locale: 'pt-br',
        format: 'DD/MM/YYYY HH:mm'
    });
}

function disableAutoplay() {
    var vid = $("#student-video-details-vide-clicked");
    vid.autoplay = false;
    vid.load();
}

// barra de rolagem com transparencia e estilizada
function restartContentArea()
{
    contentArea = $('.content-area').jScrollPane({
        autoReinitialise: true,
        horizontalGutter: 5,
        verticalGutter: 5,
        showArrows: false
    });
}

function restartContentAreaById(id)
{

    $('#' + id).jScrollPane({
        autoReinitialise: true,
        horizontalGutter: 5,
        verticalGutter: 5,
        'showArrows': false
    });
}

function scrollToTop()
{
    $('body,html').animate({scrollTop: 0}, 750);
}

function scrollToDiv(idDiv)
{
    if (!$("#" + idDiv).offset().top || $("#" + idDiv).offset().top == 'undefined') {
        var height = 0;
    } else {
        var height = $("#" + idDiv).offset().top;
    }

    $('html,body').animate({scrollTop: height}, 750);
}

function scrollToBottom()
{
    var $target = $('html,body');
    $target.animate({scrollTop: $target.height()}, 1000);
}

function refresh()
{
    document.location.href = document.location.href;
}

function historyBack()
{
    window.history.back();
}

function linkTo(url)
{
    document.location.href = url;
}

/********* FUNCOES PARA TABELAS ************/

/**
 * procurar em uma tabela
 * tableId - passar o ID da tabela
 * tableField - passar o CAMPO da tabela que ira buscar, onde eh necessario ter a CLASSE no td, exemplo <td class='name'> : passar name
 **/
function searchInTable(strSearch, tableId, elementFilter)
{
    var nomeConsulta = strSearch.value.toLowerCase();

    // $('#' + tableId + ' .' + tableField).each(function () {
    //
    //   var nomeUsuario = $(this).html();
    //   nomeUsuario = nomeUsuario.toLowerCase();
    //
    //   if (nomeUsuario.indexOf(nomeConsulta) != -1)
    //   {
    //     $(this).parent().fadeIn();
    //   }
    //   else
    //   {
    //     $(this).parent().fadeOut();
    //   }
    // });

    if( typeof elementFilter === 'string' ) {
        elementFilter = [ elementFilter ];
    }

    $("#"+ tableId +' tr').each(function (index) {
        if(index != 0){
            $tr = $(this);
            var propertiesConcat = "";
            var tmpString = "";
            elementFilter.forEach(function(element){
                var splited = element.split(':');
                switch (splited[0]){
                    case 'data':
                        tmpString = $tr.data(splited[1]);
                        break;
                    case 'class':
                        element = splited[1];
                    default:
                        tmpString = $tr.find('.'+element).html();
                }

                if($tr.find('.'+element).html() !== undefined){
                    propertiesConcat+= tmpString.toLowerCase().replace('\n','').replace( /\s\s+/g, ' ' )+"|";
                }
            });
            if (propertiesConcat.indexOf(nomeConsulta) != -1)
            {
                $(this).fadeIn();
            }
            else
            {
                $(this).fadeOut();
            }
        }
    });




    // $('#' + tableId +' tr').each(function (){
    //     console.log(this);
    // });

    restartContentArea();
}

/**
 * Procura por um nome em uma lista
 *
 * @param {type} element
 * @param {type} listId
 *
 * @returns {undefined}
 */
function searchInList(element, listId)
{
    var busca = element.value.toLowerCase();

    $('#' + listId + ' .search').each(function () {
        $element = $(this).html();
        $element = $element.toLowerCase();

        if ($element.indexOf(busca) != -1)     {
            $(this).parents("li").fadeIn();
        } else {
            $(this).parents("li").fadeOut();
        }
    });

    rollScrollBarToLeft('teacher-dashboard-main-students');
}

var arraySortCurrent = [];

/**
 * ordena uma coluna de uma tabela
 * tableId - passar o ID da tabela
 * tableField - passar o CAMPO da tabela, onde eh necessario ter a CLASSE no td, exemplo <td class='name'> : passar name
 **/
function sortTable(tableId, tableField, isNumber)
{
    var arrayTableLines = [];
    var idArraySort = tableId + tableField;

    $('#' + tableId + ' .' + tableField).each(function () {

        var contentHtml = $(this).html();
        if (isNumber)
        {
            var contentHtml = parseFloat($(this).html());
        }

        var arrayUsuario = new Array(contentHtml, $(this).parent());
        arrayTableLines.push(arrayUsuario);
    });

    if (isNumber)
    {
        arrayTableLines.sort(function (a, b) {
            return a[0] - b[0];
        });
    }
    else
    {
        arrayTableLines.sort(function (a, b) {
            return a[0].localeCompare(b[0]);
        });
    }

    if (arraySortCurrent)
    {
        arrayTableLines.reverse();
        arraySortCurrent = false;
    }
    else
    {
        arraySortCurrent = true;
    }

    $("#" + tableId).html("");
    for (var key in arrayTableLines)
    {
        $("#" + tableId).append(arrayTableLines[key][1]);
    }
}

/********* FIM - FUNCOES PARA TABELAS ************/

// inicia uma contagem para fechar o submenu, caso nao esteja usando
function startCountToClose()
{
    countToCloseMenu++;
    if (countToCloseMenu >= 4)
    {
        closeMenu();
        clearInterval(intervalToCloseMenu);
    }
}

// fecha o submenu e remove o menu selecionado da barra lateral
function closeMenu()
{
    $(".submenu").css("left", "250px");
    $("#sidebar-wrapper a").removeClass("selected");

    // amplia a logo
    $("#logo_instituicao").show();
    $("#logo_instituicao_mini").hide();

    $("#school_name_sidebar").show();

    // coloca o texto na horizontal
    $("#modulo_tipo h5").removeClass("rotate");
}

/**
 * efetua a requisicao de ajax ao back
 **/
var callService = null;

//var arrayTeste = new Array();

function requestDivToBackend(action, data, paramsCallback)
{

    var deferred = $.Deferred();
    var parallel = data.parallel;

    if (callService && !parallel) {
        callService.abort();
    }

    var objJson;
    var divId = data.divId;

    var callBackSuccess = data.callBackSuccess;
    var callBackError = data.callBackError;
    var isAppend = data.isAppend;
    var stream = data.stream;

    return callService = $.ajax({
        type: 'POST',
        url: action,
        data: data,
        asinc: false,
        success: function (result) {
            deferred.resolve(result);

            if (divId && isAppend) {
                $("#" + divId).append(result);

                // jsPlumb.repaintEverything();
                setAllImageResponsive();
                restartContentArea();
            } else if (divId) {

                if (data.withoutEffects) {
                    $("#" + divId).hide().html(result).show();
                } else if (data.hidden) {
                    $("#" + divId).hide().html(result);
                } else {
                    $("#" + divId).hide().html(result).fadeIn();
                }

                // jsPlumb.repaintEverything();
                setAllImageResponsive();
                restartContentArea();
            } else if(stream) {
                this.result = result;
            } else {
                // json parse result
                this.objJson = JSON.parse(result);
            }

            // if callback, call the function
            if (callBackSuccess) {
                // find object
                var fn = window[callBackSuccess];

                // is object a function?
                if (typeof fn === "function") {
                    if(stream){
                        fn.call(null, this.result, paramsCallback);
                    } else {
                        fn.call(null, this.objJson, paramsCallback);
                    }
                }
            }

            activeTooltip();
        },
        error: function (result) {
            if (divId) {
                $("#" + divId).hide().html(result).fadeIn();
                setAllImageResponsive();
                restartContentArea();
                //jsPlumb.repaintEverything();
            } else {
                // find object
                var fn = window[callBackError];

                // json parse result
                var objJson = JSON.parse(result.responseText);

                // is object a function?
                if (typeof fn === "function") {
                    fn.call(null, objJson);
                }
            }
        }
    });

//  setTimeout(function(){
////    return deferred.promise();
//    return true;
//  },500);

}

function teste(nextCall) {
    if (nextCall) {
        requestDivToBackend(nextCall[0], nextCall[1], nextCall[2]);
    }
}
function teste2(nextCall) {
    if (nextCall) {
        arrayTeste.splice(0, 1);
    }
}

/**
 * Função usada para setar classes de responsividade nas imagens
 * @returns {undefined}
 */
function setAllImageResponsive()
{
//  $("#page-content-wrapper img").addClass("img");
    $("#page-content-wrapper img").addClass("img-responsive");
    $("#page-content-wrapper img").removeAttr("width");
    $("#page-content-wrapper img").removeAttr("height");
//  $("#page-content-wrapper img").css("max-width", "100%");
//  $("#page-content-wrapper img").css("max-width", "100%");
//  $("#page-content-wrapper img").css("max-width", "100%");
//  $("#page-content-wrapper img").css("max-width", "100%");
}

/************************ CONSULTAR USUARIO PARA EDITAR
 ** idUsuario - login do usuario que vai ser pesquisado para ser editado
 ** action - metodo para chamar e verifica no html ( Coordinator / Teacher / etc ... )
 **/
function boxEditUser(idUsuario, action)
{
    var data = {
        method: 'findToEdit',
        idUsuario: idUsuario,
        callBackSuccess: "successBoxEditUser",
    };

    $("#div" + action + "Register").fadeOut();
    $("#div" + action + "Edit").fadeIn();

    // esconde os campos para editar
    $("#divFields" + action + "Edit").addClass("opacity30");

    // esconde o box de erro
    $("#messgeErrorEdit" + action).hide();

    // esconde o botao de cadastro
    $("#buttonEdit" + action).hide();

    // mostra o carregando
    $("#infoLoadingEdit" + action).show();

    requestDivToBackend("/controller/" + action, data, action);
}

function successBoxEditUser(objJson, action)
{
    if (isOk(objJson.code))
    {
        // mostra os campos para editar
        $("#divFields" + action + "Edit").removeClass("opacity30");

        arrayFields = objJson.message;

        // recupera os campos do banco para preencher os dados do coordenador
        for (var field in arrayFields)
        {
            var currentInput = $("#edit" + action + " input[name=" + field + "]");
            currentInput.val(arrayFields[field]);
        }

        // esconde o carregando
        $("#infoLoadingEdit" + action).hide();

        // ativa o botao de cadastro
        $("#buttonEdit" + action).show();
    }
    else
    {
        // esconde o carregando
        $("#infoLoadingEdit" + action).hide();

        // mostra o box de erro
        $("#messgeErrorEdit" + action).show().html("").html(objJson.message);
    }
}

/************************ FIM - CONSULTAR USUARIO PARA EDITAR */

/************************ EDITAR INFO BASICAS DO USUARIO POR ADM
 ** action - metodo para chamar e verifica no html ( Coordinator / Teacher / etc ... )
 **/
function editInfoUser(action)
{
    var data = {
        method: "edit" + action,
        parallel: true,
        callBackSuccess: "callBackEditInfoUser"
    };

    var $inputs = $('#edit' + action + ' :input');
    $inputs.each(function () {
        data[this.name] = $(this).val();
    });

    $("#buttonEdit" + action).hide();
    $("#infoLoadingEdit" + action).show();

    requestDivToBackend("/controller/" + action, data, action);
}

function callBackEditInfoUser(objJson, action)
{
    // cadastro efetuado com sucesso
    if (isOk(objJson.code))
    {
        $("#infoLoadingEdit" + action).hide();
        $("#messgeEdit" + action).html("").html(objJson.message).fadeIn(400, function () {
            // find object
            var fn = window["list" + action];

            // is object a function?
            if (typeof fn === "function")
            {
                fn.call(null, objJson);
            }
        });
    }
    // problema ao cadastrar ( email existente, etc )
    else
    {
        $("#messgeErrorEdit" + action).html("").html(objJson.message).fadeIn();
    }

    // remove loading e coloca botao de cadastro
    $("#buttonEdit" + action).show();
    $("#infoLoadingEdit" + action).hide();
}

/************************ FIM - EDITAR INFO BASICAS DO USUARIO POR ADM */

/************************ BLOQUEAR / DESBLOQUEAR USUARIO */

function blockUser(loginUsuario, meututorId, action, idSchool)
{

    var data = {
        method: 'block',
        loginAlvo: loginUsuario,
        parallel: true,
        callBackSuccess: "successBlock",
        callBackError: "errorBlock",
        idSchool: idSchool
    };

    $("#load_" + meututorId).removeClass("hidden");

    $('#block_' + meututorId).addClass("hidden");
    $('#unblock_' + meututorId).addClass("hidden");

    requestDivToBackend("/controller/" + action, data, meututorId);
}

function successBlock(objJson, meututorId)
{
    if (isOk(objJson.code))
    {
        $("#load_" + meututorId).addClass("hidden");

        /*$('#block_' + meututorId).addClass("hidden");
        $('#unblock_' + meututorId).removeClass("hidden");*/

        $('#user-'+meututorId).remove();
        $('.modal-backdrop').remove();
    }
    else
    {
        errorBlock(meututorId);
    }
}

function unblockUser(loginUsuario, meututorId, action, idSchool)
{
    var data = {
        method: 'unblock',
        loginAlvo: loginUsuario,
        parallel: true,
        callBackSuccess: "successUnblock",
        callBackError: "errorBlock",
        idSchool: idSchool
    };

    $("#load_" + meututorId).removeClass("hidden");

    $('#block_' + meututorId).addClass("hidden");
    $('#unblock_' + meututorId).addClass("hidden");

    requestDivToBackend("/controller/" + action, data, meututorId);
}

function successUnblock(objJson, meututorId)
{
    if (isOk(objJson.code))
    {
        $("#load_" + meututorId).addClass("hidden");

        $('#unblock_' + meututorId).addClass("hidden");
        $('#block_' + meututorId).removeClass("hidden");
    }
    else
    {
        errorBlock(meututorId);
    }
}

function errorBlock(meututorId)
{
    $("#load_" + meututorId + " i")
        .removeClass("fa-spinner")
        .removeClass("fa-spin")
        .addClass("fa-exclamation-triangle")
        .attr('data-original-title', 'Erro ao executar');
}

/******************** FIM - BLOQUEAR / DESBLOQUEAR USUARIO ****/

// ativar tooltip
function activeTooltip()
{
    $(".tooltipTop").tooltip({placement: "top"});

    $(".tooltipBottom").tooltip({placement: "bottom"});
}

function loadTree(idClass, idGrade, idCourse, disciplineName)
{
    var data = {
        parallel: true,
        idGrade: idGrade,
        idClass: idClass,
        idCourse: idCourse,
        disciplineName: disciplineName,
        method: "makeTreeStudent",
        divId: "tree",
        callBackSuccess: "callbackLoadTree"
    };

    $("#teacher-classroom-select-class").attr("disabled", "disabled");

    showLoadSpinNoWell(data.divId);

    $("#tree").css("opacity", "0.5");
    $("#tree .pre-load").css("opacity", "1");

    return requestDivToBackend("/controller/Tree", data);
}

function loadTreeTeacher(idClass, idGrade, idCourse, disciplineName)
{
    var data = {
        parallel: true,
        idGrade: idGrade,
        idClass: idClass,
        idCourse: idCourse,
        disciplineName: disciplineName,
        method: "makeTreeTeacher",
        divId: "tree",
        callBackSuccess: "callbackLoadTree"
    };

    $("#teacher-classroom-select-class").attr("disabled", "disabled");

    showLoadSpinNoWell(data.divId);

    $("#tree").css("opacity", "0.5");
    $("#tree .pre-load").css("opacity", "1");

    requestDivToBackend("/controller/Tree", data);
}

function callbackLoadTree()
{
    $("#teacher-classroom-select-class").removeAttr("disabled");
}

function classResume()
{
    var data = {
        divId: "class-resume"
    };

    requestDivToBackend("/controller/ClassResumeStats", data);
}

function topFivePlus()
{
    var data = {
        parallel: true,
        divId: "top-five-plus",
        method: "plus"
    };

    requestDivToBackend("/controller/TopFive", data);
}

function topFiveMinus()
{
    var data = {
        parallel: true,
        divId: "top-five-minus",
        method: "minus"
    };

    requestDivToBackend("/controller/TopFive", data);
}

// Main árvore
function loadMainTree()
{
    var data = {
        divId: "page-content-wrapper"
    };

    requestDivToBackend("/controller/MainTree", data);
}

// Main simulado
//function loadTest()
//{
//  var data = {
//    divId : "page-content-wrapper"
//  };
//
//  requestDivToBackend("/controller/A", data);
//}

// Main exercício
function mainExercise(idGrade, idDiscipline)
{
    var data = {
        idGrade: idGrade,
        idDiscipline: idDiscipline,
        divId: "page-content-wrapper"
    };

    requestDivToBackend("/controller/Exercise", data);
}

/************************************************** CANVAS TREE-NODE **************************************************/
/**
 * Função utilizada para construir o nó da árvore
 *
 * @param {int} id
 * @param {int} scoreUser
 * @returns {undefined}
 */
function drawNodeTeacher(id, scoreUser, isActive)
{

    var score = parseInt(scoreUser);

    var canvas = document.getElementById("canvas_" + id);
    var context = canvas.getContext('2d');

    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;

    var gray = '#DADADA';
    var green = '#6BBA9C';
    var orange = '#F39C12';


    color = gray;

    if(isActive){
        color = green;

        if(color == 100){
            color = orange;
        }
    }


    /*********** INNER-CIRCLE ***********/

    var radius = 30;

    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    context.fillStyle = color;
    context.fill();

    /*********** SCORE-MOUSE-OVER ***********/

    context.font = 'bold 14pt Open Sans';
    context.fillStyle = 'white';
    context.textBaseline = 'middle';
    context.textAlign = 'center';
    context.fillText(score + "%", centerX, centerY);

    /*********** BACKGROUND LEARNED ***********/

    var radius = 40;

    var startAngleLearned = 0.60 * Math.PI;

    var endAngleLearnedBG = 0.40 * Math.PI;

    var counterClockwise = false;

    context.beginPath();
    context.arc(centerX, centerY, radius, startAngleLearned, endAngleLearnedBG, counterClockwise);
    context.lineWidth = 10;
    context.strokeStyle = gray;
    context.stroke();

    /*********** PERCENTAGE-BAR LEARNED ***********/

        //Variável de progresso
    var endAngleLearned = startAngleLearned + ((1.8 * Math.PI) * score / 100);

    context.beginPath();
    context.arc(centerX, centerY, radius, startAngleLearned, endAngleLearned, counterClockwise);
    context.lineWidth = 10;

    // line color
    context.strokeStyle = color;
    context.stroke();

    /*********** ICON LEARNED ***********/

    context.font = 'normal 12pt fontAwesome';
    context.fillStyle = color;
    context.fillText("\uf05d", (centerX), (centerY * 2) - 8);
}

///*** CANVAS TREE-NODE ***///
/**
 * Função utilizada para construir o nó da árvore
 *
 * @param {int} id
 * @param {int} scoreUser
 * @returns {undefined}
 */
function drawNodeTeacherActive(id, scoreUser)
{
    var score = parseInt(scoreUser);

    var canvas = document.getElementById("canvas_" + id);
    var context = canvas.getContext('2d');

    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;

    var gray = '#DADADA';
    var color = '#2099c0';


    /*********** INNER-CIRCLE ***********/

    var radius = 30;

    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    context.fillStyle = color;
    context.fill();

    /*********** SCORE-MOUSE-OVER ***********/

    context.font = 'bold 14pt Open Sans';
    context.fillStyle = 'white';
    context.textBaseline = 'middle';
    context.textAlign = 'center';
    context.fillText(score + "%", centerX, centerY);

    /*********** BACKGROUND LEARNED ***********/

    var radius = 40;

    var startAngleLearned = 0.60 * Math.PI;

    var endAngleLearnedBG = 0.40 * Math.PI;

    var counterClockwise = false;

    context.beginPath();
    context.arc(centerX, centerY, radius, startAngleLearned, endAngleLearnedBG, counterClockwise);
    context.lineWidth = 10;
    context.strokeStyle = gray;
    context.stroke();

    /*********** PERCENTAGE-BAR LEARNED ***********/

        //Variável de progresso
    var endAngleLearned = startAngleLearned + ((1.8 * Math.PI) * score / 100);

    context.beginPath();
    context.arc(centerX, centerY, radius, startAngleLearned, endAngleLearned, counterClockwise);
    context.lineWidth = 10;

    // line color
    context.strokeStyle = color;
    context.stroke();

    /*********** ICON LEARNED ***********/

    context.font = 'normal 12pt fontAwesome';
    context.fillStyle = color;
    context.fillText("\uf05d", (centerX), (centerY * 2) - 8);
}

///*** CANVAS TREE-NODE ***///

/* função chamada na tela de login */
/* efetuar login */
function validarLogin()
{
    var lembrar_login = ($("#lembrar_login").is(':checked')) ? '1' : '0';

    var data = {
        login: $("#login").val(),
        password: $("#password").val(),
        lembrar_login: lembrar_login,
        callBackSuccess: "callBackLoginSuccess",
        callBackError: "callBackLoginError"
    };

    // esconde botao de logar e mostra o carregando
    $("#loginInfo button").hide();
    $("#spinContainer").show();

    requestDivToBackend("/controller/Login", data);
}

/**
 * trata o retorno ao efeutar login
 **/
function callBackLoginSuccess(objJson)
{
    if (objJson.code == codigo.ok) {
        if (objJson.message != '') {
            showLoginMessage(objJson.message);
            setTimeout(function(){
                window.location = objJson.url;
            }, 2950);
        } else {
            // redireciona para a url informada pelo back
            window.location = objJson.url;
        }
    } else {
        // mostra mensagem de erro ao logar
        showLoginMessage(objJson.message);
    }
}

/**
 * erro ao efetuar login
 **/
function callBackLoginError(objJson)
{
    showLoginMessage(objJson.message);
}

/**
 * mostra mensagem ao efetuar o login, caso nao tenha conseguido logar
 **/
function showLoginMessage(infoMessage)
{
    // mostra o botao de logar e esconde o carregando
    $("#spinContainer").hide();
    $("#loginInfo button").fadeIn("", function () {

        // informa o erro ao usuario
        var message = $("#msgIndex");

        message.html(infoMessage).fadeIn("slow");
        setTimeout(function () {
            message.fadeOut();
        }, 3000);

    });
}

/*
 * Função chamada ao clicar em um botão de seleciona imagem
 */
function handleFileSelect(evt)
{
    var files = evt.target.files; // FileList object

    var id = this.getAttribute("output");

    $("#" + id).empty();

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

        // Only process image files.
        if (!f.type.match('image.*')) {
            continue;
        }

        var reader = new FileReader();

        // Closure to capture the file information.
        reader.onload = (function (theFile) {
            return function (e) {
                // Render thumbnail.
                var span = document.createElement('span');

                span.innerHTML = ['<img class="img-circle" style="max-width: 140px; min-height: 140px" class="thumb" src="', e.target.result,
                    '" title="', escape(theFile.name), '"/>'].join('');
                document.getElementById(id).insertBefore(span, null);
            };
        })(f);

        // Read in the image file as a data URL.
        reader.readAsDataURL(f);
    }
}

/*
 *Ao clicar em uma série no cadastro de professor, as turmas aparecem
 */
function showClass(idClass, evt)
{
    var serie = $("#" + idClass);

    if ($("#" + evt.id).is(":checked"))
    {
        serie.find(".class").fadeIn();
    }
    else
    {
        serie.find(".class").fadeOut();
    }
}

/*
 * Ao clicar em cadastrar aluno na turma, ele preenche os campos respectivos a turma
 */
function fillModal(idClass)
{
    var classe = $("#" + idClass);

    $("#modal-series").html("<option>" + classe.find(".serie").text() + "</option>");
    $("#modal-class").html("<option>" + classe.find(".turma").text() + "</option>");
    $("#modal-typeEducation").html("<option>" + classe.find(".tipoEnsino").text() + "</option>");
    $("#modal-period").html("<option>" + classe.find(".turno").text() + "</option>");
}

/**
 * mostra o load do card na div informada
 * divId = string do ID da div
 **/
function showLoadSpin(divId, extraClass)
{
    $("#" + divId).html('<div class="well well-sm text-center pre-load ' + extraClass + '"><i class="fa fa-spinner fa-spin"></i></div>');
}

function showLoadSpinNoWell(divId, extraClass)
{
    $("#" + divId).html(
        '<div class="text-center pre-load ' + extraClass + '">\n\
      <i class="fa fa-spinner fa-spin"></i>\n\
    </div>'
    );
}

function showLoadSpinOver(divId, extraClass)
{
    $("#" + divId).append('<div class="well well-sm text-center pre-load ' + extraClass + '"><i class="fa fa-spinner fa-spin"></i></div>');
}

/**
 * remove o HTML do card que clicou para fechar ("fechando" o card)
 **/
function removeHtmlParentCard(evt)
{
    $(evt).parent().parent().html("");
}

/**
 * Variável global dos tipos de mensagem, para uso nas mensagens
 * @type type
 */
var _msg =
    {
        success: "success",
        danger: "danger",
        warning: "warning",
        info: "info"
    };

/**
 * Função para mostrar menssagen
 *
 * @param {string} divId - id sem #
 * @param {string} message
 * @param {bool} fadeOut
 * @param {string} typeMsg - success, danger, warning e info
 * @param {mthod} callback - function(){ method(parameter1, parameter2) }
 * @returns {string}
 */
function showMessage(divId, message, fadeOut, typeMsg, callback)
{
    var divMsg = '<div class="alert alert-' + typeMsg + '" role="alert">' + message + '</div>';

    $("#" + divId).html(divMsg);

    var time = 3000;
    if(typeMsg === _msg.success){
        time = 750;
    }

    if (fadeOut)
    {
        setTimeout(function () {
            $("#" + divId).children().fadeOut();
        }, time);
    }

    setTimeout(function () {
        callback();
    }, time);
}



/**** MODAL DE VIDEO ****/
function showVideoModal(url)
{
    $("#iframeVimeo").attr("src", url);
    $('#modalVideo').modal('show');
}

$('#modalVideo').on('hidden', function () {
    $("#iframeVimeo").attr("src", $("#iframeVimeo").src());
});
/**** FIM - MODAL DE VIDEO ****/

function rollScrollBarToLeft(idDivToExecute)
{
    var divContent = ".content-area";

    if (idDivToExecute) {
        divContent = "#" + idDivToExecute.replace("#", "");
    }

    $(divContent).jScrollPane();

    var api = $(divContent).data('jsp');

    api.scrollTo(0, 0);

    return false;
}

function rollScrollBarToEnd(idDivToExecute)
{
    var divContent = ".content-area";

    if (idDivToExecute) {
        divContent = "#" + idDivToExecute.replace("#", "");
    }

    var height = 9999999;

    $(divContent).jScrollPane();

    var api = $(divContent).data('jsp');

    api.scrollTo(0, height);

    return false;
}

/**
 * Recupera o calendário do dashboard
 * @param {string} divId
 * @param {date} dateSelected
 * @returns {unresolved}
 */
function listCalendarToDashboard(divId, dateSelected)
{
    var data = {
        parallel: true,
        method: "listCalendarToDashboard",
        divId: divId
//    dateSelected: dateSelected
    };

    showLoadSpin(data.divId);

    return requestDivToBackend("/controller/Calendar", data);
}


/**************************/
/****  LEARNING-INFO ******/
/**************************/
function drawNodeLearningInfo(id, scoreUser)
{
    var score = parseInt(scoreUser);

    var canvas = document.getElementById(id);
    var context = canvas.getContext('2d');

    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;

    var level1Ball = '#E10000';
    var level2Ball = '#E15A00';
    var level3Ball = '#DE8500';
    var level4Ball = '#DEAA12';
    var level5Ball = '#C5A22A';
    var level6Ball = '#CAB02A';
    var level7Ball = '#AEC021';
    var level8Ball = '#73AE19';
    var level9Ball = '#539B12';
    var level10Ball = '#33870C';

    var level1 = '#FF0000';
    var level2 = '#FF6600';
    var level3 = '#FC9700';
    var level4 = '#FCC115';
    var level5 = '#F1C40F';
    var level6 = '#FFD823';
    var level7 = '#C9DE26';
    var level8 = '#87CC1D';
    var level9 = '#6FAB14';
    var level10 = '#3EA50F';

    if (score >= 0 && score <= 10)
    {
        color = level1;
        colorBall = level1Ball;
    }
    else if (score > 10 && score <= 20)
    {
        color = level2;
        colorBall = level2Ball;
    }
    else if (score > 20 && score <= 30)
    {
        color = level3;
        colorBall = level3Ball;
    }
    else if (score > 30 && score <= 40)
    {
        color = level4;
        colorBall = level4Ball;
    }
    else if (score > 40 && score <= 50)
    {
        color = level5;
        colorBall = level5Ball;
    }
    else if (score > 50 && score <= 60)
    {
        color = level6;
        colorBall = level6Ball;
    }
    else if (score > 60 && score <= 70)
    {
        color = level7;
        colorBall = level7Ball;
    }
    else if (score > 70 && score <= 80)
    {
        color = level8;
        colorBall = level8Ball;
    }
    else if (score > 80 && score <= 90)
    {
        color = level9;
        colorBall = level9Ball;
    }
    else if (score > 90 && score <= 100)
    {
        color = level10;
        colorBall = level10Ball;
    }

    /************************* CIRCLE *************************/

    var radius = 50;

    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    context.fillStyle = colorBall;
    context.fill();

    /*********** TEXT ***********/

    score100 = centerX;

    if (score == 100) {
        score100 -= 12
    }

    context.font = "bold 25pt Open Sans";
    context.fillStyle = "white";
    context.fillText(score + "%", score100 - 30, centerY + 5);
    context.font = "13px Open Sans";
    context.fillText("Adequado", 50, centerY + 20);

    /*********** FILL BAR ***********/

    var radius = 58;

    var startAngleLearned = 1.5 * Math.PI;

    var counterClockwise = false;

    var endAngleLearned = startAngleLearned + ((2 * Math.PI) * score / 100);

    context.beginPath();
    context.arc(centerX, centerY, radius, startAngleLearned, endAngleLearned, counterClockwise);
    context.lineWidth = 16;

    context.strokeStyle = color;
    context.stroke();
}

/***** UPLOAD IMAGE ******/

function uploadImagemPlugin()
{
    $("#uploadimage").on('submit', (function (e) {
        e.preventDefault();
        $("#message").empty();
        $('#loading').show();
        $.ajax({
            url: "/controller/Student", // Url to which the request is send
            type: "POST", // Type of request to be send, called as method
            data: new FormData(this), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
            contentType: false, // The content type used when sending data to the server.
            cache: false, // To unable request pages to be cached
            processData: false, // To send DOMDocument or non processed data file it is set to false
            success: function (data)   // A function to be called if request succeeds
            {
                data = JSON.parse(data);

                if (data.code == "200") {
                    refresh();
                } else {
                    showMessage("student-alter-image-message", data.message, true, _msg.danger);
                }
            }
        });
    }));

    // Function to preview image after validation
    $(function () {
        $("#file").change(function () {
            $("#message").empty(); // To remove the previous error message
            var file = this.files[0];
            var imagefile = file.type;
            var match = ["image/jpeg", "image/png", "image/jpg", "image/bmp"];
            if (!((imagefile == match[0]) || (imagefile == match[1]) || (imagefile == match[2]) || (imagefile == match[3])))
            {
                $('#previewing').attr('src', '/lib/imgs/profile/default.png');
                $("#alert-upload-image").show();
                $("#button-submit-upload-image").attr("disabled", true);
                return false;
            }
            else
            {
                $("#alert-upload-image").hide();
                $("#button-submit-upload-image").attr("disabled", false);
                var reader = new FileReader();
                reader.onload = imageIsLoaded;
                reader.readAsDataURL(this.files[0]);
            }
        });
    });
}

function imageIsLoaded(e) {
    $("#file").css("color", "green");
    $('#image_preview').css("display", "block");
    $('#previewing').attr('src', e.target.result);
    $('#previewing').css('width', '208px');
    $('#previewing').css('height', '208px');
}

/******* MENSAGENS ********/
var textSubmit;

function verifyVideoIsRecord() {

    if (player.recorder.isRecording()) {
        player.recorder.stopDevice();
    }
}

function automaticForm(obj)
{

    var data = {
        callBackSuccess: "callbackAutomaticForm",
    };

    var $inputs = $("select", obj);
    $inputs.each(function () {
        data[this.name] = $(this).val();
    });

    var $inputs = $("input[type=hidden]", obj);
    $inputs.each(function () {
        data[this.name] = $(this).val();
    });

    var $inputs = $("input[type=text]", obj);
    $inputs.each(function () {
        data[this.name] = $(this).val();
    });

    var $inputs = $("input[type=radio]", obj);
    $inputs.each(function () {
        data[this.name] = $(this).filter(':checked').val();
    });

    var $textarea = $("textarea", obj);
    $textarea.each(function () {
        data[this.name] = replaceURLWithHTMLLinks($(this).val());
    });

    $(".alert", obj).slideUp();

    var submitButton = $('button[type=submit]', obj);
    if (submitButton) {
        textSubmit = submitButton.html();
        textLoading = data["loading_button"];
        if (!textLoading) {
            textLoading = "Salvando...";
        }
        submitButton.html(textLoading).attr("disabled", true);
    }

    requestDivToBackend(data["action"], data, obj);
}

function callbackAutomaticForm(objJson, obj)
{
    var submitButton = $('button[type=submit]', obj);
    if (submitButton) {
        submitButton.html(textSubmit).attr("disabled", false);
    }

    if (objJson.code == codigo.ok) {
        $(".alert-success", obj).html('<i class="fa fa-check-circle"></i> ' + objJson.message).slideDown();
        $(".modal-body textarea").val('');
        $("#thumb-video").html('');
        player.recorder.destroy();
    } else {
        $(".alert-danger", obj).html('<i class="fa fa-exclamation-triangle"></i> ' + objJson.message).slideDown();
    }
}

var magicSuggest = {};

function createMagicSugesst(id, urlController, placeholder)
{
    // cria div do container
    //$("#custom-ctn-div").append('<div id="custom-ctn-' + id + '" class="custom-ctn"><p>' + placeholder + ':</p></div>');

    magicSuggest[id] = $('#ms-list-' + id).magicSuggest({
        allowFreeEntries: false,
        data: '/controller/' + urlController,
        valueField: 'id',
        displayField: 'name',
        noSuggestionText: 'Nenhum resultado encontrado',
        placeholder: placeholder,
        dataUrlParams: {method: 'form-select'}
        //,selectionContainer: $('#custom-ctn-' + id),
        //selectionPosition: 'bottom',
        //toggleOnClick: true,
        //value: defaultValue,
    });

    $(magicSuggest[id]).on('beforeload', function (c) {
        var target = c.currentTarget.input;
        if ($(target).val() != "") {
            $(".ms-helper").html("carregando...").show();
        }
    });


    // cria regra para ao selecionar, mostrar a div (tira display: none)
    /*
     $(magicSuggest[id]).on('selectionchange', function(e,m) {

     $(divContainer).css("display", "inline");
     });
     */
}


/********** CHAT **********/

var refreshing;
var isLoadingChat = false;

/**
 * openChat
 **/
function openChat(idChat, jsonNames)
{
    $(".chats").each(function () {
        $(this).removeClass('chatSelected');
    });
    $("#boxChat_" + idChat).addClass('chatSelected').removeClass("naoLida");

    var data = {
        parallel: true,
        idChat: idChat,
        method: "getChat",
        callBackSuccess: "cb_openChat",
        names: jsonNames,
        divId: "boxToChat"
    };

    clearTimeout(refreshing);
    isLoadingChat = false;

    showLoadSpinNoWell(data.divId);

    return requestDivToBackend("/controller/Chat", data);
}

function cb_openChat(result)
{
    return;
    $("#boxToChat").html(result);

    $('#messagesInBoxOfChat').jScrollPane({
        horizontalGutter: 5,
        verticalGutter: 5,
        autoReinitialise: true
    });

    refreshing = setInterval("refreshChat()", 1000);
}

function callbackSendMessageModal(objJson, obj)
{
    var submitButton = $('button[type=submit]', obj);
    if (submitButton) {
        submitButton.html(textSubmit).attr("disabled", false);
    }

    if (objJson.code == codigo.ok) {
        $(".alert-success", obj).html('<i class="fa fa-check-circle"></i> ' + objJson.message).slideDown();
        setTimeout(function () {
            refresh();
        }, 1000);
    } else {
        $(".alert-danger", obj).html('<i class="fa fa-exclamation-triangle"></i> ' + objJson.message).slideDown();
    }
}

function callbackSendMessageInChat(objJson, obj)
{
    var names = $('#chat-names');

    var submitButton = $('button[type=submit]', obj);
    if (submitButton) {
        submitButton.html(textSubmit).attr("disabled", false);
    }

    if (objJson.code == codigo.ok) {
        openChat($('#idChat').val(), names.val());
    } else {
        $(".alert-danger", obj).html('<i class="fa fa-exclamation-triangle"></i> ' + objJson.message).slideDown();
    }
}
/** fim - openChat **/

/**
 * Função usada para criar a sessão e setar o perfil para uso
 *
 * @param {string} roleId
 *
 * @returns {undefined}
 */
function selectRole(roleId)
{
    var data = {
        parallel: true,
        method: 'chooseRole',
        roleId: roleId,
        callBackSuccess: 'callbackChooseRole'
    };

    showLoadSpin("view-moreroles-message");

    requestDivToBackend("/controller/Login", data);
}

/**
 * Função chamada no callback da escolha de papel
 *
 * @param {JSON} data
 *
 * @returns {undefined}
 */
function callbackChooseRole(data)
{
    if (data.code == '200') {
        refresh();
    } else {
        showMessage("view-moreroles-message", data.message, true, _msg.danger)
        alert(data.message);
    }
}

function adjustElementsIndex()
{
    var height = $(window).height();
    $('#side-bar-index').css('height', height);
    $('#index-copyright').css('top', height-380);
    $('#footer').css('bootom', 0);
}

var _tour = '';

function initTour(tour)
{
    _tour = tour;
    var data = {
        parallel: true,
        tour: tour._options.tour,
        method: 'verifyTour',
        callBackSuccess: 'callbackStartTour'
    };

    return requestDivToBackend("/controller/Tour", data);
}

function callbackStartTour(json)
{
    if (json.code != 200) {
        _tour.init();
        _tour.start();
    }
}

function seeBanner() {
    var data = {
        parallel: true,
        method: 'seeBanner'
    };

    requestDivToBackend('/controller/Tour', data);
}

/**
 * Função chamada para enviar msg da tela de listagem de coordenador no diretor
 * @param {string} name
 * @param {string} id
 * @returns {undefined}
 */
function showChatWithUserSelect(name, id)
{
    var itemSelected = '<div class="ms-sel-item ">' + name + '<span class="ms-close-btn"></span></div>';
    var inputSelected = '<div style="display: none;"><input type="hidden" name="idDestinatario[]" value="' + id + '"></div>';
    $("#boxSendMessage .ms-sel-ctn").append(itemSelected);
    $("#boxSendMessage .ms-sel-ctn").append(inputSelected);
    $("#boxSendMessage .ms-sel-ctn input[type=text]").prop('disabled', 'true');
    $("#boxSendMessage .ms-sel-ctn input[type=text]").prop('placeholder', '');
    $('#boxSendMessage').modal();
}

/**
 *
 * @param text
 * @returns {string|void|XML|*}
 */
function replaceURLWithHTMLLinks(text)
{
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;

    return text.replace(exp, function test(url) {
        return '<a href=' + url + '" target="_blank"><img style="margin: 10px" src="' + loadThumb(youTubeGetID(url)) + '"/></a>'
    });
}

/**
 *
 * @param text
 * @returns {string|void|XML|*}
 */
function getUrlsFromText(text)
{
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    var textWithEspecialCharacter = text.replace(exp,"::$1::");
    var things = textWithEspecialCharacter.split("::");

    var urlsArray = new Array();

    for (var i = 0; i < things.length; i++) {
        var partialString = things[i];

        if (partialString.indexOf("http") > -1) {
            urlsArray.push(partialString);
        }
    }

    return urlsArray;
}

function loadThumb(id){
    return 'http://img.youtube.com/vi/' + id + '/1.jpg';
};

function onPasteVideoUrlTextArea() {
    var arrayUrls = getUrlsFromText($(".modal-body textarea").val());

    $('#thumb-video').html('');

    for (var i = 0; i < arrayUrls.length; i++) {
        var url = arrayUrls[i];
        var videoId = youTubeGetID(url);
        $('#thumb-video').append('<img style="margin-right: 10px" src="' + loadThumb(videoId) + '"/>');
    }

}

/**
 * Get YouTube ID from various YouTube URL
 * @author: takien
 * @url: http://takien.com
 * For PHP YouTube parser, go here http://takien.com/864
 */
function youTubeGetID(url){
    var ID = '';
    url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if(url[2] !== undefined) {
        ID = url[2].split(/[^0-9a-z_\-]/i);
        ID = ID[0];
    } else {
        ID = url;
    }

    return ID;
}

/**
 * Verify if device is a touch device
 * @returns {boolean}
 */

function isTouchDevice() {
    return true == ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch);
}

/**
 * Retrieve cookie by name
 * @param cname
 * @returns {*}
 */
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


/**
 * Função chamada ao solicitar reset de senha no professor ou diretor
 * @returns {undefined}
 */
function resetPassStudent(loginAlvo) {
    var data = {
        method: "resetPassStudent",
        loginAlvo: loginAlvo,
        callBackSuccess: "callbackResetPassStudent"
    };

    requestDivToBackend("/controller/Student", data);
}

function callbackResetPassStudent(objJson) {

    if (isOk(objJson.code)) {
        $('#resetPassButton').attr("disabled", true);
        showMessage("newPassword",
            "Senha resetada com sucesso!", true, _msg.success,function () {
                $('#newPassword').html('Nova Senha: '+objJson.message)
            });
    }
    else {
        showMessage("newPassword",
            objJson.message, true, _msg.danger);
    }
}

function saveLocally(data,fileName) {
    var content_type = {type: "application/pdf"};
    var blob = new Blob([data], content_type);
    saveAs(blob,fileName);
}

function setHeadImage(doc){
    /* var c = document.createElement('canvas');
     var ctx = c.getContext('2d');

     var image = new Image();
     image.src = "../../lib/imgs/camaleon/logo_camaleon.jpeg";
     //image.src = "../../lib/imgs/bg.jpg";
     ctx.drawImage(image, 10, 10);
     var base64String = c.toDataURL();
     console.log(base64String);
     doc.addImage(base64String, 'jpeg', 15, 40, 200, 114);
   */
}

function getInitialPDFParams(){
    var pos = new Object();
    pos['x']=50;
    pos['y']=50;
    pos['pageCount'] = 1;

    return pos;
}

function getPoints(divPath){
    var map = new Object();

    var elements = $(divPath);

    for(x in elements){
        var el = elements[x];

        if(el.classList){
            if(el.className.includes('habilidade')){
                var children = el.children;
                var subcat = children[0].textContent;
                var categoria = children[1].textContent;
                if(categoria.startsWith("Assunto: ")){
                    categoria = categoria.replace("Assunto: ","");
                    subcat = subcat.replace("Tópico: ","");
                }else if(categoria.startsWith("Competência: ")){
                    categoria = categoria.replace("Competência: ","");
                    subcat = subcat.replace("Habilidade: ","");
                }


                if(categoria in map){
                    map[categoria].push(subcat);
                }else{
                    var array = new Array();
                    array.push(subcat);
                    map[categoria] = array;
                }
            }
        }
    }
    return map;
}

function sortMapByKey(map){
    return Object.keys(map).sort();
}

function printCurriculumTopics(pos, doc, map, assuntos){
    doc.setFontSize(11);

    for (o in assuntos) {
        var assunto = assuntos[o];

        doc.setFontStyle('bold');
        pos = addText(doc, pos, assunto.replace('Assunto: ', ''));
        var topics = map[assunto].sort();

        doc.setFontStyle('normal');
        for (t in topics) {
            var topic = topics[t];
            pos = addText(doc, pos, '\t'+topic.replace('Tópico: ', ''));
        }
        pos = addText(doc, pos, '\n');
    };
    return pos;
}

function addText(doc, pos, text){

    var lines;
    if(text == '\n'){
        lines = new Array();
        lines.push('\n');
    }else{
        lines = doc.splitTextToSize(text, 500);
    }

    for (var i = 0; i < lines.length; i++) {
        var currentMaxY = 800;
        var line = lines[i];

        if(pos['y'] >= currentMaxY){
            doc.addPage();
            pos['pageCount'] = pos['pageCount'] + 1;
            pos['y'] = 50;
        }else{
            pos['y'] = pos['y'] + 15;
        }

        doc.text(line, pos['x'], pos['y']);
    }
    return pos;
}

function printPoints() {
    var data = {
        stream: true,
        parallel: true,
        idClass: $('#classRoom-teacher-id-class').val(),
        idDisciplina: $('#class-room-select-discipline-teacher option:selected').val(),
        method: "printPoints",
        callBackSuccess: "saveLocally"
    };

    requestDivToBackend("/controller/Teacher", data,"points.pdf");
}

function readNotification(notificationId, url){
    var data = {
        parallel: true,
        notificationId: notificationId,
        method: "readNotification",
        callBackSuccess: function() {

            window.location.href = url;
        }

    };
    requestDivToBackend("/controller/Notification", data);

}

function verificarImportacao(id){
    let data = {
        method: "checkImportExcel",
        parallel: true,
        id: id,
        callBackSuccess: "callBackVerificarEnviarPlanilha"
    };

    requestDivToBackend("/controller/Secretary", data, id);
}

function callBackVerificarEnviarPlanilha(data, id){

    if(isOk(data.code)){
        $("#msg-carregando").addClass('green').text(data.message);
        $("#credentials").removeClass("hidden");
        $("#import_file_excel").val(null);
    }else if(data.code == "102"){
        $("#msg-carregando").text(data.message);
        let waitUntil = new Date().getTime() + 10*1000;
        while(new Date().getTime() < waitUntil) true;

        verificarImportacao(id);
    }else{
        $("#msg-carregando").addClass('red').text(data.message);
    }
}

function callBackEnviarPlanilha(data){
    let id = data.code;
    verificarImportacao(id);
    /*if(isOk(data.code)){           
        $("#msg-carregando").addClass('green').text(data.message);
        $("#credentials").removeClass("hidden");        
    }else{
        $("#msg-carregando").addClass('red').text(data.message);
    }

    $("#import_file_excel").val(null);*/
}

function enviarPlanilha(button, profile){
    $(button).attr("disabled");

    $("#msg-carregando")
        .removeClass("hidden")
        .text("Importando...");
    
    let data = {
        method: "importExcel",
        parallel: true,
        link: $(button).data('link').replace('s3.amazonaws.com/resources.camaleon', 'resources.camaleon.s3.amazonaws.com'),
        callBackSuccess: "callBackEnviarPlanilha"
    };

    if(profile == "Secretary"){
        requestDivToBackend("/controller/Secretary", data);
    }else{
        requestDivToBackend("/controller/Administrator", data);
    }

}

function baixarPlanilha(button){
    $('#'+button.id).attr("disabled");

    $("#msg-export")
        .removeClass("hidden")
        .text("Exportando...");

    let data = {
        method: "exportExcel",
        parallel: true,
        callBackSuccess: "callBackExportarPlanilha"
    };

    requestDivToBackend("/controller/Secretary", data);
}

function callBackExportarPlanilha(result){
    let url = result.message;
    $('#exportedFile').attr('href', url);

    verificarExportacao(url);
}

function verificarExportacao(url){
    let data = {
        method: "checkExportExcel",
        parallel: true,
        url: url,
        callBackSuccess: "callBackVerificarExportarPlanilha"
    };

    requestDivToBackend("/controller/Secretary", data, url);
}

function callBackVerificarExportarPlanilha(result, url){
    console.log('url: ' + url);
    console.log(result);
    if(isOk(result.code)){
        $("#msg-export").addClass('green').text(result.message);
        $("#exportedFile").removeClass("hidden");
    }else {
        $("#msg-export").text(result.message);
        let waitUntil = new Date().getTime() + 10*1000;
        while(new Date().getTime() < waitUntil) true;

        verificarExportacao(url);
    }
}

function callback_loadVideoByIdAndCurroculum(data){
    console.log(data);
    let videoData = data.message;
    switch (videoData.source){
        case "youtube":
            playYouTube(videoData.id);
            break

        case "vimeo":
            playVimeo(videoData.id);
            break;

        case "amazon":
            playAmazon(videoData.id);
            break;

        case "mesalva":
            $('#student-video-play-tv-title').html(videoData.title);
            playMeSalva(videoData.url)
            break;
    }
    watchVideo(videoData.id, null, null,videoData.source,videoData.subject,videoData.url);
}

function loadVideoByIdAndCurroculum(idVideo, idCurriculum) {
    var data = {
        method: "loadVideosByIdAndCurriculum",
        idCurriculum: idCurriculum,
        idVideo: idVideo,
        callBackSuccess: "callback_loadVideoByIdAndCurroculum"
    };

    showLoadSpin(data.divId);

    requestDivToBackend("/controller/Video", data);
}