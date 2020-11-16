import React, { Component } from 'react';
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Navbar, Button, Nav} from 'react-bootstrap';
import axios from 'axios';
import {clearUser, getUser} from '../../ducks/reducer';
import './NNav.scss';

class NNav extends Component {
    logout = () =>{
        axios.get('/api/logout')
            .then(res => {
                this.props.clearUser();
                console.log(this.props.user);
                this.props.history.push('/')
            }
            )
            .catch(err => console.log(err))
    }

    //Make sure user is logged in
    componentDidMount(props){
        if(!this.props.user.id){
            axios.get('/api/session').then(res=>{
                if(!res.data.id)
                    this.props.history.push('/');
                else
                    getUser(res.data);
            }).catch(err=>{
                console.log(err);
            });
        }
    }
    
    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand>&#x1F48E; Hidden Gems</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="justify-content-end" style={{ width: "100%" }}>
                    <Nav.Link as={Link} to="/map" >&#128506; Map</Nav.Link>
                    <Nav.Link as={Link} to={"/user/"+ this.props.user.id} >&#128100; User</Nav.Link>
                    <Nav.Link as={Link} to={"/new"} >&#x1F48E; Add Gem</Nav.Link>
                    <Button size="sm" className='nav-button' onClick={this.logout}>Logout</Button>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
                    )
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, {clearUser, getUser})(withRouter(NNav))