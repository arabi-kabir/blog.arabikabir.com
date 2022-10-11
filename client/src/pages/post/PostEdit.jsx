import React, { useEffect, useState} from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom'
import PostForm from '../../components/post-form/PostForm'
import Spinner from '../../components/utils/Spinner';
import AppUrl from '../../rest-client/AppUrl'
import RestClient from '../../rest-client/RestClient'

function PostEdit() {
    let { id } = useParams()
    const navigare = useNavigate()
    const [loading, setLoading] = useState(true)
    const [post, setPost] = useState({
        title: '',
        author: '',
        content: '',
        short_description: ''
    })

    useEffect(() => {
        getPostDetails()
    }, [])

    const getPostDetails = async () => {
        try {
            const url = `${AppUrl.post}/${id}`

            RestClient.getRequest(url)
            .then(function (response) {
                setPost(response.data.post_data)
            })
            .catch(function (error) {
                console.log(error);
                toast.error('Opps!! Something is burning')
            });
        } catch (error) {
            console.log(error);
            toast.error('Opps!! Something is burning')
        }
        setLoading(false)
    } 

    if(loading) {
        return <Spinner />
    }

    return (
        <PostForm post={post} post_id={id} />
    )
}

export default PostEdit