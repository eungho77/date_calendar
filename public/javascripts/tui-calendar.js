let category = ""

$.ajax({
    url : '/api/category',
    async : false,         // false 일 경우 동기 요청으로 변경
    type : 'POST',   // POST, GET, PUT
    dataType : 'json'          // text, xml, json, script, html
}).done((result) => {
    if(result.mode) {
        category = result.data
        console.log("카데고리 조회 완료")
    }
})

const templates = {
    milestone: function(schedule) {
        return '<span class="calendar-font-icon ic-milestone-b"></span> <span style="background-color: ' + schedule.bgColor + '">' + schedule.title + '</span>';
    },
    milestoneTitle: function() {
        return '<span class="tui-full-calendar-left-content">MILESTONE</span>';
    },
    task: function(schedule) {
        return '#' + schedule.title;
    },
    taskTitle: function() {
        return '<span class="tui-full-calendar-left-content">TASK</span>';
    },
    allday: function(schedule) {
        return schedule.title;
    },
    alldayTitle: function() {
        return '<span class="tui-full-calendar-left-content">ALL DAY</span>';
    },
    time: function(schedule) {
        return '<strong>' + moment(schedule.start.getTime()).format('HH:mm') + ' ~ ' + moment(schedule.end.getTime()).format('HH:mm') + '</strong> ' + schedule.title;
    },
    goingDuration: function(schedule) {
        return '<span class="calendar-icon ic-travel-time"></span>' + schedule.goingDuration + 'min.';
    },
    comingDuration: function(schedule) {
        return '<span class="calendar-icon ic-travel-time"></span>' + schedule.comingDuration + 'min.';
    },
    monthMoreTitleDate: function(date, dayname) {
        var day = date.split('.')[2];

        return '<span class="tui-full-calendar-month-more-title-day">' + day + '</span> <span class="tui-full-calendar-month-more-title-day-label">' + dayname + '</span>';
    },
    monthMoreClose: function() {
        return '<span class="tui-full-calendar-icon tui-full-calendar-ic-close"></span>';
    },
    monthGridHeader: function(dayModel) {
        var date = parseInt(dayModel.date.split('-')[2], 10);
        var classNames = ['tui-full-calendar-weekday-grid-date '];

        if (dayModel.isToday) {
            classNames.push('tui-full-calendar-weekday-grid-date-decorator');
        }

        return '<span class="' + classNames.join(' ') + '">' + date + '</span>';
    },
    monthGridHeaderExceed: function(hiddenSchedules) {
        return '<span class="weekday-grid-more-schedules">+' + hiddenSchedules + '</span>';
    },
    monthGridFooter: function() {
        return '';
    },
    monthGridFooterExceed: function(hiddenSchedules) {
        return '';
    },
    monthDayname: function(model) {
        return (model.label).toString().toLocaleUpperCase();
    },
    weekDayname: function(model) {
        return '<span class="tui-full-calendar-dayname-date">' + model.date + '</span>&nbsp;&nbsp;<span class="tui-full-calendar-dayname-name">' + model.dayName + '</span>';
    },
    weekGridFooterExceed: function(hiddenSchedules) {
        return '+' + hiddenSchedules;
    },
    dayGridTitle: function(viewName) {

        // use another functions instead of 'dayGridTitle'
        // milestoneTitle: function() {...}
        // taskTitle: function() {...}
        // alldayTitle: function() {...}

        var title = '';
        switch(viewName) {
            case 'milestone':
                title = '<span class="tui-full-calendar-left-content">MILESTONE</span>';
                break;
            case 'task':
                title = '<span class="tui-full-calendar-left-content">TASK</span>';
                break;
            case 'allday':
                title = '<span class="tui-full-calendar-left-content">ALL DAY</span>';
                break;
        }

        return title;
    },
    schedule: function(schedule) {

        // use another functions instead of 'schedule'
        // milestone: function() {...}
        // task: function() {...}
        // allday: function() {...}

        var tpl;

        switch(category) {
            case 'milestone':
                tpl = '<span class="calendar-font-icon ic-milestone-b"></span> <span style="background-color: ' + schedule.bgColor + '">' + schedule.title + '</span>';
                break;
            case 'task':
                tpl = '#' + schedule.title;
                break;
            case 'allday':
                tpl = getTimeTemplate(schedule, true);
                break;
        }

        return tpl;
    },
    collapseBtnTitle: function() {
        return '<span class="tui-full-calendar-icon tui-full-calendar-ic-arrow-solid-top"></span>';
    },
    timezoneDisplayLabel: function(timezoneOffset, displayLabel) {
        var gmt, hour, minutes;

        if (!displayLabel) {
            gmt = timezoneOffset < 0 ? '-' : '+';
            hour = Math.abs(parseInt(timezoneOffset / 60, 10));
            minutes = Math.abs(timezoneOffset % 60);
            displayLabel = gmt + getPadStart(hour) + ':' + getPadStart(minutes);
        }

        return displayLabel;
    },
    timegridDisplayPrimayTime: function(time) {
        // will be deprecated. use 'timegridDisplayPrimaryTime'
        var meridiem = 'am';
        var hour = time.hour;

        if (time.hour > 12) {
            meridiem = 'pm';
            hour = time.hour - 12;
        }

        return hour + ' ' + meridiem;
    },
    timegridDisplayPrimaryTime: function(time) {
        var meridiem = 'am';
        var hour = time.hour;

        if (time.hour > 12) {
            meridiem = 'pm';
            hour = time.hour - 12;
        }

        return hour + ' ' + meridiem;
    },
    timegridDisplayTime: function(time) {
        return getPadStart(time.hour) + ':' + getPadStart(time.hour);
    },
    timegridCurrentTime: function(timezone) {
        var templates = [];

        if (timezone.dateDifference) {
            templates.push('[' + timezone.dateDifferenceSign + timezone.dateDifference + ']<br>');
        }

        templates.push(moment(timezone.hourmarker).format('HH:mm a'));

        return templates.join('');
    },
    popupIsAllDay: function() {
        return 'ALL';
    },
    popupStateFree: function() {
        return 'Free';
    },
    popupStateBusy: function() {
        return 'Busy';
    },
    titlePlaceholder: function() {
        return '할 일';
    },
    locationPlaceholder: function() {
        return '위치';
    },
    startDatePlaceholder: function() {
        return 'Start date';
    },
    endDatePlaceholder: function() {
        return 'End date';
    },
    popupSave: function() {
        return '저장';
    },
    popupUpdate: function() {
        return '업데이트';
    },
    popupDetailDate: function(isAllDay, start, end) {
        let result = "";

        const detail_start = new Date(start);
        const detail_end = new Date(end);

        if (isAllDay) {
            result = detail_start.getFullYear() + "." + (detail_start.getMonth() + 1) + "." + detail_start.getDate() + " ~ " + detail_end.getFullYear() + "." + (detail_end.getMonth() + 1) + "." + detail_end.getDate();
        } else {
            result = detail_start.getFullYear() + "." + (detail_start.getMonth() + 1) + "." + detail_start.getDate() + " " + detail_start.getHours() + ":" + detail_start.getMinutes() + " ~ " + detail_end.getHours() + ":" + detail_end.getMinutes()
        }

        return result;
    },
    popupDetailLocation: function(schedule) {
        return '장소 : ' + schedule.location;
    },
    popupDetailUser: function(schedule) {
        return 'User : ' + (schedule.attendees || []).join(', ');
    },
    popupDetailState: function(schedule) {
        return 'State : ' + schedule.state || 'Busy';
    },
    popupDetailRepeat: function(schedule) {
        return 'Repeat : ' + schedule.recurrenceRule;
    },
    popupDetailBody: function(schedule) {
        return 'Body : ' + schedule.body;
    },
    popupEdit: function() {
        return '수정';
    },
    popupDelete: function() {
        return '삭제';
    }
};

