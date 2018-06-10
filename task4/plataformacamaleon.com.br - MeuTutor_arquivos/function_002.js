/** JS TEACHER (professor) **/

/*** EXERCÍCIO ***/

var boxQuestionExerciseDefault =
//    '<div id="box-question" class="box-question col-md-12" ondrop="return dropQuestion(event)" ondragover="allowDropQuestion(event)">'+
'<div id="box-question" class="box-question col-md-11" style="margin: 26px">' +
'<div style="float: left; width: 19%; height: 94px; color: #a9a9a9; text-align: center; ">' +
'<i style="margin: 37px auto;" class="fa fa-th-list"></i>' +
'</div>' +
'<div class="text-center hidden-xs hidden-ms" style="float: left; width: 80%; height: 94px; color: #a9a9a9; border-left: 3px dashed #dcdcdc;" >' +
'<p style="margin-top: 15px; font-size: 12px;">' +
'<i class="fa fa-arrows margin-top-10px"></i>' +
'<h4>1 - Arraste e solte as questões e/ou vídeos aqui</h4>' +
'</p>' +
'</div>' +
'</div>';

/*** PLANO DE AULA ***/

var boxQuestionDefault =
'<div id="box-question" class="box-question  box-lesson-plan-45" ondrop="return dropQuestion(event)" ondragover="allowDropQuestion(event)">' +
'<div style="float: left; width: 19%; height: 94px; color: #a9a9a9; text-align: center; ">' +
'<i style="margin: 37px auto;" class="fa fa-th-list"></i>' +
'</div>' +
'<div class="text-center" style="float: left; width: 80%; height: 94px; color: #a9a9a9; border-left: 3px dashed #dcdcdc;" >' +
'<p style="margin-top: 34px; font-size: 12px;">Arraste a questão para aqui</p>' +
'</div>' +
'</div>';

var boxVideoDefault =
'<div id="box-video" class="box-video  box-lesson-plan-45" ondrop="return dropVideo(event)" ondragover="allowDropVideo(event)">' +
'<div class="text-center" style="float: left; width: 80%; border-right: 3px dashed #dcdcdc; height: 94px; color: #a9a9a9;" >' +
'<p style="margin-top: 34px; font-size: 12px;">Arraste o vídeo aqui</p>' +
'</div>' +
'<div style="float: left; width: 19%; height: 94px; color: #a9a9a9; text-align: center;">' +
'<i style="margin: 37px auto;" class="fa fa-video-camera"></i>' +
'</div>' +
'</div>';

var ballDefault =
'<div id="ball-default" class="spaceTransparent  box-lesson-plan-ball">' +
'<div class="line-ball"></div>' +
'<div id="ball-value" class="default-ball ball text-center"></div>' +
'</div>';


/******************* DASHBOARD *************************/
/**
 * Chamada no dashboard do professor
 */
 function initDashboard() {
    $.when(
        listClassesTeacherToDashboard()
        )
    .done(function () {
        $.when(
//      listMessageTeacherToDashboard(),
listFeedTeacherToDashboard()
)
        .done(function () {
            $.when(
//        listReportsLearningEvolutionTeacherToDashboard(),
//        listReportsEfectiveUseTeacherToDashboard()
)
            .done(function () {
                listCalendarToDashboard("dashboard-main-calendar-teacher");
            });
        });
    });
}

function listReportsLearningEvolutionTeacherToDashboard() {
    var data = {
        parallel: true,
        method: "listReportsLearningEvolutionTeacherToDashboard",
        divId: "dashboard-main-reports-learning-evolution"
    };

    showLoadSpin(data.divId);

    return requestDivToBackend("/controller/Reports", data);
}

function listReportsEfectiveUseTeacherToDashboard() {
    var data = {
        parallel: true,
        method: "listReportsEfectiveUseTeacherToDashboard",
        divId: "dashboard-main-reports-efective-use"
    };

    showLoadSpin(data.divId);

    return requestDivToBackend("/controller/Reports", data);
}
/** recupera as turmas de um professor **/
function listClassesTeacherToDashboard() {
    var data = {
        parallel: true,
        method: "listClassesTeacherToDashboard",
        //idCurriculum : $("#comboBox-subjects").val(),
        //idGrade : $("#id-grade-to-exercise").val(),
        divId: "dashboard-main-classes"
    };

    showLoadSpin(data.divId);

    return requestDivToBackend("/controller/ClassRoom", data);
}

/** recupera as mensagens de um professor **/
function listMessageTeacherToDashboard() {
    var data = {
        parallel: true,
        method: "listMessageTeacherToDashboard",
        divId: "dashboard-main-message"
    };

    showLoadSpin(data.divId);

    return requestDivToBackend("/controller/Message", data);
}

/** recupera os feed de um professor **/
function listFeedTeacherToDashboard() {
    var data = {
        parallel: true,
        method: "listFeedTeacherToDashboard",
        divId: "dashboard-main-feed"
    };

    showLoadSpin(data.divId);

    return requestDivToBackend("/controller/Feed", data);
}

function showInnerClassExerciseCard(id) {
    $('.professor-classroom-mainexercise-line').removeClass("active");
    $('#professor-classroom-mainexercise-line-' + id).addClass("active");
    $('.professor-classroom-innerexercise').hide();
    $('#professor-classroom-mainexercise-' + id).fadeIn();
}


/** relatorio - curva de aprendizado da turma (estatística de acesso) **/
function listReportsLearningCurseTeacherToDashboard() {
    var data = {
        parallel: true,
        method: "listReportsLearningCurseTeacherToDashboard",
        divId: "dashboard-main-reports-learning-curve",
        callBackSuccess: "createReportsLearningCurseTeacherToDashboard"
    };

    showLoadSpin(data.divId);

    return requestDivToBackend("/controller/Reports", data);
}

/** cria o relatorio da curva de aprendizado da turma **/
function createReportsLearningCurseTeacherToDashboard(result) {
    Highcharts.setOptions({
        colors: ['#A7C4EB', '#454548', '#AFEB82', '#E2A160']
    });

    $('#dashboard-main-highcharts-learning-curve').highcharts({
        chart: {
            backgroundColor: '#F5F5F5',
        },
        title: {
            text: "",
        },
        xAxis: [{
            categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
        }],
        yAxis: [{// Primary yAxis
            gridLineWidth: 1,
            title: {
                text: 'Acessos',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            }

        }, {// Secondary yAxis
            title: {
                text: 'Conhecimento',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            labels: {
                format: '{value} %',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            opposite: true
        }],
        tooltip: {
            shared: true
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            x: 120,
            verticalAlign: 'top',
            y: 80,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        series: [{
            name: 'Matématica',
            type: 'area',
            yAxis: 1,
            data: [9, 17, 18, 26, 33, 49, 53, 63, 77, 84, 88, 99],
            tooltip: {
                valueSuffix: ' %'
            }
        }, {
            name: 'Acessos',
            type: 'spline',
            yAxis: 0,
            data: [2, 10, 20, 14, 18, 19, 22, 31, 26, 29, 11, 18]
        }]
    });

}

/** relatorio - progresso das turmas na disciplina **/
function listReportsClassProgressTeacherToDashboard() {
    var data = {
        parallel: true,
        method: "listReportsClassProgressTeacherToDashboard",
        divId: "dashboard-main-reports-class-progress",
        callBackSuccess: "createReportsClassProgressTeacherToDashboard"
    };

    showLoadSpin(data.divId);

    return requestDivToBackend("/controller/Reports", data);
}

/** cria o relatorio da curva de aprendizado da turma **/
function createReportsClassProgressTeacherToDashboard(result) {
    $('#dashboard-main-highcharts-class-progress').highcharts({
        chart: {
            type: 'column',
            backgroundColor: '#F5F5F5'
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: [
            'Conhecendo os Números',
            'Naturais e Inteiros',
            'Repre. Núm. Racionais',
            'Probl. Núm. Racionais',
            'Raízes e Núm. Irracionais',
            'Expressões Algébricas',
            'Sequências',
            'Funções do 1º Grau',
            'Porcentagem',
            ]
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Taxa de Conhecimento ( % )'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'A',
            data: [49.9, 71.5, 16.4, 29.2, 44.0, 76.0, 35.6, 48.5, 16.4]

        }, {
            name: 'B',
            data: [83.6, 78.8, 98.5, 93.4, 96.0, 84.5, 75.0, 84.3, 91.2]

        }, {
            name: 'C',
            data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4]

        }, {
            name: 'D',
            data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6]

        }]
    });
}

/** recupera o calendario de um professor **/
//function listCalendarTeacherToDashboard(dateSelected)
//{
//
//  var data = {
//    parallel : true,
//    method : "listCalendarTeacherToDashboard",
//    divId : "dashboard-main-calendar",
//    dateSelected: dateSelected
//  };
//
//  showLoadSpinNoWell(data.divId);
//
//  return requestDivToBackend("/controller/Calendar", data);
//}

/******************* FIM - DASHBOARD *************************/


/**************************************************************** DND VIDEO *****************************************************************/
function allowDropVideo(ev) {
    ev.preventDefault();
}

/**
 * Ação de drag do vídeo
 **/
 function dragVideo(ev) {
    ev.dataTransfer.setData("text", ev.target.id);

    //remove a propriedade de drop da questão
    $("#box-question").attr("ondragover", "return");
    focusBoxVideo();
}

/**
 * Estiliza a área onde deve ser solto
 **/
 function focusBoxVideo() {
    $("#box-video").css("border", "3px dashed #30a58d");
    $("#box-video").css("background-color", "#F0FFF0");
    $("#box-video .text-center").css("border-right", "3px dashed #30a58d");
    $("#box-video .text-center").css("color", "#30a58d");
    $("#box-video i").css("color", "#30a58d");
    $(".default-ball").css("border", "3px solid #30a58d");
    $(".default-ball").css("background-color", "#F0FFF0");
}

/**
 * Ação de fim do drag do vídeo
 **/
 function dragEndVideo() {
    $("#box-question").attr("ondragover", "return allowDropQuestion(event)");
    unfocusBoxVideo();
}

/**
 * Remove o estilo de onde deve ser solto
 **/
 function unfocusBoxVideo() {
    $("#box-video").css("border", "3px dashed #dcdcdc");
    $("#box-video").css("background-color", "");
    $("#box-video .text-center").css("border-right", "3px dashed #dcdcdc");
    $("#box-video .text-center").css("color", "#a9a9a9");
    $("#box-video i").css("color", "#a9a9a9");
    $(".default-ball").css("border", "3px solid #a9a9a9");
    $(".default-ball").css("background-color", "#dcdcdc");
}

/**
 * Evento de drop de vídeo
 **/
 function dropVideo(event) {
    event.preventDefault();

    var data = event.dataTransfer.getData("text");
    var idBox = document.getElementById(data).id;
    var boxTransparent = "<div id='" + idBox + "-transparent' class='spaceTransparent box-lesson-plan-45'></div>"
    var videoBall = '<div class="spaceTransparent  box-lesson-plan-ball"><div class="line-ball"></div><div id="' + idBox + '-ball" class="ball idResourceLessonPlan video-ball text-center"></div></div>';
    var countBalls = 1;

    // Remove a classe para formatação
    $("#" + idBox).removeClass("col-md-6");
    $("#" + idBox).removeClass("col-lg-4");

    // Remove o atributo de DnD
    $("#" + idBox).attr("draggable", "false");

    // Adiciona classes para estilizar
    $("#" + idBox).addClass("box-line-grid-video");
    $("#" + idBox).addClass("box-lesson-plan-45");

    // Remove os default (box video, ball e box question)
    removeDefault();

    // Conta a quantidade de bolas
    var balls = $('#lesson-plan-resources .ball');

    balls.each(function () {
        countBalls += 1;
    });

    // Adiciona o conteúdo do vídeo com sua respectiva bola e espaço transparente
    $("#lesson-plan-resources .jspPane").append(document.getElementById(data));
    $("#lesson-plan-resources .jspPane").append(videoBall);
    $("#lesson-plan-resources .jspPane").append(boxTransparent);

    // Adiciona o número da bola do elemento arrastado
    $("#" + idBox + "-ball").html(countBalls);

    // Adiciona os default
    addDefault();

    // Adiciona a numeração do default
    $("#ball-default .default-ball").html(countBalls + 1);

    //recontagem do número de vídeos ao remover da lista
    var countQuestions = $("#teacher-lesson-plan-list-videos-count").html();
    var countQuestionsAsExercise = $("#teacher-lesson-plan-count-videos").val();

    countQuestions -= 1;
    countQuestionsAsExercise = parseInt(countQuestionsAsExercise) + 1;

    $("#teacher-lesson-plan-list-videos-count").html(countQuestions);
    $("#teacher-lesson-plan-count-videos").val(countQuestionsAsExercise);

    rollScrollBarToEnd("#lesson-plan-resources");

    /*if(countBalls % 5 == 0 )
     {
     var balls = $('#line-plan .ball');

     console.log(balls);

     // conta a quantidade de bolas
     balls.each(function()
     {
     console.log(this.id);
     var box = this.id.replace("-ball", "");
     $("#" + this.id).parent().css("height", "40px");
     $("#" + box + "-transparent").css("height", "40px");;
     $("#" + box).hide();
     });
 }*/

}

function addVideoInDropEnd(idVideo) {
    var boxTransparent = "<div id='" + idVideo + "-transparent' class='spaceTransparent box-lesson-plan-45'></div>"
    var videoBall = '<div class="spaceTransparent  box-lesson-plan-ball"><div class="line-ball"></div><div id="' + idVideo + '-ball" class="ball idResourceLessonPlan video-ball text-center"></div></div>';

    var countBalls = 1;

    // Remove a classe para formatação
    $("#" + idVideo).removeClass("col-md-6");
    $("#" + idVideo).removeClass("col-lg-4");

    // Remove o atributo de DnD
    $("#" + idVideo).attr("draggable", "false");

    // Adiciona classes para estilizar
    $("#" + idVideo).addClass("box-line-grid-video");
    $("#" + idVideo).addClass("box-lesson-plan-45");

    // Remove os default (box video, ball e box question)
    removeDefault();

    // Conta a quantidade de bolas
    var balls = $('#lesson-plan-resources .ball');

    balls.each(function () {
        countBalls += 1;
    });

    // Adiciona o conteúdo do vídeo com sua respectiva bola e espaço transparente
    $("#lesson-plan-resources .jspPane").append($("#" + idVideo));
    $("#lesson-plan-resources .jspPane").append(videoBall);
    $("#lesson-plan-resources .jspPane").append(boxTransparent);

    // Adiciona o número da bola do elemento arrastado
    $("#" + idVideo + "-ball").html(countBalls);

    // Adiciona os default
    addDefault();

    // Adiciona a numeração do default
    $("#ball-default .default-ball").html(countBalls + 1);

    //recontagem do número de vídeos ao remover da lista
    var countQuestions = $("#teacher-lesson-plan-list-videos-count").html();
    var countQuestionsAsExercise = $("#teacher-lesson-plan-count-videos").val();

    countQuestions -= 1;
    countQuestionsAsExercise = parseInt(countQuestionsAsExercise) + 1;

    $("#teacher-lesson-plan-list-videos-count").html(countQuestions);
    $("#teacher-lesson-plan-count-videos").val(countQuestionsAsExercise);

    rollScrollBarToEnd("#lesson-plan-resources");

    restartContentArea();
}

