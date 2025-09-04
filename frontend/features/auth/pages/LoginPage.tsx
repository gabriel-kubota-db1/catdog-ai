import { Form, Field } from 'react-final-form';
import { Button, Card, Input, Typography, App } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { login, getMe } from '@/http/AuthHttpService';
import { storage } from '@/storage';
import { useAuth } from '@/context/AuthContext';

const { Title } = Typography;

const LoginPage = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { notification } = App.useApp();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      storage.setToken(data.token);
      const userData = await getMe();
      setUser(userData);
      notification.success({ message: 'Login successful!' });
      navigate(userData.role === 'admin' ? '/admin/dashboard' : '/');
    },
    onError: (error: any) => {
      notification.error({ message: 'Login Failed', description: error.response?.data?.message || 'An error occurred' });
    },
  });

  const onSubmit = (values: any) => {
    mutation.mutate(values);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <Card style={{ width: 400 }}>
        <Title level={2} style={{ textAlign: 'center' }}>Login</Title>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Field name="email">
                {({ input, meta }) => (
                  <div>
                    <Input {...input} type="email" placeholder="Email" prefix={<UserOutlined />} />
                    {meta.touched && meta.error && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <div style={{ margin: '24px 0' }} />
              <Field name="password">
                {({ input, meta }) => (
                  <div>
                    <Input.Password {...input} placeholder="Password" prefix={<LockOutlined />} />
                    {meta.touched && meta.error && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <div style={{ margin: '24px 0' }} />
              <Button type="primary" htmlType="submit" loading={mutation.isPending} block>
                Log in
              </Button>
              <div style={{ marginTop: '16px', textAlign: 'center' }}>
                Or <Link to="/register">register now!</Link>
              </div>
            </form>
          )}
        />
      </Card>
    </div>
  );
};

export default LoginPage;
