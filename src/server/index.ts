import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import express from "express";
import { createServer as createHttpServer } from "http";
import next from "next";
import cors from "cors";
import { parse } from "url";

const jsonParser = bodyParser.json();
const port = process.env.PORT || 9000;
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handleNextRequests = nextApp.getRequestHandler();

const shouldCompress = (
  req: express.Request,
  res: express.Response
): boolean => {
  if (req.headers["x-no-compression"]) {
    return false;
  }

  return compression.filter(req, res);
};

const corsOptions = {
  origin: true,
  methods: "GET,PUT,DELETE,HEAD,POST,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
};

nextApp.prepare().then(() => {
  const expressApp = express();

  expressApp.use(express.json({ limit: "50mb" }));
  expressApp.use(cookieParser());
  expressApp.use(express.urlencoded({ limit: "50mb", extended: false }));
  expressApp.use(compression({ filter: shouldCompress }));
  expressApp.use(jsonParser);
  expressApp.use(cors(corsOptions));
  // expressApp.use(logger);

  expressApp.get("/", async (req: express.Request, res: express.Response) => {
    const parsedUrl = parse(req.url, true);
    const { query } = parsedUrl;

    return nextApp.render(req, res, "/", query);
  });

  expressApp.all("*", async (req: express.Request, res: express.Response) => {
    return handleNextRequests(req, res);
  });

  createHttpServer(expressApp).listen(port, (err?: any) => {
    if (err) {
      throw err;
    }
  });
});
