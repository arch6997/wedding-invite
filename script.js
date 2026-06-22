// =======================
// Таймер до свадьбы
// =======================

const weddingDate = new Date("2026-08-29T15:00:00");

function updateTimer() {
    const now = new Date();
    const diff = weddingDate - now;

    if (diff <= 0) {
        document.getElementById("timer").innerHTML = "Свадьба состоялась! 🎉";
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById("timer").innerHTML =
        `${days} дней<br>${hours} часов ${minutes} минут ${seconds} секунд`;
}

updateTimer();
setInterval(updateTimer, 1000);


// =======================
// Отправка формы RSVP (через скрытый iframe, без fetch)
// =======================

document.getElementById("rsvp-form").addEventListener("submit", function(e) {
    
    // Получаем ФИО
    var guestName = document.getElementById("visibleName").value.trim();
    
    // Собираем выбранные напитки
    var drinks = [];
    document.querySelectorAll('input[type="checkbox"]:checked').forEach(function(cb) {
        drinks.push(cb.value);
    });
    
    // Проверка: имя не пустое
    if (guestName.length < 2) {
        document.getElementById("message").innerHTML = "Пожалуйста, введите ФИО";
        document.getElementById("message").style.color = "#C75B5B";
        e.preventDefault();
        return;
    }
    
    // Заполняем скрытые поля — они уйдут на сервер
    document.getElementById("hiddenName").value = guestName;
    document.getElementById("hiddenDrinks").value = drinks.join(", ");
    
    // Показываем сообщение об успехе
    document.getElementById("message").innerHTML = "Спасибо! ❤️ Ваш ответ успешно отправлен.";
    document.getElementById("message").style.color = "#B8A89A";
    
    // Очищаем форму через 2 секунды
    setTimeout(function() {
        document.getElementById("rsvp-form").reset();
        document.getElementById("message").innerHTML = "";
    }, 2000);
    
    // Форма отправится сама в скрытый iframe
    // e.preventDefault() НЕ вызываем — отправка должна произойти!
});
