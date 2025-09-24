$(document).ready(function(){
    renderTasks();
    function addTask() {
        var TaskValue = $(".taskInput").val().trim();
        if (TaskValue.length == 0){
            $("#alert").removeClass("d-none")
            setTimeout(() =>{
                $("#alert").addClass("d-none")
            }, 2000);
        }else{ 
            var tasksValues = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];
            tasksValues.push(TaskValue);
            localStorage.setItem("tasks", JSON.stringify(tasksValues));
            renderTasks();
            $.notify("Tarea Agregada", "success");
        }
    }
    $("#SevaTask").click(function(){
        addTask();
    });
    $(".taskInput").keypress(function(e){
        if(e.which === 13){
            addTask();
        }
    });
});

function renderTasks(){
    var lisTasks = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];
    var htmlList = "<ul class='list-group'>";
    lisTasks.forEach(function (task, index) {
        htmlList += `<li class='list-group-item d-flex justify-content-between align-items-center'>${task}
            <button type='button' class='btn btn-sm btn-danger' onclick='removeItem(${index})'>ELIMINAR</button>
        </li>`;
    });
    htmlList += "</ul>";
    $("#listasks").html(htmlList);
}

window.removeItem = function(index){
    var lisTasks = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];
    lisTasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(lisTasks));
    renderTasks();
    $.notify("Tarea Eliminada", "info");
}