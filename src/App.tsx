import { useEffect, useState } from "react";
import "./App.css";
import dayjs from "dayjs";

interface authorType {
  id: number;
  name: string;
  role: string;
  place: string;
  avatar_url: string;
}

interface postsType {
  id: number;
  author_id: number;
  title: string;
  body: string;
  image_url: string;
  created_at: string;
}

function App() {
  const [authors, setAuthors] = useState<authorType[]>([]);
  const [posts, setPosts] = useState<postsType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);    

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const authorsResponse  = await fetch("https://maqe.github.io/json/authors.json").then(
          (res) => res.json()
        );
        setAuthors(authorsResponse);
        
        const postsResponse  = await fetch("https://maqe.github.io/json/posts.json").then(
          (res) => res.json()
        );
        setPosts(postsResponse);

        setLoading(false);
      } catch (error) {
        setError("An error occurred while fetching data.");
        setLoading(false);
      }
      
    }
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <div className="app-container">
        <h1 className="forum-title">MAQE Forum</h1>
        <p className="timezone-info">Your current timezone is: Asia/Bangkok</p>
        <section className="forum-section">
          {posts.map((post: postsType) => {
            const author = authors.find(
              (author) => author.id === post.author_id
            );
            return (
              <div className="post-container" key={post.id}>
                <div className="author-info">
                  <img
                    className="author-avatar"
                    src={author?.avatar_url}
                    alt="avatar"
                  />
                  <p className="author-name">{author?.name}</p>
                  <p className="post-date">posted on {dayjs(post.created_at).locale('en').format('dddd, MMMM DD, YYYY, HH:mm')}</p>
                </div>
                <hr />
                <div className="post-content">
                  <img
                    className="content-picture"
                    src={post.image_url}
                    alt="Content picture"
                  />
                  <div className="content-info">
                    <p className="content-title">{post.title}</p>
                    <p className="content-description">{post.body}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </>
  );
}

export default App;
