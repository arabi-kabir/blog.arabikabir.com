import React from 'react';
import Layout from '../../components/layouts/Layout';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Signin() {
	const onFinish = (values) => {
		console.log('Received values of form: ', values);
	};

	const [formData, setformData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate()

    const { email, password } = formData

    const onTextChange = (e) => {
        setformData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

	const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await AuthService.login(email, password)
            if(res) {
                navigate('/dashboard')

                toast.success('Logged in successfully')
            }
        } catch (error) {
            console.log(error);
            toast.success('Opps! something is wrong.')
        }
    }

	return (
		<Layout>
			<Content
				className="site-layout"
				// style={{
				// 	padding: "0 100px",
				// 	marginTop: 64
				// }}
				style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}
			>
				<Form
					name="normal_login"
					className="login-form"
					initialValues={{
						remember: true,
					}}
					onFinish={onFinish}
				>
					<Form.Item
						name="email"
						rules={[
							{
								required: true,
								message: 'Please input your email!',
							},
						]}
						style={{ width: '500px' }}
					>
						<Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" autoComplete="new-email" style={{ autocomplete:"off" }} />
					</Form.Item>

					<Form.Item
						name="password"
						rules={[
							{
								required: true,
								message: 'Please input your Password!',
							},
						]}
					>
						<Input
							prefix={<LockOutlined className="site-form-item-icon" />}
							type="password"
							placeholder="Password"
							autoComplete="new-password"
						/>
					</Form.Item>

					<Form.Item>
						<Button type="primary" htmlType="submit" className="login-form-button">
							Log in
						</Button>
					</Form.Item>
				</Form>
			</Content>
		</Layout>
	);
};

export default Signin;