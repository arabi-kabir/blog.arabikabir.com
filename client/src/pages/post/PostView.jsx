import React, { Fragment } from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Layout from '../../components/layouts/Layout';
import { Col, Divider, Row } from 'antd';
import RestClient from '../../rest-client/RestClient';
import AppUrl from '../../rest-client/AppUrl';
import Spinner from '../../components/utils/Spinner';

function PostView() {
    const [post, setPost] = useState(null)
    let { id } = useParams();

    useEffect(() => {
        getPost()
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
        return <Spinner />
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

                            <div >
                                <h6 style={{ marginBottom: 0 }}>Author : { post.post_owner_id.name }</h6>
                                <small>Email : { post.post_owner_id.email }</small>
                            </div>
                            <div style={{ marginTop: '30px' }} dangerouslySetInnerHTML={{ __html: post.post_body }}></div>
                        </div>
                    </Col>
                    <Col xs={2} xl={5}></Col>
                </Row>
            </Layout>
        </Fragment>
   
    )
}

export default PostView