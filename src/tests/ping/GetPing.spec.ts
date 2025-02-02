import { PingService } from "../../models/services/PingService.js";
import { PingResponse } from "../../models/responses/PingResponse.js";
import * as chai from "chai";

chai.should();

describe("Get Ping", () => {
  const pingService = new PingService();

  it("@Smoke - Get Ping successfully - 200", async () => {
    const response = await pingService.getPing<PingResponse>();
    response.status.should.equal(200, JSON.stringify(response.data));
    response.data?.message?.should.equal("pong");
  });

  it("@Regression - Get Ping successfully - Response time < 1000 ms", async () => {
    const response = await pingService.getPing<PingResponse>();
    response.responseTime.should.be.lessThan(1000);
  });

  it("@Regression - Get Ping successfully - Content-Type is application/json", async () => {
    const response = await pingService.getPing<PingResponse>();
    response.headers["content-type"]?.should.include("application/json");
  });

  it("@Regression - Get Ping successfully - Response structure validation", async () => {
    const response = await pingService.getPing<PingResponse>();
    response.should.have.property("data");
    response.data.should.have.property("message");
    response.data?.message?.should.be.a("string");
  });

  it("@Performance - Get Ping multiple requests - All successful", async () => {
    const requests = Array(5)
      .fill(null)
      .map(() => pingService.getPing<PingResponse>());
    const responses = await Promise.all(requests);

    responses.forEach((response) => {
      response.status.should.equal(200, JSON.stringify(response.data));
      response.data?.message?.should.equal("pong");
    });
  });
});
