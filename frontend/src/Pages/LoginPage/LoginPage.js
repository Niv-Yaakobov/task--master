import './LoginPage.css'
import * as IMAGES from "../../images"
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useState } from 'react';
import axios from 'axios'
import { useHistory } from 'react-router-dom';


const LoginPage = ({handleUserLogin}) => {

    const history = useHistory();

    const [mail , setMail] = useState('')
    const [password , setPassword] = useState('')
    const [error, setError] = useState(null)
    const [incorrectInfo ,setIncorrectInfo] = useState(false)


    const handleSubmit = async (e) =>{
        e.preventDefault()
        const userInfo = {mail , password}
        
        const postResponse = await axios.post(`http://${process.env.REACT_APP_BACKEND_IP}:4001/login` , userInfo)

        if (!postResponse){  
            setError('error occurred')
        }
        const userId = postResponse.data.id
        if(userId === '0'){
            setIncorrectInfo(true)
        }
        else{
            // Redirect to the home page upon successful login
            handleUserLogin(userId, mail)
            history.push('/home');
        }
    }

    return ( 
    <form className="Login-page-form" onSubmit={handleSubmit}>
        <div className="login-container">
        <h1 className="login-page-headline">Login</h1>

        <div className="data-container mail-container">
            <img src={IMAGES.manImage} className="man-icon icon-login-page" alt="" />
            <input
                required
                type="mail" name="mail" className="input-login-page" placeholder="Mail"
                onChange={(e) =>{setMail(e.target.value) ; setIncorrectInfo(false)} }
                value={mail}
            />
        </div>

        <div className="data-container password-container">
            <img src={IMAGES.lockImage} className="lock-icon icon-login-page" alt=""/>
            <input 
                required
                type="password" name="password" className="input-login-page"placeholder="Password"
                onChange={(e) =>{setPassword(e.target.value) ; setIncorrectInfo(false)} }
                value={password}
            />
        </div>
        
        {error && <p className="error">{error}</p>}
        {incorrectInfo && <p className="error"> Mail or password is incorrect </p>}

        <div>
            <button type="submit" className="login-button">Login</button>
        </div>

        <div className="link-container">
            <Link to="SignUpPage" className="login-page-link">I don't have an account</Link>
        </div>

        </div>
    </form>
     );
}
 
export default LoginPage;