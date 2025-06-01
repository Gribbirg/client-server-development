'use client'

import { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Input,
  Textarea,
  Stack,
  Heading,
} from '@chakra-ui/react'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { useToast } from '@chakra-ui/toast'
import axios from 'axios'
import { Item, ItemFormProps } from '../types'
import { useAuth } from '../contexts/AuthContext'

export default function ItemForm({ onSubmit, currentItem, onCancel }: ItemFormProps) {
  const { user } = useAuth()
  const [formData, setFormData] = useState<Omit<Item, 'id' | 'created_at' | 'user_id' | 'username'>>({
    name: '',
    description: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const toast = useToast()

  useEffect(() => {
    if (currentItem) {
      setFormData({
        name: currentItem.name,
        description: currentItem.description
      })
    } else {
      setFormData({
        name: '',
        description: ''
      })
    }
  }, [currentItem])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to perform this action",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
      return
    }

    try {
      setIsSubmitting(true)
      
      if (currentItem) {
        // Update existing item
        await axios.put(`/api/items/${currentItem.id}`, formData)
        toast({
          title: "Success",
          description: "Item updated successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        })
      } else {
        await axios.post('/api/items', formData)
        toast({
          title: "Success",
          description: "Item created successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        })
      }
      
      setFormData({
        name: '',
        description: ''
      })
      onSubmit()
    } catch (error) {
      console.error('Error submitting form:', error)
      toast({
        title: "Error",
        description: currentItem 
          ? "Failed to update item" 
          : "Failed to create item",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <Heading size="md" mb={4}>
        {currentItem ? 'Edit Item' : 'Create New Item'}
      </Heading>
      
      <Stack gap={4}>
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter item name"
          />
        </FormControl>
        
        <FormControl isRequired>
          <FormLabel>Description</FormLabel>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter item description"
            rows={4}
          />
        </FormControl>
        
        <Stack direction="row" gap={4} justify="flex-end">
          {currentItem && (
            <Button
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
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