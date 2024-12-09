import { sql } from "../../lib/db.server";
import createDemandHandler from "./create-demand";

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

  return { user };
};

beforeEach(async () => {
  await sql`BEGIN`;
});

afterEach(async () => {
  await sql`ROLLBACK`;
});

afterAll(() => sql.end());

it("creates a demand", async () => {
  const { user } = await setup();
  const req = {
    method: "POST",
    query: {
      userId: user.id,
    },
    body: {
      title: "Test Demand",
      description: "Test Description",
      studentDeadline: new Date("2024-01-01"),
      advisorDeadline: new Date("2024-01-15"),
    },
  } as any;
  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn(),
  } as any;

  await createDemandHandler(req, res);

  expect(res.status).toHaveBeenCalledWith(201);
  expect(res.json).toHaveBeenCalledWith(
    expect.objectContaining({
      title: "Test Demand",
      description: "Test Description",
      studentDeadline: new Date("2024-01-02").toLocaleDateString("en-US"),
      advisorDeadline: new Date("2024-01-16").toLocaleDateString("en-US"),
    })
  );
});

it("returns 405 for non-POST requests", async () => {
  const req = {
    method: "GET",
  } as any;
  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn(),
  } as any;

  await createDemandHandler(req, res);

  expect(res.status).toHaveBeenCalledWith(405);
  expect(res.json).toHaveBeenCalledWith({
    error: "Method not allowed",
  });
});

it("returns 400 if userId is missing", async () => {
  const req = {
    method: "POST",
    query: {},
    body: {
      title: "Test Demand",
      description: "Test Description",
      studentDeadline: "2024-01-01",
      advisorDeadline: "2024-01-15",
    },
  } as any;
  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn(),
  } as any;

  await createDemandHandler(req, res);

  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({
    error: "User ID is required",
  });
});
