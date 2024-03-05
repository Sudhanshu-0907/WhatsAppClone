import React, { useEffect, useState } from "react";
import {FlatList, View} from "react-native";
import ChatListItem from '../../Components/ListChatItem'
// import chatRoom from "../../data/ChatRoom";
import NewMessageButton from "../../Components/NewMessageButton";
import {listChatRooms} from "./query"
import { fetchUserAttributes } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";

const client = generateClient();


const ChatScreen = () => {
  const [chatRoom,setChatRooms]=useState([])
  useEffect(() => {
    try{
      const fetchChatRoom=async ()=>{
        const authUser = await fetchUserAttributes();
        const response = await client.graphql(({
          query:listChatRooms,
          variables:{
            id:authUser.sub
          }
        })).catch(e=>{
          console.log(e);
        })
        setChatRooms(response.data.getUser.ChatRooms.items);
      }
      fetchChatRoom();
    }catch(e){
      console.log(e)
    }
  }, []);
    return (
        <View style={{flex:1}}>
            <FlatList
                style={{width: '100%'}}
                data={chatRoom}
                renderItem={({item}) => <ChatListItem chatRoom={item.chatRoom}/>}
                keyExtractor={(item) => item.id}
            />
            <NewMessageButton/>
        </View>
    );
}
export default ChatScreen;
