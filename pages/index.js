
import React, { useEffect } from 'react';
import AppLayout from './../components/AppLayout';
import { useSelector, useDispatch } from 'react-redux';
import PostCard from './../components/PostCard';
import PostForm from './../components/PostForm';
import { LOAD_MY_INFO_REQUEST } from './../reducers/user';
import { LOAD_POSTS_REQUEST } from './../reducers/post';
import { END } from 'redux-saga';
import wrapper from '../store/configureStore';
import axios from 'axios';


const Home = () => {
    const dispatch = useDispatch();
    const { me } = useSelector((state) => state.user);
    const { mainPosts, hasMorePosts, loadPostsLoading, reTweetError, reTweetDone } = useSelector((state) => state.post);

    useEffect(() => {
        if (reTweetError) {
            return alert(reTweetError);
        }
    }, [reTweetError]);

    useEffect(() => {
        if (reTweetDone) {
            alert("리트윗 되었습니다.");
        }
    }, [reTweetDone]);

    useEffect(() => {
        function onScroll() {
            if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
                // console.log("hasMorePosts && !loadPostsLoading : ", hasMorePosts, loadPostsLoading);

                if (hasMorePosts && !loadPostsLoading) {
                    const lastId = mainPosts[mainPosts.length - 1]?.id;
                    // console.log(" lastId  : ", lastId);
                    dispatch({
                        type: LOAD_POSTS_REQUEST,
                        lastId
                    })
                }
            }
        }

        window.addEventListener('scroll', onScroll);
        //항상 반환처리시 이벤트를 제거해야지 메모리상에 낭비를 줄일 수 있다.
        return () => {
            window.removeEventListener('scroll', onScroll);
        }
    }, [hasMorePosts, loadPostsLoading, mainPosts]);


    return (
        <AppLayout>
            {me && <PostForm />}
            {mainPosts && mainPosts.map((post) => <PostCard key={post.id} post={post} />)}
        </AppLayout>
    );
};

// 서버사이드 렌더링 : 프론트 서버가 직접 요청하기 때문에 withCredentials문제 다시 발생하므로 브러우저 대신 cookie를 보내줘야함.
//home 실행되기전에 가장 먼저 실행 된다.
//초기 화면 랜더될때에는 리덕스에 데이터가 채워진체로 실행
//다음 코드는 프론트 서버에서 실행
//도메인이 다르면 쿠키전달 안된다.
export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res, ...etc }) => {

    //console.log('getServerSideProps start');

    //서버에 쿠키가 전달이 안된다. 따라서 새로고침시 로그인 풀리는 현상
    //따라서 다음과 같은 코드로 서버에 쿠키값을 보내는 처리를 한다.
    // console.log(" store  :", store);

    const cookie = req ? req.headers.cookie : '';
    axios.defaults.headers.Cookie = ''; //*** 쿠키가 공유될수 있으므로 쿠키 초기화 필수
    if (req && cookie) { //서버일때와 쿠키가 존재할때만  실행
        axios.defaults.headers.Cookie = cookie;
    }

    //console.log(" req cookie :", cookie);


    store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
    });


    store.dispatch({
        type: LOAD_POSTS_REQUEST
    });

    //다음 코드는 nextjs  문서
    store.dispatch(END);
    //console.log('getServerSideProps end');
    await store.sagaTask.toPromise();


    return { props: { data: 123 } }
})

export default Home;

