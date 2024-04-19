import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import NotFound from "./components/NotFound";

import "./App.css";

const App = () => (
  <div className="App">
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<Register />} />
        <Route exact path="/not-found" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    ;
  </div>
);

//<Register />

// <NotFound />

export default App;
