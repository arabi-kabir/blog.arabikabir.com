import { Button, Menu } from 'antd'
import { Header } from 'antd/lib/layout/layout'
import React from 'react'
import { Link } from 'react-router-dom';

function Navigation() {
    const token = localStorage.getItem("token");

    let loggedinUserRoutes = '';

    if(token) {
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