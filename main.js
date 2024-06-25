import { crawlPage } from './crawl.js'
import { printReport } from './report.js'

async function main() {
  const args = process.argv

  if (args.length < 3) {
    console.error('Error: No URL provided.')
    process.exit(1)
  } else if (args.length > 3) {
    console.error('Error: Too many arguments provided.')
    process.exit(1)
  } else {
    const baseURL = args[2]
    console.log(`Starting crawler at: ${baseURL}`)
    const pages = await crawlPage(baseURL)
    printReport(pages)
  }
}

main()
