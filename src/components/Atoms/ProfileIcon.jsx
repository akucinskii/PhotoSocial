import React from "react";

function ProfileIcon({ url }) {
  console.log("url profile icon", url);
  return (
    <button>
      <div className="align-center items-center mt-auto mb-auto rounded-full overflow-hidden">
        <img src={url} alt="" className="object-cover w-[24px] h-[24px]" />
      </div>
    </button>
  );
}

export default ProfileIcon;
