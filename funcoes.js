$(function(){
    
    let tarefas = 0;

    $("#botao-f").click(function(){
        $("#popup").css("display","flex");
        $("#botao-f").css("display","none");
    });

    $(document).on("keydown",function(e){
        if((e.which = 13) && e.altKey){
            let tituloTarefaNova = $("#titulo-t").val();
            let conteudoTarefaNova = $("#conteudo-t").val();
            let div = d3
            .select("#to-do")
            .data([])

            .select("#to-do")
            

            $("#popup").css("display","none");
            $("#botao-f").css("display","block");
        }
    })

});
