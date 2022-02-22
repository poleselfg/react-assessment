import './Posts.styles.css';
import * as React from 'react';
import withAccount from '../../hoc/withAuthorization';
import usePosts from '../../hooks/usePosts';

const Posts = () => {
    const { getPosts, like, filter, posts, error } = usePosts();

    const likePost = React.useCallback((postId) => {
        like(postId);
    }, [posts]);

    const filterPosts = React.useCallback((evt) => {
        filter(evt.target.value);
    }, [posts])

    React.useEffect(() => {
        getPosts();
    }, []);

    return <div className="container">
        <div className="search">
            <input placeholder="Search" onChange={filterPosts} />
        </div>
        {posts?.map((post) => <div className="card" key={post.id}>
            <img className="card-image" src={post.image} alt={`post by ${post.author}`} />
            <span>{post.author}</span>
            <p>{post.content}</p>
            <span>🗣{post.comments} Comments</span>
            <span><button className="btn-like" onClick={() => likePost(post.id)}>❤️</button>{post.likes}</span>
        </div>)}
    </div>
}

export default withAccount(Posts);
