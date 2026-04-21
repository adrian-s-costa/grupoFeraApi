export default {
  "openapi": "3.0.0",
  "info": {
    "title": "[name] REST API Documentation",
    "version": "1.0.0"
  },
  "servers": [
    {
      "url": "http://127.0.0.1:3000",
      "description": "Development environment"
    },
    {
      "url": "undefined:undefined",
      "description": "Testing environment"
    },
    {
      "url": "https://ab24-2804-14c-7582-5093-8e55-2c16-5899-8fb9.ngrok-free.app",
      "description": "Ngrok environment"
    }
  ],
  "paths": {
    "/errors": {
      "get": {
        "summary": "Todos os possíveis erros que podem ocorrer na api",
        "description": "## - Abaixo, tem uma lista de todos os http status code que podem ser retornados pela api em caso de erro.\n## - Todos os erros possuem a mesma estrutura.\n",
        "tags": [
          "Documentação da API"
        ],
        "responses": {
          "400": {
            "$ref": "#/components/responses/400"
          },
          "401": {
            "$ref": "#/components/responses/401"
          },
          "403": {
            "$ref": "#/components/responses/403"
          },
          "404": {
            "$ref": "#/components/responses/404"
          },
          "409": {
            "$ref": "#/components/responses/409"
          },
          "415": {
            "$ref": "#/components/responses/415"
          },
          "500": {
            "$ref": "#/components/responses/500"
          }
        }
      }
    },
    "/admins/permissions": {
      "get": {
        "summary": "Rota utilizada para listar as permissões de admin",
        "tags": [
          "Gerencial - Colaboradores"
        ],
        "security": [
          {
            "BearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/PermissionSchema"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/admins": {
      "get": {
        "summary": "Rota utilizada para listar todos os usuários admins",
        "description": "## Como funciona a paginação nessa rota?\n### - Caso não sejam informados valores para 'page' e 'size', o retorno da api será um array com todos os registros.\n### - Caso sejam informados valores para 'page' e 'size', o retorno será semelhante ao response abaixo.\n",
        "tags": [
          "Gerencial - Colaboradores"
        ],
        "security": [
          {
            "BearerAuth": []
          }
        ],
        "parameters": [
          {
            "$ref": "#/components/parameters/AccountStatusParameter"
          },
          {
            "$ref": "#/components/parameters/SearchParameter"
          },
          {
            "$ref": "#/components/parameters/PageParameter"
          },
          {
            "$ref": "#/components/parameters/SizeParameter"
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "allOf": [
                    {
                      "type": "object",
                      "properties": {
                        "data": {
                          "type": "array",
                          "items": {
                            "allOf": [
                              {
                                "$ref": "#/components/schemas/AdminSchema"
                              }
                            ]
                          }
                        }
                      }
                    },
                    {
                      "$ref": "#/components/schemas/PaginationSchema"
                    }
                  ]
                }
              }
            }
          }
        }
      },
      "post": {
        "summary": "Rota utilizada para cadastrar um novo usuário admin",
        "description": "## - Ao criar a conta, uma senha aleatória para acessar o portal gerencial chegará por email.\n## - \"permissions\" é um array de ids. Os ids das permissões podem ser obtidos na rota GET /admins/permissions.\n",
        "tags": [
          "Gerencial - Colaboradores"
        ],
        "security": [
          {
            "BearerAuth": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/AdminSchema"
                  },
                  {
                    "$ref": "#/components/schemas/PermissionIdArraySchema"
                  }
                ]
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Created",
            "content": {
              "application/json": {
                "schema": {
                  "allOf": [
                    {
                      "$ref": "#/components/schemas/AdminSchema"
                    },
                    {
                      "$ref": "#/components/schemas/PermissionArraySchema"
                    }
                  ]
                }
              }
            }
          }
        }
      }
    },
    "/admins/{id}": {
      "parameters": [
        {
          "$ref": "#/components/parameters/IdParameter"
        }
      ],
      "get": {
        "summary": "Rota utilizada para exibir um usuário admin",
        "tags": [
          "Gerencial - Colaboradores"
        ],
        "security": [
          {
            "BearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "allOf": [
                    {
                      "$ref": "#/components/schemas/AdminSchema"
                    },
                    {
                      "$ref": "#/components/schemas/PermissionArraySchema"
                    }
                  ]
                }
              }
            }
          }
        }
      },
      "put": {
        "summary": "Rota utilizada para editar um usuário admin",
        "description": "## - \"permissions\" é um array de ids. Os ids das permissões podem ser obtidos na rota GET /admins/permissions.\n",
        "tags": [
          "Gerencial - Colaboradores"
        ],
        "security": [
          {
            "BearerAuth": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/AdminSchema"
                  },
                  {
                    "$ref": "#/components/schemas/PermissionIdArraySchema"
                  }
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "allOf": [
                    {
                      "$ref": "#/components/schemas/AdminSchema"
                    },
                    {
                      "$ref": "#/components/schemas/PermissionArraySchema"
                    }
                  ]
                }
              }
            }
          }
        }
      },
      "delete": {
        "summary": "Rota utilizada para deletar um usuário admin",
        "tags": [
          "Gerencial - Colaboradores"
        ],
        "security": [
          {
            "BearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "allOf": [
                    {
                      "$ref": "#/components/schemas/AdminSchema"
                    }
                  ]
                }
              }
            }
          }
        }
      }
    },
    "/admins/{id}/update-status": {
      "parameters": [
        {
          "$ref": "#/components/parameters/IdParameter"
        }
      ],
      "patch": {
        "summary": "Rota utilizada para ativar/inativar um usuário admin",
        "tags": [
          "Gerencial - Colaboradores"
        ],
        "security": [
          {
            "BearerAuth": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateStatusSchema"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "allOf": [
                    {
                      "$ref": "#/components/schemas/AdminSchema"
                    }
                  ]
                }
              }
            }
          }
        }
      }
    },
    "/auth/login/adm": {
      "post": {
        "summary": "Rota utilizada para login",
        "tags": [
          "Gerencial - Autenticação"
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/LoginInputAdminSchema"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/LoginAdminSchema"
                }
              }
            }
          }
        }
      }
    },
    "/auth/forgot-password/adm": {
      "post": {
        "summary": "Rota 01/02 para o fluxo de Esqueci a senha",
        "tags": [
          "Gerencial - Autenticação"
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ForgotPasswordAdminSchema"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SuccessSchema"
                },
                "example": {
                  "message": "Código de recuperação de senha enviado no seu email!"
                }
              }
            }
          }
        }
      }
    },
    "/auth/reset-password/adm": {
      "post": {
        "summary": "Rota 02/02 para o fluxo de Esqueci a senha",
        "tags": [
          "Gerencial - Autenticação"
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ResetPasswordAdminSchema"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SuccessSchema"
                },
                "example": {
                  "message": "Senha atualizada com sucesso!"
                }
              }
            }
          }
        }
      }
    },
    "/auth/login": {
      "post": {
        "summary": "Rota utilizada para login",
        "tags": [
          "User - Autenticação"
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/LoginInputUserSchema"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/LoginUserSchema"
                }
              }
            }
          }
        }
      }
    },
    "/auth/forgot-password": {
      "post": {
        "summary": "Rota 01/02 para o fluxo de Esqueci a senha",
        "tags": [
          "User - Autenticação"
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ForgotPasswordUserSchema"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SuccessSchema"
                },
                "example": {
                  "message": "Código de recuperação de senha enviado no seu email!"
                }
              }
            }
          }
        }
      }
    },
    "/auth/reset-password": {
      "post": {
        "summary": "Rota 02/02 para o fluxo de Esqueci a senha",
        "tags": [
          "User - Autenticação"
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ResetPasswordUserSchema"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SuccessSchema"
                },
                "example": {
                  "message": "Senha atualizada com sucesso!"
                }
              }
            }
          }
        }
      }
    },
    "/auth/google": {
      "post": {
        "summary": "Login with Google",
        "tags": [
          "User - Autenticação"
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/LoginUserSchema"
                }
              }
            }
          }
        }
      }
    },
    "/auth/google/alt": {
      "get": {
        "summary": "Alternative Google login",
        "tags": [
          "User - Autenticação"
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/auth/google/native": {
      "post": {
        "summary": "Native Google login",
        "tags": [
          "User - Autenticação"
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/LoginUserSchema"
                }
              }
            }
          }
        }
      }
    },
    "/auth/google/register-native": {
      "post": {
        "summary": "Register with Google native",
        "tags": [
          "User - Autenticação"
        ],
        "responses": {
          "201": {
            "description": "Created",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/LoginUserSchema"
                }
              }
            }
          }
        }
      }
    },
    "/auth/google/callback": {
      "get": {
        "summary": "Google callback",
        "tags": [
          "User - Autenticação"
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/auth/forgot-google": {
      "post": {
        "summary": "Forgot password for Google user",
        "tags": [
          "User - Autenticação"
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ForgotPasswordUserSchema"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SuccessSchema"
                }
              }
            }
          }
        }
      }
    },
    "/auth/check-code": {
      "post": {
        "summary": "Check code",
        "tags": [
          "User - Autenticação"
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CheckCodeSchema"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SuccessSchema"
                }
              }
            }
          }
        }
      }
    },
    "/auth/update-user": {
      "post": {
        "summary": "Update user data",
        "tags": [
          "User - Autenticação"
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateUserSchema"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/LoginUserSchema"
                }
              }
            }
          }
        }
      }
    },
    "/auth/delete-user": {
      "post": {
        "summary": "Delete user",
        "tags": [
          "User - Autenticação"
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/DeleteUserSchema"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SuccessSchema"
                }
              }
            }
          }
        }
      }
    },
    "/auth/get-user/{email}": {
      "parameters": [
        {
          "name": "email",
          "in": "path",
          "required": true,
          "schema": {
            "type": "string"
          }
        }
      ],
      "get": {
        "summary": "Get user by email",
        "tags": [
          "User - Autenticação"
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AccountUserSchema"
                }
              }
            }
          }
        }
      }
    },
    "/auth/get-document/{email}": {
      "parameters": [
        {
          "name": "email",
          "in": "path",
          "required": true,
          "schema": {
            "type": "string"
          }
        }
      ],
      "get": {
        "summary": "Get document by email",
        "tags": [
          "User - Autenticação"
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/auth/club/smartlink/{initials}": {
      "parameters": [
        {
          "name": "initials",
          "in": "path",
          "required": true,
          "schema": {
            "type": "string"
          }
        }
      ],
      "get": {
        "summary": "Get smartlink by initials",
        "tags": [
          "User - Autenticação"
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/brands/search": {
      "get": {
        "summary": "Rota utilizada para buscar marcas por nome",
        "tags": [
          "Marcas"
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/brands": {
      "post": {
        "summary": "Rota utilizada para criar uma marca",
        "tags": [
          "Marcas"
        ],
        "responses": {
          "201": {
            "description": "Created"
          }
        }
      }
    },
    "/contact": {
      "post": {
        "summary": "Rota utilizada para entrar em contato (fale conosco)",
        "tags": [
          "Gerencial - Contato",
          "User - Contato"
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ContactSchema"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SuccessSchema"
                },
                "example": {
                  "message": "Mensagem enviada com sucesso! Em breve entraremos em contato."
                }
              }
            }
          }
        }
      }
    },
    "/coupons": {
      "get": {
        "summary": "Rota utilizada para listar cupons",
        "tags": [
          "Cupons"
        ],
        "security": [
          {
            "BearerAuth": []
          }
        ],
        "parameters": [
          {
            "$ref": "#/components/parameters/SearchParameter"
          },
          {
            "$ref": "#/components/parameters/PageParameter"
          },
          {
            "$ref": "#/components/parameters/SizeParameter"
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "allOf": [
                    {
                      "type": "object",
                      "properties": {
                        "data": {
                          "type": "array",
                          "items": {
                            "$ref": "#/components/schemas/CouponSchema"
                          }
                        }
                      }
                    },
                    {
                      "$ref": "#/components/schemas/PaginationSchema"
                    }
                  ]
                }
              }
            }
          }
        }
      },
      "post": {
        "summary": "Rota utilizada para criar um cupom",
        "tags": [
          "Cupons"
        ],
        "security": [
          {
            "BearerAuth": []
          }
        ],
        "responses": {
          "201": {
            "description": "Created"
          }
        }
      }
    },
    "/coupons/{id}": {
      "parameters": [
        {
          "$ref": "#/components/parameters/IdParameter"
        }
      ],
      "get": {
        "summary": "Rota utilizada para exibir um cupom",
        "tags": [
          "Cupons"
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CouponSchema"
                }
              }
            }
          }
        }
      },
      "put": {
        "summary": "Rota utilizada para editar um cupom",
        "tags": [
          "Cupons"
        ],
        "security": [
          {
            "BearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      },
      "delete": {
        "summary": "Rota utilizada para deletar um cupom",
        "tags": [
          "Cupons"
        ],
        "security": [
          {
            "BearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/courses": {
      "get": {
        "summary": "Rota utilizada para listar cursos",
        "tags": [
          "Cursos"
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/courses/{id}": {
      "parameters": [
        {
          "$ref": "#/components/parameters/IdParameter"
        }
      ],
      "get": {
        "summary": "Rota utilizada para exibir um curso",
        "tags": [
          "Cursos"
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/courses/{id}/comment": {
      "parameters": [
        {
          "$ref": "#/components/parameters/IdParameter"
        }
      ],
      "post": {
        "summary": "Rota utilizada para postar comentário em um curso",
        "tags": [
          "Cursos"
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CommentSchema"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Created"
          }
        }
      }
    },
    "/dealerships": {
      "get": {
        "summary": "Rota utilizada para listar concessionárias",
        "tags": [
          "Concessionárias"
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      },
      "post": {
        "summary": "Rota utilizada para criar uma concessionária",
        "tags": [
          "Concessionárias"
        ],
        "responses": {
          "201": {
            "description": "Created"
          }
        }
      }
    },
    "/dealerships/{id}": {
      "parameters": [
        {
          "$ref": "#/components/parameters/IdParameter"
        }
      ],
      "get": {
        "summary": "Rota utilizada para exibir uma concessionária",
        "tags": [
          "Concessionárias"
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/faqs": {
      "get": {
        "summary": "Rota utilizada para listar as faqs",
        "description": "## Como funciona a paginação nessa rota?\n### - Caso não sejam informados valores para 'page' e 'size', o retorno da api será um array com todos os registros.\n### - Caso sejam informados valores para 'page' e 'size', o retorno será semelhante ao response abaixo.\n",
        "tags": [
          "Gerencial - Faqs",
          "User - Faqs"
        ],
        "parameters": [
          {
            "$ref": "#/components/parameters/SearchParameter"
          },
          {
            "$ref": "#/components/parameters/PageParameter"
          },
          {
            "$ref": "#/components/parameters/SizeParameter"
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "allOf": [
                    {
                      "type": "object",
                      "properties": {
                        "data": {
                          "type": "array",
                          "items": {
                            "allOf": [
                              {
                                "$ref": "#/components/schemas/FaqSchema"
                              }
                            ]
                          }
                        }
                      }
                    },
                    {
                      "$ref": "#/components/schemas/PaginationSchema"
                    }
                  ]
                }
              }
            }
          }
        }
      },
      "post": {
        "summary": "Rota utilizada para cadastrar uma faq",
        "tags": [
          "Gerencial - Faqs"
        ],
        "security": [
          {
            "BearerAuth": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/FaqSchema"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Created",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/FaqSchema"
                }
              }
            }
          }
        }
      }
    },
    "/faqs/{id}": {
      "parameters": [
        {
          "$ref": "#/components/parameters/IdParameter"
        }
      ],
      "get": {
        "summary": "Rota utilizada para exibir uma faq",
        "tags": [
          "Gerencial - Faqs"
        ],
        "security": [
          {
            "BearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "allOf": [
                    {
                      "$ref": "#/components/schemas/FaqSchema"
                    }
                  ]
                }
              }
            }
          }
        }
      },
      "put": {
        "summary": "Rota utilizada para editar uma faq",
        "description": "## - Não tem necessidade de enviar todos os campos novamente. Só precisa enviar aqueles que deseja editar.\n",
        "tags": [
          "Gerencial - Faqs"
        ],
        "security": [
          {
            "BearerAuth": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/FaqSchema"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/FaqSchema"
                }
              }
            }
          }
        }
      },
      "delete": {
        "summary": "Rota utilizada para deletar uma faq",
        "tags": [
          "Gerencial - Faqs"
        ],
        "security": [
          {
            "BearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/FaqSchema"
                }
              }
            }
          }
        }
      }
    },
    "/offers": {
      "get": {
        "summary": "Rota utilizada para listar ofertas",
        "tags": [
          "Ofertas"
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/offers/notification": {
      "post": {
        "summary": "Rota utilizada para verificar notificação de oferta",
        "tags": [
          "Ofertas"
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/offers/{id}": {
      "parameters": [
        {
          "$ref": "#/components/parameters/IdParameter"
        }
      ],
      "get": {
        "summary": "Rota utilizada para exibir uma oferta",
        "tags": [
          "Ofertas"
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/offers/collabs": {
      "get": {
        "summary": "Rota utilizada para listar colaborações de ofertas",
        "tags": [
          "Ofertas"
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/process_payment": {
      "post": {
        "summary": "Rota utilizada para criar pagamento",
        "tags": [
          "Pagamentos"
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/process_payment/preference": {
      "post": {
        "summary": "Rota utilizada para criar preferência de pagamento",
        "tags": [
          "Pagamentos"
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/process_payment/teste": {
      "post": {
        "summary": "Rota de teste para webhook",
        "tags": [
          "Pagamentos"
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/process_payment/push": {
      "post": {
        "summary": "Rota para push de pagamento",
        "tags": [
          "Pagamentos"
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/process_payment/save-sub": {
      "post": {
        "summary": "Rota para salvar assinatura",
        "tags": [
          "Pagamentos"
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/process_payment/preapproval": {
      "post": {
        "summary": "Rota para criar pré-aprovação",
        "tags": [
          "Pagamentos"
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/texts": {
      "parameters": [
        {
          "$ref": "#/components/parameters/TextTypeParameter"
        }
      ],
      "get": {
        "summary": "Rota utilizada para exibir um texto (termos de uso, políticas de privacidade e sobre)",
        "tags": [
          "Gerencial - Textos",
          "User - Textos"
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/TextSchema"
                }
              }
            }
          }
        }
      },
      "put": {
        "summary": "Rota utilizada para editar um texto (termos de uso, políticas de privacidade e sobre)",
        "tags": [
          "Gerencial - Textos"
        ],
        "security": [
          {
            "BearerAuth": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/TextSchema"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/TextSchema"
                }
              }
            }
          }
        }
      }
    },
    "/tvmax": {
      "get": {
        "summary": "Rota utilizada para listar shows do TV Max",
        "tags": [
          "TV Max"
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/tvmax/{id}": {
      "parameters": [
        {
          "$ref": "#/components/parameters/IdParameter"
        }
      ],
      "get": {
        "summary": "Rota utilizada para exibir um show do TV Max",
        "tags": [
          "TV Max"
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/upload-file": {
      "post": {
        "summary": "Rota utilizada para fazer upload de um arquivo",
        "description": "## - Algumas rotas solicitam o envio de arquivos (e.g. fotos, pdf, planilhas, etc).\n## - Essa API utiliza apenas application/json como Content-Type no request body.\n## - Logo, basta enviar a url do arquivo no JSON, que pode ser obtida nessa rota.\n",
        "tags": [
          "Gerencial - Upload de arquivo",
          "User - Upload de arquivo"
        ],
        "requestBody": {
          "required": true,
          "content": {
            "multipart/form-data": {
              "schema": {
                "$ref": "#/components/schemas/UploadRequestBodySchema"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Created",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UploadSchema"
                }
              }
            }
          }
        }
      }
    },
    "/videoHome": {
      "get": {
        "summary": "Rota utilizada para obter vídeos da home",
        "tags": [
          "Vídeos Home"
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/videos": {
      "get": {
        "summary": "Rota utilizada para listar todos os vídeos",
        "tags": [
          "Vídeos"
        ],
        "parameters": [
          {
            "$ref": "#/components/parameters/SearchParameter"
          },
          {
            "$ref": "#/components/parameters/PageParameter"
          },
          {
            "$ref": "#/components/parameters/SizeParameter"
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "allOf": [
                    {
                      "type": "object",
                      "properties": {
                        "data": {
                          "type": "array",
                          "items": {
                            "$ref": "#/components/schemas/VideoSchema"
                          }
                        }
                      }
                    },
                    {
                      "$ref": "#/components/schemas/PaginationSchema"
                    }
                  ]
                }
              }
            }
          }
        }
      }
    },
    "/videos/{id}": {
      "parameters": [
        {
          "$ref": "#/components/parameters/IdParameter"
        }
      ],
      "get": {
        "summary": "Rota utilizada para exibir um vídeo",
        "tags": [
          "Vídeos"
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/VideoSchema"
                }
              }
            }
          }
        }
      }
    },
    "/videos/{id}/comment": {
      "parameters": [
        {
          "$ref": "#/components/parameters/IdParameter"
        }
      ],
      "post": {
        "summary": "Rota utilizada para postar um comentário em um vídeo",
        "tags": [
          "Vídeos"
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CommentSchema"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Created"
          }
        }
      }
    },
    "/videos/{id}/like/{action}": {
      "parameters": [
        {
          "$ref": "#/components/parameters/IdParameter"
        },
        {
          "name": "action",
          "in": "path",
          "required": true,
          "schema": {
            "type": "string"
          }
        }
      ],
      "post": {
        "summary": "Rota utilizada para dar like ou dislike em um vídeo",
        "tags": [
          "Vídeos"
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/videos/{id}/view": {
      "parameters": [
        {
          "$ref": "#/components/parameters/IdParameter"
        }
      ],
      "post": {
        "summary": "Rota utilizada para registrar uma visualização em um vídeo",
        "tags": [
          "Vídeos"
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/videos/{id}/campaign/view": {
      "parameters": [
        {
          "$ref": "#/components/parameters/IdParameter"
        }
      ],
      "post": {
        "summary": "Rota utilizada para registrar visualização de campanha",
        "tags": [
          "Vídeos"
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/videos/{id}/campaign/click": {
      "parameters": [
        {
          "$ref": "#/components/parameters/IdParameter"
        }
      ],
      "post": {
        "summary": "Rota utilizada para registrar clique de campanha",
        "tags": [
          "Vídeos"
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/videos/{id}/contact": {
      "parameters": [
        {
          "$ref": "#/components/parameters/IdParameter"
        }
      ],
      "post": {
        "summary": "Rota utilizada para contato via vídeo",
        "tags": [
          "Vídeos"
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/videos/{id}/comment/{commentId}": {
      "parameters": [
        {
          "$ref": "#/components/parameters/IdParameter"
        },
        {
          "name": "commentId",
          "in": "path",
          "required": true,
          "schema": {
            "type": "string"
          }
        }
      ],
      "post": {
        "summary": "Rota utilizada para responder a um comentário",
        "tags": [
          "Vídeos"
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/videos/courses": {
      "get": {
        "summary": "Rota utilizada para listar cursos",
        "tags": [
          "Vídeos"
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/videos/courses/{id}": {
      "parameters": [
        {
          "$ref": "#/components/parameters/IdParameter"
        }
      ],
      "get": {
        "summary": "Rota utilizada para exibir um curso",
        "tags": [
          "Vídeos"
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "PermissionSchema": {
        "type": "object",
        "readOnly": true,
        "properties": {
          "id": {
            "type": "number",
            "example": 1
          },
          "title": {
            "type": "string",
            "example": "Dashboard"
          }
        }
      },
      "PermissionArraySchema": {
        "type": "object",
        "readOnly": true,
        "properties": {
          "permissions": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/PermissionSchema"
            }
          }
        }
      },
      "PermissionIdArraySchema": {
        "type": "object",
        "writeOnly": true,
        "properties": {
          "permissions": {
            "$ref": "#/components/schemas/ArrayNumbers"
          }
        }
      },
      "AdminSchema": {
        "type": "object",
        "properties": {
          "id": {
            "type": "number",
            "readOnly": true,
            "example": 1
          },
          "name": {
            "type": "string",
            "required": true,
            "example": "Admin 01"
          },
          "email": {
            "type": "string",
            "required": true,
            "example": "admin@getnada.com"
          },
          "status": {
            "type": "string",
            "readOnly": true,
            "example": "ativo"
          },
          "imageUrl": {
            "type": "string",
            "example": "campo opcional"
          },
          "createdAt": {
            "type": "date",
            "readOnly": true,
            "example": "2023-01-01T00:19:12.088Z"
          },
          "updatedAt": {
            "type": "date",
            "readOnly": true,
            "example": "2023-01-01T00:19:12.088Z"
          }
        }
      },
      "AccountAdminSchema": {
        "type": "object",
        "properties": {
          "id": {
            "type": "number",
            "example": 1
          },
          "role": {
            "type": "string",
            "example": "admin"
          },
          "name": {
            "type": "string",
            "example": "Admin 01"
          }
        }
      },
      "LoginAdminSchema": {
        "type": "object",
        "properties": {
          "account": {
            "$ref": "#/components/schemas/AccountAdminSchema"
          },
          "token": {
            "type": "string"
          }
        }
      },
      "LoginInputAdminSchema": {
        "type": "object",
        "properties": {
          "credential": {
            "type": "string",
            "required": true,
            "example": "admin@email.com"
          },
          "password": {
            "type": "string",
            "required": true,
            "example": "123456789"
          }
        }
      },
      "ForgotPasswordAdminSchema": {
        "type": "object",
        "properties": {
          "credential": {
            "type": "string",
            "required": true,
            "example": "admin@email.com"
          }
        }
      },
      "ResetPasswordAdminSchema": {
        "type": "object",
        "properties": {
          "credential": {
            "type": "string",
            "required": true,
            "example": "admin@email.com"
          },
          "code": {
            "type": "string",
            "required": true,
            "example": "1234"
          },
          "password": {
            "type": "string",
            "required": true,
            "example": "12345789"
          },
          "confirmPassword": {
            "type": "string",
            "required": true,
            "example": "12345789"
          }
        }
      },
      "AccountUserSchema": {
        "type": "object",
        "properties": {
          "id": {
            "type": "number",
            "example": 1
          },
          "role": {
            "type": "string",
            "example": "user"
          },
          "type": {
            "type": "string",
            "example": "web"
          },
          "name": {
            "type": "string",
            "example": "User 01"
          }
        }
      },
      "LoginUserSchema": {
        "type": "object",
        "properties": {
          "account": {
            "$ref": "#/components/schemas/AccountUserSchema"
          },
          "token": {
            "type": "string"
          }
        }
      },
      "LoginInputUserSchema": {
        "type": "object",
        "properties": {
          "credential": {
            "type": "string",
            "required": true,
            "example": "user@email.com"
          },
          "password": {
            "type": "string",
            "required": true,
            "example": "123456789"
          }
        }
      },
      "ForgotPasswordUserSchema": {
        "type": "object",
        "properties": {
          "credential": {
            "type": "string",
            "required": true,
            "example": "user@email.com"
          }
        }
      },
      "ResetPasswordUserSchema": {
        "type": "object",
        "properties": {
          "credential": {
            "type": "string",
            "required": true,
            "example": "user@email.com"
          },
          "code": {
            "type": "string",
            "required": true,
            "example": "1234"
          },
          "password": {
            "type": "string",
            "required": true,
            "example": "12345789"
          },
          "confirmPassword": {
            "type": "string",
            "required": true,
            "example": "12345789"
          }
        }
      },
      "CheckCodeSchema": {
        "type": "object",
        "properties": {
          "code": {
            "type": "string",
            "example": "1234"
          },
          "credential": {
            "type": "string",
            "example": "user@email.com"
          }
        }
      },
      "UpdateUserSchema": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "example": "1"
          },
          "name": {
            "type": "string",
            "example": "User Name"
          },
          "secName": {
            "type": "string",
            "example": "User SecName"
          },
          "tel": {
            "type": "string",
            "example": "123456789"
          },
          "bornDate": {
            "type": "string",
            "example": "1990-01-01"
          },
          "cep": {
            "type": "string",
            "example": "12345678"
          },
          "localidade": {
            "type": "string",
            "example": "City"
          },
          "uf": {
            "type": "string",
            "example": "SP"
          },
          "pfpUrl": {
            "type": "string",
            "nullable": true,
            "example": "http://example.com/pfp.jpg"
          }
        }
      },
      "DeleteUserSchema": {
        "type": "object",
        "properties": {
          "credential": {
            "type": "string",
            "example": "user@email.com"
          },
          "initials": {
            "type": "string",
            "example": "ABC"
          }
        }
      },
      "ContactSchema": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "required": true,
            "example": "User teste"
          },
          "email": {
            "type": "string",
            "required": true,
            "example": "user@email.com"
          },
          "message": {
            "type": "string",
            "required": true,
            "example": "Mensagem de teste"
          }
        }
      },
      "FaqSchema": {
        "type": "object",
        "properties": {
          "id": {
            "type": "number",
            "readOnly": true,
            "example": 1
          },
          "question": {
            "type": "string",
            "required": true,
            "example": "Pergunta 01"
          },
          "answer": {
            "type": "string",
            "required": true,
            "example": "Resposta 01"
          },
          "createdAt": {
            "type": "date",
            "readOnly": true,
            "example": "2023-01-01T00:19:12.088Z"
          },
          "updatedAt": {
            "type": "date",
            "readOnly": true,
            "example": "2023-01-01T00:19:12.088Z"
          }
        }
      },
      "TextSchema": {
        "type": "object",
        "properties": {
          "id": {
            "type": "number",
            "readOnly": true,
            "example": 1
          },
          "type": {
            "type": "string",
            "readOnly": true,
            "example": "about"
          },
          "content": {
            "type": "string",
            "required": true,
            "example": "Texto aqui"
          },
          "createdAt": {
            "type": "date",
            "readOnly": true,
            "example": "2023-01-01T00:19:12.088Z"
          },
          "updatedAt": {
            "type": "date",
            "readOnly": true,
            "example": "2023-01-01T00:19:12.088Z"
          }
        }
      },
      "UpdateStatusSchema": {
        "type": "object",
        "properties": {
          "status": {
            "type": "string",
            "required": true,
            "example": "ativo ou inativo"
          }
        }
      },
      "UploadSchema": {
        "type": "object",
        "properties": {
          "url": {
            "type": "string",
            "readOnly": true,
            "example": "http://site.com/files/file01.png"
          }
        }
      },
      "UploadRequestBodySchema": {
        "type": "object",
        "properties": {
          "file": {
            "type": "string",
            "format": "binary"
          }
        }
      },
      "ErrorSchema": {
        "type": "object",
        "properties": {
          "error": {
            "type": "string"
          }
        }
      },
      "SuccessSchema": {
        "type": "object",
        "properties": {
          "message": {
            "type": "string"
          }
        }
      },
      "PaginationSchema": {
        "type": "object",
        "properties": {
          "totalItems": {
            "type": "number",
            "example": 100
          },
          "totalPages": {
            "type": "number",
            "example": 4
          },
          "itemsPerPage": {
            "type": "number",
            "example": 25
          },
          "page": {
            "type": "number",
            "example": 1
          }
        }
      },
      "ArrayNumbers": {
        "type": "array",
        "items": {
          "type": "number",
          "example": 1
        }
      }
    },
    "parameters": {
      "IdParameter": {
        "in": "path",
        "name": "id",
        "required": true,
        "schema": {
          "type": "number",
          "example": 1
        }
      },
      "SizeParameter": {
        "in": "query",
        "name": "size",
        "schema": {
          "type": "number",
          "example": 10
        }
      },
      "PageParameter": {
        "in": "query",
        "name": "page",
        "schema": {
          "type": "number",
          "example": 1
        }
      },
      "AccountStatusParameter": {
        "in": "query",
        "name": "status",
        "schema": {
          "type": "string",
          "enum": [
            "ativo",
            "inativo",
            "pendente"
          ]
        }
      },
      "AccountRoleParameter": {
        "in": "query",
        "name": "role",
        "schema": {
          "type": "string",
          "enum": [
            "admin",
            "user"
          ]
        }
      },
      "SearchParameter": {
        "in": "query",
        "name": "search",
        "schema": {
          "type": "string",
          "example": "string"
        }
      },
      "TextTypeParameter": {
        "in": "query",
        "name": "type",
        "required": true,
        "schema": {
          "type": "string",
          "enum": [
            "about",
            "terms",
            "privacy"
          ]
        }
      }
    },
    "responses": {
      "400": {
        "description": "Bad Request",
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/ErrorSchema"
            },
            "example": {
              "error": "Parâmetro foo é obrigatório."
            }
          }
        }
      },
      "401": {
        "description": "Unauthorized",
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/ErrorSchema"
            },
            "example": {
              "error": "Você precisa estar autenticado para prosseguir."
            }
          }
        }
      },
      "403": {
        "description": "Forbidden",
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/ErrorSchema"
            },
            "example": {
              "error": "Sem permissão para acessar esse recurso."
            }
          }
        }
      },
      "404": {
        "description": "Not Found",
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/ErrorSchema"
            },
            "example": {
              "error": "Recurso não encontrado na base de dados."
            }
          }
        }
      },
      "409": {
        "description": "Conflict",
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/ErrorSchema"
            },
            "example": {
              "error": "Recurso já cadastrado na base de dados."
            }
          }
        }
      },
      "415": {
        "description": "Unsupported Media Type",
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/ErrorSchema"
            },
            "example": {
              "error": "Tipo de arquivo não suportado."
            }
          }
        }
      },
      "500": {
        "description": "Internal Server Error",
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/ErrorSchema"
            },
            "example": {
              "error": "Erro interno no servidor."
            }
          }
        }
      }
    },
    "securitySchemes": {
      "BearerAuth": {
        "type": "http",
        "scheme": "bearer"
      }
    }
  },
  "tags": [
    {
      "name": "Documentação da API"
    },
    {
      "name": "--"
    },
    {
      "name": "Gerencial - Autenticação"
    },
    {
      "name": "Gerencial - Colaboradores"
    },
    {
      "name": "Gerencial - Contato"
    },
    {
      "name": "Gerencial - Faqs"
    },
    {
      "name": "Gerencial - Textos"
    },
    {
      "name": "Gerencial - Upload de arquivo"
    },
    {
      "name": "---"
    },
    {
      "name": "User - Autenticação"
    },
    {
      "name": "User - Contato"
    },
    {
      "name": "User - Faqs"
    },
    {
      "name": "User - Textos"
    },
    {
      "name": "User - Upload de arquivo"
    }
  ]
};