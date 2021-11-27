import { user, token } from "./login";

export default function handler(req, res) {
  if (!("authorization" in req.headers)) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const auth = req.headers.authorization;
  const { token: headerToken } = JSON.parse(auth);
  // check if token is valid
  if (token === headerToken) {
    return res.status(200).json({ email: user.email });
  }

  return res.status(401).json({ message: "Authorization failed" });
}
