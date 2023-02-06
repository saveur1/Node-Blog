const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const UserPath = require("./user.swagger");
const blogPath = require("./blog.swagger");

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
          version: '1.0.0',
          title: 'Blogs Api',
          description: 'Blog api configurations',
        },
        tags: [
            { name: 'User', description: 'User Routes' },
            { name: 'Blog', description: 'Blog Routes' },
          ],
        servers: [
          {
            url: 'http://localhost:6700',
            description: 'Development server',
          }
        ],
        components: {
          securitySchemes: { 
            token: {
              type: 'apiKey',
              scheme: 'bearer',
              bearerFormat: 'JWT',
              name:"token",
              in:"header"
            },
          },
        },
        paths: {...(UserPath.UserDocs),...(blogPath.blogDocs)},
      },
      apis: ['./routes/*.js'],
}

const swaggerSpec = swaggerJsDoc(options)

const swaggerDocumentation  = (app) => {
    app.use("/documentation",swaggerUi.serve,swaggerUi.setup(swaggerSpec))
}
module.exports = swaggerDocumentation;