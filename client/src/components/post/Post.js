import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';
import Spinner from '../common/Spinner';
import { getPost } from '../../redux/actions/postActions';

const Post = (props) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getPost(props.match.params.id));
	}, []);

	const { post, loading } = useSelector((state) => state.post);
	let postContent;

	if (post === null || loading || Object.keys(post).length === 0) {
		postContent = <Spinner />;
	} else {
		postContent = (
			<div>
				<PostItem post={post} showActions={false} />
				<CommentForm postId={post._id} />
				<CommentFeed postId={post._id} comments={post.comments} />
			</div>
		);
	}

	return (
		<div className="post">
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<Link to="/feed" className="btn btn-light mb-3">
							Back To Feed
						</Link>
						{postContent}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Post;
