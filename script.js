
// =====================================
// 1. RECIPE FILTERING
// =====================================

const filterButtons = document.querySelectorAll(".filter-btn");
const recipeCards = document.querySelectorAll(".dish-card");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {

        const selectedRegion = button.dataset.filter;

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        recipeCards.forEach(card => {

            if (
                selectedRegion === "all" ||
                card.dataset.region === selectedRegion
            ) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }

        });
    });
});


// =====================================
// 2. FAVORITES USING LOCAL STORAGE
// =====================================

const favoriteButtons = document.querySelectorAll(".favorite-btn");

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function updateFavorites() {

    favoriteButtons.forEach(button => {

        const recipeId = button.dataset.recipeId;

        if (favorites.includes(recipeId)) {
            button.classList.add("saved");
            button.textContent = "❤️ Saved";
        } else {
            button.classList.remove("saved");
            button.textContent = "♡ Favorite";
        }

    });
}

favoriteButtons.forEach(button => {

    button.addEventListener("click", () => {

        const recipeId = button.dataset.recipeId;

        if (favorites.includes(recipeId)) {

            favorites = favorites.filter(id => id !== recipeId);

        } else {

            favorites.push(recipeId);

        }

        localStorage.setItem("favorites", JSON.stringify(favorites));

        updateFavorites();

    });

});

updateFavorites();

// =====================================
// 3. INGREDIENT SCALING
// =====================================

const servingsInput = document.querySelector("#jollof-servings");

if (servingsInput) {

    servingsInput.addEventListener("input", () => {

        const servings = Number(servingsInput.value);

        if (servings < 1 || servings > 12) {
            return;
        }

        const ingredients = document.querySelectorAll(
            "#jollof-ingredients span"
        );

        ingredients.forEach(ingredient => {

            const baseQuantity = Number(ingredient.dataset.base);
            const unit = ingredient.dataset.unit;

            const newQuantity = baseQuantity * servings / 2;

            ingredient.textContent =
                `${Number(newQuantity.toFixed(2))} ${unit}`;

        });

    });

}
// DARK AND LIGHT MODE TOGGLE
const themeButton = document.querySelector("#theme-toggle");

if (themeButton) {
    themeButton.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            themeButton.textContent = "☀️ Light Mode";
        } else {
            themeButton.textContent = "🌙 Dark Mode";
        }
    });
}

// CONTACT FORM VALIDATION
const contactForm = document.querySelector("#contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.querySelector("#name").value.trim();
        const email = document.querySelector("#email").value.trim();
        const message = document.querySelector("#message").value.trim();

        if (name === "" || email === "" || message === "") {
            alert("Please fill in all required fields.");
            return;
        }

        if (message.length <= 20) {
            alert("Your message must contain more than 20 characters.");
            return;
        }

        const thankYouMessage = document.querySelector("#thank-you-message");

        thankYouMessage.textContent =
            `Thank you, ${name}! Your message has been received.`;

        contactForm.style.display = "none";
    });
}
