import React, { Fragment } from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import Layout from '../../components/layouts/Layout';
import { Col, Divider, Row } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import RestClient from '../../rest-client/RestClient';
import AppUrl from '../../rest-client/AppUrl';

function PostView() {
    const [post, setPost] = useState(null)
    let { id } = useParams();

    useEffect(() => {
        getPost()
        console.log(post);
    }, [])

    const getPost = async () => {
        const url = `${AppUrl.post}/${id}`

        RestClient.getRequest(url)
        .then(function (response) {
            setPost(response.data.post_data)
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    if(!post) {
        return (
            <div>
                <p>loading...</p>
            </div>
        )
    }

    return (
        <Fragment>
            <Layout>
                <Row>
                    <Col xs={2} xl={5}></Col>
                    <Col xs={20} xl={14}>
                        <div style={{ padding: '40px' }}>
                            <h4 style={{ textAlign: 'center' }}>{ post.post_title }</h4>

                            <Divider />
                            <div style={{ float: 'right' }}>
                                <h6>Author : { post.post_author }</h6>
                            </div>
                            <div style={{ clear: 'both', marginTop: '60px' }} dangerouslySetInnerHTML={{ __html: post.post_body }}></div>
                        </div>
                    </Col>
                    <Col xs={2} xl={5}></Col>
                </Row>
               
            </Layout>
        </Fragment>
   
    )
}

export default PostView