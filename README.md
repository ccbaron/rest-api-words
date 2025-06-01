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

## Iteración 1: Implementar el endpoint /api/v1/word

**Objetivo:** Devolver una palabra aleatoria de la base de datos JSON.

- El endpoint debe estar en la ruta `/api/v1/word` y responder a peticiones GET.
- Debe leer el fichero `words.json` y devolver una palabra aleatoria de la lista.
- Usa `res.json()` para enviar la respuesta.

**Ejemplo de respuesta esperada:**


```
{
  "word": "gato"
}
```

**Pista:** Utiliza el array de palabras cargado desde `words.json` para seleccionar una palabra aleatoria.

Implementa el endpoint en el lugar indicado en `index.js`. Cuando termines, podrás probarlo accediendo a http://localhost:3000/api/v1/word desde tu navegador o usando una herramienta como Thunderclient o curl.

### Enlaces interesantesç

[Buenas prácticas en la creación de REST APIs](https://restfulapi.net/rest-api-best-practices/)