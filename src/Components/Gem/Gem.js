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
            comment: '',
            title: '',
            author_id: 0,
            author_username: '',
            author_profile_pic: '',
            avg_rating: 0,
            rating: 0,
            isEditing: false
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

    handleToggle = () => {
        this.setState({
            isEditing: !this.state.isEditing
        })
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    postComment = () => {
        const {comment, rating} = this.state;

        axios
        .post('/api/comment/' + this.props.match.params.id)
        .then(() => {
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