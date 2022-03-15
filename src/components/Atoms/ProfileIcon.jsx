import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

function ProfileIcon(props) {
  return (
    <button onClick={props.click}>
      <div className="align-center items-center mb-auto rounded-full overflow-hidden">
        {!props.url ? (
          <i className="bx bx-user"></i>
        ) : (
          <LazyLoadImage
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
