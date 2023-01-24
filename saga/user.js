import { all, fork, put, takeLatest, delay, call, throttle } from 'redux-saga/effects';
import axios from 'axios';
import {
    LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE,
    LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE,
    SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE,
    FOLLOW_REQUEST, FOLLOW_SUCCESS, FOLLOW_FAILURE,
    UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS, UNFOLLOW_FAILURE,
    LOAD_MY_INFO_REQUEST, LOAD_MY_INFO_SUCCESS, LOAD_MY_INFO_FAILURE,
    CHANGE_NICKNAME_REQUEST, CHANGE_NICKNAME_SUCCESS, CHANGE_NICKNAME_FAILURE,
    LOAD_FOLLOWERS_SUCCESS, LOAD_FOLLOWERS_FAILURE, LOAD_FOLLOWERS_REQUEST,
    LOAD_FOLLOWINGS_REQUEST, LOAD_FOLLOWINGS_SUCCESS, LOAD_FOLLOWINGS_FAILURE,
    REMOVE_FOLLOW_REQUEST, REMOVE_FOLLOW_SUCCESS, REMOVE_FOLLOW_FAILURE,
    LOAD_USER_INFO_REQUEST, LOAD_USER_INFO_SUCCESS, LOAD_USER_INFO_FAILURE,

} from '../reducers/user';


//팔로워 목록 가져오기
function loadFollowersAPI(data) {
    return axios.get('/user/followers', data);
}
function* loadFollowers(action) {
    try {
        const result = yield call(loadFollowersAPI, action.data)

        yield put({
            type: LOAD_FOLLOWERS_SUCCESS,
            data: result.data
        });

    } catch (err) {
        yield put({
            type: LOAD_FOLLOWERS_FAILURE,
            error: err.response.data
        });
    }
}
function* watchLoadFollowers() {
    yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}


//팔로잉 목록 가져오기
function loadFollowingsAPI(data) {
    return axios.get('/user/followings', data);
}
function* loadFollowings(action) {
    try {
        const result = yield call(loadFollowingsAPI, action.data)

        yield put({
            type: LOAD_FOLLOWINGS_SUCCESS,
            data: result.data
        });

    } catch (err) {
        yield put({
            type: LOAD_FOLLOWINGS_FAILURE,
            error: err.response.data
        });
    }
}
function* watchLoadFollowings() {
    yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}




//닉네임 변경
function changeNicknameAPI(data) {
    return axios.patch('/user/nickname', { nickname: data });
}
function* changeNickname(action) {
    try {
        const result = yield call(changeNicknameAPI, action.data)

        yield put({
            type: CHANGE_NICKNAME_SUCCESS,
            data: result.data
        });

    } catch (err) {
        yield put({
            type: CHANGE_NICKNAME_FAILURE,
            error: err.response.data
        });
    }
}
function* watchChangeNickname() {
    yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNickname);
}




//브라우저 새로고침시  나의정보 가져오기
function loadMyInfoAPI() {
    return axios.get('/user');
}
function* loadMyInfo(action) {
    try {
        const result = yield call(loadMyInfoAPI)

        yield put({
            type: LOAD_MY_INFO_SUCCESS,
            data: result.data
        });

    } catch (err) {
        yield put({
            type: LOAD_MY_INFO_FAILURE,
            error: err.response.data
        });
    }
}
function* watchLoadMyInfo() {
    yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}


// 유저정보 가져오기
function loadUserInfoAPI(userId) {
    //console.log("사가 유저 정보 가져오기  : ", userId);
    return axios.get(`/user/${userId}`);
}
function* loadUserInfo(action) {
    try {
        const result = yield call(loadUserInfoAPI, action.data);

        yield put({
            type: LOAD_USER_INFO_SUCCESS,
            data: result.data
        });

    } catch (err) {
        yield put({
            type: LOAD_USER_INFO_FAILURE,
            error: err.response.data
        });
    }
}
function* watchLoadUserInfo() {
    yield takeLatest(LOAD_USER_INFO_REQUEST, loadUserInfo);
}





