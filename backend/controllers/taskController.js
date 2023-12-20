
//Get all tasks
const getTasks = async (req,res) =>{
    const tasks = await Task.find({})
}

//Post new task
const createTask = async (req,res) =>{
    const {content , date, id} = req.body
    if (date != '')
        var type = ['schedual']
    else
        var type = []

    // add doc to db
    try{
        const task = {content,type,date}
        // need to get the user document from the database **********************************************
        res.status(200).json(task)
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}
//DELETE task

module.exports = {
    createTask
}
