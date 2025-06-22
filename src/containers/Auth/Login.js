import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import {} from '@fortawesome/fontawesome-free-webfonts';


import * as actions from "../../store/actions";
import { KeyCodeUtils, LanguageUtils } from "../../utils";

import userIcon from '../../assets/images/user.svg';
import passIcon from '../../assets/images/pass.svg';
import './Login.scss';
import { FormattedMessage } from 'react-intl';

import adminService from '../../services/adminService';

class Login extends Component {
    constructor(props) {
        super(props);
       this.state = {
            username: '',
            password: '',
            isShowPassword: false,
        }
       }
    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value


        })
    }
    handleOnChangePassword = (event) => {
        this.setState({
            password:event.target.value
        })
    }
    handleLogin = () => {
        console.log("username", this.state.username);
        console.log("password", this.state.password);
        
    }
    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

  
    render() {
       

        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row '>
                        <div className='col-12 text-login'>Login
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label htmlFor="">Username:</label>
                            <input 
                            type="text" 
                            className='form-control' 
                            placeholder='Enter your username' 
                            value={this.state.username}
                            onChange={(event) => this.handleOnChangeUsername(event)}
                            />

                        </div>
                        <div className='col-12 form-group login-input'>
                            <label htmlFor="">Password:</label>
                           <div className='custom-input-password'> 
                            <input type={this.state.isShowPassword ? 'text' : 'password'}
                            onChange={(event) => this.handleOnChangePassword(event)}
                             className='form-control' placeholder='Enter your password' value={this.state.password} />
                            <span onClick={() => this.handleShowHidePassword()}>
                                <i className={this.state.isShowPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}
                                ></i>
                            </span>

                            </div>
                            
                        </div>
                        <div className='col-12 '>
                            <button className='btn-login' onClick={() => this.handleLogin()}>Login</button>
                            </div>
                        <div className='col-12 '>
                            <span className='forgot-password'>Forgot your password?</span>
                            </div>
                        <div className='col-12 text-center mt-3'>
                            <span className='text-other-login'>Or login with:</span>
                            </div>
                        <div className='col-12 social-login'>
                            <i className='fab fa-google-plus-g google'></i>
                            <i className='fab fa-facebook-f facebook'></i>
                            </div>
                    </div>

                </div>

            </div>
        )
    }

}
const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(Login);
