import produce from '../util/produce';

export const initialState = {
    unfollowLoading: false,//언팔로우 시도중
    unfollowDone: false,
    unfollowError: null,

    removeFollowLoading: false,//팔로워 차단 시도중
    removeFollowDone: false,
    removeFollowError: null,

    followLoading: false,//팔로우 시도중
    followDone: false,
    followError: null,

    logInLoading: false,//로그인 시도중
    logInDone: false,
    logInError: null,

    logOutLoading: false, //로그아웃 시도중
    logOutDone: false,
    logOutError: null,

    signUpLoading: false, //회원가입 시도중
    signUpDone: false,
    signUpError: null,

    changeNicknameLoading: false, //닉네임 변경
    changeNicknameDone: false,
    changeNicknameError: null,

    loadMyInfoLoading: false, //브라우저 새로고침시  나의 정보 가져오기
    loadMyInfoDone: false,
    loadMyInfoError: null,

    loadUserInfoLoading: false, //브라우저 새로고침시  유저정보 가져오기
    loadUserInfoDone: false,
    loadUserInfoError: null,

    loadFollowersLoading: false, //팔로워 목록 가져오기
    loadFollowersDone: false,
    loadFollowersError: null,

    loadFollowingsLoading: false, //팔로잉 목록 가져오기
    loadFollowingsDone: false,
    loadFollowingsError: null,


    me: null,
    userInfo: null
}


export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const CHANGE_NICKNAME_REQUEST = "CHANGE_NICKNAME_REQUEST";
export const CHANGE_NICKNAME_SUCCESS = "CHANGE_NICKNAME_SUCCESS";
export const CHANGE_NICKNAME_FAILURE = "CHANGE_NICKNAME_FAILURE";

export const FOLLOW_REQUEST = "FOLLOW_REQUEST";
export const FOLLOW_SUCCESS = "FOLLOW_SUCCESS";
export const FOLLOW_FAILURE = "FOLLOW_FAILURE";

//팔로잉 제거
export const UNFOLLOW_REQUEST = "UNFOLLOW_REQUEST";
export const UNFOLLOW_SUCCESS = "UNFOLLOW_SUCCESS";
export const UNFOLLOW_FAILURE = "UNFOLLOW_FAILURE";

//팔로워 차단  = > 팔로워 제거
export const REMOVE_FOLLOW_REQUEST = "REMOVE_FOLLOW_REQUEST";
export const REMOVE_FOLLOW_SUCCESS = "REMOVE_FOLLOW_SUCCESS";
export const REMOVE_FOLLOW_FAILURE = "REMOVE_FOLLOW_FAILURE";



export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';

export const LOAD_MY_INFO_REQUEST = "LOAD_MY_INFO_REQUEST";
export const LOAD_MY_INFO_SUCCESS = "LOAD_MY_INFO_SUCCESS";
export const LOAD_MY_INFO_FAILURE = "LOAD_MY_INFO_FAILURE";

export const LOAD_USER_INFO_REQUEST = "LOAD_USER_INFO_REQUEST";
export const LOAD_USER_INFO_SUCCESS = "LOAD_USER_INFO_SUCCESS";
export const LOAD_USER_INFO_FAILURE = "LOAD_USER_INFO_FAILURE";


export const LOAD_FOLLOWERS_REQUEST = "LOAD_FOLLOWERS_REQUEST";
export const LOAD_FOLLOWERS_SUCCESS = "LOAD_FOLLOWERS_SUCCESS";
export const LOAD_FOLLOWERS_FAILURE = "LOAD_FOLLOWERS_FAILURE";

export const LOAD_FOLLOWINGS_REQUEST = "LOAD_FOLLOWINGS_REQUEST";
export const LOAD_FOLLOWINGS_SUCCESS = "LOAD_FOLLOWINGS_SUCCESS";
export const LOAD_FOLLOWINGS_FAILURE = "LOAD_FOLLOWINGS_FAILURE";


export const loginRequestAction = (data) => {
    return {
        type: LOG_IN_REQUEST,
        data
    }
}

export const logoutRequestAction = () => {
    return {
        type: LOG_OUT_REQUEST
    }
}




