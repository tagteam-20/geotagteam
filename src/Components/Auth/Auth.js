import React, { Component } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import {getUser} from '../../ducks/reducer';
import RegisterForm from '../RegisterForm/RegisterForm';


class Auth extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            registerToggle: false
        }
    }
    //function registers user
    // registerUser = () => {
    //     const { username, password } = this.state;
    //     Axios.post('/api/register', { username, password })
    //         .then(res => {
    //             this.props.getUser(res.data)
    //             this.props.history.push('/map')
    //         })
    // }
    
    //login function
    loginUser = () => {
        const { username, password } = this.state;
        Axios.post('/api/login', { username, password })
            .then(res => {
                this.props.getUser(res.data)
                this.props.history.push('/map')
            })
    }

    toggleView = () => {
        this.setState({registerToggle: !this.state.registerToggle})
        console.log(this.state.registerToggle)
    }
    //function updates state of input boxes on change
    handleInput = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        console.log(this.state);
        return (
            <div>
                {this.state.registerToggle === false? <div>
                    <input name='username' placeholder='username' onChange={this.handleInput} />
                    <input name='password' placeholder='password' type='password' onChange={this.handleInput} />
                    <div>
                        <button onClick={this.loginUser}>Login</button>
                        <button onClick={this.toggleView}>Register</button>
                    </div>
                </div> : <RegisterForm toggleView={this.toggleView}/>}
            </div>
            

        )
    }
}
const mapMyStateToProps = reduxState => reduxState;
export default connect(mapMyStateToProps,{getUser})(Auth);

