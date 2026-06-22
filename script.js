// =======================
// Таймер до свадьбы
// =======================

const weddingDate = new Date("2026-08-29T15:00:00");

function updateTimer() {

    const now = new Date();
    const diff = weddingDate - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (diff % (1000 * 60 * 60)) /
        (1000 * 60)
    );

    const seconds = Math.floor(
        (diff % (1000 * 60)) /
        1000
    );

    document.getElementById("timer").innerHTML =
        `${days} дней<br>${hours} часов ${minutes} минут ${seconds} секунд`;
}

updateTimer();
setInterval(updateTimer, 1000);


// ==========================================
// ВСТАВЬ СЮДА ССЫЛКУ ИЗ GOOGLE APPS SCRIPT
// ==========================================

const WEB_APP_URL =
    "https://script.google.com/macros/s/AKfycbwZHA4mOfav26aMgU9ePh_5m4bx3CZwlh-nUB2e9LUQW6xLSMKob7Rlmx_i5abPRu7Cuw/exec";


// =======================
// Отправка формы
// =======================

document
    .getElementById("rsvp-form")
    .addEventListener("submit", async function (e) {

        e.preventDefault();

        const guestName =
            document.querySelector(
                'input[name="name"]'
            ).value.trim();

        const drinks = [];

        document
            .querySelectorAll(
                'input[type="checkbox"]:checked'
            )
            .forEach((checkbox) => {
                drinks.push(checkbox.value);
            });

        try {

            const response = await fetch(
                WEB_APP_URL,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: guestName,
                        drinks: drinks,
                        userAgent: navigator.userAgent
                    })
                }
            );

            if (!response.ok) {
                throw new Error("Ошибка отправки");
            }

            document.getElementById("message").innerHTML =
                "Спасибо! ❤️ Ваш ответ успешно отправлен.";

            this.reset();

        } catch (error) {

            document.getElementById("message").innerHTML =
                "Не удалось отправить ответ. Попробуйте позже.";

            console.error(error);
        }

    });