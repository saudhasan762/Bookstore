import { TextField, Button } from "@material-ui/core";
import { AddCircleOutlineTwoTone, RemoveCircleOutlineTwoTone } from "@material-ui/icons";
import { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import bookImg from "../../Assets/bookbig.png"
import BookServices from "../../Services/BookServices";
import { cartCount } from "../../Redux/Actions/ActionType";
import "./Cart.scss"
const service = new BookServices();

class Cart extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: "",
            phoneNumber: "",
            pinCode: "",
            locality: "",
            address: "",
            city: "",
            state: "",
            showAD: false,
            showOS: false,
            cartBooks: [],
            nameError: false, nameErrormsg: "", phnoError: false, phnoErrormsg: "", pincodeError: false,
            pincodeErrormsg: "", localityError: false, localityErrormsg: "", addressError: false,
            addressErrormsg: "", cityError: false, cityErrormsg: "", stateError: false, stateErrormsg: ""

        }
    }

    componentDidMount(){
        this.getCartBooks();
    }

    getCartBooks = () => {
        service.getCartItems().then((res) => {
            console.log(res);
            this.setState({cartBooks: res.data.result});
            this.props.cartCount(res.data.result.length);
        })
        .catch((err)=> {
            console.log(err);
        })
    }

    validationCheck = () => {
        this.setState({
            nameError: false, nameErrormsg: "", phnoError: false, phnoErrormsg: "", pincodeError: false,
            pincodeErrormsg: "", localityError: false, localityErrormsg: "", addressError: false,
            addressErrormsg: "", cityError: false, cityErrormsg: "", stateError: false, stateErrormsg: ""
        })
        // console.log(this.state.name);
        // console.log(this.state.phoneNumber);
        // console.log(this.state.pinCode);
        // console.log(this.state.locality);
        // console.log(this.state.address);
        // console.log(this.state.city);
        // console.log(this.state.state);
        var valid = true;
        if (this.state.name.length === 0) {
            this.setState({ nameError: true })
            this.setState({ nameErrormsg: "Enter your name " })
            valid = false;
        }
        let phonePattern = new RegExp('^[0-9]{10}$');
        if (!phonePattern.test(this.state.phoneNumber)) {
            this.setState({ phnoError: true })
            this.setState({ phnoErrormsg: " Enter your 10 digit mobile number" })
            valid = false;
        }
        let pincodeNo = new RegExp('^[0-9]{6}$');
        if (!pincodeNo.test(this.state.pinCode)) {
            this.setState({ pincodeError: true })
            this.setState({ pincodeErrormsg: "Enter your pincode" })
            valid = false;
        }
        let local = new RegExp('[a-zA-Z][a-zA-Z ]*')
        if (!local.test(this.state.locality)) {
            this.setState({ localityError: true })
            this.setState({ localityErrormsg: "Enter your locality" })
            valid = false;
        }
        let localaddress = new RegExp('[a-zA-Z][a-zA-Z 0-9]*')
        if (!localaddress.test(this.state.address)) {
            this.setState({ addressError: true })
            this.setState({ addressErrormsg: "Enter your address " })
            valid = false;
        }
        if (this.state.city.length === 0) {
            this.setState({ cityError: true })
            this.setState({ cityErrormsg: "Enter your  city " })
            valid = false;
        }
        let stateName = new RegExp('[a-zA-Z][a-zA-Z ]*')
        if (!stateName.test(this.state.state)) {
            this.setState({ stateError: true })
            this.setState({ stateErrormsg: "Enter your state name" })
            valid = false;
        }
        return valid;

    }

    increment = (product_id, quantity) => {
        let data = {
            "quantityToBuy": quantity + 1
        }
        service.cartIncrementDecrement(data, product_id).then((res) => {
            this.getCartBooks();
        }).catch((err) => {
            console.log(err);
        })
    }

    decrement = (product_id, quantity) => {
        let data = {
            "quantityToBuy": quantity - 1
        }
        if(data.quantityToBuy >= 1){
            service.cartIncrementDecrement(data, product_id).then((res) => {
                this.getCartBooks();
            })
            .catch((err) => {
                console.log(err);
            })
        }
        else{
            console.log("Out of Stock");
        }
    }

    openAD = () => {
        this.setState({showAD: true});
    }

    removeCartItem = (product_id) => {
        service.removeCartItem(product_id).then(()=> {
            this.componentDidMount();
            // this.props.history.push("/Dashboard/Cart");
        })
        .catch((err) => {
            console.log(err);
        })
    }

    submitDetails = () => {
        if(this.validationCheck()){
            let data = {
                "addressType": "Home",
                "fullAddress": `${this.state.name},${this.state.address},${this.state.locality},${this.state.pinCode},${this.state.phoneNumber}`,
                "city": this.state.city,
                "state": this.state.state
            }
            service.userDetails(data).then((res) => {
                console.log(res);
                this.setState({showOS: true});
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }

    checkout = () => {
        let order = [];
        this.state.cartBooks.map((val) => {
            let arr = {
                "product_id": val.product_id._id,
                "product_name": val.product_id.bookName,
                "product_quantity": val.quantityToBuy,
                "product_price": val.product_id.price
            };
            order.push(arr);
        })

        let data = {
            orders: order
        };
        service.order(data).then((res) =>{
            console.log(res);
            this.props.history.push("/Dashboard/OrderSuccess");
        })
        .catch((err) => {
            console.log(err);
        })
        this.state.cartBooks.map((val) => {
            this.removeCartItem(val._id);
        })

    }

    changeStates = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({ [name] : value});
    }

    render(){
        return(
            <>
            <div className="cartcontent">
                <span className="Home">Home/Cart</span><br />
                <div className="cartitems box">
                    <div className="mycart">My Cart({this.state.cartBooks.length})</div>
                    {this.state.cartBooks.map((val, index) => {
                    return (<><div className="part1">
                        <div className="container">
                            <div><img src={bookImg} alt=""></img></div>
                            <div className="items">
                                <div>{val.product_id.bookName}</div>
                                <div className="author">by {val.product_id.author}</div>
                                <div className="price">Rs. {val.product_id.price * val.quantityToBuy}</div>
                                <div className="inlineicons">
                                    <AddCircleOutlineTwoTone style={{ opacity: 0.4,cursor:"pointer"}} onClick={()=>this.increment(val._id, val.quantityToBuy)} ></AddCircleOutlineTwoTone>
                                    <div className="quantity">{val.quantityToBuy}</div>
                                    <RemoveCircleOutlineTwoTone style={{ opacity: 0.4, cursor:"pointer"}} onClick={()=>this.decrement(val._id, val.quantityToBuy)}></RemoveCircleOutlineTwoTone>
                                    {this.state.showAD === false ? <div className="remove" onClick={() => this.removeCartItem(val._id)}>Remove</div> : <></>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="placeOrder">
                        {this.state.cartBooks.length - 1 === index ? this.state.showAD ? null :
                        <Button  variant="contained" color="primary" onClick={this.openAD}>Place Order</Button> : null}
                    </div></>)
                    })}
                </div>
                <div className="customerdetails box">
                    <div className="mycart">Address Details</div>
                    {this.state.showAD ? <><br></br> <div className="addressfield">
                        <TextField id="outlined-basic" label="Name" variant="outlined"
                        name="name" 
                        margin='dense' onChange={this.changeStates}
                        error={this.state.nameError} helperText={this.state.nameErrormsg}
                        ></TextField>
                        <TextField id="outlined-basic" label="Mobile Number" variant="outlined"
                        name="phoneNumber"
                        error={this.state.phnoError} helperText={this.state.phnoErrormsg}
                        margin='dense' onChange={this.changeStates}></TextField>
                        <TextField id="outlined-basic" label="Pincode" variant="outlined"
                        name="pinCode"
                        error={this.state.pincodeError} helperText={this.state.pincodeErrormsg}
                        margin='dense' onChange={this.changeStates}></TextField>
                        <TextField id="outlined-basic" label="Locality" variant="outlined"
                        name="locality"
                        error={this.state.localityError} helperText={this.state.localityErrormsg}
                        margin='dense' onChange={this.changeStates}></TextField>
                        <TextField id="outlined-basic" label="Address" variant="outlined"
                        name="address"
                        error={this.state.addressError} helperText={this.state.addressErrormsg}
                        margin='dense' onChange={this.changeStates}></TextField>
                        <TextField id="outlined-basic" label="City/Town" variant="outlined"
                        name="city"
                        error={this.state.cityError} helperText={this.state.cityErrormsg}
                        margin='dense' onChange={this.changeStates}></TextField>
                        <TextField id="outlined-basic" label="State" variant="outlined"
                        name="state"
                        error={this.state.stateError} helperText={this.state.stateErrormsg}
                        margin='dense' onChange={this.changeStates}></TextField>
                    </div>
                    {this.state.showOS ? null : <Button variant="contained" onClick={this.submitDetails}>Continue</Button>}
                    </> : null }
                </div>     

                <div className="cartitems box">
                    <div className="mycart">Order Summary</div>
                    {this.state.showOS ? 
                    <> {this.state.cartBooks.map((val, index) => {  
                    return (<><div className="part1">
                        <div className="container">
                            <div><img src={bookImg} alt=""></img></div>
                            <div className="items">
                                <div>{val.product_id.bookName}</div>
                                <div className="author">by {val.product_id.author}</div>
                                <div className="price">Rs.{val.product_id.price * val.quantityToBuy}</div>
                            </div>
                        </div>
                    </div>

                    <div className="checkout">
                        {this.state.cartBooks.length - 1 === index ?
                        <Button variant="contained" color="primary" onClick={this.checkout}>CHECKOUT </Button> : null }
                    </div> </>)
                    })} </> : null }
                </div>        
            </div> 
            </>
        )
    }
}

export default (withRouter) (connect(null, {cartCount}) (Cart));