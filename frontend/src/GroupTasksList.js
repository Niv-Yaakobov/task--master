import useFetch from "./useFetch";
import * as IMAGES from './images'

const GroupTasksList = ({groupId}) => {

    const {data:group, isPending, error} = useFetch("http://localhost:8000/groups/" + groupId)


    const renderTaskColor = (status)=>{
        if (status === 'finished')
            return 'rgb(151, 231, 151)'
        else 
            return 'rgb(235, 138, 138)'
    }

    const renderIcon = (status) => {
        if (status === 'finished')
            return <span>&#10006;</span>
        else
            return <span>&#10004;</span>
    }

    return (  
        <div>
            { error && <div>{ error }</div> }
            { isPending && <div> Loading... </div> }
            {group &&<div className="task-container">
                {group.tasks.map((task) =>(
                <div className="task" id={task.id} key={task.id} style={{backgroundColor: renderTaskColor(task.status)}}>
                    <button type="button" className="task-checkbox grop-task-checkbox" >{renderIcon(task.status)}</button>
                    <div className="task-data">
                        <div className="task-text">{task.content}</div>
                        <div className="date-text task-assigned"> {task.assigned}</div>
                        <div className="date-text"> {task.date}</div>
                    </div>
                    <img src= {IMAGES.garbageImage} className="star-icon in-group" alt="icon"/>

                </div>
                ))}
            </div>}
        </div>
    );
}
 
export default GroupTasksList;