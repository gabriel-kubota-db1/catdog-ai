import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAdoptionRequests, updateAdoptionRequestStatus } from '@/http/AdoptionHttpService';
import { Table, Button, Space, Tag, App, Spin } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const ManageAdoptionsTab = () => {
  const queryClient = useQueryClient();
  const { notification } = App.useApp();

  const { data: requests, isLoading } = useQuery({
    queryKey: ['adoptionRequests'],
    queryFn: fetchAdoptionRequests,
  });

  const updateStatusMutation = useMutation({
    mutationFn: updateAdoptionRequestStatus,
    onSuccess: () => {
      notification.success({ message: 'Request status updated' });
      queryClient.invalidateQueries({ queryKey: ['adoptionRequests'] });
      queryClient.invalidateQueries({ queryKey: ['pets'] });
    },
    onError: () => {
      notification.error({ message: 'Failed to update status' });
    },
  });

  const handleUpdateStatus = (id: number, status: 'approved' | 'denied') => {
    updateStatusMutation.mutate({ id, status });
  };

  const columns = [
    { title: 'Pet Name', dataIndex: ['pet', 'name'], key: 'petName' },
    { title: 'Requester', dataIndex: ['user', 'name'], key: 'userName' },
    { title: 'Request Date', dataIndex: 'created_at', key: 'date', render: (date: string) => dayjs(date).format('YYYY-MM-DD HH:mm') },
    { 
      title: 'Status', 
      dataIndex: 'status', 
      key: 'status',
      render: (status: string) => {
        let color = 'geekblue';
        if (status === 'approved') color = 'green';
        if (status === 'denied') color = 'volcano';
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          {record.status === 'pending' && (
            <>
              <Button icon={<CheckOutlined />} onClick={() => handleUpdateStatus(record.id, 'approved')} style={{ color: 'green', borderColor: 'green' }}>Approve</Button>
              <Button icon={<CloseOutlined />} onClick={() => handleUpdateStatus(record.id, 'denied')} danger>Deny</Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  if (isLoading) return <div style={{textAlign: 'center', marginTop: '50px'}}><Spin size="large" /></div>;

  return <Table columns={columns} dataSource={requests} rowKey="id" />;
};

export default ManageAdoptionsTab;
