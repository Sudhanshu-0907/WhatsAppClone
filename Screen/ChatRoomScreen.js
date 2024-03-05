import React, { useEffect, useState } from "react";
import {useRoute} from "@react-navigation/native";
import ChatRoomData from '../data/Chats'
import { ActivityIndicator, FlatList, ImageBackground } from "react-native";
import ChatMessage from "../Components/ChatMessage";
import BG from "../assets/images/BG.png";
import InputBox from "../Components/InputBox";
import { getChatRoom } from "../src/graphql/queries";
import { fetchUserAttributes } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";


const ChatRoomScreen = () => {
    const [chatRoom,setChatRoom]=useState(null);
    const route = useRoute();
    const chatRoomId= route.params.id;
    const client = generateClient();


    useEffect( () => {

       const fetchData=async() =>{
           const userData = await client.graphql({
               query: getChatRoom,
               variables:{
                   id:chatRoomId
               }
           }).then(result=>setChatRoom(result.data.getChatRoom));
        }
        fetchData();
    }, []);

    if(!chatRoom){
        return <ActivityIndicator/>
    }

    return (
        <ImageBackground
            style={{flex: 1}}
            source={BG}
        >
            <FlatList
                data={chatRoom.Messages.items}
                renderItem={({item}) => <ChatMessage message={item}/>}
                inverted
            />
            <InputBox chatRoom={chatRoom}/>
        </ImageBackground >
    );
}
export default ChatRoomScreen;
