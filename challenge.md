Introducción
El presente examen práctico tiene como finalidad evaluar las habilidades y destrezas técnicas que tiene El Candidato dentro del ecosistema de
desarrollo front-end utilizando el framework Angular v 21, asimismo pretende capturar los skills y buenas prácticas que la persona ha adquirido a lo
largo de su carrera profesional en el campo laboral, permitiendo contrastar la solución del mismo con la información obtenida durante la entrevista
técnica. Cada uno de los requisitos y puntos a evaluar de este examen tiene su respectivo Peso, mismo que será tomado en cuenta para la valoración
final de la solución del examen. Dentro del directorio “dev-resources” se encuentra todo lo necesario para la resolución del examen.
Condiciones

El candidato dispone de un máximo de ocho (8) horas para completar el examen incluyendo el subir al repositorio el código fuente.
Una vez enviado el examen al candidato vía correo electrónico, no se podrá cancelar ni interrumpir el mismo.
El examen deberá ser supervisado por un profesional del área RRHH de Gapsi sea de forma presencial o remota con webcam.
Cualquier similitud “excesiva” de la solución del examen con alguna fuente externa de la web o con otro examen de otros candidatos implicará
una revisión presencial de re-validación de la misma.
Para el caso donde el candidato realice el examen de forma remota, este deberá asegurar conexión a internet estable tanto para recibir el
examen como para entrega la solución.
Pre-requisitos para el candidato

