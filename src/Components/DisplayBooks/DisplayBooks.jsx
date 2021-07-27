import { Component } from "react";
import './DisplayBooks.scss'
import BookServices from "../../Services/BookServices";
import PaginationBar from "../Pagination/PaginationBar";
import bookImg from "../../Assets/Image 11.png"
import { withRouter } from "react-router-dom";
import {connect} from "react-redux"
import { bookselect } from "../../Redux/Actions/ActionType";
import { getBooks } from "../../Redux/Actions/ActionType";

const service = new BookServices();

const mapStateToProps = (state) => {
    console.log(state.getBooks.books);
    return{
        Books: state.getBooks.books,
    }
}

class DisplayBooks extends Component{
    constructor(props){
        super(props);
        this.state = ({
            books: [],
            postsPerPage: "8",
            currentPage: "1",
        })
    }
    

    componentDidMount(){
        this.getAllBooks();
    }

    
    getAllBooks = () => {
        // this.props.getBooks();
        var book = []
        service.getAllBooks().then((res)=> {
            console.log(res);
            book = res.data.result;
            console.log(book);
            this.setState({books: book})
            console.log(this.state.books);
            this.props.getBook(book);
            this.props.getBooks(book);
        }).catch((err)=> {
            console.log(err);
        })
    }

    getBooks = () => {
        return this.state.books;
    }

    changepage = (e, newpage) => {      
        console.log(e.target.value);
        this.setState({ currentPage: newpage });
    };

    sort = (e) => {
        let sortedBooks = [...this.state.books].sort(function(a,b){
            return b.price - a.price;
        })
        if(e.target.value === "descending"){
            this.setState({books : sortedBooks})
        } else if(e.target.value === "ascending") {
            this.setState({books: sortedBooks.reverse()})
        } else if (e.target.value === "alphabets"){
            let data = [...this.state.books].sort(function(a,b){
                if(a.bookName > b.bookName){
                    return -1;
                }
                return 0;
            })
            this.setState({books: data.reverse()})
        } 
        else{
            this.getAllBooks();
        }
    }

    search = () => {
        console.log(this.props.searchedData);
        if(this.props.searchedData != null){
            this.setState({books: this.props.searchedData});
        }
    }

    bookdetails = (e, value) => {
        console.log("inside book details");
        console.log(value);
        this.props.bookselect(value);
        this.props.history.push("/Dashboard/BookDetails");
    }

    render(){
        // console.log(this.props.searchedData);
        const LastBook = this.state.currentPage * this.state.postsPerPage;
        const FirstBook = LastBook - this.state.postsPerPage;
        const currentBooks = this.props.searchBook ? this.props.searchedData.slice(FirstBook, LastBook) : this.state.books.slice(FirstBook, LastBook);
        return(
            <>
            <div className="usercontent">
                <div className="inlineheader">
                    <div className="headers">
                        Books<span>({this.props.searchBook ? this.props.searchedData.length : this.state.books.length} Items)</span>
                    </div>
                    <div className="select">
                        <select className="dropbox-content" onChange={(e) => this.sort(e)}>
                            <option value="sbr" selected>Sort by relevance</option>
                            <option value="descending">Price: high to low</option>
                            <option value="ascending">Price: low to high</option>
                            <option value="alphabets">Sort By: (A-Z)</option>
                        </select>
                    </div>
                </div>
                <div className="books">

                    {currentBooks.map((book, index) => {
                        return(
                            <div className="showbooks" onClick={(e) => this.bookdetails(e,book)}> 
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
            <PaginationBar books={this.state.books}
            postsPerPage={this.state.postsPerPage}
            currentPage={this.state.currentPage}
            changepage={this.changepage}></PaginationBar>
            </>
        )
    }
}

export default connect(mapStateToProps, {bookselect,getBooks})(withRouter (DisplayBooks));