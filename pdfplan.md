# Plan de Implementación: Generación de CV en PDF con Fuente Única de Verdad (`index.html`)

## Contexto y Problema a Resolver

Habíamos acordado crear una página independiente (`cv-pdf.html`) con diseño simplificado y apto para impresión (sin animaciones ni temas oscuros pesados) para que `Puppeteer` pudiera generar un PDF limpio y controlable. 

**El Problema (DRY - Don't Repeat Yourself):**  
Como tu CV está en constante actualización (nuevas skills, experiencias, etc.), mantener `index.html` (tu web) y `cv-pdf.html` (tu plantilla de impresión) sincronizados a mano sería tedioso y propenso a errores. Siempre olvidarías actualizar uno de los dos.

## La Solución Propuesta (Single Source of Truth)

En lugar de mantener dos archivos HTML de forma manual, **usaremos `index.html` como la única fuente de verdad**. Toda la información de tu experiencia, educación y habilidades se extraerá automáticamente de allí y se inyectará en una plantilla limpia para generar el PDF.

### Flujo de Trabajo del Script (`generate-pdf.js`)

Cuando quieras un nuevo PDF (o previsualizarlo), ejecutarás un único script en Node.js que hará lo siguiente automáticamente usando Puppeteer:

1. **Scraping**: Puppeteer abre tu `index.html` localmente sin mostrar ventana. Usará JavaScript estándar para extraer toda tu información (nombre, bio, experiencia, títulos, nivel de skills) leyendo el DOM (ej: buscando las etiquetas `<div class="skill">`).
2. **Inyección en Plantilla**: Tomará un nuevo archivo llamado `cv-pdf-template.html` (que contiene el diseño A4, CSS limpio, pero sin datos) y reemplazará marcadores especiales (ej: `{{SKILLS_LIST}}`) con el HTML formatado usando tus datos actuales.
3. **Generación del HTML Estático**: Guardará el resultado final en `cv-pdf.html`. Esto es súper útil porque **puedes abrir `cv-pdf.html` directamente en tu navegador para verificar visualmente** cómo va a quedar el PDF antes de que se imprima.
4. **Generación del PDF**: Finalmente, Puppeteer abrirá ese `cv-pdf.html` recién generado y usará su motor Chromium para imprimirlo a formato PDF (`Gabriel_Garcia_CV.pdf`).

### Diagrama de Flujo

```mermaid
graph TD
    A[index.html <br/>(Fuente única, tú solo editas este)] -->|Puppeteer extrae datos| B(Data Scraper JS)
    C[cv-pdf-template.html <br/>(Plantilla vacía con estilos PDF)] -->|Node inyecta datos| D
    B -->|Genera HTML dinámico| D(cv-pdf.html generado)
    D -->|Browser| E[Previsualización manual por ti ✓]
    D -->|Puppeteer| F[Gabriel_Garcia_CV.pdf]
```

## Cambios Propuestos

---

### [NEW] `package.json`
Se creará o actualizará un proyecto Node básico para instalar localmente la librería `puppeteer`. (Si prefieres no tener un package.json suelto, la podemos instalar global o alojar en un subdirectorio).

### [NEW] `scripts/generate-pdf.js`
El gran orquestador. Se encargará de todo el flujo arriba descrito. Sólo usará `puppeteer` y `fs` (file system de Node).

### [NEW] `cv-pdf-template.html`
La plantilla maestra. Será un HTML con hojas de estilo específicas (`cv-pdf.css`) diseñadas para A4. En lugar de tus datos hardcodeados, tendrá marcadores como:
```html
<section id="experience">
   <!-- {{EXPERIENCE_DATA}} -->
</section>
```

### [NEW] `css/cv-pdf.css`
Los estilos pulidos para el PDF. Optaremos por un tema claro (**Light Theme**) con fondo blanco para legibilidad e impresión, pero manteniendo los **colores "hacker theme"** (como el rojo vibrante `#ff003c`, grises oscuros para texto secundario y fuentes monoespaciadas para títulos) para conservar la identidad visual de tu marca personal.

### [NEW] `.agents/skills/cv-sync/SKILL.md`
Crearemos una "skill" para el agente. Esto servirá como memoria persistente para que cualquier IA que trabaje en este repo sepa que después de editar el `index.html` es obligatorio ejecutar el script de generación del PDF.

### [MODIFY] `index.html`
**Sin cambios en su estructura o contenido.** Solo le añadiremos un botón flotante abajo a la derecha de "Descargar PDF" que apunte directamente al archivo `Gabriel_Garcia_CV.pdf` generado. Borraremos el JS antiguo de `html2pdf.js` y limpiaremos el código residual relacionado con la generación cliente-side que fallaba.

---

## Ventajas de este enfoque

1. **Mantenimiento Cero:** Solo actualizas tu web (`index.html`). El PDF se construye solo con los datos exactos que acabas de meter.
2. **SEO y Código Limpio:** Tu `index.html` sigue siendo una página estática normal, amigable con motores de búsqueda.
3. **Verificabilidad:** Podremos depurar o iterar el CSS del PDF abriendo el archivo `cv-pdf.html` autogenerado directamente en el navegador.

---

## Plan de Verificación

### 1. Verificación de Extracción (Scraping)
- Comprobar que el script extrae correctamente el número de experiencias laborales y la lista completa de habilidades desde `index.html`.
- Logs en consola durante la ejecución para avisar si falta algún campo crítico (nombre, contacto).

### 2. Verificación Visual (Browser)
- **HTML Intermedio**: Abriré `cv-pdf.html` en el navegador interno.
    - Validar que el fondo es blanco pero los acentos usan el color rojo característico.
    - Comprobar que el layout de dos columnas no se rompe.
    - Verificar que el contenido entra en 1 o 2 páginas A4 sin cortes extraños.
- **PDF Final**: Abrir `Gabriel_Garcia_CV.pdf` para confirmar que Puppeteer ha respetado los estilos y fuentes.

### 3. Verificación de Integración
- Abrir `index.html`, hacer click en el nuevo botón flotante y verificar que la descarga del PDF funciona correctamente.

---

## Open Questions (Cerradas)

- **Inicialización Node**: Confirmado (si). Crearemos `package.json`.
- **Diseño del PDF**: Confirmado (Light theme + hacker colors).
- **Skill de Memoria**: Confirmado. Se creará una skill para automatizar el recordatorio de sincronización.

Quedo a la espera de tu confirmación o dudas para arrancar.
