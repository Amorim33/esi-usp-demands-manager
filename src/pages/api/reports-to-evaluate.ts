import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Dummy reports to evaluate
  const reports = [
    {
      id: 1,
      title: "First Quarter Report",
      content: "Lorem ipsum...",
      studentName: "Alice Johnson",
    },
    {
      id: 2,
      title: "Second Quarter Report",
      content: "Dolor sit amet...",
      studentName: "Bob Smith",
    },
  ];

  res.status(200).json(reports);
}
