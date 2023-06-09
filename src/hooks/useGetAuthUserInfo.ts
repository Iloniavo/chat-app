import Cookies from "js-cookie";

export const isAuthenticated = (): boolean => {
  return !!Cookies.get("token");
};

export const getToken = (): string => {
  return <string>Cookies.get("token");
};

export const getServerSideToken = (context): string => {
  const { req } = context;
  let token = "";

  const cookieHeader = req.headers.cookie;
  if (cookieHeader) {
    const cookies = cookieHeader.split("; ");
    const tokenCookie = cookies.find((cookie) => cookie.startsWith("token="));
    if (tokenCookie) {
      token = tokenCookie.split("=")[1];
    }
  }
  return token;
};
