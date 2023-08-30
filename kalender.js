//set global date for all functions
let globalDate = new Date();
//for religious holidays we get the date from funktion "getFeiertag()"
let easterDate;
let karfreitag;
let christiHimmelfahrt;
let pfingstMontag;
let fronleichnam;
//holidays with fixed date
let neuesYahr = new Date (globalDate.getFullYear(), 0, 1);
let tagDerArbeit = new Date (globalDate.getFullYear(), 4, 1);
let tagDerEinheit = new Date (globalDate.getFullYear(), 9, 3);
let weihnachtstag1 = new Date (globalDate.getFullYear(), 11, 25);
let weihnachtstag2 = new Date (globalDate.getFullYear(), 11, 26);
//run all functions on load
window.onload = getFeiertag(), kopfJS(), infotextJS(), weekInMonthJS(), feiertagYesNoJS(), kalendarblattJS();
console.log("globalDate:" + globalDate);

// show today when click on header
let headButton = document.getElementById("headButton");
    headButton.addEventListener("click", function () {
        globalDate = new Date();
        kopfJS(), infotextJS(), weekInMonthJS(), feiertagYesNoJS(), kalendarblattJS();

        document.getElementById('historie').classList.add("wikiDataAnimation");
        document.getElementById('info').classList.add("wikiDataAnimation");
        setTimeout(
            function(){
                document.getElementById('historie').classList.remove("wikiDataAnimation");
                document.getElementById('info').classList.remove("wikiDataAnimation");
            }, 1000
        );
    });

// function draws header
function kopfJS()
{
    let today = globalDate;
    let dateD = today.getDate();
    let monthD = today.getMonth();
    let year = today.getFullYear();
    //create array with names of month
    const monthNames = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
    let monthText = (monthNames[monthD]);
    // adding text with date ant month in HTML
    document.getElementById('dateD').textContent = dateD;
    document.getElementById('monthD').textContent = monthText;
    document.getElementById('year').textContent = year;
    console.log ("kopfDate " + globalDate);
}

 // calendar function
