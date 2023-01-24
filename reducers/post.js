//import shortid from 'shortid';
import produce from '../util/produce';
// import { faker } from '@faker-js/faker';
// faker.seed(123);

export const initialState = {
    mainPosts: [],
    imagePaths: [],
    singlePost: null,
    hasMorePosts: true,

    unlikePostLoading: false,
    unlikePostDone: false,
    unlikePostError: null,

    likePostLoading: false,
    likePostDone: false,
    likePostError: null,

    loadPostsLoading: false,
    loadPostsDone: false,
    loadPostsError: null,

    loadPostLoading: false,
    loadPostDone: false,
    loadPostError: null,

    addPostLoading: false,
    addPostDone: false,
    addPostError: null,

    removePostLoading: false,
    removePostDone: false,
    removePostError: null,

    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: null,

    uploadImagesLoading: false,
    uploadImagesDone: false,
    uploadImagesError: null,

    reTweetLoading: false,
    reTweetDone: false,
    reTweetError: null,

    updatePostLoading: false,
    updatePostDone: false,
    updatePostError: null,
}


// export const generateDummyPost = (number) => Array(10).fill().map(() => ({
//     id: shortid.generate(),
//     User: {
//         id: shortid.generate(),
//         nickname: faker.internet.userName()
//     },
//     content: faker.lorem.paragraph(),
//     Images: [{
//         id: shortid.generate(),
//         src: 'https://picsum.photos/600/400?random=' + Math.floor(Math.random() * 1000) + 1,
//         onerror: "https://via.placeholder.com/600x400"
//     },
//     {
//         id: shortid.generate(),
//         src: 'https://picsum.photos/600/400?random=' + Math.floor(Math.random() * 1000) + 1,
//         onerror: "https://via.placeholder.com/600x400"
//     }
//     ],
//     Comments: [{
//         id: shortid.generate(),
//         User: {
//             nickname: faker.internet.userName()
//         },
//         content: faker.lorem.paragraph()
//     }],

//     Likers: [
//         { id: 0 }
//     ]

// }));

// initialState.mainPosts = initialState.mainPosts.concat(
//     generateDummyPost(10)
// )




export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';


export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';


//특정 사용자 게시글
export const LOAD_USER_POSTS_REQUEST = 'LOAD_USER_POSTS_REQUEST';
export const LOAD_USER_POSTS_SUCCESS = 'LOAD_USER_POSTS_SUCCESS';
export const LOAD_USER_POSTS_FAILURE = 'LOAD_USER_POSTS_FAILURE';

//특정 해쉬 글
export const LOAD_HASHTAG_POSTS_REQUEST = 'LOAD_HASHTAG_POSTS_REQUEST';
export const LOAD_HASHTAG_POSTS_SUCCESS = 'LOAD_HASHTAG_POSTS_SUCCESS';
export const LOAD_HASHTAG_POSTS_FAILURE = 'LOAD_HASHTAG_POSTS_FAILURE';



//한개의 post 정보 가져오기
export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';




//글 수정 업데이 하기
export const UPDATE_POST_REQUEST = 'UPDATE_POST_REQUEST';
export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS';
export const UPDATE_POST_FAILURE = 'UPDATE_POST_FAILURE';





export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';


export const REMOVE_IMAGE = 'REMOVE_IMAGE';

export const RETWEET_REQUEST = 'RETWEET_REQUEST';
export const RETWEET_SUCCESS = 'RETWEET_SUCCESS';
export const RETWEET_FAILURE = 'RETWEET_FAILURE';




export const addPost = (data) => ({
    type: ADD_POST_REQUEST,
    data
});


export const addComment = (data) => ({
    type: ADD_COMMENT_REQUEST,
    data
});



// const dummyPost = (data) => ({
//     id: data.id,
//     content: data.content,
//     User: {
//         id: 1,
//         nickname: '마카로닉스'
//     },
//     Images: [],
//     Comments: []
// });

// const dummyComment = (data) => ({
//     id: shortid.generate(),
//     content: data,
//     User: {
//         id: 1,
//         nickname: '마카로닉스'
//     }
// });

