import React from "react";
import {Image, Text, TouchableWithoutFeedback, View} from "react-native";
import styles from "./style";
import {useNavigation} from "@react-navigation/native";

const ContactListItem = props => {
    const {user} = props;

    const navigation = useNavigation();

    const onClick = () => {

    }

    return (
        <TouchableWithoutFeedback
            onPress={onClick}
        >
            <View style={styles.container}>
                <View style={styles.lefContainer}>
                    <Image source={{uri: user.imageUri}} style={styles.avatar}/>

                    <View style={styles.midContainer}>
                        <Text style={styles.username}>{user.name}</Text>
                        <Text
                            numberOfLines={2}
                            style={styles.lastMessage}>
                            {user.status}

                        </Text>
                    </View>

                </View>


            </View>
        </TouchableWithoutFeedback>
    )
}
export default ContactListItem;