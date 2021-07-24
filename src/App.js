import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import store from "./Redux/Store/Store"
import Routing from "../src/Routes/Routing"

function App() {
  return (
    <>
    <Provider store={store}>
      <Routing />
    </Provider>
    </>
  );
}

export default App;
