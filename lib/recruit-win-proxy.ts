const RECRUIT_WIN_ORIGIN = "https://waymart-recruit-win.vercel.app";

export async function forwardRecruitWinRequest(request: Request, path: string) {
  const incoming = new URL(request.url);
  const target = new URL(path, RECRUIT_WIN_ORIGIN);
  target.search = incoming.search;

  const headers = new Headers();
  const contentType = request.headers.get("content-type");
  const cookie = request.headers.get("cookie");
  if (contentType) headers.set("content-type", contentType);
  if (cookie) headers.set("cookie", cookie);
  headers.set("origin", RECRUIT_WIN_ORIGIN);

  const response = await fetch(target, {
    method: request.method,
    headers,
    body: request.method === "GET" || request.method === "HEAD" ? undefined : await request.arrayBuffer(),
    cache: "no-store",
    redirect: "manual",
  });

  const responseHeaders = new Headers();
  for (const name of ["cache-control", "content-type"]) {
    const value = response.headers.get(name);
    if (value) responseHeaders.set(name, value);
  }
  const setCookies = response.headers.getSetCookie?.() ?? [];
  if (setCookies.length) {
    for (const cookie of setCookies) responseHeaders.append("set-cookie", cookie);
  } else {
    const cookie = response.headers.get("set-cookie");
    if (cookie) responseHeaders.set("set-cookie", cookie);
  }

  return new Response(response.body, { status: response.status, headers: responseHeaders });
}
