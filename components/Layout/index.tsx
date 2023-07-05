import React from 'react'

import { Box, Container } from '@chakra-ui/react'
import Navbar, { navbarHeight } from '../Navbar';

interface Props {
    children: React.ReactNode,
}

const Layout: React.FC<Props> = ({ children }) => {

    return (
        <Box
            minHeight='100vh'
            minWidth='100vw'
            bg='background.500'
        >
            <Navbar />
            <Container
                maxW='5xl'
                display='flex'
                flexDirection='column'
                pt={navbarHeight}
                pb={16}
                gap={8}
            >
                {children}
            </Container>
        </Box>
    )
}

export default Layout