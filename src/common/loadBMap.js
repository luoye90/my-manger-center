export default function loadBMap() {
  return new Promise(function(resolve, reject) {
    if (typeof BMap !== 'undefined') {
      resolve(BMap)
      return true
    }
    window.onBMapCallback = function() {
      resolve(BMap)
    }
    let script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https://api.map.baidu.com/api?v=2.0&ak=8s3ZcWuuRmTBnlXzfKtKQsz1a7vLgZoG&callback=onBMapCallback'
    script.onerror = reject
    document.head.appendChild(script)
  })
}