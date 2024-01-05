import { useEffect, useState } from 'react';
import * as IMAGES from  './images.js'
import useFetch from './useFetch.js';
import axios from 'axios'


const ListAndGroupsPartMenu = ({ handleClickOnMenu, userId,lists,setLists,groups,setGroups}) => {

  const [showLists , setShowLists] = useState(false)
  const [showGroups , setShowGroups] = useState(false)

  const { data: listsData, isPending: listsIsPending, error: listsError } = useFetch(
    userId ? `http://localhost:4001/${userId}/lists` : null
  );
  const { data: groupsData, isPending: groupsIsPending, error: groupsError } = useFetch(
    userId ? `http://localhost:4001/${userId}/groups` : null
  );

  const [isDeletingList , setIsDeletingList] = useState(false)

  // Render the lists data after the fetch is over
  useEffect(() => {
    if (listsData) {
      setLists(listsData);
    }
  }, [listsData]);

  // Render the groups data after the fetch is over
  useEffect(() => {
    if (groupsData) {
      setGroups(groupsData);
    }
  }, [groupsData]);

  const handleDeleteList = async (event, id) => {
    event.stopPropagation(); // Stop event propagation to the parent li
    //delete it from the local lists array
    const newListsList = lists.filter((list) => list._id !== id);
    setLists(newListsList);
    //delete request to the server
    await axios.delete(`http://localhost:4001/${userId}/lists/${id}`);
  };

  const handleDeleteGroup = async (event, id) => {
    event.stopPropagation(); // Stop event propagation to the parent li
    //delete it from the local lists array
    const newGroupsList = groups.filter((group) => group._id !== id);
    setGroups(newGroupsList);
    //delete request to the server
    await axios.delete(`http://localhost:4001/${userId}/groups/${id}`);
  };

  return (
    <div className='second-part-menu'>
      {listsError && <div>{listsError}</div>}
      {listsIsPending && <div>Loading lists...</div>}
      {lists && (
        <div id="lists-groups-part-menu">
          <div onClick={() => setShowLists(!showLists)} className='lists-groups-show-button'>
          <img src={IMAGES.listImage} className="menu-icon" alt="ion" />
          <span>LISTS:</span>
          </div>
          {showLists && <div>
          {lists.map((list) => (
            <li
              className='lists-groups-menu-button'
              id={list._id}
              key={list._id}
              onClick={() => {
                handleClickOnMenu({ kind: 'list', info: list });
              }}
            >
              <img src= {IMAGES.garbageImage} className="delete-list-group" alt="delete"
                        onClick={(event) => handleDeleteList(event, list._id)}/>

              <span className="lists-and-groups-text">{list.title}</span>
            </li>
          ))}
          </div>}

        </div>
      )}
      {groupsError && <div>{groupsError}</div>}
      {groupsIsPending && <div>Loading groups...</div>}
      {groups && (
        <div id="lists-groups-part-menu">
          <div onClick={()=> setShowGroups(!showGroups)} className='lists-groups-show-button'>
            <img src={IMAGES.groupImage} className="menu-icon" alt="" />
            <span>GROUPS:</span>
          </div>
          {showGroups && <div>
          {groups.map((group) => (
            <li
              className='lists-groups-menu-button'
              id={group._id}
              key={group._id}
              onClick={() => {
                handleClickOnMenu({ kind: 'group', info: group });
              }}
            >
              <img src= {IMAGES.garbageImage} className="delete-list-group" alt="delete"
                        onClick={(event) => handleDeleteGroup(event, group._id)}/>

              <span className="lists-and-groups-text">{group.title}</span>
            </li>
          ))}
          </div>}
        </div>
      )}
    </div>
  );
};

export default ListAndGroupsPartMenu;