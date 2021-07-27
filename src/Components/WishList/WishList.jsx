import BookServices from "../../Services/BookServices";
import { Button } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { Component } from "react";
import book from "../../Assets/bookbig.png"
import { cartCount } from "../../Redux/Actions/ActionType";
import './WishList.scss'
import { connect } from "react-redux";
const service = new BookServices();

class WishList extends Component{
    constructor(props){
        super(props);
        this.state={
            wishlistBooks: []
        }
    }

    componentDidMount(){
        this.getWishlistBooks();
        this.getcart();
    }

    getWishlistBooks = () => {
        service.getWishList().then((res) => {
            console.log(res);
            this.setState({wishlistBooks: res.data.result})
            console.log(this.state.wishlistBooks);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    removeItemFromWishlist = (id) => {
        console.log(id);
        service.removeFromWishList(id).then((res)=>{
            console.log(res);
            this.getWishlistBooks();
        })
        .catch((err)=> {
            console.log(err);
        })
    }

    getcart = () => {
        service.getCartItems().then((res) => {
            this.props.cartCount(res.data.result.length);
        })
    }

    movetoBag = (id) => {
        let data = {
            isCart: true
        }
        let token = localStorage.getItem('Token');
        service.addToCart(data, id, token).then((res)=>{
            console.log(res);
            this.removeItemFromWishlist(id);
            this.getWishlistBooks();
            this.getcart();
        })
        .catch((err)=> {
            console.log(err);
        })
    }

    render(){
        return(
            <>
            <div className="main-container">
                <div className="title1">Home/MyWishList</div>
                <div className="cartBag-content1">
                    <div className="heading-wishlist">My WishList({this.state.wishlistBooks.length})</div>
                    {this.state.wishlistBooks.map((value) => {
                    return (
                    <div className="main-cart1">
                        <div>
                            <img className="img-book" src={book} alt=""></img>
                        </div>
                        <div className="text-fields">
                            <div className="title">{value.product_id.bookName}</div>
                            <div className="bookAuthor">by {value.product_id.author}</div>
                            <div className="price1">Rs.{value.product_id.price}</div>
                        </div>
                        <div style={{marginTop: '25px'}}>
                            <div style={{marginLeft: '45px',cursor: "pointer"}} 
                            onClick={() => this.removeItemFromWishlist(value.product_id._id)}>
                            <Delete/>
                            </div>
                            <div style={{paddingTop: '30px'}} onClick={() => this.movetoBag(value.product_id._id)}>
                                <Button className="btn-place1" variant="contained">Move to Cart</Button>
                            </div>
                            
                            
                        </div>
                        {/* <div className="delete-icon">
                            <div  style={{ cursor: "pointer", color: "grey",marginTop:'23px' }}><Delete></Delete></div>
                        </div> */}
                        {/* <div className="btn-content1">
                            <Button variant="contained" className="btn-place1">Move to Cart</Button>
                        </div> */}
                    </div>
                        );
                    })}
                </div>
            </div>
            </>
        )
    }
}

export default connect(null, {cartCount})(WishList);