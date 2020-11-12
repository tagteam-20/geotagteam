import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { Accordion, Card, Button, Container } from 'react-bootstrap';
import './User.scss'

class User extends Component {
    constructor() {
        super();
        this.state = {
            username: 'username',
            profilePic: 'https://via.placeholder.com/100',
            favorites: []
        }
    }

    componentDidMount(){
        axios.get('/api/user/'+ this.props.match.params.id)
            .then(res => {
                console.log(res.data)
                this.setState({username: res.data.username, profilePic: res.data.profile_pic})
            })
            .catch(err => console.log(err))
        axios.get('/api/favorites/'+ this.props.match.params.id)
            .then(res => {
                this.setState({favorites: res.data})
                console.log(this.state.favorites)
            })
    }

    render() {
        return (
            <div className='user' id='user-page'>
                <Container id='user-container'>
                <div className='profile-info'>
                    <img src={this.state.profilePic} id='profile-pic' />
                    <h4>{this.state.username}</h4>
                    <h4>Favorite/User Pins</h4>
                </div>
                {this.state.favorites.map((el, i) => (
                    <Accordion key={i}>
                    <Card id='user-card'>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="outline-primary" eventKey="0">
                                {el.title}
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <div className='single-pin'>
                                <img src={el.img} id='gem-pics' />
                                {console.log(el.id)}
                                <Link to={'/gem/'+ el.id}><Button variant="outline-primary">See More</Button></Link>
                            </div>
                        </Accordion.Collapse>
                    </Card>
                    </Accordion>
                ))}
                </Container>
            </div>
        )
    }
}

export default User;