export const user = {
  email: "Barcelona",
  password: "pass",
};

export const token = "someHardEncodedToken";

export default function handler(req, res) {
  const { email, password } = JSON.parse(req.body);

  // if user exists and credentials correct
  if (email === user.email && password === user.password) {
    return res.status(200).json({ token });
  }

  return res.status(401).json({ message: "Bad credentials" });
}
