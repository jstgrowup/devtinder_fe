import { StreamChat } from "stream-chat";
if (!process.env.NEXT_PUBLIC_STREAM_API_KEY) {
  throw new Error("Stream api jey is not set");
}
const streamClient = StreamChat.getInstance(
  process.env.NEXT_PUBLIC_STREAM_API_KEY,
);
export default streamClient;
