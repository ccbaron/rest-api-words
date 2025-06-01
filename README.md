# Una REST API con principios

Vamos a desarrollar una nueva REST API con el objetivo de explicar algunos de los principios a seguir cuando creamos una REST API

## Las base de datos JSON

Disponemos de una base de datos JSON con palabras de 3 a 13 letras.

## Principios generales de las REST API

### 1. Interfaz Uniforme
Podemos simplificar la arquitectura general del sistema y mejorar la visibilidad de las interacciones. 

Las siguientes cuatro restricciones permiten lograr una interfaz REST uniforme:

**Identificación de recursos** – La interfaz debe identificar de forma única cada recurso involucrado en la interacción entre el cliente y el servidor.

**Manipulación de recursos mediante representaciones** – Los recursos deben tener representaciones uniformes en la respuesta del servidor. Los consumidores de la API deben usar estas representaciones para modificar el estado del recurso en el servidor.

**Mensajes autodescriptivos** – Cada representación de recurso debe incluir suficiente información para describir cómo procesar el mensaje. 

Ademas vamos a [versionar](https://restfulapi.net/versioning/) nuestra API como buena práctica de programación.

## Iteración 1: Implementar el endpoint /api/v1/words

**Objetivo:** Devolver una palabra aleatoria de la base de datos JSON.

- El endpoint debe estar en la ruta `/api/v1/words` y responder a peticiones GET.
- Debe leer el fichero `words.json` y devolver una palabra aleatoria de la lista.
- Usa `res.json()` para enviar la respuesta.

**Ejemplo de respuesta esperada:**


```
{
  "word": "gato"
}
```

**Pista:** Utiliza el array de palabras cargado desde `words.json` para seleccionar una palabra aleatoria.

Implementa el endpoint en el lugar indicado en `index.js`. Cuando termines, podrás probarlo accediendo a http://localhost:3000/api/v1/words desde tu navegador o usando una herramienta como Thunderclient o curl.

### Enlaces interesantesç

[Buenas prácticas en la creación de REST APIs](https://restfulapi.net/rest-api-best-practices/)

## Iteración 2: Filtrar por longitud con el parámetro length

**Objetivo:** Permitir que el endpoint devuelva solo palabras de una longitud específica usando el parámetro de consulta `length`.

- El endpoint debe seguir siendo `/api/v1/words` y responder a peticiones GET.
- Si se especifica el parámetro `length`, solo debe devolver palabras que tengan exactamente ese número de letras.
- Si no hay palabras con esa longitud, debe devolver un error adecuado.
- Usa `res.json()` para enviar la respuesta.

**Ejemplo de petición:**

```
GET /api/v1/words?length=5
```

**Ejemplo de respuesta esperada:**

```
{
  "word": "perro"
}
```

**Ejemplo de error si no hay palabras:**

```
{
  "error": "No hay palabras con esa longitud"
}
```

**Pista:** Utiliza el método `filter` de los arrays para seleccionar solo las palabras que tengan la longitud indicada.

## Iteración 1b: Despliega tu API en render.com

**Objetivo:** Subir y desplegar tu código en la nube usando render.com para que tu API sea accesible desde cualquier lugar.

**Pasos sugeridos:**

1. Sube tu proyecto a un repositorio en GitHub (puedes crear uno nuevo y subir todos los archivos del proyecto).
2. Accede a <a href="https://render.com/" target="_blank">render.com</a> y crea una cuenta si no tienes una.
3. Crea un nuevo servicio de tipo "Web Service" y conecta tu cuenta de GitHub.
4. Selecciona el repositorio de tu proyecto y sigue los pasos para desplegarlo:
   - Elige Node.js como entorno.
   - Asegúrate de que el comando de inicio sea `node index.js` o el que corresponda a tu proyecto.
   - El puerto debe ser el que Render asigne automáticamente (usa `process.env.PORT`).
5. Espera a que Render termine de construir y desplegar tu API.
6. Prueba tu API accediendo a la URL pública que Render te proporciona, por ejemplo: `https://tu-api.onrender.com/api/v1/words`.

**Consejo:** Puedes usar herramientas como Thunderclient, Postman o simplemente tu navegador para probar los endpoints en la URL pública.

Cuando lo hayas conseguido, ¡comparte la URL con tus compañeros o profesor para que puedan probar tu API!