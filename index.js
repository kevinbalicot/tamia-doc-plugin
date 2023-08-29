const fs = require('fs');
const pathToSwaggerUi = require('swagger-ui-dist').absolutePath();
const swaggerJs = fs.readFileSync(`${pathToSwaggerUi}/swagger-ui-bundle.js`, 'utf-8');
const swaggerCss = fs.readFileSync(`${pathToSwaggerUi}/swagger-ui.css`, 'utf-8');

module.exports = (apiPrefix = '/api') => {
    return function(req, res, next) {
        if (req.url === `${apiPrefix}/doc.json`) {
            res.setHeader('Content-Type', 'application/json');

            return res.end(JSON.stringify(this.api));
        }

        if (req.url === `${apiPrefix}/doc.html`) {
            res.setHeader('Content-Type', 'text/html');

            return res.end(`
            <!DOCTYPE html>
            <html>
                <head>
                    <meta charset="utf-8">

                    <title>Swagger API Doc</title>
                    <script>${swaggerJs}</script>
                    <style>${swaggerCss}</style>
                </head>
                <body>
                    <section id="swagger-container"></section>
                    <script>
                        SwaggerUIBundle({
                            url: '${apiPrefix}/doc.json',
                            dom_id: '#swagger-container',
                        });
                    </script>
                </body>
            </html>
        `);
        }

        next();
    };
}
