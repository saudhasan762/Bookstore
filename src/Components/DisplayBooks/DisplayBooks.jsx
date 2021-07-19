import { Component } from "react";
import './DisplayBooks.scss'
import BookServices from "../../Services/BookServices";
// import Pagination from "@material-ui/lab/Pagination";
import bookImg from "../../Assets/Image 11.png"
const service = new BookServices();

class DisplayBooks extends Component{
    constructor(props){
        super(props);
        this.state = ({
            books: [],
            postsPerPage: "12",
            currentPage: "1",
        })
    }

    componentDidMount(){
        this.getAllBooks();
    }

    getAllBooks = () => {
        var book = []
        service.getAllBooks().then((res)=> {
            console.log(res);
            book = res.data.result;
            console.log(book);
            this.setState({books: book})
            console.log(this.state.books);
        }).catch((err)=> {
            console.log(err);
        })
    }

    render(){
        const LastBook = this.state.currentPage * this.state.postsPerPage;
        const FirstBook = LastBook - this.state.postsPerPage;
        const currentBooks = this.state.books.slice(FirstBook, LastBook);
        return(
            <>
            <div className="usercontent">
                <div className="inlineheader">
                    <div className="headers">
                        Books<span>(128 Items)</span>
                    </div>
                    <div className="select">
                        <select className="dropbox-content">
                            <option selected>Sort by relevance</option>
                            <option>Price: high to low</option>
                            <option>Price: low to high</option>
                            <option>Sort By: (A-Z)</option>
                        </select>
                    </div>
                </div>
                <div className="books">

                    {currentBooks.map((book, index) => {
                        return(
                            <div className="showbooks"> 
                                <div className="bookimage">
                                    <img src={bookImg} alt=""></img>
                                </div>
                                <div className="content">
                                    <div className="bookname"><strong>{book.bookName}</strong></div>
                                    <div className="author">by {book.author}</div>
                                    <div className="rating">
                                       <div className="rate">4.5 &#9733;</div>
                                    </div>
                                    <div className="price"><strong>Rs.{book.price}</strong></div>
                                </div>
                            </div>
                        )
                    }) }

                </div>
            </div>
            </>
        )
    }
}

export default DisplayBooks;