import './App.css';
import io from 'socket.io-client';
import { useState } from 'react';
import Chat from './Chat';
import { ChakraProvider } from '@chakra-ui/react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
} from '@chakra-ui/react';

const socket = io.connect('http://localhost:3001');

function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== '' && room !== '') {
      socket.emit('join_room', room);
      setShowChat(true);
    }
  };

  return (
    <ChakraProvider>
      <div className='App'>
        {!showChat ? (
          <>
            <Flex minH={'100vh'} align={'center'} justify={'center'}>
              <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                  <Heading fontSize={'4xl'}>Join a ChatRoom</Heading>
                  <Text fontSize={'lg'} color={'gray.600'}>
                    to enjoy all of our cool{' '}
                    <Link color={'blue.400'}>features</Link> ✌️
                  </Text>
                </Stack>
                <Box rounded={'lg'} boxShadow={'lg'} p={8}>
                  <Stack spacing={4}>
                    <FormControl id='name'>
                      <FormLabel>Enter a Name</FormLabel>
                      <Input
                        type='text'
                        onChange={(event) => {
                          setUsername(event.target.value);
                        }}
                      />
                    </FormControl>
                    <FormControl id='roomId'>
                      <FormLabel>Enter a Room ID</FormLabel>
                      <Input
                        type='text'
                        onChange={(event) => {
                          setRoom(event.target.value);
                        }}
                      />
                    </FormControl>
                    <Stack spacing={10}>
                      <Stack
                        direction={{ base: 'column', sm: 'row' }}
                        align={'start'}
                        justify={'space-between'}
                      ></Stack>
                      <Button
                        bg={'blue.400'}
                        color={'white'}
                        _hover={{
                          bg: 'blue.500',
                        }}
                        onClick={joinRoom}
                      >
                        Join A Room
                      </Button>
                    </Stack>
                  </Stack>
                </Box>
              </Stack>
            </Flex>
          </>
        ) : (
          <Chat socket={socket} username={username} room={room} />
        )}
      </div>
    </ChakraProvider>
  );
}

export default App;
