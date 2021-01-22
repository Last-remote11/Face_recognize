import React from 'react'

class SignIn extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        };
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value});
    }

    onSubmitSignIn = (event) => {
        // form 의 경우 기본적으로 아무일도 없으면 새로고침하는데
        // 이것을 방지해주기 위해 preventDefault()를 써야함
        event.preventDefault()
        fetch('https://stark-ridge-55839.herokuapp.com/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data !== '로그인 실패') {
                this.props.loadUser(data);
                this.props.onRouteChange('home');
            } else {
                alert("로그인에 실패하였습니다. 이메일과 패스워드를 확인해주세요")
            }
        })
        
    }

    render() {
        const { onRouteChange } = this.props;
        return (
            <article className="ph0 ma3 br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-30-l center shadow-3">
            <main className="pa4 black-80">
            <form className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 mh0">Sign In</legend>
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
                onClick={this.onSubmitSignIn}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                type="submit" value="Sign in" />
                </div>
                <div className="lh-copy mt3">
                <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
                </div>
            </form>
            </main>  
            </article>
            )
    }


}

export default SignIn;