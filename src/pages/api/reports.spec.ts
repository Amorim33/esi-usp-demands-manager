import { sql } from "../../lib/db.server";
import reportsHandler from "./reports";

const setup = async () => {
  const [user] = await sql`
    INSERT INTO
      users ${sql({
        email: "student@test.com",
        name: "Student",
        role: "STUDENT",
      })}
    RETURNING
      id
  `;

  const [report] = await sql`
    INSERT INTO
      reports ${sql({
        userId: user.id,
        title: "Test Report",
        content: "Test Content",
        status: "SUBMITTED",
      })}
    RETURNING
      id, title, status
  `;

  return { user, report };
};

beforeEach(async () => {
  await sql`BEGIN`;
});

afterEach(async () => {
  await sql`ROLLBACK`;
});

afterAll(() => sql.end());

it("gets reports for user", async () => {
  const { user, report } = await setup();
  const req = {
    query: {
      userId: user.id,
    },
  } as any;
  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn(),
  } as any;

  await reportsHandler(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith([
    expect.objectContaining({
      id: report.id,
      title: "Test Report",
      status: "SUBMITTED",
    }),
  ]);
});
