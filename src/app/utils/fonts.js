import { Roboto_Slab, Roboto_Flex, Open_Sans } from 'next/font/google'

export const robotoSlab = Roboto_Slab({ 
    subsets: ['latin'],
    display: 'swap',
    variable: '--roboto-slab'
})

export const robotoFlex = Roboto_Flex({ 
    subsets: ['latin'],
    display: 'swap',
    variable: '--roboto-flex'
})

export const openSans = Open_Sans({ 
    subsets: ['latin'],
    display: 'swap',
    variable: '--open-sans'
})