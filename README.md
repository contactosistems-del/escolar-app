# Habilita · Plataforma de capacitación para estudiantes

Prototipo funcional de una plataforma web de capacitación enfocada en las habilidades que piden las empresas (Excel, trabajo en equipo, elaboración de reportes, comunicación profesional).

Desarrollado por **FlympuxLab**.

## Funciones
- Registro e inicio de sesión de estudiantes
- Perfil individual
- Catálogo de cursos con filtros y búsqueda
- Inscripción a cursos
- Lecciones con video (YouTube/Vimeo), documentos y texto
- Evaluación final con calificación aprobatoria
- Seguimiento del progreso
- Constancias digitales con folio verificable (imprimibles en PDF)
- Panel administrativo: crear, editar, publicar y eliminar cursos; ver estudiantes y constancias
- Diseño adaptable a computadora y celular

## Cuentas de demostración
| Rol | Correo | Contraseña |
| --- | --- | --- |
| Estudiante | estudiante@habilita.mx | demo123 |
| Administrador | admin@habilita.mx | admin123 |

## Nota técnica
Es un sitio estático (HTML, CSS y JavaScript, sin dependencias). Los datos se guardan en el `localStorage` del navegador, así que cada navegador tiene su propia copia. Para operar con usuarios reales se conecta a una API y base de datos.

## Publicar
Importar el repositorio en Vercel (Framework preset: **Other**, sin comando de build).
