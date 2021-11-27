import nextCookie from "next-cookies";
import config from "../constants";

export const fetchData = async (path, ctx = {}, fetchParams = {}) => {
  const { token } = nextCookie(ctx);
  try {
    const response = await fetch(`${config.API_URL}${path}`, {
      credentials: "include",
      headers: {
        Authorization: JSON.stringify({ token }),
      },
      ...fetchParams,
    });
    return response;
  } catch (error) {
      console.log(error);
    return error;
  }
};
