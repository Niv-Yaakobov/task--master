import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './Pages/HomePage/Home.js';
import Welcome from './Pages/WelcomePage/Welcome.js'
import LoginPage from './Pages/LoginPage/LoginPage.js';
import SignUpPage from './Pages/SignUpPage/SignUpPage';
import AddGroupPage from "./Pages/AddGroupPage/AddGroupPage.js";

const App = () => {


  const handleUserLogin = (userId,userMail) =>{
    // Store userId in localStorage
    localStorage.setItem('userId', userId);
    // Store userMail in localStorag 
    localStorage.setItem('userMail', userMail);
    
  }

  return ( 
    <Router>
      <div className="App">
        <Switch>
            <Route exact path = '/'>
              <Welcome/>
            </Route>
            <Route path="/LoginPage">
              <LoginPage handleUserLogin = {handleUserLogin}/>
            </Route>
            <Route path="/SignUpPage">
              <SignUpPage handleUserLogin = {handleUserLogin}/>
            </Route>
            <Route path='/Home'>
                <Home/>
            </Route>
            <Route path='/AddGroup'>
                <AddGroupPage/>
            </Route>
          </Switch>
      </div>
    </Router>
   );
}
 
export default App;