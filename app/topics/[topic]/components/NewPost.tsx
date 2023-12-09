"use client";

import { useState } from "react";

export function CreateNewPost() {
  return (
    <>
      <div
        className="w-full p-4 cursor-pointer"
        onClick={() => document.getElementById("new-post-modal").showModal()}
      >
        <div className="p-4 border border-sky-50 rounded text-center">
          Create New Post
        </div>
      </div>
      <dialog id="new-post-modal" className="modal">
        <div className="modal-box">
          <NewPostDialog />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

function NewPostDialog() {
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
    <div className="p-4">
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Post URL</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full"
          onBlur={(e) => console.log(e.target.value)}
        />
      </label>
    </div>
  );
}
