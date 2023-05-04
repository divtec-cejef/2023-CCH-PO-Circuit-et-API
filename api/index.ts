import express from "express";
import fs from "fs";
import cors from "cors";

import expressServer from "./express";
import sioServer from "./socketio";
import http from "http";

fs.existsSync('./logs') || fs.mkdirSync('./logs');

for (const file of fs.readdirSync('./logs', { withFileTypes: true })) {
	if (file.name.endsWith('.current.log'))
		fs.renameSync(`./logs/${file.name}`, `./logs/${file.name.replace('.current', '')}`);
}

const getLogFile = () => {
	for (const file of fs.readdirSync('./logs', { withFileTypes: true })) {
		if (file.name.endsWith('.current.log'))
			return file.name;
	}

	const date = new Date(Date.now());
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();
	const milliseconds = date.getMilliseconds();
	return `${year}-${month}-${day}-${hours}-${minutes}-${seconds}-${milliseconds}.current.log`;
};

const app = express();
app.use(cors({
	origin: "*"
}));

app.use(express.json());

app.use((req, _, next) => {
	console.log(`\n\n${new Date(Date.now()).toISOString()} - [${req.method}] ON ${req.path}`);
	const logFile = getLogFile();
	fs.appendFileSync(`./logs/${logFile}`, `${new Date(Date.now()).toISOString()} - [${req.method}] ON ${req.path}\n`);
	fs.appendFileSync(`./logs/${logFile}`, `query: ${JSON.stringify(req.query, null, 2)}\n`);
	fs.appendFileSync(`./logs/${logFile}`, `body: ${JSON.stringify(req.body, null, 2)}\n`);
	fs.appendFileSync(`./logs/${logFile}`, `headers: ${JSON.stringify(req.headers, null, 2)}\n\n`);
	next();
});

const recursiveDirRead = (dir: string) => {
	const files = fs.readdirSync(dir, { withFileTypes: true });
	for (const file of files) {
		let splittedName = file.name.split(".");
		if (splittedName.length > 1)
			splittedName = splittedName.slice(0, -1);
		let path = `${dir}/${splittedName.join(".")}`;
		if (file.isDirectory()) {
			recursiveDirRead(path);
		} else {
			if (file.name.split('.')[2] === 'disabled')
				continue;
			const route = require(path);
			try {
				let routePath = "/" + path.split("/").slice(2, -1).join("/").split(".")[0];

				routePath = routePath.replace(/\/slug-/g, "/:");
				routePath = routePath.replace(/\/slug/g, "/:slug");

				type AppKey = keyof typeof app;
				const method = file.name.split(".")[0] as AppKey;
				app[method](routePath, route.default);

				console.log(`inserted [${method}] route: ` + routePath);
			} catch (e) {
				if (e instanceof TypeError) {
					console.log(`Error: ${path} is not a valid route`);
				}
				console.error(e);
			}
		}
	};
};

recursiveDirRead("./routes");

app.listen(3000, () => {
	console.log('Example app listening on port 3000!');
});

const server = http.createServer(expressServer);
sioServer.attach(server);
expressServer.set("socketio", sioServer);

server.listen(3000, () => {
	console.log("listening on *:3000");
});