const reducer = (state = initialState, action) => produce(state, (draft) => {

    switch (action.type) {

        //팔로워 목록 가져오기
        case LOAD_FOLLOWERS_REQUEST:
            draft.loadFollowersLoading = true;
            draft.loadFollowersDone = false;
            draft.loadFollowersError = null;
            break;

        case LOAD_FOLLOWERS_SUCCESS:
            draft.loadFollowersLoading = false;
            draft.loadFollowersDone = true;
            draft.me.Followers = action.data;
            break;

        case LOAD_FOLLOWERS_FAILURE:
            draft.loadFollowersLoading = false;
            draft.loadFollowersError = action.error;
            break;


        //팔로잉 목록 가져오기
        case LOAD_FOLLOWINGS_REQUEST:
            draft.loadFollowingsLoading = true;
            draft.loadFollowingsDone = false;
            draft.loadFollowingsError = null;
            break;

        case LOAD_FOLLOWINGS_SUCCESS:
            draft.loadFollowingsLoading = false;
            draft.loadFollowingsDone = true;
            draft.me.Followings = action.data
            break;

        case LOAD_FOLLOWINGS_FAILURE:
            draft.loadFollowingsLoading = false;
            draft.loadFollowingsError = action.error;
            break;



        //브라우저 새로고침시  나의 정보 가져오기
        case LOAD_MY_INFO_REQUEST:
            draft.loadMyInfoLoading = true;
            draft.loadMyInfoDone = false;
            draft.loadMyInfoError = null;
            break;

        case LOAD_MY_INFO_SUCCESS:
            draft.loadMyInfoLoading = false;
            draft.loadMyInfoDone = true;
            draft.me = action.data
            break;

        case LOAD_MY_INFO_FAILURE:
            draft.loadMyInfoLoading = false;
            draft.loadMyInfoError = action.error;
            break;


        //브라우저 새로고침시  유저정보 가져오기
        case LOAD_USER_INFO_REQUEST:
            draft.loadUserInfoLoading = true;
            draft.loadUserInfoDone = false;
            draft.loadUserInfoError = null;
            break;

        case LOAD_USER_INFO_SUCCESS:
            draft.loadUserInfoLoading = false;
            draft.loadUserInfoDone = true;
            draft.userInfo = action.data
            break;

        case LOAD_USER_INFO_FAILURE:
            draft.loadUserInfoLoading = false;
            draft.loadUserInfoError = action.error;
            break;



        //팔로우
        case FOLLOW_REQUEST:
            draft.followLoading = true;
            draft.followDone = false;
            draft.followError = null;
            break;

        case FOLLOW_SUCCESS:
            draft.followLoading = false;
            draft.followDone = true;
            draft.me.Followings.push({ id: action.data.UserId });
            break;

        case FOLLOW_FAILURE:
            draft.followLoading = false;
            draft.followError = action.error;
            break;

        //언팔로우 => 팔로잉 제거
        case UNFOLLOW_REQUEST:
            draft.unfollowLoading = true;
            draft.unfollowDone = false;
            draft.unfollowError = null;
            break;

        case UNFOLLOW_SUCCESS:
            draft.unfollowLoading = false;
            draft.unfollowDone = true;
            draft.me.Followings = draft.me.Followings.filter((v) => v.id !== action.data.UserId);
            break;

        case UNFOLLOW_FAILURE:
            draft.unfollowLoading = false;
            draft.unfollowError = action.error;
            break;


        //팔로워 차단 => 팔로워 제거
        case REMOVE_FOLLOW_REQUEST:
            draft.removeFollowLoading = true;
            draft.removeFollowDone = false;
            draft.removeFollowError = null;
            break;

        case REMOVE_FOLLOW_SUCCESS:
            draft.removeFollowLoading = false;
            draft.removeFollowDone = true;
            draft.me.Followers = draft.me.Followers.filter((v) => v.id !== action.data.UserId);
            break;

        case REMOVE_FOLLOW_FAILURE:
            draft.removeFollowLoading = false;
            draft.removeFollowError = action.error;
            break;




        //로그인
        case LOG_IN_REQUEST:
            draft.logInLoading = true;
            draft.logInDone = false;
            draft.logInError = null;
            break;

        case LOG_IN_SUCCESS:
            draft.logInLoading = false;
            draft.logInDone = true;
            draft.me = action.data;
            break;

        case LOG_IN_FAILURE:
            draft.logInLoading = false;
            draft.logInError = action.error;
            break;



        //로그 아웃
        case LOG_OUT_REQUEST:
            draft.logOutLoading = true;
            draft.logOutDone = false;
            draft.logOutError = null;
            break;

        case LOG_OUT_SUCCESS:
            draft.logOutLoading = false;
            draft.logOutDone = true;
            draft.me = null;
            break;

        case LOG_OUT_FAILURE:
            draft.logOutLoading = false;
            draft.logOutError = action.error;
            draft;



        //회원가입
        case SIGN_UP_REQUEST:
            console.log(" 회원 가입 리듀서 ");
            draft.signUpLoading = true;
            draft.signUpDone = false;
            draft.signUpError = null;
            break;

        case SIGN_UP_SUCCESS:
            draft.signUpLoading = false;
            draft.signUpDone = true;
            break;

        case SIGN_UP_FAILURE:
            draft.signUpLoading = false;
            draft.signUpError = action.error;
            break;


        //닉네임변경
        case CHANGE_NICKNAME_REQUEST:
            draft.changeNicknameLoading = true;
            draft.changeNicknameDone = false;
            draft.changeNicknameError = null;
            break;

        case CHANGE_NICKNAME_SUCCESS:
            draft.me.nickname = action.data.nickname;
            draft.changeNicknameLoading = false;
            draft.changeNicknameDone = true;
            break;

        case CHANGE_NICKNAME_FAILURE:
            draft.changeNicknameLoading = false;
            draft.changeNicknameError = action.error;
            break;



        //게시글 수 숫자 증가
        case ADD_POST_TO_ME:
            draft.me.Posts.unshift({ id: action.data });
            break;

        // return {
        //     ...state,
        //     me: {
        //         ...state.me,
        //         Posts: [{ id: action.data }, ...state.me.Posts]
        //     }
        // };


        //게시글 수 숫자 감소
        case REMOVE_POST_OF_ME:
            draft.me.Posts = draft.me.Posts.filter((v) => v.id !== action.data);
            break;

        // return {
        //     ...state,
        //     me: {
        //         ...state.me,
        //         Posts: state.me.Posts.filter((v) => v.id !== action.data),
        //     }
        // }

        default:
            break;
    }



});


export default reducer;


