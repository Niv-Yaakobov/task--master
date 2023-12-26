import { useState, useEffect } from 'react'
import * as IMAGES from './images'
import useFetch from './useFetch'



const ItemsList = ({listId, userId}) => {

    const [list, setList] = useState(null)
    const {data, isPending, error} = useFetch((userId && listId) ? `http://localhost:4001/${userId}/lists/${listId}` : null)

    useEffect(() => {
        if (data) {
            setList(data);
        }
      }, [data]);

    /*  //need to handle complete in the server
    const handleComplete = (id) =>{
        const newList = list.filter(() => true);
        const itemIndex = newList.findIndex( (item) => item.id === id);
        const item = newList[itemIndex];
        if (item.status === 'bought')
            item.status = 'unbought'
        else 
            item.status = 'bought'

        setList(newList)
    };

    //need to handle delete in the server 
    const handleDelete = (id) => {
        const updatedList = list.filter((item) => item.id !== id );
        setList(updatedList);
    }*/


    //onClick={() => handleComplete(item.id)} -- for V BUTTON
    //onClick={() => handleDelete(item.id)} --- FOR DELETE BUTTON
    return ( 
        <div>
            { error && <div>{ error }</div> }
            { isPending && <div> Loading... </div> }
            {list && 
            <div className="task-container">
                {list.items.length > 0 && list.items.map((item) =>(
                    <div className="task" id={item._id} key={item._id}>
                        <button type="button" className="task-checkbox" >&#10004;</button>
                        <div className="task-data">
                        <div className="task-text" style={{ textDecoration:(item.status === true) ? 'line-through' : 'none' }}>{item.content}</div>
                        </div>
                        <img src= {IMAGES.garbageImage} className="star-icon" alt="icon"/>
                    </div>
                ))}
            </div>}
        </div>
    );
}
 
export default ItemsList;