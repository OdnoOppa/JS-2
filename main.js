// main.js

import { fetchData, filterData } from './dataFetcher.js';

// Function to parse URL parameters
function getUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const paramsObject = {};

  for (const [key, value] of params) {
    if (paramsObject[key]) {
      if (!Array.isArray(paramsObject[key])) {
        paramsObject[key] = [paramsObject[key]];
      }
      paramsObject[key].push(value);
    } else {
      paramsObject[key] = value;
    }
  }

  return paramsObject;
}

// Function to render data on the page
function renderData(data) {
  const outputElement = document.getElementById('output');
  outputElement.innerHTML = '';

  data.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = `${item.name} - ${item.category}`;
    outputElement.appendChild(listItem);
  });
}

// Main function to fetch and display data
async function main() {
  const apiUrl = 'https://api.jsonbin.io/b/your-json-bin-id/latest'; // Replace with your JSON bin URL
  const urlParams = getUrlParams();

  // Fetch data from the server
  const data = await fetchData(apiUrl);

  // Filter data based on URL parameters
  const filteredData = filterData(data, urlParams);

  // Render filtered data on the page
  renderData(filteredData);
}

// Run the main function
main();
