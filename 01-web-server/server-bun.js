import {server} from "bun";

server({
    fetch(request) {
        const url = new URL(request.url);
        if (request.method === "GET" && url.pathname === "/") {
            return new Response("Hello, World from bun!\n", {
                status: 200,
                headers: {
                    "Content-Type": "text/plain"
                }
            });
        }   else {      
            return new Response("Not Found\n", {
                status: 404,
                headers: {
                    "Content-Type": "text/plain"
                }
            });
        }
    },
    port: 3000,
    hostname: "127.0.0.1"
})