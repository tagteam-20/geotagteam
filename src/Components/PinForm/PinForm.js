import React, {useState} from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Container, Card, Col } from 'react-bootstrap';

const PinForm = (props)=>{
    const [y,setY] = useState(0.0),
        [x,setX] = useState(0.0),
        [image,setImage] = useState({}),
        [description, setDesc] = useState(''),
        [title, setTitle] = useState('');
    
    return (
        <Form>
            <Form.Row>
                <Form.Group as={Col} id='title'>
                    <Form.Label htmlFor='title'>Title: </Form.Label>
                    <Form.Control type='text' name='title' value={title} onChange={e=>setTitle(e.target.value)} required/>
                </Form.Group>
                <Form.Group as={Col} id='image'>
                    <Form.Label htmlFor='image'>Image: </Form.Label>
                    <Form.Control type='file' name='image' accept='image/*' id='image-input' onChange={e=>setImage(e.target.files[0])} required/>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} id='x'>
                    <Form.Label htmlFor='x'>X:</Form.Label>
                    <Form.Control type='text' name='x'></Form.Control>
                </Form.Group>
            </Form.Row>
        </Form>
    )
}

export default PinForm;