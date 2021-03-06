const Task = require('../models/task');
module.exports.home = function(req,res){
    console.log("request");
    Task.find({} , function(err, tasks){
        if(err){
            console.log("Error in fetching contacts");
            return;
        }
        res.setHeader('Access-Control-Allow-Origin', 'https://todo.shubhamgoel24.me');
        return res.status(200).json({
            task:tasks
        });
    });
};

module.exports.create_task= async function(req,res){
    try{
        let task = await Task.create({
            description: req.body.description,
            date: req.body.date,
            category: req.body.category
        });
        
        res.setHeader('Access-Control-Allow-Origin', 'https://todo.shubhamgoel24.me');
        return res.status(200).json({
            data: {
                task : task
            },
            message: "Task Created!"
        });
    }catch(err){
        console.log("Error in creating task" + err);
        return;
    }
};


module.exports.delete_task=function(req,res){
    try{
        let id=req.query.id;
        var xy = JSON.parse(id);
        xy.forEach(idno => {
            Task.findByIdAndDelete(idno,function(err){
                if(err){
                    console.log('Error in deleting an object from database');
                    return;
                }
            });
        });
        res.setHeader('Access-Control-Allow-Origin', 'https://todo.shubhamgoel24.me');
        return res.status(200).json({
            message: "Tasks Deleted Sucessfully !"
        });
    }catch(err){
        console.log("Error in deleting task" + err);
        return;
    }
};