///el nombre de la api es itunes search api
const botones = document.querySelectorAll(".btn");

botones.forEach((btn) => {
  btn.addEventListener("click", () => {

    const artista = btn.dataset.artista;
    const card = btn.parentElement;
    const info = card.querySelector(".info");

    info.innerHTML = "Cargando";

    fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(artista)}&entity=song&limit=3`)
      .then(res => {
        if (!res.ok) throw new Error("Error en API");
        return res.json();
      })
      .then(data => {

        if (!data.results || data.results.length === 0) {
          info.innerHTML = "No encontrado ";
          return;
        }

        info.innerHTML = data.results.map(c => `
          ${c.trackName} <br>
          ${c.artistName} <br>
          <a href="${c.trackViewUrl}" target="_blank" style="color:#ff3333;">Escuchar</a>
          <hr>
        `).join("");

      })
      .catch((err) => {
        console.error(err);
        info.innerHTML = "Error cargando datos";
      });

  });
});