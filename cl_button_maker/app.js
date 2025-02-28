
// Calendar code 

document.addEventListener("DOMContentLoaded", function () {
    const calendarContainer = document.getElementById("calendar");
    const monthYearDisplay = document.getElementById("monthYear");
    const prevButton = document.getElementById("prevMonth");
    const nextButton = document.getElementById("nextMonth");
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let currentDate = new Date();

    // Function to render the calendar
    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        monthYearDisplay.textContent = currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

        const firstDay = new Date(year, month, 1).getDay(); // Day of the week the month starts on
        const daysInMonth = new Date(year, month + 1, 0).getDate(); // Number of days in the month

        calendarContainer.innerHTML = ""; // Clear previous calendar

        // Create and append day headers (Sun - Sat)
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

        // Add empty cells for days before the first of the month
        for (let i = 0; i < firstDay; i++) {
            daysGrid.appendChild(createElement("div", "calendar-day empty", ""));
        }

        // Add actual day cells
        for (let day = 1; day <= daysInMonth; day++) {
            daysGrid.appendChild(createElement("div", "calendar-day", day));
        }

        calendarContainer.appendChild(daysGrid);
    }

    // Helper function to create an element with a class and text
    function createElement(tag, className, text) {
        const element = document.createElement(tag);
        element.className = className;
        element.textContent = text;
        return element;
    }

    // Event listeners for month navigation
    prevButton.addEventListener("click", () => changeMonth(-1));
    nextButton.addEventListener("click", () => changeMonth(1));

    function changeMonth(offset) {
        currentDate.setMonth(currentDate.getMonth() + offset);
        renderCalendar();
    }

    renderCalendar(); // Initial render
});
