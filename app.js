// app.js
async function fetchData() {
    try {
        const response = await fetch('data.json');
// Replace with your API endpoint or data source
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function filterData(data, category) {
    if (!category) {
        return data;
    }
    return data.filter(product => product.category === category);
}

function displayData(filteredData) {
    const productListElement = document.getElementById('productList');
    productListElement.innerHTML = '';

    filteredData.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.textContent = `ID: ${product.id}, Name: ${product.name}, Category: ${product.category}`;
        productListElement.appendChild(productElement);
    });
}

async function main() {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');

    const data = await fetchData();
    const filteredData = filterData(data, category);
    displayData(filteredData);
}

document.addEventListener('DOMContentLoaded', main);
