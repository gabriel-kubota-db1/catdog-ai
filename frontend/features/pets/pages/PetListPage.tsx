import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPets } from '@/http/PetHttpService';
import { createAdoptionRequest } from '@/http/AdoptionHttpService';
import { Row, Col, Card, Button, Typography, Tag, App, Spin } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;
const { Meta } = Card;

const PetListPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { notification } = App.useApp();

  const { data: pets, isLoading, isError } = useQuery({
    queryKey: ['pets'],
    queryFn: fetchPets,
  });

  const mutation = useMutation({
    mutationFn: createAdoptionRequest,
    onSuccess: () => {
      notification.success({ message: 'Adoption request sent successfully!' });
      queryClient.invalidateQueries({ queryKey: ['pets'] });
    },
    onError: (error: any) => {
      notification.error({ message: 'Failed to send request', description: error.response?.data?.message || 'Please try again.' });
    },
  });

  const handleAdopt = (petId: number) => {
    if (!user) {
      navigate('/login');
      return;
    }
    mutation.mutate(petId);
  };

  if (isLoading) return <div style={{textAlign: 'center', marginTop: '50px'}}><Spin size="large" /></div>;
  if (isError) return <div>Error fetching pets</div>;

  return (
    <div>
      <Title level={2}>Our Lovely Pets</Title>
      <Row gutter={[16, 16]}>
        {pets.map((pet: any) => (
          <Col xs={24} sm={12} md={8} lg={6} key={pet.id}>
            <Card
              hoverable
              cover={<img alt={pet.name} src={pet.photo_url} style={{ height: 200, objectFit: 'cover' }} />}
              actions={[
                <Button
                  type="primary"
                  icon={<HeartOutlined />}
                  onClick={() => handleAdopt(pet.id)}
                  disabled={pet.status !== 'available'}
                  loading={mutation.isPending && mutation.variables === pet.id}
                >
                  {pet.status === 'available' ? 'Adopt Me' : pet.status}
                </Button>,
              ]}
            >
              <Meta
                title={<>{pet.name} <Tag color="blue">{pet.breed}</Tag></>}
                description={
                  <>
                    <Paragraph ellipsis={{ rows: 2 }}>{pet.description}</Paragraph>
                    <p>Age: {pet.age} | Species: {pet.species}</p>
                  </>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PetListPage;
