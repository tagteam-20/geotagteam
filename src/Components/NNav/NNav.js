import React, { Component } from 'react';
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Navbar, Button, Nav} from 'react-bootstrap';
import axios from 'axios';

class NNav extends Component {
    logout = () =>{
        axios.get('/api/logout')
            .then(

            )
            .catch(err => console.log(err))
    }
    
    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand>&#x1F48E; Hidden Gems</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Link to='/map'>Map</Link>
                    <Link to='/user'>User</Link>
                    <Button onClick={this.logout}>Logout</Button>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
                    )
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(withRouter(NNav))