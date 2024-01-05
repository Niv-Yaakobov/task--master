import TaskPartMenu from './TaskPartMenu.js';
import ListAndGroupsPartMenu from './ListAndGroupsPartMenu.js'
import AddListButton from './AddListsAndGroups.js'
import { useState } from 'react';


const MenuContainer = ({handleClickOnMenu ,userId ,userMail}) => {

    const [lists, setLists] = useState(null);
    const [groups, setGroups] = useState(null);

    return ( 
        <div id="menu-container">
            <div id="username-title">{userMail}</div>
            <nav>
                <ul>
                  <TaskPartMenu handleClickOnMenu={handleClickOnMenu}/>
                  <ListAndGroupsPartMenu handleClickOnMenu={handleClickOnMenu} 
                        userId = {userId} lists={lists} setLists={setLists}
                        groups={groups} setGroups={setGroups}/>
                </ul>
            </nav>
            <div id="add-groups-and-lists-button-container">
                <AddListButton userId ={userId} setLists={setLists} setGroups={setGroups} lists={lists} groups={groups}/>

            </div>
        </div>
     );
}
 
export default MenuContainer;