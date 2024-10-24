import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Dummy user data
  const user = {
    id: 1,
    name: "John Doe",
    role: "STUDENT",
  };

  res.status(200).json(user);
}
