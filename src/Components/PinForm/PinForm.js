import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Button, Form, Col, Alert, Card, Container } from 'react-bootstrap';
import './PinForm.scss';

const PinForm = (props)=>{
    const [y,setY] = useState(0.0),
        [x,setX] = useState(0.0),
        [image,setImage] = useState({}),
        [description, setDesc] = useState(''),
        [title, setTitle] = useState(''),
        [error, setError] = useState({bool: false, message: ''});

    
    useEffect(()=>{
        if(props.match.params.lat)
            setY(props.match.params.lat);
        if(props.match.params.lng)
            setX(props.match.params.lng);
    }, [props.match.params.lat,props.match.params.lng]);

    const submitForm = (e)=>{
        e.preventDefault();
        const fd = new FormData();
        fd.append('image', image, image.name);
        fd.append('y', y);
        fd.append('x',x);
        fd.append('description',description);
        fd.append('title', title);
        axios.post('/api/pin', fd)
            .then(res=>{
                console.log(res.data);
            }).catch(err=>{
                setError({bool: true, message: err.response.data});
            })
    }

    const err = (
        <Alert variant='danger'>
            <Alert.Heading>Error:</Alert.Heading>
            <p>{error.message}</p>
        </Alert>
    )
    return (
        <div id='pin-form-page'>
            <Container id='pin-form-container'>
            <Card id='new-card'>
            <Form onSubmit={submitForm}>
                {error.bool ? err : null}
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
                        <Form.Label htmlFor='x'>Long:</Form.Label>
                        <Form.Control type='number' step='any' name='x' value={x} onChange={e=>setX(e.target.value)}/>
                    </Form.Group>
                    <Form.Group as={Col} id='y'>
                        <Form.Label htmlFor='y'>Lat:</Form.Label>
                        <Form.Control type='number' step='any' name='y' value={y} onChange={e=>setY(e.target.value)}/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} id='desc'>
                        <Form.Label>Description: </Form.Label>
                        <Form.Control as='textarea' rows={4} value={description} onChange={e=>setDesc(e.target.value)}/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Button variant='outline-success' type='submit'>Submit</Button>
                </Form.Row>
            </Form>
            </Card>
            </Container>
        </div>
    )
}

export default PinForm;