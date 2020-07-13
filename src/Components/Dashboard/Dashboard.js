import React, {Component} from 'react';
import Search from '../../assets/search.svg';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import axios from 'axios';
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: '',
            checkMyPost: true,
            posts: []
        }
        this.resetPosts = this.resetPosts.bind(this);
    }

    componentDidMount() {
        this.searchPosts();
    }

    componentDidUpdate(prevProps) {
        console.log(prevProps.posts, this.props.posts)
    }

    resetPosts = () => {
        axios.get(`api/posts/${this.props.id}`, {userposts: this.state.checkMyPost})
        .then(res => this.setState({posts:res.data, searchInput:''}))
        .catch(err => console.log(err));
    }

    searchPosts = () => {
        console.log({userposts: this.state.checkMyPost, search: this.state.searchInput, id:this.props.id})
        axios.get(`api/posts/${this.props.id}`, {userposts: this.state.checkMyPost, search: this.state.searchInput})
        .then(res => {console.log(res.data); this.setState({posts:res.data})})
        .catch(err => console.log(err));
    }

    handleInput = (val, type) => {
        this.setState({[type]: val})
    }

    render() {
        const mappedPosts = this.state.posts.map(post => (<Link className='post-container' to={`post/${post.id}`}><h1>{post.title}</h1><div><p>by: {post.username}</p><img className='author-profile' src={post.profile_pic} /></div></Link>))
        return (
            <div id='dashboard'>
                <section className='search-container'>
                    <input value={this.state.searchInput} onChange={(e) => this.handleInput(e.target.value, 'searchInput')} placeholder="Search by Title" className='search-input' />
                    <button className='search-button'><img src={Search} /></button>
                    <button onClick={this.resetPosts} className='reset-button'>Reset</button>
  
                        <p>My Posts:</p>
                        <input value={this.state.checkMyPost} onChange={(e) => this.handleInput(e.target.value, 'checkMyPost')} type='checkbox' />
                   
                </section>
                <section className='search-posts'>
                    {mappedPosts}
                </section>
            </div>
        )
    }
}

const mapStateToProps = reduxStore => reduxStore;

export default connect(mapStateToProps)(Dashboard);