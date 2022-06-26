let label = []
let total = []

$.ajax({
    url : '/grap/api/select',
    async : false,         // false 일 경우 동기 요청으로 변경
    type : 'POST',   // POST, GET, PUT
    dataType : 'json'          // text, xml, json, script, html
}).done((data) => {
    if(data.mode) {
        let count = 0;

        for(let a of data.result){
            label[count] = a.location
            total[count] = a.total

            count++;
        }
        console.log("차트 조회 완료")
    } else {
        console.log("차트 조회 실패")
    }
})

const ctx = $('#myChart');
const myChart = new Chart(ctx, {
    type: 'polarArea',
    data: {
        labels: label,
        datasets: [{
            data: total,
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