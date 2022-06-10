import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";
import { useFetching } from "../hooks/useFetching";

const PostIdPage = () => {
    const params = useParams();

    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);

    const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getById(id);
        setPost(response.data);
    });

    const [fetchPostComments, isCommentLoading, errorComment] = useFetching(async (id) => {
        const response = await PostService.getCommentsByPostId(id);
        setComments(response.data);
    });

    useEffect(() => {
        fetchPostById(params.id);
        fetchPostComments(params.id);
    }, []);

    return (
        <div>
            <h1>Пост {params.id}</h1>
            {isCommentLoading && isLoading
                ? <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}><Loader /></div>
                :
                <div>
                    <hr/>
                    <h2>Комментарии к посту {post.title}</h2>
                    <div>
                    {comments.map(c =>
                        <div style={{marginTop: '15px'}} key={c.id}>
                            <h3>{c.name} - {c.email}</h3>
                            <p>{c.body}</p>
                        </div>
                    )}
                </div>
                </div>
            }
        </div>
    );
}

export default PostIdPage;