//이전 상태를 액션을 통해 다음 상태로 만들어내는 함수(불변성은 지키면서)
const reducer = (state = initialState, action) => produce(state, (draft) => {

    switch (action.type) {

        //이미지 업로드
        case RETWEET_REQUEST:
            draft.reTweetLoading = true;
            draft.reTweetDone = false;
            draft.reTweetError = null;
            break;

        case RETWEET_SUCCESS: {
            draft.mainPosts.unshift(action.data);
            draft.reTweetLoading = false;
            draft.reTweetDone = true;
            break;
        }

        case RETWEET_FAILURE:
            draft.reTweetLoading = false;
            draft.reTweetError = action.error;
            break;



        //이미지는 서버에서 삭제처리 안해서 다음과 같이 프론트에서만 이미지 제거 처리
        case REMOVE_IMAGE:
            draft.imagePaths = draft.imagePaths.filter((v, i) => i != action.data);
            break;

        //이미지 업로드
        case UPLOAD_IMAGES_REQUEST:
            draft.uploadImagesLoading = true;
            draft.uploadImagesDone = false;
            draft.uploadImagesError = null;
            break;

        case UPLOAD_IMAGES_SUCCESS: {
            draft.imagePaths = draft.imagePaths.concat(action.data);
            draft.uploadImagesLoading = false;
            draft.uploadImagesDone = true;
            break;
        }

        case UPLOAD_IMAGES_FAILURE:
            draft.uploadImagesLoading = false;
            draft.uploadImagesError = action.error;
            break;



        //LIKE
        case LIKE_POST_REQUEST:
            draft.likePostLoading = true;
            draft.likePostDone = false;
            draft.likePostError = null;
            break;

        case LIKE_POST_SUCCESS: {
            const post = draft.mainPosts.find((v) => v.id === parseInt(action.data.PostId));
            post.Likers.push({ id: action.data.UserId });
            draft.likePostLoading = false;
            draft.likePostDone = true;
            break;
        }

        case LIKE_POST_FAILURE:
            draft.likePostLoading = false;
            draft.likePostError = action.error;
            break;


        //UN LIKE
        case UNLIKE_POST_REQUEST:
            draft.unlikePostLoading = true;
            draft.unlikePostDone = false;
            draft.unlikePostError = null;
            break;

        case UNLIKE_POST_SUCCESS: {
            const post = draft.mainPosts.find((v) => v.id === parseInt(action.data.PostId));
            post.Likers = post.Likers.filter((v) => v.id !== action.data.UserId);
            draft.unlikePostLoading = false;
            draft.unlikePostDone = true;
            break;
        }
        case UNLIKE_POST_FAILURE:
            draft.unlikePostLoading = false;
            draft.unlikePostError = action.error;
            break;



        //무한 스크롤 
        case LOAD_USER_POSTS_REQUEST:
        case LOAD_HASHTAG_POSTS_REQUEST:
        case LOAD_POSTS_REQUEST:
            draft.loadPostsLoading = true;
            draft.loadPostsDone = false;
            draft.loadPostsError = null;
            break;

        case LOAD_USER_POSTS_SUCCESS:
        case LOAD_HASHTAG_POSTS_SUCCESS:
        case LOAD_POSTS_SUCCESS:
            draft.loadPostsLoading = false;
            draft.loadPostsDone = true;
            draft.mainPosts = draft.mainPosts.concat(action.data);
            // console.log("무한 스크롤 : ", draft.mainPosts);
            //draft.mainPosts = action.data.concat(draft.mainPosts);
            draft.hasMorePosts = action.data.length === 10;
            break;

        case LOAD_USER_POSTS_FAILURE:
        case LOAD_HASHTAG_POSTS_FAILURE:
        case LOAD_POSTS_FAILURE:
            draft.loadPostsLoading = false;
            draft.loadPostsError = action.error;
            break;


        //한개의 POST 정보 불러오기
        case LOAD_POST_REQUEST:
            draft.loadPostLoading = true;
            draft.loadPostDone = false;
            draft.loadPostError = null;
            break;

        case LOAD_POST_SUCCESS:
            draft.loadPostLoading = false;
            draft.loadPostDone = true;
            draft.singlePost = action.data;
            break;

        case LOAD_POST_FAILURE:
            draft.loadPostLoading = false;
            draft.loadPostError = action.error;
            break;






        //글작성
        case ADD_POST_REQUEST:
            draft.addPostLoading = true;
            draft.addPostDone = false;
            draft.addPostError = null;
            break;

        case ADD_POST_SUCCESS:
            draft.addPostLoading = false;
            draft.addPostDone = true;
            //배열의 맨 앞에 요소를 추가함
            //console.log("*배열의 맨 앞에 요소를 추가함 : ", draft.mainPosts);
            //draft.mainPosts = action.data.concat(draft.mainPosts);
            draft.mainPosts.unshift(action.data);
            draft.imagePaths = [];
            break;

        case ADD_POST_FAILURE:
            draft.addPostLoading = false;
            draft.addPostError = action.error;
            break;



        //글삭제
        case REMOVE_POST_REQUEST:
            draft.removePostLoading = true;
            draft.removePostDone = false;
            draft.removePostError = null;
            break;

        case REMOVE_POST_SUCCESS:
            draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data);
            draft.removePostLoading = false;
            draft.removePostDone = true;
            break;

        case REMOVE_POST_FAILURE:
            draft.removePostLoading = false;
            draft.removePostError = action.error;
            break;


        //글수정
        case UPDATE_POST_REQUEST:
            draft.updatePostLoading = true;
            draft.updatePostDone = false;
            draft.updatePostError = null;
            break;

        case UPDATE_POST_SUCCESS:
            draft.updatePostLoading = false;
            draft.updatePostDone = true;
            draft.mainPosts.find((v) => v.id === action.data.PostId).content = action.data.content;
            break;

        case UPDATE_POST_FAILURE:
            draft.updatePostLoading = false;
            draft.updatePostError = action.error;
            break;




        //댓글 작성
        case ADD_COMMENT_REQUEST:
            draft.addCommentLoading = true;
            draft.addCommentDone = false;
            draft.addCommentError = null;
            break;


        case ADD_COMMENT_SUCCESS: {
            console.log(" 1. ADD_COMMENT_SUCCESS  :", action.data.PostId);
            const post = draft.mainPosts.find((v) => v.id === parseInt(action.data.PostId));
            console.log("2. ADD_COMMENT_SUCCESS  :", post);

            post.Comments.unshift(action.data);
            draft.addCommentLoading = false;
            draft.addCommentDone = true;
            break;

            // const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);
            // const post = state.mainPosts[postIndex];
            // post.Comments = [dummyComment(action.data.content), ...post.Comments];
            // const mainPosts = [...state.mainPosts];
            // mainPosts[postIndex] = post;

            // return {
            //     ...state,
            //     mainPosts,
            //     addCommentLoading: false,
            //     addCommentDone: true
            // }
        }

        case ADD_COMMENT_FAILURE:
            draft.addCommentLoading = false;
            draft.addCommentError = action.error;
            break;

        default:
            break;
    }
});




export default reducer;


