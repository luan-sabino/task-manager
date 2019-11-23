$(function () {

    let PorcentagemDeProgressoOrdenado = [];
    var tarefasToDo = [];
    var tarefasInP = [];
    var tarefasRmk = [];
    var tarefasComplete = [];

    var ToDoListElement = document.querySelector("#lista-interface #to-do #to-do-body");
    var InPListElement = document.querySelector("#lista-interface #in-p #in-p-body");
    var RmkListElement = document.querySelector("#lista-interface #rmk #rmk-body");
    var CompleteListElement = document.querySelector("#lista-interface #complete #complete-body");

    function render(tarefas, ListElement) {
        ListElement.innerHTML = '';

        for (tarefa of tarefas) {
            var Element = document.createElement('div')
            var ElementTextTitle = document.createElement('textarea')
            var ElementTextContent = document.createElement('textarea')

            var textTitle = document.createTextNode(tarefa.titulo);
            var textContent = document.createTextNode(tarefa.conteudo);

            var pos = tarefas.indexOf(tarefa);

            ElementTextTitle.appendChild(textTitle);
            ElementTextContent.appendChild(textContent);

            Element.setAttribute('class', 'tarefas');
            Element.setAttribute('id', pos);
            ElementTextTitle.setAttribute('class', 'titulo-ef');
            ElementTextContent.setAttribute('class', 'conteudo-ef');
            ElementTextTitle.setAttribute('readonly', 'readonly');
            ElementTextContent.setAttribute('readonly', 'readonly');

            Element.appendChild(ElementTextTitle);
            Element.appendChild(ElementTextContent);
            ListElement.appendChild(Element);

        }
    }


    $("#botao-f").click(function () {
        $("#popup").css("display", "flex");
        $("#botao-f").css("display", "none");
    });

    function endPopUp() {
        $("#titulo-t").val('');
        $("#conteudo-t").val('');

        $("#popup").css("display", "none");
        $("#botao-f").css("display", "block");
    }

    $(document).on("keydown", function (e) {

        if ((e.which == 13) && e.altKey) {
            var tituloT = $("#titulo-t").val();
            var conteudoT = $("#conteudo-t").val();

            if (tituloT === '' || conteudoT === '') {
                endPopUp();

            } else {
                tarefasToDo.push({ 'titulo': tituloT, 'conteudo': conteudoT });

                render(tarefasToDo, ToDoListElement);

                endPopUp();

                progressBar();
            }


        }

        if (e.which == 27) {
            endPopUp();
        }

    })

    function preencheBarrasdeProgresso(PorcentagemDeProgressoOrdenado, totalTarefas) {
        setInitialStateOfProgressBar(totalTarefas, PorcentagemDeProgressoOrdenado);

        $('#to-do-bar').animate({ "width": PorcentagemDeProgressoOrdenado[0] + "vw"}, 600);
        $('#in-p-bar').animate({ "width": PorcentagemDeProgressoOrdenado[1] + "vw"}, 600);
        $('#rmk-bar').animate({ "width": PorcentagemDeProgressoOrdenado[2] + "vw"}, 600);
        $('#complete-bar').animate({ "width": PorcentagemDeProgressoOrdenado[3] + "vw"}, 600);
    }

    function TextoPorcentagemBarraDeProgresso(PorcentagemDeProgressoOrdenado) {
        $('#to-do-bar').html('');
        $('#in-p-bar').html('');
        $('#rmk-bar').html('');
        $('#complete-bar').html('');

        $('#to-do-bar').html(PorcentagemDeProgressoOrdenado[0].toFixed() + "%");
        $('#in-p-bar').html(PorcentagemDeProgressoOrdenado[1].toFixed() + "%");
        $('#rmk-bar').html(PorcentagemDeProgressoOrdenado[2].toFixed() + "%");
        $('#complete-bar').html(PorcentagemDeProgressoOrdenado[3].toFixed() + "%");
    }

    function setInitialStateOfProgressBar(totalTarefas, PorcentagemDeProgressoOrdenado){
        if (totalTarefas === 0) {
            PorcentagemDeProgressoOrdenado[3] = 100;
            $("#in-p-bar").css({ "display": "none" });
            $("#to-do-bar").css({ "display": "none" });
            $("#rmk-bar").css({ "display": "none" });
        } else {
            $("#in-p-bar").css({ "display": "inline-block" })
            $("#to-do-bar").css({ "display": "inline-block" })
            $("#rmk-bar").css({ "display": "inline-block" })
        }
    }

    function widthProgressBars(PorcentagemDeProgressoOrdenado){
        let elemento = document.getElementById('to-do-body');
        let quantidadeTarefasToDo = elemento.children.length;

        elemento = document.getElementById('in-p-body');
        let quantidadeTarefasInP = elemento.children.length;

        elemento = document.getElementById('rmk-body');
        let quantidadeTarefasRmk = elemento.children.length;

        elemento = document.getElementById('complete-body');
        let quantidadeTarefasComplete = elemento.children.length;

        let totalTarefas = quantidadeTarefasComplete + quantidadeTarefasInP + quantidadeTarefasRmk + quantidadeTarefasToDo;

        PorcentagemDeProgressoOrdenado[0] = (100 / totalTarefas) * quantidadeTarefasToDo;
        PorcentagemDeProgressoOrdenado[1] = (100 / totalTarefas) * quantidadeTarefasInP;
        PorcentagemDeProgressoOrdenado[2] = (100 / totalTarefas) * quantidadeTarefasRmk;
        PorcentagemDeProgressoOrdenado[3] = (100 / totalTarefas) * quantidadeTarefasComplete;

        return totalTarefas;
    }

    function progressBar() {

        preencheBarrasdeProgresso(PorcentagemDeProgressoOrdenado, widthProgressBars(PorcentagemDeProgressoOrdenado));

        TextoPorcentagemBarraDeProgresso(PorcentagemDeProgressoOrdenado);

    }

    function renderAll(tarefasToDo, tarefasInP, tarefasRmk, tarefasComplete, ToDoListElement, InPListElement, RmkListElement, CompleteListElement) {
        render(tarefasToDo, ToDoListElement);
        render(tarefasInP, InPListElement);
        render(tarefasRmk, RmkListElement);
        render(tarefasComplete, CompleteListElement);
    }

    progressBar();

    document.addEventListener("change", function () { progressBar() });

    $("#lista-interface").on("click", ".titulo-ef", function () {
        let parente = $(this).parent();
        let idDiv = $(parente)[0].id;

        let idParent = $(this).parents();

        if (idParent.is("#to-do-body")) {
            tarefasInP.push(tarefasToDo[parseInt(idDiv)]);
            tarefasToDo.splice(parseInt(idDiv), 1);
            renderAll(tarefasToDo, tarefasInP, tarefasRmk, tarefasComplete, ToDoListElement, InPListElement, RmkListElement, CompleteListElement);
            progressBar();
        }

        if (idParent.is("#in-p-body")) {
            tarefasRmk.push(tarefasInP[parseInt(idDiv)]);
            tarefasInP.splice(parseInt(idDiv), 1);
            renderAll(tarefasToDo, tarefasInP, tarefasRmk, tarefasComplete, ToDoListElement, InPListElement, RmkListElement, CompleteListElement);
            progressBar();
        }

        if (idParent.is("#rmk-body")) {
            tarefasComplete.push(tarefasRmk[parseInt(idDiv)]);
            tarefasRmk.splice(parseInt(idDiv), 1);
            renderAll(tarefasToDo, tarefasInP, tarefasRmk, tarefasComplete, ToDoListElement, InPListElement, RmkListElement, CompleteListElement);
            progressBar();
        }

        if (idParent.is("#complete-body")) {
            tarefasComplete.splice(parseInt(idDiv), 1);
            renderAll(tarefasToDo, tarefasInP, tarefasRmk, tarefasComplete, ToDoListElement, InPListElement, RmkListElement, CompleteListElement);
            progressBar();
        }

    })

});
