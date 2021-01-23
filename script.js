function create(){
    var select=$("#select_size").val();
    var arr =[];
    var arrText='';
    var list = [];
    for(var i=0; i<select;i++){
        for(var j=0; j<select[i];j++){
            list[i][j] = 15;    
        }    
    }
    $("#game").html(list);
    console.log(list);
}


$("#start_button").click(function(){
    create();
});
$(function() {
    console.log( "ready!" );
});