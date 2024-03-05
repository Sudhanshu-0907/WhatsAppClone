import React, {useState} from "react";
import {KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, View} from "react-native";
import styles from "./styles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { listChatRooms } from "../../Screen/ChatScreen/query";
import { generateClient } from "aws-amplify/api";
import { fetchUserAttributes } from "aws-amplify/auth";
import {createMessage,updateChatRoom} from  '../../src/graphql/mutations'
const client = generateClient();

const InputBox = ({ chatRoom }) => {

    const [message, setMessage] = useState('');
    const onSend =async ()=>{

        const authUser = await fetchUserAttributes();
        const newMessage = {
            chatroomID: chatRoom.id,
            text:message,
            userID: authUser.sub,
        };

        const newMessageData = await client.graphql(({
            query:createMessage,
            variables:{
                input: newMessage
            }
        }))
        setMessage("");

        console.log(newMessageData);

        await client.graphql(({
            query:updateChatRoom,
            variables:{
                input: {id: chatRoom.id, chatRoomLastMessageId: newMessageData.data.createMessage.id}
            }
        }))


    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={100}
            style={{width: '100%'}}>
            <View style={styles.container}>
                <View style={styles.mainContainer}>
                    <FontAwesome5 name="laugh-beam" size={24} color="grey" style={styles.icon}/>
                    <TextInput
                        placeholder={"Type a message"}
                        style={styles.textInput}
                        multiline
                        value={message}
                        onChangeText={setMessage}
                    />
                    <Entypo name="attachment" size={24} color="grey" style={styles.icon}/>
                    {!message && <Fontisto name="camera" size={24} color="grey" style={styles.icon}/>}
                </View>
                <TouchableOpacity onPress={onSend}>
                    <View style={styles.buttonContainer}>
                        {!message
                            ?
                            <MaterialCommunityIcons name="microphone" size={28} color="white"/>
                            : <MaterialIcons name="send" size={28} color="white"/>}
                    </View>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}
export default InputBox;
