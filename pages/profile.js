import React, { useEffect, useState, useCallback } from 'react';
import AppLayout from './../components/AppLayout';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import FollowList from './../components/FollowList';
import NicknameEditForm from './../components/NicknameEditForm';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import { END } from 'redux-saga';
import wrapper from '../store/configureStore';
import axios from 'axios';
import useSWR from 'swr';
import { backURL } from '../config/config';

const fetcher = (url) => axios.get(url, { withCredentials: true }).then((result) => result.data);



const Profile = () => {
    const { me } = useSelector((state) => state.user);
    const [followersLimit, setFollowersLimit] = useState(3);
    const [followingsLimit, setFollowingsLimit] = useState(3);

    const { data: followingsData, error: followingError } = useSWR(`${backURL}/user/followings?limit=${followingsLimit}`, fetcher);
    const { data: followersData, error: followerError } = useSWR(`${backURL}/user/followers?limit=${followersLimit}`, fetcher);



    useEffect(() => {
        if (!(me && me.id)) {
            Router.replace('/');
        }
    }, [me && me.id])


    const loadMoreFollowings = useCallback(() => {
        setFollowingsLimit((prev) => prev + 3);
    }, []);


    const loadMoreFollowers = useCallback(() => {
        setFollowersLimit((prev) => prev + 3);
    }, []);


    if (!me) {
        return '내 정보 로딩중...';
    }

    if (followerError || followingError) {
        console.error(followerError || followingError);
        return <div>팔로잉/팔로워 로딩 중 에러가 발생합니다.</div>;
    }

    return (
        <>
            <Head>
                <title>프로필 | NodeBird</title>
            </Head>
            <AppLayout>
                <NicknameEditForm />
                <div style={{ marginBottom: 20 }}></div>
                {/* <FollowList header="팔로잉" data={me.Followings} />
                <FollowList header="팔로워" data={me.Followers} /> */}

                { followingsData &&
                   <FollowList header="팔로잉" data={followingsData} onClickMore={loadMoreFollowings} loading={!followingsData && !followingError} />
                 }
                {followersData && 
                    <FollowList header="팔로워" data={followersData} onClickMore={loadMoreFollowers} loading={!followersData && !followerError} />
                 }
            </AppLayout>
        </>
    );
};


//새로 고침시 유지
export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res, ...etc }) => {
    const cookie = req ? req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (req && cookie) {
        axios.defaults.headers.Cookie = cookie;
    }

    store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
    });

    store.dispatch(END);
    await store.sagaTask.toPromise();
})

export default Profile;