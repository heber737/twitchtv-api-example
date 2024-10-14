/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

function SelectStreamers({ channelList }) {
    return (
      <div>
        <h1>Add/delete streamers to/from the list:</h1>
        <textarea rows="10" value={channelList} >
        </textarea>
      </div>
    )
}

export default SelectStreamers;