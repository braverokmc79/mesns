import Head from 'next/head';
import React, { useCallback, useState, useEffect } from 'react';
import Router from 'next/router';
import AppLayout from '../components/AppLayout';
import { Form, Input, Checkbox, Button } from 'antd';
import styled from 'styled-components';
import { SIGN_UP_REQUEST, LOAD_MY_INFO_REQUEST } from './../reducers/user';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from "formik";
import useSimpleValidation from "../components/Validation/UseSimpleValidation";
import { END } from 'redux-saga';
import wrapper from '../store/configureStore';
import axios from 'axios';


const ErroMessage = styled.div`
    color:red;
`;

const SignUp = () => {
    const dispatch = useDispatch();
    const { signUpLoading, signUpDone, signUpError, me } = useSelector((state) => state.user);
    const { schema } = useSimpleValidation();
    const [joinState, setJoinState] = useState(true);


    useEffect(() => {
        if (me && me.id) {
            Router.replace("/");
        }
    }, [me && me.id]);


    useEffect(() => {
        if (!joinState && signUpDone) {
            setJoinState(true);
            alert("회원 가입을 축하 합니다.");
            Router.replace('/');
        }
    }, [signUpDone]);

    useEffect(() => {
        if (signUpError) {
            alert(signUpError);
        }
    }, [signUpError]);


    const [term, setTerm] = useState("");
    const [termError, setTermError] = useState(false);

    const onChangeTerm = useCallback((e) => {
        setTerm(e.target.checked);
        setTermError(!e.target.checked);
    }, [])


    const onSubmit = useCallback((values) => {
        console.log("submitForm  :", values);

        if (!term) {
            return setTermError(true);
        }
        setTimeout(() => {
            let dataToSubmit = {
                nickname: values.nickname,
                email: values.email,
                password: values.password
            };

            dispatch({
                type: SIGN_UP_REQUEST,
                data: dataToSubmit
            })
            setJoinState(false);
        }, 500);

    }, [term]);


    const initialValues = {
        email: '',
        nickname: '',
        password: '',
        passwordCheck: ''
    };

    return (

        <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={onSubmit}
        >
            {props => {
                const {
                    values,
                    touched,
                    errors,
                    dirty,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    handleReset,
                    isValid
                } = props;
                return (

                    <>
                        <AppLayout>
                            <Head>
                                <title>회원 가입 | NodeBird</title>
                            </Head>

                            <Form onFinish={handleSubmit}>
                                <div>
                                    <label htmlFor="email">이메일</label>
                                    <br />
                                    <Input name="email" id="email" type='email'
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={
                                            [
                                                "input",
                                                errors.email && touched.email ? "input-error" : null
                                            ].join(" ")
                                        }

                                    />

                                    {errors.email && touched.email && (
                                        <span className="error">{errors.email}</span>
                                    )}
                                </div>


                                <div>
                                    <label htmlFor="nickname">닉네임</label>
                                    <br />
                                    <Input name="nickname" id="nickname"
                                        value={values.nickname}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={
                                            [
                                                "input",
                                                errors.nickname && touched.nickname ? 'input-error' : null
                                            ].join(" ")
                                        }
                                        require="true" />
                                    {errors.nickname && touched.nickname && (
                                        <span className="error">{errors.nickname}</span>
                                    )}
                                </div>


                                <div>
                                    <label htmlFor="password">비밀번호</label>
                                    <br />
                                    <Input name="password" id="password" type="password" require="true"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={
                                            [
                                                "input",
                                                errors.password && touched.password ? 'input-error' : null
                                            ].join(" ")
                                        }
                                    />

                                    {errors.password && touched.password && (
                                        <span className="error">{errors.password}</span>
                                    )}
                                </div>

                                <div>
                                    <br />
                                    <label htmlFor="passwordCheck">비밀번호 확인</label>
                                    <Input name="passwordCheck" id="passwordCheck" type="password"
                                        value={values.passwordCheck}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={
                                            [
                                                "input",
                                                errors.passwordCheck && touched.passwordCheck ? 'input-error' : null
                                            ].join(" ")
                                        }
                                    />
                                    {errors.passwordCheck && touched.passwordCheck && (
                                        <span className="error">{errors.passwordCheck}</span>
                                    )}
                                </div>

                                {/* 
                                {passwordError && <ErroMessage>비밀번호가 일치하지 않습니다.</ErroMessage>} */
                                }

                                <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
                                    동의합니다.
                                </Checkbox>
                                {termError && <div style={{ color: 'red' }}>약관에 동의하셔야 합니다.</div>}

                                <div style={{ marginTop: 10 }}>
                                    <Button type="primary" htmlType='submit' loading={signUpLoading}>가입하기</Button>
                                </div>

                            </Form>
                        </AppLayout>
                    </>

                );
            }}

        </Formik >

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

export default SignUp;