const submit = document.getElementById("submit");
const url = document.getElementById("url");
const parseList = document.getElementById("parse");

url.addEventListener("keydown", () => {
  parseList.innerHTML = "";
});

submit.addEventListener("click", (event) => {
  if (isValidUrl(url.value)) {
    reduceUrl(url.value);
  } else {
    parseList.innerHTML = "Provide valid URL";
  }
});

const types = [
  { name: "protocol", display: "Scheme" },
  { name: "host", display: "Authority" },
  { name: "hostname", display: "Domain Name" },
  { name: "port", display: "Port Number" },
  { name: "pathname", display: "Path" },
  { name: "search", display: "Query String" },
  { name: "hash", display: "Fragment Id" },
];

function reduceUrl(url) {
  const e = document.createElement("a");
  e.href = url;
  let res = "";
  types.forEach((type) => {
    res += ` <div class="category">
                    <span class="type"> ${type.display}: </span>
                    <span class="value">${
                      e[type.name] ? e[type.name] : "---"
                    }</span>
                </div>`;
  });
  parseList.innerHTML = res;
}

function isValidUrl(string) {
  try {
    new URL(string);
  } catch (_) {
    return false;
  }

  return true;
}


/*

Complexity:
 On Each click of submit button we iterating the type of length 7. ~ O(cost_of_type*7 )

*/