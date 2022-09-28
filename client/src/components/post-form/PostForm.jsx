import React, { Fragment, useState } from 'react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import axios from 'axios'
import Layout from '../layouts/Layout'
import Input from 'antd/lib/input/Input'
import { Button } from 'antd'
import toast from 'react-hot-toast';

function PostForm() {
    const [blogData, setBlogdata] = useState({
        title: '',
        author: '',
        content: ''
    })
 
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

        document.getElementById('myCkEditor').setData('')

        const url = `${process.env.REACT_APP_UPLOAD_URL}/post/save-post-data`

        axios.post(url, {
            blogData: blogData
        })
        .then(function (response) {
            toast.success('Post saved successfully')

            setBlogdata({
                title: '',
                author: '',
                content: ''
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    return (
        <Fragment>
            <Layout>
                <div className='app'>
                    <div className="container">
                        <h3 className='mt-3'>Create Post</h3>

                        <div className="wrapper">
                            <form className="form-group mt-4">
                                <div className="form-group mb-3">
                                    <label className="mb-2">Title</label>
                                    <Input placeholder='Post Title' name='title' value={blogData.title} onChange={hanldeChangeData} />
                                </div>

                                <div className="form-group mb-3">
                                    <label className="mb-2">Author</label>
                                    <Input placeholder='Author Name' name='author' value={blogData.author} onChange={hanldeChangeData}  />
                                </div>

                                <div className="form-group mb-3">
                                    <label className="mb-2">Content</label>

                                    <CKEditor
                                        id="myCkEditor"
                                        editor={ClassicEditor}
                                        onReady={editor => {

                                        }}
                                        onChange={handleCkeditorState}
                                        config={
                                            {
                                                ckfinder:{
                                                    uploadUrl: `${process.env.REACT_APP_UPLOAD_URL}/post/uploads`
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