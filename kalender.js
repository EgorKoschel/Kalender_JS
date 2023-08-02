window.onload = kopfJS(), infotextJS(), weekInMonthJS(),feiertagYesNoJS();
document.addEventListener("DOMContentLoaded", kalendarblattJS());
function kopfJS()
{
    let today = new Date();
    let dateD = today.getDate();
    let monthD = today.getMonth();
    let year = today.getFullYear();
    const monthNames = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
    let monthText = (monthNames[monthD]);
    document.getElementById('dateD').textContent = dateD;
    document.getElementById('monthD').textContent = monthText;
    document.getElementById('year').textContent = year;
}

// function kalendarblattJS()
// {
//     let today = new Date();
//     let monthD = today.getMonth();
//     let year = today.getFullYear();
//     const monthNames = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
//     let monthText = (monthNames[monthD])
//     document.getElementById('monthKalendarblatt').textContent = monthText;
//     document.getElementById('yearKalendarblatt').textContent = year;
// }

function kalendarblattJS() {
    let today = new Date();
    // get ID
    let kalenderBody = document.getElementById("kalender-body");
    let monthYearElement = document.getElementById("month-year");
    let prevBtn = document.getElementById("prev-btn");
    let nextBtn = document.getElementById("next-btn");

    function renderCalendar() {
        // get the first day of the current month
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

        // get the last day of the current month
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

        // get the number of days in the current month
        const daysInMonth = lastDayOfMonth.getDate();

        // get the day of the week of the first day of the current month
        let firstDayOfWeek = firstDayOfMonth.getDay();

        if (firstDayOfWeek == 0) {
            firstDayOfWeek = 7;
        }

        else
        {
            firstDayOfWeek = firstDayOfWeek-1;
        } 

        // get the day of the week of the last day of the current month (от 0 до 6, где 0 - воскресенье)
        let lastDayOfWeek = lastDayOfMonth.getDay();

        if (lastDayOfWeek == 0) {
            lastDayOfWeek = 7;
        }
        else
        {
            lastDayOfWeek = lastDayOfWeek;
        }

        console.log(lastDayOfWeek);

        // create the name of the current month
        const monthNames = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
        let monthD = today.getMonth();
        let monthText = (monthNames[monthD]);

        // name of the month and year in the header of the calendar
        monthYearElement.textContent = (monthText + " " + today.getFullYear());

        // remove the month before drawing a new
        kalenderBody.innerHTML = "";

        // empty cells for days before the first day of the month
        for (let i = 0; i < firstDayOfWeek; i++) {
            const emptyCell = createDayCell("");
            kalenderBody.appendChild(emptyCell);
        }

        // cells for days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = createDayCell(day);
            kalenderBody.appendChild(dayCell);
        }
    
        // empty cells for days after the last day of the month
        for (let i = lastDayOfWeek; i < 7; i++) {
            const emptyCell = createDayCell("");
            kalenderBody.appendChild(emptyCell);
        }
    }

    // create a day cell with a number
    function createDayCell(day) {
        // create a day cell ID
        const dayCell = document.createElement("div");

        // adding the class "day" for style.css
        dayCell.classList.add("day");

        // set cell content text
        dayCell.textContent = day;

        // display a message when you click on the current day
        dayCell.addEventListener("click", () => alert(`Datum: ${day}`));

        // returning the created cell element
        return dayCell;
    }
    // create calendar on page load
    renderCalendar();

    // buttons
    prevBtn.addEventListener("click", function () {
        // when you click the "Zurück" button, we decrease the month of the current date by 1 and redraw the calendar
        today.setMonth(today.getMonth() - 1);
        renderCalendar();
    });

    nextBtn.addEventListener("click", function () {
        // when you click the "Weiter" button, increase the month of the current date by 1 and redraw the calendar
        today.setMonth(today.getMonth() + 1);
        renderCalendar();
    });
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