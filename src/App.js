import './App.css';
import { Login, Register, Profile } from './components/index';
import axios from "axios";
import {Container, } from '@material-ui/core';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
    <div className="App">
            {/* Nav */}
            {/* <Login /> */}
            {/* <Register /> */}
            <Profile />
            {/* Profile
                  - ImageInput
                  - ImageDisplay
                  - ImageHistory
            */}
    </div>
  );
}

export default App;