const calendar = new tui.Calendar('#calendar', {
    defaultView: 'month',
    template: templates,
    useCreationPopup: true,
    useDetailPopup: true,
    calendars: category
});

$.ajax({
    url : '/api/calendar',
    async : false,         // false 일 경우 동기 요청으로 변경
    type : 'POST',   // POST, GET, PUT
    dataType : 'json'          // text, xml, json, script, html
}).done((result) => {
    if(result.mode) {
        calendar.createSchedules(result.data)
        console.log("스케줄 조회 완료")
    }
})

// calendar.on('afterRenderSchedule', function(event){
//     console.log('afterRenderSchedule')
// })

calendar.on('beforeCreateSchedule', event => {
    let calendar_id = "";
    const schedule = {
        id: Math.floor(Math.random() * 2147483647),
        calendarId: event.calendarId,
        title: event.title,
        category: event.isAllDay ? "allday" : "time",
        start: new Date(event.start).toString(),
        end: new Date(event.end).toString(),
        isAllDay: event.isAllDay ? true : false,
        location: event.location
    }

    // 게시물 id 중복 x
    $.ajax({
        url : '/api/calendar',
        async : false,         // false 일 경우 동기 요청으로 변경
        type : 'POST',   // POST, GET, PUT
        dataType : 'json'          // text, xml, json, script, html
    }).done((result) => {
        if(result.mode) {
            calendar_id = Math.floor(Math.random() * 2147483647)
            for(let a of result.data) {
                if(a.id === calendar_id) {
                    calendar_id = Math.floor(Math.random() * 2147483647)
                }
            }
        }
    })

    const param = {
        id: calendar_id,
        calendarId: event.calendarId,
        title: event.title,
        category: event.isAllDay ? "allday" : "time",
        start: new Date(event.start).toString(),
        end: new Date(event.end).toString(),
        isAllDay: schedule.isAllDay ? "종일" : "당일",
        location: event.location
    }

    $.post('/api/calendar/insert', param, function(result){
        if(result.mode) {
            calendar.createSchedules([schedule]);
            console.log(result.text)
        } else {
            console.log("등록 실패")
        }
    })
});

