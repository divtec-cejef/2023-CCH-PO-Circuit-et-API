import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
app.use(cors({
	origin: "*"
}));

const recursiveDirRead = (dir: string) => {
	const files = fs.readdirSync(dir, { withFileTypes: true });
	files.forEach((file) => {
		const path = `${dir}/${file.name.split(".")[0]}`;
		if (file.isDirectory()) {
			recursiveDirRead(path);
		} else {
			const route = require(path);
			try {
				const routePath = "/" + path.split("/").slice(2, -1).join("/");
				console.log("inserting route: " + routePath);

				type AppKey = keyof typeof app;
				const method = file.name.split(".")[0] as AppKey;
				app[method](routePath, route.default);

				console.log("inserted route: " + routePath);
			} catch (e) {
				if (e instanceof TypeError) {
					console.log(`Error: ${path} is not a valid route`);
				}
				console.log(e);
			}
		}
	});
};

recursiveDirRead("./routes");

app.listen(3000, () => {
	console.log('Example app listening on port 3000!');
});
