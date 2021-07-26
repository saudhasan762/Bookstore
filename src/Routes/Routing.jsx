import { BrowserRouter , Redirect, Route, Switch } from 'react-router-dom';
import LoginMain from '../Pages/LoginMain.jsx/LoginMain'
import Dashboard from '../Pages/Dashboard/Dashboard';


const Routing = () => {
    return(
        <BrowserRouter>
        <div>
            <Switch>
                <Route exact path="/" >
                    <Redirect to="/Bookstore/Login"></Redirect>
                </Route>
                <Route path='/Bookstore' component={LoginMain}></Route>
                <Route path='/Dashboard' component={Dashboard}></Route>
            </Switch>
        </div>
        </BrowserRouter>
    )
}

export default Routing;