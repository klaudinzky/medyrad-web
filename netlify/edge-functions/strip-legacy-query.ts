export default async (request: Request, context: { next: () => Promise<Response> }) => {
  const url = new URL(request.url);

  if (!url.searchParams.has("_g")) {
    return context.next();
  }

  url.searchParams.delete("_g");
  return Response.redirect(url.toString(), 301);
};