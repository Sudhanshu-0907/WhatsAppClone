import React from "react";
import {Image, Text, TouchableWithoutFeedback, View} from "react-native";
import styles from "./style";
import moment from "moment";
import {useNavigation} from "@react-navigation/native";

const ListChatItem = (props) => {
    const {chatRoom} = props;
    console.log(chatRoom,'sud');


    const user = chatRoom.users.items[1].user;

    const navigation = useNavigation();

    const onClick = () => {
        navigation.navigate('ChatRoom', {
            id: chatRoom?.id,
            name: user?.name
        })
    }

    return (
        <TouchableWithoutFeedback
            onPress={onClick}
        >
            <View style={styles.container}>
                <View style={styles.lefContainer}>
                    <Image source={{uri: user?.image}} style={styles.avatar}/>

                    <View style={styles.midContainer}>
                        <Text style={styles.username}>{user?.name}</Text>
                        <Text
                            numberOfLines={2}
                            style={styles.lastMessage}>
                            {chatRoom?.lastMessage}

                        </Text>
                    </View>

                </View>

                <Text style={styles.time}>
                    {chatRoom?.lastMessage && moment(chatRoom.lastMessage?.createdAt).format("DD/MM/YYYY")}
                </Text>
            </View>
        </TouchableWithoutFeedback
        >
    )
}
export default ListChatItem;
