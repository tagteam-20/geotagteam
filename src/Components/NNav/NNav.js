import React, { Component } from 'react';
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Navbar, Button, Nav} from 'react-bootstrap';

class NNav extends Component {
    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand>&#x1F48E; Hidden Gems</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Link to='/map'>Map</Link>
                    <Link to='/user'>User</Link>
                    <Button>Logout</Button>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
                    )
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(withRouter(NNav))