import * as IMAGES from  '../../../../images.js'

const TaskPartMenu = ({handleClickOnMenu}) => {


    return ( (

        <div id="main-part-menu">
            <li onClick={() =>{handleClickOnMenu({kind:'task' , info:{title:'My Day'}})}}>
                <img src={IMAGES.sunImage} className="menu-icon" alt=""/>My Day
            </li>
            <li onClick={() =>{handleClickOnMenu({kind:'task' , info:{title:'Scheduled'}})}}>
                <img src={IMAGES.calanderImage} className="menu-icon" alt=""/>Scheduled
            </li>
            <li onClick={() =>{handleClickOnMenu({kind:'task' , info:{title:'Important'}})}}>
                <img src={IMAGES.starImage} className="menu-icon" alt=""/>Important
            </li>
            <li onClick={() =>{handleClickOnMenu({kind:'task' , info:{title:'All'}})}}>
                <img src={IMAGES.homeImage} className="menu-icon" alt=""/>All
            </li>
        </div>

    ));
}
 
export default TaskPartMenu;