import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Dummy reports data
  const reports = [
    { id: 1, title: "First Quarter Report", status: "SUBMITTED" },
    { id: 2, title: "Second Quarter Report", status: "PENDING" },
  ];

  res.status(200).json(reports);
}
