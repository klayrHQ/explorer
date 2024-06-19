import { StoryObj } from "@storybook/react";
import { NewsCardGrid } from "@repo/ui/organisms";

const meta = {
    title: "Organisms/NewsCard/NewsCardGrid",
    component: NewsCardGrid,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};
   
export default meta;
type Story = StoryObj<typeof meta>;


export const NewsCardGridDefault: Story = {
    args: {
        newsCards: [
            {
              badges: [{colorVariant: "volt", label: 'Development' }, {colorVariant: "azule", label: 'Marketing' }, {colorVariant: "tulip", label: 'Blockchain' }],
              author: 'Lara Malta',
              date: '23 Apr 2024',
              title: 'Exploring the blockchain',
              description: 'Vestibulum ultrices elementum eros, sed interdum orci scelerisque et. Suspendisse potenti dolor sol amit ultrices elementum orci scelerisque orci scelerisque',
              src: 'https://img.freepik.com/free-vector/hand-drawn-tropical-sunset-background_23-2150672384.jpg?w=1800&t=st=1718192811~exp=1718193411~hmac=73b07debd78a9bb9b80db43c74f8af0ed2f8915fa88215fe4776c5399143801d',
              alt: 'NFT Image',
            },
            {
              badges: [{colorVariant: "sand", label: 'NFTs' }, {colorVariant: "azule", label: 'Marketing' }],
              author: 'Jurre Machielsen',
              date: '12 Mar 2022',
              title: 'Launch of Klayr token',
              description: 'Vestibulum ultrices elementum eros, sed interdum orci scelerisque et. Suspendisse potenti.Praesent placerat lobortis tempor. Aliquam interdum interdum orci scelerisque et',
              src: 'https://img.freepik.com/free-vector/palms-summer-beach-hand-drawn-background_23-2148548699.jpg?w=1800&t=st=1718540089~exp=1718540689~hmac=f53a32931e39b6742af5da975b0f2afc8ba1ccc19693c2e70b9c763f64d50116',
              alt: 'Klayr Token Image',
            },
            {
              badges: [{colorVariant: "green", label: 'Design' }, {colorVariant: "volt", label: 'Development' }],
              author: 'Lara Malta',
              date: '19 Feb 2022',
              title: 'Migration issues',
              description: 'Quisque pretium diam id est pellentesque, rutrum ornare dolor blandit. Fusce pulvinar elit sit amet urna aliquet elementum rutrum ornare dolor blandit rutrum ornare dolor blandit',
              src: 'https://img.freepik.com/premium-photo/colorful-illustration-beach-with-beach-chair-palm-tree_881695-43.jpg?w=1800',
              alt: 'Migration Issues Image',
            },
          ],
    }

};