/**
 * Evento chamado ao excluir da lista do plano de aula, retornando para a listagem
 **/
 function returnToListVideos(idVideo) {
    if (!document.getElementById("teacher-lesson-plan-list-videos-count")) {
        alert("aguarde o carregamento completo da página");
    }
    else {
        var countBalls = 1;

        // processo inverso ao do drop
        $("#" + idVideo).removeClass("box-line-grid-video");
        $("#" + idVideo).removeClass("box-lesson-plan-45");
        $("#" + idVideo).addClass("col-lg-4 col-md-6");
        $("#" + idVideo).attr("draggable", "true");

        // remove o espaço transparent e a bola respectiva ao nó
        $("#" + idVideo + "-transparent").remove();
        $("#" + idVideo + "-ball").parent().remove();

        // o adiciona no fim da listagem
        $("#listVideos .jspContainer .jspPane").append($("#" + idVideo));

        var balls = $('#lesson-plan-resources .ball');

        // reorganiza os números das bolas após a remoção do nó
        balls.each(function () {
            $("#" + this.id).html(countBalls);
            countBalls += 1;
        })

        //recontagem da quantidade de vídeos ao devolver a lista
        var countQuestions = $("#teacher-lesson-plan-list-videos-count").html();
        var countQuestionsAsExercise = $("#teacher-lesson-plan-count-videos").val();

        countQuestionsAsExercise -= 1;
        countQuestions = parseInt(countQuestions) + 1;

        $("#teacher-lesson-plan-list-videos-count").html(countQuestions);
        $("#teacher-lesson-plan-count-videos").val(countQuestionsAsExercise);

        restartContentArea();
    }
}

/**************************************************************** DND QUESTION *****************************************************************/
function allowDropQuestion(ev) {
    ev.preventDefault();
}

function dragQuestion(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    $("#box-video").attr("ondragover", "return");
    focusBoxQuestion();
    restartContentArea();
}

function focusBoxQuestion() {
    $("#box-question").css("border", "3px dashed #2099c0");
    $("#box-question").css("background-color", "#F0FFFF");
    $("#box-question .text-center").css("border-left", "3px dashed #2099c0");
    $("#box-question .text-center").css("color", "#2099c0");
    $("#box-question i").css("color", "#2099c0");
    $(".default-ball").css("border", "3px solid #2099c0");
    $(".default-ball").css("background-color", "#F0FFFF");
}

function dragEndQuestion() {
    $("#box-video").attr("ondragover", "return allowDropVideo(event)");
    unfocusBoxQuestion();
    restartContentArea();
}

function unfocusBoxQuestion() {
    $("#box-question").css("border", "3px dashed #dcdcdc");
    $("#box-question").css("background-color", "");
    $("#box-question .text-center").css("border-left", "3px dashed #dcdcdc");
    $("#box-question .text-center").css("color", "#a9a9a9");
    $("#box-question i").css("color", "#a9a9a9");
    $(".default-ball").css("border", "3px solid #a9a9a9");
    $(".default-ball").css("background-color", "#dcdcdc");
}

function removeDefault() {
    $("#box-question").remove();
    $("#ball-default").remove();
    $("#box-video").remove();
}

function addDefault() {
    $("#lesson-plan-resources .jspPane").append(boxVideoDefault);
    $("#lesson-plan-resources .jspPane").append(ballDefault);
    $("#lesson-plan-resources .jspPane").append(boxQuestionDefault);
}

function dropQuestion(event) {
    event.preventDefault();

    var data = event.dataTransfer.getData("text");
    var idBox = document.getElementById(data).id;
    var boxTransparent = "<div id='" + idBox + "-transparent' class='spaceTransparent box-lesson-plan-45'></div>";
    var questionBall = '<div class="spaceTransparent box-lesson-plan-ball"><div class="line-ball"></div><div id="' + idBox + '-ball" class="ball idResourceLessonPlan question-ball text-center"></div></div>';
    var countBalls = 1;

    $("#" + idBox).removeClass("col-md-12");
    $("#" + idBox).removeClass("border-bottom-black");
    $("#" + idBox).removeClass("border-bottom-dcdcdc");
    $("#" + idBox).addClass("box-line-grid-question");
    $("#" + idBox).addClass("box-lesson-plan-45");
    $("#" + idBox).attr("draggable", "false");

    $("#" + idBox + " .data-grid-question").removeClass("col-md-11");

    removeDefault();

    var balls = $('#lesson-plan-resources .ball');

    balls.each(function () {
        countBalls += 1;
    });

    $("#lesson-plan-resources .jspPane").append(boxTransparent);
    $("#lesson-plan-resources .jspPane").append(questionBall);
    $("#lesson-plan-resources .jspPane").append(document.getElementById(data));

    $("#" + idBox + "-ball").html(countBalls);

    addDefault();
    $("#ball-default .default-ball").html(countBalls + 1);

    var countQuestions = $("#teacher-lesson-plan-list-questions-count").html();
    var countQuestionsAsExercise = $("#teacher-lesson-plan-count-questions").val();

    countQuestions -= 1;
    countQuestionsAsExercise = parseInt(countQuestionsAsExercise) + 1;

    $("#teacher-lesson-plan-list-questions-count").html(countQuestions);
    $("#teacher-lesson-plan-count-questions").val(countQuestionsAsExercise);

    rollScrollBarToEnd("#lesson-plan-resources");

    $("#ball-default .default-ball").html(countBalls + 1);

    var countQuestions = $("#teacher-lesson-plan-list-questions-count").html();
    var countQuestionsAsExercise = $("#teacher-lesson-plan-count-questions").val();

    countQuestions -= 1;
    countQuestionsAsExercise = parseInt(countQuestionsAsExercise) + 1;

    $("#teacher-lesson-plan-list-questions-count").html(countQuestions);
    $("#teacher-lesson-plan-count-questions").val(countQuestionsAsExercise);

    rollScrollBarToEnd("#lesson-plan-resources");
}

function addQuestionInDropEnd(idQuestion) {
    var StrippedString = OriginalString.replace(/(<([^>]+)>)/ig, "");
    var boxTransparent = "<div id='" + idQuestion + "-transparent' class='spaceTransparent box-lesson-plan-45'></div>";
    var questionBall = '<div class="spaceTransparent box-lesson-plan-ball"><div class="line-ball"></div><div id="' + idQuestion + '-ball" class="ball idResourceLessonPlan question-ball text-center"></div></div>';

    var countBalls = 1;

    $("#" + idQuestion).removeClass("col-md-12");
    $("#" + idQuestion).removeClass("border-bottom-black");
    $("#" + idQuestion).removeClass("border-bottom-dcdcdc");
    $("#" + idQuestion).addClass("box-line-grid-question");
    $("#" + idQuestion).addClass("box-lesson-plan-45");
    $("#" + idQuestion).attr("draggable", "false");

    $("#" + idQuestion + " .data-grid-question").removeClass("col-md-11");

    removeDefault();

    var balls = $('#lesson-plan-resources .ball');

    balls.each(function () {
        countBalls += 1;
    });

    $("#lesson-plan-resources .jspPane").append(boxTransparent);
    $("#lesson-plan-resources .jspPane").append(questionBall);
    $("#lesson-plan-resources .jspPane").append($("#" + idQuestion));

    $("#" + idQuestion + "-ball").html(countBalls);

    addDefault();
    $("#ball-default .default-ball").html(countBalls + 1);

    var countQuestions = $("#teacher-lesson-plan-list-questions-count").html();
    var countQuestionsAsExercise = $("#teacher-lesson-plan-count-questions").val();

    countQuestions -= 1;
    countQuestionsAsExercise = parseInt(countQuestionsAsExercise) + 1;

    $("#teacher-lesson-plan-list-questions-count").html(countQuestions);
    $("#teacher-lesson-plan-count-questions").val(countQuestionsAsExercise);

    rollScrollBarToEnd("#lesson-plan-resources");

    $("#ball-default .default-ball").html(countBalls + 1);

    var countQuestions = $("#teacher-lesson-plan-list-questions-count").html();
    var countQuestionsAsExercise = $("#teacher-lesson-plan-count-questions").val();

    countQuestions -= 1;
    countQuestionsAsExercise = parseInt(countQuestionsAsExercise) + 1;

    $("#teacher-lesson-plan-list-questions-count").html(countQuestions);
    $("#teacher-lesson-plan-count-questions").val(countQuestionsAsExercise);

    rollScrollBarToEnd("#lesson-plan-resources");

    restartContentArea();
}

function returnToListQuestions(idQuestion) {
    if (!document.getElementById("teacher-lesson-plan-list-questions-count")) {
        alert("aguarde o carregamento completo da página");
    }
    else {
        var countBalls = 1;

        $("#" + idQuestion).removeClass("box-line-grid-question");
        //NO EDIT
        $("#" + idQuestion).removeClass("box-lesson-plan-45");
        $("#" + idQuestion).addClass("border-bottom-dcdcdc");
        $("#" + idQuestion).addClass("col-md-12");
        $("#" + idQuestion).addClass("border-bottom-black");
        $("#" + idQuestion).attr("draggable", "true");

        $("#" + idQuestion + " .data-grid-question").addClass("col-md-11");

        $("#" + idQuestion + "-transparent").remove();
        $("#" + idQuestion + "-ball").parent().remove();

        $("#listQuestions .jspContainer .jspPane").append($("#" + idQuestion));

        var balls = $('#lesson-plan-resources .ball');

        balls.each(function () {
            $("#" + this.id).html(countBalls);
            countBalls += 1;
        });

        var countQuestions = $("#teacher-lesson-plan-list-questions-count").html();
        var countQuestionsAsExercise = $("#teacher-lesson-plan-count-questions").val();

        countQuestionsAsExercise -= 1;
        countQuestions = parseInt(countQuestions) + 1;

        $("#teacher-lesson-plan-list-questions-count").html(countQuestions);
        $("#teacher-lesson-plan-count-questions").val(countQuestionsAsExercise);

        restartContentArea();
    }
}

/************************** EXERCÍCIO *********************************/

function newExercise(idGrade, idCourse) {
    var data = {
        parallel: true,
        method: "newExercise",
        idGrade: idGrade,
        idCurriculum: $("#select-view-create-exercise").val(),
        divId: "exercise-create-principal",
        idCourse: idCourse
    };
    showLoadSpin(data.divId);

    requestDivToBackend("/controller/Exercise", data);
}

function addQuestions() {
    $("#listQuestionOnDrag").show();
}

function enableOthersClasses(div) {
    var value = $("#" + div.id).val();

    $("#otherClasses").fadeOut();

    if (value == "true") {
        $("#otherClasses").fadeIn();
    }
}


/******************* CARDS ARVORE *************************/


/**
 * abrir sub menu da arvore selecionada
 **/
 function openTreeSubMenu(idCurriculum, idClass, idGrade, idCourse, issueCurriculum, issueDomain, percentage) {
    $("#nodeInfo-col-dir").removeClass("hidden");

    //REMOVER AS PROXIMAS TRES LINHAS QUANDO AJUSTAR A INCLUSAO DE VIDEOS NA PLATAFORMA
    $("#card-lesson-plan-tree-teacher").addClass("hidden");
    $("#card-videos-tree-teacher").addClass("hidden");
    $("#card-question-tree-teacher").addClass("hidden");    
    
    //REMOVER OS COMENTARIOS DAS PROXIMAS TRES LINHAS QUANDO AJUSTAR A INCLUSAO DE VIDEOS NA PLATAFORMA
    //cardLessonPlanTeacher(idCurriculum, idClass, idGrade, idCourse, issueCurriculum, issueDomain);
    //cardVideosTeacher(idCurriculum);
    //cardQuestionsTeacher(idCurriculum);
    cardExercisesTeacher(idCurriculum, idClass, idGrade, idCourse, issueCurriculum, issueDomain, true);

    var divActiveCanvas = '<canvas id="canvas_' + idCurriculum + '_active" width="80" height="80" class="node node-active"></canvas>';

    $(".node-active").remove();
    $(".canvas canvas").show();
    $(".lineTree p").css("font-weight", "normal");
    $("#canvas_" + idCurriculum).hide();
    $("#sCanvas_" + idCurriculum).append(divActiveCanvas);
    drawNodeTeacherActive(idCurriculum + '_active', percentage);
    $("#" + idCurriculum + " p").css("font-weight", "bold");

    scrollToTop();
    /*
     cardExercisesTeacher(idNode);
     cardMissionTeacher(idNode);
     */
 }

/**
 * recupera os exercicios do assunto da arvore (professor)
 **/

 function cardExercisesTeacher(idCurriculum, idClass, idGrade, idCourse, issueCurriculum, issueDomain, isTree) {
    var data = {
        parallel: true,
        idCurriculum: idCurriculum,
        idClass: idClass,
        idGrade: idGrade,
        idCourse: idCourse,
        issueCurriculum: issueCurriculum,
        issueDomain: issueDomain,
        method: "loadListOfExercisesRistred",
        divId: "card-exercises-tree-teacher",
        isTree: isTree
    };

    showLoadSpin(data.divId);

    requestDivToBackend("/controller/Exercise", data);
}

/**
 * recupera as missoes do assunto da arvore (professor)
 **/
 function cardMissionTeacher(idNode) {
    var data = {
        idNode: idNode,
        divId: "card-mission-tree-teacher",
    };

    requestDivToBackend("/controller/CardMissionTeacher", data);
}

/**************************************************************** CARD LESSON PLAN **********************************************************/

// lista os planos de aula
function cardLessonPlanTeacher(idCurriculum, idClass, idGrade, idCourse, issueCurriculum, issueDomain) {
    var data = {
        parallel: true,
        idCurriculum: idCurriculum,
        idClass: idClass,
        idGrade: idGrade,
        idCourse: idCourse,
        issueCurriculum: issueCurriculum,
        issueDomain: issueDomain,
        method: "listLessonPlanByCurriculumToTeacher",
        divId: "card-lesson-plan-tree-teacher"
    };

    showLoadSpin(data.divId);

    requestDivToBackend("/controller/LessonPlan", data);
}

