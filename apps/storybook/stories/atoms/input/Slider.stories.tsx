import { StoryObj } from '@storybook/react';
import { SlideInModal, Button } from '@repo/ui/atoms';
import { useState } from 'react';

const meta = {
  title: 'Atoms/Input/SlideInModal',
  component: SlideInModal,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;
type Template = Omit<Story, 'args'> & { args: any };

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
      <SlideInModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        title="View as .json"
      >
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus iusto ullam unde magni
          quia eos doloribus, accusamus itaque. Quaerat, consequuntur. Sunt illo quis fuga
          aspernatur quos minima consectetur eligendi delectus.
        </p>
      </SlideInModal>
    </div>
  );
};

export const Default = Template;
