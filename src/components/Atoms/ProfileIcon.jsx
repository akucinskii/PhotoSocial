import React from "react";

function ProfileIcon(props) {
  console.log(props);
  return (
    <button onClick={props.click}>
      <div className="align-center items-center mb-auto rounded-full overflow-hidden">
        {!props.url ? (
          <div className="w-[24px] h-[24px] bg-gray-800" />
        ) : (
          <img
            src={props.url}
            alt=""
            className="object-cover w-[24px] h-[24px]"
          />
        )}
      </div>
    </button>
  );
}

export default ProfileIcon;