/**************************************************************** CARD VIDEO *****************************************************************/

function cardVideosTeacher(idCurriculum) {
    var data = {
        parallel: true,
        idCurriculum: idCurriculum,
        divId: "card-videos-tree-teacher"
    };

    showLoadSpin(data.divId, "top-five-plus");

    requestDivToBackend("/controller/CardVideosTeacher", data);
}

/**************************************************************** CARD QUESTION *****************************************************************/

function cardQuestionsTeacher(idCurriculum) {
    var data = {
        parallel: true,
        idCurriculum: idCurriculum,
        divId: "card-question-tree-teacher"
    };

    showLoadSpin(data.divId, "top-five-plus background-card-question");

    requestDivToBackend("/controller/CardQuestionsTeacher", data);
}

/******************* END - CARDS ARVORE *************************/

/**************************************************************** DND EXERCISE *****************************************************************/
function allowDropExercise(ev) {
    ev.preventDefault();
}

function addQuestionInExercise(idQuestion) {
    $("#box-question").remove();

    var idExercise = "#" + idQuestion;

    $(idExercise + " .data-grid-question").removeClass("col-md-11");
    $(idExercise + " .data-grid-question").addClass("col-md-12");

    $(idExercise).addClass("idResourceExercise");

    $("#exercise-resources .jspContainer .jspPane").append($(idExercise));
    $(idExercise).attr("draggable", "false");

    $("#exercise-resources .jspPane").append(boxQuestionExerciseDefault);

    var countQuestions = $("#list-questions-count").html();
    var countQuestionsAsExercise = $("#teacher-exercise-list-questions-number-question-exercise").html();

    countQuestions -= 1;
    countQuestionsAsExercise = parseInt(countQuestionsAsExercise) + 1;

    $("#list-questions-count").html(countQuestions);
    $("#teacher-exercise-list-questions-number-question-exercise").html(countQuestionsAsExercise);

    if ($("#teacher-exercise-list-questions-number-question-exercise").html() > 2) {
        $("#teacher-exercise-register-exercise-button").show();
        $("#teacher-exercise-edit-exercise-button").show();
    } else {
        $("#teacher-exercise-register-exercise-button").hide();
        $("#teacher-exercise-edit-exercise-button").hide();
    }

    rollScrollBarToEnd("exercise-resources");
}

