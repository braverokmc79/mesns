import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { PlusOutlined } from '@ant-design/icons';
import ImagesZoom from "./ImagesZoom"
import styled from 'styled-components';
import { backURL } from '../config/config';

const ImgDiv = styled.div`
    display:flex !important;
    align-items: center;
    max-height:430px;
    justify-content: space-between;

    & > img{
     max-height:430px;
    }
`;


const BACK_URL = backURL + "/";

const PostImages = ({ images }) => {


    const [showImageZoom, setShowImagesZoom] = useState(false);

    const onZoom = useCallback(() => {
        setShowImagesZoom(true);
    }, []);


    const onClose = useCallback(() => {
        setShowImagesZoom(false);
    }, []);



    if (images.length === 1) {
        return (
            <ImgDiv>
                <img role="presentation" src={BACK_URL + images[0].src} alt={images[0].src} onClick={onZoom} width="49%" />
                {showImageZoom && <ImagesZoom ImageURL={BACK_URL} images={images} onClose={onClose} />}
            </ImgDiv>
        )
    } else if (images.length === 2) {
        return (
            <>
                <ImgDiv>
                    <img role="presentation" src={BACK_URL + images[0].src} alt={images[0].src} onClick={onZoom} style={{ width: "49%" }} />
                    <img role="presentation" src={BACK_URL + images[1].src} alt={images[1].src} onClick={onZoom} style={{ width: "49%" }} />
                    {showImageZoom && <ImagesZoom images={images} ImageURL={BACK_URL} onClose={onClose} />}
                </ImgDiv>
            </>
        )

    } else if (images.length > 2) {

        return (
            <>
                <ImgDiv style={{ width: "100%" }}>
                    <img role="presentation" src={BACK_URL + images[0].src} alt={images[0].src}
                        onClick={onZoom} style={{ width: "49%", display: `${showImageZoom ? 'none' : "inline-block"}` }} />

                    <div
                        role="presentation"
                        style={{
                            display: 'inline-block', textAlign: 'center', width: "49%",
                            verticalAlign: 'middle', position: "relative", top: "-50px",
                        }}
                    >
                        <div onClick={onZoom} style={{ cursor: "pointer" }}>  <PlusOutlined /></div>

                        <br />
                        {images.length - 1}
                        개의 사진 더보기

                        {showImageZoom && <ImagesZoom images={images} ImageURL={BACK_URL} onClose={onClose} />}
                    </div>
                </ImgDiv>
            </>
        );
    }

};



PostImages.propTypes = {
    images: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default PostImages;