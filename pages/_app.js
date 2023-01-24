import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd';
import Head from 'next/head';
import wrapper from '../store/configureStore';
import '../styles/globals.css'


const NodeBird = ({ Component }) => {
    return (
        <>
            <Head>
                <meta charSet='utf-8' />
                <title>NodeBird</title>
            </Head>
            <Component />
        </>
    );
};

NodeBird.propTypes = {
    Component: PropTypes.elementType.isRequired,
}

export default wrapper.withRedux(NodeBird);
