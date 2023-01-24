import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequestAction } from './../reducers/user';
import Link from 'next/link';

const UserProfile = () => {

    const dispatch = useDispatch();
    const { me, logOutLoading } = useSelector((state) => state.user);

    const onLogOut = useCallback(() => {
        dispatch(logoutRequestAction(false));
    }, []);


    return (
        <Card
            actions={[
                <div key="twit"><Link href={`/user/${me.id}`} prefetch={false} >트윗<br />{me.Posts.length}</Link></div>,
                <div key="followings"><Link href="/profile" prefetch={false}>팔로잉<br />{me.Followings.length}</Link></div >,
                <div key="follower"><Link href="/profile" prefetch={false} >팔로워<br />{me.Followers.length}</Link></div >,
            ]}
        >
            <Card.Meta
                avatar={<Avatar>{me.nickname}</Avatar>}
                title={me.nickname}
            />
            <Button className="mt-20" onClick={onLogOut} loading={logOutLoading}>로그아웃</Button>
        </Card>
    );
};

export default UserProfile;