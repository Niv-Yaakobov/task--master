import * as IMAGES from  './images.js'
import useFetch from './useFetch.js';



const ListAndGroupsPartMenu = ({handleClickOnMenu}) => {

    const {data:lists, listsIsPending, listsError} = useFetch('http://localhost:8000/lists')
    const {data:groups, groupsIsPending, groupsError} = useFetch('http://localhost:8000/groups')


    return (  
        <div className='second-part-menu'>
            { listsError && groupsError && <div>{ listsError + groupsError }</div> }
            { groupsIsPending && listsIsPending && <div> Loading... </div> }
            {lists && <div id="lists-groups-part-menu">
                <img src={IMAGES.listImage} className="menu-icon" alt="ion"/><span>LISTS:</span>
                    {lists.map((list) => (
                        <li id={list.id} key={list.id} onClick={() =>{handleClickOnMenu({kind:'list' , info:list})}}>
                            <span className="lists-and-groups-text">{list.title}</span>
                        </li>
                    ))}
            </div>}
            {groups && <div id="lists-groups-part-menu">
            <img src={IMAGES.groupImage} className="menu-icon" alt=""/><span>GROUPS</span>
                {groups.map((group) => (
                    <li id={group.id} key={group.id} onClick={() =>{handleClickOnMenu({kind:'group' ,info:group})}}>
                        <span className="lists-and-groups-text">-{group.title}</span>
                    </li>
                ))}
            </div>}
        </div>
    );
}
 
export default ListAndGroupsPartMenu;