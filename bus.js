const $predictions = $('#predictions')

function getData() {
    return $.get('http://dashboard.timburke.co/work.json')
}

function processData(data) {
    const busses = data.busses

    $predictions.empty()

    busses.forEach((stop) => {
        const $entry = $('<div class="stop"></stop>')
        $entry.append($(`<h1>${stop.StopName}</h1>`))

        const $table = $(`<table></table>`)
        $table.append('<tr><th>Minutes</th><th>Route</th><th>Direction</th></tr>')

        stop.Predictions.forEach((prediction) => {
            const $prediction = $(`<tr class="prediction"></tr>`)
            $prediction.append($(`<td class="">${prediction.Minutes}</td>`))
            $prediction.append($(`<td class="">${prediction.RouteID}</td>`))
            $prediction.append($(`<td class="">${prediction.DirectionText}</td>`))
            $table.append($prediction)
        })

        $entry.append($table)
        $predictions.append($entry)
    })
}

getData().then(processData)

window.setInterval(() => {
    getData().then(processData)
}, 5000)
