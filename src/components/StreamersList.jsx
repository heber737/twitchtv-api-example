/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import ListItem from "./ListItem";

function StreamersList({ filter, channelList }) {
    const [users, setUsers] = useState(undefined);
    const [streaming, setStreaming] = useState(undefined);
    
    const streamingObject = streaming
      ? streaming.data.reduce(
          (a, v) => ({
            ...a,
            [v.user_login]: { game: v.game_name, title: v.title },
          }),
          {}
        )
      : {};
  
    function calculateUsersData() {
      if (users) {
        const array = [];
        for (let i = 0; i < users.data.length; i++) {
          const obj = {
            id: users.data[i].id,
            login: users.data[i].login,
            name: users.data[i].display_name,
            image: users.data[i].profile_image_url,
            streaming: streamingObject[users.data[i].login] ?? false,
          };
          array.push(obj);
        }
        const sortedArray = array.sort((a, b) => {
          if (a.login[0] <= b.login[0]) {
            return -1;
          } else {
            return 1;
          }
        });
        return sortedArray;
      } else {
        return {};
      }
    }
  
    const userData = calculateUsersData();
  
    useEffect(() => {
      function getUrl(type, id, userList) {
        const appendage = userList
          .map((x) => {
            return `${id}=${x}`;
          })
          .join("&");
        const urlString = `${type}?${appendage}`;
        return urlString;
      }
  
      async function getUsersInfo() {
        try {
          const userResponse = await fetch(
            `https://twitch-proxy.freecodecamp.rocks/helix/${getUrl(
              "users",
              "login",
              channelList
            )}`
          );
          const userJson = await userResponse.json();
          const streamResponse = await fetch(
            `https://twitch-proxy.freecodecamp.rocks/helix/${getUrl(
              "streams",
              "user_login",
              channelList
            )}`
          );
          const streamJson = await streamResponse.json();
  
          setUsers(userJson);
          setStreaming(streamJson);
        } catch (error) {
          console.error(error);
        }
      }
      getUsersInfo();
    }, [channelList]);
  
    if (users) {
      return (
        <ul className="divide-y-2 border-b-2">
          {(filter === "ONLINE" || filter === "ALL") &&
            userData.map((user, i) => {
              if (user.streaming) {
                return (
                  <ListItem
                    key={i}
                    filter={filter}
                    user={user}
                    bgColor="bg-plavender"
                  />
                );
              }
            })}
          {(filter === "OFFLINE" || filter === "ALL") &&
            userData.map((user, i) => {
              if (!user.streaming) {
                return (
                  <ListItem
                    key={i}
                    filter={filter}
                    user={user}
                    bgColor="bg-periwinkle"
                  />
                );
              }
            })}
        </ul>
      );
    }
  }

  export default StreamersList;