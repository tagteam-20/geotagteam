import React, {useState} from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Container, Card } from 'react-bootstrap';

function RegisterForm(props){
    const [image, setImage] = useState({}),
        [username, setUsername] = useState(''),
        [password, setPassword] = useState('');
    
    const submitForm = (e)=>{
        const fd = new FormData();
        fd.append('image', image, image.name);
        fd.append('username', username);
        fd.append('password', password);
        axios.post('/api/register', fd)
            .then(res=>{
                console.log(res.data);
            }).catch(err=>{
                console.log(err);
            });
        e.preventDefault();
    }

    return(
        <Container>
            <Card>
                <Card.Header>Register</Card.Header>
                <Card.Body>
                <Form onSubmit={submitForm}>
                    <Form.Group id='username-inp'>
                    <Form.Label htmlFor='username'>Username: </Form.Label>
                    <Form.Control type='text' name='username' value={username} onChange={e=>setUsername(e.target.value)} id='username' required/>
                </Form.Group>
                <Form.Group id='password-inp'>
                    <Form.Label htmlFor='password'>Password: </Form.Label>
                    <Form.Control type='password' name='password' value={password} onChange={e=>setPassword(e.target.value)} id='password' required/>
                </Form.Group>
                <Form.Group id='image'>
                    <Form.Label htmlFor='image'>Profile Picture: </Form.Label>
                    <Form.Control type='file' name='image' accept='image/*' id='image-input' onChange={e=>setImage(e.target.files[0])} required/>
                </Form.Group>
                <Form.Group id='submit'>
                    <Button type='submit' variant='outline-success' value='Submit'>Submit</Button>
                    <Button type='button' variant='outline-danger' onClick={props.toggleView}>Cancel</Button>
                </Form.Group>
                <FormGroup>

                </FormGroup>
                </Form>
                </Card.Body>
            </Card>
        
        </Container>
    );
}

export default RegisterForm;