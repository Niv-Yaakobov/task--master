import { useEffect, useState } from 'react';
import * as IMAGES from  '../../../../images.js'
import useFetch from '../../../../useFetch.js';
import axios from 'axios'


const ListAndGroupsPartMenu = ({ handleClickOnMenu, userId,lists,setLists,groups,setGroups, data}) => {

  const [showLists , setShowLists] = useState(false)
  const [showGroups , setShowGroups] = useState(false)

  const { data: listsData, isPending: listsIsPending, error: listsError } = useFetch(
    userId ? `http://${process.env.REACT_APP_BACKEND_IP}:4001/${userId}/lists` : null
  );
  const { data: groupsData, isPending: groupsIsPending, error: groupsError } = useFetch(
    userId ? `http://${process.env.REACT_APP_BACKEND_IP}:4001/${userId}/groups` : null
  );


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
    // check if the deleted list is being display, if yes change the display list the the first group 
    if(data.info._id === id){
      handleClickOnMenu({ kind: 'list', info: lists[0] })
    }
    //delete request to the server
    await axios.delete(`http://${process.env.REACT_APP_BACKEND_IP}:4001/${userId}/lists/${id}`);
  };

  const handleDeleteGroup = async (event, id) => {
    event.stopPropagation(); // Stop event propagation to the parent li
    //delete it from the local lists array
    const newGroupsList = groups.filter((group) => group._id !== id);
    setGroups(newGroupsList);
    // check if the deleted group is being display, if yes change the display group the the first group 
    if(data.info._id === id){
      handleClickOnMenu({ kind: 'group', info: groups[0] })
    }
    //delete request to the server
    await axios.delete(`http://${process.env.REACT_APP_BACKEND_IP}:4001/${userId}/groups/${id}`);
  };

  return (
    <div className='second-part-menu'>
      {listsError && <div>{listsError}</div>}
      
        <div id="lists-groups-part-menu">
          <div onClick={() => setShowLists(!showLists)} className='lists-groups-show-button'>
            <img src={IMAGES.listImage} className="menu-icon" alt="ion" />
            <span>LISTS:</span>
            <span><img src={showLists ? IMAGES.upArrowImage : IMAGES.downArrowImage} className="menu-icon arrow-icon" alt="ion" /></span>
          </div>
          {lists && showLists && <div>
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
        
      {groupsError && <div>{groupsError}</div>}
      
        <div id="lists-groups-part-menu">
          <div onClick={()=> setShowGroups(!showGroups)} className='lists-groups-show-button'>
            <img src={IMAGES.groupImage} className="menu-icon" alt="" />
            <span>GROUPS:</span>
            <span><img src={showGroups ? IMAGES.upArrowImage : IMAGES.downArrowImage} className="menu-icon arrow-icon" alt="ion" /></span>
          </div>
          {groups && showGroups && <div>
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
    </div>
  );
};

export default ListAndGroupsPartMenu;