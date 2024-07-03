import React, { useState } from 'react';
import { Box, Button, Input, VStack, Text, useToast, Heading, FormControl, FormLabel, FormHelperText, FormErrorMessage } from '@chakra-ui/react';
import { registerUser } from '../api/Auth';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!username) {
      newErrors.username = "Username is required";
    } else if (username.length < 5) {
      newErrors.username = "Username must be at least 5 characters long";
    }

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;
    setIsLoading(true);

    try {
      const data = await registerUser(username, email, password);
      if (data.jwt) {
        toast({
          title: "Registration Successful",
          description: "Now login to proceed",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/login");
      } else {
        toast({
          title: "Registration failed",
          description: "Username or email already taken",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: error.message || "Unable to register",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box bg="gray.50" minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <VStack spacing={6} p={8} bg="white" borderRadius="lg" boxShadow="lg" width="full" maxW="md">
        <Heading as="h1" size="xl" mb={4}>Register</Heading>
        <FormControl id="username" isInvalid={errors.username}>
          <FormLabel>Username</FormLabel>
          <Input
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            variant="filled"
          />
          {errors.username && <FormErrorMessage>{errors.username}</FormErrorMessage>}
        </FormControl>
        <FormControl id="email" isInvalid={errors.email}>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="filled"
          />
          {errors.email && <FormErrorMessage>{errors.email}</FormErrorMessage>}
        </FormControl>
        <FormControl id="password" isInvalid={errors.password}>
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="filled"
          />
          {errors.password && <FormErrorMessage>{errors.password}</FormErrorMessage>}
          <FormHelperText>We'll never share your password.</FormHelperText>
        </FormControl>
        <Button colorScheme="blue" width="full" onClick={handleRegister} isLoading={isLoading}>Register</Button>
      </VStack>
    </Box>
  );
}

export default Register;
