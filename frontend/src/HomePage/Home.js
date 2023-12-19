import './Home.css'
import MenuContainer from '../MenuContainer.js';
import TaskSideContainer from '../TaskSideContainer.js';
import { useState } from 'react';

function Home() {

  const [data, setData] = useState({kind:'task', info:{title:'My Day'}})

  const handleClickOnMenu = (data) => {
   setData(data);
  }

  return (
    <div className="Home-container" >
      <MenuContainer handleClickOnMenu ={handleClickOnMenu}/>
      <TaskSideContainer data = {data}/>
    </div>
  );
}

export default Home;
