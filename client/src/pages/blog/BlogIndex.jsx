import { Button, Col, List, Row, Space, Tooltip, Typography, Card, Avatar, Tag, Badge } from 'antd'
import React, { Fragment, useState, useEffect } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import Layout from '../../components/layouts/Layout'
import RestClient from '../../rest-client/RestClient'
import { Content } from 'antd/lib/layout/layout'
import Spinner from '../../components/utils/Spinner'
const { Text, Link } = Typography;

function BlogIndex() {
    const navigate = useNavigate()
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [totalPages, setTotalpages] = useState(0)
    const [pageNumber, setPageNumber] = useState(0)

    const { Meta } = Card;

    useEffect(() => {
        getPosts()
    }, [pageNumber])

    const getPosts = async () => {
        const url = `${process.env.REACT_APP_UPLOAD_URL}/post/all-posts` + `?page=${pageNumber}`

        return await RestClient.getRequest(url)
        .then(result => {
            if(result.status == 200) {
                const {post_data, totalPages} = result.data
                setPosts(post_data)
                setTotalpages(totalPages)
                setLoading(false)
            } else {
                toast.error('Opps! Something is wrong')
                setLoading(false)
            }
        })
        .catch(function (error) {
            toast.error('Opps! Something is wrong with server [insert]')
            console.log(error);
        });
    } 

    const gotoPrevious = () => {
        setLoading(true)
        setPageNumber(Math.max(0, pageNumber - 1))

        if(pageNumber == 0) {
            setLoading(false)
        }
    }

    const gotoNext = () => {
        setLoading(true)
        const nextPageNum = Math.min(totalPages - 1, pageNumber + 1)
        setPageNumber(nextPageNum)
        if(pageNumber == nextPageNum) {
            setLoading(false)
        }
    }

    if(loading) {
        return <Spinner />
    }

    return (
        <Fragment>
            <Layout>
                <h5 style={{ marginTop: '30px', marginBottom: '10px', textAlign: 'center', fontWeight: 300 }}>Lastest Posts ...</h5>
                <Row>
                    <Col xs={2} xl={6}></Col>
                    <Col xs={20} xl={12}>
                        <Space  
                            direction="vertical"
                            size="middle"
                            style={{
                                marginTop: '20px',
                                width: '100%'
                            }}
                        >
                            {
                                posts && posts.map((post) => (
                                    
                                    <Card
                                        style={{ width: '100%', cursor: 'pointer', backgroundColor: '#f0f0f0' }}
                                        key={post._id}
                                    >
                                        <Meta
                                            title={post.post_title}
                                            description={post.short_description}
                                            onClick={() => navigate(`/post/${post._id}`)}
                                        />

                                        {/* <Tag style={{ marginTop: '10px' }} color="default">{post.post_owner_id.email}</Tag> */}
                                        {/* <Text style={{ marginTop: '10px' }} code>{post.post_owner_id.email}</Text> */}
                                        {/* <Badge 
                                            count={post.post_owner_id.email} 
                                            style={{ backgroundColor: '#52c41a', marginTop: '10px' }}
                                        /> */}
                                        <p style={{ marginBottom: '0', marginTop: '10px' }}> <span style={{ fontWeight: 'bold' }}>Author</span> {post.post_owner_id.email}</p>
                                    </Card>
                                ))
                            }
                        </Space>

                        <Space  
                            style={{
                                marginTop: '20px'
                            }}
                        >
                            <Button onClick={gotoPrevious}>Previous</Button>
                            <Button onClick={gotoNext}>Next</Button>                             
                        </Space>

                        <p style={{ float: 'right', paddingRight: '10px', marginTop: '20px' }}>Page of {pageNumber + 1}</p>     
                    </Col>
                    <Col xs={2} xl={6}></Col>
                </Row>
                          
            </Layout>
        </Fragment>
    )
}

export default BlogIndex