import { Component } from "react";
import book from "../../Assets/bookbig.png"
import "./BookDetails.scss"
import {connect} from 'react-redux'


const mapStateToProps = (state) => {
    console.log(state.bookDetails.content);
    return{
        selectedBook: state.bookDetails.content
    }
}

class BookDetails extends Component {
    constructor(props) {
        super(props);
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

                            {/* {this.bookInBag(this.props.selectedBook._id) ? */}
                                {/* <div className="addOrRemove">
                                    <button className="addedtobag">ADDED TO BAG</button>
                                </div> */}
                                {/* : */}
                               
                                <button className="addtobag" onClick={() => this.addedtoCart(this.props.selectedBook)}
                                >ADD TO BAG
                                </button>
                               
                                
                                <button className="wish">WISHLIST</button>
                                
                                
                                

                            {/* } */}
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

export default connect(mapStateToProps)(BookDetails);