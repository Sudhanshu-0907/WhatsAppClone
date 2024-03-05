import React, { useEffect, useState } from "react";
import {Text, View} from "react-native";
import styles from "../ChatMessage/styles";
import moment from "moment";
import { generateClient } from "aws-amplify/api";
import { fetchUserAttributes } from "aws-amplify/auth";
const client = generateClient();

const ChatMessage = ( {message}) => {
    const [isMe,setIsMe]=useState(false)
  useEffect(() => {
    const isMyMessage = async () => {
      const authUser = await fetchUserAttributes();
      setIsMe( message?.userID === authUser.sub);
    }
    isMyMessage();
  }, []);

    return (
        <View style={styles.container}>
            <View
                style={[
                    styles.messageBox, {
                        backgroundColor: isMe ? '#DCF8C5' : 'white',
                        marginLeft: isMe ? 50 : 0,
                        marginRight: isMe ? 0 : 50,
                    }
                ]}
            >
                {isMe &&
                    <Text style={styles.name}>{message?.user?.name}</Text>
                }
                <Text style={styles.message}>{message?.text}</Text>
                <Text style={styles.time}>{moment(message.createdAt).fromNow()}</Text>
            </View>
        </View>
    )
}
export default ChatMessage;
