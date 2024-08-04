

export function shipping_estimation_get_date_from_now() {
    const weekday_names = [
        "Luni",
        "Marti",
        "Miercuri",
        "Joi",
        "Vineri",
    ];

    const month_names = [
        "Ianuarie",
        "Februarie",
        "Martie",
        "Aprilie",
        "Mai",
        "Iunie",
        "Iulie",
        "August",
        "Septembrie",
        "Octombrie",
        "Noiembrie",
        "Decembrie",
    ];

    const now = new Date();
    let days_to_deliver = 1;

    if (now.getHours() > 12 && now.getDay() < 6)
        now.setDate(now.getDate() + 1);

    if (now.getDay() === 5) {
        days_to_deliver += 2;
    }
    else if (now.getDay() === 6) {
        days_to_deliver += 2;
    }
    else if (now.getDay() === 7) {
        days_to_deliver += 1;
    }

    now.setDate(now.getDate() + days_to_deliver);
    return `Poate ajunge la tine ${weekday_names[now.getDay() - 1]}, ${now.getDate()} ${month_names[now.getMonth()]}`;
}

