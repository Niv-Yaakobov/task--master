import '../LoginPage/LoginPage.css'
import * as IMAGES from "../../images"
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useState } from 'react';
import axios from 'axios'
import { useHistory } from 'react-router-dom';

const SignUpPage = ({handleUserLogin}) => {

    const history = useHistory();

    const [mail , setMail] = useState('')
    const [password , setPassword] = useState('')
    const [error, setError] = useState(null)
    const [mailIsUsed ,setMailIsUsed] = useState(false)


    const handleSubmit = async (e) =>{
        e.preventDefault()
        const userInfo = {mail , password}
        
        const postResponse = await axios.post(`http://${process.env.REACT_APP_BACKEND_IP}:4001/signUp` , userInfo)

        if (!postResponse){  
            setError('error occurred')
        }
        const userId = postResponse.data.id
        if(userId === '0'){
            setMailIsUsed(true)
        }
        else{
            // Redirect to the home page upon successful signup
            handleUserLogin(userId, mail)
            history.push('/home');
        }
    }

    return ( 
    <form className="signUp-page-form" onSubmit={handleSubmit}>
        <div className="login-container">
        <h1 className="login-page-headline">Sign-Up</h1>

        <div className="data-container mail-container">
            <img src={IMAGES.manImage} className="man-icon icon-login-page" alt="" />
            <input
                required
                type="mail" name="mail" className="input-login-page" placeholder="Mail"
                onChange={(e) =>{setMail(e.target.value) ; setMailIsUsed(false)} }
                value={mail}
            />
        </div>

        <div className="data-container password-container">
            <img src={IMAGES.lockImage} className="lock-icon icon-login-page" alt=""/>
            <input 
                required
                type="password" name="password" className="input-login-page"placeholder="Password"
                onChange={(e) =>setPassword(e.target.value) }
                value={password}
            />
        </div>
        
        {error && <p className="error">{error}</p>}
        {mailIsUsed && <p className="error"> Mail is already in use </p>}

        <div>
            <button type="submit" className="login-button">Sign Up</button>
        </div>

        <div className="link-container">
            <Link to="LoginPage" className="login-page-link">Already have an account</Link>
        </div>

        </div>
    </form>
     );
}
 
export default SignUpPage;