export function MP () {
    const ak = 'sn6EOe9n7oQkwChfS4SDIbTOlWUUocs9'
    return new Promise(function (resolve, reject) {
        window.init = function () {
            resolve(BMap)
        }
        var script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `http://api.map.baidu.com/api?v=2.0&ak=${ak}&callback=init`
        script.onerror = reject
        document.head.appendChild(script)
    })
}
