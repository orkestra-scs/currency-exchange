import {useState} from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { register } from '../../services/WebService';
import { useHistory } from 'react-router-dom';
const { Title } = Typography;
export default function RegisterScreen(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleRegister = () => {
        register(
            name,
            email,
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
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input value={name} onChange={(e) => setName(e.target.value)}/>
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
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
