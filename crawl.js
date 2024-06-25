import { JSDOM } from 'jsdom'

function normalizeURL(url) {
  // Parse the URL using the URL constructor
  const urlObj = new URL(url)

  // Construct the full path by combining the host and pathname
  let fullPath = `${urlObj.hostname}${urlObj.pathname}`

  // Remove the trailing slash if present
  if (fullPath.slice(-1) === '/') {
    fullPath = fullPath.slice(0, -1)
  }

  return fullPath
}

async function getURLsFromHTML(html, baseURL) {
  // Parse the provided HTML string into a DOM-like structure using JSDOM
  const dom = new JSDOM(html)

  // Select all 'a' (anchor) elements from the parsed HTML and extract their 'href' attributes
  const paths = Array.from(dom.window.document.querySelectorAll('a')).map((link) => link.href)

  // Convert each extracted path into a complete URL using the baseURL
  const urls = paths.map((path) => new URL(path, baseURL).href)

  return urls
}

async function fetchHTML(baseURL) {
  try {
    const response = await fetch(baseURL)

    // Check if the HTTP status code is an error-level code (400+)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    // Check if the content-type is not text/html
    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('text/html')) {
      throw new Error(`Expected content-type text/html but received ${contentType}`)
    }

    const data = await response.text()
    return data
  } catch (error) {
    console.error(`Error fetching the HTML: ${error}`)
  }
}

async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
  // Ensure the current URL is on the same domain as the base URL
  if (new URL(currentURL).hostname !== new URL(baseURL).hostname) {
    return pages
  }

  // Normalize the current URL
  const normalizedURL = normalizeURL(currentURL)

  // Check if the pages object already has an entry for this URL
  if (pages[normalizedURL]) {
    pages[normalizedURL]++
    return pages
  } else {
    pages[normalizedURL] = 1
  }

  // Fetch the current URL and parse the HTML
  const html = await fetchHTML(currentURL)
  if (html === null) {
    return pages
  }

  // Get all URLs from the HTML
  const urls = await getURLsFromHTML(html, currentURL)

  // Recursively crawl each URL found on the page
  for (const url of urls) {
    await crawlPage(baseURL, url, pages)
  }

  return pages
}

export { crawlPage }
