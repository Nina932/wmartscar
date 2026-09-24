import { forwardRecruitWinRequest } from "@/lib/recruit-win-proxy";

export async function GET(request: Request) {
  return forwardRecruitWinRequest(request, "/api/state");
}
