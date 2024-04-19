// import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import Login from './components/Login';
import Register from './components/Register';
import NotFound from './components/NotFound';

import './App.css';

const App = () => (
  <div className = "App"> 
    <Register />     
  </div>
)


// <Login/>

// <NotFound />

// <BrowserRouter>
//       <Switch>
//         <Route exact path="/login" component={Login} />
//         <Route exact path="/register" component={Register} />
//         <Route exact path="/not-found" component={NotFound} />
//         <Redirect to="/not-found" />
//       </Switch>
//     </BrowserRouter>

export default App