import { Layout } from 'antd';
import AppHeader from '@/components/AppHeader';
import AppRoutes from '@/routes';

const { Content } = Layout;

function App() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppHeader />
      <Content style={{ padding: '0 48px', marginTop: 24 }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 280, borderRadius: '8px' }}>
          <AppRoutes />
        </div>
      </Content>
    </Layout>
  );
}

export default App;
