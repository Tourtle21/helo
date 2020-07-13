import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            img: '',
            content: '',
            username: '',
            profile_pic: ''
        }
    }

    componentDidMount = () => {
        const {postid} = this.props.match.params;
        axios.get(`/api/post/${postid}`)
        .then(res => {
            console.log(res.data)
            this.setState(res.data)
        })
    }

    render() {
        const {title, img, content, username, profile_pic, author_id} = this.state;
        return (
            <div id='post'>
                <section className='single-post'>
                    <div className='post-sections'>
                        <h1>{title}</h1>
                        <img className='post-image' src={img} />
                    </div>
                    <div className='post-sections profile-section'>
                        <img className='author-profile' src={profile_pic} />
                        <p>{username}</p>
                        <p>{content}</p>
                        {author_id = this.props.id ? <button>Delete</button> : null}
                    </div>
                </section>
            </div>
        )
    }
}

const mapStateToProps = reduxStore => reduxStore;
export default connect(mapStateToProps)(Post);