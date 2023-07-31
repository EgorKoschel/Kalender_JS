window.onload = kopfJS(), kalendarblattJS(), infotextJS(), weekInMonthJS(),feiertagYesNoJS();

function kopfJS()
{
    let today = new Date();
    let dateD = today.getDate();
    let monthD = today.getMonth();
    let year = today.getFullYear();
    const monthNames = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
    let monthText = (monthNames[monthD])
    document.getElementById('dateD').textContent = dateD;
    document.getElementById('monthD').textContent = monthText;
    document.getElementById('year').textContent = year;
}

function kalendarblattJS()
{
    let today = new Date();
    let monthD = today.getMonth();
    let year = today.getFullYear();
    const monthNames = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
    let monthText = (monthNames[monthD])
    document.getElementById('monthKalendarblatt').textContent = monthText;
    document.getElementById('yearKalendarblatt').textContent = year;
}

function infotextJS()

{
    let today = new Date();
    let dateD = today.getDate();
    let weekdayD = today.getDay();
    let monthD = today.getMonth();
    let year = today.getFullYear();
    const monthNames = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
    let monthText = (monthNames[monthD])
    const weekNames = [ "Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag","Samstag"];
    let weekText = (weekNames[weekdayD]);
    document.getElementById('textDate').textContent = dateD;
    document.getElementById('textMonth').textContent = monthText;
    document.getElementById('textMonth2').textContent = monthText;
    document.getElementById('textWeekday').textContent = weekText;
    document.getElementById('textWeekday2').textContent = weekText;
    document.getElementById('textMonth').textContent = monthText;
    document.getElementById('textYear').textContent = year;
}

function weekInMonthJS()

{
    const today = new Date();
    const weekdayD = today.getDay();
    const currentDay = today.getDate();
    const firstWeekdayOfMonth = new Date(today);
    firstWeekdayOfMonth.setDate(1);

    while (firstWeekdayOfMonth.getDay() !== weekdayD) {
        firstWeekdayOfMonth.setDate(firstWeekdayOfMonth.getDate()+1);
        }
    const numberWeekday = Math.ceil((currentDay - firstWeekdayOfMonth.getDate() + weekdayD)/7);
    const numberWeekdayName = [ "erste", "zweite", "dritte", "vierte", "fünfte" ];
    let textNumberWeekday = (numberWeekdayName[numberWeekday - 1]);
    console.log(textNumberWeekday);

    document.getElementById('textNumberWeekday').textContent = textNumberWeekday;


}

function feiertagYesNoJS()
{
    let today = new Date();
    let dateD = today.getDate();
    let monthD = today.getMonth() + 1;
    let textFeiertagYesNo;
        if (dateD == 1 && monthD == 1 || dateD == 7 && monthD == 4 || dateD == 10 && monthD == 4 || dateD == 1 && monthD == 5 || dateD == 18 && monthD == 5 
            || dateD == 29 && monthD == 5 || dateD == 8 && monthD == 6 || dateD == 3 && monthD == 10 || dateD == 25 && monthD == 12 || dateD == 26 && monthD == 12) {
            textFeiertagYesNo = "";
        }

        else 
        {
            textFeiertagYesNo = "nicht";
        }

    document.getElementById('holidayYesNo').textContent = textFeiertagYesNo;
}