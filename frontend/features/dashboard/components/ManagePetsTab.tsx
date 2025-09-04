import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPets, deletePet } from '@/http/PetHttpService';
import { Table, Button, Space, Popconfirm, App, Spin } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import PetFormModal from './PetFormModal';

const ManagePetsTab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPet, setEditingPet] = useState(null);
  const queryClient = useQueryClient();
  const { notification } = App.useApp();

  const { data: pets, isLoading } = useQuery({
    queryKey: ['pets'],
    queryFn: fetchPets,
  });

  const deleteMutation = useMutation({
    mutationFn: deletePet,
    onSuccess: () => {
      notification.success({ message: 'Pet deleted successfully' });
      queryClient.invalidateQueries({ queryKey: ['pets'] });
    },
    onError: () => {
      notification.error({ message: 'Failed to delete pet' });
    },
  });

  const handleAdd = () => {
    setEditingPet(null);
    setIsModalOpen(true);
  };

  const handleEdit = (pet: any) => {
    setEditingPet(pet);
    setIsModalOpen(true);
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Species', dataIndex: 'species', key: 'species' },
    { title: 'Breed', dataIndex: 'breed', key: 'breed' },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>Edit</Button>
          <Popconfirm
            title="Delete the pet"
            description="Are you sure to delete this pet?"
            onConfirm={() => deleteMutation.mutate(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (isLoading) return <div style={{textAlign: 'center', marginTop: '50px'}}><Spin size="large" /></div>;

  return (
    <div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleAdd}
        style={{ marginBottom: 16 }}
      >
        Add Pet
      </Button>
      <Table columns={columns} dataSource={pets} rowKey="id" />
      <PetFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        pet={editingPet}
      />
    </div>
  );
};

export default ManagePetsTab;
