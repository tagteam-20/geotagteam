import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Accordion, Card, Button, Container, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import './User.scss';
import { connect } from 'react-redux';

class User extends Component {
    constructor() {
        super();
        this.state = {
            username: 'username',
            profilePic: 'https://via.placeholder.com/100',
            favorites: [],
            isEditing: false,
            newProfilePicture: {}
        }
    }

    componentDidMount() {
        this.updateProfile();
    }
    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id)
            this.updateProfile();
    }

    updateProfile() {
        axios.get('/api/user/' + this.props.match.params.id)
            .then(res => {
                this.setState({ username: res.data.username, profilePic: res.data.profile_pic })
            })
            .catch(err => console.log(err))
        axios.get('/api/favorites/' + this.props.match.params.id)
            .then(res => {
                this.setState({ favorites: res.data })
            })
    }

    submitFunction = (e) => {
        e.preventDefault();
        const fd = new FormData();
        fd.append('newProfilePicture', this.state.newProfilePicture, this.state.newProfilePicture.name);
        axios.put('/api/profilePic/'+ this.props.match.params.id, fd)
        .then(res => {
            this.updateProfile();
            this.setState({isEditing: false})
        })
    }
render() {

    const profilePictureForm = (
        <div className='profile-info'>
            <Form onSubmit={this.submitFunction}>
                <Form.Group id='profile-group'>
                    <Form.Label htmlFor='profile-pic-inp'>Profile Pic:</Form.Label>
                    <Form.Control type='file' name='profile-pic-inp' accept='image/*' id='image-input' onChange={e => this.setState({newProfilePicture: e.target.files[0]})} required />
                    <Button variant="outline-success" type='submit' className='update-form-buttons'>Submit</Button>
                    <Button variant="outline-danger" className='update-form-buttons' onClick={() => this.setState({isEditing: false})}>Cancel</Button>
                </Form.Group>
            </Form>
        </div>
    )

    const profileData = (
        <div className='profile-info'>
            <img src={this.state.profilePic} id='profile-pic' />
            {+this.props.match.params.id === +this.props.user.id ?
                <Button size="sm" id='update-button' onClick={() => this.setState({ isEditing: true })}>&#9998;Update Photo</Button> : null}
            <h3>{this.state.username}</h3>
            <h5>Favorites - {this.state.favorites.length}</h5>
        </div>
    )
    
    return (
        <div className='user' id='user-page'>
            <Helmet>
                <title>HiddenGems | {this.state.username ? this.state.username : 'User page'}</title>
            </Helmet>
            <Container id='user-container'>
                {this.state.isEditing === true ? profilePictureForm
                    : profileData}
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
                                    <Link to={'/gem/' + el.id}><Button variant="outline-primary">See More</Button></Link>
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

const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps)(User);