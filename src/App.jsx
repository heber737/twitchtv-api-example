/* eslint-disable react/prop-types */
import { useState } from "react";
import StreamersList from "./components/StreamersList";
import SelectButton from "./components/SelectButton";
import SelectStreamers from "./components/SelectStreamers";
import initialChannelList from "./initialChannelList";

// LOCAL STORAGE AVAILABILITY TEST

function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      storage &&
      storage.length !== 0
    );
  }
}

if (
  storageAvailable("localStorage") &&
  !localStorage.getItem("storedChannelList")
) {
  localStorage.setItem("storedChannelList", JSON.stringify(initialChannelList));
}

function App() {
  const [filter, setFilter] = useState("ALL");
  const [channelList, setChannelList] = useState(
    JSON.parse(localStorage.getItem("storedChannelList"))
  );
  const [showSelect, setShowSelect] = useState(false);

  console.log(channelList);

  function handleButtonClick(value) {
    if (filter !== value) {
      setFilter(value);
    }
  }

  function handleChannelsUpdate(newChannels) {
    const newChannelsArr = newChannels.split(",")
    setChannelList(newChannelsArr);
    localStorage.setItem("storedChannelList", JSON.stringify(newChannelsArr));
  }

  return (
    <div className="w-vw h-full rubik-font text-slate-800 overflow-hidden">
      <div className="w-full sm:max-w-xl sm:my-2 min-w-[370px] mx-auto divide-y-2 divide-inherit bg-puce sm:rounded-md overflow-hidden">
        <h1 className="mx-4 h-16 text-center text-4xl leading-[4rem]">
          Twitch Streamers
        </h1>
        <button
          className="h-8 w-full text-xl text-center bg-plavender hover:bg-periwinkle"
          onClick={() => setShowSelect(!showSelect)}
        >
          Update Streamers List
        </button>
        {showSelect && (
          <SelectStreamers
            channelList={channelList}
            onChannelsUpdate={handleChannelsUpdate}
            setShowSelect={setShowSelect}
          />
        )}
        <div className="bg-periwinkle flex h-8 flex-nowrap items-stretch">
          <SelectButton
            filter={filter}
            handleClick={handleButtonClick}
            buttonText="ALL"
            bgColor="bg-puce"
          />
          <SelectButton
            filter={filter}
            handleClick={handleButtonClick}
            buttonText="ONLINE"
            bgColor="bg-plavender"
          />
          <SelectButton
            filter={filter}
            handleClick={handleButtonClick}
            buttonText="OFFLINE"
            bgColor="bg-periwinkle"
          />
        </div>
        <StreamersList filter={filter} channelList={channelList} />
      </div>
    </div>
  );
}

export default App;
