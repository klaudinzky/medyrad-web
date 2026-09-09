# Configuración del blog

El panel editorial está disponible en `https://medyrad.cl/admin/` y usa el backend directo de GitHub de Decap CMS sobre `klaudinzky/medyrad-web` (rama `main`).

En Netlify, configure **Site configuration → Access & security → OAuth → Authentication providers → GitHub** con una aplicación OAuth de GitHub y su Client ID/secret. El callback indicado por Netlify debe coincidir exactamente con el configurado en la aplicación OAuth. Las credenciales se guardan en Netlify/GitHub, nunca en el repositorio.

Solo usuarios de GitHub con permiso de escritura (push) en el repositorio pueden iniciar sesión y guardar contenido. Este proyecto no usa Git Gateway.