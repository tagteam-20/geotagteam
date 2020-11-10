import React, {useState} from 'react';
import axios from 'axios';

function RegisterForm(){
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
        <form onSubmit={submitForm}>
            <span id='username-inp'>
                <label htmlFor='username'>Username: </label>
                <input type='text' name='username' value={username} onChange={e=>setUsername(e.target.value)} id='username' required/>
            </span>
            <span id='password-inp'>
                <label htmlFor='password'>Password: </label>
                <input type='password' name='password' value={password} onChange={e=>setPassword(e.target.value)} id='password' required/>
            </span>
            <span id='image'>
                <label htmlFor='image'>Profile Picture: </label>
                <input type='file' name='image' accept='image/*' id='image-input' onChange={e=>setImage(e.target.files[0])} required/>
            </span>
            <span id='submit'>
                <input type='submit' value='Submit'/>
            </span>
        </form>
    );
}

export default RegisterForm;