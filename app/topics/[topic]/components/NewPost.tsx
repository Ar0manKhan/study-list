"use client";

import axios, { Axios, AxiosError } from "axios";
import { useState } from "react";

export function CreateNewPost({ topic }: { topic: string }) {
  return (
    <>
      <div
        className="w-full p-4 cursor-pointer"
        onClick={() =>
          (
            document.getElementById("new-post-dailog") as HTMLDialogElement
          ).showModal()
        }
      >
        <div className="p-4 border border-sky-50 rounded text-center">
          Create New Post
        </div>
      </div>
      <dialog id="new-post-dailog" className="modal">
        <div className="modal-box">
          <NewPostDialog topic={topic} />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

function NewPostDialog({ topic }: { topic: string }) {
  type NewPostDialogProps = {
    url: string;
    title: string;
    description: string;
  };
  const [post, setPost] = useState<NewPostDialogProps>({
    url: "",
    title: "",
    description: "",
  });

  return (
    <div className="flex flex-col gap-4">
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Post URL</span>
        </div>
        <input
          type="url"
          placeholder="https://example.com/xyz/123"
          className="input input-bordered w-full"
          // BUG: This doesn't work when the user replaces the URL with another URL
          onBlur={async (e) => {
            const url = e.target.value;
            if (url === "") return;
            const res = await axios.post("/api/scrape", { url });
            const { title } = res.data;
            if (post.title === "") {
              setPost({
                ...post,
                url,
                title,
              });
            }
          }}
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Post Title</span>
        </div>
        <input
          type="text"
          placeholder="NextJs app directory..."
          className="input input-bordered w-full"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Description</span>
        </div>
        <textarea
          className="textarea textarea-bordered h-24"
          placeholder="This is a stable feature..."
          value={post.description}
          onChange={(e) => setPost({ ...post, description: e.target.value })}
        ></textarea>
      </label>
      <div className="flex justify-end gap-4">
        <button
          className="btn btn-primary"
          onClick={async () => {
            if (post.url === "" || post.title === "") {
              return alert("URL and Title are required");
            }
            try {
              const res = await axios.post("/api/post", { topic, ...post });
              console.log(res);
            } catch (err: any) {
              err = err as AxiosError;
              console.log(err);
              if (err.response?.status === 409) {
                return alert("Post already exists");
              }
            }
          }}
        >
          Add
        </button>
        <button
          className="btn btn-warning"
          onClick={() => {
            setPost({ url: "", title: "", description: "" });
          }}
        >
          Reset
        </button>
        <button
          className="btn btn-ghost"
          onClick={() =>
            (
              document.getElementById("new-post-dailog") as HTMLDialogElement
            ).close()
          }
        >
          Close
        </button>
      </div>
    </div>
  );
}
