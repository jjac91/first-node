const fs = require("fs");
const process = require("process");
const axios = require("axios");

function createOutput(data, destination) {
  if (destination) {
    fs.writeFile(destination, data, "utf8", function (err) {
      if (err) {
        console.error(`Couldn't write ${destination} : ${err}`);
        process.exit(1);
      }
    });
  } else {
    console.log(data);
  }
}
function cat(path, destination) {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    createOutput(data, destination);
  });
}

async function webCat(url) {
  try {
    let res = await axios.get(`${url}`);
    console.log(res.data);
  } catch (err) {
    console.error(`Error fetching ${url}: ${err}`);
    process.exit(1);
  }
}

let path;
let destination;

if (process.argv[2] == "--out") {
  destination = process.argv[3];
  path = process.argv[4];
} else {
  path = process.argv[2];
}

if (path.slice(0, 4) === "http") {
  webCat(path);
} else {
  cat(path, destination);
}
