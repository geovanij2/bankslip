import request from "supertest";
import { setupExpress } from "../../src/setup/express";

describe("GET /boleto/:id E2E tests", () => {
  const app = setupExpress();

  it("Should return correct value for valid input", async () => {
    const { status, body } = await request(app).get(
      "/boleto/21290001192110001210904475617405975870000002000"
    );

    expect(status).toBe(200);
    expect(body).toEqual({
      barCode: "21299758700000020000001121100012100447561740",
      amount: "20.00",
      expirationDate: "2018-07-16",
    });
  });

  it("Should return error for invalid input", async () => {
    const { status, body } = await request(app).get(
      "/boleto/21290001192110001210904475617405975870000002000dasd"
    );

    expect(status).toBe(400);
    expect(body).toEqual({
      error: "Invalid input string for Dealership",
    });
  });

  it("Should return error for invalid input", async () => {
    const { status, body } = await request(app).get(
      "/boleto/21290001192110001210904475617405975870000004000"
    );

    expect(status).toBe(400);
    expect(body).toEqual({
      error: "Invalid digit line",
    });
  });
});
