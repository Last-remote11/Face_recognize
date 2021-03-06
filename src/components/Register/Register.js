import React from 'react'
import bcrypt from 'bcryptjs'

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            registerName: '',
            registerEmail: '',
            registerPassword: '',
        };
    }

    onNameChange = (event) => {
        this.setState({registerName: event.target.value});
    }
    
    onEmailChange = (event) => {
        this.setState({registerEmail: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({registerPassword: event.target.value});
    }

    onSubmitRegister = (event) => {
        event.preventDefault();
        fetch('http://localhost:3000/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.registerName,
                email: this.state.registerEmail,
                hash: bcrypt.hashSync(this.state.registerPassword, 10)
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                } else {
                  alert('응가')
                }
            })
    }
    

    render () {
        return (
      <article className="ph0 ma3 br2 ba dark-gray b--black-10 mv4 w-50-m w-30-l center shadow-3">
      <main className="pa4 black-80">
      <form className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend className="f1 fw6 ph0 mh0">Register</legend>
          <div className="mt3">
              <label className="db fw6 lh-copy f6" forhtml="name">name</label>
              <input onChange={this.onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" />
          </div>
          <div className="mt3">
              <label className="db fw6 lh-copy f6" forhtml="email-address">Email</label>
              <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
          </div>
          <div className="mv3">
              <label className="db fw6 lh-copy f6" forhtml="password">Password</label>
              <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
          </div>
          </fieldset>
          <div className="">
          <input 
          onClick={this.onSubmitRegister}
          className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
          type="submit" value="Register" />
          </div>
      </form>
      </main>  
      </article>
            )
    }

}

export default Register;