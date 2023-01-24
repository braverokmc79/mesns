import React from 'react';
import PropTypes from 'prop-types'
import { Button, Card, List } from 'antd';
import { StopOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux';
import { REMOVE_FOLLOW_REQUEST, UNFOLLOW_REQUEST } from '../reducers/user';


const FollowList = ({ header, data, onClickMore, loading }) => {
    const dispatch = useDispatch();

    //반목문에서 고차함수 사용으로  파라미터 값을 전달시킬 수 있다 (고차 함수(Higher order function)는 함수를 인자로 전달받거나 함수를 결과로 반환하는 함수)
    const onCancle = (id) => () => {
        if (header === '팔로잉') {
            dispatch({
                type: UNFOLLOW_REQUEST,
                data: id
            })
        } else if (header === '팔로워') {
            dispatch({
                type: REMOVE_FOLLOW_REQUEST,
                data: id
            })
        }
    };

    return (
        <List
            style={{ marginBottom: 20 }}
            grid={{ gutter: 4, xs: 2, md: 3 }}
            size="small"
            header={<div>{header}</div>}
            loadMore={<div style={{ textAlign: 'center', margin: '10px 0' }}><Button onClick={onClickMore} loading={loading}>더 보기</Button></div>}
            bordered
            dataSource={data}
            renderItem={(item) => (
                <List.Item style={{ marginTop: 20 }}>
                    <Card actions={[<StopOutlined key="stop" onClick={onCancle(item.id)} />]}  >
                        <Card.Meta description={item.nickname} />
                    </Card>
                </List.Item >
            )}
        >
        </List >
    );
};

FollowList.propTypes = {
    header: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    onClickMore: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
}


export default FollowList;