import React, { Fragment } from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

function PostView() {
    const [post, setPost] = useState(null)

    useEffect(() => {
        getPost('as')
    }, [])

    const getPost = async (post_id2) => {
        let post_id = '633195f7f804064dad07a48d'
        const url = `${process.env.REACT_APP_UPLOAD_URL}/post/${post_id}`

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
            <div style={{ padding: '40px' }}>
                <h4>Post view</h4>
                <div className='ck-content'>
                    <div dangerouslySetInnerHTML={{ __html: post.post_body }}></div>
                </div>
            </div>
        </Fragment>
   
    )
}

export default PostView