function dragExercise(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function dropExercise(event) {
    event.preventDefault();

    $("#box-question").remove();

    var data = event.dataTransfer.getData("text");
    var idExercise = "#" + document.getElementById(data).id;

    $(idExercise + " .data-grid-question").removeClass("col-md-11");
    $(idExercise + " .data-grid-question").addClass("col-md-12");

    $(idExercise).addClass("idResourceExercise");

    $("#exercise-resources .jspContainer .jspPane").append(document.getElementById(data));
    $(idExercise).attr("draggable", "false");

    $("#exercise-resources .jspPane").append(boxQuestionExerciseDefault);

    var countQuestions = $("#list-questions-count").html();
    var countQuestionsAsExercise = $("#teacher-exercise-list-questions-number-question-exercise").html();

    countQuestions -= 1;
    countQuestionsAsExercise = parseInt(countQuestionsAsExercise) + 1;

    $("#list-questions-count").html(countQuestions);
    $("#teacher-exercise-list-questions-number-question-exercise").html(countQuestionsAsExercise);

    if ($("#teacher-exercise-list-questions-number-question-exercise").html() > 2) {
        $("#teacher-exercise-register-exercise-button").show();
        $("#teacher-exercise-edit-exercise-button").show();
    } else {
        $("#teacher-exercise-register-exercise-button").hide();
        $("#teacher-exercise-edit-exercise-button").hide();
    }

    rollScrollBarToEnd("exercise-resources");
}

/*
 var countBalls = 1;

 $("#" + idQuestion).removeClass("box-line-grid-question");
 //NO EDIT
 $("#" + idQuestion).removeClass("col-md-5");
 $("#" + idQuestion).addClass("border-bottom-dcdcdc");
 $("#" + idQuestion).addClass("col-md-12");
 $("#" + idQuestion).addClass("border-bottom-black");
 $("#" + idQuestion).attr("draggable", "true");

 $("#" + idQuestion + "-transparent").remove();
 $("#" + idQuestion + "-ball").parent().remove();

 $("#listQuestions .jspContainer .jspPane").append($("#" + idQuestion));

 var balls = $('#lesson-plan-resources .ball');

 balls.each(function() {
 $("#" + this.id).html(countBalls);
 countBalls += 1;
 });

 restartContentArea();
 */

 function returnToListExercise(idExercise) {
    $("#" + idExercise + " .data-grid-question").removeClass("col-md-12");
    $("#" + idExercise + " .data-grid-question").addClass("col-md-11");

    $("#" + idExercise).attr("draggable", "true");
    $("#listQuestionsExercise .jspContainer .jspPane").append($("#" + idExercise));

    var countQuestions = $("#list-questions-count").html();
    var countQuestionsAsExercise = $("#teacher-exercise-list-questions-number-question-exercise").html();

    countQuestionsAsExercise -= 1;
    countQuestions = parseInt(countQuestions) + 1;

    $("#list-questions-count").html(countQuestions);
    $("#teacher-exercise-list-questions-number-question-exercise").html(countQuestionsAsExercise);

    if ($("#teacher-exercise-list-questions-number-question-exercise").html() > 2) {
        $("#teacher-exercise-register-exercise-button").show();
        $("#teacher-exercise-edit-exercise-button").show();
    } else {
        $("#teacher-exercise-register-exercise-button").hide();
        $("#teacher-exercise-edit-exercise-button").hide();
    }
    restartContentArea();
}

function resetCardsAuxLessonPlan() {
    $("#lesson-plan-main-column-aux-one").empty();
    $("#lesson-plan-main-column-aux-two").empty();
}

// lista os planos de aula
function listLessonPlanByCurriculum(nameCourse, idCurriculum, idCourse) {
    var data = {
        parallel: true,
        idCurriculum: idCurriculum,
        idGrade: $("#id-grade-to-lesson-plan").val(),
        method: "listLessonPlanByCurriculum",
        divId: "lesson-plan-main-principal",
        nameCourse: nameCourse,
        assunto: $("#comboBox-subjects :selected").html(),
        idCourse: idCourse
    };
    resetCardsAuxLessonPlan();

    showLoadSpin(data.divId);

    requestDivToBackend("/controller/LessonPlan", data);
}

/**
 * função chamada ao clicar em salvar plano de aula, faz um each nas turmas selecionadas,
 * each nos idResourceLessonPlan(questões e vídeos), e each nas datas para os planos de aula em cada turma.
 *
 * @param {bool} isEdit
 * @returns {undefined}
 */
 function saveFeatureSequency(isEdit) {
    var method = "saveFeatureSequency";
    var methodCallback = "successCreatedLessonPlan";

    if (isEdit) {
        method = "saveEditFeatureSequency";
        methodCallback = "successSaveLessonPlan";
    }

    var data = {
        method: method,
        idResourceSequencing: $("#lesson-plan-edit-id").val(),
        idCurriculum: $("#id-curriculum-to-lesson-plan").val(),
        statement: $("#lesson-plan-register-name").val(),
        callBackSuccess: methodCallback
    };

    var endDates = new Array();
    var startDates = new Array();
    var arrayClasses = new Array();
    var idsResources = new Array();


    $("#lesson-plan-register-classes label.active").each(function () {
        arrayClasses.push(this.id);
    });

    $("#lesson-plan-resources .idResourceLessonPlan").each(function () {
        idsResources.push(this.id.replace("-ball", ""));
    });

    $("#lesson-plan-register-description-date .start-date").each(function () {
        startDates.push(this.value);
    });

    $("#lesson-plan-register-description-date .end-date").each(function () {
        endDates.push(this.value);
    });

    data["endDate"] = endDates;
    data["startDate"] = startDates;
    data["idClasses"] = arrayClasses;
    data["idResourceOrdenados"] = idsResources;

    // esconde a messagem
    $("#lesson-plan-message").hide();

    // esconde o botao de cadastro
    $("#lesson-plan-button").hide();

    // mostra o carregando
    $("#lesson-plan-info-loading").show();

    requestDivToBackend("/controller/LessonPlan", data);
}

/**
 * callback da criacao de um plano de aula
 **/
 function successCreatedLessonPlan(objJson) {
    // esconde o carregando
    $("#lesson-plan-info-loading").hide();
    $("#lesson-plan-message").show();

    if (isOk(objJson.code)) {
        showMessage("lesson-plan-message", objJson.message, true, _msg.success, function () {
            historyBack();
        });
    }
    else {
        showMessage("lesson-plan-message", objJson.message, true, _msg.danger, function () {
            $("#lesson-plan-message").hide();
            $("#lesson-plan-button").show();
        });
    }
}


/**
 * callback do salvamento de plano de aula
 *
 * @param {json} objJson
 * @returns {undefined}
 */
 function successSaveLessonPlan(objJson) {
    // esconde o carregando
    $("#lesson-plan-info-loading").hide();
    $("#lesson-plan-message").show();

    if (isOk(objJson.code)) {
        showMessage("lesson-plan-message", objJson.message, true, _msg.success, function () {
            historyBack();
        });
    }
    else {
        showMessage("lesson-plan-message", objJson.message, true, _msg.danger, function () {
            $("#lesson-plan-message").hide();
            $("#lesson-plan-button").show();
        });
    }
}

// lista os exercícios
function listExercise() {
    var data = {
        method: "list",
        divId: "exercise-main-principal"
    };

    requestDivToBackend("/controller/Exercise", data);
}

// card de exercício
function loadCreateTest() {
    var data = {
        method: "create",
        divId: "main-exercise-create"
    };

    requestDivToBackend("/controller/Exercise", data);
}

// insere o panel de criação de plano de aula
function panelLessonPlan() {
    var data = {
        parallel: true,
        method: "panelLessonPlan",
        divId: "panel-lesson-plan-teacher"
    };

    requestDivToBackend("/controller/LessonPlan", data);
}

// insere os card de questões
function listQuestions(idCurriculum, listResource) {
    var data = {
        parallel: true,
        method: "listQuestions",
        idCurriculum: idCurriculum,
        listResource: listResource,
        divId: "lesson-plan-main-column-aux-one",
        callBackSuccess: "callBackDateLessonPlan"
    };

    showLoadSpin(data.divId);

    requestDivToBackend("/controller/LessonPlan", data);
}

function callBackDateLessonPlan() {
    $("#lesson-plan-register-classes label").removeClass("disabled");
}

// insere o card de vídeos
function listVideos(idCurriculum, listResource) {
    var data = {
        parallel: true,
        method: "listVideos",
        idCurriculum: idCurriculum,
        listResource: listResource,
        divId: "lesson-plan-main-column-aux-two"
    };

    showLoadSpin(data.divId);

    requestDivToBackend("/controller/LessonPlan", data);
}

// Insere um combobox para seleção de assunto no plano de aula
function listOfSubjectsToCourse() {
    var data = {
        idCourse: $("#id-course-to-lesson-plan").val(),
        method: "listOfSubjectsToCourse",
        divId: "lesson-plan-main-subjects",
        nameCourse: $("#teacher-lesson-plan-name-course").val()
    };

    requestDivToBackend("/controller/LessonPlan", data);
}

// Listagem dos planos de aula
function mainLessonPlan(idGrade, idCourse) {
    var data = {
        method: "mainLessonPlan",
        idCourse: idCourse,
        idGrade: idGrade,
        divId: "page-content-wrapper"
    };

    showLoadSpin(data.divId);

    requestDivToBackend("/controller/LessonPlan", data);
}

// Detalhamento de plano de aula
function detailsLessonPlan(idResourceSequencing, idCurriculum, assunto, nameCourse, idCourse) {
    var data = {
        method: "detailsLessonPlan",
        idResourceSequencing: idResourceSequencing,
        idCurriculum: idCurriculum,
        idGrade: $("#id-grade-to-lesson-plan").val(),
        divId: "lesson-plan-main-column-aux-one",
        assunto: assunto,
        nameCourse: nameCourse,
        idCourse: idCourse
    };

    showLoadSpin(data.divId);

    requestDivToBackend("/controller/LessonPlan", data);
}

// Insere o grid de edição do plano de aula
function showEditLessonPlan(idCurriculum, idGrade, idResourceSequencing, nameCourse, assunto, idCourse) {
    var data = {
        method: "detailsLessonPlan",
        idCurriculum: idCurriculum,
        idGrade: idGrade,
        idResourceSequencing: idResourceSequencing,
        edit: true,
        divId: "lesson-plan-line",
        callBackSuccess: "callBackEditLessonPlan",
        assunto: assunto,
        nameCourse: nameCourse,
        idCourse: idCourse
    };

    showLoadSpin(data.divId);

    requestDivToBackend("/controller/LessonPlan", data);
}

function callBackEditLessonPlan() {
    rollScrollBarToEnd();
}

/**
 * Quando uma turma é selecionada ele adiciona em uma div logo abaixo
 * junto de campos pre-preenchidos com a data do plano de disciplinas
 *
 * esta função é específica para o assessment pois a logista de datas
 * é diferente
 *
 * @param {elementHtml} input
 * @param {string} date
 * @returns {div com o nome da turma e campos de startDate e endDate}
 */

 function addDetailsDateToAssessment(element, isCustomized) {
    var idClass = element.id;

    var statement = element.getAttribute('classRoom');

    var divClassesAssessment = (isCustomized) ? "#assessment-customized-register-classes" : "#assessment-register-classes";

    var divInsertDate = (isCustomized) ? "assessment-customized-register-description-date" : "assessment-register-description-date";

    var idCurriculum = /*(isCustomized) ? $("#teacher-assessment-register-customized-curriculum option:selected").val() : */$("#teacher-assessment-customized-curriculum option:selected").val();

    var thisChekbox = $(divClassesAssessment + " #" + idClass).hasClass("active");

    if (thisChekbox == true) {
        $("#" + divInsertDate + "  #date-" + idClass).remove();
        $("#class-" + element.id).attr("checked", false);
    }
    else {
        var data = {
            parallel: true,
            idClass: idClass,
            statement: statement,
            divId: divInsertDate,
            isAppend: true,
            idCurriculum: idCurriculum,
            module: "assessment",
            method: "startDateEndDate"
        };

        requestDivToBackend("/controller/Assessment", data);
    }
}
/**
 * metodo js geral para listar datas
 *
 * @param {type} idClass
 * @param {type} idCurriculum
 * @param {type} statement
 * @param {type} divId
 * @param {type} urlClass
 * @returns {undefined}
 */
 function addDetailsDateToClasses(idClass, idCurriculum, statement, divId, urlClass) {
    var thisChekbox = $("#" + idClass).hasClass("active");


    if (thisChekbox == true) {
        $("#date-" + idClass).remove();
        $("#date-" + idClass).remove();
        $("#class-" + this.id).attr("checked", false);
    }
    else {
        var data = {
            parallel: true,
            urlClass: urlClass,
            method: "startDateEndDate",
            idClass: idClass,
            idCurriculum: idCurriculum,
            statement: statement,
            isAppend: true,
            divId: divId,
            callBackSuccess: "restartDatePicker"
        };

        requestDivToBackend("/controller/" + data.urlClass, data);
    }
}

/**
 * FUNCTIONS PARA EXERCÍCIOS *******************************************************************************************
 */
// Insere um combobox para seleção de assunto no plano de aula
function listOfSubjectsByCourseToExercise() {
    var data = {
        idCourse: $("#id-course-to-exercise").val(),
        method: "listOfSubjectsToCourse",
        divId: "exercise-main-header"
    };

    requestDivToBackend("/controller/Exercise", data);
}

function resetCardsAuxExercise() {
    $("#exercise-main-column-aux-one").empty();
    $("#exercise-main-column-aux-two").empty();
}

// insere o card de questões
function listQuestionsToExercise(idCurriculum, listResource) {
    var data = {
        parallel: true,
        method: "listQuestions",
        idCurriculum: idCurriculum,
        listResource: listResource,
        divId: "exercise-main-column-aux-one",
        callBackSuccess: "callBacklisQuestionsToExercise"
    };
    showLoadSpin(data.divId);
    requestDivToBackend("/controller/Exercise", data);
}

function callBacklisQuestionsToExercise() {
    $("#exercise-register-classes label").removeClass('disabled');

    $("#exercise-resources .trash-question").each(function () {
        this.classList.remove('disabled-pointer-event');
    });
}

function saveExercise() {

    var data = {
        method: "saveExercise",
        parallel: true,
        idResourceSequencing: $("#teacher-exercise-edit-id-exercise").val(),
        idCurriculum: $("#id-curriculum-to-exercise").val(),
        statement: $("#exercise-register-name").val(),
        callBackSuccess: "successSaveExercise"
    };

    var endDates = new Array();
    var startDates = new Array();
    var arrayClasses = new Array();
    var idsResources = new Array();

    $("#exercise-register-classes label.active").each(function () {
        arrayClasses.push(this.id);
    });

    $("#exercise-resources .idResourceExercise").each(function () {
        idsResources.push(this.id);
    });

    $("#exercise-register-description-date .start-date").each(function () {
        startDates.push(this.value);
    });

    $("#exercise-register-description-date .end-date").each(function () {
        endDates.push(this.value);
    });

    data["endDate"] = endDates;
    data["startDate"] = startDates;
    data["idClasses"] = arrayClasses;
    data["idResourceOrdenados"] = idsResources;

    // esconde a messagem
    $("#teacher-exercise-register-message").hide();

    // esconde o botao de cadastro
    $("#exercise-save-button-save").hide();

    // mostra o carregando
    $("#teacher-exercise-register-info-loading").show();
    requestDivToBackend("/controller/Exercise", data);
}

/**
 * callback do salvamento de exercício
 *
 * @param {json} objJson
 * @returns {undefined}
 */
 function successSaveExercise(objJson) {
    var id = "teacher-exercise-register-message";

    $("#" + id).show();

    $("#teacher-exercise-register-info-loading").hide();

    if (isOk(objJson.code)) {
        showMessage(id, objJson.message, true, _msg.success, function () {
            historyBack();
        });
    }
    else {
        showMessage(id, objJson.message, true, _msg.danger, function () {
            $("#" + id).hide();
            $("#exercise-save-button-save").show();
        });
    }
}

/**
 * Função chamada para visualizar o exercício
 * @param {string} idResourceSequencing
 * @param {string} idCurriculum
 * @returns {tpl}
 */
 function detailsExercise(idResourceSequencing, idCourse, assunto, nameCourse) {
    var data = {
        method: "detailsExercise",
        idResourceSequencing: idResourceSequencing,
        idGrade: $("#id-grade-to-exercise").val(),
        idCurriculum: $("#select-view-exercise").val(),
        divId: "exercise-view-teacher-listagemContainer",
        idCourse: idCourse,
        assunto: assunto,
        nameCourse: nameCourse
    };


    showLoadSpin(data.divId);

    requestDivToBackend("/controller/Exercise", data);
}

/**
 * Função chamada para abrir a tela de edição de exercício
 * @param {string} idCurriculum
 * @param {string} idGrade
 * @param {string} idResourceSequencing
 * @returns {tpl}
 */
 function showEditExercise(idCurriculum, idGrade, idResourceSequencing, idCourse) {
    var data = {
        parallel: true,
        method: "detailsExercise",
        idCurriculum: idCurriculum,
        idGrade: idGrade,
        idResourceSequencing: idResourceSequencing,
        edit: true,
        divId: "exercise-main-principal",
        callBackSuccess: "callBackEditExercise",
        idCourse: idCourse
    };

    showLoadSpin(data.divId);

    requestDivToBackend("/controller/Exercise", data);
}

function callBackEditExercise() {
    rollScrollBarToEnd();
}

/**
 * FUNCITONS PARA ASSESSMENT *****************************************************************
 */

/**
 * Função chamada para a listagem de simulados
 * @returns {undefined}
 */
 function loadListTest(courseName) {
    var data = {
        parallel: true,
        idCourse: $("#id-course-to-assessment").val(),
        idGrade: $("#id-grade-to-assessment").val(),
        method: "listAssessment",
        divId: "assessment-main-principal",
        courseName: courseName
    };

    showLoadSpin(data.divId);

    requestDivToBackend("/controller/Assessment", data);
}

/**
 * Funçao chamada para criar a tela de novoSimulado
 * @param {type} idCourse
 * @param {type} idGrade
 * @returns {undefined}
 */
 function newAssessment(idCourse, idGrade, courseName) {
    var data = {
        parallel: true,
        method: "newAssessment",
        idGrade: idGrade,
        idCourse: idCourse,
        divId: "assessment-main-principal",
        courseName: courseName

    };

    $("#assessment-main-header").hide();

    showLoadSpin(data.divId);

    requestDivToBackend("/controller/Assessment", data);
}

 function removeAssessmentForTeacher(idSimulado, idCourse, idGrade, courseName) {
    var data = {
        parallel: true,
        method: "removeAssessmentForTeacher",
        idSimulado: idSimulado,
        idGrade: idGrade,
        idCourse: idCourse,
        courseName: courseName,
        callBackSuccess: "callBackRemoveAssessment",
    };

    requestDivToBackend("/controller/Assessment", data, data);
}

function callBackRemoveAssessment(objJson, data){
    window.location = "/professor/simulado/"+data.idGrade+"/"+data.idCourse+"/"+data.courseName+".html"; 
}

/**
 * Função chamada ao clicar em escolher tipo de criação de simulado
 * @param {type} id
 * @returns {undefined}
 */
 function openTestBox(id) {
    $(".testCreator").hide();
    $("#" + id).show();

    $(".btn-test").removeClass("active");
    $("#btn" + id).addClass("active");

    restartContentArea();
}

/**
 * Função de enviar assunto para a listagem que será criada o simulado automático
 * @param {type} id
 * @returns {undefined}
 */
 function passToMyAssessment(id) {
    var element = $("#" + id);
    element.find("#teacher-assessment-register-list-icon").html('<i class="fa fa-lg fa-minus-circle color-theme"></i>');
    element.addClass('active');
    element.attr("onclick", "backToListSubjects('" + id + "')");

    restartContentArea();
}

/**
 * Função de devolver assunto a listagem na criação de simulado automático
 * @param {type} id
 * @returns {undefined}
 */
 function backToListSubjects(id) {
    var element = $("#" + id);
    element.find("#teacher-assessment-register-list-icon").html('');
    element.attr("onclick", "passToMyAssessment('" + id + "')");
    element.removeClass('active');
    restartContentArea();

    var data = {
        method: "removeSubjectToMyAssessment",
        idSimulado: id
    };

    requestDivToBackend("/controller/Assessment", data);
}

/**
 * Função de salvar simulado automático
 * @returns {undefined}
 */
 function saveAutomaticAssessment() {
    var data = {
        method: "saveAutomaticAssessment",
        tamanhoAvaliacao: $("#assessment-register-number-questions").val(),
        statement: $("#assessment-register-name").val(),
        callBackSuccess: "callBackSaveAutomaticAssessment"
    };

    var endDates = new Array();
    var startDates = new Array();
    var arrayClasses = new Array();
    var idsCurriculum = new Array();

    $("#assessment-automatic-register-classes label.active").each(function () {
        arrayClasses.push(this.id);
    });

    $('#teacher-assessment-register-list-subjects tr.active').each(function (){
        idsCurriculum.push(this.id);
    });

    $("#assessment-automatic-register-description-date .start-date").each(function () {
        startDates.push(this.value);
    });

    $("#assessment-automatic-register-description-date .end-date").each(function () {
        endDates.push(this.value);
    });

    data["endDate"] = endDates;
    data["startDate"] = startDates;
    data["idClasses"] = arrayClasses;
    data["idsCurriculum"] = idsCurriculum;


    // esconde a messagem
    $("#teacher-assessment-register-message-automatic").hide();

    // esconde o botao de cadastro
    $("#teacher-assessment-register-button-save-automatic").hide();

    // mostra o carregando
    $("#teacher-assessment-register-loading-automatic").show();


    requestDivToBackend("/controller/Assessment", data);
}

/**
 * CallBack para a criação do simulado automático
 * @param {type} objJson
 * @returns {undefined}
 */
 function callBackSaveAutomaticAssessment(objJson) {
    // esconde o carregando
    $("#teacher-assessment-register-loading-automatic").hide();
    $("#teacher-assessment-register-message-automatic").show();

    if (isOk(objJson.code)) {
        showMessage("teacher-assessment-register-message-automatic", objJson.message, true, _msg.success, function () {
            historyBack();
        });
    }
    else {
        showMessage("teacher-assessment-register-message-automatic", objJson.message, true, _msg.danger, function () {
            $("#teacher-assessment-register-message-automatic").hide();
            $("#teacher-assessment-register-button-save-automatic").show();
        });
    }
}

/**
 * Vizualisar detalhes do simulado
 * @param {type} idAssessment
 * @returns {undefined}
 */
 function detailsAssessment(idAssessment, courseName) {
    var data = {
        parallel: true,
        method: "detailsAssessment",
        idSimulado: idAssessment,
        idCourse: $("#id-course-to-assessment").val(),
        idGrade: $("#id-grade-to-assessment").val(),
        divId: "assessment-main-column-aux-one",
        courseName: courseName
    };

    showLoadSpin(data.divId);

    requestDivToBackend("/controller/Assessment", data);
}
function printAssessment() {
    var h = factory.printing.header;
    var f = factory.printing.footer;
    var l = factory.printing.leftMargin
    var lf = factory.printing.leftMargin;
    var t = factory.printing.topMargin;
    var r = factory.printing.rightMargin;
    var b = factory.printing.bottomMargin;

    document.all("printbtn").style.visibility = 'hidden';
}

function listQuestionsToAssessment(idCurriculum, listResource) {
    var idCurriculumSelected = $("#teacher-assessment-register-customized-curriculum").val();

    if (!document.getElementById("teacher-assessment-register-customized-curriculum")) {
        idCurriculumSelected = $("#teacher-assessment-customized-curriculum").val();
    }

    idCurriculum = (idCurriculum == null) ? idCurriculumSelected : idCurriculum;

    var divId = "teacher-assessment-register-customized-list-questions";

    if (!document.getElementById("teacher-assessment-register-customized-list-questions")) {
        divId = "teacher-assessment-edit-customized-list-questions";
    }

    var data = {
        parallel: true,
        method: "listQuestions",
        idCurriculum: idCurriculum,
        listResource: listResource,
        divId: divId,
        callBackSuccess: "callBacklisQuestionsToAssessment"
    };

    showLoadSpin(data.divId);

    $("#assessment-automatic-register-classes label").addClass("disabled");
    $("#assessment-customized-register-classes label").addClass("disabled");

    requestDivToBackend("/controller/Assessment", data);
}

function callBacklisQuestionsToAssessment() {
    $("#assessment-customized-register-classes label").removeClass('disabled');
    $("#assessment-automatic-register-classes label").removeClass('disabled');
}
/**
 * Método usado para salvar o simulado personalizado
 * @returns {undefined}
 */
 function saveCustomizedAssessment() {
    var data = {
        method: "saveCustomizedAssessment",
        idSimulado: $("#assessment-register-id").val(),
        statement: $("#assessment-register-name-customized").val(),
        callBackSuccess: "callBackSaveCustomizedAssessment"
    };

    var endDates = new Array();
    var startDates = new Array();
    var arrayClasses = new Array();
    var idResourceOrdenados = new Array();

    $("#assessment-customized-register-classes label.active").each(function () {
        arrayClasses.push(this.id);
    });

    $("#assessment-resources .idResourceAssessment").each(function () {
        idResourceOrdenados.push(this.id);
    });

    $("#assessment-customized-register-description-date .start-date").each(function () {
        startDates.push(this.value);
    });

    $("#assessment-customized-register-description-date .end-date").each(function () {
        endDates.push(this.value);
    });

    data["endDate"] = endDates;
    data["startDate"] = startDates;
    data["idClasses"] = arrayClasses;
    data["idResourceOrdenados"] = idResourceOrdenados;


    // esconde a messagem
    $("#teacher-assessment-register-message-customized").hide();

    // esconde o botao de cadastro
    $("#teacher-assessment-register-button-save-customized").hide();

    // mostra o carregando
    $("#teacher-assessment-register-loading-customized").show();

    requestDivToBackend("/controller/Assessment", data);
}

/**
 * CallBack para a criação do simulado personalizado
 * @param {type} objJson
 * @returns {undefined}
 */
 function callBackSaveCustomizedAssessment(objJson) {
    // esconde o carregando
    $("#teacher-assessment-register-loading-customized").hide();
    $("#teacher-assessment-register-message-customized").show();

    if (isOk(objJson.code)) {
        showMessage("teacher-assessment-register-message-customized", objJson.message, true, _msg.success, function () {
            historyBack();
        });
    }
    else {
        showMessage("teacher-assessment-register-message-customized", objJson.message, true, _msg.danger, function () {
            $("#teacher-assessment-register-message-customized").hide();
            $("#teacher-assessment-register-button-save-customized").show();
        });
    }
}

function addQuestionInAssessment(idQuestion) {
    $("#box-question").remove();

    var idExercise = "#" + idQuestion;

    $(idExercise + " .data-grid-question").removeClass("col-md-11");
    $(idExercise + " .data-grid-question").addClass("col-md-12");

    $(idExercise).addClass("idResourceAssessment");

    $("#assessment-resources .jspContainer .jspPane").append($(idExercise));
    $(idExercise).attr("draggable", "false");

    $("#assessment-resources .jspPane").append(boxQuestionExerciseDefault);

    var countQuestions = $("#list-questions-count").html();
    var countQuestionsAsExercise = $("#teacher-assessment-list-questions-number-question-assessment").html();

    countQuestions -= 1;
    countQuestionsAsExercise = parseInt(countQuestionsAsExercise) + 1;

    $("#list-questions-count").html(countQuestions);
    $("#teacher-assessment-list-questions-number-question-assessment").html(countQuestionsAsExercise);

    rollScrollBarToEnd();
}

function dropAssessment(event) {
    event.preventDefault();

    $("#box-question").remove();

    var data = event.dataTransfer.getData("text");
    var idExercise = "#" + document.getElementById(data).id;

    $(idExercise + " .data-grid-question").removeClass("col-md-11");
    $(idExercise + " .data-grid-question").addClass("col-md-12");

    $(idExercise).addClass("idResourceAssessment");

    $("#assessment-resources .jspContainer .jspPane").append(document.getElementById(data));
    $(idExercise).attr("draggable", "false");

    $("#assessment-resources .jspPane").append(boxQuestionExerciseDefault);

    var countQuestions = $("#list-questions-count").html();
    var countQuestionsAsExercise = $("#teacher-assessment-list-questions-number-question-assessment").html();

    countQuestions -= 1;
    countQuestionsAsExercise = parseInt(countQuestionsAsExercise) + 1;

    $("#list-questions-count").html(countQuestions);
    $("#teacher-assessment-list-questions-number-question-assessment").html(countQuestionsAsExercise);

    rollScrollBarToEnd();
}


function returnToListAssessment(idQuestion) {
    $("#" + idQuestion + " .data-grid-question").removeClass("col-md-12");
    $("#" + idQuestion + " .data-grid-question").addClass("col-md-11");

    $("#" + idQuestion).attr("draggable", "true");
    $("#listQuestionsAssessment .jspContainer .jspPane").append($("#" + idQuestion));

    var countQuestions = $("#list-questions-count").html();
    var countQuestionsAsExercise = $("#teacher-assessment-list-questions-number-question-exercise").html();

    countQuestionsAsExercise -= 1;
    countQuestions = parseInt(countQuestions) + 1;

    $("#list-questions-count").html(countQuestions);
    $("#teacher-assessment-list-questions-number-question-assessment").html(countQuestionsAsExercise);

    restartContentArea();
}

function allowDropAssessment(ev) {
    ev.preventDefault();
}

function showEditAssessment(idCourse, idGrade, idAssessment, idAssessment) {
    var data = {
        method: "editAssessment",
        idCourse: idCourse,
        idGrade: idGrade,
        idSimulado: idAssessment,
        divId: "assessment-main-principal",
        callBackSuccess: "callBackEditAssessment",
        idAssessment: idAssessment
    };

    showLoadSpin(data.divId);

    requestDivToBackend("/controller/Assessment", data);
}

function callBackEditExercise() {
    rollScrollBarToEnd();
}

/*** ARTUR - LIST ALL CONTENT ***/

function buildBreadcrumb() {
    data = {
        parallel: true,
        method: "breadcrumb",
        inputId: $("#teacher-allcontent-name-disciplina").val(),
        assunto: $('#select option:selected').html(),
        divId: "breadcrumb",
        withoutEffects: true
    };
    $("#select").removeAttr('disabled');
    requestDivToBackend("/controller/CardVideosTeacher", data);
}

function showCardAllContent() {
    data = {
        parallel: true,
        idCurriculum: $("#select").val(),
        method: "showCardAllContent",
        divId: "card-all-content",
        assunto: $('#select option:selected').html(),
        callBackSuccess: "buildBreadcrumb"
    };

    showLoadSpin(data.divId);

    $("#select").attr('disabled', 'disabled');

    requestDivToBackend("/controller/CardVideosTeacher", data);
}

function ChengeTabAllContent(id) {
    if (id === "tab-videos") {
        $("#list-questions").hide();
        $("#list-videos").show();
        $("#tab-question").removeClass("active");
        $("#tab-videos").addClass("active");
    }
    else {
        $("#list-videos").hide();
        $("#list-questions").show();
        $("#tab-videos").removeClass("active");
        $("#tab-question").addClass("active");
    }

    restartContentArea();
}

function showQuestionModal(id) {
    var tdStatement = $("#" + id).find(".questions-enunciation");

    var statement = tdStatement.html();
    $("#modal-title").html(statement);

    var nivel = $("#" + id).find(".question-level").html();
    $("#modal-nivel").html(nivel);

    var options = $("#" + id).find(".questions-alternatives").html();
    $("#modal-questions").html(options);
}

function callingControllerForComboBox() {
    data = {
        paralel: true,
        method: "combobox",
        divId: "combo-box",
        InputId: $("#idCourse").val()
    };
    requestDivToBackend("/controller/CardVideosTeacher", data);
}

/**
 *
 * @param {string} idCourse
 * @param {string} method
 * @param {string} divId
 * @param {string} nomeMateria
 * @param {string} idGrade
 * @returns {undefined}
 */
 function selectIssuesTeacher(idCourse, method, divId, nameCourse, idCurriculum, idGrade) {
    var data = {
        parallel: true,
        method: method,
        idGrade: idGrade,
        divId: divId,
        idCourse: idCourse,
        nameCourse: nameCourse,
        idCurriculum: idCurriculum
    };

    requestDivToBackend("/controller/Exercise", data);
}

function exerciseBreadcrumb(nameCurriculum, divId) {
    var data = {
        parallel: true,
        method: "exerciseBreadcrumb",
        divId: divId,
        materia: nameCurriculum,
        assunto: $('#select-view-exercise option:selected').html(),
        withoutEffects: true
    };

    requestDivToBackend("/controller/Exercise", data);
}

function newExerciseBreadcrumb(nameCourse, assunto, divId) {
    var data = {
        parallel: true,
        method: "newExerciseBreadcrumb",
        divId: divId,
        nameCourse: nameCourse,
        assunto: $('#select-view-create-exercise option:selected').html(),
        withoutEffects: true
    };

    requestDivToBackend("/controller/Exercise", data);
}

function editExerciseBreadcrumb(nameCourse, assunto, divId) {
    var data = {
        parallel: true,
        method: "editExerciseBreadcrumb",
        divId: divId,
        nameCourse: nameCourse,
        assunto: assunto,
        withoutEffects: true
    };

    showLoadSpin(data.divId);

    requestDivToBackend("/controller/Exercise", data);
}

function assessmentBreadcrumb(nameCourse, divId) {
    var data = {
        parallel: true,
        method: "assessmentBreadcrumb",
        divId: divId,
        materia: nameCourse,
        withoutEffects: true
    };

    requestDivToBackend("/controller/Assessment", data);
}

function newAssessmentBreadcrumb(courseName, divId) {
    var data = {
        parallel: true,
        method: "newAssessmentBreadcrumb",
        divId: divId,
        courseName: courseName,
        withoutEffects: true
    };

    requestDivToBackend("/controller/Assessment", data);
}

function editAssessmentBreadcrumb(courseName, divId) {
    var data = {
        parallel: true,
        method: "editAssessmentBreadcrumb",
        divId: divId,
        courseName: courseName,
        withoutEffects: true
    };

    requestDivToBackend("/controller/Assessment", data);
}

function registerLessonPlanBreadcrumb(nameCourse, assunto, divId) {
    var data = {
        parallel: true,
        method: "registerLessonPlanBreadcrumb",
        divId: divId,
        nameCourse: nameCourse,
        assunto: assunto,
        withoutEffects: true
    };

    requestDivToBackend("/controller/LessonPlan", data);
}

function editLessonPlanBreadCrumb(nameCourse, assunto, divId) {
    var data = {
        parallel: true,
        method: "editLessonPlanBreadcrumb",
        divId: divId,
        nameCourse: nameCourse,
        assunto: assunto,
        withoutEffects: true
    };

    requestDivToBackend("/controller/LessonPlan", data);
}

function lessonPlanBreadcrumb(nameCurriculum, divId) {
    var data = {
        parallel: true,
        method: "lessonPlanBreadcrumb",
        divId: divId,
        materia: nameCurriculum,
        assunto: $('#comboBox-subjects option:selected').html(),
        withoutEffects: true
    };

    requestDivToBackend("/controller/LessonPlan", data);
}

function exerciseMainCard(idCourse, nameCourse) {
    var data = {
        parallel: true,
        method: "loadListOfExercisesRistred",
        divId: "exercise-view-teacher-conteudoContainer",
        idCurriculum: $("#select-view-exercise option:selected").val(),
        idGrade: $("#id-grade-to-exercise").val(),
        idCourse: idCourse,
        assunto: $('#select-view-exercise option:selected').html(),
        callBackSuccess: "removeDisabledCombobox",
        nameCourse: nameCourse
    };
    showLoadSpin(data.divId);

    requestDivToBackend("/controller/Exercise", data);
}

function removeDisabledCombobox() {
    $("#select-view-exercise").removeAttr("disabled");
}

function createEercicio() {
    var data = {
        method: "createExercice",
        divId: "main-card-create-exercice"
    };

    showLoadSpin(data.divId);

    requestDivToBackend("/controller/Exercise", data);
}

/**
 * Lista as turmas do professor pela série
 * @param {string} idGrade
 * @param {string} idCourse
 * @returns {undefined}
 */
 function listClassesByGrade(idGrade, idCourse, nameCourse) {
    var data = {
        parallel: true,
        method: "listClassesByGrade",
        divId: "teacher-tree-main-select-classes",
        idGrade: idGrade,
        idCourse: idCourse,
        nameCourse: nameCourse
    };

    showLoadSpin(data.divId);

    requestDivToBackend("/controller/Teacher", data);
}

/********* PLANO DE DISCIPLINA *************/

/**
 * criar plano de disciplina
 **/
 function createDisciplinePlan() {
    var data = {
        method: "createDisciplinePlan",
        idDisciplina: $('#idDisciplina_discpline-plan').val(),
        idTurma: $('#idTurma_discpline-plan').val(),
        callBackSuccess: "successCreateDisciplinePlan"

    };

    //showLoadSpin(data.divId);

    var listCurriculum = new Array();
    var startDates = new Array();
    var endDates = new Array();

    $("#tableDisciplinePlanDates .listCurriculum").each(function () {
        listCurriculum.push(this.value);
    });

    $("#tableDisciplinePlanDates .start-date").each(function () {
        startDates.push(this.value);
    });

    $("#tableDisciplinePlanDates .end-date").each(function () {
        endDates.push(this.value);
    });

    data["startDates"] = startDates;
    data["endDates"] = endDates;
    data["listCurriculum"] = listCurriculum;

    // esconde a messagem
    $("#discipline-plan-message").hide();

    // esconde o botao de cadastro
    $("#discipline-plan-button").hide();

    // mostra o carregando
    $("#discipline-plan-info-loading").show();

    requestDivToBackend("/controller/DisciplinePlan", data);
}

/**
 * callback da criacao de um plano de disciplina
 **/
 function successCreateDisciplinePlan(objJson) {
    // esconde o carregando
    $("#discipline-plan-info-loading").hide();
    $("#discipline-plan-message").show();

    if (isOk(objJson.code)) {
        showMessage("discipline-plan-message", objJson.message, false, _msg.success);
    }
    else {
        showMessage("discipline-plan-message", objJson.message, true, _msg.danger);

        setTimeout(function () {
            $("#discipline-plan-message").hide();
            $("#discipline-plan-button").show();
        }, 3000);
    }
}

/**
 * Criação de plano de disciplina automático
 * @returns {undefined}
 */
 function createAutomaticDisciplinePlan() {
    var data = {
        method: "createAutomaticDisciplinePlan",
        idDisciplina: $('#idDisciplina_discpline-plan').val(),
        idTurma: $('#idTurma_discpline-plan').val(),
        callBackSuccess: "successCreateAutomaticDisciplinePlan",
        startDate: $("#teacher-tree-discipline-plan-aut-start").val(),
        endDate: $("#teacher-tree-discipline-plan-aut-end").val()
    };

    $("#teacher-tree-discipline-plan-aut-submit").hide();
    $("#teacher-tree-discipline-plan-aut-msg").hide();
    $("#teacher-tree-discipline-plan-aut-spin").show();

    requestDivToBackend("/controller/DisciplinePlan", data);
}

/**
 * Função chamada no callback do cadastro automático de disciplina
 * @param {type} objJson
 * @returns {undefined}
 */
 function successCreateAutomaticDisciplinePlan(objJson) {
    $("#teacher-tree-discipline-plan-aut-spin").hide();
    $("#teacher-tree-discipline-plan-aut-msg").show();

    if (isOk(objJson.code)) {
        showMessage("teacher-tree-discipline-plan-aut-msg", objJson.message, false, _msg.success);
    } else {
        showMessage("teacher-tree-discipline-plan-aut-msg", objJson.message, true, _msg.danger);
    }

    setTimeout(function () {
        refresh();
    }, 3000);
}

function loadBreadCrumbTreeTeacher(nameCourse) {
    var data = {
        parallel: true,
        method: "loadBreadcrumbTreeTeacher",
        divId: "teacher-tree-main-bread-crumb",
        turma: $("#teacher-classroom-select-class option:selected").html(),
        nameCourse: nameCourse
    };

    requestDivToBackend("/controller/Teacher", data);
}

/**********CLASS ROOM TURMA*********/
function loadBreadCrumbClassRoomTeacher(turma, serie, idClass) {
    var data = {
        parallel: true,
        method: "loadBreadCrumbClassRoomTeacher",
        divId: "classRoom-teacher-turma-breadcrumb",
        turma: turma,
        serie: serie,
        idClass: idClass
    };

    requestDivToBackend("/controller/ClassRoom", data);
}

function listClassToClassRoomTeacher() {
    var data = {
        parallel: true,
        method: "listClassToClassRoomTeacher",
        idClass: $("#classRoom-teacher-id-class").val(),
        divId: "classRoom-teacher-turma"
    };
    showLoadSpin(data.divId);

    requestDivToBackend("/controller/ClassRoom", data);
}

function loadListStudantsCard(idClass) {
    var data = {
        parallel: true,
        method: "loadListStudantsCard",
        divId: "classRoom-teacher-students",
        idClass: idClass
    };

    showLoadSpin(data.divId);

    requestDivToBackend("/controller/ClassRoom", data);
}

function loadListTeachersCard(idClass) {
    var data = {
        parallel: true,
        method: "loadListTeachersCard",
        divId: "classRoom-teacher-teachers",
        idClass: idClass
    };

    showLoadSpin(data.divId);

    requestDivToBackend("/controller/ClassRoom", data);
}

function loadFunctionToBuildAssessmentHighChartCard() {
    var data = {
        parallel: true,
        method: "loadAssessmnetTeacherDashboardHighCharts",
        divId: "classRoom-teacher-highchart-assessment",
        idClass: $("#classRoom-teacher-id-class").val()
    };

    showLoadSpin(data.divId);

    requestDivToBackend("/controller/ClassRoom", data);
}

function loadHigChartAssessmentStudentToTeacher(loginAluno) {
    var data = {
        parallel: true,
        method: "loadAssessmentStudentToTeacherDashboardHighchart",
        divId: "dashboard-teacher-aluno-assessment-highchart",
        loginAluno: loginAluno
    };

    showLoadSpin(data.divId);

    requestDivToBackend("/controller/Student", data);
}

function loadHigChartContentsStudentToTeacher(loginAluno) {
    var data = {
        parallel: true,
        method: "loadHigChartContentsStudentToTeacher",
        divId: "dashboard-teacher-aluno-contents-table",
        idDisciplina: $("#class-room-select-discipline-teacher option").attr('iddomain'),
        loginAluno: loginAluno
    };

    showLoadSpin(data.divId);

    requestDivToBackend("/controller/Student", data);
}

function showExplanationCardAssessment(id, role) {
    $("." + role + "-classroom-assessment").hide();
    $("#" + role + "-classroom-assessment-" + id).fadeIn();
}

function loadAssessmnetTeacherDashboardHighCharts(iddiv, data, role) {
    var array = JSON.parse(data);
    var dataInfo = array.infos;
    var categoriesX = new Array(dataInfo.lenght);
    var dataY = new Array(dataInfo.lenght);
    for (var i in dataInfo) {
        categoriesX[i] = dataInfo[i].date;
        var object = {id: '', name: '', y: 0, x: 0};
        object.id = dataInfo[i].id;
        object.name = dataInfo[i].name;
        object.y = parseFloat(dataInfo[i].value);
        object.x = parseInt(i);
        dataY[i] = object;
    }
    $(function () {
        $('#' + iddiv).highcharts({
            title: {text: null}, credits: {enabled: false}, legend: {enabled: false},
            colors: ['#ffffff'],
            chart: {
                backgroundColor: '#69a2b6',
                type: 'line',
                height: 200,
                style: {
                    overflow: 'none',
                    fontFamily: 'Open Sans'
                }
            },
            xAxis: {
                categories: categoriesX,
                labels: {
                    style: {
                        color: '#ffffff',
                        fontWeight: 'bold'
                    }
                }
            },
            yAxis: {
                title: {text: null},
                tickInterval: 2.5,
                max: '10',
                min: '0',
                gridLineColor: '#ffffff',
                gridLineWidth: 0.5,
                labels: {
                    style: {
                        color: '#ffffff',
                        fontWeight: 'bold'
                    }
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            plotOptions: {
                series: {
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: function () {
                                showExplanationCardAssessment(this.id, role);
                            }
                        }
                    }
                }
            },
            // povoar os dados dos simulados recuperados aqui
            series: [{
                name: 'Nota',
                data: dataY
            }]
        });
    });
}

function loadCardExplanationsAssesment() {
    var data = {
        parallel: true,
        method: "buildCardExplanationsAssessment",
        divId: "classRoom-teacher-explanation-cards"
    };

    showLoadSpin(data.divId);

    requestDivToBackend("/controller/ClassRoom", data);
}

function classRoomComboboxDicipline() {
    var data = {
        parallel: true,
        method: "buildClassRoomComboboxDicipline",
        divId: "classRoom-teacher-select-disciplines"
    };

    showLoadSpin(data.divId);

    requestDivToBackend("/controller/ClassRoom", data);
}

function loadFunctionToBuildleargningEvolutiontHighChartCard() {
    var data = {
        parallel: true,
        method: "loadFunctionToBuildLearningEvolutionHighchart",
        divId: "classRoom-teacher-learning-evolution-highchart",
        idTurma: $("#classRoom-teacher-id-class").val(),
        idDisciplina: $("#class-room-select-discipline-teacher option:selected").val()
    };
    showLoadSpinNoWell(data.divId);

    requestDivToBackend("/controller/ClassRoom", data);
}

function loadLearningEvolutionTeacherDashboardHighCharts(iddiv, jsonData) {
    $(function () {

        var dadosJson = JSON.parse(jsonData);
        var dataInfo = dadosJson.dados;

        var categoriesX = new Array();
        var aprendizagem = new Array();

        for (var i in dataInfo) {
            categoriesX[i] = dataInfo[i].data;
            aprendizagem[i] = parseFloat(dataInfo[i].media);
        }

        $('#' + iddiv).highcharts({
            title: {text: null}, credits: {enabled: false}, legend: {enabled: false},
            colors: ['#2980b9'],
            chart: {
                backgroundColor: '#f5f5f5',
                type: 'area',
                height: 300,
                style: {
                    fontFamily: 'Open Sans'
                }
            },
            xAxis: {
                // type: 'category'
                categories: categoriesX
            },
            yAxis: {
                title: {text: null},
                tickInterval: 25,
                max: '100',
                min: '0',
                gridLineWidth: 0.5,
                labels: {
                    format: '{value} %'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: '%'
            },
            // povoar os dados dos simulados recuperados aqui
            series: [{
                name: 'Percentual de aprendizagem',
                data: aprendizagem
            }, //{
                // name: 'Quantidade de login do usuário no período',
                // type: 'line',
                // data: login
                //}]
                ]
            });
    });
}

function loadFunctionToBuildEfetiveUseHighChartCard() {
    var data = {
        parallel: true,
        method: "loadFunctionToBuildEfetiveUseHighchart",
        divId: "classRoom-teacher-efetive-use-highchart",
        idTurma: $("#classRoom-teacher-id-class").val(),
        idDisciplina: $("#class-room-select-discipline-teacher option:selected").val()
    };

    showLoadSpinNoWell(data.divId);

    requestDivToBackend("/controller/ClassRoom", data);
}

function loadEfetiveUseTeacherDashboardHighCharts(iddiv, jsonData) {
    $(function () {

        var dadosJson = JSON.parse(jsonData);
        var dataInfo = dadosJson.dados;
        // var categoriesX = new Array();
        // var usoEfetivo = new Array();

        // for (var i in dataInfo) {
        //     categoriesX[i] = dataInfo[i].data;
        //     usoEfetivo[i] = parseFloat(dataInfo[i].usoEfetivo);
        // }

        $('#' + iddiv).highcharts({
            title: {text: null}, credits: {enabled: false}, legend: {enabled: false},
            colors: ['#9c72bb', '#000000'],
            chart: {
                backgroundColor: '#f5f5f5',
                // type: 'area',
                type: 'column',
                height: 300,
                style: {
                    fontFamily: 'Open Sans'
                }
            },
            xAxis: {
                type: "category"
                // categories: categoriesX
            },
            yAxis: {
                title: {text: null},
                tickInterval: 20,
//        max: '120',
min: '0',
gridLineWidth: 0.5,
labels: {
    format: '{value} min'
},
plotLines: [{
    value: 0,
    width: 1,
    color: '#808080'
}]
},
tooltip: {
    valueSuffix: ' minutos.'
},
            // povoar os dados dos simulados recuperados aqui
            series: [{
                name: 'Uso Efetivo',
                // data: usoEfetivo
                data: dataInfo
            }, {
//            name: 'Ideal',
//            type: 'line',
//            data: [125, 125, 125, 125, 125]
}
]
});
    });
}

/**
 * Função usada para mudar o valor das questões na criação de simulado automática
 * @param {type} id
 * @returns {undefined}
 */
 function changeValueOfVisualization(id) {
    var element = $("#" + id);

    $("#teacher-assessment-automatic-assessment-value-of-questions").html(element.val());
    $("#teacher-assessment-automatic-assessment-value-of-questions").css('marginLeft','calc('+finalValue+'% + 32px)');
}

/**
 * Função usada para as datas de register de simulado
 * @param {type} element
 * @param {type} isCustomized
 * @returns {undefined}
 */
 function addDetailsDateRegisterToAssessment(element, isCustomized) {
    var idClass = element.id;

    var divClassesAssessment = (!isCustomized) ? "#assessment-automatic-register-classes" : "#assessment-customized-register-classes";
    var divDatesAssessment = (!isCustomized) ? "assessment-automatic-register-description-date" : "assessment-customized-register-description-date";

    var isActiveLabelClass = $(divClassesAssessment + " #" + idClass).hasClass("active");

    var statement = $("#" + idClass).attr("classRoom");

    var idCurriculum = $("#teacher-assessment-register-customized-curriculum").val();

    if (isActiveLabelClass != false) {
        $("#" + divDatesAssessment + " #date-" + idClass).remove();
        $("#class-" + element.id).attr("checked", false);
    }
    else {
        var data = {
            parallel: true,
            idClass: idClass,
            statement: statement,
            divId: divDatesAssessment,
            isAssessment: true,
            idCurriculum: idCurriculum,
            isAppend: true,
            method: "startDateEndDate"
        };

        requestDivToBackend("/controller/Assessment", data);
    }
}

/**
 * Carregar pontos fortes e fracos da classe
 * @returns {undefined}
 */
 function loadClassRoomStrongAndWeakPoints() {
    var data = {
        parallel: true,
        method: "StrongAndWeakPoints",
        divId: "classRoom-teacher-strong-points",
        idClass: $('#classRoom-teacher-id-class').val(),
        idDisciplina: $('#class-room-select-discipline-teacher option:selected').val()
    };

    showLoadSpin(data.divId);

    requestDivToBackend("/controller/ClassRoom", data);
}

function restartContentAreaStrongPoints() {
    $('#class-room-strong-points-to-teacher').jScrollPane({
        horizontalGutter: 5,
        verticalGutter: 5,
        'showArrows': false
    });
}

function loadClassRoomWeakPoints() {
    var data = {
        parallel: true,
        method: "ClassRoomWeakPoints",
        divId: "classRoom-teacher-weak-points"
    };

    showLoadSpinNoWell(data.divId);

    requestDivToBackend("/controller/ClassRoom", data);
}

function restartContentAreaEwakPoints() {
    $('#teacher-list-of-strong-points').jScrollPane({
        horizontalGutter: 5,
        verticalGutter: 5,
        'showArrows': false
    });
}

function loadClassRoomExerciseCard() {
    var data = {
        parallel: true,
        method: "ClassRoomExercise",
        divId: "classRoom-teacher-exercise",
        idClass: $("#classRoom-teacher-id-class").val(),
        idCourse: $("#class-room-select-discipline-teacher option:selected").val()
    };

    showLoadSpin(data.divId);

    requestDivToBackend("/controller/ClassRoom", data);
}

function loadBasicInformationStudentCard() {
    var data = {
        parallel: true,
        method: "loadStudentsBasicInformations",
        divId: "dashboard-teacher-aluno-basic-informations",
        meututorId: $("#dashboard-teacher-aluno-meututorId").val()
    };
    showLoadSpinNoWell(data.divId);

    requestDivToBackend("/controller/Student", data);
}

function loadGamificationStudentCardToDashBoards(loginAluno) {
    var data = {
        parallel: true,
        method: "loadStudentsGamificationCard",
        divId: "dashboard-teacher-aluno-gamification",
        loginAluno: loginAluno
    };
    showLoadSpinNoWell(data.divId);

    return requestDivToBackend("/controller/Student", data);
}

function ComboboxDiciplineStudentToTeacher(loginAluno, idClass) {
    var data = {
        parallel: true,
        loginAluno: loginAluno,
        method: "buildStudentToTeacherComboboxDicipline",
        divId: "dashboard-teacher-aluno-combobox",
        idClass: idClass
    };

    showLoadSpin(data.divId);

    requestDivToBackend("/controller/Student", data);
}

function callHabilitiesAndHighchartsClassRoom() {
    $.when(
        loadFunctionToBuildleargningEvolutiontHighChartCard(),
        loadFunctionToBuildEfetiveUseHighChartCard()
        )
    .done(function () {
        loadClassRoomStrongAndWeakPoints();
    })
    .done(function () {
        loadClassRoomExerciseCard();
    });
}

function callHabilitiesAndHighchartsStudentToTeacher(loginAluno) {
    $.when(
        loadHigChartContentsStudentToTeacher(loginAluno),
        loadFunctionToBuildLearningCurveHighChartStudentToTeacher(loginAluno),
        loadFunctionToBuildEfectiveHighchartStudentToTeacher(loginAluno)
        )
    .done(function () {
        strongAndWeakPointsStudentToTeacher(loginAluno);
    })
    .done(function () {
        loadExerciceCardStudentToTeacher(loginAluno);
    });
}

function loadFunctionToBuildLearningCurveHighChartStudentToTeacher(loginAluno) {
    var data = {
        parallel: true,
        method: "learningCurveHighchartStudentToTacher",
        divId: "dashboard-teacher-aluno-larningcurve-higcharts",
        idDisciplina: $("#class-room-select-discipline-teacher").val(),
        loginAluno: loginAluno
    };
    showLoadSpinNoWell(data.divId);

    requestDivToBackend("/controller/Student", data);
}

function loadFunctionToBuildEfectiveHighchartStudentToTeacher(loginAluno) {
    var data = {
        parallel: true,
        method: "efectiveUseHighchartStudentToTacher",
        idDisciplina: $("#class-room-select-discipline-teacher").val(),
        divId: "dashboard-teacher-aluno-efetiveuse-higcharts",
        loginAluno: loginAluno
    };
    showLoadSpin(data.divId);

    requestDivToBackend("/controller/Student", data);
}

function strongAndWeakPointsStudentToTeacher(loginAluno) {
    var data = {
        parallel: true,
        method: "strongAndWeakPointsStudentToTeacher",
        divId: "classRoom-student-to-teacher-aluno-strong-and-weak-points",
        idDisciplina: $("#class-room-select-discipline-teacher option:selected").val(),
        loginAluno: loginAluno,
        studentName: $('#profile-student-name').val()
    };

    showLoadSpin(data.divId);

    requestDivToBackend("/controller/Student", data);
}

function loadExplanationsAssessmentStudentToTeacher() {
    var data = {
        parallel: true,
        method: "loadExplanationsAssessment",
        divId: "student-to-teacher-explanation-exercise-card"
    };
    showLoadSpin(data.divId);

    requestDivToBackend("/controller/Student", data);
}

function loadWeakPoninsStudentToTeacher() {
    var data = {
        parallel: true,
        method: "weakPointsStudentToTeacher",
        divId: "classRoom-student-to-teacher-aluno-weak-points"
    };
    showLoadSpin(data.divId);

    requestDivToBackend("/controller/Student", data);
}

function loadExerciceCardStudentToTeacher(idAluno) {
    var data = {
        parallel: true,
        method: "execiseCardStudentToTeacher",
        divId: "classRoom-student-to-teacher-aluno-exercise",
        idCourse: $("#class-room-select-discipline-teacher option:selected").val(),
        idAluno: idAluno
    };

    showLoadSpin(data.divId);

    requestDivToBackend("/controller/Student", data);
}

/**
 * Iniciar preenchimento da tela de perfil Professor
 * @returns {undefined}
 */
 function initTeacherMyProfile() {
    $.when(
        loadAvatar()
        )
    .done(function () {
        loadLinkages();
    })
        //  .done(function () {
        //    listFeedTeacherToDashboard();
        //  })
        .done(function () {
            generalAccountSettings();
        });
    }


/**
 * Carregar informações do avatar na tela de perfil
 * @returns {undefined}
 */
 function loadAvatar() {
    var data = {
        parallel: true,
        method: "loadAvatarToProfileTeacher",
        divId: "teacher-profile-main-avatar"
    };

    showLoadSpin(data.divId);

    requestDivToBackend("/controller/Avatar", data);
}
/**
 * Carregar informações das turmas vinculadas ao professor
 * @returns {undefined}
 */
 function loadLinkages() {
    var data = {
        parallel: true,
        method: "loadLinkagesToTeacher",
        divId: "teacher-profile-main-linkages"
    };

    showLoadSpin(data.divId);

    requestDivToBackend("/controller/Teacher", data);
}

function generalAccountSettings() {
    var data = {
        parallel: true,
        method: "generalAccountSettings",
        divId: "teacher-profile-main-general-account-settings"
    };

    showLoadSpin(data.divId);

    requestDivToBackend("/controller/Teacher", data);
}

/**
 * alterar dados do Professor em Perfil
 **/
 function alterProfileTeacher() {
    var data = {
        method: "alterProfileTeacher",
        nome: $('#profile-teacher-primary-name').val(),
        sobrenome: $('#profile-teacher-last-name').val(),
        email: $('#profile-teacher-email').val(),
        callBackSuccess: "successAlterProfileTeacher"
    };

    requestDivToBackend("/controller/Teacher", data);
}

/**
 * callback da alterar plano de aula
 **/
 function successAlterProfileTeacher(objJson) {
    // esconde o carregando
    $("#profile-teacher-info-loading").hide();
    $("#profile-info-message").show();

    if (isOk(objJson.code)) {
        showMessage("profile-info-message", objJson.message, true, _msg.success, function () {

        });
    }
    else {
        showMessage("profile-info-message", objJson.message, true, _msg.danger, function () {
            $("#profile-info-message").hide();
            $("#profile-teacher-buttons").show();
        });
    }
}

function showEditPassTeacher() {
    $("#teacher-profile-general-form").addClass("hidden");
    $("#teacher-profile-alter-pass").removeClass("hidden");
}

function cancelAlterPassTeacher() {
    $("#teacher-profile-alter-pass #profile-teacher-current-password").val('');
    $("#teacher-profile-alter-pass #profile-teacher-new-password").val('');
    $("#teacher-profile-alter-pass #profile-teacher-confirm-new-password").val('');
    $("#teacher-profile-general-form").removeClass("hidden");
    $("#teacher-profile-alter-pass").addClass("hidden");
}

/**
 * Função chamada ao editar informações do studante na tela de perfil
 * @returns {undefined}
 */
 function alterProfilePassTeacher() {
    var data = {
        method: "alterPassTeacher",
        senha: $("#profile-teacher-current-password").val(),
        novaSenha: $("#profile-teacher-new-password").val(),
        confirmarNovaSenha: $("#profile-teacher-confirm-new-password").val(),
        callBackSuccess: "callbackAlterPassTeacher"
    };

    requestDivToBackend("/controller/Teacher", data);
}


function callbackAlterPassTeacher(objJson) {
    $("#profile-info-alter-pass-message").show();

    if (isOk(objJson.code)) {
        showMessage("profile-info-alter-pass-message",
            objJson.message, true, _msg.success, function () {

                $("#profile-info-alter-pass-message").hide();
                $("#teacher-profile-general-form").removeClass("hidden");
                $("#teacher-profile-alter-pass").addClass("hidden");
                $("#teacher-profile-alter-pass #profile-teacher-current-password").val('');
                $("#teacher-profile-alter-pass #profile-teacher-new-password").val('');
                $("#teacher-profile-alter-pass #profile-teacher-confirm-new-password").val('');
            });
    }
    else {
        showMessage("profile-info-alter-pass-message",
            objJson.message, true, _msg.danger, function () {

                $("#profile-info-alter-pass-message").hide();

            });
    }
}

/**
 * Desbloquear assunto pela árvore do professor
 * @param {string} idCurriculum
 * @param {string} idDisciplina
 * @returns {JSON}
 */
 function unlockCurriculum(idCurriculum, idDisciplina, media, active) {
    $(".tooltip").remove();

    var idClass = $("#teacher-classroom-select-class").val();
    if ($('#checkAllClassroom').is(":checked")){
      idClass = '00';
  }

  var data = {
    parallel: true,
    method: "unlockCurriculum",
    idClass: idClass,
    idCurriculum: idCurriculum,
    idCourse: idDisciplina,
    callBackSuccess: "callbackUnlockCurriculum"
};

$("#padlock-" + idCurriculum + " .padlock-lock").html('<i class="fa fa-spinner fa-spin"></i>');

requestDivToBackend("/controller/Tree", data, data);

drawNodeTeacher(idCurriculum, media, active);
}

function unlockAllCurriculum(idDisciplina) {    
    var $canvas = $(".canvas canvas");
    
    for (i=0; i<$canvas.length; i++)    {
        var $el = $canvas.eq(i);
        var idCurriculum = $el.attr('id').replace('canvas_','');
        var score = $el.attr('onclick').split(',').slice(-1).pop().split('\'')[1];            
        
        unlockCurriculum(idCurriculum,idDisciplina,score,1);
    }
}

function callbackUnlockCurriculum(obj, data) {
    if (isOk(obj.code)) {
        $("#padlock-" + data.idCurriculum + " .padlock-lock").html('<i class="fa fa-lock"></i>');
        $("#padlock-" + data.idCurriculum + " .padlock-unlock").removeClass("hidden");
        $("#padlock-" + data.idCurriculum + " .padlock-lock").addClass("hidden");
        
    } else {
        $("#padlock-" + data.idCurriculum + " .padlock-unlock").html('<i class="fa fa-exclamation-triangle"></i>');
        setTimeout(function () {
            $("#padlock-" + data.idCurriculum + " .padlock-unlock").html('<i class="fa fa-fa-unlock-alt"></i>');
        }, 2000);
    }
}

/**
 * Bloquear assunto pela árvore do professor
 * @param {string} idCurriculum
 * @param {string} idDisciplina
 * @returns {JSON}
 */
 function lockCurriculum(idCurriculum, idDisciplina, media, active) {
    $(".tooltip").remove();

    var idClass = $("#teacher-classroom-select-class").val();
    if ($('#checkAllClassroom').is(":checked")){
      idClass = '00';
  }

  var data = {
    parallel: true,
    method: "lockCurriculum",
    idClass: idClass,
    idCurriculum: idCurriculum,
    idCourse: idDisciplina,
    callBackSuccess: "callbackLockCurriculum"
};

$("#padlock-" + idCurriculum + " .padlock-unlock").html('<i class="fa fa-spinner fa-spin"></i>');

requestDivToBackend("/controller/Tree", data, data);

drawNodeTeacher(idCurriculum, media, active);
}

function lockAllCurriculum(idDisciplina) {
    var $canvas = $(".canvas canvas");
    
    for (i=0; i<$canvas.length; i++){
        var $el = $canvas.eq(i);
        var idCurriculum = $el.attr('id').replace('canvas_','');
        var score = $el.attr('onclick').split(',').slice(-1).pop().split('\'')[1];       
        
        lockCurriculum(idCurriculum,idDisciplina,score,0);
    }
}

/**
 * Callback chamado ao bloquear currículo na árvore do professor
 * @param {JSON} obj
 * @param {JSON} data
 * @returns {undefined}
 */
 function callbackLockCurriculum(obj, data) {
    if (isOk(obj.code)) {
        $("#padlock-" + data.idCurriculum + " .padlock-unlock").html('<i class="fa fa-unlock-alt"></i>');
        $("#padlock-" + data.idCurriculum + " .padlock-unlock").addClass("hidden");
        $("#padlock-" + data.idCurriculum + " .padlock-lock").removeClass("hidden");

    } else {
        $("#padlock-" + data.idCurriculum + " .padlock-lock").html('<i class="fa fa-exclamation-triangle"></i>');
        setTimeout(function () {
            $("#padlock-" + data.idCurriculum + " .padlock-lock").html('<i class="fa fa-fa-unlock-alt"></i>');
        }, 2000);
    }
}

/**
 * HOVER dos cadeados da árvore
 */
 function activeHoverPadLock() {
    $(".padlock-lock").hover(function () {
        $(this).html($('<i class="fa fa-unlock-alt"></i>'));
    }, function () {
        $(this).html($('<i class="fa fa-lock"></i>'));
    });
    $(".padlock-unlock").hover(function () {
        $(this).html($('<i class="fa fa-lock"></i>'));
    }, function () {
        $(this).html($('<i class="fa fa-unlock-alt"></i>'));
    });
}

/**
 * Carrega o card de calendário
 * @returns {undefined}
 */
 function loadFullCalendar() {
    var data = {
        parallel: true,
        divId: "teacher-calendar-full",
        method: "teacher"
    };

    showLoadSpin(data.divId);

    requestDivToBackend("/controller/Calendar", data);
}

/**
 * Montar o fullCalendar
 * @param {type} arrayEvents
 * @returns {undefined}
 */
 function populateCalendar(arrayEvents) {
    var events = JSON.parse(arrayEvents);

    $('#baseview-calendar-teacher').fullCalendar({
        header: {
            left: 'prev',
            center: 'title',
            right: 'next'
        },
        defaultDate: '2015-05-05',
        lang: 'pt-br',
        buttonIcons: true,
        weekNumbers: false,
        editable: false,
        eventLimit: true,
        events: events.events
    });
}

/************************* video - youtube - controle *************************/
/** funcoes do youtube para qualificar o usuario ao assistir metade do video **/
/******************************************************************************/
var player;
var meuTutorIdVideo;
var hash;

var intervalPlayedTime;
var playedTime;
var totalTime;

function playYouTube(videoId) {
    $("#student-video-play-tv").html(
        '<div id="student-tutorar-video" class="tv">' +
        '<iframe width="100%" height="525" src="https://www.youtube.com/embed/' + videoId + '" frameborder="0" allowfullscreen></iframe>' +
        '</div>'
        );

    onYouTubeIframeAPIReady(videoId);
}

function onYouTubeIframeAPIReady(videoId) {
    playedTime = 1;
    clearInterval(intervalPlayedTime);

    player = new YT.Player('student-tutorar-video', {
        height: '525',
        width: '100%',
        videoId: videoId,
        events: {
            // Esse metodo está dando auto play dos videos na resolução dos Lesson Plan
            //'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function playAmazon(videoId) {
    $("#student-video-play-tv").html('<div id="student-tutorar-video" class="tv">' +
        '<iframe width="100%" height="525" src="https://videos.camaleon.s3.amazonaws.com/' + videoId + '" frameborder="0" allowfullscreen></iframe>' +
        '</div>');
}

function playVimeo(videoId) {
    $("#student-video-play-tv").html(
        '<div id="student-tutorar-video" class="tv">' +
        '<iframe id="player1" src="http://player.vimeo.com/video/' + videoId + '?api=1&player_id=player1" width="100%" height="525" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>' +
        '</div>'
        );

    var iframe = $('#player1')[0];
    player = $f(iframe);

    playedTime = 1;
    clearInterval(intervalPlayedTime);

    // When the player is ready, add listeners for pause, finish, and playProgress
    player.addEvent('ready', function () {
        player.addEvent('pause', onPause);
        player.addEvent('play', onPlay);
        player.addEvent('loadProgress', onLoadProgress);
    });

}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
function onPlayerStateChange(event) {
    // informa o tempo total do video
    var currentTotalTime = event.target.getDuration();
    if (currentTotalTime > 0 && currentTotalTime != totalTime) {
        totalTime = currentTotalTime;
        startCountPLayingVideo();
    }

    // se clicar em play e o contador já tiver sido iniciado, pausa ele e começa novamente ( com o tempo atual )
    if (playedTime > 0 && event.data == YT.PlayerState.PLAYING) {
        clearInterval(intervalPlayedTime);
        startCountPLayingVideo();
    }
    // se clicar em pausar, pausa o contador
    else if (event.data == YT.PlayerState.PAUSED) {
        onPause();
    }
}

function onLoadProgress(data, id) {
    totalTime = data.duration;
}

function onPlay() {
    clearInterval(intervalPlayedTime);
    startCountPLayingVideo();
}

function onPause() {
    clearInterval(intervalPlayedTime);
}

var setouRecurso = false;

function startCountPLayingVideo() {
    intervalPlayedTime = setInterval(function () {
        playedTime = playedTime + 1;
        if (playedTime > (totalTime / 2)) {
            if (!setouRecurso) {
                setouRecurso = true;
//        setaRecursoAprendido();
}

clearInterval(intervalPlayedTime);
}
}, 1000);
}

/**
 * Ver vídeo no professor
 * @param {type} idVideo
 * @param {type} paramMeuTutorIdVideo
 * @param {type} paramHash
 * @param {type} isYoutube
 * @returns {undefined}
 */
 function watchVideo(idVideo, paramMeuTutorIdVideo, paramHash, type) {
    meuTutorIdVideo = paramMeuTutorIdVideo;
    hash = paramHash;

    if (typeVideo == 'youtube') {
        playYouTube(idVideo);
    } else if (typeVideo == "vimeo") {
        playVimeo(idVideo);
    } else if(typeVideo == "amazon"){
        playAmazon(idVideo);
    }
}

/********************************** end video *********************************/

function requestInfoToEdit(idProblema) {
    var data = {
        idProblema: idProblema,
        idCurriculo: $("#select").val(),
        divId: "questionInfo",
        method: "loadQuestionToedit"
    };

    $('.content-area').hide();

    showLoadSpin(data.divId);

    $('#modalEdit').modal('show');

    return requestDivToBackend("/controller/Question", data);
}


/**
 * Usado para cadastrar e editar questões
 * @returns {undefined}
 */
 function saveEditQuestion() {
    var arrayTextOptions = new Array();
    var arrayIdOptions = new Array();
    var correctOption;
    var enunciation = tinymce.get("question-enunciation").getContent();
    var subsubject = $('#listallcontent-insertquestion-subsubject').val();
    var descriptor = $('#listallcontent-insertquestion-descriptor').val();
    var resourceId = $("#question-problem-id").val();

    $("#form1 .problem-option").each(function () {
        arrayIdOptions.push(this.id);
        arrayTextOptions.push(tinymce.get(this.id).getContent());
    });

    $("#form1 .problem-correct-option").each(function () {
        if (this.checked) {
            correctOption = this.value;
        }
    });

    var data = {
        method: "saveOrEditQuestion",
        option_id: arrayIdOptions,
        option_description: arrayTextOptions,
        option_correta: correctOption,
        option_enunciado: enunciation,
        id_curriculo: $("#select").val(),
        id_problema: resourceId,
        level: $("#question-problem-level").val(),
        callBackSuccess: "callbackSaveEditQuestion"
    };

    if (!subsubject && !descriptor) {
        alert('É preciso escolher um assunto e um descritor para a questão');
    } else {
        requestDivToBackend("/controller/Question", data, data)
    }
}

/**
 * Callback do cadastro/edição de questões
 * @param {type} json
 * @returns {undefined}
 */
 function callbackSaveEditQuestion(json, data) {
    var subsubject = $('#listallcontent-insertquestion-subsubject').val();
    var descriptor = $('#listallcontent-insertquestion-descriptor').val();
    var resourceId = json.message;

    var dataToDescriptor = {
        method: "addDescriptorTeacher",
        idResource: resourceId,
        idDescritor: descriptor,
        idSubAssunto: subsubject,
        callBackSuccess: "callbackDataToDescriptor"
    };

    if (isOk(json.code)) {
        requestDivToBackend("/controller/Question", dataToDescriptor, dataToDescriptor);
    } else if (json.code == "401") {
        alert(json.message);
    } else if (json.code == "540") {
        alert(json.message);
    }
}

/**
 *
 * @param {type} json
 * @param {type} data
 * @returns {undefined}
 */
 function callbackDataToDescriptor(json, data) {
    if (isOk(json.code)) {
        data.method = "addSubSubjectTeacher";
        data.callBackSuccess = "callbackDataToSubSubject";

        requestDivToBackend("/controller/Question", data, data);
    } else {
        alert(json.message);
    }
}

/**
 *
 * @param {type} json
 * @param {type} data
 * @returns {undefined}
 */
 function callbackDataToSubSubject(json, data) {
    if (isOk(json.code)) {
        alert("Cadastro efetuado com sucesso!");
        $("#modalEdit").modal("hide");
    } else {
        alert(json.message);
    }
}

/**
 * cadastra um video
 **/
 function registerVideo() {
    var data = {
        idCurriculum: $("#select").val(),
        callBackSuccess: "registerVideoCallback"
    };

    var doRegister = true;
    var $inputs = $('#formRegisterVideo :input');

    $inputs.each(function () {
        if (this.name != "descricao" && $(this).val() == "") {
            doRegister = false;
        }
        data[this.name] = $(this).val();
    });

    if (doRegister) {
        requestDivToBackend("/controller/Video", data);
    } else {
        alert("Preencha as informações");
    }

    return false;
}

function registerVideoCallback(objJson) {
    $("#modalEditVideo").modal("hide");

    alert("Cadastro efetuado com sucesso!");

    setTimeout(function () {
        refresh();
    }, 500);
}

function updateCurriculumList() {

    var idCourse = $("#select-discipline-teacher option:selected").val();
    
    if(idCourse != "none"){
        data = {
            parallel: true,
            idDisciplina: $("#select-discipline-teacher option:selected").val(),
            method: "updateCurriculumList",
            divId: "curriculum-list-select",
            callBackSuccess: ""
        };

        $("#select-curriculum-teacher").attr('enable', 'enable');

        requestDivToBackend("/controller/CardUpdateVideoInformation", data);
        
    }else{
        $("#select-curriculum-teacher").attr('disabled', 'disabled');
        $("#select-topic-teacher").attr('disabled', 'disabled');

    }
}

function updateTopicList() {

    var idCurriculum = $("#select-curriculum-teacher option:selected").val();
    
    if(idCurriculum != "none"){
        data = {
            parallel: true,
            idCurriculum: $("#select-curriculum-teacher option:selected").val(),
            method: "updateTopicList",
            divId: "topic-list-select",
            callBackSuccess: ""
        };

        $("#select-topic-teacher").attr('enable', 'enable');

        requestDivToBackend("/controller/CardUpdateVideoInformation", data);
        
    }else{
        $("#select-topic-teacher").attr('disabled', 'disabled');

    }
}

function removeDisabledAttr(){
   $('#profile-teacher-buttons .btn').removeAttr('disabled');
}

/// IMPRIMIR PONTOS FORTES E FRACOS ////
function printClassSkills() {
  var doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4'
});

      //setHeadImage(doc);
      
      var maxX = 500;
      var pos = getInitialPDFParams();

      var school = document.getElementById('school_name_sidebar').innerText.trim();
      var turma = document.getElementById('turma').innerText.trim();
      var teacher = document.getElementById('modulo_tipo').innerText.trim();
      

      doc.setFontSize(12);
      doc.setFontStyle('normal');
      pos = addText(doc, pos, 'Escola: ' + school);
      pos = addText(doc, pos, turma);
      pos = addText(doc, pos, 'Professor: '+teacher);
      pos = addText(doc, pos, '\n');
      pos = addText(doc, pos, '\n');

      var pathStrongPoints = "#class-room-strong-points-to-teacher table tbody tr td";
      var pathWeakPoints = "#class-room-weak-points-to-teacher table tbody tr td";


      //STRONG POINTS
      var map = getPoints(pathStrongPoints);

      var assuntos = sortMapByKey(map);
      doc.setFontSize(14);
      doc.setFontStyle('bold');
      pos = addText(doc, pos, '\t\t\t\t\t\tPONTOS FORTES');

      pos = printCurriculumTopics(pos, doc, map, assuntos);

      //WEAK POINTS
      map = getPoints(pathWeakPoints);
      
      assuntos = sortMapByKey(map);
      
      doc.setFontSize(14);
      doc.setFontStyle('bold');
      pos = addText(doc, pos, '\n\n\t\t\t\t\t\tPONTOS FRACOS');

      pos = printCurriculumTopics(pos, doc, map, assuntos);
      
      
      var extension = '.pdf';
      var fileName = school+'-'+turma + extension;
      doc.save(fileName);    
  }

  function printStudentSkills() {
      var doc = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4'
    });

      //setHeadImage(doc);
      
      var maxX = 500;
      var pos = getInitialPDFParams();

      var school = document.getElementById('school_name_sidebar').innerText.trim();      
      var teacher = document.getElementById('modulo_tipo').innerText.trim();
      var turma = document.getElementById('class-name').innerText.trim();
      var studentName = document.getElementById('profile-student-name').innerText.trim()
      + ' ' + document.getElementById('profile-student-lastname').innerText.trim();
      
      
      doc.setFontSize(12);
      doc.setFontStyle('normal');
      pos = addText(doc, pos, 'Escola: ' + school);
      pos = addText(doc, pos, 'Professor: '+teacher);
      pos = addText(doc, pos, turma);
      pos = addText(doc, pos, 'Aluno: '+ studentName);
      pos = addText(doc, pos, '\n');
      pos = addText(doc, pos, '\n');

      var pathStrongPoints = "#teacher-list-of-strong-points table tbody tr td";
      var pathWeakPoints = "#teacher-list-of-weak-points table tbody tr td";


      //STRONG POINTS
      var map = getPoints(pathStrongPoints);

      var assuntos = sortMapByKey(map);
      doc.setFontSize(14);
      doc.setFontStyle('bold');
      pos = addText(doc, pos, '\t\t\t\t\t\tPONTOS FORTES\n');
      
      pos = printCurriculumTopics(pos, doc, map, assuntos);

      //WEAK POINTS
      map = getPoints(pathWeakPoints);
      
      assuntos = sortMapByKey(map);
      
      doc.setFontSize(14);
      doc.setFontStyle('bold');
      pos = addText(doc, pos, '\n\n\t\t\t\t\t\tPONTOS FRACOS\n');
      
      pos = printCurriculumTopics(pos, doc, map, assuntos);
      
      
      var extension = '.pdf';
      var fileName = school+'-'+turma + extension;
      doc.save(fileName);    
  }


function getInitialPDFParams(){
    var pos = new Object();
    pos['x']=50;
    pos['y']=50;
    pos['pageCount'] = 1;

    return pos;
}

function addText(doc, pos, text){  
  
  var lines;
  if(text == '\n'){
    lines = new Array();
    lines.push('\n');
  }else{
    lines = doc.splitTextToSize(text, 1000);
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

//Converte uma tabela em json
function tableToJson(table) {
    var data = [];
    var headers = [];

    for (var i = 0; i < table.rows[0].cells.length; i++) {
        headers[i] = table.rows[0].cells[i].innerHTML
    }

    data.push(headers);

    for (var i = 1; i < table.rows.length; i++) {

        var tableRow = table.rows[i];

        var rowData = {};

        for ( var j = 0; j < tableRow.cells.length; j++) {
            rowData[headers[j]] = tableRow.cells[j].innerHTML;
        } 

        data.push(rowData);
    }


    return data;
}

//Imprime a tabela
function printTable(doc, table) {
    
    let resultTable = tableToJson(table);

    doc.cellInitialize();

    $.each(resultTable, function(i, row) {
        $.each(row, function(j, cell) {
            if(j == 0 | j == 'NOME'){
                doc.cell(50, 230, 335, 20, cell, i);
            }
            else {
                doc.cell(50, 230, 80, 20, cell, i);
            }
        })
    })

    
}


//// IMPRIMIR SIMULADOS ////////
function printClassAssessment(evaluationId) {

      var doc = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4'
      });

      var pos = getInitialPDFParams();

      doc.setFontSize(14);
      doc.setFontStyle('bold');
      pos = addText(doc, pos, 'DETALHES DO SIMULADO'); 

      pos.y += 10;

      let evaluation = $('#detalhar-'+evaluationId);
      let school = $('#school_name_sidebar').text().trim();
      let turma = $('#turma').text().trim();
      let teacher = $('#modulo_tipo').text().trim();
      let note_med = evaluation.find('.nota').text().trim();
      let note_correct = evaluation.find('.correctNumber').text().trim();
      let note_error = evaluation.find('.errorNumber').text().trim();
      let total_time = evaluation.find('.totalTime').text().trim();
      let tables = $('#detalhar-' + evaluationId + ' .table tbody tr');     
      
      doc.setFontSize(12);
      doc.setFontStyle('normal');
      
      pos = addText(doc, pos, 'Escola: ' + school)
      pos = addText(doc, pos, 'Turma: ' + turma)
      pos = addText(doc, pos, 'Professor: ' + teacher)

      pos = addText(doc, pos, 'Nota média da turma: ' + note_med)
      pos = addText(doc, pos, 'Média de acertos: ' + note_correct)
      pos = addText(doc, pos, 'Média de erros: ' + note_error)
      pos = addText(doc, pos, 'Tempo médio de resposta: ' + total_time)


      let tableAnsware = $('#tb-answare-' + evaluationId).get(0);
      let tableNotAnsware = $('#tb-not-answare-' + evaluationId).get(0);
 
      doc.setFontSize(14);
      doc.setFontStyle('bold');

      pos.y += 30;

      pos = addText(doc, pos, 'ALUNOS QUE RESPONDERAM'); 

      doc.setFontSize(12);
      doc.setFontStyle('normal');

      pos.y += 20;
      /*let table = new TableCamaleon(tableAnsware);
      table.cell.top = pos.y;
      table.cell.left = pos.x;
      table.headerWidth = [200, 80, 80, 80];
      doc = table.print(doc);*/
      
      doc.setFontSize(14);
      doc.setFontStyle('bold');

      pos.y += 30;

      pos = addText(doc, pos, 'ALUNOS QUE NÃO RESPONDERAM'); 

      doc.setFontSize(12);
      doc.setFontStyle('normal');

      pos.y += 20;

      /*let table2 = new TableCamaleon(tableNotAnsware);
      table2.cell.top = pos.y;
      table2.cell.left = pos.x;
      table2.headerWidth = [200, 80, 80, 80];
      doc = table2.print(doc);*/

      doc.save(school +' - ' + turma + '.pdf');    
  }

/*
class TableCamaleon {
    
    constructor(tableObject) {
        this.tableObject = tableObject;
        this.header = [];
        this.header_width = [];
        this.data = [];
        this.body = [];
        this.cell = {
            width: 100,
            height: 20,
            left: 20,
            top: 20
        };
    }

    get getHeader() {
        
        for (var i = 0; i < this.tableObject.rows[0].cells.length; i++) {
            this.header[i] = this.tableObject.rows[0].cells[i].innerHTML;
        }

        return this.header;
    }

    get getBody() {

        let headers = this.getHeader;
        this.data.push(headers);

        for (var i = 1; i < this.tableObject.rows.length; i++) {

            var rowIterator = this.tableObject.rows[i];

            var row= {};

            for ( var j = 0; j < rowIterator.cells.length; j++) {
                row[headers[j]] = rowIterator.cells[j].innerHTML;
            } 

            this.body.push(row);
            this.data.push(row);
        }
        
        return this.body;
    }

    set headerWidth(widths) {
        this.header_width = widths;
    }

    toJson() {
        this.getBody;
        return this.data;
    }


    print(doc) {
            
        doc.cellInitialize();

        let table = this.toJson();
        var configCell = this.cell;
        let header_width = this.header_width

        $.each(table, function(i, row) {
            let iterator = 0;
            $.each(row, function(j, content) {
                
                if(typeof j === 'number') {
                    doc.setFontSize(14);
                    doc.setFontStyle('bold');
                }
                
                else {
                    doc.setFontSize(12);
                    doc.setFontStyle('normal');
                }
                
                doc.cell(configCell.left, configCell.top, header_width[iterator], configCell.height, content, i);
                iterator++;
            })
        })

        return doc;
    }


}*/