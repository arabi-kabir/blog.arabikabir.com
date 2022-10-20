import { Button, Col, List, Row, Space, Tooltip, Typography, Card, Avatar } from 'antd'
import React, { Fragment } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Layout from '../../components/layouts/Layout'
import RestClient from '../../rest-client/RestClient'
import { useNavigate } from 'react-router-dom'
import { DeleteOutlined } from '@ant-design/icons'
import toast from 'react-hot-toast';
import { EditOutlined } from '@ant-design/icons';
import Spinner from '../../components/utils/Spinner'
import MyModal from '../../components/utils/Modal'
import AppUrl from '../../rest-client/AppUrl'

function MyPost() {
    const navigate = useNavigate()
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [modalOpenFlag, setModalOpenFlag] = useState(false)
    const [deletePostId, setDeletePostId] = useState(null)
    const [confirmLoading, setConfirmLoading] = useState()
 
    const { Meta } = Card;

    useEffect(() => {
        getMyPosts()
    }, [])

    const getMyPosts = async () => {
        setLoading(true)
        const url = `${process.env.REACT_APP_UPLOAD_URL}/post/my-posts`

        return await RestClient.getRequest(url)
        .then(result => {
            if(result.status == 200) {
                setPosts(result.data.my_posts)
                setLoading(false)
            } else {
                setLoading(true)
                toast.error(result.response.data)
                toast.error('Something is wrong! Please sign-in again')
            }
        })
        .catch(function (error) {
            setLoading(true)
            toast.error('Opps! Something is wrong with server [insert]')
            console.log(error);
        });
    } 

    const deleteModal = async (post_id) => {
        setModalOpenFlag(true)
        setDeletePostId(post_id)
        setConfirmLoading(false)
    }

    const modalOnCancel = () => {
        setModalOpenFlag(false)
        setConfirmLoading(false)
    }

    const modalOnOk = async () => {
        setConfirmLoading(true)
        try {
            const url = AppUrl.post + `/delete-post/${deletePostId}`

            RestClient.deleteRequest(url)
            .then(result => {
                if(result.status == 200) {
                    toast.success('Post Deleted Successfully')
                    getMyPosts()
                    setConfirmLoading(false)
                    setModalOpenFlag(false)
                }
            })
        } catch (error) {
            return error
        }
    }

    if(loading) {
        return <Spinner />
    }

    return (
        <Fragment>
            <Layout>
                <h5 style={{ marginTop: '30px', marginBottom: '10px', textAlign: 'center', fontWeight: 300 }}>My Posts</h5>
                <Row style={{ marginBottom: '60px' }}>
                    <Col xs={2} xl={6}></Col>
                    <Col xs={20} xl={12} style={{ marginBottom: '200px' }}>
                        <Space  
                            direction="vertical"
                            size="middle"
                            style={{
                                marginTop: '20px',
                                width: '100%'
                            }}
                        
                        >
                            {
                                posts.map((post) => (
                                    <Card
                                        style={{ width: '100%', cursor: 'pointer', backgroundColor: '#f0f0f0' }}
                                        actions={[
                                            <Tooltip title="Edit Post"> <EditOutlined key="edit" onClick={() => navigate('/my-posts/edit/' + post._id) } /> </Tooltip>,
                                            <Tooltip title="Delete Post"> <DeleteOutlined key="delete" onClick={() => deleteModal(post._id)} /> </Tooltip>,
                                            <Tooltip title="Post Status"> <span style={{ color: post.post_status == 'Published' ? 'green' : 'grey' }}> {post.post_status} </span> </Tooltip>
                                        ]}
                                        key={post._id}
                                    >
                                    <Meta
                                        title={post.post_title}
                                        description={post.short_description}
                                        onClick={() => navigate(`/post/${post._id}`)}
                                    />
                                    </Card>
                                ))
                            }
                            </Space>
                        </Col>
                        <Col xs={2} xl={6}></Col>
                    </Row>
                </Layout>

            <MyModal title='Delete Confirmation' isModalOpen={modalOpenFlag} onModalCancel={modalOnCancel} onModalOk={modalOnOk} confirmLoading={confirmLoading}>
                <p>Are you sure want to <span style={{ color: 'red' }}>DELETE</span> this post ?</p>
            </MyModal>
        </Fragment>
    )
}

export default MyPost