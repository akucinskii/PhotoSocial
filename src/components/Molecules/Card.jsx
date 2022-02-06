import React from "react";

function Card(props) {
  let user = [];
  let comment = [];
  let x = props.value.comments;
  for (var i = 0; i < x.length; i++) {
    var obj = x[i];
    // for..in object iteration will set the key for each pair
    // and the value is in obj[key]
    for (var key in obj) {
      user.push(key);
      comment.push(obj[key]);
    }
  }
  console.log(user, comment);
  return (
    <div className="flex flex-col w-full h-fit border-2 p-2 border-gray-800">
      <div className>
        <img
          src={props.value.img}
          alt=""
          className="object-cover object-center h-[32rem] w-full"
        />
        <div>
          <div className="flex flex-row text-3xl pt-3 w-1/2 gap-3">
            <button>
              <i className="bx bx-heart"></i>
            </button>
            <button>
              <i className="bx bx-comment"></i>
            </button>
            <button>
              <i className="bx bx-paper-plane"></i>
            </button>
          </div>
          <div className="p-2">
            <h1>Users who like, and {props.value.likes} users</h1>
            <ul>
              {user.map((value, index) => (
                <li key={index} className="text-sm text-gray-300">
                  {value}: {comment[index]}
                </li>
              ))}
            </ul>
            <p className="text-xs text-gray-600">{props.value.time} ago</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
