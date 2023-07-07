// data-action="move-prev"

let cal = {
    $el: {
        // calendar
        calendar_prev: $('button[data-action=move-prev]'),
        calendar_next: $('button[data-action=move-next]'),
        calendar_today: $('button[data-action=move-today]'),

        // 통계
        statistics: $('button[id=statistics]'),

        // 메모
        memo_save: $('button[id=memo_save]'),
        memo: $('textarea[id=memo]'),

        // text
        calendar_date: $('span[id=renderRange]'),

        // table
        tbody_region: $('tbody[id=region]')

    },
    init: function() {
        let today = new Date(calendar._renderDate._date)
        this.$el.calendar_date.text(today.getFullYear() + "년 " + (today.getMonth() + 1) + "월")

        this.$el.memo.text("")

        this.event()
        this.table()
    },
    table: function() {
        that = this

        let tbody = ""
        let count = 1
        $.post('/grap/api/select/region', function(data){
            if(data.mode) {
                for(let a of data.result) {
                    tbody = "<tr>"
                    tbody += "<td>" + count + "</td>"
                    tbody += "<td>" + a.location + "</td>"
                    tbody += "<td>" + a.total + "</td>"
                    tbody += "</tr>"

                    that.$el.tbody_region.append(tbody)
                    count++
                }
            }
        })
    },
    event: function() {
        let that = this
        that.$el.calendar_next.click(function(){
            calendar.next()

            let next = new Date(calendar._renderDate._date)
            that.$el.calendar_date.text(next.getFullYear() + "년 " + (next.getMonth() + 1) + "월")
        })

        that.$el.calendar_prev.click(function(){
            calendar.prev()

            let prev = new Date(calendar._renderDate._date)
            that.$el.calendar_date.text(prev.getFullYear() + "년 " + (prev.getMonth() + 1) + "월")
        })

        that.$el.calendar_today.click(function(){
            calendar.today()

            let today = new Date(calendar._renderDate._date)
            that.$el.calendar_date.text(today.getFullYear() + "년 " + (today.getMonth() + 1) + "월")
        })

        that.$el.memo_save.click(function () {
            const param = {
                id: that.$el.memo.attr("id"),
                content: that.$el.memo.val()
            }
            $.post('/dashboard/api/add', param, function (data) {
                if (data.mode) {
                    toastr.success(data.result)
                } else {
                    toastr.success(data.result)
                }
            })
        })
    }
}

$(document).ready(function() {
    cal.init();
})