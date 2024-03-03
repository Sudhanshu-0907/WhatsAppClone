import React, { useEffect, useState } from "react";
import {FlatList, View} from "react-native";
import users from '../data/Users';
import ContactListItem from '../Components/ContactListItem';
import { generateClient } from "aws-amplify/api";
import { listUsers, getUser } from "../src/graphql/queries";

const client = generateClient()


const ContactScreen = () => {
  const [user,setusers] =useState([]);
  useEffect( () => {
    try{
      // List all items
      const fetchData=async ()=>{
        const allUsers = await client.graphql({
          query: listUsers
        });
        setusers(allUsers.data)
        console.log(allUsers.data);

      }
      fetchData()
    }catch (e){
      console.log(e);
    }
  }, []);
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
