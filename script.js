// Liste des héros avec leurs critères et leurs images au format WebP
const heroes = [
    { name: "Aldous", criteria: [3, 4, 5, 5, 4, 3, 4], image: "assets/images/aldous.webp" },
    { name: "Layla", criteria: [4, 3, 4, 5, 2, 4, 3], image: "assets/images/layla.webp" },
    { name: "Zilong", criteria: [5, 4, 4, 5, 3, 3, 2], image: "assets/images/zilong.webp" },
    { name: "Lancelot", criteria: [5, 5, 4, 5, 3, 2, 4], image: "assets/images/lancelot.webp" },
    { name: "Miya", criteria: [4, 4, 3, 4, 4, 4, 5], image: "assets/images/miya.webp" },
    { name: "Gusion", criteria: [5, 4, 5, 5, 3, 3, 4], image: "assets/images/gusion.webp" },
    // Ajoute ici tous les autres héros avec leurs critères et leurs images au format WebP
];

// Remplir les sélecteurs avec les héros
const heroSelects = document.querySelectorAll("select[id^='hero']");
heroSelects.forEach(select => {
    heroes.forEach(hero => {
        const option = document.createElement("option");
        option.value = hero.name; // La valeur sera le nom du héros
        option.textContent = hero.name; // Affichage du nom du héros
        select.appendChild(option); // Ajout de l'option au select
    });
});

// Fonction pour calculer les moyennes des critères et afficher les images
document.getElementById("calculate").addEventListener("click", () => {
    const selectedHeroes = [
        document.getElementById("hero1").value,
        document.getElementById("hero2").value,
        document.getElementById("hero3").value,
        document.getElementById("hero4").value,
        document.getElementById("hero5").value,
    ];

    const averages = Array(7).fill(0); // Initialisation des moyennes
    let count = 0; // Compteur de héros sélectionnés

    // Effacer les images précédentes
    const heroesImagesDiv = document.getElementById("heroes-images");
    heroesImagesDiv.innerHTML = "";

    selectedHeroes.forEach(heroName => {
        const hero = heroes.find(h => h.name === heroName); // Recherche du héros
        if (hero) {
            // Affichage de l'image du héros
            const img = document.createElement("img");
            img.src = hero.image; // Source de l'image
            img.alt = hero.name; // Texte alternatif pour l'image
            img.style.width = "100px"; // Ajuste la largeur de l'image
            img.style.margin = "10px"; // Marge autour de l'image
            heroesImagesDiv.appendChild(img); // Ajout de l'image au conteneur

            hero.criteria.forEach((value, index) => {
                averages[index] += value; // Somme des critères
            });
            count++; // Incrémente le compteur
        }
    });

    const resultsBody = document.querySelector("#results-table tbody");
    resultsBody.innerHTML = ""; // Réinitialiser le tableau

    // Affichage des moyennes dans le tableau
    averages.forEach((total, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${["Crowd Control", "Early to mid game potential", "Late game potential", "Damage potential", "Survivability", "Pushing Potential", "Hero Synergy"][index]}</td>
                         <td>${(total / count).toFixed(2)}</td>`;
        resultsBody.appendChild(row);
    });

    // Calcul et ajout de la ligne pour le "Counter Index"
    const counterRow = document.createElement("tr");
    const counterIndex = averages.reduce((a, b) => a + b) / (count * 7); // Calcul de la moyenne générale
    counterRow.innerHTML = `<td>Counter Index</td><td>${counterIndex.toFixed(2)}</td>`;
    resultsBody.appendChild(counterRow);
});
