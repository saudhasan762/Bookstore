import { BrowserRouter , Route, Switch } from 'react-router-dom';
import LoginMain from '../Pages/LoginMain.jsx/LoginMain'
import Dashboard from '../Pages/Dashboard/Dashboard';


const Routing = () => {
    return(
        <BrowserRouter>
        <div>
            <Switch>
                <Route path='/Main' component={LoginMain}></Route>
                <Route exact path='/Dashboard' component={Dashboard}></Route>
            </Switch>
        </div>
        </BrowserRouter>
    )
}

export default Routing;