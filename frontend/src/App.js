import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './HomePage/Home';
import Welcome from './WelcomePage/Welcome'
import LoginPage from './LoginPage/LoginPage';
import SignUpPage from './SignUpPage/SignUpPage';
import { useState } from "react";


const App = () => {

  const [userId , setUserId] = useState(null)

  const handleUserId = (userId) =>{
    setUserId(userId)
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
                <Home userId = {userId}/>
            </Route>
          </Switch>
      </div>
    </Router>
   );
}
 
export default App;