Cualquier IDE para desarrollo Angular 21 (https://atom.io/ https://code.visualstudio.com/ www.jetbrains.com )
SoapUI desktop (https://www.soapui.org/downloads/soapui.html)
Postman desktop (https://www.getpostman.com/downloads/)
Cualquier cliente Git (https://git-scm.com/ https://tortoisegit.org/ https://git-fork.com/ https://www.sourcetreeapp.com/)
NodeJs v.24.x o superior.
Angular v.21 con el respectivo Angular CLI.
Conocimientos sólidos en desarrollo web con HTML5, ES14, ES15, TypeScript, CSS, frameworks y librerías.
Cualquier herramienta para recortar imágenes o en su defecto alguna online.
Septiembre 2019
Preparado por: Grupo de Asesores Profesionales en Servicios de Integración
Para uso exclusivo de Gapsi ®EXAMEN PRÁCTICO
examen práctico de angular v21
Descripción general
Le empresa Gapsi e-Commerce quiere mejorar su buscador de productos en su tienda online, así como también requiere mejorar la forma en la que
los clientes agregan o eliminan productos al carrito de compra. En consecuencia se necesita cambiar únicamente la experiencia del cliente mediante
un desarrollo a nivel del front-end con Angular v 21

Requisitos funcionales a considerar (escala de peso entre 1 y 5, donde 1 es lo que representa el menor peso en la valoración)

[ peso 3 ] - El header de la aplicación debe ser e-Commerce Gapsi y deberá usar el logo de la página web de Gapsi.
[ peso 5 ] - Se deberá tener una pantalla de bienvenida que muestre los siguientes elementos:
o Imagen del candidato. (usar cualquiera)
o Texto “Bienvenido Candidato 01” (devuelto por el servicio rest)
o Texto con la versión de la aplicación. (devuelto por el servicio rest)
[ peso 4 ] - Se requiere listar los productos de la tienda (devuelto por el servicio rest)
[ peso 5 ] - A medida que se hace scroll se van cargando las páginas correspondientes (usar paginador del servicio rest)
[ peso 5 ] - Se requiere agregar productos al carrito arrastrándolos al mismo.
[ peso 4 ] - Cuando un producto ya está en el carrito entonces no deberá aparecer en la lista.
[ peso 3 ] - En la parte superior derecha deberá aparecer un botón para reiniciar la aplicación e iniciar nuevamente.

Requisitos no funcionales a considerar (escala de peso entre 1 y 5, donde 1 es lo que representa el menor peso en la valoración)

[ peso 5 ] - La lista de productos deberá cargarse con virtual scroll y dynamic load.
[ peso 5 ] - Los productos deberán cargarse en el carrito utilizando drag & drop.
OK[ peso 4 ] - Deberá implementar al menos 2 patrones de diseño. En el código se debe indicar cual(es) archivos representan dichos patrones.
[ peso 2 ] - La solución deberá implementar al menos 1 feature de una PWA.
[ peso 5 ] - Consumir los servicios web en la siguiente ruta: https://7aeaed4d-9420-4504-bc88-1c6c1a6fd6ec.mock.pstmn.io
[ peso 3 ] - Generar build con minificado y ofuscado de la aplicación.
[ peso 4 ] - Deseable: Utilizar Angular Material
[ peso 4 ] - Deseable: Implementar GraphQL
[ peso 2 ] - Deseable: Usar el framework font-awesome o similar desde el CDN.
[ peso 1 ] - Deseable: Usar bootstrap o similar desde el CDN.

Puntos que serán evaluados (escala de peso entre 1 y 5, donde 1 es lo que representa el menor peso en la valoración)

[ peso 2 ] - Uso de las herramientas indicada en la sección Pre-requisitos.
[ peso 4 ] - Completitud de los requisitos funcionales.
[ peso 5 ] - Completitud de los requisitos no funcionales.
[ peso 2 ] - Inicio y fin del examen en los tiempos planificados
[ peso 2 ] - Breve instructivo en el readme.md del proyecto que permita bajar el fuente y echar a andar el proyecto.
[ peso 2 ] - Reglas de clean-code
[ peso 2 ] - Validaciones básicas en campos, pantallas, respuestas de servicios web, etc.
[ peso 2 ] - Creatividad que se aplique a nivel visual como efectos, animaciones, transiciones, proporciones.
[ peso 2 ] - Simplicidad en la lógica de programación.
[ peso 2 ] - Buenas prácticas de programación tales como: comentarios en código, uso de archivos de configuración por separado.
[ peso 5 ] - El código debe ser compartido en cualquier SaaS Git como Github, Bitbucked de forma pública.
Insumos

[ POST ] - https://7aeaed4d-9420-4504-bc88-1c6c1a6fd6ec.mock.pstmn.io/visitors
[ GET ] - https://7aeaed4d-9420-4504-bc88-1c6c1a6fd6ec.mock.pstmn.io/products
Enviar notificación de finalización al siguiente correo electrónico lsandoval@grupoasesores.com.mx que incluya la ruta del repositorio git.


get response: 
{
    "code": 200,
    "description": "All products",
    "data": {
        "type": "Products",
        "products": [
            {
                "type": "Product",
                "sku": "aaaa-aaaa-aaaa",
                "name": "Laptop",
                "image": "/laptop.jpg",
                "description": "Portátil de 15 pulgadas, batería 30 hrs, color negro",
                "price": 20000.67
            },
            {
                "type": "Product",
                "sku": "bbbb-bbbb-bbbb",
                "name": "Bicicleta",
                "image": "/bicicleta.jpg",
                "description": "Cuadro ligero, rin 16, color azul",
                "price": 5699.99
            },
            {
                "type": "Product",
                "sku": "cccc-cccc-cccc",
                "name": "Playera",
                "image": "/playera.jpg",
                "description": "Uso casual, mangas cortas, color blanco",
                "price": 1400.00
            },
            {
                "type": "Product",
                "sku": "dddd-dddd-dddd",
                "name": "Cable USB",
                "image": "/cable.jpg",
                "description": "3mts de longitud, resistente al aguacolor negro",
                "price": 231.21
            },
            {
                "type": "Product",
                "sku": "eeee-eeee-eeee",
                "name": "Mesa redonda",
                "image": "/mesa.jpg",
                "description": "Cristal de 120 ctms de diametro, patas resistentes, color azul con blanco",
                "price": 18000.00
            },
            {
                "type": "Product",
                "sku": "ffff-ffff-ffff",
                "name": "Pantalón",
                "image": "/pantalon.jpg",
                "description": "Pantalón de piel, elástico, talla 16, color negro",
                "price": 600.00
            },
            {
                "type": "Product",
                "sku": "gggg-gggg-gggg",
                "name": "Audífonos",
                "image": "/audifonos.jpg",
                "description": "Audífonos marca Sony, inalámbricos, bateria larga duración, color blanco",
                "price": 20000
            },
            {
                "type": "Product",
                "sku": "hhhh-hhhh-hhhh",
                "name": "Cuadro",
                "image": "/cuadro.jpg",
                "description": "Cuadro con pintura artística renacentista, 1mts x 2mts, marco de madera rústica",
                "price": 22000.99
            },
            {
                "type": "Product",
                "sku": "iiii-iiii-iiii",
                "name": "Vela",
                "image": "/vela.jpg",
                "description": "Velas redonda para eventos y decoraciones, olor a fragancias, 30ctms diametros, color rojo",
                "price": 13000.00
            },
            {
                "type": "Product",
                "sku": "jjjj-jjjj-jjjj",
                "name": "Cinturón",
                "image": "/cinturon.jpg",
                "description": "Cinturon grueso de piel, 5 ctms de alto, talla 36, color marrón claro",
                "price": 359.99
            },
            {
                "type": "Product",
                "sku": "kkkk-kkkk-kkkk-kkkk",
                "name": "Lapicero",
                "image": "/lapicero.jpg",
                "description": "Lapicero elegante y delgado, fina cobertura, tinta color azul, detalles dorados",
                "price": 20000
            }
        ]
    }
}

