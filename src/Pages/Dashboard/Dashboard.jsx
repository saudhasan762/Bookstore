import React from "react";
import Header from "../../Components/Header/Header"
import Footer from "../../Components/Footer/Footer";
import DisplayBooks from "../../Components/DisplayBooks/DisplayBooks";
import BookDetails from "../../Components/BookDetails/BookDetails";
import OrderSucess from "../../Components/OrderSuccess/OrderSuccess";
import Cart from "../../Components/Cart/Cart"
import { Route } from "react-router-dom";
import BookServices from "../../Services/BookServices";
const service = new BookServices();

class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            search: "",
            showBooks: [],
            searchedData: [],
            searchBook: false,
            length: ""
        }
    }

    componentDidMount(){
        this.getCartLength();
    }

    getBook = (books) => {
        console.log(books);
        this.setState({showBooks: books})
    }

    handleSearchBook = (value, status) => {
        console.log(value);
        this.setState({searchBook: status})
        this.setState({search: value});
        this.filterSearchBooks(value);
    }

    filterSearchBooks = (value) => {
        console.log(value);
        console.log(this.state.showBooks);
        var array = []
        this.state.showBooks.filter(data => data.bookName.toLowerCase().includes(value.toLowerCase()) || data.author.toLowerCase().includes(value.toLowerCase())).map((searchedData)=>{
            array.push(searchedData);
            
        })
        this.setState({searchedData: array})
        console.log(array);
    }

    getCartLength = () => {
        service.getCartItems().then((res) => {
            this.setState({length: res.data.result.length});
            console.log(this.state.length);
        })
    }

    render(){
        return(
            <div>
                <Header handleSearchBook={this.handleSearchBook} cartlength={this.state.length}/>
                <Route exact path="/Dashboard/DisplayBooks">
                <DisplayBooks searchedData={this.state.searchedData} getBook={this.getBook} search={this.state.search} searchBook={this.state.searchBook}/>
                </Route>
                <Route exact path="/Dashboard/BookDetails">
                    <BookDetails />
                </Route>
                <Route exact path="/Dashboard/Cart"><Cart /></Route>
                <Route exact path="/Dashboard/OrderSuccess"><OrderSucess /></Route>
                <Footer />
            </div>
        )
    }
}

export default Dashboard;