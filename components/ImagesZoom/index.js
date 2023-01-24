import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slick from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Overlay, Global, Header, SlickWrapper, ImageWrapper, Indicator } from "./styles";




const ImagesZoom = ({ images, onClose, ImageURL }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        //autoplay: true,
        autoplayspeed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        pauseOnHover: true,

    };
    const [currentSlide, setCurrentSlide] = useState(0);


    console.log(" ImageURL : ", ImageURL);

    return (
        <Overlay>
            <Global />
            <Header>
                <h1>상세 이미지 {images.length}</h1>
                <button onClick={onClose} >x</button>
            </Header>

            <SlickWrapper>
                <div>
                    <Slick
                        // settings={settings}
                        initialSlide={0}
                        //afterChange={(slide) => setCurrentSlide(slide)}
                        beforeChange={(slide) => setCurrentSlide(slide)}
                        infinite={true}
                        dots={true}
                        arrows={true}
                        slidesToShow={1}
                        slidesToScroll={1}
                    >
                        {images && images.map((v) => {
                            return (
                                <ImageWrapper key={v.src}>
                                    <img src={ImageURL + v.src} alt={v.src} />
                                </ImageWrapper>
                            )
                        })}
                    </Slick>

                    <Indicator style={{ textAlign: 'center' }}>
                        <div>
                            {currentSlide + 1}
                            {' / '}
                            {images.length}
                        </div>
                    </Indicator>
                </div>
            </SlickWrapper>
        </Overlay>
    );
};


ImagesZoom.propTypes = {
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
    onClose: PropTypes.func.isRequired,
}

export default ImagesZoom;
