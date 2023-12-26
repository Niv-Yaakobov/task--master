import { useState,useEffect } from 'react';
import * as IMAGES from  './images.js'
import useFetch from './useFetch.js';


const ListAndGroupsPartMenu = ({ handleClickOnMenu, userId }) => {
  const [lists, setLists] = useState(null);
  const [groups, setGroups] = useState(null);

  const { data: listsData, isPending: listsIsPending, error: listsError } = useFetch(
    userId ? `http://localhost:4001/${userId}/lists` : null
  );
  const { data: groupsData, isPending: groupsIsPending, error: groupsError } = useFetch(
    userId ? `http://localhost:4001/${userId}/groups` : null
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

  return (
    <div className='second-part-menu'>
      {listsError && <div>{listsError}</div>}
      {listsIsPending && <div>Loading lists...</div>}
      {lists && (
        <div id="lists-groups-part-menu">
          <img src={IMAGES.listImage} className="menu-icon" alt="ion" />
          <span>LISTS:</span>
          {lists.map((list) => (
            <li
              id={list._id}
              key={list._id}
              onClick={() => {
                handleClickOnMenu({ kind: 'list', info: list });
              }}
            >
              <span className="lists-and-groups-text">{list.title}</span>
            </li>
          ))}
        </div>
      )}
      {groupsError && <div>{groupsError}</div>}
      {groupsIsPending && <div>Loading groups...</div>}
      {groups && (
        <div id="lists-groups-part-menu">
          <img src={IMAGES.groupImage} className="menu-icon" alt="" />
          <span>GROUPS:</span>
          {groups.map((group) => (
            <li
              id={group._id}
              key={group._id}
              onClick={() => {
                handleClickOnMenu({ kind: 'group', info: group });
              }}
            >
              <span className="lists-and-groups-text">-{group.title}</span>
            </li>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListAndGroupsPartMenu;