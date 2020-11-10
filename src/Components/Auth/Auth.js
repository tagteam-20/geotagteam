import React, { Component } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import { getUser } from '../../ducks/reducer';
import RegisterForm from '../RegisterForm/RegisterForm';
import {Card, Button} from 'react-bootstrap';
import './Auth.scss';

class Auth extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            registerToggle: 0
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

    registerView = () => {
        this.setState({ registerToggle: this.state.registerToggle + 1 })
    }
    //function updates state of input boxes on change
    handleInput = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        console.log(this.state);
        return (
            <div className='auth-main'>
                {this.state.registerToggle === 0 ?
                    // <div>
                    //     <input name='username' placeholder='username' onChange={this.handleInput} />
                    //     <input name='password' placeholder='password' type='password' onChange={this.handleInput} />
                    //     <div>
                    //         <button onClick={this.loginUser}>Login</button>
                    //         <button onClick={this.registerView}>Register</button>
                    //     </div>
                    // </div> 
                    <Card border='dark' style={{ width: '18rem' }} className='auth-box'>
                        <Card.Body className='auth-box-body'>
                            <input name='username' placeholder='username' onChange={this.handleInput} />
                            <input name='password' placeholder='password' type='password' onChange={this.handleInput} />
                            <div className='auth-buttons'>
                                <Button variant="primary" onClick={this.loginUser}>Login</Button>
                                <Button variant="primary" onClick={this.registerView}>Register</Button>
                            </div>
                        </Card.Body>
                    </Card>
                    : <RegisterForm />}
            </div>


        )
    }
}
const mapMyStateToProps = reduxState => reduxState;
export default connect(mapMyStateToProps, { getUser })(Auth);

