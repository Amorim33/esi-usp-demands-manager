import { sql } from "../../lib/db.server";

import userHandler from "./user";

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

  return { user };
};

beforeEach(async () => {
  await sql`BEGIN`;
});

afterEach(async () => {
  await sql`ROLLBACK`;
});

afterAll(() => sql.end());

it("gets user by email", async () => {
  const { user } = await setup();
  const req = {
    body: {
      email: "student@test.com",
    },
  } as any;
  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn(),
  } as any;

  await userHandler(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith(
    expect.objectContaining({
      id: user.id,
      email: "student@test.com",
      name: "Student",
      role: "STUDENT",
    })
  );
});

it("returns 404 if user not found", async () => {
  const req = {
    body: {
      email: "nonexistent@test.com",
    },
  } as any;
  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn(),
  } as any;

  await userHandler(req, res);

  expect(res.status).toHaveBeenCalledWith(404);
  expect(res.json).toHaveBeenCalledWith({
    error: "User not found",
  });
});
