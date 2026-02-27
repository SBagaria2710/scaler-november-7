import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CounterRedux from "./reduxComponents/CounterRedux";
import TodoRedux from "./reduxComponents/TodoRedux";
import User from './reduxComponents/UserRedux';
function App() {
  return (
      // <CounterRedux />
      <User />
  );
}

export default App;
