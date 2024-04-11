import { HandlerContext } from "$fresh/server.ts";
import db from "../../utility/database.ts";

export async function handler(_req: Request, _ctx: HandlerContext) {
    // get URL
    const url = newURL(_req.url);
    // get todo id based on id we update todo
    const todoid = url.searchParams.get("todoID") || "";
    // get title
    const todoTitle = url.searchParams.get("todoTitle") || "";
    // get uuid
    const todoUuid = url.searchParams.get("todoUuid") || "";
    try {
        // update the todo
        const person = await db.update(todoid, {
            isDone: true,
            title: todoTitle,
            uuid: todoUuid
        });
        return Response.json({ successful: "your data submit is successful", person });
    } catch (error) {
        return new Response(error);
    }
}
