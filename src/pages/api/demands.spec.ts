import { sql } from "../../lib/db.server";
import demandsHandler from "./demands";

const setup = async () => {
  const [user] = await sql`
    INSERT INTO
      users ${sql({
        email: "admin@test.com",
        name: "Admin",
        role: "ADMIN",
      })}
    RETURNING
      id
  `;
  const [demand] = await sql`
    INSERT INTO
      demands ${sql({
        userId: user.id,
        title: "Test Demand",
        description: "Test Description",
        studentDeadline: new Date("2024-01-01"),
        advisorDeadline: new Date("2024-01-15"),
      })}
    RETURNING
      *
  `;

  return { demand };
};

beforeEach(async () => {
  await sql`BEGIN`;
});

afterEach(async () => {
  await sql`ROLLBACK`;
});

afterAll(() => sql.end());

it("gets demands", async () => {
  const { demand } = await setup();
  const req = {} as any;
  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn(),
  } as any;

  await demandsHandler(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith([
    expect.objectContaining({
      id: demand.id,
      title: "Test Demand",
      description: "Test Description",
      studentDeadline: new Date(demand.studentDeadline).toLocaleDateString(
        "en-US"
      ),
      advisorDeadline: new Date(demand.advisorDeadline).toLocaleDateString(
        "en-US"
      ),
    }),
  ]);
});
