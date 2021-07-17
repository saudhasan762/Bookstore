import { BrowserRouter , Route, Switch } from 'react-router-dom';
import LoginMain from '../Pages/LoginMain.jsx/LoginMain'


const Routing = () => {
    return(
        <BrowserRouter>
        <div>
            <Switch>
                <Route path='/' component={LoginMain}></Route>
            </Switch>
        </div>
        </BrowserRouter>
    )
}

export default Routing;