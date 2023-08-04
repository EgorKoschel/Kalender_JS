let globalDate = new Date();
let easterDate;
let karfreitag;
let christiHimmelfahrt;
let pfingstMontag;
let fronleichnam;
let neuesYahr = new Date (globalDate.getFullYear(), 0, 1);
let tagDerArbeit = new Date (globalDate.getFullYear(), 4, 1)
let tagDerEinheit = new Date (globalDate.getFullYear(), 9, 3);
let weihnachtstag1 = new Date (globalDate.getFullYear(), 11, 25);
let weihnachtstag2 = new Date (globalDate.getFullYear(), 11, 26);

window.onload = getFeiertag(), kopfJS(), infotextJS(), weekInMonthJS(), feiertagYesNoJS(), kalendarblattJS();
console.log("globalDate:" + globalDate);

let headButton = document.getElementById("headButton");
    headButton.addEventListener("click", function () {
        globalDate = new Date();
        kopfJS(), infotextJS(), weekInMonthJS(), feiertagYesNoJS(), kalendarblattJS();
    });

function kopfJS()
{
    let today = globalDate;
    let dateD = today.getDate();
    let monthD = today.getMonth();
    let year = today.getFullYear();
    const monthNames = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
    let monthText = (monthNames[monthD]);
    document.getElementById('dateD').textContent = dateD;
    document.getElementById('monthD').textContent = monthText;
    document.getElementById('year').textContent = year;
    console.log ("kopfDate " + globalDate);
}


