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
        memo: $('textarea'),

        // text
        calendar_date: $('span[id=renderRange]')

    },
    init: function() {
        this.event();

        let today = new Date(calendar._renderDate._date)
        this.$el.calendar_date.text(today.getFullYear() + "년 " + (today.getMonth() + 1) + "월")

        this.$el.memo.text("")
    },
    event: function() {
        let that = this;
        that.$el.calendar_next.click(function(){
            calendar.next();

            let next = new Date(calendar._renderDate._date)
            that.$el.calendar_date.text(next.getFullYear() + "년 " + (next.getMonth() + 1) + "월")
        })

        that.$el.calendar_prev.click(function(){
            calendar.prev();

            let prev = new Date(calendar._renderDate._date)
            that.$el.calendar_date.text(prev.getFullYear() + "년 " + (prev.getMonth() + 1) + "월")
        })

        that.$el.calendar_today.click(function(){
            calendar.today();

            let today = new Date(calendar._renderDate._date)
            that.$el.calendar_date.text(today.getFullYear() + "년 " + (today.getMonth() + 1) + "월")
        })

        that.$el.memo_save.click(function () {
            let memo = "";

            $.ajax({
                url : '/dashboard/api/select',
                async : false,         // false 일 경우 동기 요청으로 변경
                type : 'POST',   // POST, GET, PUT
                data : {id: that.$el.memo.attr("id") },
                dataType : 'json'          // text, xml, json, script, html
            }).done((data) => {
                if(data.mode) {
                    memo = data.result
                }
            })

            const param = {
                id: that.$el.memo.attr("id"),
                content: that.$el.memo.val()
            }

            if(memo != null) {
                $.post('/dashboard/api/update', param, function (data) {
                    if (data.mode) {
                        alert('할일 수정 완료')
                    } else {
                        console.log("메모 수정 실패")
                    }
                })
            } else {
                $.post('/dashboard/api/insert', param, function (data) {
                    if (data.mode) {
                        alert('할일 등록 완료')
                    } else {
                        console.log("메모 수정 실패")
                    }
                })
            }
        })
    }
}

$(document).ready(function() {
    cal.init();
})