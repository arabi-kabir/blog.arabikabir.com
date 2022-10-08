import React, { Fragment, useState, useRef, useMemo } from 'react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import axios from 'axios'
import Layout from '../layouts/Layout'
import Input from 'antd/lib/input/Input'
import { Button } from 'antd'
import toast from 'react-hot-toast';
import { useEffect } from 'react'
import RestClient from '../../rest-client/RestClient'
import PostValidate from '../../services/validation/post.validator'
import { useNavigate } from 'react-router-dom'
import TextArea from 'antd/lib/input/TextArea'





function PostForm() {
    const [blogData, setBlogdata] = useState({
        title: '',
        author: '',
        content: '',
        short_description: ''
    })



    const ckEditorEl = useRef(null)
    const navigate = useNavigate()
 
    const hanldeChangeData = (e) => {
        setBlogdata({
            ...blogData,
            [e.target.name]: e.target.value
        })
    }

    const handleCkeditorState = (event, editor) => {
        const data = editor.getData()

        setBlogdata({
            ...blogData,
            content: data
        })
    }


   

    const submitBlog = async (e) => {
        e.preventDefault()

        const errors = PostValidate.validate(blogData)

        // console.log(ckEditorEl.current.editor.getData());

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
            
                        // Clear CKEditor content
                        ckEditorEl.current.editor.setData('')
    
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


                                    <CKEditor
                                        ref={ckEditorEl}
                                        id="myCkEditor"
                                        editor={ClassicEditor}
                                        onReady={editor => {
                                            // editor.ui.view.editable.element.style.height = '300px';
                                        }}
                                        onChange={handleCkeditorState}
                                        config={
                                            {
                                                ckfinder:{
                                                    uploadUrl: `${process.env.REACT_APP_UPLOAD_URL}/post/uploads`
                                                },
                                                fileTools_requestHeaders: {
                                                    'Access-Control-Allow-Origin': `${process.env.REACT_APP_UPLOAD_URL}`
                                              }
                                            }
                                        }
                                    />
                                </div>

                                <div className="form-group">
                                    <Button 
                                        onClick={submitBlog} 
                                        block 
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