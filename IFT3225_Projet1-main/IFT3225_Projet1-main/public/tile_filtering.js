var xhr;

// Logique pour obtenir le numero de page
function getCurrentPage() {
  const p = parseInt(new URLSearchParams(window.location.search).get("page") || "1", 10);
  return Number.isFinite(p) && p > 0 ? p : 1;
}


// Logique pour filtrer ou rafraichir l'affichage les tuiles
function filterTiles() {
	title = encodeURIComponent(document.getElementById("title_f").value);
	description = encodeURIComponent(document.getElementById("description_f").value);
	category = encodeURIComponent(document.getElementById("category_f").value);
	date_begin = encodeURIComponent(document.getElementById("date_begin_f").value);
	date_end = encodeURIComponent(document.getElementById("date_end_f").value);
	const CURRENT_PAGE = getCurrentPage();


	xhr = new XMLHttpRequest();
	url = "tile_filtering.php"
	+ "?page=" + CURRENT_PAGE
	+ "&title=" + title
	+ "&description=" + description
	+ "&category=" + category
	+ "&date_begin=" + date_begin
	+ "&date_end=" + date_end
	+ "&nocache=" + Math.random();

	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
		document.getElementById("tiles_result").innerHTML = xhr.responseText;
		}
	};

	xhr.open("GET", url, true);
	xhr.send(null);
}

// Logique pour creation/modification des tuiles
form = document.getElementById("tile_form");

if (form) {
	form.addEventListener("submit", function (e) {
    	e.preventDefault(); // pour le feel asynchrone

    	xhrCreate = new XMLHttpRequest();
    	formData = new FormData(form);

		xhrCreate.onreadystatechange = function () {
			if (xhrCreate.readyState === 4 && xhrCreate.status === 200) {
				filterTiles(); // Reutilise filterTiles() pour rafraichir les tuiles
				form.reset();
				document.getElementById("tile_id_m").value = "";
			}
    };

    xhrCreate.open("POST", "tile_create.php", true);
    xhrCreate.send(formData);
  });
}

//Logique pour suppression des tuiles
document.addEventListener("click", function (e) {
	btn = e.target.closest(".btn-delete");
	if (!btn) return;

	tile = btn.closest(".tile");
	if (!tile) return;

	tileId = tile.dataset.tileId;
	if (!tileId) return;

	if (!confirm("Supprimer cette tuile ?")) return;

	xhr = new XMLHttpRequest();
	fd = new FormData();
	fd.append("tile_id", tileId);

	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
		filterTiles();
		}
	};

	xhr.open("POST", "tile_delete.php", true);
	xhr.send(fd);
});

//Logique pour modification des tuiles
document.addEventListener("click", function (e) {
  btn = e.target.closest(".btn-edit");
  if (!btn) return;

  tile = btn.closest(".tile");
  if (!tile) return;

  // Recueille les valeurs des champs
  tileId = tile.dataset.tileId || "";
  title = tile.querySelector("h3")?.innerText ?? "";
  description = tile.querySelector("p")?.innerText ?? "";
  spans = tile.querySelectorAll("small span");
  category = spans[0]?.innerText ?? "";
  dateStr = spans[1]?.innerText ?? "";

  // Mets les valeurs dans le form modifier
  document.getElementById("tile_id_m").value = tileId;
  document.getElementById("title_m").value = title;
  document.getElementById("description_m").value = description;
  document.getElementById("category_m").value = category;
  // YYYY-MM-DD
  document.getElementById("date_m").value = dateStr;

  // envoie curseur vers title
  document.getElementById("title_m").focus();

});

//Logique pour effacer le formulaire de modification et surtout le champ caché tile_id_m
function clearModifyForm() {
  form.reset();
  document.getElementById("tile_id_m").value = "";
}

document.getElementById("btn-cancel-edit").addEventListener("click", clearModifyForm);

