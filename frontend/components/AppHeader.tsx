import { Layout, Menu, Button, Avatar } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { HomeOutlined, UserOutlined, LoginOutlined, LogoutOutlined, DashboardOutlined } from '@ant-design/icons';
import { useAuth } from '@/context/AuthContext';
import { Can } from '@/config/ability';

const { Header } = Layout;

const AppHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link to="/" style={{ color: 'white', fontSize: '20px', marginRight: '20px' }}>
          PetAdopt
        </Link>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{ flex: 1, minWidth: 0 }}>
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Can I="manage" a="all">
            <Menu.Item key="2" icon={<DashboardOutlined />}>
              <Link to="/admin/dashboard">Dashboard</Link>
            </Menu.Item>
          </Can>
        </Menu>
      </div>
      <div>
        {user ? (
          <>
            <Avatar icon={<UserOutlined />} style={{ marginRight: '10px' }} />
            <span style={{ color: 'white', marginRight: '15px' }}>{user.name}</span>
            <Button type="primary" icon={<LogoutOutlined />} onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button style={{ marginRight: '10px' }} icon={<LoginOutlined />}>
              <Link to="/login">Login</Link>
            </Button>
            <Button type="primary">
              <Link to="/register">Register</Link>
            </Button>
          </>
        )}
      </div>
    </Header>
  );
};

export default AppHeader;
