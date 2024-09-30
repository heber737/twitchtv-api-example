/* eslint-disable react/prop-types */
import { useState } from "react";
import StreamersList from "./components/StreamersList";
import SelectButton from "./components/SelectButton";

function App() {
  const [filter, setFilter] = useState("ALL");
  function handleButtonClick(value) {
    if (filter !== value) {
      setFilter(value);
    }
  }

  return (
    <div className="w-vw h-full rubik-font bg-white text-slate-800">
      <div className="w-full sm:max-w-xl sm:my-2 min-w-[370px] mx-auto divide-y-2 divide-inherit bg-puce sm:rounded-md overflow-hidden">
        <h1 className="mx-4 h-16 text-center text-4xl leading-[4rem]">
          Twitch Streamers
        </h1>
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
        <StreamersList filter={filter} />
      </div>
    </div>
  );
}


export default App;
