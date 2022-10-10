import { Button, Menu } from 'antd'
import { Header } from 'antd/lib/layout/layout'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

import AppUrl from '../../rest-client/AppUrl';
import RestClient from '../../rest-client/RestClient';

function Navigation() {
    const token = localStorage.getItem("token");

    let loggedinUserRoutes = '';

    const [tokenStatus, setTokenStatus] = useState('')

    useEffect(() => {
        getTokenStatus()
    }, [])

    const getTokenStatus = async () => {
        const response = await RestClient.getRequest(AppUrl.validateToken)
        setTokenStatus(response.data)
    }

    if(token && tokenStatus != 'user not found') {
        loggedinUserRoutes = <div>
            <Button type='link'>
                <Link to={'/'}>
                    [ Blog ]
                </Link>
            </Button>

            <Button type='link'>
                <Link to={'/my-posts'}>
                    [ My Post ]
                </Link>
            </Button>

            <Button type='link'>
                <Link to={'/post-create'}>
                    [ Create Post ]
                </Link>
            </Button>

            <Button type='link'>
                <Link to={'/sign-out'}>
                    [ Signout ]
                </Link>
            </Button>
        </div>
    } else {
        loggedinUserRoutes = <div>
            <Button type='link'>
                <Link to={'/'}>
                    [ Blog ]
                </Link>
            </Button>

            <Button type='link'>
                <Link to={'/sign-in'}>
                    [ Signin ]
                </Link>
            </Button>
        </div>
    }

    return (
        <div>
            <Header
                style={{
                    zIndex: 1,
                    width: '100%',
                }}
            >
                {loggedinUserRoutes}
            </Header>
        </div>
    )
}

export default Navigation