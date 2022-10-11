import React from 'react';
import Layout from '../../components/layouts/Layout';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Col, Row } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/auth/auth.service'
import toast from 'react-hot-toast';

function Signin() {
	const [formData, setformData] = useState({
        email: '',
        password: ''
    })

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
            const res = await AuthService.signin(email, password)

            if(res.status == 200) {
                navigate('/my-posts')

                toast.success('Logged in successfully')
            } else {
				toast.error('Opps! something is wrong.')
			}
        } catch (error) {
            console.log(error);
            toast.error('Opps! something is wrong.')
        }
    }

	return (
		<Layout>
			<div style={{ textAlign: 'center', marginTop: '30px' }}>
				<h4 style={{ fontWeight: 300 }}>Sign in</h4>
			</div>

			<div>
				<Row>
					<Col sxs={2} sm={2} md={6} lg={8} xl={8}></Col>
					<Col sxs={20} sm={20} md={12} lg={8} xl={8}>
				<Form
					name="normal_login"
					className="login-form"
				>
					<Form.Item
						name="email"
						rules={[
							{
								required: true,
								message: 'Please input your email!',
							},
						]}
					>
						<Input 
							prefix={<UserOutlined className="site-form-item-icon" />} 
							placeholder="Email" autoComplete="new-email" 
							style={{ autocomplete:"off" }} 
							onChange={onTextChange}
							value={email}
							id="email"
						/>
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
							onChange={onTextChange}
							value={password}
							id="password"
						/>
					</Form.Item>

					<Form.Item>
						<Button type="primary" htmlType="submit" className="login-form-button" onClick={handleSubmit}>
							Log in
						</Button>
					</Form.Item>
				</Form>
				</Col>
					<Col sxs={2} sm={2} md={6} lg={8} xl={8}></Col>
				</Row>
			</div>
		</Layout>
	);
};

export default Signin;