import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Input, VStack, Text, useToast, Heading, FormControl, FormLabel, FormHelperText } from '@chakra-ui/react';
import { loginUser } from '../api/Auth';

function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const data = await loginUser(identifier, password);
      if (data && data.jwt) {
        localStorage.setItem('jwt', data.jwt);
        localStorage.setItem('identifier', identifier);
        toast({
          title: "Login Successful",
          description: "You are now logged in!",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        navigate('/dashboard');
      } else {
        toast({
          title: "Login failed",
          description: "",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error.message || "Invalid credentials",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = () => {
    navigate('/register');
  };

  return (
    <Box bg="gray.50" minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <VStack spacing={6} p={8} bg="white" borderRadius="lg" boxShadow="lg" width="full" maxW="md">
        <Heading as="h1" size="xl" mb={4}>Login</Heading>
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Enter your email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            variant="filled"
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="filled"
          />
        </FormControl>
        <Button colorScheme="blue" width="full" onClick={handleLogin} isLoading={isLoading}>Login</Button>
        <Button variant="link" colorScheme="teal" onClick={handleSignUp}>Sign Up</Button>
      </VStack>
    </Box>
  );
}

export default Login;
