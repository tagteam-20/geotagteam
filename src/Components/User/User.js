import React, { Component } from 'react';
import axios from 'axios';
import { Accordion, Card, Button } from 'react-bootstrap';
import './User.scss'

class User extends Component {
    constructor() {
        super();
        this.state = {
            username: 'username',
            profilePic: 'https://via.placeholder.com/100',
            favorites: [{title: 'test', img: 'https://via.placeholder.com/100'}, {title: 'test1', img: 'https://via.placeholder.com/100'}]
        }
    }

    componentDidMount(){
        
    }

    render() {
        return (
            <div className='user' id='user-page'>
                <div className='profile-info'>
                    <img src={this.state.profilePic} />
                    <h4>{this.state.username}</h4>
                    <h4>Favorite/User Pins</h4>
                </div>
                {this.state.favorites.map(el => (
                    <Accordion >
                    <Card id='user-card'>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="outline-primary" eventKey="0">
                                {el.title}
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <div className='single-pin'>
                                <img src={el.img} />
                                <Button variant="outline-primary">See More</Button>
                            </div>
                        </Accordion.Collapse>
                    </Card>
                    </Accordion>
                ))}
            </div>
        )
    }
}

export default User;