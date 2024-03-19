const http = require("http");
const url = require("url");
var fs = require("fs");

// Define your routes and their corresponding handlers
const routes = {
  "/": (req, res) => {
    fs.readFile("./public/index.html", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  },
  "/hello": (req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello, World!");
  },
  "/about": (req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("This is a barebone API made in Node.js");
  },
  // Add more routes as needed
};

// Create a server
const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Check if it's a preflight request (OPTIONS)
  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Find the handler for the requested route
  const handler = routes[pathname];

  if (handler) {
    // Call the handler with request and response objects
    handler(req, res);
  } else {
    // Route not found
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Route not found");
  }
});

// Define the port number
const port = 3000;

// Start the server
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
