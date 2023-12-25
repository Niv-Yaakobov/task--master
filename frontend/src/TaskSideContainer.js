import TasksList from './TasksList'
import ItemsList from './ItemsList'
import GroupTasksList from './GroupTasksList'
import {logoutImage} from './images'
import { useHistory } from 'react-router-dom';


const TaskSideContainer = ({data, userId}) => {

    const history = useHistory();

    const renderListKind = () =>{
        if (data.kind === 'task')
            return <TasksList title = {data.info.title} userId = {userId}/>
        else if (data.kind === 'list')
            return <ItemsList listId ={data.info.id}/>
        else 
            return <GroupTasksList groupId = {data.info.id}/>
    }
    const renderButtonKind = (kind) => {
        if (kind === "task")
            return "Add task"
        else if (kind === "list")
            return "Add item"
        else
            return "Add group task"
    }

    const handleLogout = () =>{
        localStorage.removeItem('userId');
        history.push('/LoginPage');
    }

    return ( 
        <div id="tasks-side-container">
            <h1 id="tasks-container-headline">{data.info.title}</h1>
            <img src={logoutImage} className="logout-icon" alt="icon" onClick={() => handleLogout()}/>
            {renderListKind()}
            <div className="add-task-container">
                <input type="text" placeholder="Enter a new task" id="add-task-input"/>
                <input id="time-picking-input" type="date"  min="2023-11-26" max="2030-06-14" />
                <button type="button" id="add-task-button">{renderButtonKind(data.kind)}</button>
            </div>
        </div>
     );
}
 
export default TaskSideContainer;