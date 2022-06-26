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

        that.$el.statistics.click(function() {
            alert('통계 준비 중입니다.')
        })
    }
}

$(document).ready(function() {
    cal.init();
})