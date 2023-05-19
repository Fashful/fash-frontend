import React, { useEffect, useState } from "react";
import PostDetail from "./PostDetail";
import "./Profile.css";
import ProfilePic from "./ProfilePic";
import { useNavigate } from "react-router-dom";

export default function Profie() {
  var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png";
  const [pic, setPic] = useState([]);
  const [show, setShow] = useState(false);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState("");

  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [profilePhoto, setProfilePhoto] = useState();

  const [changePic, setChangePic] = useState(false);
  const navigate = useNavigate();

  const toggleDetails = (posts) => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
      setPosts(posts);
    }
  };

  const changeprofile = () => {
    if (changePic) {
      setChangePic(false);
    } else {
      setChangePic(true);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("./signin");
    }
    if (JSON.parse(localStorage.getItem("user")).image !== "NULL")
      setProfilePhoto(JSON.parse(localStorage.getItem("user")).image);
    else setProfilePhoto(picLink);

    console.log(profilePhoto);

    fetch(
      `http://127.0.0.1:5000/api/followers/${
        JSON.parse(localStorage.getItem("user")).username
      }`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setFollowers(result.followers);
      })
      .catch((err) => console.log(err));

    fetch(
      `http://127.0.0.1:5000/api/following/${
        JSON.parse(localStorage.getItem("user")).username
      }`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setFollowing(result.following);
      })
      .catch((err) => console.log(err));

    fetch(
      `http://127.0.0.1:5000/api/posts/${
        JSON.parse(localStorage.getItem("user")).id
      }`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setPic(result.posts);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="profile">
      {/* Profile frame */}
      <div className="profile-frame">
        {/* profile-pic */}
        <div className="profile-pic">
          <img onClick={changeprofile} src={profilePhoto} alt="" />
        </div>
        {/* profile-data */}
        <div className="pofile-data">
          <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
          <div className="profile-info" style={{ display: "flex" }}>
            <p>{pic ? pic.length : "0"} posts</p>
            <p>{followers ? followers.length : "0"} followers</p>
            <p>{following ? following.length : "0"} following</p>
          </div>
        </div>
      </div>
      <hr></hr>
      {/* Gallery */}
      <div className="gallery">
        {pic.map((pics) => {
          return (
            // eslint-disable-next-line jsx-a11y/alt-text
            <img
              key={pics.id}
              src={pics.uploaded_content_url}
              onClick={() => {
                toggleDetails(pics);
              }}
              className="item"
            ></img>
          );
        })}
      </div>
      {show && <PostDetail item={posts} toggleDetails={toggleDetails} />}
      {changePic && <ProfilePic changeprofile={changeprofile} />}
    </div>
  );
}
