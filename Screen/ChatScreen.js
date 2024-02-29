import React from "react";
import {FlatList, View} from "react-native";
import ChatListItem from '../Components/ListChatItem'
import chatRoom from "../data/ChatRoom";
import NewMessageButton from "../Components/NewMessageButton";


const ChatScreen = () => {
    return (
        <View>
            <FlatList
                style={{width: '100%'}}
                data={chatRoom}
                renderItem={({item}) => <ChatListItem chatRoom={item}/>}
                keyExtractor={(item) => item.id}
            />
            <NewMessageButton/>
        </View>
    );
}
export default ChatScreen;