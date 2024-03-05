import 'react-native-gesture-handler';
import  React,{useEffect} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Colors from './Constant/Color';
import StackNavigator from "./navigation/StackNavigator";
import {Amplify} from 'aws-amplify';
import amplifyconfig from './src/amplifyconfiguration.json';
import {
  withAuthenticator,
  useAuthenticator
} from '@aws-amplify/ui-react-native';

import { generateClient } from 'aws-amplify/api';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { getUser } from "./src/graphql/queries";
import { createUser } from "./src/graphql/mutations";

const client = generateClient();


Amplify.configure({... amplifyconfig,Analytics:{disable:true} });


export function App() {

  useEffect(() => {
    const syncUser = async () => {
      // get Auth user
      const authUser = await fetchUserAttributes();


      // query the database using Auth user id (sub)
      const userData = await client.graphql({
        query: getUser,
        variables:{
          id:authUser.sub
        }
      });
      if (userData.data.getUser) {
        console.log("User already exists in DB");
        return;
      }
      // if there is no users in db, create one
      const newUser = {
        id: authUser.sub,
        name: authUser.email,
        status: "Hey, I am using WhatsApp",
      };

      await client.graphql({
        query: createUser,
        variables: {
          input: newUser,
        },
      });
    }

    syncUser();
  }, []);


  return (
        <NavigationContainer>
            <StatusBar
                animated={true}
                backgroundColor={Colors.light.tint}
                barStyle='default'
                showHideTransition='fade'
            />
            <StackNavigator/>
        </NavigationContainer>
    );
}
export default withAuthenticator(App);
