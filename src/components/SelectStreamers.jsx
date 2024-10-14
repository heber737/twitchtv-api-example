/* eslint-disable react/prop-types */
import { useState } from "react";

function SelectStreamers({ channelList, setShowSelect, onChannelsUpdate }) {
  const [listInput, setListInput] = useState(channelList);

  function handleListChange(e) {
    setListInput(e.target.value);
  }

  return (
    <div className="p-4 bg-puce">
      <h1 className="text-xl text-center mb-2">Add or delete streamers:</h1>
      <p className="mb-4">
        Enter Twitch streamers IDs (30 max) separated by comma, without blank
        spaces, and click on Save. Non valid IDs will not show on the list.
      </p>
      <textarea
        className="block w-11/12 h-40 p-2 mb-4 mx-auto"
        onChange={(e) => handleListChange(e)}
        value={listInput}
      ></textarea>
      <div className="w-11/12 flex justify-end gap-2 mx-auto">
        <button
          className="bg-periwinkle p-2 rounded hover:bg-plavender"
          onClick={() => {
            listInput == channelList.join() ? null : onChannelsUpdate(listInput);
            setShowSelect(false);
          }}
        >
          Save
        </button>
        <button
          className="bg-periwinkle p-2 rounded hover:bg-plavender"
          onClick={() => setShowSelect(false)}
        >
          Discard
        </button>
      </div>
    </div>
  );
}

export default SelectStreamers;
