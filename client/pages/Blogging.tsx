import { useState } from "react";
import Addblog from "./AddBlog";

export default function Blogging({ blogs }: any) {
  const [bblogs, setBlogs] = useState(blogs);
  const [addblog, setAdd] = useState(false);

  function showForm() {
    if (addblog === false) {
      setAdd(true);
    } else {
      setAdd(false);
    }
  }

  return (
    <div className="blogBody">
      <div className="addblog">
        <p>
          feel free and create a new blog{" "}
            <i onClick={()=>setAdd(true)}> here </i>
     
        </p>
        {addblog ? (
          <div>
            <br />
       <Addblog/>
            <br />
          </div>
        ) : null}
      </div>
      {bblogs.map((blog: any, index: number) => (
        <div key={index}>
          <ul className="blogCards">
            <li className="cards__item">
              <div className="blogCards">
                <div className="card__content">
                  <h3>blog Author:{blog.blogAuthor}</h3>
                  <div className="card__title">{blog.blogTitle}</div>
                  {/* <img
                    className="card__image card__image--fence"
                    src={blog.blogImage}
                  /> */}

                  <p className="card__text ellipsis">{blog.blogContent} </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
}
export async function getStaticProps() {
  const blogs = await fetch("http://localhost:2000/api/blogs/get").then(
    (response) => response.json()
  );

  return {
    props: {
      blogs,
    },
  };
}
