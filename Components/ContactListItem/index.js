import React, {useCallback} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import {generateClient} from 'aws-amplify/api';
import {createChatRoom, createUserChatRoom} from '../../src/graphql/mutations';
import {fetchUserAttributes} from 'aws-amplify/auth';
import {getCommonChatRoomWithUser} from '../../src/services/ChatRoomServices';

const client = generateClient();

const ContactListItem = props => {
  const {user} = props;

  const navigation = useNavigation();

  const onClick = React.useCallback(async () => {
    try {
      const existingChatRoom = await getCommonChatRoomWithUser(user.id);
      if (existingChatRoom) {
        console.log(existingChatRoom);
        navigation.navigate('ChatRoom', {
          id: existingChatRoom.chatRoom.id,
          name: user.name,
        });
        return;
      }

      const newChatRoomData = await client.graphql({
        query: createChatRoom,
        variables: {
          input: {},
        },
      });
      if (!newChatRoomData.data?.createChatRoom) {
        console.log('Error creating chat error');
      }

      const newChatRoom = newChatRoomData.data?.createChatRoom;

      await client.graphql({
        query: createUserChatRoom,
        variables: {
          input: {chatRoomId: newChatRoom.id, userId: user.id},
        },
      });

      const authUser = await fetchUserAttributes();
      await client.graphql({
        query: createUserChatRoom,
        variables: {
          input: {chatRoomId: newChatRoom.id, userId: authUser.sub},
        },
      });

      navigation.navigate('ChatRoom', {
        id: newChatRoom.id,
        name: user.name,
      });
    } catch (e) {
      console.log(e);
    }
  });

  return (
    <TouchableOpacity onPress={onClick}>
      <View style={styles.container}>
        <View style={styles.lefContainer}>
          <Image source={{uri: user.image}} style={styles.avatar} />

          <View style={styles.midContainer}>
            <Text style={styles.username}>{user.name}</Text>
            <Text numberOfLines={2} style={styles.lastMessage}>
              {user.status}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default ContactListItem;
