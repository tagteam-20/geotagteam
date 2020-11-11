import React, { Component } from 'react';
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Navbar, Button, Nav} from 'react-bootstrap';
import axios from 'axios';
import {clearUser} from '../../ducks/reducer';
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
    
    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand>&#x1F48E; Hidden Gems</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav>
                    <Link href='/#/map'>Map</Link>
                    <Link to='/#/user'>User</Link>
                    <Button onClick={this.logout}>Logout</Button>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
                    )
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, {clearUser})(withRouter(NNav))