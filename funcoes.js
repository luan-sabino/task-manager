$(function(){
    
    var tarefas = []

    var toDoListElement = document.querySelector("#lista-interface #to-do #to-do-body");
    var transferElement = document.querySelectorAll("#lista-interface #to-do #to-do-body");

    
    $("#botao-f").click(function(){
        $("#popup").css("display","flex");
        $("#botao-f").css("display","none");
    });

    function render(){
        toDoListElement.innerHTML = '';

        for(tarefa of tarefas){
            var todoElement = document.createElement('div')
            var todoElementTextTitle = document.createElement('textarea')
            var todoElementTextContent = document.createElement('textarea')

            var textTitle = document.createTextNode(tarefa.titulo);
            var textContent = document.createTextNode(tarefa.conteudo);

            var pos = tarefas.indexOf(tarefa);

            

            todoElementTextTitle.appendChild(textTitle);
            todoElementTextContent.appendChild(textContent);

            todoElement.setAttribute('class', 'tarefas');
            todoElement.setAttribute('id', pos);
            todoElementTextTitle.setAttribute('class', 'titulo-ef');
            todoElementTextContent.setAttribute('class', 'conteudo-ef');
            todoElementTextTitle.setAttribute('readonly', 'readonly');
            todoElementTextContent.setAttribute('readonly', 'readonly');

            todoElement.appendChild(todoElementTextTitle);
            todoElement.appendChild(todoElementTextContent);
            toDoListElement.appendChild(todoElement);
            
        }
    }

    function endPopUp(){
        $("#titulo-t").val('');
        $("#conteudo-t").val('');

        $("#popup").css("display","none");
        $("#botao-f").css("display","block");
    }

    $(document).on("keydown",function(e){
        
        if((e.which == 13) && e.altKey){
            var tituloT = $("#titulo-t").val();
            var conteudoT = $("#conteudo-t").val();

            if(tituloT === '' || conteudoT === ''){
                endPopUp();
                
            }else{
                tarefas.push({'titulo': tituloT,'conteudo':conteudoT});

                render();
    
                endPopUp();

                progress();
            }


        }

        if(e.which == 27){
            endPopUp();
        }

    })

    
    function preencheBarrasdeProgresso(PorcentagemDeProgressoOrdenado){
        $('#to-do-bar').css({"width":PorcentagemDeProgressoOrdenado[0] +"vw", "background-color":"#ab0000"});
        $('#in-p-bar').css({"width":PorcentagemDeProgressoOrdenado[1] +"vw", "background-color":"#002bab"});
        $('#rmk-bar').css({"width":PorcentagemDeProgressoOrdenado[2] +"vw", "background-color":"#00ffff"});
        $('#complete-bar').css({"width":PorcentagemDeProgressoOrdenado[3] +"vw", "background-color":"#36cc14"});
    }

    function TextoPorcentagemBarraDeProgresso(PorcentagemDeProgressoOrdenado){
        $('#to-do-bar').html('');
        $('#in-p-bar').html('');
        $('#rmk-bar').html('');
        $('#complete-bar').html('');
                
        $('#to-do-bar').html(PorcentagemDeProgressoOrdenado[0].toFixed()+"%");
        $('#in-p-bar').html(PorcentagemDeProgressoOrdenado[1].toFixed()+"%");
        $('#rmk-bar').html(PorcentagemDeProgressoOrdenado[2].toFixed()+"%");
        $('#complete-bar').html(PorcentagemDeProgressoOrdenado[3].toFixed()+"%");
    }
    
    function progress(){
        let elemento = document.getElementById('to-do-body');
        let quantidadeTarefasToDo = elemento.children.length;
        
        elemento = document.getElementById('in-p-body');
        let quantidadeTarefasInP = elemento.children.length;

        elemento = document.getElementById('rmk-body');
        let quantidadeTarefasRmk = elemento.children.length;

        elemento = document.getElementById('complete-body');
        let quantidadeTarefasComplete = elemento.children.length;

        let totalTarefas = quantidadeTarefasComplete + quantidadeTarefasInP + quantidadeTarefasRmk + quantidadeTarefasToDo;

        let PorcentagemDeProgressoOrdenado = [];

        PorcentagemDeProgressoOrdenado[0] = (100/totalTarefas) * quantidadeTarefasToDo;
        PorcentagemDeProgressoOrdenado[1] = (100/totalTarefas) * quantidadeTarefasInP;
        PorcentagemDeProgressoOrdenado[2] = (100/totalTarefas) * quantidadeTarefasRmk;
        PorcentagemDeProgressoOrdenado[3] = (100/totalTarefas) * quantidadeTarefasComplete;

        if(totalTarefas === 0){
            PorcentagemDeProgressoOrdenado[3] = 100;
            $("#in-p-bar").css({"display":"none"});
            $("#to-do-bar").css({"display":"none"});
            $("#rmk-bar").css({"display":"none"});
        }else{
            $("#in-p-bar").css({"display":"inline-block"})
            $("#to-do-bar").css({"display":"inline-block"})
            $("#rmk-bar").css({"display":"inline-block"})
        }

        preencheBarrasdeProgresso(PorcentagemDeProgressoOrdenado);

        TextoPorcentagemBarraDeProgresso(PorcentagemDeProgressoOrdenado);


    }

    progress();

    document.addEventListener("change", function(){progress()});
    
    $("#lista-interface").on("click",".titulo-ef",function (){
        alert("FUNCIONOU");
    })

    

});
