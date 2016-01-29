const $predictions = $('#predictions')

function getData() {
    return $.get('http://dashboard.timburke.co/work.json')
}

function processData(data) {
    const busses = data.busses

    $predictions.empty()

    busses.forEach(function(stop) {
        const $entry = $('<div class="stop"></stop>')
        $entry.append($(`<h1>${stop.StopName}</h1>`))

        const $table = $(`<table></table>`)
        $table.append('<tr><th class="minutes">Minutes</th><th class="route">Route</th><th class="text">Direction</th></tr>')

        var count = 0
        stop.Predictions.some(function(prediction) {
            const $prediction = $(`<tr class="prediction"></tr>`)
            $prediction.append($(`<td class="minutes">${prediction.Minutes}</td>`))
            $prediction.append($(`<td class="route">${prediction.RouteID}</td>`))
            $prediction.append($(`<td class="text">${prediction.DirectionText}</td>`))
            $table.append($prediction)
            count = count + 1

            if (count > 5) {
                return true
            }
        })

        $entry.append($table)
        $predictions.append($entry)
    })
}

getData().then(processData)

window.setInterval(function() {
    getData().then(processData)
}, 5000)
