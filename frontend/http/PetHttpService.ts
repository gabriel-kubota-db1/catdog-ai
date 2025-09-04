import api from './index';

export const fetchPets = async () => {
  const { data } = await api.get('/pets');
  return data;
};

export const createPet = async (petData: any) => {
  const { data } = await api.post('/pets', petData);
  return data;
};

export const updatePet = async ({ id, ...petData }: any) => {
  const { data } = await api.put(`/pets/${id}`, petData);
  return data;
};

export const deletePet = async (id: number) => {
  await api.delete(`/pets/${id}`);
};
