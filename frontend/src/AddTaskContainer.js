import {Link} from 'react-router-dom'

const AddTaskContainer = ({kind}) => {

    const renderKind = (kind) => {
        if (kind === "task")
            return (
                <div className="add-task-container">
                    <input type="text" placeholder="Enter a new task" id="add-task-input"/>
                    <input id="time-picking-input" type="date"  min="2023-11-26" max="2030-06-14" />
                    <button type="button" id="add-task-button">Add Task</button>
                </div>
            )
                
        else if (kind === "list")
            return (
                <div className="add-task-container add-item-container">
                    <input type="text" placeholder="Enter a new task" id="add-task-input"/>
                    <button type="button" id="add-task-button">Add Item</button>
                </div>
            )
        else
            return  (
                <div className="add-group-task-container">
                    <Link to="addGroupTask" id="add-task-button">Add Group Task</Link>
                </div>
            )
    }

            

    return ( 
        renderKind(kind)  
     );
}
 
export default AddTaskContainer;