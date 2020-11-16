import React, { Component } from 'react';
import axios from 'axios';
import { Container, Card, Button, Form } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import './Gem.scss';
import {connect} from 'react-redux';

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

    getComments = ()=>{
        axios.get('/api/comments/' + this.props.match.params.id)
            .then((res) => {
                this.setState({ comments: res.data, comment: '', rating: 0 })
                console.log(res.data)
                let count = 0;
                const total = res.data.reduce((acc,value)=>{
                    if(value.rating){
                        count++
                    }
                    return acc+(+value.rating);
                },0);
                console.log('total: '+total);
                console.log('Gem rating: '+total/count)
                this.setState({avg_rating: (total/count)});
            }).catch(err=>{
                console.log(err);
            })
        
    }

    componentDidMount() {
        axios
            .get('/api/pin/' + this.props.match.params.id)
            .then(res => {
                this.setState(res.data)
            })
        this.getComments();
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
        const { comment, rating } = this.state;

        axios
            .post('/api/comment/' + this.props.match.params.id, { comment, rating })
            .then((res) => {
                this.setState({ comments: res.data, comment: '', rating: 0 })
                this.getComments();
            })
    }

    changeRating(newRating, name) {
        this.setState({
            rating: newRating
        });
    }

    deleteComment = (id)=>{
        axios.delete(`/api/comment/${id}`)
            .then(res=>{
                this.getComments();
            }).catch(err=>{
                console.log(err);
            });
    }
    
    render() {
        console.log(this.state.comment);
        let totalRating = 0;
        

        const mappedComments = this.state.comments.map((comment, ind) => {
            return <Card key={ind} className='comment-display' style={{background: "rgba(25,25,25,0.5)"}}>
                <div className='comment-header'>
                        <Card.Title><img src ={comment.profile_pic} className='comment-img'/> @{comment.username} </Card.Title>
                        <span>
                        <StarRatings className='comment-stars'
                                    rating={+comment.rating}
                                    starRatedColor="gold"
                                    numberOfStars={5}
                                    name='rating'
                                    starDimension='20'
                                    starSpacing='1px'
                                    starHoverColor='blue'
                                />
                        {comment.comment_user_id === this.props.user.id ? 
                            <button type='button' class='close' aria-label='Close' onClick={e=>this.deleteComment(comment.id)}>
                                <span aria-hidden='true'>&times;</span>
                            </button> : null}
                        </span>
                </div>
                        <Card.Text>{comment.comment}</Card.Text>
                   </Card>
        });
        
        return (
            <div id='gem-page'>
                <Container id='gem-container'>
                    <Card id='gem-card'>
                        <Card.Img src={this.state.img} id='gem-img' />
                        <Card.Title id='pin-info'><span>{this.state.title}
                             &nbsp;@{this.state.author_username}</span>
                            <span className='star-span'>
                                <StarRatings
                                    rating={this.state.avg_rating}
                                    starRatedColor="gold"
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
                                    <Form.Label id='form-label'><span>Post a comment</span>
                                        <span className='star-span'>
                                            <StarRatings
                                                rating={this.state.rating}
                                                starRatedColor="gold"
                                                changeRating={this.changeRating}
                                                numberOfStars={5}
                                                name='rating'
                                                starDimension='20'
                                                starSpacing='1px'
                                                starHoverColor='blue'
                                            />
                                        </span>
                                    </Form.Label>
                                    <Form.Control maxlength='250' name='comment' value={this.state.comment} onChange={this.handleInput} id='comment-text' as='textarea' rows={4} cols={50} required/>
                                    <Form.Text className='text-muted'>{this.state.comment.length}/250</Form.Text>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group>
                                    <Button type='submit' variant='outline-success'>Submit</Button>
                                </Form.Group>
                            </Form.Row>
                        </Form>
                    </Card>
                    <div id='commentContainer'>
                        {mappedComments}
                    </div>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps)(Gem);