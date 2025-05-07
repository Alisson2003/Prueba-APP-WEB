const faceio = new faceIO("fioae8e8");

function enrollNewUser() {
    faceio.enroll({
        locale: "auto",
        userConsent: false,
        payload: { whoami: 123456, email: "alisson.viracocha@epn.edu.ec" }
    }).then(userInfo => {
        alert(`✅ Usuario registrado:\nID Facial: ${userInfo.facialId}\nFecha Registro: ${userInfo.timestamp}\nGénero: ${userInfo.details.gender}\nEdad aprox: ${userInfo.details.age}`);
        console.log("Registro completado:", userInfo);
    }).catch(errCode => {
        handleError(errCode);
        faceio.restartSession();
    });
    }

    function authenticateUser() {
    faceio.authenticate({ locale: "auto" })
    .then(userData => {
        alert(`✅ Autenticación exitosa:\nID Facial: ${userData.facialId}\nPayload Asociado: ${JSON.stringify(userData.payload)}`);
        console.log("Usuario autenticado:", userData);
        consumirApiPeliculas();
    }).catch(errCode => {
        handleError(errCode);
        faceio.restartSession();
    });
    }

    function consumirApiPeliculas() {
    const options = {
        method: 'GET',
        headers: {
        'X-RapidAPI-Key': 'f3cde74ed7msh818635633fa6d28p14abc1jsnd581b2de48ba',
        'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
        }
    };

    fetch('https://streaming-availability.p.rapidapi.com/search/ultra?country=us&service=netflix&type=movie&output_language=en&language=en', options)
        .then(response => response.json())
        .then(data => {
        if (data.results && data.results.length > 0) {
            const movie = data.results[0];
            document.getElementById("contenido").innerHTML = `
            <h2>🎬 Película Recomendada:</h2>
            <p><strong>${movie.title}</strong> (${movie.year})</p>
            <img src="${movie.posterUrls[0]}" alt="Poster" style="border-radius:12px; margin-top:10px; max-width:200px;"><br><br>
            <p>${movie.overview}</p>
            `;
        } else {
            document.getElementById("contenido").innerHTML = `<p>❌ No se encontraron películas</p>`;
        }
        })
        .catch(err => {
        console.error(err);
        document.getElementById("contenido").innerHTML = `<p>❌ Error al consumir API de películas</p>`;
        });
    }

    function handleError(errCode) {
    const fioErr = fioErrCode;
    let msg = "";
    switch (errCode) {
        case fioErr.PERMISSION_REFUSED: msg = "❌ Acceso a la cámara denegado"; break;
        case fioErr.NO_FACES_DETECTED: msg = "❌ No se detectaron rostros"; break;
        case fioErr.UNRECOGNIZED_FACE: msg = "❌ Rostro no reconocido"; break;
        case fioErr.MANY_FACES: msg = "❌ Se detectaron múltiples rostros"; break;
        case fioErr.FACE_DUPLICATION: msg = "❌ Usuario ya registrado"; break;
        case fioErr.MINORS_NOT_ALLOWED: msg = "❌ Menores no permitidos"; break;
        case fioErr.PAD_ATTACK: msg = "❌ Ataque de suplantación detectado"; break;
        case fioErr.FACE_MISMATCH: msg = "❌ Rostro no coincide"; break;
        case fioErr.WRONG_PIN_CODE: msg = "❌ PIN incorrecto"; break;
        case fioErr.PROCESSING_ERR: msg = "❌ Error del servidor FaceIO"; break;
        case fioErr.UNAUTHORIZED: msg = "❌ Aplicación no autorizada"; break;
        case fioErr.TERMS_NOT_ACCEPTED: msg = "❌ Términos y condiciones rechazados"; break;
        case fioErr.UI_NOT_READY: msg = "❌ Widget no está listo"; break;
        case fioErr.SESSION_EXPIRED: msg = "❌ Sesión expirada"; break;
        case fioErr.TIMEOUT: msg = "❌ Operación expirada"; break;
        case fioErr.TOO_MANY_REQUESTS: msg = "❌ Demasiadas solicitudes"; break;
        case fioErr.EMPTY_ORIGIN: msg = "❌ Origen vacío o faltante"; break;
        case fioErr.FORBIDDDEN_ORIGIN: msg = "❌ Dominio prohibido"; break;
        case fioErr.FORBIDDDEN_COUNTRY: msg = "❌ País prohibido"; break;
        case fioErr.SESSION_IN_PROGRESS: msg = "❌ Otra sesión ya está en progreso"; break;
        case fioErr.NETWORK_IO: msg = "❌ Error de red"; break;
        default: msg = "❌ Error desconocido"; break;
    }
    alert(msg);
    console.error("Error:", msg, "| Código:", errCode);
    }
