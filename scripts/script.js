// Clave de API para acceder a los datos climáticos
const API_KEY = "cc75fa1b51d31fd7647ff386809a527d"

// Obtencion de Datos del Html
const ciudadInput = document.getElementById("ciudadInput");
const buscarclimabtn = document.getElementById("buscarclimabtn");
const informacionClimaDiv = document.querySelector("#informacion_Clima_Div");

buscarclimabtn.addEventListener("click", () => 
{
    const ciudad = ciudadInput.value;

    if(ciudad.trim() === "") 
    {
        alert("Por favor, ingrese el nombre de una ciudad.");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`;

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
        const pais = datos.sys.country;
        const temperatura = datos.main.temp;
        const descripcion = datos.weather[0].description;
        const humedad = datos.main.humidity;
        const viento = datos.wind.speed;
        const codigoIcono = datos.weather[0].icon;
        const presion = datos.main.pressure;
        const nubes = datos.clouds.all;
        const latitud = datos.coord.lat;
        const longitud = datos.coord.lon;

        // NUEVO: Evaluamos la temperatura para decidir qué clase de CSS aplicar
        let claseClima = "clima-templado"; // Por defecto entre 15°C y 24°C
        if (temperatura > 24) {
            claseClima = "clima-calido";   // Mayor a 24°C
        } else if (temperatura < 15) {
            claseClima = "clima-frio";     // Menor a 15°C
        }

        const urlIcono = `https://openweathermap.org/img/wn/${codigoIcono}@2x.png`;

        informacionClimaDiv.innerHTML = 
        `        
            <!-- NUEVO: Agregamos la variable ${claseClima} a la lista de clases -->
            <div class="tarjeta-clima ${claseClima} animacion-aparecer">
                <!-- Encabezado de la Tarjeta -->
                <div class="cabecera-tarjeta">
                    <h2>${ciudad}, ${pais}</h2>
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
                        <div class="temperatura-principal">${Math.round(temperatura)}°C</div>
                    </div>
                </div>
                
                <!-- Detalles de la Tarjeta (Rejilla de componentes técnicos) -->
                <div class="cuadricula-detalles">
                    <div class="elemento-cuadricula">
                        <span class="icono-elemento">💧</span>
                        <div class="texto-elemento">
                            <p>Humedad: ${humedad}%</p>
                        </div>
                    </div>
                    <div class="elemento-cuadricula">
                        <span class="icono-elemento">🧭</span>
                        <div class="texto-elemento">
                            <p>Presión: ${presion} hPa</p>
                        </div>
                    </div>
                    <div class="elemento-cuadricula">
                        <span class="icono-elemento">💨</span>
                        <div class="texto-elemento">
                            <p>Viento: ${viento} m/s</p>
                        </div>
                    </div>
                    <div class="elemento-cuadricula">
                        <span class="icono-elemento">☁️</span>
                        <div class="texto-elemento">
                            <p>Nubosidad: ${nubes}%</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
});