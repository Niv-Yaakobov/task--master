const User = require('../models/userModel')
const Group = require('../models/groupModle')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;


// create new user
const createUser = (req,res) =>{
    const {mail, password} = req.body
    try{
        // check if user's mail is already exists
        User.findOne({mail: mail})
            .then(returnUser => {
                if (returnUser){
                    //user already exist
                    res.status(200).json({id:'0'})
                }
                else{
                    // send user Id - THE AUTHENTICATION DATA 
                    User.create({mail,password}).then(user => res.status(200).json({ id : user.id}))
                }
            })
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}

// check login authentication
const loginUser = (req,res) =>{
const {mail, password} = req.body
    try{
        // check if user credential are correct
        User.findOne({mail: mail , password:password})
            .then(user => {
                if (user){
                    // send user Id - THE AUTHENTICATION DATA 
                    res.status(200).json({id : user.id})
                }
                else{
                    res.status(200).json({ id : '0'})
                }
            })
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}

// GET user info
const getUserInfo = (req,res) =>{
    const id = req.params['userId']
    try {
        //search by user id
        User.findOne({_id:id})
        .then(user => {
            if (user){
                // sending user info
                res.status(200).json({mail : user.mail , tasks : user.tasks ,lists: user.lists , groups : user.groups})
            }
            else{
                res.status(404).json({messg: 'user does not exist'})
            }
        })
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}


//-------------------------------------tasks--------------------------------------------------------------

//GET all tasks
const getTasks = (req,res) =>{
    const id = req.params['userId']
    try {
        //search by user id
        User.findOne({_id:id },'tasks')
        .then(data => {
            if (data){
                // sending user info
                res.status(200).json(data.tasks)
            }
            else{
                res.status(404).json({messg: 'user does not exist'})
            }
        })
    } 
    catch(error){
        res.status(400).json({error: error.message})
    }
}


// Post new task

// DELETE task
const deleteTask = async (req, res) => {
    const { userId, taskId } = req.params;
    try {
        //convert the taskId (string) to an objectId type
        const taskObjectId = new ObjectId(taskId);
      // Find the user by userId and update the tasks array
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { tasks: { _id: taskObjectId } } },
        { new: true } 
      );
  
      if (updatedUser) {
        res.status(200).json({ messg: 'Task deleted successfully' });
      } else {
        res.status(404).json({ messg: 'The task or user does not exist' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
//-------------------------------------lists--------------------------------------------------------------

// GET user lists information
const getListsInfo = (req,res) =>{
    const id = req.params['userId']
    try {
        //search by user id
        User.findOne({_id:id },'lists._id lists.title')
        .then(data => {
            if (data){
                // sending user info
                res.status(200).json(data.lists)
            }
            else{
                res.status(404).json({messg: 'user does not exist'})
            }
        })
    } 
    catch(error){
        res.status(400).json({error: error.message})
    }
}
//GET a single list
const getSingleList = (req,res) =>{
    const { userId, listId } = req.params
    try {
        //search by user id and get the lists array
        User.findOne({_id:userId },'lists')
        .then(data => {
            if (data){
                const list = data.lists.find((list) => list._id.toString() === listId)
                if(list)
                    // sending user info
                    res.status(200).json(list)
                else
                    res.status(200).json({messg: 'list does not exist'})
            }
            else{
                res.status(404).json({messg: 'user does not exist'})
            }
        })
    } 
    catch(error){
        res.status(400).json({error: error.message})
    }
}

//Update item status
const updateItemStatus = async (req, res) => {
    const { userId, listId, itemId } = req.params;
    try {
      // Convert the id (string) to an objectId type
      const itemObjectId = new ObjectId(itemId);
      const listObjectId = new ObjectId(listId);
  
      // Find the user by userId and update the status field in the specified item
      const updatedUser = await User.findOneAndUpdate(
        {
          _id: userId,
          'lists._id': listObjectId,
          'lists.items._id': itemObjectId,
        },
        { $set: { 'lists.$[list].items.$[item].status': { $not: '$lists.$[list].items.$[item].status' } } },
        {
          arrayFilters: [
            { 'list._id': listObjectId },
            { 'item._id': itemObjectId }
          ],
          new: true,
        }
      );
  
      if (updatedUser) {
        res.status(200).json({ messg: 'Item status updated successfully' });
      } else {
        res.status(404).json({ messg: 'The item, list, or user does not exist' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

// DELETE Item in a list
const deleteListItem = async (req, res) => {
    const { userId, listId,itemId } = req.params;
    try {
        //convert the taskId (string) to an objectId type
        const itemObjectId = new ObjectId(itemId);
        const listObjectId = new ObjectId(listId);
      // Find the user by userId and update the items array in the specified list
        const updatedUser = await User.findOneAndUpdate(
            { _id: userId, 'lists._id': listObjectId },
            { $pull: { 'lists.$.items': { _id: itemObjectId } } },
            { new: true }
        )
      if (updatedUser) {
        res.status(200).json({ messg: 'Task deleted successfully' });
      } else {
        res.status(404).json({ messg: 'The task or user does not exist' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
//-------------------------------------groups--------------------------------------------------------------


// GET user groups information
const getGroupsInfo = (req,res) =>{
    const id = req.params['userId']
    try {
        //search by user id
        User.findOne({_id:id },'groups._id groups.title')
        .then(data => {
            if (data){
                // sending user info
                res.status(200).json(data.groups)
            }
            else{
                res.status(200).json({messg: 'user does not exist'})
            }
        })
    } 
    catch(error){
        res.status(400).json({error: error.message})
    }
}
//GET a single group
const getSingleGroup = (req,res) =>{
    const { userId, groupId } = req.params
    console.log(userId , groupId)
    try {
        //search by user id and get the lists array
        Group.findOne({_id: groupId})
        .then(data => {
            if (data){
                console.log(data)
                //check if the user is a member of the group
                if(data.members.some((member) => member._id.toString() === userId))
                {
                // send the group inormation
                res.status(200).json(data)
                }
                else{
                    res.status(200).json({messg: 'the user is not a member of the group'})
                }
            }
            else{
                res.status(200).json({messg: 'group is not exist'})
            }
        })
    } 
    catch(error){
        res.status(400).json({error: error.message})
    }
}


module.exports = {
    createUser,
    loginUser,
    getUserInfo,
    getTasks,
    getListsInfo,
    getGroupsInfo,
    getSingleList,
    getSingleGroup,
    deleteTask,
    deleteListItem,
    updateItemStatus
}