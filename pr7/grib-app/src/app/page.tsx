import { Box, Container, Heading } from '@chakra-ui/react'
import ItemList from '@/components/ItemList'

export default function Home() {
  return (
    <Container maxW="container.lg" py={10}>
      <Box textAlign="center" mb={10}>
        <Heading as="h1" size="xl">
          CRUD Application with Next.js and PostgreSQL
        </Heading>
      </Box>
      
      <ItemList />
    </Container>
  )
}
