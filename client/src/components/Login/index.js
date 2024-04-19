import {Component} from 'react';
import axios from 'axios';
import "./index.css"

class Login extends Component {
    state = {
        username: "",
        password: "",
        isSubmitted: false,
        isPasswordError: false,
        validationMessage: ""
      }
    
      onEventUpdateUsername = (event) => {
        this.setState({ username: event.target.value });
      }
    
      onEventUpdatePassword = (event) => {
        this.setState({ password: event.target.value });
      }
    
      onFormSubmit = (event) => {
        event.preventDefault();
        const { username, password } = this.state;
    
        axios.post('http://localhost:3004/validatePassword', { username, password })
          .then(res => {
            if (res.data.validation) {
              this.setState({ validationMessage: 'Authentication Successful!', isSubmitted: true, username:"", password: "", isPasswordError: false });
            } else {
              this.setState({ validationMessage: "Wrong password. If you don't have an account, please register, otherwise check your password once.", isPasswordError: true, isSubmitted: false, username: "", password: "" });
            }
          })
          .catch(error => {
            console.error('Error:', error);
            this.setState({ validationMessage: "An error occurred. Please try again later.", isPasswordError: true, isSubmitted: false });
          });
      }
    
      render() {
        const { username, password, isSubmitted, isPasswordError, validationMessage } = this.state;
    
        return (
          <div className="login-container">
            <h1 className = "login-heading">Login</h1>
            <form className = "login-form-container" onSubmit={this.onFormSubmit}>
              <label className = "login-label" htmlFor = "username">Username</label>
              <input className = "login-input" id = "username" type="text" name="username" value={username} onChange={this.onEventUpdateUsername} />
              <label className = "login-label" htmlFor = "password">Password</label>
              <input className = "login-input" id = "password" type="password" name="password" value={password} onChange={this.onEventUpdatePassword} />
              <button className = "submit-button" type="submit">Submit</button>
              {isSubmitted && <p className = "result-success-message">{validationMessage}</p> }
            {isPasswordError && <p className = "result-failure-message">{validationMessage}</p>}
            </form>
            
          </div>
        );
      }
}

export default Login