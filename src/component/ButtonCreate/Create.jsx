import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Modal, Input, Form, message } from 'antd';
import './Create.css';
import API from '../../apiConfig/fetchApi';
import { Link, useLocation } from 'react-router-dom';
const CreateUser = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    const location = useLocation();
    
    const showModal = () => {
        setModalOpen(true);
    }
    const handleCreate = () => {
       setModalOpen(false);
    }
    const handleCancel = () => {
        setModalOpen(false);
    }
    const onFinish = (values) => {
        let value;
        switch (location.pathname) {
            case '/admin':
                value = {
                    ...values,
                    role: 0,
                }
                break
            case '/user':
                value = {
                    ...values,
                    role: 1,
                }
                break
            default:
                break;
        }
        
        // fetchAPI(value)
        messageApi.open({
            type: 'success',
            content: 'Create user success',
          });
        console.log('Success:', value);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);

      };
      const fetchAPI =  async (values) =>{
        const createAdmin = await API.requestPostAPI('account/create', values);
      }
      const formItemLayout = {
        labelCol: {
          span: 6,
        },
        wrapperCol: {
          span: 20,
        },
      };
    
    return (
        <>
        {contextHolder}
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={showModal}
            >
                Create
            </Button>
            <Modal
                title="Create User"
                open={modalOpen}
                onCancel={handleCancel}
                footer={[]}
            >
                <Form
                    form={form}
                    name="register"
                    scrollToFirstError
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete='off'
                    {...formItemLayout}
                >
                <Form.Item
                        name="username"
                        label="username"
                        tooltip="What do you want others to call you?"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your nickname!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="email"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            {
                                min: 6,
                            }
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                    
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item className='Button-create'>
                        <Button key="back" onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button key="submit" type="primary" htmlType="submit" onClick={handleCreate}>
                            Create
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

        </>
    )
}

export default CreateUser;