import React, {Component} from 'react';
import Search from '../../assets/search.svg';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
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
        if (!this.props.username) {
            this.props.history.push('/')
        } else {
            this.searchPosts();
        }
    }

    resetPosts = () => {
        axios.get(`/api/posts?userposts=${this.state.checkMyPost}&search=${''}`)
        .then(res => this.setState({posts:res.data, searchInput:''}))
        .catch(err => console.log(err));
    }

    searchPosts = () => {
        console.log(this.state.checkMyPost, this.state.searchInput)
        axios.get(`/api/posts?userposts=${this.state.checkMyPost}&search=${this.state.searchInput}`)
        .then(res => {console.log(res.data); this.setState({posts:res.data})})
        .catch(err => console.log(err));
    }

    handleInput = (val, type) => {
        console.log(val, type)
        this.setState({[type]: val})
    }

    render() {
        const mappedPosts = this.state.posts.map(post => (<Link key={post.id} className='post-container' to={`post/${post.id}`}><h1>{post.title}</h1><div><p>by: {post.username}</p><img alt='' className='author-profile' src={post.profile_pic} /></div></Link>))
        return (
            <div id='dashboard'>
                <section className='search-container'>
                    <input value={this.state.searchInput} onChange={(e) => this.handleInput(e.target.value, 'searchInput')} placeholder="Search by Title" className='search-input' />
                    <button onClick={this.searchPosts} className='search-button'><img alt='' src={Search} /></button>
                    <button onClick={this.resetPosts} className='reset-button'>Reset</button>
  
                        <p>My Posts:</p>
                        <input checked={this.state.checkMyPost} onChange={(e) => this.handleInput(e.target.checked, 'checkMyPost')} type='checkbox' />
                   
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