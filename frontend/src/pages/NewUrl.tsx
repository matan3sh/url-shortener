import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";

import { useAppDispatch } from "../app/store";
import { addUrl } from "../features/urls/urlSlice";

type FormValues = {
  baseUrl: string;
};

const REGEX_URL =
  // eslint-disable-next-line
  /^((https?):\/\/)?([w|W]{3}\.)+[a-zA-Z0-9\-\.]{3,}\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/;

export function NewUrlPage() {
  const navigation = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(addUrl(data.baseUrl));
    navigation("/");
    toast.success("URL added successfully");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <div className="row">
          <label htmlFor="baseUrl">Base URL</label>
          <span className="small-text">e.g: http://www.google.com</span>
        </div>
        <input
          id="baseUrl"
          className="form-control"
          placeholder="Insert Original URL"
          autoFocus
          {...register("baseUrl", {
            required: { value: true, message: "Base URL is Required" },
            pattern: {
              value: REGEX_URL,
              message: "Please enter a valid url",
            },
          })}
        />
        {errors.baseUrl && (
          <span className="left-position validate-error">
            {errors.baseUrl.message}
          </span>
        )}
      </div>

      <div className="form-group">
        <button className="btn center-position" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}
