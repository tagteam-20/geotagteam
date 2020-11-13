import React, { Component } from 'react';
import axios from 'axios';
import {Container, Card, Button, Form} from 'react-bootstrap';
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
            isEditing: false,
            comments: []
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

    postComment = (e) => {
        e.preventDefault();
        const {comment, rating} = this.state;
        
        axios
        .post('/api/comment/' + this.props.match.params.id, {comment, rating})
        .then((res) => {
            this.setState({comments: res.data})
            console.log(res.data)
        })
    }

    changeRating( newRating, name ) {
        this.setState({
          rating: newRating
        });
      }

    render() {
        console.log(this.state.comment)
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
                    <Card id='comment-form'>
                        <Form onSubmit={this.postComment}>
                            <Form.Row>
                                <Form.Group>
                                    <Form.Label>Post a comment</Form.Label>
                                    <Form.Control name='comment' value={this.state.comment} onChange={this.handleInput} id='comment-text' as='textarea' rows={4} cols={50}/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group>
                                    <Button type='submit'>Submit</Button>
                                </Form.Group>
                            </Form.Row>
                        </Form>
                    </Card>
                </Container>
            </div>
        )
    }
}

export default Gem;