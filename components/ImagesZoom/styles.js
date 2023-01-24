
import styled, { createGlobalStyle } from 'styled-components';



export const Overlay = styled.div`
    position:fixed;
    z-index:5000;
    top:0;
    left:0;
    right:0;
    bottom:0;
`;

export const Header = styled.header`
    height:44px;
    background:white;
    position:relative;
    padding:0;
    text-align:center;

    & h1{
        margin:0;
        font-size:17px;
        color:#333;
        line-height:44px;
    }
    & button{
        position:absolute;
        right:0;
        top:0;
        padding:15px;
        line-height:10px;
        cursor:pointer;
        background: #faad14;
        color: #fff;
        border: 1px solid #fa8c16;
    }
`;

export const SlickWrapper = styled.div`
    height:calc(100% -44px);
    background:rgba(0, 0, 0, 0.9);
    border:none !important;
    height: 100%;
`;

export const ImageWrapper = styled.div`
    padding:32px;
    text-align:center;
    cursor:pointer;
    &img{
        margin:0 auto;
        max-height:750px;
        display: inline-block !important;
    }
`;


export const Indicator = styled.div`    
    text-align :cetner !important;
     & > div{
        width:75px;
        height:30px;
        line-height:30px;
        border-radius:15px;
        background:#313131;
        display:inline-block;
        text-align:center !important;
        top:60px;
        background:#fff;
        position: relative;         
     }

`;

export const Global = createGlobalStyle`
    .slick-slide{
        display:inline-block;
    }
    .ant-card-cover{
        transform:none !important;        
    }

    .ant-card-cover > div{
        display:flex;
        align-items: center;
        max-height:450px
    }

    .slick-dots li button:before{
        color:#fff;
        opacity:1;
    }
    .slick-dots li.slick-active button:before {
         opacity: 1;
         color:#faad14;
    }

    .slick-prev, .slick-nex{
        width: 50px;
        height: 50px;
    }
    .slick-prev {
        left: 15%;
    }
    .slick-next{
        right:15%;
    }
`;