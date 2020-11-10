import React, { Component } from 'react';
import Axios from 'axios';

class Auth extends Component {
    constructor(){
        super();
        this.state = {
            username: '',
            password: ''
        }
    }
    //function registers user
    registerUser = () =>{
        const {username,password} = this.state;
        Axios.post('/api/register',{username,password})
        .then(res =>{
            this.props.getUser(res.data)
            this.props.history.push('/map')
        })
    }

    //function updates state of input boxes on change
    handleInput = (event)  => {
        this.setState({[event.target.name]: event.target.value})
    }

    render() {
        console.log(this.state);
        return (
            <div>
                <input name='username' placeholder='username' onChange={this.handleInput}/>
                <input name='password'placeholder='password'onChange={this.handleInput}/> 
            </div>
        )
    }
}

export default Auth;
