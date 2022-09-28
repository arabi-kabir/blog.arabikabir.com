import { Button, Menu } from 'antd'
import { Header } from 'antd/lib/layout/layout'
import React from 'react'
import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <div>
            <Header
                style={{
                    // position: 'fixed',
                    zIndex: 1,
                    width: '100%',
                }}
            >
                <Button type='link'>
                    <Link to={'/'}>
                        Blog
                    </Link>
                </Button>

                <Button type='link'>
                    <Link to={'/sign-in'}>
                        Signin
                    </Link>
                </Button>
            </Header>
        </div>
    )
}

export default Navigation