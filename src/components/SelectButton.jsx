/* eslint-disable react/prop-types */
function SelectButton({ filter, buttonText, bgColor, handleClick }) {
    return (
      <button
        onClick={(e) => handleClick(e.target.value)}
        className={`${bgColor} basis-4/12 ${
          filter === buttonText && `font-semibold`
        }`}
        value={buttonText}
      >
        {buttonText}
      </button>
    );
  }

  export default SelectButton;