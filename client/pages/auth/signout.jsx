import { useEffect } from "react";
import Router from "next/router";
import { useRequest } from "../../hooks/use-request";

const Signout = () => {
  const { doRequest, errors } = useRequest({
    url: "/api/users/signout",
    method: "post",
    body: {},
    onSuccess: () => Router.push("/"),
  });

  useEffect(() => {
    doRequest();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-lg font-semibold">Signing out...</h1>
      {errors}
    </div>
  );
};

export default Signout;
