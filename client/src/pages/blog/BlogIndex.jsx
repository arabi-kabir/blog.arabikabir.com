import { Button, Col, List, Row, Space, Tooltip, Typography, Card, Avatar } from 'antd'
import React, { Fragment, useState, useEffect } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import Layout from '../../components/layouts/Layout'
import RestClient from '../../rest-client/RestClient'
import { Content } from 'antd/lib/layout/layout'
import Spinner from '../../components/utils/Spinner'

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
                <Content style={{ padding: '0 250px', marginBottom: '50px' }}>
                    <Row gutter={[48, 16]}>
                        <Col span={24}>
                            <div style={{ marginTop: '50px' }}>
                                <Space
                                    direction="vertical"
                                    size="middle"
                                    style={{
                                        display: 'flex',
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
                                        </Card>
                                    ))
                                }
                                </Space>
                            </div>

                            <Space  
                                // direction="vertical"
                                // size="middle"
                                style={{
                                    // display: 'flex',
                                    marginTop: '20px'
                                }}
                            >
                                {/* <Grid item xs={8}> */}
                                    <Button onClick={gotoPrevious}>Previous</Button>
                                    <Button onClick={gotoNext}>Next</Button>                             
                                {/* </Grid>
                                <Grid item xs={4}> */}
                                    
                                {/* </Grid> */}
                            </Space>

                            <p style={{ float: 'right', paddingRight: '10px', marginTop: '20px' }}>Page of {pageNumber + 1}</p>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </Fragment>
    )
}

export default BlogIndex