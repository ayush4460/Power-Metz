import { exportImages } from 'pdf-export-images'
import fs from 'fs'

async function run() {
  const outputDir = './public/images/products'
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }
  
  exportImages('powermetz products.pdf', outputDir)
    .then(images => console.log('Exported', images.length, 'images'))
    .catch(console.error)
}

run()
