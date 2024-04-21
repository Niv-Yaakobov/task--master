import { useState, useEffect } from 'react';
import * as IMAGES from '../../../../images';
import useFetch from '../../../../useFetch';
import axios from 'axios'


const TaskList = ({ title, userId,allTasks,setAllTasks }) => {

    const [isButtonDisabled, setButtonDisabled] = useState(false);

    const [tasks, setTasks] = useState([]);
    const { data, isPending, error } = useFetch(userId ? `http://localhost:4001/${userId}/tasks` : null);
    

    useEffect(() => {
      if (data) {
        setAllTasks(data);
      }
    }, [data]);
    
    useEffect(() => {
      renderList();
    }, [title, allTasks]);


    const renderList = () => {
        if(allTasks.length === 0)
          setTasks([])
        if (allTasks.length > 0) {
            if (title === 'My Day') {
              const date = new Date();
              const year = date.getFullYear();
              // Add 0 if the month or the day are one digit
              const month = ("0" + (date.getMonth() + 1)).slice(-2);
              let day = ("0" + date.getDate()).slice(-2);
              
              const newList = allTasks.filter((task) => task.date === day + '/' + month + '/' + year);
              setTasks(newList);
            } 
            else if (title === 'Scheduled')
             {
                const newList = allTasks.filter((task) => task.type.includes('scheduled'));
                setTasks(sortByDate(newList));
            } 
            else if (title === 'Important') 
            {
                const newList = allTasks.filter((task) => task.type.includes('important'));
                setTasks(newList);
            } 
            else {
                setTasks(allTasks);
            }
        }
    }
    function sortByDate(tasks) {
      return tasks.sort((task1, task2) => {
          // Convert date strings to Date objects
          const date1 = new Date(task1.date.split('/').reverse().join('/'));
          const date2 = new Date(task2.date.split('/').reverse().join('/'));
          
          // Compare the dates
          return date1 - date2;
      });
  }


    const toggleTaskImportance = async (task) =>{
        setButtonDisabled(true)
        // Create a copy of the tasks array
        const updatedTasks = [...allTasks];

        const taskIndex = updatedTasks.findIndex((t) => t._id === task._id);

        if (taskIndex !== -1) {
          // Clone the task to avoid mutating the state directly
          const updatedTask = { ...updatedTasks[taskIndex] };

          const importantIndex = updatedTask.type.indexOf('important');

          if (importantIndex !== -1) {
            // If 'important' is present, remove it
            updatedTask.type.splice(importantIndex, 1);
          } else {
            // If 'important' is not present, add it
            updatedTask.type.push('important');
          }

          // Update the specific task in the copied array
          updatedTasks[taskIndex] = updatedTask;

          // Update the state with the new tasks array
          setAllTasks(updatedTasks);
       }
       await axios.patch(`http://localhost:4001/${userId}/tasks/${task._id}`);
       setButtonDisabled(false)
    }

  const renderStarIamge = (task) => {
    if (task.type.includes('important')) {
      return <img src={IMAGES.starImage} className="star-icon" alt="icon" 
      onClick={() => {
        if(!isButtonDisabled)
          toggleTaskImportance(task)}}/>;
    }
    return <img src={IMAGES.emptyStarImage} className="star-icon" alt="icon" 
    onClick={() => {
      if(!isButtonDisabled)
        toggleTaskImportance(task)}}/>;
  };

  const handleComplete = async (id) => {
    //remove from the tasks list
    const newAllTasksList = allTasks.filter((task) => task._id !== id)
    setAllTasks(newAllTasksList)
    await axios.delete(`http://localhost:4001/${userId}/tasks/${id}`);
  }

  return (
    <div>
      {error && <div>{error}</div>}
      {allTasks && (
        <div className="task-container">
          {tasks.length > 0 && tasks.map((task) => (
            <div className="task" id={task._id} key={task._id}>
              <button type="button" className="task-checkbox" onClick={() => handleComplete(task._id)}>
                &#10004;
              </button>
              <div className="task-data">
                <div className="task-text">{task.content}</div>
                <div className="date-text"> {task.date}</div>
              </div>
              {renderStarIamge(task)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;