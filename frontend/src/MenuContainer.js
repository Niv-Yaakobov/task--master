import TaskPartMenu from './TaskPartMenu.js';
import ListAndGroupsPartMenu from './ListAndGroupsPartMenu.js'

const MenuContainer = ({handleClickOnMenu}) => {

    const userName = 'Niv'

    return ( 
        <div id="menu-container">
            <div id="username-title">{userName}</div>
            <nav>
                <ul>
                  <TaskPartMenu handleClickOnMenu={handleClickOnMenu}/>
                  <ListAndGroupsPartMenu handleClickOnMenu={handleClickOnMenu}/>
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