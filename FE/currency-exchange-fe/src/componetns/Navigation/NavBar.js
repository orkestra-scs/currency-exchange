import { Menu } from 'antd';
import { LineChartOutlined, DollarCircleOutlined, LogoutOutlined } from '@ant-design/icons';
import {logout, setSessionId} from '../../services/WebService';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { navSelection, selectMenu } from '../../services/ExchangeState';

export default function NavBar() {
    const selection = useSelector(navSelection)
    const history = useHistory();
    const dispatch = useDispatch();

    const handleClick = (e) => {
       dispatch(selectMenu(e.key) );
    };
    const handleLogout = () => {
        logout('').then(( ) => {
            setSessionId('');
            history.push('/login');
            dispatch(selectMenu('dash') );
        });
    }
    return (
        <Menu onClick={handleClick} selectedKeys={[selection]} mode="horizontal">
           <Menu.Item key="dash" icon={<LineChartOutlined />} onClick={() => history.push('/dash')} >
                Dashboard
            </Menu.Item>
            <Menu.Item key="currency" icon={<DollarCircleOutlined />} onClick={() => history.push('/currency')}>
                Currency
            </Menu.Item>

            <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout} >
                Logout
            </Menu.Item>
        </Menu>
    )
    
}
