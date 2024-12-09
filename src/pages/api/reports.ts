import { sql } from "../../lib/db.server";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { userId } = req.query;

    const reports = await sql`
      SELECT id, title, status 
      FROM reports
      WHERE user_id = ${String(userId)}
    `;

    res.status(200).json(reports);
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error: "Failed to fetch reports" });
  }
}
