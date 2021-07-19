import React from "react";
import Header from "../../Components/Header/Header"
import Footer from "../../Components/Footer/Footer";
import DisplayBooks from "../../Components/DisplayBooks/DisplayBooks";
import { Route } from "react-router-dom";

class Dashboard extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <Header />
                <DisplayBooks />
                <Footer />
            </div>
        )
    }
}

export default Dashboard;