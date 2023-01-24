import { Button, Form, Input } from 'antd';
import React, { useCallback, useEffect } from 'react';
import useInput from '../hooks/useInput';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_COMMENT_REQUEST } from '../reducers/post';

const CommentForm = ({ post }) => {
    const dispatch = useDispatch();

    const id = useSelector((state) => state.user.me?.id);
    const { addCommentDone, addCommentLoading } = useSelector((state) => state.post);
    const [commentText, onChangeCommentText, setCommentText] = useInput('');

    useEffect(() => {
        if (addCommentDone) {
            setCommentText('');
        }
    }, [addCommentDone]);



    const onSubmitComment = useCallback(() => {
        console.log(post.id, commentText);
        dispatch({
            type: ADD_COMMENT_REQUEST,
            data: {
                content: commentText,
                postId: post.id,
                userId: id
            }
        })
    }, [commentText, id]);

    return (
        <Form onFinish={onSubmitComment}>
            <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4} />
            <Button type="primary" htmlType='submit'
                loading={addCommentLoading}
                style={{ marginTop: 10, float: "right", zIndex: 2 }}>삐악</Button>
        </Form>
    );
};

CommentForm.propType = {
    post: PropTypes.object.isRequired
}

export default CommentForm;