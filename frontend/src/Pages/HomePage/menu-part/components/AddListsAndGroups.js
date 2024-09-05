import React,{useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';


const AddListsAndGroups = ({userId ,setGroups, setLists,lists,groups}) => {

    const [isAddingList, setIsAddingList] = useState(false);
    const [newListTitle, setNewListTitle] = useState('');

    const handleAddList = async (e) => {
        e.preventDefault()
        if (isAddingList && newListTitle.trim() !== '') {
          // Perform the action to add the new list with newListTitle
          const trimedTitle = newListTitle.trim()
          const postResponse = await axios.post(`https://task-master-backend-7g6m.onrender.com/${userId}/lists` , {title:trimedTitle})
          if(postResponse){
            const list = postResponse.data.list
            const newListArray = [...lists]
            newListArray.push(list)
            setLists(newListArray)
          }
          // Reset state
          setIsAddingList(false);
          setNewListTitle('');
        } else {
          // Toggle between button and input
          setNewListTitle('');
          setIsAddingList(!isAddingList);
        }
      };
    

    return ( 
        <div>
      {isAddingList ? (
        <form onSubmit={handleAddList}>
        <div className='add-list-container'>
          <input 
            className='add-list-input'
            type="text"
            value={newListTitle}
            onChange={(e) => setNewListTitle(e.target.value)}
            placeholder="Enter list title"
          />
          <button type='submit' className='add-list-button'>{newListTitle.trim() === '' ?'cancel':'Add'}</button>
        </div>
        </form>
      ) : (
        <div>
            <button className="add-button list-add-button" onClick={handleAddList}>Add List</button>
            <Link to='/AddGroup'>
              <button className="add-button group-add-button">Add Group</button>
            </Link>
        </div>
        )}
    </div>
     );
}
 
export default AddListsAndGroups;