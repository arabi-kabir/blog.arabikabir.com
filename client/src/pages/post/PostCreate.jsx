import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PostForm from '../../components/post-form/PostForm'
import AppUrl from '../../rest-client/AppUrl'
import RestClient from '../../rest-client/RestClient'

function PostCreate() {
    return (
        <PostForm post={null} />
    )
}

export default PostCreate