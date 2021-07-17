import { Button, TextField } from "@material-ui/core";
import { Component } from "react";
import './Signup.scss'

class Signup extends Component{
    render(){
        return(
            <>
                <TextField id="outlined-basic"
                   label="Fullname"
                   className="textField"
                   variant="outlined"
                   margin='dense'
                   name="fullName" >
                </TextField>

                <TextField id="outlined-basic"
                    label="Email "
                    className="textField"
                    variant="outlined"
                    margin='dense'
                    name="email">
                </TextField>
                
                <TextField id="outlined-basic"
                    label="Password"
                    className="textField"
                    variant="outlined"
                    margin='dense'
                    name="password">
                </TextField>

                <TextField id="outlined-basic"
                    label="Mobile"
                    variant="outlined"
                    margin='dense'
                    className="textField"
                    name="mobile">
                </TextField>
                <Button variant="contained">SIGNUP</Button>
            </>
        )
    }
}

export default Signup;