function kalendarblattJS() {
    let today = globalDate;
    // get ID
    let kalenderBody = document.getElementById("kalender-body");
    let monthYearElement = document.getElementById("month-year");
    let prevBtn = document.getElementById("prev-btn");
    let nextBtn = document.getElementById("next-btn");

    if(navigator.userAgent.indexOf("Firefox") !== -1){
        monthYearElement.addEventListener("click", function () {

            let inputDate = document.createElement("input");
            let blurTimeout;
            inputDate.type = "text";
            monthYearElement.replaceWith(inputDate);
    
            inputDate.focus();

            inputDate.maxlength="10";
    
    
            inputDate.addEventListener("blur", function(){
               blurTimeout = setTimeout(userInput, 10);
            });
    
            
            inputDate.placeholder ="YYYY-MM-DD";
    
            inputDate.addEventListener("keydown", function(event){
                if(event.key=="Enter"){
                    userInput();
                }});
    
    
            function userInput(){
                let userDate = inputDate.value;
        
                console.log ("User input ", userDate);
        
                if (userDate != null) {
                    let tempDate = new Date(userDate);
        
                    if (tempDate.getTime()-tempDate.getTime()==0){
                    globalDate = new Date (userDate);
                    inputDate.replaceWith(monthYearElement);
                    getFeiertag(), kopfJS(), infotextJS(), weekInMonthJS(), feiertagYesNoJS(), kalendarblattJS();
                    globalDate = new Date (userDate);
                    }
        
                    else {
                        alert("Ungültiges Datum. Bitte geben Sie das Datum im Format YYYY-MM-DD ein.");
                        inputDate.replaceWith(monthYearElement);
                    }
                }
                }
        });
    }

    else {
        monthYearElement.addEventListener("click", function () {

            let inputDate = document.createElement("input");
            let blurTimeout;
            inputDate.type = "date";
            monthYearElement.replaceWith(inputDate);
    
            inputDate.focus();
    
    
            inputDate.addEventListener("blur", function(){
               blurTimeout = setTimeout(userInput, 10);
            });
    
            inputDate.max="9999-12-31"
    
            inputDate.addEventListener("keydown", function(event){
                if(event.key=="Enter"){
                    inputDate.replaceWith(monthYearElement);
                }});
    
    
            function userInput(){
                let userDate = inputDate.value;
        
                console.log ("User input ", userDate);
        
                if (userDate != null) {
                    let tempDate = new Date(userDate);
        
                    if (tempDate.getTime()-tempDate.getTime()==0){
                    globalDate = new Date (userDate);
                    inputDate.replaceWith(monthYearElement);
                    getFeiertag(), kopfJS(), infotextJS(), weekInMonthJS(), feiertagYesNoJS(), kalendarblattJS();
                    globalDate = new Date (userDate);
                    }
        
                    else {
                        alert("Ungültiges Datum.");
                        inputDate.replaceWith(monthYearElement);
                    }
                }
                }
        });
    }

    

    //function draws calender
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

        //change sunday number from 0 to 7
        if (firstDayOfWeek == 0) {
            firstDayOfWeek = 7;
        }

        console.log("first weekday month :" + firstDayOfWeek);

        // get the day of the week of the last day of the current month
        let lastDayOfWeek = lastDayOfMonth.getDay();

        //change sunday number from 0 to 7
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


    // function for create a day cell with a number
    function createDayCell(day) {
        // create a day cell ID
        const dayCell = document.createElement("div");
        let currentMonth = today.getMonth();
        let currentYear = today.getFullYear();

        // adding style

            if (day == neuesYahr.getDate() && today.getMonth() == neuesYahr.getMonth() || day == karfreitag.getDate() && today.getMonth() == karfreitag.getMonth()|| day==osterMontag.getDate() && today.getMonth() == osterMontag.getMonth()|| 
            day==tagDerArbeit.getDate() && today.getMonth() == tagDerArbeit.getMonth() || day==christiHimmelfahrt.getDate() && today.getMonth() == christiHimmelfahrt.getMonth()|| day==pfingstMontag.getDate() && today.getMonth() == pfingstMontag.getMonth()||
            day==fronleichnam.getDate() && today.getMonth() == fronleichnam.getMonth() || day==tagDerEinheit.getDate() && today.getMonth() == tagDerEinheit.getMonth()||day==weihnachtstag1.getDate() && today.getMonth() == weihnachtstag1.getMonth()||day==weihnachtstag2.getDate() && today.getMonth() == weihnachtstag2.getMonth()){
            dayCell.classList.add("feiertag");
            }
            else {
            dayCell.classList.add("day");
            }

        // show today with style "today"
        if (day==globalDate.getDate() && currentMonth==globalDate.getMonth() && currentYear==globalDate.getFullYear() ){
            dayCell.classList.add("today");

        }
        // set text in cell
        dayCell.textContent = day;

        console.log("!today: " + globalDate.getMonth() + " " + globalDate.getFullYear() )

        // display info when you click on the current day
        dayCell.addEventListener("click", function () {
            globalDate = new Date(today.getFullYear(), today.getMonth(), day);
            console.log ("globalDate: " + globalDate);
            kopfJS(), infotextJS(), weekInMonthJS(), feiertagYesNoJS(); renderCalendar();

            document.getElementById('historie').classList.add("wikiDataAnimation");
            document.getElementById('info').classList.add("wikiDataAnimation");
            setTimeout(
                function(){
                    document.getElementById('historie').classList.remove("wikiDataAnimation");
                    document.getElementById('info').classList.remove("wikiDataAnimation");
                }, 500
            );
            
        }
        
        );


        // returning the created cell element
        return dayCell;
    }

        // create a day cell with a gray number previous and next month
    function createGrayCell(day) {
            // create a day cell ID
            const dayCell = document.createElement("div");
            // adding style
            dayCell.classList.add("grayday");
            // text in cell
            dayCell.textContent = day;
            // returning the created cell element
            return dayCell;
    }

    // create calendar on page load
    renderCalendar();

    // buttons
    prevBtn.addEventListener("click", function () {
        // when you click "Zurück" button, we decrease the month of the current date by 1 and redraw the calendar
        today.setMonth(today.getMonth() - 1);
        globalDate.setFullYear(today.getFullYear());

        weekInMonthJS(), getFeiertag(), renderCalendar();
        console.log ("globalDate after click on previous month ", globalDate);
        console.log ("today after click on previous month ", today);

        if(globalDate==today){
        document.getElementById('historie').classList.add("wikiDataAnimation");
        document.getElementById('info').classList.add("wikiDataAnimation");
        setTimeout(
            function(){
                document.getElementById('historie').classList.remove("wikiDataAnimation");
                document.getElementById('info').classList.remove("wikiDataAnimation");
            }, 500
        );
        infotextJS(),feiertagYesNoJS(),kopfJS();
        }
    });

    nextBtn.addEventListener("click", function () {
        // when you click "Weiter" button, increase the month of the current date by 1 and redraw the calendar
        today.setMonth(today.getMonth() + 1);
        globalDate.setFullYear(today.getFullYear());

        weekInMonthJS(), getFeiertag(), renderCalendar();
        console.log ("globalDate after click on next month ", globalDate);
        console.log ("today after click on next month ", today);
        if(globalDate==today){
        document.getElementById('historie').classList.add("wikiDataAnimation");
        document.getElementById('info').classList.add("wikiDataAnimation");
        setTimeout(
            function(){
                document.getElementById('historie').classList.remove("wikiDataAnimation");
                document.getElementById('info').classList.remove("wikiDataAnimation");
            }, 500
        );
        kopfJS(), feiertagYesNoJS(), infotextJS();
        }

    });
}

