"use client";

export async function NewPostModal() {
  return (
    <>
      <button
        className="btn"
        onClick={() =>
          (
            document.getElementById("my_modal_2") as HTMLDialogElement
          ).showModal()
        }
      >
        Create New Post
      </button>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click outside to close</p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
