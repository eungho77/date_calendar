var calendar = new tui.Calendar('#calendar', {
    defaultView: 'month',
    template: templates,
    useCreationPopup: true,
    useDetailPopup: true,
    calendars: [
        {
            id: '1',
            name: '송정아',
            color: '#ffffff',
            bgColor: '#9e5fff',
            dragBgColor: '#9e5fff',
            borderColor: '#9e5fff'
        },
        {
            id: '2',
            name: '김응호',
            color: '#00a9ff',
            bgColor: '#00a9ff',
            dragBgColor: '#00a9ff',
            borderColor: '#00a9ff'
        },
        {
            id: '3',
            name: '데이트♥',
            color: '#ff5583',
            bgColor: '#ff5583',
            dragBgColor: '#ff5583',
            borderColor: '#ff5583'
        }
    ]
});

var templates = {
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
        return getTimeTemplate(schedule, true);
    },
    alldayTitle: function() {
        return '<span class="tui-full-calendar-left-content">ALL DAY</span>';
    },
    time: function(schedule) {
        return '<strong>' + moment(schedule.start.getTime()).format('HH:mm') + '</strong> ' + schedule.title;
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
        return 'All Day';
    },
    titlePlaceholder: function() {
        return 'Subject';
    },
    locationPlaceholder: function() {
        return 'Location';
    },
    startDatePlaceholder: function() {
        return 'Start date';
    },
    endDatePlaceholder: function() {
        return 'End date';
    },
    popupSave: function() {
        return 'Save';
    },
    popupUpdate: function() {
        return 'Update';
    },
    popupDetailDate: function(isAllDay, start, end) {
        var isSameDate = moment(start).isSame(end);
        var endFormat = (isSameDate ? '' : 'YYYY.MM.DD ') + 'hh:mm a';

        if (isAllDay) {
            return moment(start).format('YYYY.MM.DD') + (isSameDate ? '' : ' - ' + moment(end).format('YYYY.MM.DD'));
        }

        return (moment(start).format('YYYY.MM.DD hh:mm a') + ' - ' + moment(end).format(endFormat));
    },
    popupDetailLocation: function(schedule) {
        return 'Location : ' + schedule.location;
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
        return 'Edit';
    },
    popupDelete: function() {
        return 'Delete';
    }
}

calendar.on('afterRenderSchedule', function(event){
    console.log('afterRenderSchedule')
})

calendar.on('beforeCreateSchedule', event => {
    console.log(calendar)
    console.log(event)

    const schedule = {
        title: event.title,
        category: event.isAllDay ? 'allday' : 'time',
        start: event.start,
        end: event.end,
        isAllDay: event.isAllDay,
        location: event.location
    }

    console.log(schedule)

    calendar.createSchedules([schedule]);

    // if (triggerEventName === 'click') {
    //     // open writing simple schedule popup
    //     schedule = {...};
    // } else if (triggerEventName === 'dblclick') {
    //     // open writing detail schedule popup
    //     schedule = {...};
    // }

    console.log('스케줄 등록 완료')
});

calendar.on('beforeDeleteSchedule', function(event) {
    var schedule = event.schedule;

    console.log('The schedule is removed.', schedule);
});

calendar.on('beforeUpdateSchedule', function(event) {
    console.log('beforeUpdateSchedule')
    var schedule = event.schedule;
    var changes = event.changes;

    calendar.updateSchedule(schedule.id, schedule.calendarId, changes);
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

calendar.on('clickSchedule', function(event) {
    console.log('clickSchedule')
    var schedule = event.schedule;

    if (lastClickSchedule) {
        calendar.updateSchedule(lastClickSchedule.id, lastClickSchedule.calendarId, {
            isFocused: false
        });
    }
    calendar.updateSchedule(schedule.id, schedule.calendarId, {
        isFocused: true
    });

    lastClickSchedule = schedule;
    // open detail view
});

calendar.on('clickTimezonesCollapseBtn', function(timezonesCollapsed) {
    console.log('clickTimezonesCollapseBtn', timezonesCollapsed);
});