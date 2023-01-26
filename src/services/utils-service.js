export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    loadFromStorage,
    saveToStorage,
    debounce,
    time_ago,
    getDates,
    hoverEffect,
    format,
    getEditColors,
    getFonts,
    getThemes
};

function makeId(length = 6) {
    var txt = '';
    var possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}

function makeLorem(size = 100) {
    var words = [
        'The sky',
        'above',
        'the port',
        'was',
        'the color of television',
        'tuned',
        'to',
        'a dead channel',
        '.',
        'All',
        'this happened',
        'more or less',
        '.',
        'I',
        'had',
        'the story',
        'bit by bit',
        'from various people',
        'and',
        'as generally',
        'happens',
        'in such cases',
        'each time',
        'it',
        'was',
        'a different story',
        '.',
        'It',
        'was',
        'a pleasure',
        'to',
        'burn',
    ];
    var txt = '';
    while (size > 0) {
        size--;
        txt += words[Math.floor(Math.random() * words.length)] + ' ';
    }
    return txt;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : undefined;
}

function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    };
}

function time_ago(time) {
    switch (typeof time) {
        case 'number':
            break;
        case 'string':
            time = +new Date(time);
            break;
        case 'object':
            if (time.constructor === Date) time = time.getTime();
            break;
        default:
            time = +new Date();
    }
    var time_formats = [
        [60, 'seconds', 1], // 60
        [120, '1 minute ago', '1 minute from now'], // 60*2
        [3600, 'minutes', 60], // 60*60, 60
        [7200, '1 hour ago', '1 hour from now'], // 60*60*2
        [86400, 'hours', 3600], // 60*60*24, 60*60
        [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
        [604800, 'days', 86400], // 60*60*24*7, 60*60*24
        [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
        [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
        [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
        [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
        [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
        [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
        [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
        [58060800000, 'centuries', 2903040000], // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
    ];
    var seconds = (+new Date() - time) / 1000,
        token = 'ago',
        list_choice = 1;

    if (seconds == 0) {
        return 'Just now';
    }
    if (seconds < 0) {
        seconds = Math.abs(seconds);
        token = 'from now';
        list_choice = 2;
    }
    var i = 0,
        format;
    while ((format = time_formats[i++]))
        if (seconds < format[0]) {
            if (typeof format[2] == 'string') return format[list_choice];
            else
                return (
                    Math.floor(seconds / format[2]) +
                    ' ' +
                    format[1] +
                    ' ' +
                    token
                );
        }
    return time;
}

function getDates() {
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];
    const month = months[getRandomIntInclusive(0, months.length - 1)];

    const day = getRandomIntInclusive(1, 31);
    let lastDay = day + 4;
    if (lastDay > 31) {
        let diff = lastDay - 31;
        lastDay = diff;
        if (month === 'Dec') return `${month} ${day} - Jan ${lastDay}`;
        return `${month} ${day} - ${
            months[months.indexOf(month) + 1]
        } ${lastDay}`;
    }
    return `${month} ${day} - ${lastDay}`;
}

function hoverEffect(ev) {
    const button = ev.target;
    const { x, y } = button.getBoundingClientRect();
    button.style.setProperty('--x', ev.clientX - x + 'px');
    button.style.setProperty('--y', ev.clientY - y + 'px');
}

function format(num) {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    let price = formatter.format(num);
    let dotIdx = price.indexOf('.');
    return price[dotIdx + 1] === '0' ? price.slice(0, dotIdx) : price;
}

function getEditColors() {
    return [
        "#0400ff",
        "#0064ff",
        "#00ca84",
        "#c400ff",
        "#864d01",
        "#ff9202",
        "#ef032a",
        "#263140",
        "#faebd7",
        "#ffffff",
    ]
}

function getFonts(){
    return [
        {code: 'Aa', full: 'Arial'},
        {code: 'Aa', full: 'Arial'},
        {code: 'Aa', full: 'Arial'},
        {code: 'Aa', full: 'Arial'},
        {code: 'Aa', full: 'Arial'},
    ]
}

function getThemes(){
    return [
        {'background-color': '#354F60',color: '#BC0E4C', others: '#FFC501'},
        {'background-color': '#4e9aa0',color: '#eeede9', others: '#d55b49'},
        {'background-color': '#0198a6',color: '#01375a', others: '#f0f1e4'},
        {'background-color': '#a9b7a0',color: '#d6bfbb', others: '#e7e2de'},
        {'background-color': '#e9e3db',color: '#353132', others: '#D84339'},
    ]
}