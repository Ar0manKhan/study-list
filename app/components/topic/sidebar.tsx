"use client";

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
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          <NewTopicButton />
          <li>
            <a>Sidebar Item 1</a>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li>
        </ul>
      </div>
    </div>
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
  return (
    <form>
      <input
        type="text"
        placeholder="Title"
        className="input input-bordered w-full"
        required
      />
    </form>
  );
}
