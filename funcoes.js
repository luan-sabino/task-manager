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

            todoElementTextTitle.setAttribute('id', pos);

            todoElementTextTitle.appendChild(textTitle);
            todoElementTextContent.appendChild(textContent);

            todoElement.setAttribute('class', 'tarefas');
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
            }


        }

        if(e.which == 27){
            endPopUp();
        }
        
    })

    // function progress(){
    //     var divsToDo = $("#to-do-body");
    //     var tam = divsToDo.length;
    //     console.log(tam);
    //     alert(tam);
    // }

    // setInterval(progress(), 1000);

    

});
