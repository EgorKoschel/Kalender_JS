//set global date for all functions
let globalDate = new Date();
//create variabels for all holidays, get the dates later with function "getFeiertag()".
let easterDate;
let karfreitag;
let christiHimmelfahrt;
let pfingstMontag;
let fronleichnam;
let neuesYahr;
let tagDerArbeit;
let tagDerEinheit;
let weihnachtstag1;
let weihnachtstag2;
//create an arrays with names of month and days of the week
const monthNamesArray = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
const weekDaysArray = [ "Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag","Samstag"];

let isPrevNextButtonClick = false;

let headButton = document.getElementById("headButton");
let historyElement = document.getElementById('historyElement');
let infoElement = document.getElementById('infoElement');
let dateHeader = document.getElementById('dateHeader');
let monthHeader = document.getElementById('monthHeader');
let yearHeader = document.getElementById('yearHeader');
let calenderBody = document.getElementById("calenderBody");
let monthYearElement = document.getElementById("monthYearElement");
let prevButton = document.getElementById("prevButton");
let nextButton = document.getElementById("nextButton");
let numberWeekday = document.getElementById('textNumberWeekday');
let textHolidayYesNo = document.getElementById('holidayYesNo');
let heuteIstName = document.getElementById('heuteIstName');
let numberToName = document.getElementById('feiertagName');

headButton.addEventListener("click", onClickHeader);

window.onload = getFeiertag(), drawFullPage();
console.log("globalDate:" + globalDate);


function drawFullPage(){
    drawHeader(), infoText(), weekInMonth(), feiertagYesNo(), drawFullCalender();
}

function drawAnimation(){
    historyElement.classList.add("wikiDataAnimation");
    infoElement.classList.add("wikiDataAnimation");
    setTimeout(
        function(){
            historyElement.classList.remove("wikiDataAnimation");
            infoElement.classList.remove("wikiDataAnimation");
        }, 800
    );
}

function onClickHeader(){
    globalDate = new Date();    
        drawFullPage(), drawAnimation();
}

function drawHeader(){
    // adding text with date ant month in HTML
    dateHeader.textContent = globalDate.getDate();
    monthHeader.textContent = (monthNamesArray[globalDate.getMonth()]);
    yearHeader.textContent = globalDate.getFullYear();
}

function onClickCalendarHeader(){
    if(navigator.userAgent.indexOf("Firefox") !== -1){
        monthYearElement.addEventListener("click", onClickCalendarHeaderFirefox);
    }
    else {
        monthYearElement.addEventListener("click", onClickCalendarHeaderWebkit);
    }
}

function onClickCalendarHeaderFirefox(){
    let inputDate = document.createElement("input");
    inputDate.type = "text";
    inputDate.maxlength="10";
    inputDate.placeholder ="YYYY-MM-DD";
    monthYearElement.replaceWith(inputDate);
    inputDate.focus();
    inputDate.addEventListener("blur", function(){
        inputDate.replaceWith(monthYearElement);
    });

    inputDate.addEventListener("keydown", function(event){
        if(event.key=="Enter"){
            userInput();
        }});

    function userInput(){
        console.log ("User input ", inputDate.value);
        if (inputDate.value != null) {
            let tempDate = new Date(inputDate.value);
            if (tempDate.getTime()-tempDate.getTime()==0){
            globalDate = tempDate;
            isPrevNextButtonClick = false;
            inputDate.replaceWith(monthYearElement);
            getFeiertag(), drawFullPage();
            // globalDate = tempDate;
            }
            else {
                alert("Ungültiges Datum. Bitte geben Sie das Datum im Format YYYY-MM-DD ein.");
                inputDate.replaceWith(monthYearElement);
            }
        }
        }
}

function onClickCalendarHeaderWebkit(){
    let inputDate = document.createElement("input");
    let blurTimeout;
    inputDate.type = "date";
    inputDate.max="9999-12-31"
    monthYearElement.replaceWith(inputDate);
    inputDate.focus();
    inputDate.addEventListener("blur", function(){
       blurTimeout = setTimeout(userInput, 10);
    });

    inputDate.addEventListener("keydown", function(event){
        if(event.key=="Enter"){
            inputDate.replaceWith(monthYearElement);
        }});

    function userInput(){
        console.log ("User input ", inputDate.value);
        if (inputDate.value != null) {
            let tempDate = new Date(inputDate.value);
            if (tempDate.getTime()-tempDate.getTime()==0){
            globalDate = tempDate;
            isPrevNextButtonClick = false;
            inputDate.replaceWith(monthYearElement);
            getFeiertag(), drawFullPage();
            console.log("Global date User Input " + globalDate);
            // globalDate = tempDate;
            }
            else {
                alert("Ungültiges Datum. Bitte geben Sie das Datum im Format YYYY-MM-DD ein.");
                inputDate.replaceWith(monthYearElement);
            }
        }
        }
}

