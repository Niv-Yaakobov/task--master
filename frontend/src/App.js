import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './HomePage/Home';
import Welcome from './WelcomePage/Welcome'
import LoginPage from './LoginPage/LoginPage';
import SignUpPage from './SignUpPage/SignUpPage';


const App = () => {
  return ( 
    <Router>
      <div className="App">
        <Switch>
          <Route exact path = '/'>
            <Welcome/>
          </Route>
          <Route path="/Login">
            <LoginPage/>
          </Route>
          <Route path="/SignUp">
            <SignUpPage/>
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