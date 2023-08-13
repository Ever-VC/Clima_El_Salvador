const ElSalvador = (() => {
    'use strict';

    const _getClimaDepartamento = async(lat, lon) => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=78a21ef19440fd21f659455f994e9e78&units=metric`)
            if (!response.ok) {
                throw new Error("Error 404");
            }
            return response.json();
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    const getClima = async(departamento) => {
        switch (departamento) {
            case "Ahuachapan":
                return await _getClimaDepartamento("13.926065389827025", "-89.83859682624974");
                break;
            case "Cabannias":
                return await _getClimaDepartamento("13.888020072099062", "-88.7275999752103");
                break;
            case "Cuscatlan":
                return await _getClimaDepartamento("13.85919464888213", "-89.04345741939088");
                break;
            case "La Libertad":
                return await _getClimaDepartamento("13.489077303924278", "-89.30714693743143");
                break;
            case "La Paz"://13.498933203844528, -88.99005300256763
                    return await _getClimaDepartamento("13.498933203844528", "-88.99005300256763");
                    break;
            case "Sonsonate":
                return await _getClimaDepartamento("13.709637477005828", "-89.72493719009852");
                break;
            case "San Salvador":
                return await _getClimaDepartamento("13.694143314483663", "-89.21216272826106");
                break;
            case "La Union":
                return await _getClimaDepartamento("13.332269982770298", "-87.85002713117889");
                break;
            case "Morazan":
                return await _getClimaDepartamento("13.771476354519464", "-88.11884279046542");
                break;
            case "San Miguel"://13.858335863035354, -88.14747415239569
                return await _getClimaDepartamento("13.479682473290687", "-88.17509823149537");
                break;
            case "San Vicente"://13.639294132975682, -88.78306314658077
                return await _getClimaDepartamento("13.639294132975682", "-88.78306314658077");
                break;
            case "Usulutan":
                return await _getClimaDepartamento("13.34193668359978", "-88.43290368135357");
                break;
            case "Chalatenango"://14.041440869582962, -88.93904703728073
                return await _getClimaDepartamento("14.041440869582962", "-88.93904703728073");
                break;
            case "Santa Ana"://13.97754582047078, -89.56513904126884
                return await _getClimaDepartamento("13.97754582047078", "-89.56513904126884");
                break;
        
            default:
                break;
        }
    }

    return {
        getClima
    }
})();

const aAhuachapan = document.querySelector("[data-ahuachapan]");
const aCabannias = document.querySelector("[data-cabannias]");
const aCuscatlan = document.querySelector("[data-cuscatlan]");
const aLaLibertad = document.querySelector("[data-lalibertad]");
const aLaPaz = document.querySelector("[data-lapaz]");
const aSonsonate = document.querySelector("[data-sonsonate]");
const aSanSalvador = document.querySelector("[data-san-salvador]");
const aLaUnion = document.querySelector("[data-launion]");
const aMorazan = document.querySelector("[data-morazan]");
const aSanMiguel = document.querySelector("[data-san-miguel]");
const aSanVicente = document.querySelector("[data-sanvicente]");
const aUsulutan = document.querySelector("[data-usulutan]");
const aChalatenango = document.querySelector("[data-chalatenango]");
const aSantaAna = document.querySelector("[data-santaana]");
const h1Departamento = document.querySelector("[data-departamento]");
const pTemp = document.querySelector("[data-temp]");
const pTempMaxMin = document.querySelector("[data-tempMaxMin]");
const pHumedad = document.querySelector("[data-humedad]");
const pViento = document.querySelector("[data-viento]");
const imagen = document.querySelector("[data-imagen-clima]");
const icon = document.querySelector("[data-icono]");
const cuerpo = document.querySelector("[data-cuerpo]");

const mostrarClima = async(departamento) => {
    const { name, main, weather, wind, dt, sys} = await ElSalvador.getClima(departamento);
    h1Departamento.textContent = name;
    pTempMaxMin.textContent = "Max: " + Math.round(main.temp_max) + "°C / Min: " + Math.round(main.temp_min) + "°C / Sensación: " + Math.round(main.feels_like) + "°C";
    const hora = new Date(dt * 1000);
    const amanecer = new Date(sys.sunrise * 1000);
    const atardecer = new Date(sys.sunset * 1000);
    if (hora.getHours() >= amanecer.getHours() && hora.getHours() < atardecer.getHours()) {
        //DIA
        icon.src = "./imgs/clear.png";
        if (weather[0].main == "Thunderstorm") {
            imagen.src = "./imgs/storm.png";
        } else if (weather[0].main == "Drizzle") {
            imagen.src = "./imgs/rain.png";
        } else if (weather[0].main == "Rain") {
            imagen.src = "./imgs/drizzle.png";
        } else if (weather[0].main == "Clear") {
            imagen.src = "../imgs/clear.png";
        } else if (weather[0].main == "Clouds") {
            if (weather[0].description == "few clouds") {
                imagen.src = "../imgs/fewclouds.png";
            } else if (weather[0].description == "scattered clouds") {
                imagen.src = "./imgs/scatteredclouds.png";
            } else if (weather[0].description == "broken clouds" ||
                        weather[0].description == "overcast clouds") {
                imagen.src = "./imgs/clouds.png";
            }
        } else if (weather[0].main == "Mist" || weather[0].main == "Haze" ||
                weather[0].main == "Dust" || weather[0].main == "Fog" ||
                weather[0].main == "Sand" || weather[0].main == "Ash" ||
                weather[0].main == "Squall") {
                    imagen.src = "./imgs/mist.png";
        }
    } else if (hora.getHours() < amanecer.getHours() && hora.getHours() >= atardecer.getHours()) {
        //NOCHE
        icon.src = "./imgs/moon.png";
        if (weather[0].main == "Thunderstorm") {
            imagen.src = "./imgs/storm.png";
        } else if (weather[0].main == "Drizzle") {
            imagen.src = "./imgs/rain.png";
        } else if (weather[0].main == "Rain") {
            imagen.src = "./imgs/rain_moon.png";
        } else if (weather[0].main == "Clear") {
            imagen.src = "./imgs/moon.png";
        } else if (weather[0].main == "Clouds") {
            if (weather[0].description == "few clouds") {
                imagen.src = "./imgs/mist_moon.png";
            } else if (weather[0].description == "scattered clouds") {
                imagen.src = "./imgs/scatteredclouds.png";
            } else if (weather[0].description == "broken clouds" ||
                        weather[0].description == "overcast clouds") {
                imagen.src = "./imgs/clouds.png";
            }
        } else if (weather[0].main == "Mist" || weather[0].main == "Haze" ||
                weather[0].main == "Dust" || weather[0].main == "Fog" ||
                weather[0].main == "Sand" || weather[0].main == "Ash" ||
                weather[0].main == "Squall") {
                    imagen.src = "./imgs/mist.png";
        }
    }
    
    pHumedad.textContent = main.humidity + "%";
    pViento.textContent = wind.speed + " km/h";
    pTemp.textContent = Math.round(main.temp) + "°C";
}

const limpiarTodo = () => {
    h1Departamento.textContent = "DEPARTAMENTO";
    pTempMaxMin.textContent = "Max: --°C / Min: --°C / Sensación: --°C";
    pHumedad.textContent = "--%";
    pViento.textContent = "-- km/h";
    pTemp.textContent = "--°C";
    imagen.src = "./imgs/fewclouds.png";
}

cuerpo.addEventListener("mouseover", () => {
    limpiarTodo();
});

aAhuachapan.addEventListener("mouseover", async() => {
    mostrarClima("Ahuachapan");
});

aCabannias.addEventListener("mouseover", async() => {
    mostrarClima("Cabannias");
});

aCuscatlan.addEventListener("mouseover", async() => {
    mostrarClima("Cuscatlan");
    
});

aLaLibertad.addEventListener("mouseover", async() => {
    mostrarClima("La Libertad");
});

aLaPaz.addEventListener("mouseover", async() => {
    mostrarClima("La Paz");
});

aSonsonate.addEventListener("mouseover", async() => {
    mostrarClima("Sonsonate");
});

aSanSalvador.addEventListener("mouseover", async() => {
    mostrarClima("San Salvador");
});

aLaUnion.addEventListener("mouseover", async() => {
    mostrarClima("La Union");
});

aMorazan.addEventListener("mouseover", async() => {
    mostrarClima("Morazan");
    
});

aSanMiguel.addEventListener("mouseover", async() => {
    mostrarClima("San Miguel");
});

aSanVicente.addEventListener("mouseover", async() => {
    mostrarClima("San Vicente");
});

aUsulutan.addEventListener("mouseover", async() => {
    mostrarClima("Usulutan");
});

aChalatenango.addEventListener("mouseover", async() => {
    mostrarClima("Chalatenango");
});

aSantaAna.addEventListener("mouseover", async() => {
    mostrarClima("Santa Ana");
});