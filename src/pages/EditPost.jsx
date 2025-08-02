import React, {useState, useEffect} from 'react'
import { Container, PostForm } from '../components'
import { useNavigate, useParams } from 'react-router-dom'
import appwriteService from '../appwrite/config'

function EditPost() {
    const [post, setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()
    useEffect (()=>{
        appwriteService.getPost(slug).then((post)=>{
            if(post){
                setPost(post)
            }
            else{
                navigate('/')
            }
        })
    },[slug, navigate])
    {console.log(post)}
  return post? (
    <div className='py-8'>
        <Container>
            <PostForm post = {post}/>
        </Container>
      
    </div>
  ): null
}

export default EditPost
