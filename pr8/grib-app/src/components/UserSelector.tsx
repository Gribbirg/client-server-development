'use client';

import { useState, useEffect } from 'react';
import {
  Box, 
  Button, 
  Text, 
  Select,
  Badge,
  Flex
} from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';
import { User } from '../types';

const MOCK_USERS: User[] = [
  { id: 1, username: 'admin', role: 'admin' },
  { id: 2, username: 'user1', role: 'user' },
  { id: 3, username: 'user2', role: 'user' },
];

export default function UserSelector() {
  const { user, login, logout } = useAuth();
  
  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = parseInt(e.target.value);
    if (userId === 0) {
      logout();
    } else {
      login(userId);
    }
  };
  
  return (
    <Box p={3} borderWidth="1px" borderRadius="md" mb={4}>
      <Flex justifyContent="space-between" alignItems="center">
        <Box>
          {user ? (
            <Text>
              Current user: <strong>{user.username}</strong>
              <Badge ml={2} colorScheme={user.role === 'admin' ? 'red' : 'green'}>
                {user.role}
              </Badge>
            </Text>
          ) : (
            <Text>Not logged in</Text>
          )}
        </Box>
        
        <Box>
          <Select 
            placeholder="Switch User" 
            value={user?.id || 0}
            onChange={handleUserChange} 
            size="sm" 
            width="150px"
          >
            {MOCK_USERS.map((mockUser) => (
              <option key={mockUser.id} value={mockUser.id}>
                {mockUser.username} ({mockUser.role})
              </option>
            ))}
            <option value={0}>Logout</option>
          </Select>
        </Box>
      </Flex>
    </Box>
  );
} 