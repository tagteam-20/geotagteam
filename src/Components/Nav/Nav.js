import React, { Component } from 'react';
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Navbar, Button} from 'react-bootstrap';

class Nav extends Component {
    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Link to='/map'>Features</Link>
                    <Link to='/user'>Pricing</Link>
                    <Button>Logout</Button>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
                    )
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(withRouter(Nav))