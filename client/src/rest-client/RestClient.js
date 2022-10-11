import React from 'react'
import axios from "axios";

class RestClient {
    static getRequest = (url) => {
        var cors = {
            origin: `${process.env.BACKEND_ORIGIN_API}`
        }

        const token = localStorage.getItem("token");

        return axios
            .get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': cors.origin,
                    'x-access-token': JSON.parse(token)
                }
            })
            .then(response => {
                return response
            })
            .catch(error => {
                return error
            })
    }

    static postRequest = (url, postData) => {
        var cors = {
            origin: `${process.env.BACKEND_ORIGIN_API}`
        }

        const token = localStorage.getItem("token");

        let config = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': cors.origin,
                'x-access-token': JSON.parse(token)
            }
        }

        return axios
            .post(url, postData, config)
            .then(response => {
                return response
            })
            .catch(error => {
                console.log(error.response.data);
                if(error.response.data == 'Invalid Token') {
                    //toast.success('Please login first')
                    window.location.href = process.env.DOMAIN;
                }
                return error
            })
    }

    static deleteRequest = (url, postData) => {
        var cors = {
            origin: `${process.env.BACKEND_ORIGIN_API}`
        }

        const token = JSON.parse(localStorage.getItem("token"))
        
        let config = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': cors.origin,
                'x-access-token': token
            }
        }

        return axios
            .delete(url, postData, config)
            .then(response => {
                return response
            })
            .catch(error => {
                console.log(error.response.data);
                return error
            })
    }

    static updateRequest = (url, postData) => {
        var cors = {
            origin: `${process.env.BACKEND_ORIGIN_API}`
        }

        const token = localStorage.getItem("token");

        let config = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': cors.origin,
                'x-access-token': JSON.parse(token)
            }
        }

        return axios
            .put(url, postData, config)
            .then(response => {
                return response
            })
            .catch(error => {
                return error
            })
    }
}

export default RestClient