function kalendarblattJS() {
    let today = globalDate;
    // get ID
    let kalenderBody = document.getElementById("kalender-body");
    let monthYearElement = document.getElementById("month-year");
    let prevBtn = document.getElementById("prev-btn");
    let nextBtn = document.getElementById("next-btn");

    function renderCalendar() {

        let firstDayNextMonth = 0;

        // get the first day of the current month
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

        console.log("first day of the current month :" + firstDayOfMonth);

        // get the last day of the current month
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

        // get the last day of the previous month
        const lastDayPrevMonth = new Date(today.getFullYear(), today.getMonth(), 0);

        console.log("last day of the current month :" + lastDayOfMonth);
        console.log("last day of the previous month :" + lastDayPrevMonth);

        // get the number of days in the current month
        const daysInMonth = lastDayOfMonth.getDate();

        // get the number of days in the previous month
        let daysInPrevMonth = lastDayPrevMonth.getDate();

        console.log("number of days in the current month :" + daysInMonth);

        // get the day of the week of the first day of the current month
        let firstDayOfWeek = firstDayOfMonth.getDay();

        if (firstDayOfWeek == 0) {
            firstDayOfWeek = 7;
        }

        console.log("first weekday month :" + firstDayOfWeek);

        // get the day of the week of the last day of the current month
        let lastDayOfWeek = lastDayOfMonth.getDay();

        if (lastDayOfWeek == 0) {
            lastDayOfWeek = 7;
        }

        console.log("last weekday month :" + lastDayOfWeek);
        console.log("----------------------------------------");

        // create the name of the current month
        const monthNames = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
        let monthD = today.getMonth();
        let monthText = (monthNames[monthD]);

        // name of the month and year in the header of the calendar
        monthYearElement.textContent = (monthText + " " + today.getFullYear());

        // remove the month before drawing a new
        kalenderBody.innerHTML = "";

        // gray cells with numbers for days before the first day of the month
        for (let i = firstDayOfWeek; i > 1; i--) {
            let day = daysInPrevMonth - i + 2;
            const emptyCell = createGrayCell(day, "grayday");
            kalenderBody.appendChild(emptyCell);
        }

        // cells for days of the month
        let cellWithNumber;
        for (let day = 1; day <= daysInMonth; day++) {
            cellWithNumber =createDayCell(day);
            kalenderBody.appendChild(cellWithNumber);
        }
    
        // empty cells for days after the last day of the month
        for (let i = lastDayOfWeek; i < 7; i++) {
            firstDayNextMonth = firstDayNextMonth + 1;
            const emptyCell = createGrayCell(firstDayNextMonth, "grayday");
            kalenderBody.appendChild(emptyCell);
        }
        
    }

    // create a day cell with a number
    function createDayCell(day) {
        // create a day cell ID
        const dayCell = document.createElement("div");
        let currentMonth = today.getMonth();
        let currentYear = today.getFullYear();

        // adding the class "day" from style.css

            if (day == neuesYahr.getDate() && today.getMonth() == neuesYahr.getMonth() || day == karfreitag.getDate() && today.getMonth() == karfreitag.getMonth()|| day==osterMontag.getDate() && today.getMonth() == osterMontag.getMonth()|| 
            day==tagDerArbeit.getDate() && today.getMonth() == tagDerArbeit.getMonth() || day==christiHimmelfahrt.getDate() && today.getMonth() == christiHimmelfahrt.getMonth()|| day==pfingstMontag.getDate() && today.getMonth() == pfingstMontag.getMonth()||
            day==fronleichnam.getDate() && today.getMonth() == fronleichnam.getMonth() || day==tagDerEinheit.getDate() && today.getMonth() == tagDerEinheit.getMonth()||day==weihnachtstag1.getDate() && today.getMonth() == weihnachtstag1.getMonth()||day==weihnachtstag2.getDate() && today.getMonth() == weihnachtstag2.getMonth()){
            dayCell.classList.add("feiertag");
            }
            else {
            dayCell.classList.add("day");
            }

        // adding the class "today" in style.css and show today
        if (day==globalDate.getDate() && currentMonth==globalDate.getMonth() && currentYear==globalDate.getFullYear() ){
            dayCell.classList.add("today");
        }
        // set cell content text
        dayCell.textContent = day;

        // display a message when you click on the current day
        // dayCell.addEventListener("click", () => alert(`Datum: ${day}.${today.getMonth()+1}.${today.getFullYear()}`));
        dayCell.addEventListener("click", function () {
            globalDate = new Date(today.getFullYear(), today.getMonth(), day);
            console.log ("globalDate: " + globalDate);
            kopfJS(), infotextJS(), weekInMonthJS(), feiertagYesNoJS(); renderCalendar();
        }
        
        );


        // returning the created cell element
        return dayCell;
    }

        // create a day cell with a gray number previous and next month
    function createGrayCell(day) {
            // create a day cell ID
            const dayCell = document.createElement("div");
            // adding the class "grayday" in style.css
            dayCell.classList.add("grayday");
            // set cell content text
            dayCell.textContent = day;
            // returning the created cell element
            return dayCell;
    }

    function createFeiertagCell(day) {
        // create a day cell ID
        const dayCell = document.createElement("div");
        // adding the class "grayday" in style.css
        dayCell.classList.add("feiertag");
        // set cell content text
        dayCell.textContent = day;
        // returning the created cell element
        return dayCell;
    }

    // create calendar on page load
    renderCalendar();

    // buttons
    prevBtn.addEventListener("click", function () {
        // when you click the "Zurück" button, we decrease the month of the current date by 1 and redraw the calendar
        today.setMonth(today.getMonth() - 1);
        kopfJS(), infotextJS(), weekInMonthJS(), feiertagYesNoJS(), getFeiertag(), renderCalendar();
        console.log ("globalDate fater click on previous or next month ", globalDate);
    });

    nextBtn.addEventListener("click", function () {
        // when you click the "Weiter" button, increase the month of the current date by 1 and redraw the calendar
        today.setMonth(today.getMonth() + 1);
        kopfJS(), infotextJS(), weekInMonthJS(), feiertagYesNoJS(), getFeiertag(), renderCalendar();
        console.log ("globalDate fater click on previous or next month ", globalDate);
    });
}

function infotextJS()