calendar.on('beforeDeleteSchedule', function(event) {
    const schedule = event.schedule;
    const param = {
        id : schedule.id
    }

    $.post('/api/calendar/delete', param, function(result){
        if(result.mode) {
            calendar.deleteSchedule(schedule.id, schedule.calendarId);
            console.log(result.text)
        } else {
            console.log("삭제 실패")
        }
    })
});

calendar.on('beforeUpdateSchedule', function(event) {
    let schedule = event.schedule;
    let changes = event.changes

    calendar.updateSchedule(schedule.id, schedule.calendarId, changes);

    changes.id = schedule.id
    if(changes.calendarId != null){
        changes.calendarId = changes.calendarId
    }
    if(changes.isAllDay != null) {
        changes.isAllDay = (changes.isAllDay) ? "종일" : "당일"
    }
    if(changes.start != null) {
        changes.start = changes.start._date
    }
    if(changes.end != null) {
        changes.end = changes.end._date
    }

    $.post('/api/calendar/update', changes, function(result){
        if(result.mode) {
            console.log(result.text)
        } else {
            console.log("수정 실패")
        }
    })
});

calendar.on('clickDayname', function(event) {
    console.log('clickDayname')
    if (calendar.getViewName() === 'week') {
        calendar.setDate(new Date(event.date));
        calendar.changeView('day', true);
    }
});

calendar.on('clickMore', function(event) {
    console.log('clickMore', event.date, event.target);
});

calendar.on('clickTimezonesCollapseBtn', function(timezonesCollapsed) {
    console.log('clickTimezonesCollapseBtn', timezonesCollapsed);
});

calendar.on('clickSchedule', function(event) {
    const schedule = event.schedule;

    const param = {
        id: schedule.id
    }

    $.post('/api/memo', param, function(data){
        if(data.mode) {
            cal.$el.memo.text(data.result.content)
        }
    })
});