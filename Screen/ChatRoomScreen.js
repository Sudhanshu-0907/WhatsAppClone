import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import ChatRoomData from '../data/Chats';
import {ActivityIndicator, FlatList, ImageBackground} from 'react-native';
import ChatMessage from '../Components/ChatMessage';
import BG from '../assets/images/BG.png';
import InputBox from '../Components/InputBox';
import {getChatRoom, listMessagesByChatRoom} from '../src/graphql/queries';
import {fetchUserAttributes} from 'aws-amplify/auth';
import {generateClient} from 'aws-amplify/api';
import {onCreateMessage, onUpdateChatRoom} from '../src/graphql/subscriptions';
import {updateChatRoom} from '../src/graphql/mutations';

const ChatRoomScreen = () => {
  const [chatRoom, setChatRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const route = useRoute();
  const chatRoomId = route.params.id;
  const client = generateClient();

  //fetch chatRoom
  useEffect(() => {
    const fetchData = async () => {
      const userData = await client
        .graphql({
          query: getChatRoom,
          variables: {
            id: chatRoomId,
          },
        })
        .then(result => {
          setChatRoom(result.data.getChatRoom);
        });

      const subscription = client
        .graphql({
          query: onUpdateChatRoom,
          variables: {
            filter: {id: {eq: chatRoomId}},
          },
        })
        .subscribe({
          next: ({data}) => {
            setChatRoom(cr => ({
              ...(cr || {}),
              ...data.onUpdateChatRoom,
            }));
          },
          error: err => console.warn(err),
        });

      return () => subscription.unsubscribe();
    };
    fetchData();
  }, [chatRoomId]);

  //fetch Messages
  useEffect(() => {
    const fetchData = async () => {
      const userData = await client
        .graphql({
          query: listMessagesByChatRoom,
          variables: {
            chatroomID: chatRoomId,
            sortDirection: 'DESC',
          },
        })
        .then(result => {
          setMessages(result.data?.listMessagesByChatRoom?.items);
        });

      // Subscribe to new messages
      const subscription = client
        .graphql({
          query: onCreateMessage,
          variables: {
            filter: {chatroomID: {eq: chatRoomId}},
          },
        })
        .subscribe({
          next: async ({data}) => {
            setMessages(m => [data?.onCreateMessage, ...m]);
            await client.graphql({
              query: updateChatRoom,
              variables: {
                input: {
                  id: chatRoomId,
                  chatRoomLastMessageId: data.onCreateMessage.id,
                },
              },
            });
          },
          error: err => console.warn(err),
        });
      return () => subscription.unsubscribe();
    };
    fetchData();
  }, [chatRoomId]);

  if (!chatRoom) {
    return <ActivityIndicator />;
  }

  return (
    <ImageBackground style={{flex: 1}} source={BG}>
      <FlatList
        data={messages}
        windowSize={10}
        renderItem={({item}) => <ChatMessage message={item} />}
        inverted
      />
      <InputBox chatRoom={chatRoom} />
    </ImageBackground>
  );
};
export default ChatRoomScreen;
