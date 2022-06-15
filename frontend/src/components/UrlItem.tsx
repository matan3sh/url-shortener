import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { Url } from "../features/urls/urlInterface";
import { DeleteModal } from "./DeleteModal";

interface UrlItemProps {
  url: Url;
}

export function UrlItem({ url }: UrlItemProps) {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const shortUrl = `${window.location.href.replace("/admin", "")}/${url.urlId}`;

  const handleCopyToClipboard = () => {
    if (!shortUrl) {
      toast.error("Faild to copy to clipboard");
    }
    navigator.clipboard.writeText(shortUrl);
    toast.success("Successfully copied to clipboard");
  };

  const handleOpenDeleteModal = () => {
    setOpenModal(true);
  };

  return (
    <>
      <div className="url">
        <div>
          <h4>Date:</h4>
          {new Date(url.createdAt).toLocaleString("en-US")}
        </div>
        <div>
          <h4>Base URL:</h4>
          {url.baseUrl}
        </div>
        <div>
          <h4>Shorter URL:</h4>
          {`${window.location.href.replace("/admin", "")}/${url.urlId}`}
        </div>

        <div className="row">
          <Link
            to={`/${url._id}`}
            className="btn btn-reverse btn-sm"
            target="_blank">
            View
          </Link>
          <button
            onClick={handleCopyToClipboard}
            className="btn btn-primary btn-sm">
            Copy
          </button>
          <button
            onClick={handleOpenDeleteModal}
            className="btn btn-danger btn-sm">
            Delete
          </button>
        </div>
      </div>

      {url && (
        <DeleteModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          urlId={url._id}
        />
      )}
    </>
  );
}
