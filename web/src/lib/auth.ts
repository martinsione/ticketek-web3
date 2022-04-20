import { verify } from "jsonwebtoken";

export default async function Auth(
  token: string,
  callbackError: () => void,
  callbackSuccess: () => void
) {
  verify(token, process.env.SECRET_WORD as string, async (error) => {
    if (error) {
      callbackError();
    } else callbackSuccess();
  });
}
