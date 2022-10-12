import React, { Fragment } from 'react'
import Layout from '../../components/layouts/Layout'
import { SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Row } from 'antd';
import RestClient from '../../rest-client/RestClient';
import AppUrl from '../../rest-client/AppUrl';
import { useState } from 'react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import Spinner from '../../components/utils/Spinner';

const { Meta } = Card;

function MyProfile() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getMyProfileData()
    }, [])

    const getMyProfileData = async () => {
        const url = AppUrl.myProfile

        return await RestClient.getRequest(url)
        .then(result => {
            if(result.status == 200) {
                const data = result.data
                setUser(data)
                setLoading(false)
            } else {
                toast.error('Opps! Something is wrong')
                setLoading(false)
            }
            setLoading(false)
        })
        .catch(function (error) {
            toast.error('Opps! Something is wrong with server [insert]')
            console.log(error);
            setLoading(false)
        });
    }

    if(loading) {
        return <Spinner />
    }

    return (
        <Fragment>
            <Layout>
            <h5 style={{ marginTop: '30px', marginBottom: '0px', textAlign: 'center', fontWeight: 300 }}>My Profile</h5>
                <Row>
                    <Col xs={2} xl={6}></Col>
                    <Col xs={20} xl={12}>
                        <Card
                            style={{ width: '100%', marginTop: '40px', backgroundColor: '#f5f6fa', color: 'red' }}
                            actions={[
                                <SettingOutlined key="setting" />
                            ]}
                        >
                            <Meta
                                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                title={user.name}
                                description={user.email}
                                style={{ color: 'white' }}
                            />
                        </Card>
                    </Col>
                    <Col xs={2} xl={6}></Col>
                </Row>

                
            </Layout>
        </Fragment>
    )
}

export default MyProfile