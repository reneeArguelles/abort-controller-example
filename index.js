const controller = new AbortController()
const { signal } = controller

const createPromise = (sig) => {
  if (sig.aborted) {
    return Promise.reject(new Error('Promise aborted'))
  }

  return new Promise((resolve, reject) => {
    let counter = 0
    const interval = setInterval(() => {
      // eslint-disable-next-line no-plusplus
      console.log(`count: ${counter++}`)
    }, 1000)

    console.log('Promise Started ...')
    sig.addEventListener('abort', () => {
      clearInterval(interval)
      reject(new Error('Promise aborted'))
    })
  })
}

createPromise(signal)
  .then(() => console.log('Promise resolved'))
  .catch((error) => console.log(error.toString()))

setTimeout(() => {
  controller.abort()
}, 5000)

process.stdin.resume()
