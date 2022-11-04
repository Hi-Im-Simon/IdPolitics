async function fetchJSON(path) {
    const requestURL = browser.runtime.getURL(path);
    const response = await fetch(requestURL);
    const data = await response.json();
    console.log(data);
    return data;
}