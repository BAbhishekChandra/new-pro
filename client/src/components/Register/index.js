import { Component } from 'react';
import axios from 'axios';
import "./index.css";

class Register extends Component {
    state = { username: '', email: '', password: '', confirmPassword: '', phoneNumber: '', isValidated: false, validationMessage: ""}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }  

  onChangeEmail = event => {
    this.setState({email: event.target.value})
  }

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  }

  onChangeConfirmPassword = (event) => {
    this.setState({ confirmPassword: event.target.value });
  }

  onChangePhoneNumber = (event) => {
    this.setState({ phoneNumber: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, email, password, confirmPassword, phoneNumber} = this.state;

    console.log(username, email, password, confirmPassword, phoneNumber);

    // // Check if there are any errors before submitting
    // if (username && email && password && confirmPassword && phoneNumber && (password === confirmPassword)) {
    //   // Perform registration logic here
    //   console.log('Registration successful');
    // } else {
    //   console.log('Registration failed, please correct the errors');
    // }

    if (username.length > 0) {
      if (email.endsWith('@gmail.com')) {
        if (password.length >= 4 && confirmPassword.length >= 4 && (password === confirmPassword)) {
          if (phoneNumber.length === 10) {
            // console.log("Registration Successful");
            axios.post('http://localhost:3004/registerUser', { username, email, password, phoneNumber })
            .then(res => {
                if (res.data.validation) {
                    this.setState({ validationMessage: 'Registration Successful!', isValidated: true });
                } else {
                    this.setState({ validationMessage: 'Registration failed. Please try again later.', isValidated: true });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                this.setState({ validationMessage: 'An error occurred. Please try again later.', isValidated: true });
            });
    
            }
          else {
            alert("Enter Correct Phone Number with 10 digits");
           // console.log("Enter Correct Phone Number with 10 digits");
          }
        }
        else {
          alert("Enter Password same and greater than or equal to 4 characters");
          // console.log("Enter Password same and greater than or equal to 4 characters");
        }
      }
      else {
        alert("Enter Correct Email");
        // console.log("Enter Correct Email");
      }
    }
    else {
      alert("Enter Correct UserName");
      // console.log("Enter Correct UserName");
    }
  };

  render() {
    const { username, email, password, confirmPassword, phoneNumber, isValidated, validationMessage } = this.state;

    return (
      <div className = "register-container">
        <h1 className = "register-heading">Register</h1>
        <form className  = "register-form-container" onSubmit={this.handleSubmit}>
            <label className = "register-label">Username:</label>
            <input className = "register-input"
              type="text"
              name="username"
              value={username}
              onChange={this.onChangeUsername}
            />
            <label className = "register-label">Email:</label>
            <input className = "register-input"
              type="text"
              name="email"
              value={email}
              onChange={this.onChangeEmail}
            />
            <label className = "register-label">Password:</label>
            <input className = "register-input"
              type="password"
              name="password"
              value={password}
              onChange={this.onChangePassword}
            />
        
            <label className = "register-label">Confirm Password:</label>
            <input className = "register-input"
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={this.onChangeConfirmPassword}
            />
          
            <label className = "register-label">Phone Number:</label>
            <input className = "register-input"
              type="text"
              name="phoneNumber"
              value={phoneNumber}
              onChange={this.onChangePhoneNumber}
            />
            <button className = "submit-button" type="submit">Register</button>
            {isValidated ? (validationMessage) : null}
        </form>
      </div>
    );
  }
}

export default Register;
