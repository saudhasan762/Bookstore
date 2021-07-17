import { Button, TextField, InputAdornment } from "@material-ui/core";
import { Component } from "react";
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert"
import './Signup.scss'
import UserServices from "../../Services/UserServices.js";
import { withRouter } from "react-router-dom";
const service = new UserServices();

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props}></MuiAlert>
}

class Signup extends Component{
    constructor(props) {
        super(props);
        this.state = ({
            login: false,
            fullName: "",
            email: "",
            password: "",
            mobile: "",
            fullNameError: false,
            emailError: false,
            passwordError: false,
            mobileError: false,
            fullNameErrormsg: "",
            emailErrormsg: "",
            passwordErrmsg: "",
            mobileErrmsg: "",
            visibility:false,
            open: false,
            snackMessage: "",
            snackType: "",
            loader:false,
            show:true
        })
    }

    validateInput = () => {
        this.setState({
            fullNameError: false,
            fullNameErrormsg: '',
            emailError: false,
            emailErrormsg: '',
            passwordError: false,
            passwordErrormsg: '',
            mobileError: false,
            mobileErrormsg: ""
        })
        var validate = true;
        if (this.state.fullName.length == 0) {
            this.setState({ fullNameError: true })
            this.setState({ fullNameErrormsg: "Enter full name " })
            validate = false;
        }


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

        if (this.state.password.length < 8) {
            this.setState({ passwordError: true })
            this.setState({ passwordErrormsg: "password should be atleast 8 characters" })
            validate = false;
        }

        if (this.state.password.length == 0) {
            this.setState({ passwordError: true })
            this.setState({ passwordErrormsg: "Enter a password" })
            validate = false;
        }

        if (this.state.mobile.length == 0) {
            this.setState({ mobileError: true })
            this.setState({ mobileErrormsg: "Enter a mobile" })
            validate = false;
        }
        return validate;
    }

    changeInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({ [name]: value })
    }

    Signup = () => {
        if(this.validateInput()){
            let data = {
                "fullName": this.state.fullName,
                "email": this.state.email,
                "password": this.state.password,
                "phone": this.state.mobile
            }
            console.log(data);
            service.register(data).then((res) => {
                console.log(res);
                this.props.history.push('/');
                this.setState({ snackType: "success", snackMessage: "Registered successful", open: true, setOpen: true })
            }).catch((err)=>{
                console.log(err);
                this.setState({ snackType: "error", snackMessage: "Registeration Failed", open: true, setOpen: true })
            }) 
        }else {
            this.setState({ snackType: "error", snackMessage: "Enter Valid Details", open: true, setOpen: true })
        }
    } 

    changePasswordVisibility = () => {
        this.setState({visibility: !this.state.visibility})
    }


    render(){
        return(
            <>
                <TextField id="outlined-basic"
                   label="Fullname"
                   className="textField"
                   variant="outlined"
                   margin='dense'
                   name="fullName" 
                   error={this.state.fullNameError}
                   helperText={this.state.fullNameErrormsg}
                   onChange={this.changeInput}
                   >
                </TextField>

                <TextField id="outlined-basic"
                    label="Email "
                    className="textField"
                    variant="outlined"
                    margin='dense'
                    name="email"
                    error={this.state.emailError}
                    helperText={this.state.emailErrormsg}
                    onChange={this.changeInput}
                    >
                </TextField>
                
                <TextField id="outlined-basic"
                    label="Password"
                    className="textField"
                    variant="outlined"
                    margin='dense'
                    name="password"
                    error={this.state.passwordError}
                    helperText={this.state.passwordErrmsg}
                    onChange={this.changeInput}
                    type={this.state.visibility ? 'text' : 'password'}
                    InputProps={{ endAdornment: <InputAdornment position="end">
                                {this.state.visibility ? <Visibility className="end" onClick={this.changePasswordVisibility} />:<VisibilityOff className="end" onClick={this.changePasswordVisibility} />}
                            </InputAdornment>,
                        }}>
                </TextField>

                <TextField id="outlined-basic"
                    label="Mobile"
                    variant="outlined"
                    margin='dense'
                    className="textField"
                    error={this.state.mobileError}
                    helperText={this.state.mobileErrmsg}
                    name="mobile" onChange={this.changeInput}>
                </TextField>
                <Button variant="contained" onClick={this.Signup}>SIGNUP</Button>
                <div >
                    <Snackbar style={{width:"20%"}} open={this.state.open} autoHideDuration={3000} onClose={this.handleSnackClose}>
                        <Alert severity={this.state.snackType}>{this.state.snackMessage}</Alert>
                    </Snackbar>
                </div>
            </>
        )
    }
}

export default withRouter (Signup);