import { Link } from "react-router-dom";
import './Welcome.css'

const Welcome = () => {

    return ( 
    <div class="Welcome-container" >
        <h1 className="Welcome-to-app-headline">TaskMaster</h1>
        <div className="login-signup-links">
            <Link to="LoginPage" className='link'>Login</Link>
            <Link to="SignUpPage" className='link'>Sign Up</Link>    
        </div>
    </div>
     );
}
 
export default Welcome;