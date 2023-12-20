"use client";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

import { useEffect, useState } from "react";

export function TopicSidebar() {
  return (
    <div className="drawer w-auto">
      <input
        id="topic-sidebar-drawer"
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-content">
        {/* Page content here */}
        <label
          htmlFor="topic-sidebar-drawer"
          className="btn btn-primary drawer-button"
        >
          Show topics
        </label>
      </div>
      <div className="drawer-side z-10">
        <label
          htmlFor="topic-sidebar-drawer"
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
  const [loading, setLoading] = useState(true);
  const fetchTopics = async () => {
    setLoading(true);
    try {
      // TODO: Add pagination
      const res = await axios.get("/api/topic");
      if (res.status === 200) {
        setTopics(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTopics();
  }, []);
  return (
    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
      <NewTopicButton refetchFn={fetchTopics} />
      {loading ? (
        <li>
          <a>Loading...</a>
        </li>
      ) : (
        topics.map((topic) => (
          <li
            key={topic}
            onClick={() =>
              document.getElementById("topic-sidebar-drawer")?.click()
            }
            className="grid grid-cols-4 gap-4"
          >
            <Link href={`/topics/${topic}`} className="col-span-3">
              {topic}
            </Link>
            {/* TODO: Add confirmation button if topic has one or more post related to them */}
            <button
              className="btn btn-sm btn-error dark:btn-ghost w-fit justify-self-end"
              onClick={async (e) => {
                e.stopPropagation();
                try {
                  const res = await axios.delete(`/api/topic/${topic}`);
                  if (res.status === 200) {
                    alert("Topic deleted successfully");
                  }
                  fetchTopics();
                } catch (err) {
                  console.error(err);
                  alert("Something went wrong, cannot delete topic");
                }
              }}
            >
              <Image
                src="/trash-can-10416.svg"
                height={14}
                width={14}
                alt={`Delete ${topic}`}
              />
            </button>
          </li>
        ))
      )}
    </ul>
  );
}

function NewTopicButton({ refetchFn }: { refetchFn: () => void }) {
  return (
    <>
      <button
        className="btn"
        onClick={() =>
          (
            document.getElementById("add-topic-btn") as HTMLDialogElement
          ).showModal()
        }
      >
        Add Topic
      </button>
      <dialog id="add-topic-btn" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add new topic</h3>
          <div className="py-4">
            <NewTopicForm refetchFn={refetchFn} />
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

function NewTopicForm({ refetchFn }: { refetchFn: () => void }) {
  const [title, setTitle] = useState("");
  const handleSubmit = async () => {
    try {
      const res = await axios.post("/api/topic", { title });
      // TODO: Add toast to show success
      if (res.status === 200) {
        alert("Topic added successfully");
      }
      refetchFn();
    } catch (err) {
      console.log(err);
    } finally {
      setTitle("");
      (document.getElementById("add-topic-btn") as HTMLDialogElement).close();
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
