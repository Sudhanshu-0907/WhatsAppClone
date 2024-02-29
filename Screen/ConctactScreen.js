import React from "react";
import {FlatList, View} from "react-native";
import users from "../data/Users";
import ContactListItem from "../Components/ContactListItem";


const ContactScreen = () => {
    return (
        <View>
            <FlatList
                style={{width: '100%'}}
                data={users}
                renderItem={({item}) => <ContactListItem user={item}/>}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}
export default ContactScreen;