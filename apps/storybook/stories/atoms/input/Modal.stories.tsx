import { StoryObj } from '@storybook/react';
import { Button, Modal } from '@repo/ui/atoms';
import { useState } from 'react';

const meta = {
    title: 'Atoms/Input/Modal',
    component: Modal,
    parameters: {
        layout: 'centered',
    },
    
    };

    export default meta;
    type Story = StoryObj<typeof meta>;
    type Template = Omit<Story, "args"> & { args: any };


    
const Template = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
  
    const handleSave = () => {
      handleCloseModal();
    };
  
    return (
      <div>
        <Button label="Open" onClick={handleOpenModal} />
        <Modal
          open={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSave}
          title="Select environments"
        >

          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus iusto ullam unde magni quia eos doloribus, accusamus itaque. Quaerat, consequuntur. Sunt illo quis fuga aspernatur quos minima consectetur eligendi delectus.</p>
        </Modal>
      </div>
    );
  };
  
  export const Default = Template;
