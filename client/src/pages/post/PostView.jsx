import React, { Fragment } from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import Layout from '../../components/layouts/Layout';
import { Col, Row } from 'antd';
import Sider from 'antd/lib/layout/Sider';

function PostView() {
    const [post, setPost] = useState(null)
    let { id } = useParams();

    useEffect(() => {
        getPost('as')
    }, [])

    const getPost = async () => {
        let post_id = '633195f7f804064dad07a48d'
        const url = `${process.env.REACT_APP_UPLOAD_URL}/post/${id}`

        axios.get(url)
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
                    <Col xs={24} sm={12} md={4} style={{ backgroundColor: '#f1f2f6' }}>
                        <div style={{ padding: '20px' }}>
                            <p style={{ textAlign: 'center' }}>Recent posts from this author</p>
                        </div>
                    </Col>
                    <Col xs={24} sm={12} md={20}>
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