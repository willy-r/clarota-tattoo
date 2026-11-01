import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "../../../../keystatic.config";
import { isKeystaticEnabled } from "@/lib/keystatic";

const disabled = () => new Response("Not found", { status: 404 });

export const { GET, POST } = isKeystaticEnabled()
  ? makeRouteHandler({ config })
  : { GET: disabled, POST: disabled };
