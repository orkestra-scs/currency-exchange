import {useState} from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { register } from '../../services/WebService';
import { useHistory } from 'react-router-dom';
const { Title } = Typography;
export default function RegisterScreen(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleRegister = () => {
        register(
            username,
            password
        )
            .then(() => {
                routeToLogin();
            })
            .catch((error) => {
                console.log(error);
            })

    }
    const routeToLogin = () => {
        history.push('/login');
    }
    return (
        <div style={{display: 'flex', justifyContent:'center', flex:1, alignItems: 'center'}}>

            <div style={{ margin: '5em'}}>
                <Title level={3}>Create a Currency Exchange  account</Title>
                <Form
                    name="register"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                >

                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        hasFeedback
                        rules={[
                            { required: true, message: 'Please input your password!' },
                            { min: 8, message: 'Password must be minimum 8 characters.' },
                            { pattern: RegExp(/^[a-z0-9]+$/i), message:'Alphanumeric characters only'}
                        ]}
                    >
                        <Input.Password value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Item>

                    <Form.Item
                        label="Confirm Password"
                        name="confirm"
                        dependencies={['password']}
                        hasFeedback
                        rules={[{ required: true, message: 'Please confirm your password!' },
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
                        <Input.Password value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" onClick={handleRegister}>
                            Register
                        </Button>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="link" onClick={() => routeToLogin()} >Already have an account?</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>

    )
}
