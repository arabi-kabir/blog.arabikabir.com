import RestClient from '../../rest-client/RestClient';
import AppUrl from '../../rest-client/AppUrl';
import axios from 'axios';
import toast from 'react-hot-toast';

const signin = (email, password) => {
    try {
        return RestClient.postRequest(AppUrl.authSignin, { email, password })
        .then(result => {
            if(result.status == 200) {
                localStorage.setItem("user", JSON.stringify(result.data))
                localStorage.setItem("token", JSON.stringify(result.data.token))
            }
            return result;
        })
    } catch (error) {
        return error
    }
}

const signup = (name, email, password) => {
    try {
        return RestClient.postRequest(AppUrl.authSignup, { name, email, password })
        .then(result => {
            if(result.status == 201) {
                localStorage.setItem("user", JSON.stringify(result.data))
                localStorage.setItem("token", JSON.stringify(result.data.token))
            }
            return result;
        })
    } catch (error) {
        return error
    }
}

const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    toast.success('Logged out successfully')
}

const getCurrentUser = () => {
    const res = JSON.parse(localStorage.getItem("user"));
    if(res) {
        return res
    } else {
        return false
    }
};

const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common["x-access-token"] = `${token}`;
    }
    else
        delete axios.defaults.headers.common["Authorization"];
}

const AuthService = {
    signin,
    logout,
    signup,
    getCurrentUser,
    setAuthToken
}

export default AuthService;