import { sql } from "../../lib/db.server";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const demands = await sql`
      SELECT id, title, description, student_deadline, advisor_deadline
      FROM demands
    `;

    const formattedDemands = demands.map((demand) => ({
      ...demand,
      studentDeadline: new Date(demand.studentDeadline).toLocaleDateString(
        "en-US"
      ),
      advisorDeadline: new Date(demand.advisorDeadline).toLocaleDateString(
        "en-US"
      ),
    }));

    res.status(200).json(formattedDemands);
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error: "Failed to fetch demands" });
  }
}