//get correct text to describe the day
function infotextJS()

{
    let today = globalDate;
    let dateD = today.getDate();
    let weekdayD = today.getDay();
    let monthD = today.getMonth();
    let year = today.getFullYear();
    //set array with names of month
    const monthNames = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
    let monthText = (monthNames[monthD]);
    //set array with names days of week
    const weekNames = [ "Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag","Samstag"];
    let weekText = (weekNames[weekdayD]);
    //adding text in HTML
    
    document.getElementById('textDate').textContent = dateD;
    document.getElementById('textMonth').textContent = monthText;
    document.getElementById('textMonth2').textContent = monthText;
    document.getElementById('textWeekday').textContent = weekText;
    document.getElementById('textWeekday2').textContent = weekText;
    document.getElementById('textMonth').textContent = monthText;
    document.getElementById('textYear').textContent = year;
    document.getElementById('historieDate').textContent = dateD;
    document.getElementById('historieMonth').textContent = monthText;
    let urlWiki = "https://de.wikipedia.org/api/rest_v1/page/html/" + dateD +"._" + monthText;
    fetchHtml(urlWiki); 
}

//function for set number of day of week in the current month
function weekInMonthJS()

{
    const today = globalDate;
    const weekdayD = today.getDay();
    const currentDay = today.getDate();
    const firstWeekdayOfMonth = new Date(today);
    firstWeekdayOfMonth.setDate(1);
    //search dates from beginning of month to determine first cuttent day of week in the month
    while (firstWeekdayOfMonth.getDay() !== weekdayD) {
        firstWeekdayOfMonth.setDate(firstWeekdayOfMonth.getDate()+1);
        }
        //count number of the current day of week in the month, if current day is Sunday
        if (weekdayD == 0){
            const numberWeekday = Math.ceil((currentDay - firstWeekdayOfMonth.getDate() + 7)/7);
            const numberWeekdayName = [ "erste", "zweite", "dritte", "vierte", "fünfte" ];
            let textNumberWeekday = (numberWeekdayName[numberWeekday - 1]);
            document.getElementById('textNumberWeekday').textContent = textNumberWeekday;
            }
        //count number of the current day of week in the month, if current day is any day expcept Sunday
        else{
            const numberWeekday = Math.ceil((currentDay - firstWeekdayOfMonth.getDate() + weekdayD)/7);
            const numberWeekdayName = [ "erste", "zweite", "dritte", "vierte", "fünfte" ];
            let textNumberWeekday = (numberWeekdayName[numberWeekday - 1]);
            document.getElementById('textNumberWeekday').textContent = textNumberWeekday;
        }



}
//function determines if the current day is a holiday
function feiertagYesNoJS()
{
    let today = globalDate;
    let dateD = today.getDate();
    let monthD = today.getMonth();
    let textFeiertagYesNo;
    //change text in info if current day is a holiday
        if (dateD == neuesYahr.getDate() && monthD == neuesYahr.getMonth() || dateD == karfreitag.getDate() && monthD == karfreitag.getMonth() || dateD == osterMontag.getDate() && monthD == osterMontag.getMonth() || dateD == tagDerArbeit.getDate() && monthD == tagDerArbeit.getMonth() || dateD == christiHimmelfahrt.getDate() && monthD == christiHimmelfahrt.getMonth() 
            || dateD == pfingstMontag.getDate() && monthD == pfingstMontag.getMonth() || dateD == fronleichnam.getDate() && monthD == fronleichnam.getMonth() || dateD == tagDerEinheit.getDate() && monthD == tagDerEinheit.getMonth() || dateD == weihnachtstag1.getDate() && monthD == weihnachtstag1.getMonth() || dateD == weihnachtstag2.getDate() && monthD == weihnachtstag2.getMonth()) {
            textFeiertagYesNo = "";
            heuteIstName = ":";
        }

        else 
        {
            textFeiertagYesNo = "nicht";
            heuteIstName = ".";
        }
        //create an array with dates and names of all holidays 
        let feiertagNameArray = [{date: neuesYahr.getDate(), month: neuesYahr.getMonth(), name: "Neujahr."}, 
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
                let numberToName = getNameByDate(today.getDate(), today.getMonth());
                console.log(numberToName);
            //adding information about holiday in text
        document.getElementById('holidayYesNo').textContent = textFeiertagYesNo;
        document.getElementById('heuteIstName').textContent = heuteIstName;
        document.getElementById('feiertagName').textContent = numberToName;

}

//function that counts dates of religious holidays
function getFeiertag(){

    const year = globalDate.getFullYear();
    //function calculate the date of Easter with Gauss's Easter algorithm
    function calculateEasterDate(year) {
        const a = year % 19, b = year % 4, c = year % 7,
        d = (19 * a + 24) % 30, e = (2 * b + 4 * c + 6 * d + 5) % 7;
        const day = 22 + d + e;
        return new Date(year, 2, day + (d === 29 || (d === 28 && e === 6) ? -7 : 0));
        }
        //calculating the date of Easter for the current year
        easterDate = calculateEasterDate(year);
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

        console.log(`Neues Yahr in ${year} ${neuesYahr.toDateString()}`);

        console.log(`Tag der Arbeit ${year} ${tagDerArbeit.toDateString()}`);

        console.log(`Tag der Einheit in ${year} ${tagDerEinheit.toDateString()}`);

        console.log(`Weinachtag 1 in ${year} ${weihnachtstag1.toDateString()}`);

        console.log(`Weinachtag 2 in ${year} ${weihnachtstag2.toDateString()}`);
}


//function for getting info from Wikipedia via Wikimedia Rest API 
function fetchHtml(url) {
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

    //remove from Wiki HTML images 
    let images = doc.querySelectorAll('figure');
    images.forEach(figure => figure.parentNode.removeChild(figure));

    let logo = doc.querySelectorAll('img');
    logo.forEach(img => img.parentNode.removeChild(img));

    //remove from Wiki HTML links
    let links = doc.querySelectorAll('link');
    links.forEach(link => link.parentNode.removeChild(link));

    //transform modifed HTML to string
    let modifiedHtml = new XMLSerializer().serializeToString(doc);

    //remove loading message
    document.getElementById("loadingMessage").textContent="";

    //inpliment resulting html string into our page
    wikiDataDiv.innerHTML = modifiedHtml;
    })

    //show an error in console if loading failed
    .catch(function(error){
        console.log('Loading error.', error);

    });
}

