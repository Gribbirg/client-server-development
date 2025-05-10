'use client'

import React from 'react'
import { Box, Container } from '@chakra-ui/react'
import ItemList from '../components/ItemList'
import UserSelector from '../components/UserSelector'

export default function Home() {
  return (
    <Container maxW="1200px" py={10}>
      <Box as="main">
        <UserSelector />
        <ItemList />
      </Box>
    </Container>
  )
}
