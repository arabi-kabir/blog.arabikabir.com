import { Col, List, Row, Space, Typography } from 'antd'
import React, { Fragment } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Layout from '../../components/layouts/Layout'
import RestClient from '../../rest-client/RestClient'
import toast from 'react-hot-toast';
import { Content } from 'antd/lib/layout/layout'
import { useNavigate } from 'react-router-dom'

function MyPost() {
    const navigate = useNavigate()
    const [posts, setPosts] = useState([])

    useEffect(() => {
        getMyPosts()
    }, [])

    const getMyPosts = async () => {
        const url = `${process.env.REACT_APP_UPLOAD_URL}/post/my-posts`

        return await RestClient.getRequest(url)
        .then(result => {
            setPosts(result.data.my_posts)

            if(result.status == 200) {
                
            } else {
                toast.error('Opps! Something is wrong')
            }
        })
        .catch(function (error) {
            toast.error('Opps! Something is wrong with server [insert]')
            console.log(error);
        });
    } 

    return (
        <Fragment>
            <Layout>
             
             <Content style={{ padding: '0 300px' }}>
                <Row gutter={[48, 16]}>
                    <Col span={24}>
               
                    {/* <h2 style={{ textAlign }}>My Posts</h2> */}

                    <div style={{ marginTop: '50px' }}>
                        <List
                            header={<h2 style={{ marginBottom: 0 }}>My Posts</h2>}
                            bordered
                            dataSource={posts}
                            renderItem={(post) => (
                                <List.Item style={{ cursor: 'pointer' }} onClick={() => navigate(`/post/${post._id}`)}>
                                    <Typography.Text mark>[ Titlle ]</Typography.Text> {post.post_title}
                                    <br />
                                    <Typography.Text mark>[ Author ]</Typography.Text> {post.post_author}
                                </List.Item>
                            )}
                        />
                    </div>
                    </Col>
                </Row>
             </Content>

                
            </Layout>
        </Fragment>
    )
}

export default MyPost