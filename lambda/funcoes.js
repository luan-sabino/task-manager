exports.handler = function (event, context, callback) {
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

                var leftButton = document.createElement('div');
                var rigthButton = document.createElement('div');
                var delButton = document.createElement('div');
                var buttonContainer = document.createElement('div');

                $(leftButton).attr({ class: 'button' + ' left' });
                $(rigthButton).attr({ class: 'button' + ' rigth' });
                $(delButton).attr({ class: 'button' + ' delete' });
                $(buttonContainer).attr({ class: 'buttonContainer' });

                buttonContainer.appendChild(leftButton);
                buttonContainer.appendChild(rigthButton);
                buttonContainer.appendChild(delButton);

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
                Element.appendChild(buttonContainer);
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

        $(document).on("click", ".buttonClosePopUp", function () {
            endPopUp();
        });

        $("#buttonAddContent").click(function () {
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
        });


        function preencheBarrasdeProgresso(PorcentagemDeProgressoOrdenado, totalTarefas) {
            setInitialStateOfProgressBar(totalTarefas, PorcentagemDeProgressoOrdenado);

            $('#to-do-bar').animate({ "width": PorcentagemDeProgressoOrdenado[0] + "vw" }, 600);
            $('#in-p-bar').animate({ "width": PorcentagemDeProgressoOrdenado[1] + "vw" }, 600);
            $('#rmk-bar').animate({ "width": PorcentagemDeProgressoOrdenado[2] + "vw" }, 600);
            $('#complete-bar').animate({ "width": PorcentagemDeProgressoOrdenado[3] + "vw" }, 600);
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

        function setInitialStateOfProgressBar(totalTarefas, PorcentagemDeProgressoOrdenado) {
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

        function widthProgressBars(PorcentagemDeProgressoOrdenado) {
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

        function renderAllAndAttProgress(tarefasToDo, tarefasInP, tarefasRmk, tarefasComplete, ToDoListElement, InPListElement, RmkListElement, CompleteListElement) {
            render(tarefasToDo, ToDoListElement);
            render(tarefasInP, InPListElement);
            render(tarefasRmk, RmkListElement);
            render(tarefasComplete, CompleteListElement);
            progressBar();
        }



        document.addEventListener("change", function () { progressBar() });

        function addTaskToList(receiveTask, DeliverTask, position) {
            receiveTask.push(DeliverTask[parseInt(position)]);
        }

        function removeTaskOfTheList(listWithTaskToDel, position) {
            listWithTaskToDel.splice(parseInt(position), 1);
        }

        function changeLists(receiveTask, DeliverTask, position) {
            receiveTask.push(DeliverTask[parseInt(position)]);
            DeliverTask.splice(parseInt(position), 1);

        }



        $(document).on("click", "#lista-interface .button", function (e) {
            let target = e.target;
            let parente = $(target).parents('.tarefas');
            let idDiv = $(parente)[0].id;
            let position = parseInt(idDiv);


            let idParent = $(target).parents();

            if (idParent.is("#to-do-body")) {
                if ($(this).is(".left")) {
                    changeLists(tarefasComplete, tarefasToDo, position);
                }
                if ($(this).is(".rigth")) {
                    changeLists(tarefasInP, tarefasToDo, position);
                }
                if ($(this).is(".delete")) {
                    removeTaskOfTheList(tarefasToDo, position);
                }
                renderAllAndAttProgress(tarefasToDo, tarefasInP, tarefasRmk, tarefasComplete, ToDoListElement, InPListElement, RmkListElement, CompleteListElement);

            }

            if (idParent.is("#in-p-body")) {
                if ($(this).is(".left")) {
                    changeLists(tarefasToDo, tarefasInP, position);
                }
                if ($(this).is(".rigth")) {
                    changeLists(tarefasRmk, tarefasInP, position);
                }
                if ($(this).is(".delete")) {
                    removeTaskOfTheList(tarefasInP, position);
                }
                renderAllAndAttProgress(tarefasToDo, tarefasInP, tarefasRmk, tarefasComplete, ToDoListElement, InPListElement, RmkListElement, CompleteListElement);
            }

            if (idParent.is("#rmk-body")) {
                if ($(this).is(".left")) {
                    changeLists(tarefasInP, tarefasRmk, position);
                }
                if ($(this).is(".rigth")) {
                    changeLists(tarefasComplete, tarefasRmk, position);
                }
                if ($(this).is(".delete")) {
                    removeTaskOfTheList(tarefasRmk, position);
                }
                renderAllAndAttProgress(tarefasToDo, tarefasInP, tarefasRmk, tarefasComplete, ToDoListElement, InPListElement, RmkListElement, CompleteListElement);
            }

            if (idParent.is("#complete-body")) {
                if ($(this).is(".left")) {
                    changeLists(tarefasRmk, tarefasComplete, position);
                }
                if ($(this).is(".rigth")) {
                    removeTaskOfTheList(tarefasComplete, position);
                }
                if ($(this).is(".delete")) {
                    removeTaskOfTheList(tarefasComplete, position);
                }
                renderAllAndAttProgress(tarefasToDo, tarefasInP, tarefasRmk, tarefasComplete, ToDoListElement, InPListElement, RmkListElement, CompleteListElement);
            }

        })


    });


}