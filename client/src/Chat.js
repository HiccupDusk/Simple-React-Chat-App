import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  Box,
  Container,
  Grid,
} from '@chakra-ui/react';
import { HiOutlinePaperAirplane } from 'react-icons/hi';

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit('send_message', messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage('');
    }
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <>
      <Flex minH={'100vh'} align={'center'} justify={'center'}>
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}
          bg='gray.50'
        >
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
            LIVE CHAT-ROOM: {room}
          </Heading>
          <Text
            fontSize={{ base: 'sm', sm: 'md' }}
            color={useColorModeValue('gray.800', 'gray.400')}
          >
            Start a message!
          </Text>
          <Box height='50vh'>
            <Flex
              w='100%'
              h='100%'
              overflowY='scroll'
              flexDirection='column'
              p='3'
            >
              {messageList.map((messageContent) => {
                return (
                  <Flex
                    className='message'
                    id={username === messageContent.author ? 'you' : 'other'}
                    justify='flex-end'
                  >
                    <Box>
                      <Flex
                        color='white'
                        bg={
                          username === messageContent.author
                            ? '#4299e1'
                            : '#6301ed'
                        }
                        width='max-content'
                        p='2'
                        borderRadius='base'
                      >
                        <Text>{messageContent.message}</Text>
                      </Flex>
                      <Flex direction='row' mt='3' gap='5'>
                        <Text id='time'>{messageContent.time}</Text>
                        <Text id='author'>{messageContent.author}</Text>
                      </Flex>
                    </Box>
                  </Flex>
                );
              })}
            </Flex>
          </Box>
          {/* footer */}
          <Input
            _placeholder={{ color: 'gray.500' }}
            type='text'
            value={currentMessage}
            placeholder='Type a message...'
            onChange={(event) => {
              setCurrentMessage(event.target.value);
            }}
            onKeyPress={(event) => {
              event.key === 'Enter' && sendMessage();
            }}
          />
          <Stack spacing={6}>
            <Button
              onClick={sendMessage}
              rightIcon={<HiOutlinePaperAirplane />}
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
            >
              Send message
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </>
  );
}

export default Chat;
