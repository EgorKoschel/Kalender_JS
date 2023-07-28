window.onload=function main() 
{
    let date = new Date();
    let dateD = date.getDate();
    let weekdayD = date.getDay();
    let weekInMonth = date.getMonth();
    let monthD = date.getMonth();
    let year = date.getFullYear();
    const monthNames = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
    let monthText = (monthNames[monthD])
    const weekNames = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag","Samstag", "Sonntag"];
    let weekText = (weekNames[weekdayD]);
    document.getElementById('textDateD').innerHTML = dateD;
    document.getElementById('textWeekdayD').innerHTML = weekText;
    document.getElementById('textWeekInMonth').innerHTML = weekInMonth;
    document.getElementById('textMonthD').innerHTML = monthText;
    document.getElementById('textYear').innerHTML = year;
}

