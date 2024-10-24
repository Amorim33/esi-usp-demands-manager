import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Dummy demands data
  const demands = [
    {
      id: 1,
      title: "First Quarter Evaluation",
      description: "Submit your first quarter report",
      studentDeadline: "2024-03-31",
      advisorDeadline: "2024-04-15",
    },
    {
      id: 2,
      title: "Second Quarter Evaluation",
      description: "Submit your second quarter report",
      studentDeadline: "2024-06-30",
      advisorDeadline: "2024-07-15",
    },
  ];

  res.status(200).json(demands);
}
