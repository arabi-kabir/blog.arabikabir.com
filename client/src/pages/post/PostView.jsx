import React, { Fragment } from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import Layout from '../../components/layouts/Layout';
import { Col, Row } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import RestClient from '../../rest-client/RestClient';
import AppUrl from '../../rest-client/AppUrl';

function PostView() {
    const [post, setPost] = useState(null)
    let { id } = useParams();

    useEffect(() => {
        getPost('as')
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
                    <Col xs={24} sm={24} md={24}>
                        <div style={{ padding: '40px' }}>
                            <h4 style={{ textAlign: 'center' }}>{ post.post_title }</h4>
                            <h6>Author : { post.post_author }</h6>
                            <div className='ck-content'>
                                <div dangerouslySetInnerHTML={{ __html: post.post_body }}></div>
                            </div>
                        </div>
                    </Col>
                </Row>
               
            </Layout>
        </Fragment>
   
    )
}

export default PostView