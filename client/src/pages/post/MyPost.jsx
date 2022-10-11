import { Button, Col, List, Row, Space, Tooltip, Typography, Card, Avatar } from 'antd'
import React, { Fragment } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Layout from '../../components/layouts/Layout'
import RestClient from '../../rest-client/RestClient'
import { Content } from 'antd/lib/layout/layout'
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
                console.log(result.response.data);
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
        console.log('asasa');
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
                <Content style={{ padding: '0 250px', marginBottom: '50px' }}>
                    <h5 style={{ marginTop: '40px', marginBottom: '30px' }}>My Posts</h5>

                    <Row gutter={[48, 16]}>
                        <Col span={24}>
                            <div>
                                <Space
                                    direction="vertical"
                                    size="middle"
                                    style={{
                                    display: 'flex',
                                    }}
                                >
                                {
                                    posts.map((post) => (
                                        <Card
                                            style={{ width: '100%', cursor: 'pointer', backgroundColor: '#f0f0f0' }}
                                            actions={[
                                                <Tooltip title="Edit Post"> <EditOutlined key="edit" onClick={() => navigate('/my-posts/edit/' + post._id) } /> </Tooltip>,
                                                <Tooltip title="Delete Post"> <DeleteOutlined key="delete" onClick={() => deleteModal(post._id)} /> </Tooltip>
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
                            </div>
                        </Col>
                    </Row>
                </Content>
            </Layout>

            <MyModal title='Delete Confirmation' isModalOpen={modalOpenFlag} onModalCancel={modalOnCancel} onModalOk={modalOnOk} confirmLoading={confirmLoading}>
                <p>Are you sure want to <span style={{ color: 'red' }}>DELETE</span> this post ?</p>
            </MyModal>
        </Fragment>
    )
}

export default MyPost