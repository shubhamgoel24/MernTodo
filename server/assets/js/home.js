$("#del").click(function(){
    var listitems=$("input:checked");
    var delarry = [];
    $.each(listitems,function(i,x){
        delarry.push(x.id);
    });
    var arrStr = encodeURIComponent(JSON.stringify(delarry));
    $.ajax({
        type: 'get',
        url: '/delete-task/?id=' + arrStr,
        success: function(data){
            delfunc(delarry);
            
            new Noty({
                theme: 'relax',
                text: data.message,
                type: 'success',
                layout: 'topRight',
                timeout: 1500
                
            }).show();

        }, error: function(error){
            console.log(error.responseText);
        }
    });
});
let delfunc = function(delarr){
    $.each(delarr,function(i,x){
        let y = $('#tasks-list-container').find(`#${x}`);
        y.remove();
    });
}

let createTask = function(){
    let newTaskForm = $('#new-task-form');
    newTaskForm.submit(function(e){
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/create-Task',
            data: newTaskForm.serialize(),
            success: function(data){
                let newTask = newTaskDom(data.data.task);
                $('#tasks-list-container').append(newTask);

                new Noty({
                    theme: 'relax',
                    text: data.message,
                    type: 'success',
                    layout: 'topRight',
                    timeout: 1500
                    
                }).show();

            }, error: function(error){
                console.log(error.responseText);
            }
        });
    });
}
let newTaskDom = function(task){
    let x = task.date;
    let y = new Date(Date.parse(x));
    return $(`
        <li class="row item" id="${task._id}">
            <input type="checkbox" class="col-1 listitem" id="${task._id}">
            <div class="col-5">
                <div id="taskdisc" class="row">${task.description}</div>
                <div id="taskdate" class="row"> ${Intl.DateTimeFormat('en-GB', {year: 'numeric', month: 'long', day: 'numeric' }).format(y)}</div>
            </div>
            <div class="col-6">
                <div class="row d-flex justify-content-end">${task.category}</div>
            </div>
        </li>
    `);
}
createTask();

var datelim = function(){
    var dtToday = new Date();

    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();

    if(month < 10)
        month = '0' + month.toString();
    if(day < 10)
        day = '0' + day.toString();

    var maxDate = year + '-' + month + '-' + day;    
    $('#date-input').attr('min', maxDate);
};
datelim();