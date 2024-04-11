import { HandlerContext } from "$fresh/server.ts";
import db from "../../utility/database.ts";

export async function handler(_req: Request, _ctx: HandlerContext) {
    // get url
    const url = new URL(_req.url);
    // get todo
    const todoid = url.searchParams.get("todoID") || "";
    try {
        // delete specified todo item
        await db.delete(todoid);
        return Response.json({ successful: "your data was deleted successfully" });
    } catch (error) {
        return new Response(error);
    }
}
