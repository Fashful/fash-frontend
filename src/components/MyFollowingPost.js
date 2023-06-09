import React, { useEffect, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Home() {
  var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [comment, setComment] = useState("");
  const [show, setShow] = useState(false);
  const [item, setItem] = useState([]);
  const [likeIDs, setLikeIDs] = useState([]);
  
  // Toast functions
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("./signin");
    }

    // Fetching all posts
    fetch("http://127.0.0.1:5000/api/posts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result.posts);

      })
      .catch((err) => {console.log(err); navigate("./signin");});
        // Fetching all likes from posts
    fetch("http://127.0.0.1:5000/api/get_like_for_all_posts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        let json = {}
        result.all_posts_likes.forEach(item => {
          Object.keys(item).forEach(key => {
            json[key] = item[key];
          });
        });
        setLikeIDs(json)

      })
      .catch((err) => {console.log(err); navigate("./signin");});
  }, []);

  // to show and hide comments
  const toggleComment = (posts) => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
      setItem(posts);
    }
  };
  const checkLike = (id) => {
    if (likeIDs[id] !== undefined) return (likeIDs[id]).includes(JSON.parse(localStorage.getItem("user")).id)
    else return false
  }
  const likePost = (id) => {
    fetch(`http://127.0.0.1:5000/api/like_unlike/${id}`, {
      method: "post",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result)
      })
      .catch((err) => console.log(err));
  };

  // function to make comment
  const makeComment = (text, id) => {
    fetch(`http://127.0.0.1:5000/api/posts/${id}/make_comment`, {
      method: "post",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        body: text

      })
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result)
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="home">
      {/* card */}
      {data.map((posts) => {
        return (
          <div className="card">
            {/* card header */}
            <div className="card-header">
              <div className="card-pic">
                <img
                  src={posts.author_details.profile_image !== "NULL" ? posts.author_details.profile_image : picLink}
                  alt=""
                />
              </div>
              <h5>
                <Link to={`/profile/${posts.author_details.user_id}`}>
                  {posts.author_details.username}
                </Link>
              </h5>
            </div>
            {/* card image */}
            <div className="card-image">
              <img src={posts.uploaded_content_url} alt="" />
            </div>

            {/* card content */}
            <div className="card-content">
              {checkLike(posts.id) ? (
                <span
                  className="material-symbols-outlined material-symbols-outlined-red"
                  onClick={() => {
                    likePost(posts.id);
                  }}
                >
                  favorite
                </span>
              ) : (
                <span
                  className="material-symbols-outlined"
                  onClick={() => {
                    likePost(posts.id);
                  }}
                >
                  favorite
                </span>
              )}

              <p>{posts.likes.length} Likes</p>
              <p>{posts.body} </p>
              <p
                style={{ fontWeight: "bold", cursor: "pointer" }}
                onClick={() => {
                  toggleComment(posts);
                }}
              >
                View all comments
              </p>
            </div>

            {/* add Comment */}
            <div className="add-comment">
              <span className="material-symbols-outlined">mood</span>
              <input
                type="text"
                placeholder="Add a comment"
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
              <button
                className="comment"
                onClick={() => {
                  makeComment(comment, posts.id);
                }}
              >
                Post
              </button>
            </div>
          </div>
        );
      })}

      {/* show Comment */}
      {show && (
        <div className="showComment">
          <div className="container">
            <div className="postPic">
              <img src={item.photo} alt="" />
            </div>
            <div className="details">
              {/* card header */}
              <div
                className="card-header"
                style={{ borderBottom: "1px solid #00000029" }}
              >
                <div className="card-pic">
                  <img
                    src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                    alt=""
                  />
                </div>
                <h5>{item.postedBy.name}</h5>
              </div>

              {/* commentSection */}
              <div
                className="comment-section"
                style={{ borderBottom: "1px solid #00000029" }}
              >
                {item.comments.map((comment) => {
                  return (
                    <p className="comm">
                      <span
                        className="commenter"
                        style={{ fontWeight: "bolder" }}
                      >
                        {comment.postedBy.name}{" "}
                      </span>
                      <span className="commentText">{comment.comment}</span>
                    </p>
                  );
                })}
              </div>

              {/* card content */}
              <div className="card-content">
                <p>{item.likes.length} Likes</p>
                <p>{item.body}</p>
              </div>

              {/* add Comment */}
              <div className="add-comment">
                <span className="material-symbols-outlined">mood</span>
                <input
                  type="text"
                  placeholder="Add a comment"
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                />
                <button
                  className="comment"
                  onClick={() => {
                    makeComment(comment, item._id);
                    toggleComment();
                  }}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
          <div
            className="close-comment"
            onClick={() => {
              toggleComment();
            }}
          >
            <span className="material-symbols-outlined material-symbols-outlined-comment">
              close
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
