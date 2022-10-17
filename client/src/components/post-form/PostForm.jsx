import React, { Fragment, useState, useRef, useMemo } from 'react'
import Layout from '../layouts/Layout'
import Input from 'antd/lib/input/Input'
import { Button } from 'antd'
import toast from 'react-hot-toast';
import { useEffect } from 'react'
import RestClient from '../../rest-client/RestClient'
import PostValidate from '../../services/validation/post.validator'
import { useNavigate } from 'react-router-dom'
import JoditEditor from 'jodit-react';
import AppUrl from '../../rest-client/AppUrl';
import Spinner from '../utils/Spinner';

function PostForm(props) {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [blogData, setBlogdata] = useState({
        title: '',
        content: '',
        short_description: ''
    })

    const hanldeChangeData = (e) => {
        setBlogdata({
            ...blogData,
            [e.target.name]: e.target.value
        })
    }

    // JODIT REACT
    const editor = useRef(null);
	const [contentJodit, setContent] = useState('');

    useEffect(() => {
        setLoading(true)
        // if edit mode then load post
        if(props && props.post) {
            setBlogdata({
                title: props.post.post_title,
                content: props.post.post_body,
                short_description: props.post.short_description
            })

            setContent(props.post.post_body)
            setLoading(false)
        }
        setLoading(false)
    }, [props])

    const textEditorNewContent = () => {
        setBlogdata({
            ...blogData,
            content: editor.current.value
        })
    }

    const submitBlog = async (e) => {
        e.preventDefault()
        const errors = PostValidate.validate(blogData)
        let url = ''

        if(props && props.post) {
            url =  AppUrl.post + `/update-post/` + props.post_id
        } else {
            url = AppUrl.post + `/save-post-data`
        }
      
        if(errors.length == 0) {
            try {
                if(props && props.post) {
                    // When updating post
                    await RestClient.updateRequest(url, {
                        blogData: blogData
                    })
                    .then(result => {
                        if(result.status == 200) {
                            toast.success('Post updated successfully')
                            navigate(`/post/${props.post_id}`)
                        } else {
                            toast.error('Opps! Something is wrong')
                        }
                    })
                    .catch(function (error) {
                        toast.error('Opps! Something is wrong with server [insert]')
                        console.log(error);
                    });
                } else {
                    // When inserting post
                    await RestClient.postRequest(url, {
                        blogData: blogData
                    })
                    .then(result => {
                        if(result.status == 201) {
                            toast.success('Post saved successfully')
                            navigate('/my-posts')
                        } else {
                            toast.error('Opps! Something is wrong')
                        }
                    })
                    .catch(function (error) {
                        toast.error('Opps! Something is wrong with server [insert]')
                        console.log(error);
                    });
                }
                
            } catch (error) {
                toast.error('Opps! Something is wrong with server')
                console.log(error);
            }
        } else {
            errors.forEach(error => {
                toast.error(error.message)
            })
        }
    }

    if(loading) {
        return <Spinner />
    }

    let pageHeader = ''
    if(props && props.post) {
        pageHeader = 'Edit Post'
    } else {
        pageHeader = 'Create Post'
    }

    return (
        <Fragment>
            <Layout>
                <div className='app'>
                    <div className="container mb-3" style={{ marginBottom: '500px' }}>
                        <h3 className='mt-3'>{pageHeader}</h3>

                        <div className="wrapper" style={{ marginBottom: '80px' }}>
                            <form className="form-group mt-4">
                                <div className="form-group mb-3">
                                    <label className="mb-2">Title</label>
                                    <Input placeholder='Post Title' name='title' value={blogData.title} onChange={hanldeChangeData} />
                                </div>

                                <div className="form-group mb-3">
                                    <label className="mb-2">Short Description</label>
                                    <Input placeholder='Short Description' name='short_description' onChange={hanldeChangeData} value={blogData.short_description} />
                                </div>

                                <div className="form-group mb-3">
                                    <label className="mb-2">Content</label>

                                    <JoditEditor
                                        ref={editor}
                                        value={contentJodit}
                                        // config={config}
                                        tabIndex={1} 
                                        onBlur={newContent => setContent(newContent)}
                                        onChange={textEditorNewContent}
                                    />
                                </div>

                                <div className="form-group">
                                    <Button 
                                        onClick={submitBlog} 
                                        style={{ backgroundColor: '#27ae60', color: 'white' }}
                                    >
                                        {
                                            (props && props.post) ? (
                                                 'UPDATE POST'
                                            ) : (
                                                'PUBLISH POST'
                                            )
                                        }
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>	
                </div>
            </Layout>
        </Fragment>
    )
}

export default PostForm