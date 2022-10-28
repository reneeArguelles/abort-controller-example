const controller = new AbortController()
const { signal } = controller

const createPromise = (sig) => {
  if (sig.aborted) {
    return Promise.reject(new Error('Promise aborted'))
  }

  return new Promise((resolve, reject) => {
    console.log('Promise Started ...')
    sig.addEventListener('abort', () => {
      reject(new Error('Promise aborted'))
    })
    setTimeout(() => {
      resolve()
    }, 5000)
  })
}

createPromise(signal)
  .then(() => console.log('Promise resolved'))
  .catch((error) => console.log(error.toString()))

setTimeout(() => {
  controller.abort()
}, 1000)

process.stdin.resume()
