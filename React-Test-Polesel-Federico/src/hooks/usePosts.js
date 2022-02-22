import axios from 'axios';
import * as React from 'react';
import useLocalStorage from './useLocalStorage';

const usePosts = () => {
    const storage = useLocalStorage();
    const [loading, setLoading] = React.useState(false);
    const [storedPosts, setStoredPosts] = React.useState([])
    const [posts, setPosts] = React.useState([]);
    const [error, setError] = React.useState(null);

    const getPosts = async () => {
        setLoading(true);
        try {
            const token = storage.get('@reactlab_token');
            const result = await axios.get(`${process.env.REACT_APP_API_URL}/posts`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (result.status >= 400) {
                throw new Error('Failed fetching posts');
            }

            setPosts(result.data);
            setStoredPosts(result.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    }

    const like = async (postId) => {
        try {
            const token = storage.get('@reactlab_token');
            const result = await axios.post(`${process.env.REACT_APP_API_URL}/posts/${postId}/like`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (result.status >= 400) {
                throw new Error('Failed liking posts');
            }

            const updatedPosts = posts?.map(post => {
                if (post.id === postId) {
                    return result.data;
                }

                return post;
            })

            setPosts(updatedPosts);
            setStoredPosts(updatedPosts);
        } catch (error) {
            console.log({ error });
        }
    }

    const filter = (search = '') => {
        if (!search) {
            setPosts(storedPosts);
        }

        const filteredPosts = storedPosts?.filter(post => post.content.toLowerCase().includes(search.toLowerCase()) || post.author.toLowerCase().includes(search.toLowerCase()));
        setPosts(filteredPosts);
    }

    return {
        getPosts,
        like,
        filter,
        posts,
        error,
        loading,
    }
}

export default usePosts;
