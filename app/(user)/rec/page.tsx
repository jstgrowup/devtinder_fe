import { apiClientForSSR } from "@/lib/api";
import { IUser } from "@/module/auth/types";
import FeedTemplate from "@/module/feed/templates/feed-template";
import { CommonResponse } from "@/types";
import { cookies } from "next/headers";
export default async function Reccomendation() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const response = (await apiClientForSSR({
    token,
    url: "/user/feed?limit=4",
  })) as CommonResponse<IUser[]>;

  return <FeedTemplate initialData={response} />;
}
