import React,{useState} from "react";
import { Form, Input, Button, Typography } from 'antd';
import {login} from "../../services/WebService";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setLogin } from "../../services/AuthSlice";
const { Title } = Typography;

export default function LoginScreen(){
    const [failedAuth, setFailedAuth] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogin = () => {
        login(username,password)
            .then(() => {
                setFailedAuth(false);
                dispatch(setLogin());
                history.push('/dash');
            })
            .catch(() => {
                setFailedAuth(true);
            })
    }

    const routeToRegister = () => {
        history.push('/register');
    }

    return(
        <div style={{display: 'flex', justifyContent:'center', flex:1, alignItems: 'center'}}>

            <div style={{ margin: '5em'}}>
                <Title level={3}> Welcome to Currency Exchange </Title>
                <Form
                    name="login"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                >

                    <Form.Item hidden={!failedAuth}>
                        <Input disabled={true} value={"The data you enter is not valid"}/>
                    </Form.Item>
                    
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
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button id={"loginButton"} type="primary" htmlType="submit" onClick={handleLogin}>
                            Submit
                        </Button>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button id={"registerButton"} type="link" onClick={routeToRegister}>Don't have an account?</Button>
                    </Form.Item>
                </Form>
            </div>
                
        </div>
       
    )
}
