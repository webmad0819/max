// config START
const totalElementsToCheck = 50;
// config END

const axios = require("axios");

let totalDownloaded = 0;
let downloadedEvents = [];
let intervalID = setInterval(() => {
  axios.get("http://www.boredapi.com/api/activity?type=social").then(results => {
    results = results.data;
    const output = {
      t: results.type,
      p: results.participants,
      k: results.key
    };

    totalDownloaded++
    console.log(`#${totalDownloaded}`)
    console.log(output);
    downloadedEvents.push(output);

    if (totalDownloaded === totalElementsToCheck) {
      clearInterval(intervalID);
      writeFile();
      process.exit(0)
    }
  });
}, 200);

function conclusions(typeParam) {
  let diff = new Set();
  downloadedEvents = downloadedEvents
    .filter(x => x.t === typeParam)
    .forEach(x => diff.add(x.p));

  diff = [...diff].sort();

  return {
    type: typeParam,
    diff: diff
  };
}

function writeFile() {
  let types = [
    // "education",
    // "recreational",
    "social",
    // "diy",
    // "charity",
    // "cooking",
    // "relaxation",
    // "music",
    // "busywork"
  ];

  types = types.map(x => conclusions(x));
  console.log(types);
}