function getIsSameDate(date1, date2) {
    return date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate();
}

function getIsHoliday(date) {
    return getIsSameDate(date, neuesYahr) ||
        getIsSameDate(date, karfreitag) ||
        getIsSameDate(date, osterMontag) ||
        getIsSameDate(date, tagDerArbeit) ||
        getIsSameDate(date, christiHimmelfahrt) ||
        getIsSameDate(date, pfingstMontag) ||
        getIsSameDate(date, fronleichnam) ||
        getIsSameDate(date, tagDerEinheit) ||
        getIsSameDate(date, weihnachtstag1) ||
        getIsSameDate(date, weihnachtstag2);
}

 //function draws full calendar
function drawFullCalender() {
    onClickCalendarHeader();
    drawCalenderCells();

    //inner function draws only calender cells and calender header
    function drawCalenderCells() {

        const firstDayOfMonth = new Date(globalDate.getFullYear(), globalDate.getMonth(), 1); // get the first day of the current month
        const lastDayOfMonth = new Date(globalDate.getFullYear(), globalDate.getMonth() + 1, 0); // get the last day of the current month
        const lastDayPrevMonth = new Date(globalDate.getFullYear(), globalDate.getMonth(), 0); // get the last day of the previous month
        let daysInMonth = lastDayOfMonth.getDate(); // get the number of days in the current month
        let daysInPrevMonth = lastDayPrevMonth.getDate(); // get the number of days in the previous month
        let firstDayOfWeek = firstDayOfMonth.getDay();  // get the day of the week of the first day of the current month
        let lastDayOfWeek = lastDayOfMonth.getDay(); // get the day of the week of the last day of the current month
        
        //change sunday number for first day from 0 to 7
        if (firstDayOfWeek == 0) {
            firstDayOfWeek = 7;
        }

        //change sunday number for last day from 0 to 7
        if (lastDayOfWeek == 0) {
            lastDayOfWeek = 7;
        }

        let currentMonthName = (monthNamesArray[globalDate.getMonth()]); //get name of current month from array
        monthYearElement.textContent = (currentMonthName + " " + globalDate.getFullYear()); //adding name of the month and year in the header of the calendar

        calenderBody.innerHTML = ""; // remove the month before drawing a new

        // drawing a cells for new month
        // first step: create gray cells with numbers of days of the previous month
        for (let i = firstDayOfWeek; i > 1; i--) {
            let day = daysInPrevMonth - i + 2;
            const emptyCell = createGrayCell(day, "grayday");
            calenderBody.appendChild(emptyCell);
        }
        // second step: create cells with numbers of days of the current month
        let cellWithNumber;
        for (let day = 1; day <= daysInMonth; day++) {
            cellWithNumber =createDayCell(day);
            calenderBody.appendChild(cellWithNumber);
        }    
        // thrid step: create gray cells with numbers of days of the next month
        let firstDayNextMonth = 0;
        for (let i = lastDayOfWeek; i < 7; i++) {
            firstDayNextMonth = firstDayNextMonth + 1;
            const emptyCell = createGrayCell(firstDayNextMonth, "grayday");
            calenderBody.appendChild(emptyCell);
        }
        
    }


    // inner function for create a day cell with a number
    function createDayCell(day) {
        // create a day cell ID
        const dayCell = document.createElement("div");
        // adding style for day cell
        if (getIsHoliday(new Date(globalDate.getFullYear(), globalDate.getMonth(), day))) {
            dayCell.classList.add("feiertag");
        } 
        else {
            dayCell.classList.add("day");
        }
        // show today or day selected by the user with style "today"
        if (day==globalDate.getDate() && isPrevNextButtonClick==false){
            dayCell.classList.add("today");
        }
        // adding number in cell
        dayCell.textContent = day;
        // display info when you click on the current day
        dayCell.addEventListener("click", function () {
            globalDate = new Date(globalDate.getFullYear(), globalDate.getMonth(), day);
            isPrevNextButtonClick = false;
            console.log ("globalDate: " + globalDate);
            drawHeader(), infoText(), weekInMonth(), feiertagYesNo(), getFeiertag(), drawCalenderCells(), drawAnimation();
            });
        // returning the created cell element
        return dayCell;
    }

    //inner function for create gray cells with numbers of previous and next month
    function createGrayCell(day) {
            // create a day cell ID
            const dayCell = document.createElement("div");
            // adding style from style.css
            dayCell.classList.add("grayday");
            // adding number in cell
            dayCell.textContent = day;
            // returning the created cell element
            return dayCell;
    }

    // buttons
    prevButton.addEventListener("click", function () {
        // when user click "<" button, we decrease the month of the current date by 1 and redraw the calendar cells
        globalDate.setMonth(globalDate.getMonth() - 1);
        isPrevNextButtonClick = true;
        console.log("Global Date prev button " + globalDate);
        weekInMonth(), getFeiertag(), drawCalenderCells();
    });

    nextButton.addEventListener("click", function () {
        // when user click ">" button, we increase the month of the current date by 1 and redraw the calendar cells
        globalDate.setMonth(globalDate.getMonth() + 1);
        isPrevNextButtonClick = true;
        console.log("Global Date next button " + globalDate);
        weekInMonth(), getFeiertag(), drawCalenderCells();
    });
}

