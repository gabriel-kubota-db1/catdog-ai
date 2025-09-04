import { Form, Field } from 'react-final-form';
import { Button, Card, Input, Typography, App } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { register } from '@/http/AuthHttpService';

const { Title } = Typography;

const RegisterPage = () => {
  const navigate = useNavigate();
  const { notification } = App.useApp();

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      notification.success({ message: 'Registration successful!', description: 'You can now log in.' });
      navigate('/login');
    },
    onError: (error: any) => {
      notification.error({ message: 'Registration Failed', description: error.response?.data?.message || 'An error occurred' });
    },
  });

  const onSubmit = (values: any) => {
    mutation.mutate(values);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <Card style={{ width: 400 }}>
        <Title level={2} style={{ textAlign: 'center' }}>Register</Title>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Field name="name">
                {({ input }) => <Input {...input} placeholder="Name" prefix={<UserOutlined />} />}
              </Field>
              <div style={{ margin: '24px 0' }} />
              <Field name="email">
                {({ input }) => <Input {...input} type="email" placeholder="Email" prefix={<MailOutlined />} />}
              </Field>
              <div style={{ margin: '24px 0' }} />
              <Field name="password">
                {({ input }) => <Input.Password {...input} placeholder="Password" prefix={<LockOutlined />} />}
              </Field>
              <div style={{ margin: '24px 0' }} />
              <Button type="primary" htmlType="submit" loading={mutation.isPending} block>
                Register
              </Button>
              <div style={{ marginTop: '16px', textAlign: 'center' }}>
                Already have an account? <Link to="/login">Log in</Link>
              </div>
            </form>
          )}
        />
      </Card>
    </div>
  );
};

export default RegisterPage;
