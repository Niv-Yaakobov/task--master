import TasksList from './TasksList'
import ItemsList from './ItemsList'
import GroupTasksList from './GroupTasksList'
import AddTaskContainer from './AddTaskContainer'
import {logoutImage} from './images'
import { useHistory } from 'react-router-dom';


const TaskSideContainer = ({data, userId}) => {

    const history = useHistory();

    const renderListKind = () =>{
        if (data.kind === 'task')
            return <TasksList title = {data.info.title} userId = {userId}/>
        else if (data.kind === 'list')
            return <ItemsList listId ={data.info._id} userId = {userId}/>
        else 
            return <GroupTasksList groupId = {data.info._id} userId = {userId}/>
    }

    const handleLogout = () =>{
        localStorage.removeItem('userId');
        localStorage.removeItem('userMail');
        history.push('/LoginPage');
    }

    return ( 
        <div id="tasks-side-container">
            <h1 id="tasks-container-headline">{data.info.title}</h1>
            <img src={logoutImage} className="logout-icon" alt="icon" onClick={() => handleLogout()}/>
            {renderListKind()}
            <AddTaskContainer kind = {data.kind}/>
        </div>
     );
}
 
export default TaskSideContainer;