import React, { Component } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import { getUser } from '../../ducks/reducer';
import RegisterForm from '../RegisterForm/RegisterForm';
import {Card, Button, Alert, Form} from 'react-bootstrap';
import './Auth.scss';

class Auth extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            registerToggle: false,
            error: {
                bool: false,
                message: ''
            }
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
    loginUser = (e) => {
        const { username, password } = this.state;
        e.preventDefault();
        Axios.post('/api/login', { username, password })
            .then(res => {
                this.props.getUser(res.data)
                this.props.history.push('/map')
            }).catch(err=>{
                this.setError(err.response.data);
            })
    }


    toggleView = () => {
        this.setState({registerToggle: !this.state.registerToggle})
        //console.log(this.state.registerToggle)
    }
    //function updates state of input boxes on change
    handleInput = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    setError = (errMessage)=>{
        this.setState({
            error: {
                bool: true,
                message: errMessage
            }
        })
    }

    render() {
        //console.log(this.state);
        return (
            <div className='auth-main'>
                {this.state.error.bool ? <Alert variant='danger' className='errorBox'>
                                            <Alert.Heading>Error:</Alert.Heading>
                                            <p>{this.state.error.message}</p>
                                        </Alert> : 
                null}
                {!this.state.registerToggle ?
                    // <div>
                    //     <input name='username' placeholder='username' onChange={this.handleInput} />
                    //     <input name='password' placeholder='password' type='password' onChange={this.handleInput} />
                    //     <div>
                    //         <button onClick={this.loginUser}>Login</button>
                    //         <button onClick={this.registerView}>Register</button>
                    //     </div>
                    // </div> 
                    <Card border='dark' style={{ width: '18rem' }}  id='trans-background' className='auth-box'>
                        <Form onSubmit={this.loginUser}>
                        <Card.Header>Login</Card.Header>
                            <Card.Body className='auth-box-body'>
                                <Form.Group id='username-inp'>
                                    <Form.Label htmlFor='username'>Username:</Form.Label>
                                    <Form.Control type='text' name='username' placeholder='Username' value={this.state.username} onChange={this.handleInput} className='auth-input'/> 
                                </Form.Group>
                                <Form.Group id='password-inp'>
                                    <Form.Label htmlFor='password' >Password: </Form.Label>
                                    <Form.Control name='password' type='password' placeholder='Password' value={this.state.password} onChange={this.handleInput} className='auth-input'/>
                                </Form.Group> 
                                <div className='auth-buttons'>
                                    <Button type='submit' variant="outline-primary">Login</Button>
                                    <Button variant="outline-primary" onClick={this.toggleView}>Register</Button>
                                </div>
                            </Card.Body>
                        </Form>
                    </Card>
                    : <RegisterForm setError={this.setError} toggleView={this.toggleView}/>}
            </div>


        )
    }
}
const mapMyStateToProps = reduxState => reduxState;
export default connect(mapMyStateToProps, { getUser })(Auth);

