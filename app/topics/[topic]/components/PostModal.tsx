"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { EditPostDialog } from "./PostDialog";

export default function PostModal({
  id,
  title,
  url,
  description,
}: {
  id: number;
  title: string;
  url: string;
  description: string | null;
}) {
  const [editing, setEditing] = useState(false);
  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() =>
          (
            document.getElementById(`post-expanded-${id}`) as HTMLDialogElement
          ).showModal()
        }
      >
        <Image
          src="/resize-arrows-14939.svg"
          width={20}
          height={20}
          alt="expand"
        />
      </button>
      <dialog id={`post-expanded-${id}`} className="modal">
        <div className="modal-box w-11/12">
          <div className="absolute right-2 top-2 flex gap-4">
            {editing ? (
              <button
                className="btn btn-sm btn-circle btn-accent"
                onClick={() => setEditing(false)}
              >
                <Image
                  src="/refresh-3104.svg"
                  alt="edit"
                  height={20}
                  width={20}
                />
              </button>
            ) : (
              <button
                className="btn btn-sm btn-circle btn-accent"
                onClick={() => setEditing(true)}
              >
                <Image
                  src="/pencil-327.svg"
                  alt="edit"
                  height={20}
                  width={20}
                />
              </button>
            )}
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-accent">
                <Image src="/x-10329.svg" alt="close" height={20} width={20} />
              </button>
            </form>
          </div>
          {editing ? (
            <EditPostDialog {...{ id, title, url, description }} />
          ) : (
            <>
              <h3 className="font-bold text-lg">{title}</h3>
              <Link className="text-xs" href={url} target="_blank">
                {url}
              </Link>
              <p className="py-4">{description}</p>
            </>
          )}
        </div>
      </dialog>
    </>
  );
}
