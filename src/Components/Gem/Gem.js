import React, { Component } from 'react';
import axios from 'axios';
import {Container, Card, Button} from 'react-bootstrap';
import './Gem.scss';

class Gem extends Component {
    constructor() {
        super();
        this.state = {
            img: '',
            description: '',
            title: '',
            author_id: 0,
            author_username: '',
            author_profile_pic: '',
        }
    }

    componentDidMount() {
        axios
        .get('/api/pin/' + this.props.match.params.id)
        .then(res => {
            this.setState(res.data)
        })
    }

    render() {
        return (
            <div id='gem-page'>
                <Container id='gem-container'>
                    <Card id='gem-card'>
                        <Card.Img src={this.state.img} id='gem-img'/>
                        <Card.Title>{this.state.title}<span> @{this.state.author_username}</span></Card.Title>
                        <Card.Text>{this.state.description}</Card.Text>                        
                    </Card>
                </Container>
            </div>
        )
    }
}

export default Gem;