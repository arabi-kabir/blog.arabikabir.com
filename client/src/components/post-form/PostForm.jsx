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

function PostForm() {
    const navigate = useNavigate()
    const [blogData, setBlogdata] = useState({
        title: '',
        author: '',
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
        setBlogdata({
            ...blogData,
            content: contentJodit
        })

    }, [contentJodit])

    const textEditorNewContent = () => {
        setBlogdata({
            ...blogData,
            content: editor.current.value
        })
    }

    const submitBlog = async (e) => {
        e.preventDefault()
        const errors = PostValidate.validate(blogData)
        const url = `${process.env.REACT_APP_UPLOAD_URL}/post/save-post-data`

        if(errors.length == 0) {
            try {
                return await RestClient.postRequest(url, {
                    blogData: blogData
                })
                .then(result => {
                    if(result.status == 201) {
                        toast.success('Post saved successfully')
        
                        setBlogdata({
                            title: '',
                            author: '',
                            content: '',
                            short_description: ''
                        })
    
                        navigate('/my-posts')
                    } else {
                        toast.error('Opps! Something is wrong')
                    }
                })
                .catch(function (error) {
                    toast.error('Opps! Something is wrong with server [insert]')
                    console.log(error);
                });
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



    return (
        <Fragment>
            <Layout>
                <div className='app'>
                    <div className="container mb-3" style={{ marginBottom: '500px' }}>
                        <h3 className='mt-3'>Create Post</h3>

                        <div className="wrapper" style={{ marginBottom: '80px' }}>
                            <form className="form-group mt-4">
                                <div className="form-group mb-3">
                                    <label className="mb-2">Title</label>
                                    <Input placeholder='Post Title' name='title' value={blogData.title} onChange={hanldeChangeData} />
                                </div>

                                <div className="form-group mb-3">
                                    <label className="mb-2">Author</label>
                                    <Input placeholder='Author Name' name='author' value={blogData.author} onChange={hanldeChangeData} />
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
                                        onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                        onChange={textEditorNewContent}
                                    />
                                </div>

                                <div className="form-group">
                                    <Button 
                                        onClick={submitBlog} 
                                        // block 
                                        style={{ backgroundColor: '#27ae60', color: 'white' }}
                                    >
                                        SUBMIT POST
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