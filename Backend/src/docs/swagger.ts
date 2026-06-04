const swaggerDocument = {
  openapi: "3.0.0",

  info: {
    title: "Employee Management API",
    version: "1.0.0",
    description:
      "Employee Management System using Express, TypeScript, Prisma ORM, PostgreSQL, JWT Authentication, Refresh Tokens and Role Based Authorization"
  },

  servers: [
    {
      url: "http://localhost:3000"
    }
  ],

  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    },

    schemas: {

      LoginRequest: {
        type: "object",
        properties: {
          email: {
            type: "string"
          },
          password: {
            type: "string"
          }
        }
      },

      RegisterRequest: {
        type: "object",
        properties: {
          username: {
            type: "string"
          },
          email: {
            type: "string"
          },
          password: {
            type: "string"
          }
        }
      },

      Department: {
        type: "object",
        properties: {
          id: {
            type: "integer"
          },
          name: {
            type: "string"
          }
        }
      },

      Employee: {
        type: "object",
        properties: {
          id: {
            type: "integer"
          },
          firstName: {
            type: "string"
          },
          lastName: {
            type: "string"
          },
          email: {
            type: "string"
          },
          salary: {
            type: "number"
          },
          departmentId: {
            type: "integer"
          }
        }
      }
    }
  },

  paths: {

    "/auth/register": {
      post: {
        tags: ["Authentication"],
        summary: "Register User",

        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref:
                  "#/components/schemas/RegisterRequest"
              }
            }
          }
        },

        responses: {
          "201": {
            description:
              "User Registered Successfully"
          }
        }
      }
    },

    "/auth/login": {
      post: {
        tags: ["Authentication"],
        summary: "Login User",

        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref:
                  "#/components/schemas/LoginRequest"
              }
            }
          }
        },

        responses: {
          "200": {
            description:
              "Login Successful"
          }
        }
      }
    },

    "/auth/refresh": {
      post: {
        tags: ["Authentication"],
        summary:
          "Generate New Access Token",

        responses: {
          "200": {
            description:
              "Access Token Generated"
          }
        }
      }
    },

    "/auth/logout": {
      post: {
        tags: ["Authentication"],
        summary: "Logout User",

        security: [
          {
            bearerAuth: []
          }
        ],

        responses: {
          "200": {
            description:
              "Logout Successful"
          }
        }
      }
    },

    "/users": {
      get: {
        tags: ["Users"],
        summary:
          "Get All Users",

        security: [
          {
            bearerAuth: []
          }
        ],

        responses: {
          "200": {
            description:
              "Users Retrieved"
          }
        }
      }
    },

    "/departments": {
      get: {
        tags: ["Departments"],
        summary:
          "Get All Departments",

        security: [
          {
            bearerAuth: []
          }
        ],

        responses: {
          "200": {
            description:
              "Departments Retrieved"
          }
        }
      },

      post: {
        tags: ["Departments"],
        summary:
          "Create Department",

        security: [
          {
            bearerAuth: []
          }
        ],

        responses: {
          "201": {
            description:
              "Department Created"
          }
        }
      }
    },

    "/employees": {
      get: {
        tags: ["Employees"],
        summary:
          "Get All Employees",

        security: [
          {
            bearerAuth: []
          }
        ],

        responses: {
          "200": {
            description:
              "Employees Retrieved"
          }
        }
      },

      post: {
        tags: ["Employees"],
        summary:
          "Create Employee",

        security: [
          {
            bearerAuth: []
          }
        ],

        responses: {
          "201": {
            description:
              "Employee Created"
          }
        }
      }
    },

    "/employees/{id}": {
      get: {
        tags: ["Employees"],
        summary:
          "Get Employee By Id",

        security: [
          {
            bearerAuth: []
          }
        ],

        responses: {
          "200": {
            description:
              "Employee Retrieved"
          }
        }
      },

      put: {
        tags: ["Employees"],
        summary:
          "Update Employee",

        security: [
          {
            bearerAuth: []
          }
        ],

        responses: {
          "200": {
            description:
              "Employee Updated"
          }
        }
      },

      delete: {
        tags: ["Employees"],
        summary:
          "Delete Employee",

        security: [
          {
            bearerAuth: []
          }
        ],

        responses: {
          "200": {
            description:
              "Employee Deleted"
          }
        }
      }
    }
  }
};

export default swaggerDocument;