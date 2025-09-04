import { Modal, Input, InputNumber, Select } from 'antd';
import { Form, Field } from 'react-final-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPet, updatePet } from '@/http/PetHttpService';

const PetFormModal = ({ isOpen, onClose, pet }: { isOpen: boolean; onClose: () => void; pet: any | null }) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createPet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pets'] });
      onClose();
    },
  });

  const updateMutation = useMutation({
    mutationFn: updatePet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pets'] });
      onClose();
    },
  });

  const onSubmit = (values: any) => {
    if (pet) {
      updateMutation.mutate({ ...values, id: pet.id });
    } else {
      createMutation.mutate(values);
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={pet || {}}
      render={({ handleSubmit, form }) => (
        <Modal
          title={pet ? 'Edit Pet' : 'Add Pet'}
          open={isOpen}
          onOk={() => {
            handleSubmit();
            form.reset();
          }}
          onCancel={() => {
            onClose();
            form.reset();
          }}
          confirmLoading={createMutation.isPending || updateMutation.isPending}
        >
          <form>
            <Field name="name">
              {({ input }) => <div style={{ marginBottom: 16 }}><label>Name</label><Input {...input} /></div>}
            </Field>
            <Field name="species">
              {({ input }) => <div style={{ marginBottom: 16 }}><label>Species</label><Input {...input} /></div>}
            </Field>
            <Field name="breed">
              {({ input }) => <div style={{ marginBottom: 16 }}><label>Breed</label><Input {...input} /></div>}
            </Field>
            <Field name="age">
              {({ input }) => <div style={{ marginBottom: 16 }}><label>Age</label><InputNumber {...input} style={{ width: '100%' }} /></div>}
            </Field>
            <Field name="photo_url">
              {({ input }) => <div style={{ marginBottom: 16 }}><label>Photo URL</label><Input {...input} /></div>}
            </Field>
            <Field name="description">
              {({ input }) => <div style={{ marginBottom: 16 }}><label>Description</label><Input.TextArea {...input} /></div>}
            </Field>
            {pet && (
              <Field name="status">
                {({ input }) => (
                  <div style={{ marginBottom: 16 }}>
                    <label>Status</label>
                    <Select {...input} style={{ width: '100%' }}>
                      <Select.Option value="available">Available</Select.Option>
                      <Select.Option value="pending">Pending</Select.Option>
                      <Select.Option value="adopted">Adopted</Select.Option>
                    </Select>
                  </div>
                )}
              </Field>
            )}
          </form>
        </Modal>
      )}
    />
  );
};

export default PetFormModal;
