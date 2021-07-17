import { Button, TextField } from "@material-ui/core";
import { Component } from "react";
import './Login.scss'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            login: true,
            email: "",
            password: "",
            emailError: false,
            passwordError: false,
            emailErrormsg: "",
            passwordErrmsg: "",
            visibility: false,
            key: "user",
            open: false,
            snackMessage: "",
            snackType: "",
            loader: false,
            show: true,
            name: ""
        })
    }

    change = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({ [name]: value });
    }

    validationCheck = () => {
        this.setState({
            emailError: false,
            emailErrormsg: '',
            passwordError: false,
            passwordErrormsg: '',
        })
        var valid = true;

        let patter = "^[0-9a-zA-Z]+([.\\-_+][0-9a-zA-Z]+)*@[a-z0-9A-Z]+.[a-z]{2,4}([.][a-zA-Z]{2,})*$";
        let pattern = new RegExp(patter);
        if (!pattern.test(this.state.email)) {
            this.setState({ emailError: true })
            this.setState({ emailErrormsg: "Invalid Email address" })
            valid = false;
        }
        if (this.state.email.length == 0) {
            this.setState({ emailError: true })
            this.setState({ emailErrormsg: "Choose Email address" })
            valid = false;
        }


        if (this.state.password.length == 0) {
            this.setState({ passwordError: true })
            this.setState({ passwordErrormsg: "Enter a password" })
            valid = false;
        }
        return valid;
    }

    login = () => {
        if(this.validationCheck){
            let data = {
                "email": this.state.email,
                "password": this.state.password
            }
            console.log(data);
        }
    }

    render() {
        return (
            <>
                <TextField id="outlined-basic" label="Email Id" variant="outlined" margin="dense" name="email"
                onChange={this.change}
                >

                </TextField>
                <div>
                    <TextField id="outlined-basic" label="Password" variant="outlined" name="password" fullWidth margin="dense"></TextField>
                </div>
                <Button variant="contained" color="secondary" onClick={this.login}>Login</Button>
                <div className="inlineButtons1">
                    <Button variant="contained" className="button1" color="primary">
                        Facebook
                    </Button>
                    <Button variant="contained" className="button2" color="default">
                        Google
                    </Button>
                </div>
            </>
        )
    }
}

export default Login;