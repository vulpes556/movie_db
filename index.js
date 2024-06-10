import * as fs from 'node:fs';
import * as http from 'node:http';
import * as path from 'node:path';
import {movieDB} from './process.js';

const mediaTypes = {
	"html": "text/html",
	"jpeg": "image/jpeg",
	"jpg": "image/jpeg",
	"png": "image/png",
	"svg": "image/svg+xml",
	"json": "application/json",
	"js": "text/javascript",
	"css": "text/css",
	"csv": "text/csv",
	"mp3": "audio/mpeg",
	"mp4": "video/mp4",
	"oga": "audio/ogg",
	"ogv": "video/ogg",
	"pdf": "application/pdf",
	"weba": "audio/webm",
	"webm": "video/webm",
	"webp": "image/webp",
	"woff": "font/woff",
	"woff2": "font/woff2",
	"ttf": "font/ttf",
	"gif": "image/gif"
};

const server = http.createServer((req, res) => {

	const errorHTML = `

	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="preconnect" href="https://fonts.googleapis.com">
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
		<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@800&display=swap" rel="stylesheet">
		<style>
			body{
				padding: 0; margin: 0;
				font-family: 'Montserrat', sans-serif;
				font-weight: 800;
				background-color: #4343F9;
				color: #fff;
			}
			#root{
				width: 100%;
				height: 100vh;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 21px;
			}
		</style>
		<title>Not here</title>
	</head>
	<body>
		<div id="root">Rise your gaze to the sky<br/>than a bit back to the URL bar<br/>and check that link again</div>
	</body>
	</html>

	`;
	if (req.method === "GET") {

		if(req.url === "/data.js"){

			res.writeHead(200, { "Content-Type": "text/javascript" });
			res.write(`
				const data=${JSON.stringify(movieDB)};
				export {data};
			`);
			res.end();

		}else{

            let filePath = req.url === "/movies" || req.url === "/genres" || req.url === "/actors" || req.url === "/directors" || req.url === "/writers" || req.url.startsWith('/movie/') || req.url === "/movies/short" || req.url === "/movies/long" ? path.resolve(`${process.cwd()}/client/`) : path.resolve(`${process.cwd()}/client${req.url}`);

			fs.access(filePath, fs.constants.R_OK, (err) => {
				if (err) {
					res.statusCode = 404;
					res.end(errorHTML);
				} else {
					if (fs.statSync(filePath).isDirectory()) {
						filePath += '/index.html';
					}
					fs.readFile(filePath, (err, data) => {
						if (err) {
							res.statusCode = 500;
							res.end(errorHTML);
						} else {
							let mediaType = mediaTypes[filePath.split('.').pop()];

							if (!mediaType) {
								mediaType = 'text/plain';
							}
							res.writeHead(200, { "Content-Type": mediaType });
							res.write(data);
							res.end();
						}
					});
				}
			});
		}

	}else if(req.method === "POST" && req.url === "/error"){
		const chunks = [];
		req.on('data', chunk => chunks.push(chunk));
		req.on('end', () => {
			const data = Buffer.concat(chunks);
			console.log(data.toString());
		});
		res.end();
	}

});

server.listen(9000, "127.0.0.1", () => {
	const addr = server.address();
	console.log(`Open this link in your browser: http://${addr.address}:${addr.port}`);
});
