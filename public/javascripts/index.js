// data-action="move-prev"

let cal = {
    $el: {
        // button
        calendar_prev: $('button[data-action=move-prev]'),
        calendar_next: $('button[data-action=move-next]'),
        calendar_today: $('button[data-action=move-today]'),

        // text
        calendar_date: $('span[id=renderRange]')
    },
    init: function() {
        this.event();

        let today = new Date(calendar._renderDate._date);
        this.$el.calendar_date.text(today.getFullYear() + "년 " + (today.getMonth() + 1) + "월")
    },
    event: function() {
        that = this;
        this.$el.calendar_next.click(function(){
            calendar.next();

            let next = new Date(calendar._renderDate._date);
            that.$el.calendar_date.text(next.getFullYear() + "년 " + (next.getMonth() + 1) + "월")
        })

        this.$el.calendar_prev.click(function(){
            calendar.prev();

            let prev = new Date(calendar._renderDate._date);
            that.$el.calendar_date.text(prev.getFullYear() + "년 " + (prev.getMonth() + 1) + "월")
        })

        this.$el.calendar_today.click(function(){
            calendar.today();

            let today = new Date(calendar._renderDate._date);
            that.$el.calendar_date.text(today.getFullYear() + "년 " + (today.getMonth() + 1) + "월")
        })
    }
}

$(document).ready(function() {
    cal.init();
})