import React, { Component } from 'react';
import axios from 'axios';
import {Container, Card, Button} from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
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
            avg-rating: 0,
            rating: 0
        }
        this.changeRating = this.changeRating.bind(this)
    }

    componentDidMount() {
        axios
        .get('/api/pin/' + this.props.match.params.id)
        .then(res => {
            this.setState(res.data)
        })
    }

    changeRating( newRating, name ) {
        this.setState({
          rating: newRating
        });
      }

    render() {
        return (
            <div id='gem-page'>
                <Container id='gem-container'>
                    <Card id='gem-card'>
                        <Card.Img src={this.state.img} id='gem-img'/>
                        <Card.Title id='pin-info'><span>{this.state.title}
                             &nbsp;@{this.state.author_username}</span>
                                <span id='star-span'>
                                <StarRatings
                                    rating={this.state.rating}
                                    starRatedColor="gold"
                                    //   changeRating={this.changeRating}
                                    numberOfStars={5}
                                    name='rating'
                                    starDimension='20'
                                    starSpacing='1px'
                                    starHoverColor='blue'
                                />
                                </span>
                        </Card.Title>
                        <Card.Text>{this.state.description}</Card.Text>                        
                    </Card>
                </Container>
            </div>
        )
    }
}

export default Gem;