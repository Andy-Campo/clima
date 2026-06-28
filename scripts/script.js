// Clave de API para acceder a los datos climáticos
const API_KEY = "cc75fa1b51d31fd7647ff386809a527d"

// Obtencion de Datos del Html
const ciudadInput = document.getElementById("ciudadInput");
const buscarclimabtn = document.getElementById("buscarclimabtn");
const informacionClimaDiv = document.querySelector("#informacion_Clima_Div");
const pais = "EC";

buscarclimabtn.addEventListener("click", () => 
{
    const ciudad = ciudadInput.value;

    if(ciudad.trim() === "") 
    {
        alert("Por favor, ingrese el nombre de una ciudad.");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${API_KEY}&units=metric&lang=es`;

    fetch(url)
    .then(
        (response) => 
    {
        if(!response.ok) 
        {
            throw new Error
            (
                `Error ${response.status}: Ciudad no encontrada.`
            );
        }
        return response.json();
    })
    .then(
        (datos) => 
    {
        displayClima(datos);
    })
    .catch((error) =>
    {
        informacionClimaDiv.innerHTML = `<p style color: red;>${error.message}</p>`;
    }
        );

    function displayClima(datos)
    {
        const ciudad = datos.name;
        const temperatura = datos.main.temp;
        const descripcion = datos.weather[0].description;
        const humedad = datos.main.humidity;
        const viento = datos.wind.speed;
        const codigoIcono = datos.weather[0].icon;
        const principal = datos.main;
        const nubes = datos.clouds;

        const urlIcono = `https://openweathermap.org/img/wn/${codigoIcono}@2x.png`;

        informacionClimaDiv.innerHTML = 
        `
            <h2>${ciudad}</h2>
            <p><strong>Temperatura:</strong> ${temperatura}°C</p>
            <p><strong>Descripción:</strong> ${descripcion}</p>
            <p><strong>Humedad:</strong> ${humedad}%</p>
            <p><strong>Viento:</strong> ${viento} m/s</p>
        
        <div class="tarjeta-clima animacion-aparecer">
            <!-- Encabezado de la Tarjeta -->
            <div class="cabecera-tarjeta">
                <h2>${ciudad}, EC</h2>
                <span class="etiqueta-estado">Status: 200 OK</span>
            </div>
            
            <!-- Cuerpo Principal -->
            <div class="cuerpo-tarjeta-principal">
                <div class="informacion-visual">
                    <div class="codigo-icono">icon: ${codigoIcono}</div>
                    <img src="${urlIcono}" alt="${descripcion}" class="imagen-icono-clima">
                </div>
                <div class="informacion-datos">
                    <div class="texto-descripcion">${descripcion}</div>
                    <div class="temperatura-principal">${temperatura}°C</div>
                </div>
            </div>
            
            <!-- Detalles de la Tarjeta (Rejilla de componentes técnicos) -->
            <div class="cuadricula-detalles">
                <div class="elemento-cuadricula">
                    <span class="icono-elemento">💧</span>
                    <div class="texto-elemento">
                        <p>Humedad: ${humedad}%</p>
                        <strong>(main.humidity)</strong>
                    </div>
                </div>
                <div class="elemento-cuadricula">
                    <span class="icono-elemento">🧭</span>
                    <div class="texto-elemento">
                        <p>Presión: ${principal.pressure} hPa</p>
                        <strong>(main.pressure)</strong>
                    </div>
                </div>
                <div class="elemento-cuadricula">
                    <span class="icono-elemento">💨</span>
                    <div class="texto-elemento">
                        <p>Viento: ${viento} m/s</p>
                        <strong>(wind.speed)</strong>
                    </div>
                </div>
                <div class="elemento-cuadricula">
                    <span class="icono-elemento">☁️</span>
                    <div class="texto-elemento">
                        <p>Nubosidad: ${nubes.all}%</p>
                        <strong>(clouds.all)</strong>
                    </div>
                </div>
            </div>
        </div>
            `;

    }
});