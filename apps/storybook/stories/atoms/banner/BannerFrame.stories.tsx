import  {BannerFrame}  from '@repo/ui/atoms' 
import { StoryObj } from '@storybook/react'
import BannerBG from "../../assets/images/bannerBG.png";


const meta = {
    title: 'Atoms/Banner/BannerFrame',
    component: BannerFrame,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        image: BannerBG.src,
    },
}