{
    let today = globalDate;
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
    const today = globalDate;
    const weekdayD = today.getDay();
    const currentDay = today.getDate();
    const firstWeekdayOfMonth = new Date(today);
    firstWeekdayOfMonth.setDate(1);

    while (firstWeekdayOfMonth.getDay() !== weekdayD) {
        firstWeekdayOfMonth.setDate(firstWeekdayOfMonth.getDate()+1);
        }
        if (weekdayD == 0){
            const numberWeekday = Math.ceil((currentDay - firstWeekdayOfMonth.getDate() + 7)/7);
            const numberWeekdayName = [ "erste", "zweite", "dritte", "vierte", "fünfte" ];
            let textNumberWeekday = (numberWeekdayName[numberWeekday - 1]);
            document.getElementById('textNumberWeekday').textContent = textNumberWeekday;
            }
        else{
            const numberWeekday = Math.ceil((currentDay - firstWeekdayOfMonth.getDate() + weekdayD)/7);
            const numberWeekdayName = [ "erste", "zweite", "dritte", "vierte", "fünfte" ];
            let textNumberWeekday = (numberWeekdayName[numberWeekday - 1]);
            document.getElementById('textNumberWeekday').textContent = textNumberWeekday;
        }



}

function feiertagYesNoJS()
{
    let today = globalDate;
    let dateD = today.getDate();
    let monthD = today.getMonth();
    let textFeiertagYesNo;
        if (dateD == neuesYahr.getDate() && monthD == neuesYahr.getMonth() || dateD == karfreitag.getDate() && monthD == karfreitag.getMonth() || dateD == osterMontag.getDate() && monthD == osterMontag.getMonth() || dateD == tagDerArbeit.setDate() && monthD == tagDerArbeit.getMonth() || dateD == christiHimmelfahrt.getDate() && monthD == christiHimmelfahrt.getMonth() 
            || dateD == pfingstMontag.getDate() && monthD == pfingstMontag.getMonth() || dateD == fronleichnam.getDate() && monthD == fronleichnam.getMonth() || dateD == tagDerEinheit.getDate() && monthD == tagDerEinheit.getMonth() || dateD == weihnachtstag1.getDate() && monthD == weihnachtstag1.getMonth() || dateD == weihnachtstag2.getDate() && monthD == weihnachtstag2.getMonth()) {
            textFeiertagYesNo = "";
        }

        else 
        {
            textFeiertagYesNo = "nicht";
        }

    document.getElementById('holidayYesNo').textContent = textFeiertagYesNo;
}

function getFeiertag(){

    const year = globalDate.getFullYear();

    function calculateEasterDate(year) {
        const a = year % 19, b = year % 4, c = year % 7,
        d = (19 * a + 24) % 30, e = (2 * b + 4 * c + 6 * d + 5) % 7;
        const day = 22 + d + e;
        return new Date(year, 2, day + (d === 29 || (d === 28 && e === 6) ? -7 : 0));
        }
        easterDate = calculateEasterDate(year);
        console.log(`--------------Feiertagen in ${year}---------`);
        console.log(`Easter in ${year} ${easterDate.toDateString()}`);

        karfreitag = new Date (easterDate);
        karfreitag.setDate(karfreitag.getDate() - 2);
        console.log(`Karfreitag in ${year} ${karfreitag.toDateString()}`);

        osterMontag = new Date (easterDate);
        osterMontag.setDate(osterMontag.getDate() + 1);
        console.log(`Ostermontag in ${year} ${osterMontag.toDateString()}`);

        christiHimmelfahrt = new Date (easterDate);
        christiHimmelfahrt.setDate(christiHimmelfahrt.getDate() + 39);
        console.log(`Christi Himmelfahrt in ${year} ${christiHimmelfahrt.toDateString()}`);

        pfingstMontag = new Date (easterDate);
        pfingstMontag.setDate(pfingstMontag.getDate() + 50);
        console.log(`Pfingstmontag in ${year} ${pfingstMontag.toDateString()}`);

        fronleichnam = new Date (pfingstMontag);
        fronleichnam.setDate(fronleichnam.getDate() + 10);
        console.log(`Fronleichnam in ${year} ${fronleichnam.toDateString()}`);

        console.log(`Neues Yahr in ${year} ${neuesYahr.toDateString()}`);

        console.log(`Tag der Einheit in ${year} ${tagDerEinheit.toDateString()}`);

        console.log(`Weinachtag 1 in ${year} ${weihnachtstag1.toDateString()}`);

        console.log(`Weinachtag 2 in ${year} ${weihnachtstag2.toDateString()}`);
}