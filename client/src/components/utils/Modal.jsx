import React from 'react'
import { Button, Modal } from 'antd';


function MyModal(props) {
    return (
        <div>
            <Modal title={props.title} open={props.isModalOpen} onOk={props.onModalOk} onCancel={props.onModalCancel} confirmLoading={props.confirmLoading}>
                { props.children }
            </Modal>
        </div>
    )
}

export default MyModal