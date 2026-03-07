export const routes = {
  signUp: "/signup",
  login: "/login",
  feed: "/rec",
  profile: "/profile",
  connections: "/connections",
  requests: "/requests",
  chat: "/chat",
  videoCall: (channelId: string) => `/video-call/${channelId}`,
};
