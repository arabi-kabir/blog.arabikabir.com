import React from 'react';
import Layout from '../../components/layouts/Layout';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Form, Input, Row } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/auth/auth.service';
import toast from 'react-hot-toast';


function Signup() {
	const [formData, setformData] = useState({
        email: '',
        password: '',
		name: ''
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
            const res = await AuthService.Signup(email, password)
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
			<div style={{ textAlign: 'center', marginTop: '30px' }}>
				<h4 style={{ fontWeight: 300 }}>User Sign up</h4>
			</div>

			<div>
				<Row>
					<Col xs={2} xl={8}></Col>
					<Col xs={20} xl={8}>
						<Form
							name="normal_login"
							className="login-form"
							initialValues={{
								remember: true,
							}}
						>
							<Form.Item
								name="name"
								rules={[
									{
										required: true,
										message: 'Please input your Name!',
									},
								]}
							>
								<Input
									prefix={<UserOutlined className="site-form-item-icon" />}
									type="password"
									placeholder="Name"
									autoComplete="new-name"
								/>
							</Form.Item>

							<Form.Item
								name="email"
								rules={[
									{
										required: true,
										message: 'Please input your email!',
									},
								]}
							>
								<Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" autoComplete="new-email" style={{ autocomplete:"off" }} />
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
									Sign up
								</Button>
							</Form.Item>
						</Form>
					</Col>
					<Col xs={2} xl={8}></Col>
				</Row>
			</div>
		</Layout>
	);
};

export default Signup;