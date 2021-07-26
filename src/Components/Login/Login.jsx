import { Button, TextField, InputAdornment } from "@material-ui/core";
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Component } from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert"
import './Login.scss'
import UserServices from "../../Services/UserServices.js";
import { withRouter } from "react-router-dom";
const service = new UserServices();

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props}></MuiAlert>
}

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

    changePasswordVisibility = () => {
        this.setState({ visibility: !this.state.visibility })
    }

    validateInput = () => {
        let validate = true;
        this.setState({
            emailError: false,
            emailErrormsg: '',
            passwordError: false,
            passwordErrormsg: '',
        })

        let patter = "^[0-9a-zA-Z]+([.\\-_+][0-9a-zA-Z]+)*@[a-z0-9A-Z]+.[a-z]{2,4}([.][a-zA-Z]{2,})*$";
        let pattern = new RegExp(patter);
        if (!pattern.test(this.state.email)) {
            this.setState({ emailError: true })
            this.setState({ emailErrormsg: "Invalid Email address" })
            validate = false;
        }
        if (this.state.email.length == 0) {
            this.setState({ emailError: true })
            this.setState({ emailErrormsg: "Choose Email address" })
            validate = false;
        }


        if (this.state.password.length == 0) {
            this.setState({ passwordError: true })
            this.setState({ passwordErrormsg: "Enter a password" })
            validate = false;
        }
        return validate;
    }

    login = () => {
        if (this.validateInput()) {
            let data = {
                "email": this.state.email,
                "password": this.state.password
            }
            // console.log(data);
            service.login(data).then((res) => {
                console.log(res);
                localStorage.setItem('Token', res.data.result.accessToken);
                this.setState({ snackType: "success", snackMessage: "Login successful", open: true, setOpen: true });
                this.props.history.push("/Dashboard/DisplayBooks");
            })
                .catch((err) => {
                    console.log(err);
                    this.setState({ snackType: "error", snackMessage: "Login Failed", open: true, setOpen: true })
                })
        }
        else{
            this.setState({ snackType: "error", snackMessage: "Enter Valid Details", open: true, setOpen: true })
        }
        // this.setState({email: "",password: ""})
    }

    handleSnackClose = () => {
        this.setState({
            open: false,
            setOpen: false
        })
    }

    render() {
        return (
            <>
                <TextField id="outlined-basic" label="Email Id" variant="outlined" margin="dense" name="email"
                    onChange={this.change} error={this.state.emailError} helperText={this.state.emailErrormsg}
                >

                </TextField>
                <div>
                    <TextField id="outlined-basic" label="Password" variant="outlined" name="password" fullWidth margin="dense"
                        error={this.state.passwordError} helperText={this.state.passwordErrormsg} onChange={this.change}
                        type={this.state.visibility ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                {this.state.visibility ? <Visibility className="end" onClick={this.changePasswordVisibility} /> : <VisibilityOff className="end" onClick={this.changePasswordVisibility} />}
                            </InputAdornment>,
                        }}
                    ></TextField>
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
                <div >
                    <Snackbar style={{width:"20%"}} open={this.state.open} autoHideDuration={3000} onClose={this.handleSnackClose}>
                        <Alert severity={this.state.snackType}>{this.state.snackMessage}</Alert>
                    </Snackbar>
                </div>


            </>
        )
    }
}

export default withRouter (Login);