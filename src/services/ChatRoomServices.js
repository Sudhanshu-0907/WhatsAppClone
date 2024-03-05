import { fetchUserAttributes } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
const client = generateClient();

export const getCommonChatRoomWithUser = async (userID) => {
  const authUser = await fetchUserAttributes();

  // get all chat room of user1
  const response = await client.graphql(({
    query:listChatRooms,
    variables:{
      id:authUser.sub
    }
  }))

  const chatRooms = response.data?.getUser?.ChatRooms?.items || [];

  const chatRoom = chatRooms.find((chatRoomItem) => {
    return (
      chatRoomItem.chatRoom.users.items.length === 2 &&
      chatRoomItem.chatRoom.users.items.some(
        (userItem) => userItem.user.id === userID
      )
    );
  });

  return chatRoom;
};

export const listChatRooms = /* GraphQL */ `
    query GetUser($id: ID!) {
        getUser(id: $id) {
            id
            ChatRooms {
                items {
                    chatRoom {
                        id
                        users {
                            items {
                                user {
                                    id
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;
