import React, { useState, useEffect, useRef } from 'react'
import {
  Box,
  Button,
  Input,
  VStack,
  Text,
  HStack,
  Avatar,
} from '@chakra-ui/react'
import {
  connectSocket,
  disconnectSocket,
  subscribeToChat,
  sendMessage,
} from '../api/Socket'
import LogoutButton from './Logout'
import { fetchConversations } from '../api/Conversations'

function ChatPage() {
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([])
  const vStackRef = useRef(null)
  const user = localStorage.getItem('identifier');
  
  useEffect(() => {
    const fetchChatMessages = async () => {
      const response = await fetchConversations(user)
      if (response) {
        response.map((obj) => {
          setChat((prevChat) => [...prevChat, obj.message])
          setChat((prevChat) => [...prevChat, obj.message])
        })
      }
    }

    fetchChatMessages()

    const token = localStorage.getItem('jwt')
    const socket = connectSocket(token)

    subscribeToChat((newMessage) => {
      setChat((prevChat) => [...prevChat, newMessage])
    })

    return () => {
      setChat([]);
      disconnectSocket()
    }
  }, []) 

  useEffect(() => {
    vStackRef.current?.scrollTo(0, vStackRef.current?.scrollHeight)
  }, [chat])

  const handleSendMessage = () => {
    if (message.length > 0) {
      const messageData = {
        message: message,
        identifier: user,
      }
      console.log('message data ', messageData)
      sendMessage(message)
      setChat((prevChat) => [...prevChat, message])
      setMessage('')
    }
  }

  return (
    <Box
      bg="gray.100"
      minH="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <HStack
        width="100%"
        justify="space-between"
        p={4}
        bg="white"
        boxShadow="sm"
      >
        <Text fontSize="2xl" fontWeight="bold">
          Chat Room
        </Text>
        <LogoutButton />
      </HStack>
      <VStack
        spacing={4}
        p={5}
        mt={2}
        w="80%"
        flex="1"
        bg="white"
        borderRadius="lg"
        boxShadow="md"
        overflowY="hidden"
        maxH="90vh"
      >
        <Box
          ref={vStackRef}
          w="100%"
          p={4}
          borderWidth="1px"
          borderRadius="lg"
          bg="white"
          flex="1"
          overflowY="auto"
        >
          {chat.map((msg, index) => (
            <HStack
              key={index}
              mb={3}
              justify={index % 2 === 0 ? 'flex-end' : 'flex-start'}
            >
              {index % 2 !== 0 && <Avatar size="sm" name="Server" />}
              <Box
                maxW="70%"
                bg={index % 2 === 0 ? 'blue.100' : 'green.100'}
                borderRadius="md"
                p={3}
                boxShadow="sm"
              >
                <Text>{msg}</Text>
              </Box>
              {index % 2 === 0 && <Avatar size="sm" name="User" />}
            </HStack>
          ))}
        </Box>
        <HStack w="100%" spacing={4} pt={5}>
          <Input
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                handleSendMessage()
              }
            }}
            flex="1"
            bg="white"
          />
          <Button onClick={handleSendMessage} colorScheme="blue">
            Send
          </Button>
        </HStack>
      </VStack>
    </Box>
  )
}

export default ChatPage
