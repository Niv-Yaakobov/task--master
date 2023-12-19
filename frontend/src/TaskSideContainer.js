import TasksList from './TasksList'
import ItemsList from './ItemsList'
import GroupTasksList from './GroupTasksList'

const TaskSideContainer = ({data}) => {

    const renderListKind = () =>{
        if (data.kind === 'task')
            return <TasksList title = {data.info.title}/>
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

    return ( 
        <div id="tasks-side-container">
            <h1 id="tasks-container-headline">{data.info.title}</h1>
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