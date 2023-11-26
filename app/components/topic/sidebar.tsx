"use client";
import axios from "axios";

import { useEffect, useState } from "react";

export function TopicSidebar() {
  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <TopicList />
      </div>
    </div>
  );
}

function TopicList() {
  const [topics, setTopics] = useState<string[]>([]);
  const fetchTopics = async () => {
    try {
      // TODO: Add pagination
      const res = await axios.get("/api/topic");
      if (res.status === 200) {
        setTopics(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchTopics();
  }, []);
  return (
    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
      <NewTopicButton />
      {topics.map((topic) => (
        <li key={topic}>
          <a>{topic}</a>
        </li>
      ))}
      {/*
      <li>
        <a>Sidebar Item 1</a>
      </li>
      <li>
        <a>Sidebar Item 2</a>
      </li>
      */}
    </ul>
  );
}

function NewTopicButton() {
  return (
    <>
      <button
        className="btn"
        onClick={() => document.getElementById("add-topic-btn")?.showModal()}
      >
        Add Topic
      </button>
      <dialog id="add-topic-btn" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add new topic</h3>
          <div className="py-4">
            <NewTopicForm />
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

function NewTopicForm() {
  const [title, setTitle] = useState("");
  const handleSubmit = async () => {
    try {
      const res = await axios.post("/api/topic", { title });
      // TODO: Add toast to show success
      if (res.status === 200) {
        alert("Topic added successfully");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setTitle("");
      document.getElementById("add-topic-btn")?.close();
    }
  };
  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
          className="input input-bordered w-full"
          required
        />
      </div>
      <div className="w-full flex justify-end gap-4">
        <button className="btn btn-primary mt-4" onClick={handleSubmit}>
          Add
        </button>
        <form method="dialog">
          <button className="btn btn-ghost mt-4" onClick={() => setTitle("")}>
            Cancel
          </button>
        </form>
      </div>
    </>
  );
}
