import axios from 'axios'
import { performance } from 'perf_hooks'

async function testAPI(url, times = 5) {
  let total = 0
  for (let i = 0; i < times; i++) {
    const start = performance.now()
    const res = await axios.get(url)
    const end = performance.now()
    const duration = end - start
    console.log(`Request ${i + 1}: ${duration.toFixed(2)} ms`)
    total += duration
  }
  console.log(`👉 Trung bình: ${(total / times).toFixed(2)} ms\n`)
}

async function runBenchmark() {
  const id = '68d9695a6d1d3cb03dff23ea' // đổi sang _id thực tế trong MongoDB
  const url = `http://localhost:5000/api/products/${id}`

  console.log('=== Benchmark lần đầu (MongoDB query) ===')
  await testAPI(url, 5)   // lần đầu lấy từ DB, set cache

  console.log('=== Benchmark lần hai (Redis cache) ===')
  await testAPI(url, 5)   // lần sau sẽ lấy từ Redis
}

runBenchmark()
