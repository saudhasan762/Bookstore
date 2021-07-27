import { Component } from "react";
import book from "../../Assets/bookbig.png"
import "./BookDetails.scss"
import {connect} from 'react-redux'
import BookServices from "../../Services/BookServices";
import { withRouter } from "react-router-dom";
import { cartCount } from "../../Redux/Actions/ActionType";
const service  = new BookServices();


const mapStateToProps = (state) => {
    console.log(state.bookDetails.detail);
    return{
        selectedBook: state.bookDetails.detail
    }
}

class BookDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartBooks: [],
            storedetails: {},
            wishBooks: []
        }
    }

    componentDidMount(){
        this.getcart();
        this.getWishlist();
    }

    store = () => {
        this.setState({storedetails: this.props.selectedBook})
        console.log(this.state.storedetails);
    }

    getWishlist = () => {
        service.getWishList().then((res)=> {
            this.setState({wishBooks: res.data.result})
        })
    }

    addtoCart = (value) => {
        let data = {
            isCart: true
        }
        let token = localStorage.getItem('Token');
        // console.log(data, value._id, token);
        service.addToCart(data, value._id, token).then((res)=>{
            console.log(res);
            this.props.history.push("/Dashboard/BookDetails");
            this.removeFromWish(value._id);
            this.getcart();
        })
        .catch((err)=>{
            console.log(err);
        })  
    }

    removeFromWish = (id) => {
        service.removeFromWishList(id).then((res)=>{
            console.log(res);
        })
    }

    addtoWishlist = (value) => {
        service.addToWishList(value._id).then((res)=> {
            console.log(res);
            this.props.history.push("/Dashboard/BookDetails");
        })
        .catch((err)=> {
            console.log(err);
        })
    }

    getcart = () => {
        service.getCartItems().then((res) => {
            this.setState({cartBooks: res.data.result})
            this.props.cartCount(res.data.result.length);
        })
    }

    bookInbag = (id) => {
        let result = this.state.cartBooks.find(function(value) {
            if(value.product_id._id === id){
                return true;
            }
            else{
                return false;
            }
        })
        return result;
    }

    bookInWish= (id) => {
        let result = this.state.wishBooks.find(function(value) {
            if(value.product_id._id === id){
                return true;
            }
            else{
                return false;
            }
        })
        return result;
    }

    render() {
        return (
            <>
                <div className="mainContainer">
                    <div className="container">
                        <div className="imgs-container">
                            <div className="twoimg-comtainer">
                                <div className="imgsmall1">
                                    <img src={book} className="mediumimg" alt="" />
                                </div>
                                <div className="image2">
                                    <img src={book} className="mediumimg" alt="" />
                                </div>
                            </div>
                            <div className="mainimg">
                                <img src={book} className="bigimg" alt="" />
                            </div>
                        </div>
                        <div className="wishlist">

                            {this.bookInbag(this.props.selectedBook._id) ?
                                <div className="addOrRemove">
                                    <button className="addedtobag">ADDED TO BAG</button>
                                </div>
                                : <>
                               <div style={{width: "65%",paddingLeft: "5%"}}>
                                    <button  className="addtobag" onClick={() => this.addtoCart(this.props.selectedBook)}>ADD TO BAG</button>
                               </div>
                               {this.bookInWish(this.props.selectedBook._id) ? 
                               <div style={{width: "65%",paddingLeft: "5%"}}><button className="wish">ADDED TO WISHLIST</button></div> : 
                               <div style={{width: "65%",paddingLeft: "5%"}}><button className="wish" onClick={() => this.addtoWishlist(this.props.selectedBook)}>WISHLIST</button></div>} </>
                            } 
                        </div>
                    </div>

                    <div className="details">
                        <div className="bookdetail">
                            <div className="cardcontainer">
                                <div className="title">
                                    {this.props.selectedBook.bookName}
                                </div>
                                <div className="author">
                                    <span className="byauthor">by</span>
                                    <span className="authorname">
                                        {this.props.selectedBook.author}
                                    </span>
                                </div>
                                <div className="card-rating">
                                    <div className="star">
                                        <div className="number"> 4.5 &#9733;</div>
                                        <div className="rating-star">
                                            <i class="zmdi zmdi-star"></i>
                                        </div>
                                    </div>

                                    <span style={{ color: "grey", marginLeft: "8px" }}>(20)</span>
                                </div>
                                <div className="card-price">
                                    <span className="discount-price">
                                      Rs.{this.props.selectedBook.price}
                                    </span>
                                    <span className="price">
                                        <strike>
                                        4000
                                        </strike>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="horizoantalline">
                            <hr></hr>
                        </div>
                        <div className="desc-book">
                            <div className="desc-title">
                                <span className="dot"></span>
                                <span>Book Detail</span>
                            </div>
                            <div className="lorem">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis
                                assumenda minus libero minima ad, optio recusandae! Laboriosam
                                velit, labore nulla minima vel magni accusamus unde ratione
                                nostrum rerum! Voluptas asperiores ratione tempora magni atque
                                sunt doloribus velit molestias! Commodi blanditiis hic sunt illo
                                cum libero repellat voluptates quia sapiente quos.
                            </div>
                        </div>

                        <div className="horizoantalline">
                            {" "}
                            <hr></hr>
                        </div>
                        {/* <div className="customer-feedback-container-">
              <span className="feedback">Customer Feedback</span>
              <CustomerFeedback />
            </div> */}
                        <div className="reviews">

                        </div>
                    </div>
                </div>
            </>
        )
    }

}

export default withRouter (connect(mapStateToProps,{cartCount})(BookDetails));