import { useEffect } from "react";

import { useAppSelector, useAppDispatch } from "../app/store";
import { getUrls, reset } from "../features/urls/urlSlice";

import { UrlItem } from "../components/UrlItem";

export function AdminPage() {
  const dispatch = useAppDispatch();
  const { urls, isLoading, isSuccess } = useAppSelector((state) => state.urls);

  useEffect(() => {
    dispatch(getUrls(null));
  }, [dispatch]);

  useEffect(() => {
    return () => {
      if (isSuccess) dispatch(reset());
    };
  }, [dispatch, isSuccess]);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <>
      <div className="urls-head">
        <div>Date</div>
        <div>Base URL</div>
        <div>Shorter URL</div>
        <div></div>
      </div>

      {urls.map((url) => (
        <UrlItem key={url._id} url={url} />
      ))}
    </>
  );
}
