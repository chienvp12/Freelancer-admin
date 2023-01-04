import React, { useState } from 'react';
import { Layout, Form, Input, Button, Card, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Login.css';
import Logo from './logo.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const onFinish =  async (value) => {
        setLoading(true);
        await fetchAPI(value);
        window.location.href = '/dashboard';
        // navigate('/dashboard');
        
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const fetchAPI = async (value) => {
        const res = await axios.post('https://ffreelancer.herokuapp.com/admin/login', value)
        .then((res) => {
            console.log(res);
                if (res.data.status === 200) {
                    localStorage.setItem('SAVED_TOKEN', res.data.data.credential.accessToken);
                    localStorage.setItem('email', res.data.data.account.email);
                    localStorage.setItem('username', res.data.data.account.username);
                    localStorage.setItem('userid', res.data.data.account.id);
                    
                }else{
                    alert('Login Failed!')
                }
                setLoading(false);
            })
            
    }

    return (
        <>
            <Layout className='card-login'>
                <Card
                    style={{
                        width: 420,
                        height: 620,
                    }}
                >
                    <div className="header-login">
                        <img src={Logo} alt="" />
                        <h1>FFlancer - Admin</h1>
                        <p>Login</p>
                    </div>
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
                                    message: 'Please input your Username!',
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                },
                                {
                                    min: 6,
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Save login</Checkbox>
                            </Form.Item>

                            <a className="login-form-forgot" href="">
                                Forgot password
                            </a>
                        </Form.Item>

                        <Form.Item>
                            <Button
                            // onClick={() =>{
                            //     navigate('/dashboard');
                            // }}
                            type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                            <div className="contact">
                                <span>Do not have an account?</span>
                                <a href="">Contact now!</a>
                            </div>
                        </Form.Item>
                    </Form>
                </Card>
            </Layout>
        </>
    );
}

export default Login;
