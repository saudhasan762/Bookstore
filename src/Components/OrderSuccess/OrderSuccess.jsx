import React from 'react';
import OrderImg from "../../Assets/order.png"
import { Button} from '@material-ui/core';
import './OrderSuccess.scss'
import { withRouter } from 'react-router-dom';

class OrderSucess extends React.Component {
    constructor(props) {
        super(props);
    }
    goToDashboard=()=>{
        this.props.history.push("/Dashboard/DisplayBooks");
    }
    render() {
        return (
            <div>
                <div className="orderbody">
                    <div className="image">
                        <img src={OrderImg} alt="" />
                    </div>
                    <div className="texts">
                        Hurray!!! your order is confirmed the order  id is #12345 save the 
                        order id for further communication   
                    </div>
                     <div className="table">
                        <table>
                            <tr>
                                <th>Email us</th>
                                <th>Contact us</th>
                                <th>Address</th>
                            </tr>
                            <tr>
                                <td>admin@bookstore.com</td>
                                <td>#91 4415621555</td>
                                <td>Dehradun, Uttrakhand</td>
                            </tr>
                        </table>
                    </div>
                    {/* <div>
                    <Button variant="contained" fullWidth className="continue-shop" onClick={this.goToDashboard}>CONTINUE SHOPPING</Button>
                    </div> */}
                    <div className="success-wrapper">
                        <Button  variant="contained" className="continue-shop" onClick={this.goToDashboard}> CONTINUE SHOPPING </Button>
                    </div>
                  
                </div> 
                     {/* <Footer /> */}
            </div>
        )
    }

}
export default withRouter (OrderSucess);