//팔로우 
function followAPI(data) {
    return axios.patch(`/user/${data}/follow`);
}
function* follow(action) {
    try {
        const result = yield call(followAPI, action.data);

        yield put({
            type: FOLLOW_SUCCESS,
            data: result.data
        });

    } catch (err) {
        yield put({
            type: FOLLOW_FAILURE,
            error: err.response.data
        });
    }
}
function* watchFollow() {
    yield takeLatest(FOLLOW_REQUEST, follow);
}



//언팔로우 => 팔로잉 제거
function unfollowAPI(data) {
    return axios.delete(`/user/${data}/follow`);
}

function* unfollow(action) {
    try {
        const result = yield call(unfollowAPI, action.data);

        yield put({
            type: UNFOLLOW_SUCCESS,
            data: result.data
        });

    } catch (err) {
        yield put({
            type: UNFOLLOW_FAILURE,
            error: err.response.data
        });
    }
}
function* watchUnFollow() {
    yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}


//팔로워 차단 => 팔로워 제거
function removeFollowAPI(data) {
    return axios.delete(`/user/follower/${data}`);
}

function* removeFollow(action) {
    try {
        const result = yield call(removeFollowAPI, action.data);

        yield put({
            type: REMOVE_FOLLOW_SUCCESS,
            data: result.data
        });

    } catch (err) {
        yield put({
            type: REMOVE_FOLLOW_FAILURE,
            error: err.response.data
        });
    }
}
function* watchRemoveFollow() {
    yield takeLatest(REMOVE_FOLLOW_REQUEST, removeFollow);
}






//1-1.로그인 처리
function logInAPI(data) {
    return axios.post('/user/login', data);
}


// const l = login({ type: "LOG_IN_REQUEST", data: { id: 'test@gmail.com' } });
// l.next();
// l.next();

//1-2.로그인 처리
function* login(action) {
    //put 을 dispatch
    //call 은 동기 함수 호출
    //fork 는 비동기 함수 호출
    try {

        const result = yield call(logInAPI, action.data);
        //yield delay(1000);

        yield put({
            type: LOG_IN_SUCCESS,
            data: result.data
        });

        console.log("5. 미들웨어로 사가 로그인 호출 result.data  : ", result.data);

    } catch (err) {
        yield put({
            type: LOG_IN_FAILURE,
            error: err.response.data
        });
    }
}

//1-3 로그인 처리
function* watchLogIn() {
    //LOG_IN 실행 될때 까지 기다리겠다.
    //console.log("2. watchLogIn ");
    yield takeLatest(LOG_IN_REQUEST, login);
}







//2-1.로그아웃 처리
function logOutAPI() {
    console.log(" 로그 아웃 !");
    return axios.post('/user/logout');
}



//2-2.로그아웃 처리
function* logOut(action) {
    //put 을 dispatch
    //call 은 동기 함수 호출
    //fork 는 비동기 함수 호출
    try {

        yield call(logOutAPI);

        yield put({
            type: LOG_OUT_SUCCESS
        });
    } catch (err) {
        yield put({
            type: LOG_OUT_FAILURE,
            error: err.response.data
        });
    }
}

//2-3 로그아웃 처리
function* watchLogOut() {
    yield takeLatest(LOG_OUT_REQUEST, logOut);
}









//3. 회원가입
function signUpAPI(data) {
    return axios.post('/user', data);
}

function* signUp(action) {
    try {
        const result = yield call(signUpAPI, action.data);
        //yield delay(1000);
        console.log(" 회원 가입  : ", result);

        yield put({
            type: SIGN_UP_SUCCESS,
        });

    } catch (err) {
        console.log(" 사가 에러 : ", err.response.data);
        yield put({
            type: SIGN_UP_FAILURE,
            error: err.response.data
        });
    }
}


function* watchSignUp() {
    yield takeLatest(SIGN_UP_REQUEST, signUp);
}





//all 하면 한방에 배열로 적은 함수들이 실행처리 된다.
//fork , call 로 실행한다. all 은 fork 나 call 을 동시에 실행시키도록 한다.
//call 은 동기 함수 호출
//fork 는 비동기 함수 호출
export default function* userSaga() {
    yield all([
        fork(watchLoadFollowers),
        fork(watchLoadFollowings),
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchFollow),
        fork(watchUnFollow),
        fork(watchSignUp),
        fork(watchLoadUserInfo),
        fork(watchLoadMyInfo),
        fork(watchChangeNickname),
        fork(watchRemoveFollow),
    ])
}

