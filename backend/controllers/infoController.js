const {Task, User,List,Item} = require('../models/userModel')
const {Group, GroupTask} = require('../models/groupModel')
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


//-------------------------------------tasks--------------------------------------------------------------//

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


// Post new task--------------------------------------------------
const createNewTask = async (req,res) =>{
    const userId = req.params['userId']
    const {content, date} = req.body
    const type = []
    if(date !== '')
        type.push('scheduled')
    try {
        // Create a new task using the Task model
        const newTask = new Task({ type,content, date });
        // Update the user document using findOneAndUpdate
        const updatedUser = await User.findOneAndUpdate(
          { _id: userId },
          { $push: { tasks: newTask } },
          { new: true }
        );
    
        if (updatedUser) {
          res.status(201).json({ message: 'Task created successfully', task:newTask});
        } else {
          res.status(404).json({ message: 'User not found' });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
//UPDATE task importance-------------------------------------------
const toggleTaskImportance = async (req, res) => {
    const { userId, taskId } = req.params;
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      const task = user.tasks.find((task) => task._id.equals(taskId));
      if (!task) {
        return res.status(404).json({ success: false, message: 'task not found' });
      }
      
    // Toggle the importance
    const importantIndex = task.type.indexOf('important');

          if (importantIndex !== -1) {
            // If 'important' is present, remove it
            task.type.splice(importantIndex, 1);
          } else {
            // If 'important' is not present, add it
            task.type.push('important');
          }

    // Mark the array as modified
    user.markModified('tasks');

    await user.save();

      return res.status(200).json({ success: true, message: 'task importance toggled successfully' });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  };
// DELETE task-----------------------------------------------------
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
//-------------------------------------lists--------------------------------------------------------------//

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

//POST new item to list
const createNewItem = async (req,res) =>{
    const {userId,listId} = req.params
    const {content} = req.body
    const status = false
    try {
        // Create a new task using the Task model
        const newItem = new Item({ status, content });
        // Update the user document using findOneAndUpdate
        const updatedUser = await User.findOneAndUpdate(
            { _id: userId, 'lists._id': new ObjectId(listId) },
            { $push: { 'lists.$.items': newItem } },
            { new: true }
        )
    
        if (updatedUser) {
          res.status(201).json({ message: 'Task created successfully', item: newItem});
        } else {
          res.status(404).json({ message: 'User not found' });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
//Update item status
const toggleItemStatus = async (req, res) => {
    const { userId, listId, itemId } = req.params;
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      const list = user.lists.find((list) => list._id.equals(listId));
      if (!list) {
        return res.status(404).json({ success: false, message: 'List not found' });
      }
      const item = list.items.find((item) => item._id.equals(itemId));
      if (!item) {
        return res.status(404).json({ success: false, message: 'Item not found' });
      }
      // Toggle the status
    item.status = !item.status;

    // Mark the array as modified
    user.markModified('lists');

    await user.save();
      return res.status(200).json({ success: true, message: 'Item status toggled successfully' });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
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

//POST new list 
const createNewList = async (req,res) =>{
  const userId = req.params['userId']
  const {title} = req.body

  try {
      // Create a new List using the List model
      const newList = new List({ title});
      // Update the user document using findOneAndUpdate
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { $push: { lists: newList } },
        { new: true }
      );
  
      if (updatedUser) {
        res.status(201).json({ message: 'Task created successfully', list:newList});
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// DELETE list-----------------------------------------------------
const deleteList = async (req, res) => {
  const { userId, listId } = req.params;
  try {
      //convert the listId (string) to an objectId type
      const listObjectId = new ObjectId(listId);
    // Find the user by userId and update the lists array
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { lists: { _id: listObjectId } } },
      { new: true } 
    );

    if (updatedUser) {
      res.status(200).json({ messg: 'List deleted successfully' });
    } else {
      res.status(404).json({ messg: 'The list or user does not exist' });
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
    try {
        //search by user id and get the lists array
        Group.findOne({_id: groupId})
        .then(data => {
            if (data){
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
//POST new group task - to Groups collection
const createNewGroupTask = async (req,res) =>{
    const {userId,groupId} = req.params
    const {content,date,selectedMember} = req.body
    const status = false
    try {
        // Create a new task using the Task model
        const newGroupTask = new GroupTask({content, date, assigned:selectedMember});
        // Update the user document using findOneAndUpdate
        const updatedGroup = await Group.findOneAndUpdate(
            { _id: groupId},
            { $push: { 'tasks': newGroupTask } },
            { new: true }
        )
    
        if (updatedGroup) {
          res.status(201).json({ message: 'Task created successfully', task: newGroupTask});
        } else {
          res.status(404).json({ message: 'User not found' });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };

//Update group task status
const toggleGroupTaskStatus = async (req, res) => {
    const { userId, groupId, groupTaskId } = req.params;
  
    try {
      const group = await Group.findById(groupId);
      if (!group) {
        return res.status(404).json({ success: false, message: 'group not found' });
      }
      const task = group.tasks.find((task) => task._id.equals(groupTaskId));
      if (!task) {
        return res.status(404).json({ success: false, message: 'task not found' });
      }

    // Toggle the status
    task.status = !task.status;
    // Mark the array as modified
    group.markModified('tasks');

    await group.save();
      return res.status(200).json({ success: true, message: 'task status toggled successfully' });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  };

//DELETE group task - from Groups Collection
const deleteGroupTask = async (req, res) => {
    const { userId, groupId,groupTaskId } = req.params;
    try {
      // Find the group by groupId and update the tasks array
        const updatedGroup = await Group.findOneAndUpdate(
            { _id: groupId},
            { $pull: { 'tasks': { _id: new ObjectId(groupTaskId) } } },
            { new: true }
        )
      if (updatedGroup) {
        res.status(200).json({ messg: 'Task deleted successfully' });
      } else {
        res.status(404).json({ messg: 'The task or user does not exist' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
// DELETE Group-----------------------------------------------------
const deleteGroup = async (req, res) => {
  const { userId, groupId } = req.params;
  try {

    const group = await Group.findOneAndDelete({_id: groupId}, { projection: { members: 1 } })
    console.log(group.members)
    // delete the group from the User colletion - from each user in the members array
    group.members.map(async (member) => {
      const id = member._id
      await User.findOneAndUpdate(
        {_id: id},
        { $pull: { groups: { _id: new ObjectId(groupId) } } },
      )
    })
    
    if (group) {
      res.status(200).json({ messg: 'Group deleted successfully' });
    } else {
      res.status(404).json({ messg: 'The group or user does not exist' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//POST new group
const createNewGroup = async (req,res) =>{
  const {title,members} = req.body
  try {
      // Find the exisiting users with the given email addresses
      const existingUsers = await User.find({ mail: { $in: members } });
      const newMembers =  existingUsers.map(({ _id, mail }) => ({ _id, mail }));

      // Create a new group using the Group model
      const newGroup = new Group({title, members: newMembers });
      await newGroup.save()

      // Add the group to the user's groups array
      for (const user of existingUsers) {
        // Update the user document using findOneAndUpdate
        const updatedUser = await User.findOneAndUpdate(
          { _id: user._id },
          { $push: { groups: { title:title, _id: newGroup._id } } },
          { new: true } // Return the updated document
        ); 

        // Mark the array as modified
        updatedUser.markModified('groups');
        await updatedUser.save();
      } 
        

      if (newGroup) {
        res.status(201).json({ message: 'Group created successfully', group:newGroup});
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


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
    toggleItemStatus,
    toggleTaskImportance,
    createNewTask,
    createNewItem,
    createNewGroupTask,
    deleteGroupTask,
    toggleGroupTaskStatus,
    createNewList,
    deleteList,
    deleteGroup,
    createNewGroup
}