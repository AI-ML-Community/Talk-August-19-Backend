
import express, { type Request, type Response } from "express";
import type { Application } from "express";
import cors from "cors";


const app: Application = express();
const port =4000
app.disable("x-powered-by");

app.use(cors({
    origin: "*"
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

app.get("/health", (_req: Request, res: Response) => {
    res.status(200).json({ status: "ok" });
});

async function startServer(): Promise<void> {
    try {
        app.listen(port, () => {
            console.info(`Server running on port ${port}`);
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("Failed to start server", { error: message });
        process.exit(1);
    }
}

const shutdown = async (signal: string): Promise<void> => {
    console.info(`${signal} received, shutting down...`);
    process.exit(0);
};

process.on("SIGINT", () => void shutdown("SIGINT"));
process.on("SIGTERM", () => void shutdown("SIGTERM"));

startServer();

export default app;