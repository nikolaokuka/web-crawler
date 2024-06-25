# Web Crawler

This project is a simple web crawler that fetches and parses web pages to extract and recursively follow internal links within the same domain. It collects the number of inbound internal links to each page and generates a report.

## Features

- Fetches HTML content from web pages.
- Extracts internal links from the fetched HTML.
- Recursively crawls internal links within the same domain.
- Keeps track of the number of times each internal link is encountered.
- Generates a report of pages sorted by the number of inbound internal links.

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/web-crawler.git
   cd web-crawler
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

## Usage

To run the crawler, use the following command:

```sh
node main.js <URL>
```
