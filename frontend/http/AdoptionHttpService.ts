import api from './index';

export const fetchAdoptionRequests = async () => {
  const { data } = await api.get('/adoptions');
  return data;
};

export const createAdoptionRequest = async (pet_id: number) => {
  const { data } = await api.post('/adoptions', { pet_id });
  return data;
};

export const updateAdoptionRequestStatus = async ({ id, status }: { id: number; status: 'approved' | 'denied' }) => {
  const { data } = await api.patch(`/adoptions/${id}/status`, { status });
  return data;
};
