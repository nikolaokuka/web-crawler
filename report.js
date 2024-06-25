function printReport(pages) {
  console.log('==================')
  console.log('Starting report...')
  console.log('==================')

  // Convert the pages object to an array of [url, count] pairs
  const pagesArray = Object.entries(pages)

  // Sort the array by the count in descending order
  pagesArray.sort((a, b) => b[1] - a[1])

  // Print each page in a formatted way
  pagesArray.forEach(([url, count]) => {
    console.log(`Found ${count} internal links to ${url}`)
  })

  console.log('=================')
  console.log('Report completed.')
}

export { printReport }
