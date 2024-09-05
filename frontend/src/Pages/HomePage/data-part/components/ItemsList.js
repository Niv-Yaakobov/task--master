import { useState, useEffect } from 'react'
import * as IMAGES from '../../../../images'
import useFetch from '../../../../useFetch'
import axios from 'axios'

const ItemsList = ({listId, userId,list,setList}) => {

    const [isButtonDisabled, setButtonDisabled] = useState(false);
    const {data, isPending, error} = useFetch((userId && listId) ? `https://task-master-backend-7g6m.onrender.com/${userId}/lists/${listId}` : null)

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

    const toggleItemStatus = async (id) =>{
        //copy the list's item array
        const updatedListItems = list.items.filter(() => true);
        //tracing the index of the given item
        const itemIndex = updatedListItems.findIndex( (item) => item._id === id);
        const item = updatedListItems[itemIndex];
        item.status = !item.status;
        // shallow copy list and update the items array 
        const newList = ({...list , items:updatedListItems})
        setList(newList);
        await axios.patch(`https://task-master-backend-7g6m.onrender.com/${userId}/lists/${listId}/${id}`);
        setButtonDisabled(false)
     };

    const handleDelete = async (id) => {
        // build a new array without the deleted item 
        const updatedListItems = list.items.filter((item) => item._id !== id );
        // shallow copy the original list and replacing the items array with the new one
        const newList = ({...list , items: updatedListItems})
        setList(newList)
        //delete request to the server
        await axios.delete(`https://task-master-backend-7g6m.onrender.com/${userId}/lists/${listId}/${id}`);
    }


    return ( 
        <div>
            { error && <div>{ error }</div> }
            {list && 
            <div className="task-container">
                {list.items.length > 0 && list.items.map((item) =>(
                    <div className="task" id={item._id} key={item._id}>
                        <button type="button" className="task-checkbox" style={{pointerEvents:isButtonDisabled ?'none':''}}
                         onClick={() =>{ 
                            setButtonDisabled(true)
                            toggleItemStatus(item._id)}
                            }>{renderIcon(item.status)}</button>
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