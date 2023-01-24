import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link'
import { Menu, Input, Row, Col } from 'antd';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import UserProfile from './UserProfile';
import LoginForm from './LoginForm';
import useInput from '../hooks/useInput';

const SearchInput = styled(Input.Search)`
    vertical-align: 'middle' ;
`;

const AppLayout = ({ children }) => {
    const [searchInput, onChangeSearchInput] = useInput('');
    const { me } = useSelector((state) => state.user);

    const onClick = useCallback((e) => {
        if (e.key === "item-4") {
            if (searchInput) {
                // onChangeSearchInput("sdfsdf");
                console.log("검색어: ", searchInput);
                Router.push(`/hashtag/${searchInput}`);
            }
        }
    }, [searchInput]);



    const items = [
        { label: <Link href="/" prefetch={false}>노드버드</Link>, key: 'item-1' },
        me && { label: <Link href="/profile" prefetch={false}>프로필</Link>, key: 'item-2' },
        !me && { label: <Link href="/signup" prefetch={false}>회원가입</Link>, key: 'item-3' },
        {
            label: <SearchInput enterButton value={searchInput} onChange={onChangeSearchInput} />,
            key: 'item-4'
        }
    ];

    return (
        <div>

            <Menu onClick={onClick} mode="horizontal" items={items} />

            <Row gutter={24} style={{ marginTop: 20 }}>
                <Col xs={24} md={6} style={{ marginTop: 20 }}>
                    Hello.Next
                </Col>
            </Row>

            <Row gutter={24} style={{ marginTop: 20 }}>
                <Col xs={24} md={6} style={{ marginTop: 20 }}>
                    {me ? <UserProfile /> : <LoginForm />}
                </Col>
                <Col xs={24} md={16} style={{ marginTop: 20 }} >
                    {children}
                </Col>
            </Row>

            <Row gutter={24} style={{ marginTop: 20 }}>
                <Col xs={24} md={24} style={{ marginTop: 20 }}>
                    <a href='https://macaronics.net' target="_blank" rel="noreferrer noopener"  >
                        Made by macaronics
                    </a>
                </Col>
            </Row>

        </div>
    );
};


AppLayout.prototype = {
    children: PropTypes.node.isRequired
}

export default AppLayout;