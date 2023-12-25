import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './HomePage/Home';
import Welcome from './WelcomePage/Welcome'
import LoginPage from './LoginPage/LoginPage';
import SignUpPage from './SignUpPage/SignUpPage';


const App = () => {

  const handleUserId = (userId) =>{
    // Store userId in localStorage
    localStorage.setItem('userId', userId);
  }

  return ( 
    <Router>
      <div className="App">
        <Switch>
            <Route exact path = '/'>
              <Welcome/>
            </Route>
            <Route path="/LoginPage">
              <LoginPage handleUserId = {handleUserId}/>
            </Route>
            <Route path="/SignUpPage">
              <SignUpPage handleUserId = {handleUserId}/>
            </Route>
            <Route path='/Home'>
                <Home/>
            </Route>
          </Switch>
      </div>
    </Router>
   );
}
 
export default App;