import React, { useState, useEffect } from "react";
import { useMutation } from "react-apollo-hooks";
import PropTypes from "prop-types";
import useInput from "../../Hooks/useInput";
import PostPresenter from "./PostPresenter";
import { TOGGLE_LIKE, ADD_COMMENT } from "./PostQueries";
import { toast } from "react-toastify";

const PostContainer = ({ id,
	user,
	files,
	likeCount,
	isLiked,
	comments,
	createdAt,
	caption,
	location
}) => {
	const [isLikedS, setIsLiked] = useState(isLiked);
	const [likeCountS, setLikeCount] = useState(likeCount);
	const [currentItem, setCurrentItem] = useState(0);
	const [selfComments, setSelfComments] = useState([]);
	const comment = useInput("");
	const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
		variables: {
			postId: id
		}
	})
	const [addCommentMutation] = useMutation(ADD_COMMENT, {
		variables: {
			postId: id,
			text: comment.value
		}
	})
	const slide = () => {
		const totalFiles = files.length;
		if (currentItem === totalFiles - 1) {
			setTimeout(() => setCurrentItem(0), 3000);
		} else {
			setTimeout(() => setCurrentItem(currentItem + 1), 3000);
		}
	};

	useEffect(() => {
		slide();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentItem]);

	const toggleLike = () => {
		toggleLikeMutation();
		if (isLikedS === true) {
			setIsLiked(false);
			setLikeCount(likeCountS - 1);
		} else {
			setIsLiked(true);
			setLikeCount(likeCountS + 1);
		}
	}


	const onKeyPress = async (e) => {
		const { which } = e;
		if (which === 13) {
			e.preventDefault();
			comment.setValue("");
			try {
				const { data: { addComment } } = await addCommentMutation();
				setSelfComments([...selfComments, addComment]);
			} catch {
				toast.error("Can`t send comment");
			}
		}
		return;
	}


	return <PostPresenter
		id={id}
		user={user}
		files={files}
		likeCount={likeCountS}
		isLiked={isLikedS}
		comments={comments}
		createdAt={createdAt}
		newComment={comment}
		setIsLiked={setIsLiked}
		setLikeCount={setLikeCount}
		caption={caption}
		location={location}
		currentItem={currentItem}
		toggleLike={toggleLike}
		onKeyPress={onKeyPress}
		selfComments={selfComments}
	/>;
}

PostContainer.prototype = {
	id: PropTypes.string.isRequired,
	user: PropTypes.shape({
		id: PropTypes.string.isRequired,
		avatar: PropTypes.string,
		username: PropTypes.string.isRequired
	}).isRequired,
	files: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
		url: PropTypes.string.isRequired
	})).isRequired,
	likeCount: PropTypes.number.isRequired,
	isLiked: PropTypes.number.isRequired,
	comments: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
		text: PropTypes.string.isRequired,
		user: PropTypes.shape({
			id: PropTypes.string.isRequired,
			username: PropTypes.string.isRequired
		}).isRequired
	})).isRequired,
	createdAt: PropTypes.string.isRequired,
	caption: PropTypes.string.isRequired,
	location: PropTypes.string,
};

export default PostContainer;
