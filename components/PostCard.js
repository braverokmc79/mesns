import React, { useState, useCallback } from 'react';
import { Card, Button, Avatar, Image, Popover, List, Space } from 'antd';
import { Comment } from '@ant-design/compatible';
import { RetweetOutlined, HeartOutlined, MessageOutlined, EllipsisOutlined, HeartTwoTone } from '@ant-design/icons';
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux';
import PostImages from './PostImages';
import CommentForm from './CommentForm';
import { createGlobalStyle } from 'styled-components';
import PostCardContent from './PostCardContent';
import { REMOVE_POST_REQUEST } from '../reducers/post';
import FollowButton from './FollowButton';
import { LIKE_POST_REQUEST, UNLIKE_POST_REQUEST, RETWEET_REQUEST, LOAD_POSTS_REQUEST, UPDATE_POST_REQUEST } from '../reducers/post';
import Link from 'next/link';
import moment from 'moment';



const Global = createGlobalStyle`
    .ant-card-actions{
     background: #eeeeee !important;
    }

    .ant-card-head-title{
        background: #f0f0f0;
        padding: 16px !important;
    }
`;

moment.locale("ko");


const PostCard = ({ post }) => {
    const dispatch = useDispatch();
    const { removePostLoading, mainPosts } = useSelector((state) => state.post);
    const [commentFormOpened, setCommentFormOpened] = useState(false);
    const id = useSelector((state) => state.user.me?.id);
    const liked = post.Likers.find((v) => v.id === id);
    const [editMode, setEditMode] = useState(false);


    const onLike = useCallback(() => {
        if (!id) return alert("로그인이 필요합니다.");

        dispatch({
            type: LIKE_POST_REQUEST,
            data: post.id
        })
    }, [id]);


    const onUnlike = useCallback(() => {
        if (!id) return alert("로그인이 필요합니다.");

        dispatch({
            type: UNLIKE_POST_REQUEST,
            data: post.id
        })
    }, [id]);


    const onToggleComment = useCallback(() => {
        setCommentFormOpened((prev) => !prev);
    }, []);


    const onRemovePost = useCallback(async () => {
        if (window.confirm("정말 삭제 하시겠습니까?")) {
            console.log(1);
            dispatch({
                type: REMOVE_POST_REQUEST,
                data: post.id
            });


            setTimeout(() => {
                location.reload();
            }, 300);

        }
    }, [post.id, mainPosts]);


    const onRetweet = useCallback(() => {
        if (!id) return alert("로그인이 필요합니다.");

        dispatch({
            type: RETWEET_REQUEST,
            data: post.id
        });

    }, [id]);



    const onClickUpdate = useCallback(() => {
        setEditMode(true);
    }, []);

    const onCancelUpdatePost = useCallback(() => {
        setEditMode(false);
    }, []);

    const onChangePost = useCallback((editText) => () => {
        dispatch({
            type: UPDATE_POST_REQUEST,
            data: {
                PostId: post.id,
                content: editText,
            },
        });
    }, [post]);


    const content = (
        <div>
            {id && post.User.id === id ? (

                <Space wrap>
                    {!post.RetweetId && <Button type='primary' info onClick={onClickUpdate} >수정</Button>}

                    <Button type='primary' danger loading={removePostLoading} onClick={onRemovePost}>삭제</Button>
                </Space>

            ) : (
                <Button>신고</Button>
            )
            }
        </div >
    );




    return (
        <div style={{ marginBottom: 50 }}>


            <Global />


            <Card key={post.Image}
                cover={post.Images[0] && <PostImages images={post.Images} />}
                actions={[
                    <RetweetOutlined key="retweet" onClick={onRetweet} />,

                    liked ? <HeartTwoTone key="heart" twoToneColor="red" onClick={onUnlike} /> :
                        <HeartOutlined key="heart" onClick={onLike} />,
                    <MessageOutlined key="comment" onClick={onToggleComment} />,

                    <Popover content={content} title="" key="popover" style={{ textAlign: "center" }}>
                        <EllipsisOutlined />
                    </Popover>

                ]}
                title={post.Retweet && `'${post.User.nickname}'님이 리트윗 하셨습니다.`}
                extra={id && <FollowButton post={post} />}
            >

                {post.RetweetId && post.Retweet ? (
                    <Card
                        cover={post.Retweet.Images[0] && <PostImages images={post.Retweet.Images} />}
                        style={{ background: '#eee' }}
                    >

                        <div style={{ float: 'right' }}>
                            {moment(post.createdAt).format('YYYY.MM.DD')}
                        </div>
                        <Card.Meta
                            avatar={
                                <Link href={`/user/${post.Retweet.User.id}`} prefetch={false} >
                                    <Avatar>{post.Retweet.User.nickname[0]}</Avatar>
                                </Link>
                            }
                            title={post.Retweet.User.nickname}
                            description={<PostCardContent editMode={editMode}
                                onChangePost={onChangePost}
                                onCancelUpdatePost={onCancelUpdatePost} postData={post.Retweet.content} />}
                        />

                    </Card>
                ) :
                    <>
                        <div style={{ float: 'right' }}>{moment(post.createdAt).format('YYYY.MM.DD')}</div>
                        <Card.Meta
                            avatar={
                                <Link href={`/user/${post.User.id}`} prefetch={false}>
                                    <Avatar>{post.User.nickname[0]}</Avatar>
                                </Link>
                            }
                            title={post.User.nickname}
                            description={<PostCardContent editMode={editMode}
                                onChangePost={onChangePost}
                                onCancelUpdatePost={onCancelUpdatePost} postData={post.content} />}
                        />
                    </>

                }
                <Image />
            </Card >





            {
                commentFormOpened && (
                    <div>

                        <CommentForm post={post} />
                        <List
                            header={`${post.Comments.length} 개의 댓글`}
                            itemLayout="horizontal"
                            dataSource={post.Comments}
                            renderItem={(item) => (
                                <li>
                                    <Comment
                                        author={item.User.nickname}
                                        avatar={
                                            <Link href={`/user/${item.User.id}`} prefetch={false}>
                                                <Avatar>{item.User.nickname[0]}</Avatar>
                                            </Link>
                                        }
                                        content={item.content}
                                    >

                                        <div style={{ float: 'right' }}>
                                            {moment(post.createdAt).format('YYYY.MM.DD')}
                                        </div>
                                    </Comment>
                                </li>
                            )}
                        />
                    </div>
                )
            }

            {/* <CommentForm />
            <Comments /> */}

        </div >
    );
};

PostCard.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.number,
        User: PropTypes.object,
        content: PropTypes.string,
        createdAt: PropTypes.string,
        Comment: PropTypes.arrayOf(PropTypes.object),
        Images: PropTypes.arrayOf(PropTypes.object),
        Likers: PropTypes.arrayOf(PropTypes.object),
        RetweetId: PropTypes.number,
        Retweet: PropTypes.objectOf(PropTypes.any),
        lastId: PropTypes.number
    }).isRequired
}

export default PostCard;