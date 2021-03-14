import * as express from "express";

// Access_token
export function expressAuthentication(
  request: express.Request,
  securityName: string,
  scopes?: string[]
): Promise<any> {
  if (securityName === "api_key") {
    let token;
    if (request.query && request.query.access_token) {
      token = request.query.access_token;
    }
    return token
      ? Promise.resolve({ token })
      : Promise.resolve({ status: "Token not found" });
  }
}
