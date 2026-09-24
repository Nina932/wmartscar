import { forwardRecruitWinRequest } from "@/lib/recruit-win-proxy";

export async function POST(request: Request) {
  return forwardRecruitWinRequest(request, "/api/session");
}

