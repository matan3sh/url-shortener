import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { useAppDispatch, useAppSelector } from "../app/store";
import { Spinner } from "../components/Spinner";
import { getUrl } from "../features/urls/urlSlice";

export function UrlPage() {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const { url, isError, message } = useAppSelector((state) => state.urls);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (id) {
      dispatch(getUrl(id));
    }
  }, [isError, message, id, dispatch]);

  useEffect(() => {
    if (url) {
      window.location.replace(url.baseUrl);
    }
  }, [url]);

  return <Spinner />;
}
