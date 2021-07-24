import { Component } from "react";
import mainImg from "../../Assets/loginImg.png"
import './LoginMain.css'
import Login from "../../Components/Login/Login";
import Signup from "../../Components/Register/Signup";
import { Route } from "react-router-dom";

export default class LoginMain extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            fullName: "",
            email: "",
            password: "",
            login: false

        })
    }

    switchToSignup = () => {
        this.props.history.push('/Bookstore/Signup');
        this.setState({login: true})
    }

    switchToLogin = () => {
        this.props.history.push('/Bookstore/Login');
        this.setState({login: false})
    };

    render() {
        return (
            <div className="fullbody">
                <div className="imagebody">
                    <img src={mainImg} style={{ borderRadius: '50%', width: '215px', height: '215px' }} alt="" />
                    <div className="online"> <strong>ONLINE BOOK SHOPPING</strong></div></div>
                <div className="form">
                    <div className="inlinelinks">
                        <div onClick={this.switchToLogin} className={this.state.login === true ? "links1" : "links2"} style={{cursor:"pointer"}}><strong>LOGIN</strong></div>
                        <div onClick={this.switchToSignup} className={this.state.login === false ? "links1" : "links2"} style={{cursor:"pointer"}}><strong>SIGNUP</strong></div>
                    </div>
                        <Route exact path="/Bookstore/Login">
                            <Login />
                        </Route>
                        
                        <Route exact path="/Bookstore/Signup">
                            <Signup />
                        </Route>
                    {/* <Signup /> */}

                    
                </div>
            </div>
        )
    }
}