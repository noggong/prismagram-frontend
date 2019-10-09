import React, { useState } from "react";
import PropTypes from "prop-types";
import useInput from "../../Hooks/useInput";
import PostPresenter from "./PostPresenter";

const PostContainer = ({ id, user, files, likeCount, isLiked, comments, createdAt }) => {
	return <PostPresenter />;
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
	createdAt: PropTypes.string.isRequired
};

export default PostContainer;
