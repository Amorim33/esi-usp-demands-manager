import { sql } from "../../lib/db.server";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { title, description, studentDeadline, advisorDeadline } = req.body;
    const { userId } = req.query;

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({ error: "User ID is required" });
    }

    const [demand] = await sql`
      INSERT INTO demands ${sql({
        userId,
        title,
        description,
        studentDeadline: new Date(studentDeadline),
        advisorDeadline: new Date(advisorDeadline),
      })}
      RETURNING 
        id,
        title,
        description,
        student_deadline,
        advisor_deadline
    `;

    const formattedDemand = {
      ...demand,
      studentDeadline: new Date(demand.studentDeadline).toLocaleDateString(
        "en-US"
      ),
      advisorDeadline: new Date(demand.advisorDeadline).toLocaleDateString(
        "en-US"
      ),
    };

    res.status(201).json(formattedDemand);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create demand" });
  }
}
