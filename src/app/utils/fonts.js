import { Anton, Roboto_Slab, Roboto_Flex, Open_Sans, Permanent_Marker } from 'next/font/google'

export const robotoSlab = Roboto_Slab({ 
    subsets: ['latin'],
    variable: '--roboto-slab'
})

export const robotoFlex = Roboto_Flex({ 
    subsets: ['latin'],
    variable: '--roboto-flex'
})

export const openSans = Open_Sans({ 
    subsets: ['latin'],
    variable: '--open-sans'
})

export const anton = Anton({ 
    subsets: ['latin'],
    variable: '--anton',
    weight: '400'
})

export const permanentMarker = Permanent_Marker({ 
    subsets: ['latin'],
    variable: '--permanent-marker',
    weight: '400'
})