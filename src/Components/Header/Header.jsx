import { Component } from "react";
import { Link } from "react-router-dom";
import book from "../../Assets/book.svg"
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import './Header.scss'

export default class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <div className="appbar">
                    <div>
                        <Link><img src={book} alt=""></img></Link>
                        <p className="book"><Link style={{ listStyleType: "none", color: 'white', textDecoration: 'none' }}>Bookstore</Link></p>
                        <div className="input">
                            <SearchOutlinedIcon className="searchicon" />
                            <input type="text" placeholder="Search" onChange={(e) => this.handleChange(e, e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <div className="pro">
                            <PermIdentityIcon className="proicon"/>Profile
                        </div>
                        <div className="cart">
                            <ShoppingCartOutlinedIcon className="carticon" />Cart
                        </div>
                    </div>
                </div>
            </>
        )
    }
}