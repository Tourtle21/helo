import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            img: '',
            content: ''
        }
        this.createPost = this.createPost.bind(this);
    }

    handleInput(val, type) {
        this.setState({[type]: val});
    }

    createPost() {
        const {title, img, content} = this.state;
        axios.post(`/api/posts/${this.props.id}`, {title, img, content})
        .then(res => {
            this.props.history.push('/dashboard');
        })
    }

    render() {
        const {title, img, content} = this.state;
        return (
            <div id='form'>
                <section className='form-container'>
                    <h1>New Post</h1>
                    <p>Title:</p>
                    <input onChange={(e) => this.handleInput(e.target.value, 'title')} value={title} />
                    <img src={this.state.img} />
                    <p>Image URL:</p>
                    <input onChange={(e) => this.handleInput(e.target.value, 'img')} value={img} />
                    <p>Content:</p>
                    <input onChange={(e) => this.handleInput(e.target.value, 'content')} value={content}/>
                    <button onClick={this.createPost}>Post</button>
                </section>
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Form);