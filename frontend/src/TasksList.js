import * as IMAGES from './images'
import useFetch from './useFetch'


const TaskList= ({title}) => {

    const {data: allTasks , isPending, error} = useFetch("http://localhost:8000/tasks")

    var tasks = []

    const renderList = () =>{
        if (title === 'My Day'){
            const date = new Date()
            const year = date.getFullYear() 
            const month = date.getMonth() + 1
            const day = date.getDate()
            const newList = allTasks.filter((task) => task.date === day + '/' + month + '/' + year)
            tasks = newList
        }
        else if (title === 'Scheduled'){
            const newList = allTasks.filter((task) => task.type.includes('schedual'))
            tasks = newList
        }
        else if (title === 'Important'){
            const newList = allTasks.filter((task) => task.type.includes('importent'))
            tasks = newList
        }
        else
            tasks = allTasks
    }


    const renderImage = (task) => {
        if (task.type.includes('importent'))
        {
            return <img src= {IMAGES.starImage} className="star-icon" alt="icon"/>;
        }
        return <img src= {IMAGES.emptyStarImage} className="star-icon" alt="icon" />;
    }

    const handleComplete = (id) =>{
        /* const newList = lists.filter((list) => list.id !== id);
        setLists(newList)*/
    }

    return ( 
        <div>
            { error && <div>{ error }</div> }
            { isPending && <div> Loading... </div> }
            { allTasks && <div className="task-container">
                {renderList()}
                {tasks.map((list) =>(
                    <div className="task" id={list.id} key={list.id}>
                    <button type="button" className="task-checkbox" onClick={() => handleComplete(list.id)}>&#10004;</button>
                    <div className="task-data">
                        <div className="task-text">{list.content}</div>
                        <div className="date-text"> {list.date}</div>
                    </div>
                    {renderImage(list)}
                </div>
                ))}
            </div>}
        </div>
    );
}
 
export default TaskList;