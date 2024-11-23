import { useState } from "react";
import StreamersList from "./components/StreamersList";
import SelectButton from "./components/SelectButton";
import SelectStreamers from "./components/SelectStreamers";
import initialChannelList from "./initialChannelList";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

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

  function handleSelectButtonClick(value) {
    if (filter !== value) {
      setFilter(value);
    }
  }

  function handleDropdownButtonClick() {
    setShowSelect(!showSelect);
  }

  function handleChannelsUpdate(newChannels) {
    const regex = new RegExp(/\s+/, "gi");
    const newChannelsArr = newChannels
      .split(",")
      .filter((x) => x !== "" && !regex.test(x));
    const trimedChannelsArr = newChannelsArr.slice(0, 30);
    if (newChannelsArr.length < 1) {
      alert("The list must have at least one streamer ID");
      return;
    }
    if (newChannelsArr.length > 30) {
      alert("Max length exceeded. Only the first 30 IDs where saved.");
    }
    setChannelList(trimedChannelsArr);
    localStorage.setItem(
      "storedChannelList",
      JSON.stringify(trimedChannelsArr)
    );
  }

  return (
    <div className="w-vw h-full rubik-font text-slate-800 overflow-hidden">
      <div className="w-full sm:max-w-xl sm:my-2 min-w-[370px] mx-auto divide-y-2 divide-inherit bg-puce sm:rounded-md overflow-hidden">
        <h1 className="mx-4 h-16 text-center text-4xl leading-[4rem]">
          Twitch Streamers
        </h1>
        <button
          className="h-10 w-full text-xl bg-plavender hover:bg-periwinkle"
          onClick={handleDropdownButtonClick}
        >
          <div className="w-full flex justify-center gap-1">
            <span>Update Streamers List</span>
            {showSelect ? (
              <IoMdArrowDropup className="size-8 relative top-[-1px]" />
            ) : (
              <IoMdArrowDropdown className="size-8 relative top-[-1px]" />
            )}
          </div>
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
            onSelectButtonClick={handleSelectButtonClick}
            buttonText="ALL"
            bgColor="bg-puce"
          />
          <SelectButton
            filter={filter}
            onSelectButtonClick={handleSelectButtonClick}
            buttonText="ONLINE"
            bgColor="bg-plavender"
          />
          <SelectButton
            filter={filter}
            onSelectButtonClick={handleSelectButtonClick}
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
