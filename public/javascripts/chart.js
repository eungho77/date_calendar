let zone_label = []
let zone_total = []

$.ajax({
    url : '/grap/api/select/zone/top15',
    async : false,         // false 일 경우 동기 요청으로 변경
    type : 'POST',   // POST, GET, PUT
    dataType : 'json'          // text, xml, json, script, html
}).done((data) => {
    if(data.mode) {
        let count = 0;

        for(let a of data.result){
            zone_label[count] = a.location
            zone_total[count] = a.total

            count++;
        }
        console.log("차트 조회 완료")
    } else {
        console.log("차트 조회 실패")
    }
})

const myChart = new Chart($('#zone'), {
    type: 'polarArea',
    data: {
        labels: zone_label,
        datasets: [{
            data: zone_total,
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(75, 192, 192)',
                'rgb(255, 205, 86)',
                'rgb(201, 203, 207)',
                'rgb(54, 162, 235)'
            ]
        }]
    }
})