//get correct text to describe the day
function infoText()

{
    //set array with names of month
    let currentMonthName = (monthNamesArray[globalDate.getMonth()]);
    //set array with names days of week
    let weekDayName = (weekDaysArray[globalDate.getDay()]);
    //adding text in HTML
    
    document.getElementById('textDate').textContent = globalDate.getDate();;
    document.getElementById('textMonth').textContent = currentMonthName;
    document.getElementById('textMonth2').textContent = currentMonthName;
    document.getElementById('textWeekday').textContent = weekDayName;
    document.getElementById('textWeekday2').textContent = weekDayName;
    document.getElementById('textMonth').textContent = currentMonthName;
    document.getElementById('textYear').textContent = globalDate.getFullYear();
    document.getElementById('historieDate').textContent = globalDate.getDate();
    document.getElementById('historieMonth').textContent = currentMonthName;
    fetchHtml(); 
}

//function for set number of day of week in the current month
function weekInMonth()
{
    const numberWeekdayName = ["erste", "zweite", "dritte", "vierte", "fünfte"];
    let index = Math.ceil(globalDate.getDate() / 7) - 1;
    numberWeekday.textContent = numberWeekdayName[index];
}

//function determines if the current day is a holiday
function feiertagYesNo()
{
    //change text in info if current day is a holiday
        if (getIsHoliday(globalDate)) {
            textHolidayYesNo.textContent = "";
            heuteIstName.textContent = ":";
        } else {
            textHolidayYesNo.textContent = "nicht";
            heuteIstName.textContent = ".";
        }
        //create an array with dates and names of all holidays 
        let feiertagNameArray = [
            {date: neuesYahr.getDate(), month: neuesYahr.getMonth(), name: "Neujahr."}, 
            {date: karfreitag.getDate(), month: karfreitag.getMonth(), name: "Karfreitag."}, 
            {date: osterMontag.getDate(), month: osterMontag.getMonth(), name: "Ostermontag."},
            {date: tagDerArbeit.getDate(), month: tagDerArbeit.getMonth(), name: "Tag der Arbeit."},
            {date: christiHimmelfahrt.getDate(), month: christiHimmelfahrt.getMonth(), name: "Christi Himmelfahrt."},
            {date: pfingstMontag.getDate(), month: pfingstMontag.getMonth(), name: "Pfingstmontag."},
            {date: fronleichnam.getDate(), month: fronleichnam.getMonth(), name: "Fronleichnam."},
            {date: tagDerEinheit.getDate(), month: tagDerEinheit.getMonth(), name: "Tag der Deutschen Einheit."},
            {date: weihnachtstag1.getDate(), month: weihnachtstag1.getMonth(), name: "1. Weihnachtsfeiertag."},
            {date: weihnachtstag2.getDate(), month: weihnachtstag2.getMonth(), name: "2. Weihnachtsfeiertag."},                            
        ];
        //function for search in the array for an element thet equals the current date
        function getNameByDate(date, month) {
            let feiertagName = feiertagNameArray.find(item => item.date === date && item.month === month);
            return feiertagName ? feiertagName.name : ''; //if such an element exists, we return its name. Otherwise we return nothing
        }
        //use the array search function for the current date
        numberToName.textContent = getNameByDate(globalDate.getDate(), globalDate.getMonth());

}

