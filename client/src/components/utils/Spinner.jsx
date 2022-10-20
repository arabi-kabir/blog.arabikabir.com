import { Col, Row } from 'antd'
import React from 'react'
import spinner from '../../assets/spinner1.gif'

function Spinner() {
    return (
        <Row>
            <Col xs={2} xl={9}></Col>
            <Col xs={20} xl={6}>
                <div style={{ textAlign: 'center'}}>
                    <img style={{ width: '100%' }} src={spinner} alt='Loading...' />
                </div>
            </Col>
            <Col xs={2} xl={9}></Col>
        </Row>
    )
}

export default Spinner