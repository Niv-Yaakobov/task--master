import useFetch from "../../../../useFetch";
import { useState, useEffect } from 'react'
import * as IMAGES from '../../../../images'
import axios from 'axios'


const GroupTasksList = ({groupId,userId,group,setGroup}) => {

    const [isButtonDisabled, setButtonDisabled] = useState(false);

    //fetching the data 
    const {data, isPending, error} = useFetch((userId && groupId) ? `http://${process.env.REACT_APP_BACKEND_IP}:4001/${userId}/groups/${groupId}` : null)

    useEffect(() => {
        if (data) {
            setGroup(data);
        }
      }, [data]);


    const renderTaskColor = (status)=>{
        if (status === true)
            return 'rgb(151, 231, 151)'
        else 
            return 'rgb(235, 138, 138)'
    }

    const renderIcon = (status) => {
        if (status === true)
            return <span>&#10006;</span>
        else
            return <span>&#10004;</span>
    }
    const toggleTaskStatus = async (id) =>{
        //copy the group's tasks array
        const updatedGroupTasks = group.tasks.filter(() => true);
        //tracing the index of the given task
        const taskIndex = updatedGroupTasks.findIndex( (task) => task._id === id);
        const task = updatedGroupTasks[taskIndex];
        task.status = !task.status;
        // shallow copy group and update the tasks array 
        const newGroup = ({...group , task:updatedGroupTasks})
        setGroup(newGroup);
        await axios.patch(`http://${process.env.REACT_APP_BACKEND_IP}:4001/${userId}/groups/${groupId}/${id}`);
        setButtonDisabled(false)
     };

    const handleDelete = async (id) => {
        // build a new array without the deleted item 
        const updatedGroupTasks = group.tasks.filter((task) => task._id !== id );
        // shallow copy the original list and replacing the items array with the new one
        const newGroup = ({...group , tasks: updatedGroupTasks})
        setGroup(newGroup)
        //delete request to the server
        await axios.delete(`http://${process.env.REACT_APP_BACKEND_IP}:4001/${userId}/groups/${group._id}/${id}`);
    }

    return (  
        <div>
            { error && <div>{ error }</div> }
            {group &&
            <div className="task-container">
                {group.tasks.map((task) =>(
                <div className="task" id={task._id} key={task._id} style={{backgroundColor: renderTaskColor(task.status)}}>
                    <button type="button" className="group-task-checkbox" style={{pointerEvents:isButtonDisabled ?'none':'', 
                            backgroundColor: renderTaskColor(task.status) ,color: renderTaskColor(task.status)}}
                         onClick={() =>{ 
                            setButtonDisabled(true)
                            toggleTaskStatus(task._id)}
                            }>{renderIcon(task.status)}
                    </button>     
                                           
                        <div className="task-data">
                            <div className="task-text">{task.content}</div>
                            <div className="date-text task-assigned">{task.assigned}</div>
                            <div className="date-text"> {task.date}</div>
                        </div>
                    <img src= {IMAGES.garbageImage} className="star-icon" alt="icon"
                        onClick={() => handleDelete(task._id)}/>
                </div>
                ))}
            </div>}
        </div>
    );
}
 
export default GroupTasksList;