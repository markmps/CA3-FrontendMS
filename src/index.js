import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import renameMeFacade from "./reNameMeFacade";
import { BrowserRouter as Router } from "react-router-dom";

const AppWithRouter = () => {
  return (
    <Router>
      <App renameMeFacade={renameMeFacade} />
    </Router>
  );
};
ReactDOM.render(<AppWithRouter />, document.getElementById("root"));

