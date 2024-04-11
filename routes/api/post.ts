import { HandlerContext } from '$fresh/server.ts';
import * as mod from "https://deno.land/std@0.156.0/uuid/mod.ts";
import db from "../../utility/database.ts";

export async function handler(_req: Request, _ctx: HandlerContext) {
    // get url
    const url = new URL(_req.url);
    // get title from url
    const title = url.searchParams.get("title") || "";
    try {
        // create a new person with a random id
        const NAMESPACE_URL = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
        // create a unique uuid for demo purposes
        const uuid = await mod.v5.generate(NAMESPACE_URL, new TextEncoder().encode("python.org"));
        // create a new data based on value
        const created = await db.create("todo", {
            uuid: uuid,
            title: title,
            isDone: false
        });
        // return data
        return Response.json({ successful: "your data submitted successfully", created });
    } catch (error) {
        return new Response(error);
    }
}
