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

    const { email, password, name } = formData

    const onTextChange = (e) => {
        setformData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

	const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await AuthService.signup(name, email, password)
			console.log(res);
            if(res && res.status == 201) {
                navigate('/my-posts')

                toast.success('Signed up successfully')
            } else {
				toast.error(res.response.data)
			}
        } catch (error) {
            console.log(error);
            toast.error('Opps! something is wrong.')
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
									type="text"
									placeholder="Name"
									autoComplete="new-name"
									onChange={onTextChange}
									value={name}
									id="name"
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
								<Input
								 	prefix={<MailOutlined className="site-form-item-icon" />} 
									placeholder="Email" 
									autoComplete="new-email" 
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