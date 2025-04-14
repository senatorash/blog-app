import { useState, useEffect } from "react";
import { useCreateBlogMutation } from "../../lib/apis/blogApis";
import ProAsh from "../../assets/ProAsh.png";
import Tiptap from "./textEditor/Tiptap";

const NewBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [createBlog, {}] = useCreateBlogMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title || !description || !category || !content) {
      return;
    }
    const htmlContent = editor.getHTML();

    const blogData = {
      title,
      description,
      category,
      content: htmlContent,
    };

    await createBlog(blogData);
  };
  return (
    <section className="container" style={{ overflow: "hidden" }}>
      <div className=" fixed-top d-flex justify-content-between align-items-center mb-3">
        <div>
          <img src={ProAsh} alt="logo" style={{ width: "80px" }} />
        </div>
        <input
          onSubmit={handleSubmit}
          type="submit"
          className="btn btn-primary"
          placeholder="Create Blog
          "
        />
      </div>
      <div className="row">
        <div className="col-lg-2 col-12"></div>
        <div className="col-lg-8 col-12">
          <div className="">
            <input
              type="text"
              // className="form-control"
              style={{ border: "none", outline: "none", fontSize: "50px" }}
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="">
            <input
              type="text"
              placeholder="Description"
              style={{ border: "none", outline: "none", fontSize: "20px" }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="">
            <Tiptap />
          </div>
        </div>
        <div className="col-lg-2 col-12"></div>
      </div>
    </section>
  );
};
export default NewBlog;
