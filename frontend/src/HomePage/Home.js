import './Home.css'
import MenuContainer from '../MenuContainer.js';
import TaskSideContainer from '../TaskSideContainer.js';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';


function Home() {

  //initial data for the home page
  const [data, setData] = useState({kind:'task', info:{title:'My Day'}})
  //move the data of the clicked item in the menu to the tasks side
  const handleClickOnMenu = (data) => {
   setData(data);
  }

  //handle the userId 
  const history = useHistory();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Retrieve userId from localStorage
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
    else{
      history.push('/LoginPage');
    }
  }, [])


  return (
    <div className="Home-container" >
      <MenuContainer handleClickOnMenu ={handleClickOnMenu} userId = {userId}/>
      <TaskSideContainer data = {data} userId={userId}/>
    </div>
  );
}

export default Home;
