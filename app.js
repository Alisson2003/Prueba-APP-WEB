const faceio = new faceIO("fioa0fd6");

function enrollNewUser() {
    faceio.enroll({
        locale: "auto",
        userConsent: false,
        payload: { whoami: 123456, email: "alisson.viracocha@epn.edu.ec" }
    }).then(userInfo => {
        alert(`Usuario registrado`);
        console.log("Registro completado:", userInfo);
    }).catch(errCode => {
        handleError(errCode);
        faceio.restartSession();
    });
    }

    function authenticateUser() {
    faceio.authenticate({ locale: "auto" })
    .then(userData => {
        alert(` Autenticación exitosa `);
        console.log("Usuario autenticado:", userData);
        consumirApiPeliculas();
    }).catch(errCode => {
        handleError(errCode);
        faceio.restartSession();
    });
    }

    function consumirApiPeliculas() {
        {
            const url = 'https://netflix54.p.rapidapi.com/season/episodes/?ids=80077209%2C80117715&offset=0&limit=25&lang=en';
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': 'f3cde74ed7msh818635633fa6d28p14abc1jsnd581b2de48ba',
                    'X-RapidAPI-Host': 'netflix54.p.rapidapi.com'
                }
            };
        
            fetch(url, options)
                .then(response => response.json())
                .then(data => {
                    console.log(" Episodios obtenidos:");
                    console.log(data);
                    alert(" Episodios cargados. Revisa la consola (F12)");
                })
                .catch(error => {
                    console.error("❌ Error al consumir la API:", error);
                    alert("❌ Error al consumir la API");
                });
        }
        
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
