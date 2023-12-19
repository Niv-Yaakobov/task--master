import '../LoginPage/LoginPage.css'
import * as IMAGES from "../images"
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const SignUpPage = () => {
    return ( 
        <div className="Login-page-container">
            <div className="sign-up-container">
                <h1 className="login-page-headline">Sign Up</h1>
                <div className="data-container mail-container">
                    <img src={IMAGES.manImage} className="man-icon icon-login-page" alt="" />
                    <input type="mail" name="mail" className="input-login-page" placeholder="Username"/>
                </div>
                <div className="data-container password-container">
                    <img src={IMAGES.mailIconImage} className="lock-icon icon-login-page" alt=""/>
                    <input type="password" name="password" className="input-login-page"placeholder="Mail"/>
                </div>
                <div className="data-container password-container">
                    <img src={IMAGES.lockImage} className="lock-icon icon-login-page" alt=""/>
                    <input type="password" name="password" className="input-login-page"placeholder="Password"/>
                </div>
                <div>
                    <button type="submit" className="login-button">Sign Up</button>
                </div>
                <div className="link-container">
                    <Link to="LoginPage" className="login-page-link">Already have an account</Link>
                </div>
            </div>
        </div>
     );
}
 
export default SignUpPage;