'use client'

import { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Input,
  Stack,
  Textarea
} from '@chakra-ui/react'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { useToast } from '@chakra-ui/toast'
import axios from 'axios'
import { Item, ItemFormProps } from '../types'

export default function ItemForm({ onSubmit, currentItem, onCancel }: ItemFormProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const toast = useToast()

  useEffect(() => {
    if (currentItem) {
      setName(currentItem.name)
      setDescription(currentItem.description)
    } else {
      setName('')
      setDescription('')
    }
  }, [currentItem])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name.trim() || !description.trim()) {
      toast({
        title: 'Error',
        description: 'Name and description are required',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    try {
      setIsSubmitting(true)
      
      if (currentItem) {
        // Update existing item
        await axios.put(`/api/items/${currentItem.id}`, { name, description })
        toast({
          title: 'Success',
          description: 'Item updated successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      } else {
        // Create new item
        await axios.post('/api/items', { name, description })
        toast({
          title: 'Success',
          description: 'Item created successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      }
      
      // Clear form
      setName('')
      setDescription('')
      onSubmit()
    } catch (error) {
      console.error('Error submitting form:', error)
      toast({
        title: 'Error',
        description: currentItem ? 'Failed to update item' : 'Failed to create item',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <Stack gap={4}>
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Enter item name"
          />
        </FormControl>
        
        <FormControl isRequired>
          <FormLabel>Description</FormLabel>
          <Textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            placeholder="Enter item description"
          />
        </FormControl>
        
        <Stack direction="row" justify="flex-end">
          {currentItem && (
            <Button onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button 
            type="submit" 
            colorScheme="blue" 
            loading={isSubmitting}
          >
            {currentItem ? 'Update' : 'Create'}
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
} 