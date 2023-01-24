//post/[id].js
import { useSelector } from 'react-redux';
import Head from 'next/head';
import { useRouter } from 'next/router';
import AppLayout from '../../components/AppLayout';
import PostCard from '../../components/PostCard';
import { LOAD_POST_REQUEST } from './../../reducers/post';
import { LOAD_MY_INFO_REQUEST } from './../../reducers/user';
import { END } from 'redux-saga';
import wrapper from '../../store/configureStore';
import axios from 'axios';

const Post = () => {
    const router = useRouter();
    const { id } = router.query;
    const { singlePost } = useSelector((state) => state.post)

    // if (router.isFallback) {
    //     return <div>로딩중...</div>;
    // }

    return (
        <AppLayout>
            {singlePost &&
                <Head>
                    <title>
                        {singlePost.User.nickname}
                        님의 글
                    </title>
                    <meta name="description" content={singlePost.content} />
                    <meta property="og:title" content={`${singlePost.User.nickname}님의 게시글`} />
                    <meta property="og:description" content={singlePost.content} />
                    <meta property="og:image" content={singlePost.Images[0] ? singlePost.Images[0].src : 'http://macaronics.iptime.org/favicon.ico'} />
                    <meta property="og:url" content={`http://macaronics.iptime.org/post/${id}`} />
                </Head>
            }

            {singlePost && <PostCard key={id && id} post={singlePost} />}

            {singlePost == null && '등록된 게시글이 없습니다.'}

        </AppLayout>
    );
};


//getStaticProps  는 다이나믹 패스에서 사용하는데,
//다이나믹이니깐 어떤것을 만들어 줘야할지 모른다 따라서,
//다음과 해당 id 만 정적인 html 만들어 준다
// export async function getStaticPaths() {
//     return {
//         paths: [
//             { params: { id: '16' } },
//             { params: { id: '17' } },
//             { params: { id: '18' } },
//         ],
//         fallback: true,
//     };
// }


//getServerSideProps

// export const getStaticProps = wrapper.getStaticProps(async (context) => {
//     const cookie = context.req ? context.req.headers.cookie : '';

//     console.log("context    : ::: ", context);

//     axios.defaults.headers.Cookie = '';
//     if (context.req && cookie) {
//         axios.defaults.headers.Cookie = cookie;
//     }
//     context.store.dispatch({
//         type: LOAD_MY_INFO_REQUEST,
//     });
//     context.store.dispatch({
//         type: LOAD_POST_REQUEST,
//         data: context.params.id,
//     });
//     context.store.dispatch(END);
//     await context.store.sagaTask.toPromise();
// });

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

    store.dispatch({
        type: LOAD_POST_REQUEST,
        postId: req.url.replace('/post/', '')
    });


    store.dispatch(END);
    await store.sagaTask.toPromise();
})

export default Post;
