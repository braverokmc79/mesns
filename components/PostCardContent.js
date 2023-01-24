import React, { useCallback, useState, useEffect } from 'react';
import { Input, Button, Space } from 'antd';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useSelector } from 'react-redux';

const { TextArea } = Input;
const PostCardContent = ({ postData, editMode, onChangePost, onCancelUpdatePost }) => {
    const { updatePostLoading, updatePostDone } = useSelector((state) => state.post);
    const [editText, setEditText] = useState(postData);

    const onChangeText = useCallback((e) => {
        setEditText(e.target.value);
    });

    useEffect(() => {
        if (updatePostDone) {
            onCancelUpdatePost();
        }
    }, [updatePostDone]);




    return (
        <div>
            {
                editMode ? (
                    <>
                        <TextArea value={editText} onChange={onChangeText} />

                        <Space wrap>
                            <Button type='primary' info loading={updatePostLoading} onClick={onChangePost(editText)} > 수정</Button>
                            <Button type='primary' danger onClick={onCancelUpdatePost}  >취소</Button>
                        </Space>
                    </>
                ) :

                    postData && postData.split(/(#[^\s#]+)/g).map((v, index) => {
                        if (v.match(/(#[^\s#]+)/)) {
                            return <Link key={index} href={`/hashtag/${v.slice(1)}`} prefetch={false} >{v}</Link>
                        }
                        return v;
                    })
            }
        </div >
    );
};

PostCardContent.propTypes = {
    postData: PropTypes.string.isRequired,
    editMode: PropTypes.bool,
    onCancelUpdatePost: PropTypes.func.isRequired
}

PostCardContent.defaultProps = {
    editMode: false
}


export default PostCardContent;