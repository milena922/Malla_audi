const ramos = [
  {
    codigo: "R1",
    nombre: "Gestión y Empresa",
    semestre: 1,
    prerrequisitos: []
  },
  {
    codigo: "R2",
    nombre: "Métodos Matemáticos I",
    semestre: 1,
    prerrequisitos: []
  },
  {
    codigo: "R3",
    nombre: "Introducción a la Economía",
    semestre: 1,
    prerrequisitos: []
  },
  {
    codigo: "R4",
    nombre: "Contabilidad I",
    semestre: 2,
    prerrequisitos: ["R1"]
  },
  {
    codigo: "R5",
    nombre: "Métodos Matemáticos II",
    semestre: 2,
    prerrequisitos: ["R2"]
  }
];

let aprobados = new Set();

function crearMalla() {
  const malla = document.getElementById("malla");
  malla.innerHTML = "";

  // Agrupar por semestre
  const semestres = [...new Set(ramos.map(r => r.semestre))].sort();

  semestres.forEach(s => {
    const contenedor = document.createElement("div");
    contenedor.className = "semestre";
    contenedor.innerHTML = `<h2>Semestre ${s}</h2>`;

    const ramosSemestre = ramos.filter(r => r.semestre === s);
    ramosSemestre.forEach(ramo => {
      const div = document.createElement("div");
      div.textContent = ramo.nombre;
      div.classList.add("ramo");

      const requisitosCumplidos = ramo.prerrequisitos.every(pr => aprobados.has(pr));

      if (!requisitosCumplidos) {
        div.classList.add("bloqueado");
      } else if (aprobados.has(ramo.codigo)) {
        div.classList.add("aprobado");
      } else {
        div.classList.add("pendiente");
      }

      div.addEventListener("click", () => {
        if (!requisitosCumplidos) return;
        if (aprobados.has(ramo.codigo)) {
          aprobados.delete(ramo.codigo);
        } else {
          aprobados.add(ramo.codigo);
        }
        crearMalla();
      });

      contenedor.appendChild(div);
    });

    malla.appendChild(contenedor);
  });
}

crearMalla();
