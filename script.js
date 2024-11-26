const main = document.querySelector("main");
const dailyButton = document.querySelector(".dashboard__timeframe-daily");
const weeklyButton = document.querySelector(".dashboard__timeframe-weekly");
const monthlyButton = document.querySelector(".dashboard__timeframe-monthly");

fetch("./data.json").then((response) => {
    if (!response.ok) return console.log(`HTTP error! status: ${response.status}`);
    return response.json();
}).then((json) => { organiseItems(json) })

function organiseItems(items) {
    items.forEach((object) => createElement(object));
}

function createElement(data) {
    const {
        title,
        timeframes: {
            daily: { current: dailyCurrent, previous: dailyPrevious },
            weekly: { current: weeklyCurrent, previous: weeklyPrevious },
            monthly: { current: monthlyCurrent, previous: monthlyPrevious }
        }
    } = data;

    const section = document.createElement("section");
    section.className = `dashboard__${modifyTitle(title)}`;
    const div = document.createElement("div");
    div.className = "dashboard__activity-wrapper";
    const titleContainer = document.createElement("div");
    titleContainer.className = "dashboard__activity-titleContainer";
    const dailyDataContainer = document.createElement("div");
    dailyDataContainer.className = "dashboard__activity-daily";
    dailyDataContainer.classList.add("hidden");
    const weeklyDataContainer = document.createElement("div");
    weeklyDataContainer.className = "dashboard__activity-weekly";
    const monthlyDataContainer = document.createElement("div");
    monthlyDataContainer.className = "dashboard__activity-monthly";
    monthlyDataContainer.classList.add("hidden");


    const titleElement = document.createElement("h2");
    titleElement.className = "dashboard__activity-title";
    titleElement.textContent = title;
    titleContainer.appendChild(titleElement);

    const imgElement = document.createElement("img");
    imgElement.src = "images/icon-ellipsis.svg"
    imgElement.alt = "Icon-Ellipsis";
    titleContainer.appendChild(imgElement);

    div.appendChild(titleContainer);

    const dailyCurrentElement = document.createElement("p");
    dailyCurrentElement.className = "dashboard__activity-dailyCurrent";
    dailyCurrentElement.textContent = `${dailyCurrent}hrs`;
    dailyDataContainer.appendChild(dailyCurrentElement);

    const dailyPreviousElement = document.createElement("p");
    dailyPreviousElement.className = "dashboard__activity-dailyPrevious";
    dailyPreviousElement.textContent = `Yesterday - ${dailyPrevious}hrs`;
    dailyDataContainer.appendChild(dailyPreviousElement);

    div.appendChild(dailyDataContainer);

    const weeklyCurrentElement = document.createElement("p");
    weeklyCurrentElement.className = "dashboard__activity-weeklyCurrent";
    weeklyCurrentElement.textContent = `${weeklyCurrent}hrs`;
    weeklyDataContainer.appendChild(weeklyCurrentElement);

    const weeklyPreviousElement = document.createElement("p");
    weeklyPreviousElement.className = "dashboard__activity-weeklyPrevious";
    weeklyPreviousElement.textContent = `Last Week - ${weeklyPrevious}hrs`;
    weeklyDataContainer.appendChild(weeklyPreviousElement);

    div.appendChild(weeklyDataContainer);

    const monthlyCurrentElement = document.createElement("p");
    monthlyCurrentElement.className = "dashboard__activity-monthlyCurrent";
    monthlyCurrentElement.textContent = `${monthlyCurrent}hrs`;
    monthlyDataContainer.appendChild(monthlyCurrentElement);

    const monthlyPreviousElement = document.createElement("p");
    monthlyPreviousElement.className = "dashboard__activity-monthlyPrevious";
    monthlyPreviousElement.textContent = `Last Month - ${monthlyPrevious}hrs`;
    monthlyDataContainer.appendChild(monthlyPreviousElement);

    div.appendChild(monthlyDataContainer);

    section.appendChild(div);
    main.appendChild(section);


    dailyButton.addEventListener("click", () => {
        if (dailyDataContainer.classList.contains("hidden")) {
            dailyDataContainer.classList.remove("hidden");
            weeklyDataContainer.classList.add("hidden");
            monthlyDataContainer.classList.add("hidden");
        }
    })

    weeklyButton.addEventListener("click", () => {
        if (weeklyDataContainer.classList.contains("hidden")) {
            weeklyDataContainer.classList.remove("hidden");
            dailyDataContainer.classList.add("hidden");
            monthlyDataContainer.classList.add("hidden");
        }
    })

    monthlyButton.addEventListener("click", () => {
        if (monthlyDataContainer.classList.contains("hidden")) {
            monthlyDataContainer.classList.remove("hidden");
            weeklyDataContainer.classList.add("hidden");
            dailyDataContainer.classList.add("hidden");
        }
    })
}

function modifyTitle(text) {
    return text.replace(/\s+/g, "-").toLowerCase();
}






