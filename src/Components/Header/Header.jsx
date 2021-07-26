import { Component } from "react";
import { Link } from "react-router-dom";
import book from "../../Assets/book.svg"
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import StyledBadge from '@material-ui/core/Badge'
import Profile from "../Profile/Profile"
import './Header.scss'
import { searchBook } from "../../Redux/Actions/ActionType";
import { connect } from "react-redux";
import BookServices from "../../Services/BookServices";
const service = new BookServices();

const mapStateToProps = (state) => {
    console.log(state.cartCount.count);
    return{
        count: state.cartCount.count
    }
}

class Header extends Component {
    constructor(props) {
        super(props);
        this.state={
            search: "",
            length: ""
        }
    }

    handleChange = (e, value) => {
        console.log(value);
        this.setState({search: value});
        this.props.handleSearchBook(value, true);
        this.props.searchBook(value);
    }

    componentDidMount(){
        this.getCartLength();
    }

    getCartLength = () => {
        service.getCartItems().then((res) => {
            this.setState({length: res.data.result.length});
            console.log(this.state.length);
        })
    }

    render() {
        return (
            <>
                <div className="appbar">
                    <div>
                        <Link to="/Dashboard/DisplayBooks"><img src={book} alt=""></img></Link>
                        <p className="book"><Link to="/Dashboard/DisplayBooks" style={{ listStyleType: "none", color: 'white', textDecoration: 'none' }}>Bookstore</Link></p>
                        <div className="input">
                            <SearchOutlinedIcon className="searchicon" />
                            <input type="text" placeholder="Search" onChange={(e) => this.handleChange(e, e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <div className="pro">
                            {/* <PermIdentityIcon className="proicon"/>Profile */}
                            <Profile />Profile
                        </div>
                        <div className="cart">
                            <StyledBadge badgeContent={this.props.count} color="white">
                            <Link to="/Dashboard/Cart">
                                <ShoppingCartOutlinedIcon className="carticon" />
                            </Link>
                            </StyledBadge>
                            Cart
                           
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default connect(mapStateToProps, {searchBook})(Header);