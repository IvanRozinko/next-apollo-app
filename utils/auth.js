import Router from "next/router";
import cookies from "js-cookie";

export function login(token) {
  cookies.set("token", token, { expires: 1 });
  Router.push("/transport");
}

export function logout() {
  cookies.remove("token");
  Router.push("/");
}
