import React, {Component} from 'react';
import House from '../../assets/house.png'
import FormLogo from '../../assets/form.svg'
import Logout from '../../assets/logout.svg'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
class Nav extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id='nav'>
                {this.props.location.pathname != '/' ? (

                    <nav className='nav'>
                        <div className='links'>
                            <img className='profile' src={this.props.profile}/>
                            <p className='profile-username'>{this.props.username}</p>
                            <Link to='/dashboard'><img className='dashboard-logo' src={House}/></Link>
                            <Link to='/new'><img className='dashboard-logo' src={FormLogo}/></Link>
                        </div>
                        <Link to='/'><img className='dashboard-logo' src={Logout}/></Link>
                    </nav>

                ) : null}
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Nav);