import Axios from 'axios';
import React, { Component } from 'react';
import axios from 'axios';

class Gem extends Component {
    componentDidMount() {
        axios
        .get('/api/pin/' + this.props.match.params.id)
        .then(res => {
            console.log(res.data)
        })
    }

    render() {
        return (
            <p>Gem</p>
        )
    }
}

export default Gem;