"use client";

import { Box, Container, Heading, Text, Button } from "@chakra-ui/react";
import Link from "next/link";
import { useUser } from "./user-context";
import { hasRole } from "@/lib/auth";

export default function Home() {
  const user = useUser();

  return (
    <Container maxW="container.md" py={10}>
      <Box textAlign="center">
        <Heading mb={4}>Главная страница</Heading>
        {user && (
          <>
            <Text mb={6}>
              Добро пожаловать, {user.name}! 
              Вы успешно авторизованы и можете просматривать контент.
            </Text>
            <Box mb={4}>
              <Link href="/user">
                <Button colorScheme="blue" mr={4}>
                  Страница пользователя
                </Button>
              </Link>
              <Link href="/admin">
                <Button colorScheme={hasRole(user, ["admin"]) ? "green" : "gray"}>
                  Страница администратора
                </Button>
              </Link>
            </Box>
            <Text fontSize="sm" color="gray.500">
              Ваши роли: {user.roles.join(", ")}
            </Text>
            <Text fontSize="sm" color="gray.500">
              Ваши права: {user.rights.join(", ")}
            </Text>
          </>
        )}
      </Box>
    </Container>
  );
}
