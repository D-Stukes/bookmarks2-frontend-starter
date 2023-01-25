import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
const API = process.env.REACT_APP_API_URL;

function BookmarkDetails() {
  const [bookmark, setBookmark] = useState({});
  let { id } = useParams();

  let navigate = useNavigate();

// Inside BookmarkDetails function
const deleteBookmark = () => {
  axios
    .delete(`${API}/bookmarks/${id}`)
    .then(
      () => {
        navigate(`/bookmarks`);
      },
      (error) => console.error(error)
    )
    .catch((c) => console.warn("catch", c));
};

  const handleDelete = () => {
    console.log("button clicked");
    deleteBookmark()
  };


 useEffect(() => {
  axios
  .get(`${API}/bookmarks/${id}`)
  .then((response) => {
    console.log(response.data);
    setBookmark(response.data);
  })
  .catch((c) => {
    console.warn("catch", c);
  });
  }, [id, API]);

  return (
    <article>
    <h3>
        {bookmark.is_favorite ? <span>⭐️</span> : null} {bookmark.name}
    </h3>
    <h5>
        <span>
          <a href={bookmark.url}>{bookmark.name}</a>
        </span>{" "}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {bookmark.url}
    </h5>
    <h6>{bookmark.category}</h6>
    <p>{bookmark.description}</p>
    <div className="showNavigation">
        <div>
          {" "}
          <Link to={`/bookmarks`}><button>Back</button></Link>
        </div>
        <div>
          <Link to={`/bookmarks/${id}/edit`}> <button>Edit</button></Link>
        </div>
        <div>
         <button onClick={handleDelete}>Delete</button>
        </div>
    </div>
  </article>
);
  }
export default BookmarkDetails;



