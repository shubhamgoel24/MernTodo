import React from 'react';
import './App.css';
import axios from 'axios'
import List from './List.jsx';
import $ from 'jquery';
import Noty from 'noty';

let newTaskDom = (task) => {
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

class App extends React.Component {
    state = {
        list:[],
        loading :true
    }

    async componentDidMount(){
        const data = await axios.get('http://localhost:8005/data');
        this.setState({ 
            list : data.data.task,
            loading:false
        });
    }

    datelim = () => {
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
    }

    createTask = () => {
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
    

    delfunc = () => {
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
                $.each(delarry,function(i,x){
                    let y = $('#tasks-list-container').find(`#${x}`);
                    y.remove();
                });
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
    }
    
    render(){
        const {list,loading} = this.state;
        
        return (
            <div className="App">
              <div className="container">
                    <div className="row">
                        <h1>ToDo List App</h1>
                    </div>
                    <form action="../../create-Task" id="new-task-form" method="POST">
                        <div className="row">
                            <div id="description">
                                <h4>Description</h4>
                                <input type="text" name="description" placeholder="What do you need to do ?"  ></input>
                            </div>
                        </div>
                        
                        <div className="row">
                            <div id="category" className="col-6" >
                                <h4>Category</h4>
                                <select name="category" id="catego" defaultValue = '1'>
                                    <option value="1" disabled hidden>Choose Category</option>
                                    <option value="Personal">Personal</option>
                                    <option value="Work">Work</option>
                                    <option value="School">School</option>
                                    <option value="Cleaning">Cleaning</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div id="date" className="col-6">
                                <h4>Due Date</h4>
                                <input type="date" name="date" id="date-input" onClick={this.datelim} required></input>
                            </div>
                        </div>
                        <div className= "row d-flex justify-content-center button_row">
                            <button id="del" className=" col-5 col-sm-4 col-md-3 col-lg-2" type="button" onClick={this.delfunc}><i className="fas fa-trash"></i> Delete</button>
                            <button id="add" className=" col-5 col-sm-4 col-md-3 col-lg-2" type="submit" onClick={this.createTask}><i className="fas fa-plus"></i> Add</button>
                        </div>
                    </form>
                    
                    
        
                    
        
                    <div>
                        <ul className="container task_list" id="tasks-list-container">
                            {loading && <h1>Loading...</h1>}
                            {
                                !loading &&
                                <List list={list}/>
                            }
                        </ul>
                        
                        <div>
                            To delete a task: <br></br>
                            First select the task using the checkbox.Then click the delete button.
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
