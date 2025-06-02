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

## Iteración Intermaedia: Despliega tu API en render.com

**Objetivo:** Subir y desplegar tu código en la nube usando render.com para que tu API sea accesible desde cualquier lugar.

**Pasos sugeridos:**

1. Sube tu proyecto a un repositorio en GitHub si no lo tienes ya(puedes crear uno nuevo y subir todos los archivos del proyecto).
2. Accede a <a href="https://render.com/" target="_blank">render.com</a> y crea una cuenta si no tienes una.
3. Crea un nuevo servicio de tipo "Web Service" y conecta tu cuenta de GitHub.
4. Selecciona el repositorio de tu proyecto y sigue los pasos para desplegarlo:
   - Elige Node.js como entorno.
   - Asegúrate de que el comando de inicio sea `node index.js` o `npm start`.
   - El puerto debe ser el que Render asigne automáticamente (usa `process.env.PORT`).
5. Espera a que Render termine de construir y desplegar tu API.
6. Prueba tu API accediendo a la URL pública que Render te proporciona, por ejemplo: `https://tu-api.onrender.com/api/v1/words`.

**Consejo:** Puedes usar herramientas como Thunderclient, Postman o simplemente tu navegador para probar los endpoints en la URL pública.

Cuando lo hayas conseguido, ¡comparte la URL con tus compañeros o profesor para que puedan probar tu API!


## Iteración 3: Endpoint v2 para devolver los idiomas disponibles

**Objetivo:** Añadir un endpoint en la versión 2 de la API que devuelva un array con los idiomas soportados.

Ahora queremos implementar la posibilidad de ofrecer el idioma de nuestra a

- El endpoint debe estar en la ruta `/api/v2/languages` y responder a peticiones GET.
- Debe devolver un array JSON con los idiomas disponibles, por ejemplo: `["zh", "pt-br", "es", "de", "it", "fr"]`.
- Usa `res.json()` para enviar la respuesta.

**Ejemplo de respuesta esperada:**

```
{
  "languages": [
    "zh",
    "pt-br",
    "es",
    "de",
    "it",
    "fr"
  ]
}
```

**Pista:** Disponemos de un array con todos los idiomas válidos en  `index.js`.

Implementa el endpoint en el lugar indicado en `index.js`. Cuando termines, podrás probarlo accediendo a http://localhost:3000/api/v2/languages desde tu navegador o usando una herramienta como Thunderclient o curl.

## Iteración 4: Endpoint v2 para obtener una palabra aleatoria de la API externa

**Objetivo:** Crear un endpoint que actúe como proxy y devuelva una palabra aleatoria obtenida desde una API externa, permitiendo especificar la longitud y el idioma.

El cliente no sabe de donde obtenemos los datos o los servicios. Disponemos de una base de datos en data/word.json. Pero ahora nos gustaría implementar otra versión de la API, la cuál a su vez va a acceder a *otra API externa* para obtener palabras aleatorias y así enriquecer las funcionalidades de nuestro software. A este principio de la REST api se le llama [_layered system_]() Usa adecuadamente los endpoints de la API https://random-word-api.herokuapp.com para conseguir este propósito.


- El endpoint debe estar en la ruta `/api/v2/word` y responder a peticiones GET.
- Debe aceptar los parámetros de consulta `length` (por ejemplo, 5) y `lang` (por ejemplo, es).
- El endpoint debe hacer una petición a la API externa https://random-word-api.herokuapp.com usando los parámetros recibidos. *EXPLORA* los endpoints que ofrece esta REST API y cómo usarlos (no te va a funcionar si pones directamente `fetch("https://random-word-api.herokuapp.com")`)
- Debe devolver la palabra obtenida en el formato `{ "word": "palabra" }`.
- Si ocurre un error o no se encuentra palabra, debe devolver un error adecuado.

**Ejemplo de petición:**

```
GET /api/v2/word?length=5&lang=it
```

**Ejemplo de respuesta esperada:**

```
{
  "word": "cuore"
}
```

**Si el cliente proporciona un idioma inválido**

{
  "error": "Idioma no soportado. Consulta los idiomas válidos en /api/v2/languages"
}



**Si la API externa no devuelve ninguna palabra por cualquier motivo:**

```
{
  "error": "No se encontró palabra"
}
```

**Pista:** Utiliza fetch (nativo de NodeJS) o una librería similar para hacer la petición HTTP a la API externa.

Implementa el endpoint en el lugar indicado en `index.js`. Cuando termines, podrás probarlo accediendo a http://localhost:3000/api/v2/word?length=5&lang=it desde tu navegador o usando una herramienta como Thunderclient o curl.

### Bonus 

Modifica el fichero **public/index.html** para añadir la documentación de cómo usar la versión 2 de la API

### Bonus (de dudosa utilidad, solo por practicar :D )

Cada vez que obtenemos una palabra nueva de la API externa, si no la tenemos en nuestro fichero data/words.json, la añadimos al fichero. ¿Usarás escritura síncrona o asíncrona?

### Enlaces interesantes

[Buenas prácticas en la creación de REST APIs](https://restfulapi.net/rest-api-best-practices/)