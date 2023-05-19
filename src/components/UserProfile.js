import React, { useEffect, useState } from "react";
import PostDetail from "./PostDetail";
import "./Profile.css";
import { useParams } from "react-router-dom";

export default function UserProfie() {
  var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png";
  const { userid } = useParams();
  const [isFollow, setIsFollow] = useState(false);
  const [user, setUser] = useState("");
  const [posts, setPosts] = useState([]);

  const [profilePhoto, setProfilePhoto] = useState();
  const [following, setFollowing] = useState();
  const [followers, setFollowers] = useState();
  const [name, setName] = useState();
  const [id, setId] = useState();

  // to follow user
  const followUser = (name) => {
    fetch(`http://127.0.0.1:5000/api/follow/${name}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIsFollow(true);
      });
  };

  // to unfollow user
  const unfollowUser = (name) => {
    fetch(`http://127.0.0.1:5000/api/unfollow/${name}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => {
        res.json();
      })
      .then((data) => {
        console.log(data);
        setIsFollow(false);
      });
  };

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/users/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setName(result.username);
        setFollowers(result.followers);
        setFollowing(result.following);
        setProfilePhoto(result.profile_image);
        setId(result.user_id);
        setPosts(result.posts);

        if (profilePhoto == "NULL") setProfilePhoto(picLink);
        // if (
        //   result.followers.includes(
        //     JSON.parse(localStorage.getItem("user"))._id
        //   )
        // ) {
        //   setIsFollow(true);
        // }

        for (let currentUser of result.followers) {
          if (
            currentUser.user_id == JSON.parse(localStorage.getItem("user")).id
          )
            setIsFollow(true);
        }
      })
      .catch((err) => console.log(err));
  }, [isFollow]);

  return (
    <div className="profile">
      {/* Profile frame */}
      <div className="profile-frame">
        {/* profile-data */}
        <div className="pofile-data">
          {/* profile-pic */}
          <div className="profile-pic">
            <img src={profilePhoto ? profilePhoto : picLink} alt="" />
          </div>
          <div className="top-container">
            <h1 className="user-name-display">{name}</h1>
            <button
              className="followBtn"
              onClick={() => {
                if (isFollow) {
                  unfollowUser(name);
                } else {
                  followUser(name);
                }
              }}
            >
              <p className="followBtnText">
                {isFollow ? "Unfollow" : "Follow"}
              </p>
            </button>
          </div>
          <div className="profile-info">
            <p>{posts.length} posts</p>
            <p>{followers ? ` ${followers.length} ` : " 0 "} followers</p>
            <p>{following ? ` ${following.length} ` : " 0 "} following</p>
          </div>
        </div>
      </div>
      <hr></hr>
      {/* Gallery */}
      <div className="gallery">
        {posts.map((pics) => {
          return (
            // eslint-disable-next-line jsx-a11y/alt-text
            <img
              key={pics.id}
              src={pics.uploaded_content_url}
              // onClick={() => {
              //   toggleDetails(pics);
              // }}
              className="item"
            ></img>
          );
        })}
      </div>
      {/* {show &&
        <PostDetail item={posts} toggleDetails={toggleDetails} />
      } */}
    </div>
  );
}
