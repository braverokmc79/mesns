import React, { useCallback, useEffect, useRef } from 'react';
import { Form, Input, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { addPost, ADD_POST_REQUEST, UPLOAD_IMAGES_REQUEST, REMOVE_IMAGE } from '../reducers/post';
import useInput from '../hooks/useInput';
import { backURL } from '../config/config';

const PostForm = () => {
    const { imagePaths, addPostDone, addPostLoading, addPostError, LOAD_POSTS_REQUEST, mainPosts } = useSelector((state) => state.post);
    const dispatch = useDispatch();
    const imageInput = useRef();

    const [text, onChangeText, setText] = useInput('');

    useEffect(() => {
        if (addPostDone) {
            setText('');
        }
    }, [addPostDone])

    useEffect(() => {
        if (addPostError) {
            alert(addPostError);
        }
    }, [addPostError])

    const onSubmit = useCallback(() => {
        if (!text || !text.trim()) {
            return alert('게시글을 작성하세요.');
        }

        //이미지 주소까지 같이 업로드
        const formData = new FormData();
        imagePaths.forEach((p) => {
            formData.append('image', p);
        });

        formData.append('content', text);
        //현재 이미지가 아니라 이미지주소라 formData 를 사용하지 않아도 되나 현재 nodejs 에서
        //upload.none() 사용하기 위해 FormData 데이터 전송 처리
        dispatch({
            type: ADD_POST_REQUEST,
            data: formData
        });

        //setText("");


        setTimeout(() => {
            location.reload();
        }, 300);


    }, [text, imagePaths, mainPosts]);



    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    }, [imageInput.current]);


    const onChangeImages = useCallback((e) => {
        console.log('images', e.target.files);
        const imagesFormData = new FormData();

        //e.target.files 이   forEach   메서드가 없기 때문에  배열의    [].forEach.call를 빌려써서 사용한다.
        [].forEach.call(e.target.files, (f) => {
            imagesFormData.append('image', f);
        });

        dispatch({
            type: UPLOAD_IMAGES_REQUEST,
            data: imagesFormData
        });

    }, []);


    //리스트 배열에서 인덱스값 파라미터 를 가져오려면 고차함수 사용
    const onRemoveImage = useCallback((index) => () => {
        dispatch({
            type: REMOVE_IMAGE,
            data: index
        })
    });


    return (
        <Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data" onFinish={onSubmit}>
            <Input.TextArea
                value={text}
                onChange={onChangeText}
                maxLength={140}
                placeholder="어떤 신기한 일이 있었나요?"
            />

            <div className='mt-5'>
                <input type="file" name="image" multiple hidden ref={imageInput} onChange={onChangeImages} style={{ display: "none" }} />
                <Button onClick={onClickImageUpload} style={{ marginBottom: '5px' }}>이미지 업로드</Button>


                <Button type="primary" htmlType='submit' style={{ float: 'right' }} loading={addPostLoading}   >글작성</Button>
            </div>
            <div>
                {
                    imagePaths.map((v, i) => (
                        <div key={v} style={{ display: "inline-block" }}>
                            <img src={`${backURL}/${v}`} style={{ width: 'auto', marginRight: '5px', height: '125px' }} alt={v} />
                            <div>
                                <Button onClick={onRemoveImage(i)}>제거</Button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </Form>
    );
};

export default PostForm;