/* eslint-disable react/prop-types */
function ListItem({ user, bgColor }) {
    return (
      <li
        key={user.login}
        className={`flex h-24 w-full gap-4 px-4 ${bgColor} streaming`}
      >
        <img
          className="ml-4 size-16 self-center rounded-2xl"
          src={user.image}
          alt={user.login}
        />
        <div className="flex w-full flex-col items-center justify-evenly text-center sm:flex-row">
          <h3 className="text-center underline sm:basis-2/4">
            <a target="_blank" href={`https://www.twitch.tv/${user.login}`}>
              {user.name}
            </a>
          </h3>
          <p className="text-center sm:basis-2/4">
            {user.streaming ? "Streaming: " + user.streaming.game : "Offline"}
          </p>
        </div>
      </li>
    );
  }

  export default ListItem;