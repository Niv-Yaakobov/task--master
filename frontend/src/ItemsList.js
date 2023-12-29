import { useState, useEffect } from 'react'
import * as IMAGES from './images'
import useFetch from './useFetch'
import axios from 'axios'

const ItemsList = ({listId, userId}) => {

    const [list, setList] = useState(null)
    const {data, isPending, error} = useFetch((userId && listId) ? `http://localhost:4001/${userId}/lists/${listId}` : null)

    useEffect(() => {
        if (data) {
            setList(data);
        }
      }, [data]);
    
    const renderIcon = (status) => {
    if (status === true)
        return <span>&#10006;</span>
    else
        return <span>&#10004;</span>
    }

    const handleComplete = async (id) =>{
        //copy the list's item array
        const updatedListItems = list.items.filter(() => true);
        //tracing the index of the given item
        const itemIndex = updatedListItems.findIndex( (item) => item._id === id);
        const item = updatedListItems[itemIndex];
        item.status = !item.status;
        // shallow copy list and update the items array 
        const newList = ({...list , items:updatedListItems})
        setList(newList);
        const statusChangeConfiramtion = await axios.patch(`http://localhost:4001/${userId}/lists/${listId}/${id}`);
        console.log(statusChangeConfiramtion)
     };

    const handleDelete = async (id) => {
        // build a new array without the deleted item 
        const updatedListItems = list.items.filter((item) => item._id !== id );
        console.log(updatedListItems)
        // shallow copy the original list and replacing the items array with the new one
        const newList = ({...list , items: updatedListItems})
        setList(newList)
        //delete request to the server
        const deleteConfiramtion = await axios.delete(`http://localhost:4001/${userId}/lists/${listId}/${id}`);
    }


    // -- for V BUTTON
    return ( 
        <div>
            { error && <div>{ error }</div> }
            { isPending && <div> Loading... </div> }
            {list && 
            <div className="task-container">
                {list.items.length > 0 && list.items.map((item) =>(
                    <div className="task" id={item._id} key={item._id}>
                        <button type="button" className="task-checkbox" onClick={() => handleComplete(item._id)}>{renderIcon(item.status)}</button>
                        <div className="task-data">
                        <div className="task-text" style={{ textDecoration:(item.status === true) ? 'line-through' : 'none' }}>{item.content}</div>
                        </div>
                        <img src= {IMAGES.garbageImage} className="star-icon" alt="icon"
                        onClick={() => handleDelete(item._id)}/>
                    </div>
                ))}
            </div>}
        </div>
    );
}
 
export default ItemsList;