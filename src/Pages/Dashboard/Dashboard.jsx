import React from "react";
import Header from "../../Components/Header/Header"
import Footer from "../../Components/Footer/Footer";

class Dashboard extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
            <Header />
            <Footer />
            </div>
        )
    }
}

export default Dashboard;