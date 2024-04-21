import { useState } from 'react'
import MemberSelect from './MemberSelect'

const AddTaskContainer = ({kind, createNewTask,createNewItem,createNewGroupTask,members}) => {

    const [selectedMember, setSelectedMember] = useState('');
    const [content,setContent] = useState('')
    const [date,setDate] = useState('')

    const handleSubmitTask = async (e) =>{
        e.preventDefault()
        let formattedDate = date
        //changin the date format (from american to european)
        if(date !== ''){
            var [year, month, day] = date.split('-');
            formattedDate = `${day}/${month}/${year}`;
        }

        const taskInfo = {content , date:formattedDate}
        setContent('')
        setDate('')
        createNewTask(taskInfo)
    }
    const handleSubmitItem = async (e) =>{
        e.preventDefault()
        const itemInfo = {content}
        setContent('')
        createNewItem(itemInfo)
    }
    const handleSubmitGroupTask = async (e) =>{
        e.preventDefault()
        let formattedDate = date
        //changin the date format (from american to european)
        if(date !== ''){
            var [year, month, day] = date.split('-');
            formattedDate = `${day}/${month}/${year}`;
        }
        
        const groupTaskInfo = {content,date:formattedDate,selectedMember}
        setContent('')
        setDate('')
        setSelectedMember('')
        createNewGroupTask(groupTaskInfo)
    }

    const handleSelect = (selectedValue) => {
        setSelectedMember(selectedValue);
      };
    
    const prevRenderOnSubmit = (e)=>{
        e.preventDefault()
        setContent('')
    }

    const renderKind = (kind) => {
        if (kind === "task")
            return (
                <form onSubmit={ /^\s*$/.test(content) ? prevRenderOnSubmit: handleSubmitTask}>
                    <div className="add-task-container">
                        <input type="text" placeholder="Enter a new task" id="add-task-input" 
                                value={content} onChange={(e) =>setContent(e.target.value)}/>
                        <input id="time-picking-input" type="date"  min="2023-11-26" max="2040-06-14" 
                                value={date} onChange={(e) =>setDate(e.target.value)}/>
                        <button type="submit" id="add-task-button">Add Task</button>
                    </div>
                </form>
            )
                
        else if (kind === "list")
            return (
                <form onSubmit={/^\s*$/.test(content) ? prevRenderOnSubmit: handleSubmitItem}>
                    <div className="add-task-container add-item-container">
                    <input type="text" placeholder="Enter a new item" id="add-task-input" 
                                value={content} onChange={(e) =>setContent(e.target.value)}/>
                        <button type="submit" id="add-task-button">Add Item</button>
                    </div>
                </form>
            )
        else
            return  (
                <form onSubmit={ /^\s*$/.test(content) ? prevRenderOnSubmit: handleSubmitGroupTask}>
                    <div className="add-task-container">    
                        <input type="text" placeholder="Enter a new task" id="add-task-input" 
                                value={content} onChange={(e) =>setContent(e.target.value)}/>
                        <input id="time-picking-input" type="date"  min="2023-11-26" max="2040-06-14" 
                                value={date} onChange={(e) =>setDate(e.target.value)}/>
                        <MemberSelect members={members} handleSelect={handleSelect} selectedMember={selectedMember} />
                        <button type="submit" id="add-task-button">Add Task</button>
                    </div>
                </form>
            )
    }

            

    return ( 
        renderKind(kind)  
     );
}
 
export default AddTaskContainer;