<<<<<<< HEAD

// Calendar code 

document.addEventListener("DOMContentLoaded", function () {
    const calendarContainer = document.getElementById("calendar");
    const monthYearDisplay = document.getElementById("monthYear");
    const prevButton = document.getElementById("prevMonth");
    const nextButton = document.getElementById("nextMonth");
    const reserveButton = document.getElementById("reserveButton");

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let currentDate = new Date();
    let selectedDays = [];

    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        monthYearDisplay.textContent = currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        calendarContainer.innerHTML = "";

        // Create headers
        const daysRow = document.createElement("div");
        daysRow.classList.add("calendar-row");
        daysOfWeek.forEach(day => {
            const dayHeader = createElement("div", "calendar-day day-header", day);
            daysRow.appendChild(dayHeader);
        });
        calendarContainer.appendChild(daysRow);

        // Create calendar grid
        const daysGrid = document.createElement("div");
        daysGrid.classList.add("calendar-grid");

        for (let i = 0; i < firstDay; i++) {
            daysGrid.appendChild(createElement("div", "calendar-day empty", ""));
        }

        for (let day = 1; day <= daysInMonth; day++) {
            let dayElement = createElement("div", "calendar-day", day);
            dayElement.addEventListener("click", () => handleDayClick(day, dayElement));
            daysGrid.appendChild(dayElement);
        }

        calendarContainer.appendChild(daysGrid);
    }

    function createElement(tag, className, text) {
        const element = document.createElement(tag);
        element.className = className;
        element.textContent = text;
        return element;
    }

    function handleDayClick(day, element) {
        if (selectedDays.length === 3) {
            selectedDays = [];
            clearSelection();
        }

        if (selectedDays.length === 0 || isConsecutive(day)) {
            selectedDays.push(day);
            element.classList.add("selected");
        } else {
            selectedDays = [day];
            clearSelection();
            element.classList.add("selected");
        }
    }

    function isConsecutive(day) {
        return selectedDays.length === 0 || day === selectedDays[selectedDays.length - 1] + 1;
    }

    function clearSelection() {
        document.querySelectorAll(".selected").forEach(el => el.classList.remove("selected"));
    }

    prevButton.addEventListener("click", () => changeMonth(-1));
    nextButton.addEventListener("click", () => changeMonth(1));

    function changeMonth(offset) {
        currentDate.setMonth(currentDate.getMonth() + offset);
        selectedDays = [];
        renderCalendar();
    }


    renderCalendar();
});
=======
// Java Script Page
>>>>>>> bab77f1bdc8958f1184ffe63a7f5cc439f59cfa2
