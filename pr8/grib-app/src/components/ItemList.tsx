'use client'

import { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  Badge
} from '@chakra-ui/react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer
} from '@chakra-ui/table'
import axios from 'axios'
import ItemForm from './ItemForm'
import { Item } from '../types'
import { useAuth } from '../contexts/AuthContext'

export default function ItemList() {
  const { user, isAdmin } = useAuth();
  const [items, setItems] = useState<Item[]>([])
  const [currentItem, setCurrentItem] = useState<Item | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchItems = async () => {
    if (!user) {
      setItems([]);
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true)
      const response = await axios.get('/api/items')
      setItems(response.data)
    } catch (error) {
      console.error('Error fetching items:', error)
      alert('Failed to fetch items')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      fetchItems()
    } else {
      setItems([]);
      setLoading(false);
    }
  }, [user])

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/items/${id}`)
      alert('Item deleted successfully')
      fetchItems()
    } catch (error) {
      console.error('Error deleting item:', error)
      alert('Failed to delete item')
    }
  }

  const handleEdit = (item: Item) => {
    setCurrentItem(item)
  }

  const handleFormSubmit = () => {
    setCurrentItem(null)
    fetchItems()
  }

  if (!user) {
    return (
      <Box p={5} textAlign="center">
        <Text fontSize="lg">Please select a user to manage items</Text>
      </Box>
    );
  }

  return (
    <Box p={5} maxW="1200px" mx="auto">
      <Heading mb={6}>Items Management</Heading>
      
      <Box borderWidth="1px" borderRadius="lg" p={4} mb={8}>
        <ItemForm 
          onSubmit={handleFormSubmit} 
          currentItem={currentItem} 
          onCancel={() => setCurrentItem(null)} 
        />
      </Box>
      
      <Box mt={8}>
        <Heading size="md" mb={4}>Items List</Heading>
        {loading ? (
          <Text>Loading...</Text>
        ) : items.length === 0 ? (
          <Text>No items found</Text>
        ) : (
          <Box borderWidth="1px" borderRadius="lg" p={4}>
            <TableContainer width="100%">
              <Table variant="simple" width="100%" textAlign="center">
                <Thead>
                  <Tr>
                    <Th width="5%" textAlign="center">ID</Th>
                    <Th width="20%" textAlign="center">Name</Th>
                    <Th width="40%" textAlign="center">Description</Th>
                    {isAdmin && (
                      <Th width="15%" textAlign="center">Created By</Th>
                    )}
                    <Th width="20%" textAlign="center">Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {items.map((item) => (
                    <Tr key={item.id}>
                      <Td textAlign="center">{item.id}</Td>
                      <Td textAlign="center">{item.name}</Td>
                      <Td textAlign="center">{item.description}</Td>
                      {isAdmin && (
                        <Td textAlign="center">
                          {item.username}
                          {item.user_id === user.id && (
                            <Badge ml={2} colorScheme="green" size="sm">You</Badge>
                          )}
                        </Td>
                      )}
                      <Td textAlign="center">
                        <Stack direction="row" justifyContent="center">
                          <Button 
                            size="sm" 
                            colorScheme="blue" 
                            onClick={() => handleEdit(item)}
                          >
                            Edit
                          </Button>
                          <Button 
                            size="sm" 
                            colorScheme="red" 
                            onClick={() => handleDelete(item.id)}
                          >
                            Delete
                          </Button>
                        </Stack>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Box>
    </Box>
  )
} 