import React, { Component } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';

class Auth extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        }
    }
    //function registers user
    registerUser = () => {
        const { username, password } = this.state;
        Axios.post('/api/register', { username, password })
            .then(res => {
                this.props.getUser(res.data)
                this.props.history.push('/map')
            })
    }

    loginUser = () => {
        const { username, password } = this.state;
        Axios.post('/api/login', { username, password })
            .then(res => {
                this.props.getUser(res.data)
                this.props.history.push('/map')
            })
    }

    //function updates state of input boxes on change
    handleInput = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        console.log(this.state);
        return (
            <div>
                <input name='username' placeholder='username' onChange={this.handleInput} />
                <input name='password' placeholder='password' onChange={this.handleInput} />
                <div>
                    <button>Login</button>
                    <button>Register</button>
                </div>
            </div>

        )
    }
}
// const mapMyStateToProps = reduxState => reduxState;
// export default connect(mapMyStateToProps)(Auth);
export default Auth;
