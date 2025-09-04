import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import ManagePetsTab from '../components/ManagePetsTab';
import ManageAdoptionsTab from '../components/ManageAdoptionsTab';

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Manage Pets',
    children: <ManagePetsTab />,
  },
  {
    key: '2',
    label: 'Manage Adoptions',
    children: <ManageAdoptionsTab />,
  },
];

const AdminDashboardPage = () => {
  return <Tabs defaultActiveKey="1" items={items} />;
};

export default AdminDashboardPage;
