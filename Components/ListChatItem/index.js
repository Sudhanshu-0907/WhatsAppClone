import React ,{useState,useEffect}from "react";
import {Image, Text, TouchableWithoutFeedback, View} from "react-native";
import styles from "./style";
import moment from "moment";
import {useNavigation} from "@react-navigation/native";
import { fetchUserAttributes } from "aws-amplify/auth";

const ListChatItem = (props) => {
    const {chatRoom} = props;
    const [user, setUser] = useState(null);


    useEffect(() => {
        const fetchUser = async () => {

            const authUser = await fetchUserAttributes();
            // Loop through chat.users.items and find a user that is not us (Authenticated user)
            console.log(chatRoom.users.items);
            const userItem = chatRoom.users.items.find(
              (item) => item.user.id !== authUser.sub,
            );
            setUser(userItem?.user);
        };

        fetchUser();
    }, []);

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
