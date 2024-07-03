import React from 'react';
import { Button, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('identifier')
    localStorage.removeItem('jwt');
    toast({
      title: "Logged out",
      description: "You have successfully logged out.",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
    navigate('/login'); 
  };

  return <Button colorScheme="red" onClick={handleLogout}>Logout</Button>;
}

export default LogoutButton;
