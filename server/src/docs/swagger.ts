import { Config } from "../config";
import * as swagger from 'swagger-ui-express';

const document = {
    'swagger': '3.0',
    'info': {
        'title': 'RSVP Man',
        'description': 'An app for RSVP-ing to parties',
        'version': '1.0'
    },
    'produces': ['application/json'],
    'paths': {
        '/api/auth/local': {
            'post': {
                summary: 'Log in and get a token',
                consumes: ['application/json'],
                produces: ['application/json'],
                parameters: [
                    {
                        in: 'body',
                        name: 'body',
                        description: 'user credentials',
                        required: true,
                        schema: {
                            type: 'object',
                            required: ['email', 'password'],
                            properties: {
                                email: {
                                    type: 'string'
                                },
                                password: {
                                    type: 'string'
                                }
                            }
                        }
                    }
                ],
                responses: {
                    200: {
                        description: 'success',
                        schema: {
                            type: 'object',
                            properties: {
                                token: {
                                    type: 'string'
                                }
                            }
                        }
                    },
                    400: {
                        description: 'invalid parameters'
                    },
                    500: {
                        description: 'server error'
                    }
                }
            }
        },
        '/api/info': {
            'get': {
                summary: 'Get the basic event info',
                produces: ['application/json'],
                responses: {
                    200: {
                        description: 'success',
                        schema: {
                            type: 'object',
                            properties: {
                                'name': {
                                    type: 'string'
                                },
                                'date': {
                                    type: 'date'
                                },
                                'thankYouMessage': {
                                    type: 'string'
                                }
                            }
                        }
                    }
                }
            }
        },
        '/api/users': {
            'get': {
                summary: 'Get list of users',
                produces: ['application/json'],
                parameters: [
                    {
                        in: 'header',
                        name: 'Authorization',
                        description: 'Auth token',
                        required: true,
                        example: 'Bearer xxx'
                    }
                ],
                responses: {
                    200: {
                        description: 'success',
                        schema: {
                            type: 'array',
                            items: {
                                $ref: '#/definitions/User'
                            }
                        }
                    }
                }
            },
            'post': {
                summary: 'Create a user',
                produces: ['application/json'],
                consumes: ['application/json'],
                parameters: [
                    {
                        in: 'header',
                        name: 'Authorization',
                        description: 'Auth token',
                        required: true,
                        example: 'Bearer xxx'
                    },
                    {
                        in: 'body',
                        name: 'body',
                        description: 'A new user to create',
                        required: true,
                        schema: {
                            $ref: '#/definitions/User'
                        }                        

                    }
                ],
                responses: {
                    200: {
                        description: 'success',
                        schema: {
                            $ref: '#/definitions/User'
                        }
                    }
                }
            }
            
        },
        '/api/users/{id}': {
            'delete': {
                summary: 'Delete a user',
                parameters: [
                    {
                        in: 'header',
                        name: 'Authorization',
                        description: 'Auth token',
                        required: true,
                        example: 'Bearer xxx'
                    },
                    {
                        in: 'path',
                        name: 'id',
                        description: 'The id of the user to delete',
                        required: true,
                        type: 'string'                    
                    }
                ],
                responses: {
                    202: {
                        description: 'success'
                    }
                }
            }
        },
        '/api/parties': {
            'post': {
                summary: 'Create a new party',
                consumes: ['application/json'],
                produces: ['application/json'],
                parameters: [
                    {
                        in: 'header',
                        name: 'Authorization',
                        description: 'Auth token',
                        required: true,
                        example: 'Bearer xxx'
                    },
                    {
                        in: 'body',
                        name: 'body',
                        description: 'Party to create',
                        required: true,
                        schema: {
                            $ref: '#/definitions/Party'
                        }
                    }
                ],
                responses: {
                    201: {
                        description: 'success',
                        schema: {
                            $ref: '#/definitions/Party'
                        }
                    }
                }
            },
            'get': {
                summary: 'Get a list of all parties',
                produces: ['application/json'],
                parameters: [
                    {
                        in: 'header',
                        name: 'Authorization',
                        description: 'Auth token',
                        required: true,
                        example: 'Bearer xxx'
                    }
                ],
                responses: {
                    200: {
                        description: 'success',
                        schema: {
                            type: 'array',
                            items: {
                                $ref: '#/definitions/Party'
                            }
                        }
                    }
                }
            }
        },
        '/api/parties/{id}': {
            'put': {
                summary: 'Update an existing party',
                consumes: ['application/json'],
                produces: ['application/json'],
                parameters: [
                    {
                        in: 'header',
                        name: 'Authorization',
                        description: 'Auth token',
                        required: true,
                        example: 'Bearer xxx'
                    },
                    {
                        in: 'path',
                        name: 'id',
                        description: '_id property of the party to update',
                        required: true
                    },
                    {
                        in: 'body',
                        name: 'body',
                        description: 'Party to update\'s details',
                        required: true,
                        schema: {
                            $ref: '#/definitions/Party'
                        }
                    }
                ],
                responses: {
                    202: {
                        description: 'success',
                        schema: {
                            $ref: '#/definitions/Party'
                        }
                    }
                }
            },
            'delete': {
                summary: 'Delete an existing party',
                consumes: ['application/json'],
                produces: ['application/json'],
                parameters: [
                    {
                        in: 'header',
                        name: 'Authorization',
                        description: 'Auth token',
                        required: true,
                        example: 'Bearer xxx'
                    },
                    {
                        in: 'path',
                        name: 'id',
                        description: '_id property of the party to delete',
                        required: true
                    }
                ],
                responses: {
                    202: {
                        description: 'success'
                    }
                }
            },
        },
        '/api/rsvp/{key}': {
            get: {
                summary: 'Get the RSVP details of a given party',
                produces: ['application/json'],
                parameters: [
                    {
                        in: 'path',
                        name: 'key',
                        description: 'the key for the party',
                        required: true
                    }
                ],
                responses: {
                    200: {
                        description: 'success',
                        schema: {
                            $ref: '#/definitions/Party'
                        }
                    }
                }
            },
            post: {
                summary: 'RSVP for a party',
                produces: ['application/json'],
                parameters: [
                    {
                        in: 'path',
                        name: 'key',
                        description: 'the key for the party',
                        required: true
                    },
                    {
                        in: 'body',
                        name: 'body',
                        description: 'The attendees to RSVP',
                        required: true,
                        schema: {
                            $ref: '#/definitions/RSVP'
                        }
                    }
                ],
                responses: {
                    200: {
                        description: 'success'
                    }
                }
            }
        },
        '/api/rsvp/findKeys': {
            get: {
                summary: 'Find all keys for your name',
                produces: ['application/json'],
                parameters: [
                    {
                        in: 'query',
                        name: 'firstName',
                        description: 'User first name',
                        required: true
                    },
                    {
                        in: 'query',
                        name: 'lastName',
                        description: 'User last name',
                        required: true
                    },
                ],
                responses: {
                    200: {
                        description: 'success',
                        schema: {
                            type: 'array',
                            items: {
                                type: 'string'
                            }
                        }
                    }
                }
            }
        }
    },
    definitions: {
        User: {
            type: 'object',
            properties: {
                required: ['email'],
                email: {
                    type: 'string'
                },
                password: {
                    type: 'string'
                },
                profile: {
                    $ref: '#/definitions/Profile'
                }
            }
        },
        Profile: {
            type: 'object',
            required: ['name'],
            properties: {
                name: {
                    type: 'string'
                }
            }
        },
        Party: {
            type: 'object',
            required: ['key', 'people'],
            properties: {
                key: {
                    type: 'string'
                },
                hasRSVPd: {
                    type: 'boolean'
                },
                rsvpNote: {
                    type: 'string'
                },
                people: {
                    type: 'array',
                    items: {
                        $ref: '#/definitions/Person'
                    }
                }
            }
        },
        Person: {
            type: 'object',
            required: ['firstName', 'lastName'],
            properties: {
                firstName: {
                    type: 'string'
                },
                lastName: {
                    type: 'string'
                },
                attending: {
                    type: 'boolean'
                }
            }
        },
        RSVP: {
            type: 'object',
            required: ['attendees'],
            properties: {
                attendees: {
                    type: 'array',
                    items: {
                        $ref: '#/definitions/Person'
                    }
                },
                rsvpNote: {
                    type: 'string'
                }
            }
        }
    }
}

export function docs(req, res) {
    return res.json(document);
}

export function configureSwagger(app, config: Config) {
    const swaggerOpts = {
        explorer: true,
        swaggerUrl: `http://localhost:${config.port}/api/docs.json`
    };
    app.use('/api/docs', swagger.serve, swagger.setup('', swaggerOpts));
}