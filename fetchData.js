 async function fetchData(key) {
    const response = await fetch(`http://localhost:3000/${key}`);
    return await response.json();
}

module.exports = {
    fetchData
}
module.exports={fetchData};