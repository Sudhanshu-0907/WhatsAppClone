import React from "react";
import {useRoute} from "@react-navigation/native";
import ChatRoomData from '../data/Chats'
import {FlatList, ImageBackground} from "react-native";
import ChatMessage from "../Components/ChatMessage";
import BG from "../assets/images/BG.png";


const ChatRoomScreen = () => {
    const route = useRoute();
    return (
        <ImageBackground
            style={{flex: 1}}
            source={BG}
        >
            <FlatList
                data={ChatRoomData.messages}
                renderItem={({item}) => <ChatMessage message={item}/>}
                inverted
            />
        </ImageBackground>
    );
}
export default ChatRoomScreen;