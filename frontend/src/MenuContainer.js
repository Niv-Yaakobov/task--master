import TaskPartMenu from './TaskPartMenu.js';
import ListAndGroupsPartMenu from './ListAndGroupsPartMenu.js'

const MenuContainer = ({handleClickOnMenu ,userId ,userMail}) => {

    return ( 
        <div id="menu-container">
            <div id="username-title">{userMail}</div>
            <nav>
                <ul>
                  <TaskPartMenu handleClickOnMenu={handleClickOnMenu}/>
                  <ListAndGroupsPartMenu handleClickOnMenu={handleClickOnMenu} userId = {userId}/>
                </ul>
            </nav>
            <div id="add-groups-and-lists-button-container">
                <button className="add-button list-add-button">Add list</button>
                <button className="add-button group-add-button">Add group</button>
            </div>
        </div>
     );
}
 
export default MenuContainer;