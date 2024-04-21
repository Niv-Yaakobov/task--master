import TasksList from './components/TasksList'
import ItemsList from './components/ItemsList'
import GroupTasksList from './components/GroupTasksList'
import AddTaskContainer from './components/AddTaskContainer'
import {logoutImage} from '../../../images'
import { useHistory } from 'react-router-dom';
import { useState } from 'react'
import axios from 'axios'

const TaskSideContainer = ({data, userId}) => {

    const history = useHistory();
    const [error,setError] =useState(null)
    const [allTasks, setAllTasks] = useState([]);
    const [list, setList] = useState(null)
    const [group, setGroup] = useState(null)
    const members = ( (data.kind === 'group' && group) ? group.members: null)

    const renderListKind = () =>{
        if (data.kind === 'task')
            return <TasksList title = {data.info.title} userId = {userId} allTasks={allTasks} setAllTasks={setAllTasks}/>
        else if (data.kind === 'list')
            return <ItemsList listId ={data.info._id} userId = {userId} list={list} setList={setList}/>
        else 
            return <GroupTasksList groupId = {data.info._id} userId = {userId} group={group} setGroup={setGroup}/>
    }

    const handleLogout = () =>{
        localStorage.removeItem('userId');
        localStorage.removeItem('userMail');
        history.push('/LoginPage');
    }

    const createNewTask = async (taskInfo)=>{
        const responseData = await axios.post(`http://localhost:4001/${userId}/tasks` , taskInfo)

        if (!responseData){  
            setError('error occurred')
        }
        const newAllTask = [...allTasks , responseData.data.task]
        setAllTasks(newAllTask)
    }

    const createNewItem = async (itemInfo)=>{
        const listId = data.info._id
        const responseData = await axios.post(`http://localhost:4001/${userId}/lists/${listId}` , itemInfo)

        if (!responseData){  
            setError('error occurred')
        }
        // Add the new item to the items array
        const newList = {...list}
        newList.items.push(responseData.data.item)
        setList(newList)
    }
    const createNewGroupTask = async (groupTaskInfo)=>{
        const groupId = data.info._id
        const responseData = await axios.post(`http://localhost:4001/${userId}/groups/${groupId}` , groupTaskInfo)

        if (!responseData){  
            setError('error occurred')
        }
        // Add the new item to the items array
        const newGroup = {...group}
        newGroup.tasks.push(responseData.data.task)
        setGroup(newGroup)
    }
    return ( 
        <div id="tasks-side-container">
            <h1 id="tasks-container-headline">{data.info.title}</h1>
            <img src={logoutImage} className="logout-icon" alt="icon" onClick={() => handleLogout()}/>
            {renderListKind()}
            {error && <p className="error">{error}</p>}
            <AddTaskContainer kind = {data.kind} createNewTask = {createNewTask} createNewItem={createNewItem}
                             createNewGroupTask={createNewGroupTask} members={members} />
        </div>
     );
}
 
export default TaskSideContainer;