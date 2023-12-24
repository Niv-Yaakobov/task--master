import { useState } from 'react'
import * as IMAGES from './images'
import useFetch from './useFetch'


const TaskList= ({title}) => {

    const {data: allTasks , isPending, error} = useFetch("http://localhost:8000/tasks")

    const [tasks , setTasks] = useState([])

    const renderList = () =>{
        if (title === 'My Day'){
            const date = new Date()
            const year = date.getFullYear() 
            const month = date.getMonth() + 1
            const day = date.getDate()
            const newList = allTasks.filter((task) => task.date === day + '/' + month + '/' + year)
            setTasks(newList)
        }
        else if (title === 'Scheduled'){
            const newList = allTasks.filter((task) => task.type.includes('schedual'))
            setTasks(newList)
        }
        else if (title === 'Important'){
            const newList = allTasks.filter((task) => task.type.includes('importent'))
            setTasks(newList)
        }
        else
            setTasks(allTasks)
    }


    const renderImage = (task) => {
        if (task.type.includes('importent'))
        {
            return <img src= {IMAGES.starImage} className="star-icon" alt="icon"/>;
        }
        return <img src= {IMAGES.emptyStarImage} className="star-icon" alt="icon" />;
    }

    const handleComplete = (id) =>{
        const newList = tasks.filter((task) => task._id !== id);
        setTasks(newList)
        // -------- need to send a DELETE request to the server ---------------
    }

    return ( 
        <div>
            { error && <div>{ error }</div> }
            { isPending && <div> Loading... </div> }
            { allTasks && <div className="task-container">
                {renderList()}
                {tasks.map((task) =>(
                    <div className="task" id={task._id} key={task._id}>
                    <button type="button" className="task-checkbox" onClick={() => handleComplete(task._id)}>&#10004;</button>
                    <div className="task-data">
                        <div className="task-text">{task.content}</div>
                        <div className="date-text"> {task.date}</div>
                    </div>
                    {renderImage(task)}
                </div>
                ))}
            </div>}
        </div>
    );
}
 
export default TaskList;