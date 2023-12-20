"use client";

import axios, { AxiosError } from "axios";
import Image from "next/image";

export default function DeletePostButton({ id }: { id: number }) {
  // TODO: Add confirmation button on delete
  return (
    <button
      className="btn btn-error"
      onClick={async () => {
        try {
          const res = await axios.delete(`/api/post/${id}`);
          if (res.status === 200) {
            alert("Post deleted successfully");
            window.location.reload();
          }
        } catch (error: any) {
          if ((error as AxiosError).response?.status === 404) {
            return alert("Post not found");
          } else {
            return alert("Something went wrong");
          }
        }
      }}
    >
      <Image src="/trash-can-10416.svg" width={20} height={20} alt="expand" />
    </button>
  );
}
