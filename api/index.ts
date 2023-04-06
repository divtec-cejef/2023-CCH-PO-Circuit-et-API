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
		let splittedName = file.name.split(".");
		if (splittedName.length > 1)
			splittedName = splittedName.slice(0, -1);
		const path = `${dir}/${splittedName.join(".")}`;
		if (file.isDirectory()) {
			recursiveDirRead(path);
		} else {
			if (file.name.split('.')[2] === 'disabled')
				return;
			const route = require(path);
			try {
				let routePath = "/" + path.split("/").slice(2, -1).join("/").split(".")[0];
				if (file.name.split(".")[1] === "slug")
					routePath += "/:slug";
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