//function that counts dates of religious holidays
function getFeiertag(){

    const year = globalDate.getFullYear();
    //function calculate the date of Easter with Gauss's Easter algorithm
    function getEasterDate(year) {
        const a = year % 19, b = year % 4, c = year % 7,
        d = (19 * a + 24) % 30, e = (2 * b + 4 * c + 6 * d + 5) % 7;
        const day = 22 + d + e;
        return new Date(year, 2, day + (d === 29 || (d === 28 && e === 6) ? -7 : 0));
        }
        //calculating the date of Easter for the current year
        easterDate = getEasterDate(year);
        console.log(`--------------Feiertagen in ${year}---------`);
        console.log(`Easter in ${year} ${easterDate.toDateString()}`);

        //calculatin the date of Karfreitag for the current yaar
        karfreitag = new Date (easterDate);
        karfreitag.setDate(karfreitag.getDate() - 2);
        console.log(`Karfreitag in ${year} ${karfreitag.toDateString()}`);

        //calculation the date of Ostermontag for the current year
        osterMontag = new Date (easterDate);
        osterMontag.setDate(osterMontag.getDate() + 1);
        console.log(`Ostermontag in ${year} ${osterMontag.toDateString()}`);

        //calculation the date of Christi Himmelfahrt for the current year
        christiHimmelfahrt = new Date (easterDate);
        christiHimmelfahrt.setDate(christiHimmelfahrt.getDate() + 39);
        console.log(`Christi Himmelfahrt in ${year} ${christiHimmelfahrt.toDateString()}`);

        //calculation the date of Pfingsmontag for  the current year
        pfingstMontag = new Date (easterDate);
        pfingstMontag.setDate(pfingstMontag.getDate() + 50);
        console.log(`Pfingstmontag in ${year} ${pfingstMontag.toDateString()}`);

        //calculation the date of Fronleichnam for the current year
        fronleichnam = new Date (pfingstMontag);
        fronleichnam.setDate(fronleichnam.getDate() + 10);
        console.log(`Fronleichnam in ${year} ${fronleichnam.toDateString()}`);

        //set the dates of the fixed holidays
        neuesYahr = new Date (globalDate.getFullYear(), 0, 1);
        console.log(`Neues Yahr in ${year} ${neuesYahr.toDateString()}`);
        tagDerArbeit = new Date (globalDate.getFullYear(), 4, 1);
        console.log(`Tag der Arbeit ${year} ${tagDerArbeit.toDateString()}`);
        tagDerEinheit = new Date (globalDate.getFullYear(), 9, 3);
        console.log(`Tag der Einheit in ${year} ${tagDerEinheit.toDateString()}`);
        weihnachtstag1 = new Date (globalDate.getFullYear(), 11, 25);
        console.log(`Weinachtag 1 in ${year} ${weihnachtstag1.toDateString()}`);
        weihnachtstag2 = new Date (globalDate.getFullYear(), 11, 26);
        console.log(`Weinachtag 2 in ${year} ${weihnachtstag2.toDateString()}`);
}


//function for getting info from Wikipedia via Wikimedia Rest API 
function fetchHtml() {
    let url = "https://de.wikipedia.org/api/rest_v1/page/html/" + globalDate.getDate() +"._" + (monthNamesArray[globalDate.getMonth()]);
    console.log("info from: ", url);
    //message that displayed when information is loaded
    document.getElementById("loadingMessage").textContent="Loading info from wikipedia.org...";
    //getting HTML via API as text
    fetch(url)
    .then((response) => {
        return response.text();
    })
    .then((html) => {
    const wikiDataDiv = document.getElementById("wikiData");
    let parser = new DOMParser();
    let doc = parser.parseFromString(html, 'text/html');
    //remove images from Wiki HTML 
    let images = doc.querySelectorAll('figure');
    images.forEach(figure => figure.parentNode.removeChild(figure));
    let logo = doc.querySelectorAll('img');
    logo.forEach(img => img.parentNode.removeChild(img));
    //remove links from Wiki HTML
    let links = doc.querySelectorAll('link');
    links.forEach(link => link.parentNode.removeChild(link));
    //transform modifed HTML to string
    let modifiedHtml = new XMLSerializer().serializeToString(doc);
    //remove loading message
    document.getElementById("loadingMessage").textContent="";
    //inpliment resulting html string into page
    wikiDataDiv.innerHTML = modifiedHtml;
    })
    //show an error in console if loading failed
    .catch(function(error){
        console.log('Loading error.', error);

    });
}

