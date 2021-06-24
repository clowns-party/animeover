/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute, HttpStatusCodeLiteral, TsoaResponse } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AnimeDbController } from './../controllers/animedb/animedb.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AnimedetailController } from './../controllers/animedetail/animedetail.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AnimeListController } from './../controllers/animelist/animelist.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AuthController } from './../controllers/auth/auth.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { OngoingController } from './../controllers/ongoing/ongoing.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { SearchController } from './../controllers/search/search.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserController } from './../controllers/user/user.controller';
import { expressAuthentication } from './../controllers/auth/authentication';
import * as express from 'express';

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "AnimeTypes": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["Special"]},{"dataType":"enum","enums":["Movie"]},{"dataType":"enum","enums":["OVA"]},{"dataType":"enum","enums":["ONA"]},{"dataType":"enum","enums":["TV"]},{"dataType":"enum","enums":[""]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AnimeStatuses": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["FINISHED"]},{"dataType":"enum","enums":["UPCOMING"]},{"dataType":"enum","enums":["UNKNOWN"]},{"dataType":"enum","enums":["CURRENTLY"]},{"dataType":"enum","enums":[""]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AnimeSeason": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["SUMMER"]},{"dataType":"enum","enums":["UNDEFINED"]},{"dataType":"enum","enums":["WINTER"]},{"dataType":"enum","enums":["SPRING"]},{"dataType":"enum","enums":["FALL"]},{"dataType":"enum","enums":[""]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AnimeTags": {
        "dataType": "refAlias",
        "type": {"dataType":"array","array":{"dataType":"string"},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AnimeItem": {
        "dataType": "refObject",
        "properties": {
            "_id": {"dataType":"string","required":true},
            "sources": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "title": {"dataType":"string","required":true},
            "type": {"ref":"AnimeTypes","required":true},
            "episodes": {"dataType":"double","required":true},
            "status": {"ref":"AnimeStatuses","required":true},
            "animeSeason": {"dataType":"nestedObjectLiteral","nestedProperties":{"year":{"dataType":"double","required":true},"season":{"ref":"AnimeSeason","required":true}},"required":true},
            "unacceptable": {"dataType":"boolean","required":true},
            "picture": {"dataType":"string","required":true},
            "thumbnail": {"dataType":"string","required":true},
            "synonyms": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "relations": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "tags": {"ref":"AnimeTags","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AnimeList": {
        "dataType": "refAlias",
        "type": {"dataType":"array","array":{"ref":"AnimeItem"},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserAnimeStatuses": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["viewed"]},{"dataType":"enum","enums":["abandoned"]},{"dataType":"enum","enums":["postponed"]},{"dataType":"enum","enums":["planned"]},{"dataType":"enum","enums":["reviewing"]},{"dataType":"enum","enums":["look"]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserAnimeStars": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["0"]},{"dataType":"enum","enums":["1"]},{"dataType":"enum","enums":["2"]},{"dataType":"enum","enums":["3"]},{"dataType":"enum","enums":["4"]},{"dataType":"enum","enums":["5"]},{"dataType":"enum","enums":["6"]},{"dataType":"enum","enums":["7"]},{"dataType":"enum","enums":["8"]},{"dataType":"enum","enums":["9"]},{"dataType":"enum","enums":["10"]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserAnimeValues": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"star":{"ref":"UserAnimeStars","required":true},"review":{"dataType":"string","required":true},"status":{"ref":"UserAnimeStatuses","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserAnime": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"ref":"UserAnimeValues"},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AnimeDetail": {
        "dataType": "refAlias",
        "type": {"ref":"UserAnime","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AnimeDetailList": {
        "dataType": "refAlias",
        "type": {"dataType":"array","array":{"dataType":"refAlias","ref":"AnimeDetail"},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_User.displayName-or-photoURL-or-email-or-emailVerified_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"displayName":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},"photoURL":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},"email":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},"emailVerified":{"dataType":"boolean","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "FormattedUser": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"ref":"Pick_User.displayName-or-photoURL-or-email-or-emailVerified_"},{"dataType":"nestedObjectLiteral","nestedProperties":{"refreshToken":{"dataType":"string","required":true},"accessToken":{"dataType":"string","required":true}}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ErrorSchema": {
        "dataType": "refObject",
        "properties": {
            "message": {"dataType":"string","required":true},
            "code": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: express.Router) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
        app.get('/animedb',
            function (request: any, response: any, next: any) {
            const args = {
                    limit: {"in":"query","name":"limit","dataType":"double"},
                    tags: {"in":"query","name":"tags","dataType":"string"},
                    season: {"in":"query","name":"season","ref":"AnimeSeason"},
                    page: {"in":"query","name":"page","dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new AnimeDbController();


            const promise = controller.getAll.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/animedb/anime/:animeId',
            function (request: any, response: any, next: any) {
            const args = {
                    animeId: {"in":"path","name":"animeId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new AnimeDbController();


            const promise = controller.getOne.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/animedb/tags',
            function (request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new AnimeDbController();


            const promise = controller.getAnimeTags.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/animedetail/:animeId',
            function (request: any, response: any, next: any) {
            const args = {
                    animeId: {"in":"path","name":"animeId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new AnimedetailController();


            const promise = controller.getOneDetail.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/user/animelist',
            authenticateMiddleware([{"api_key":[]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    access_token: {"in":"header","name":"Authorization","dataType":"string"},
                    refresh_token: {"in":"header","name":"Refreshtoken","dataType":"string"},
                    request: {"in":"request","name":"request","dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new AnimeListController();


            const promise = controller.userAnimelist.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.patch('/user/animelist',
            authenticateMiddleware([{"api_key":[]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    animeId: {"in":"query","name":"animeId","required":true,"dataType":"string"},
                    status: {"in":"query","name":"status","required":true,"ref":"UserAnimeStatuses"},
                    review: {"in":"query","name":"review","dataType":"string"},
                    star: {"in":"query","name":"star","ref":"UserAnimeStars"},
                    access_token: {"in":"header","name":"Authorization","dataType":"string"},
                    refresh_token: {"in":"header","name":"Refreshtoken","dataType":"string"},
                    request: {"in":"request","name":"request","dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new AnimeListController();


            const promise = controller.setAnime.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/user/animelist',
            authenticateMiddleware([{"api_key":[]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    animeId: {"in":"query","name":"animeId","required":true,"dataType":"string"},
                    access_token: {"in":"header","name":"Authorization","dataType":"string"},
                    refresh_token: {"in":"header","name":"Refreshtoken","dataType":"string"},
                    request: {"in":"request","name":"request","dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new AnimeListController();


            const promise = controller.deleteAnime.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/auth/signup',
            function (request: any, response: any, next: any) {
            const args = {
                    email: {"in":"query","name":"email","required":true,"dataType":"string"},
                    password: {"in":"query","name":"password","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new AuthController();


            const promise = controller.signup.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/auth',
            function (request: any, response: any, next: any) {
            const args = {
                    email: {"in":"query","name":"email","required":true,"dataType":"string"},
                    password: {"in":"query","name":"password","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new AuthController();


            const promise = controller.signin.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/auth/me',
            authenticateMiddleware([{"api_key":[]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    access_token: {"in":"header","name":"Authorization","dataType":"string"},
                    refresh_token: {"in":"header","name":"Refreshtoken","dataType":"string"},
                    request: {"in":"request","name":"request","dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new AuthController();


            const promise = controller.me.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/auth/refresh',
            authenticateMiddleware([{"api_key":[]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    token: {"in":"header","name":"Refreshtoken","dataType":"string"},
                    request: {"in":"request","name":"request","dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new AuthController();


            const promise = controller.refresh.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/ongoing',
            function (request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new OngoingController();


            const promise = controller.getOngoing.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/search',
            function (request: any, response: any, next: any) {
            const args = {
                    queryText: {"in":"query","name":"queryText","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new SearchController();


            const promise = controller.searchByQuery.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/user/update',
            authenticateMiddleware([{"api_key":[]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    access_token: {"in":"header","name":"Authorization","dataType":"string"},
                    refresh_token: {"in":"header","name":"Refreshtoken","dataType":"string"},
                    displayName: {"in":"query","name":"displayName","dataType":"string"},
                    photoURL: {"in":"query","name":"photoURL","dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new UserController();


            const promise = controller.userUpdate.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
        return (request: any, _response: any, next: any) => {
            let responded = 0;
            let success = false;

            const succeed = function(user: any) {
                if (!success) {
                    success = true;
                    responded++;
                    request['user'] = user;
                    next();
                }
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            const fail = function(error: any) {
                responded++;
                if (responded == security.length && !success) {
                    error.status = error.status || 401;
                    next(error)
                }
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    let promises: Promise<any>[] = [];

                    for (const name in secMethod) {
                        promises.push(expressAuthentication(request, name, secMethod[name]));
                    }

                    Promise.all(promises)
                        .then((users) => { succeed(users[0]); })
                        .catch(fail);
                } else {
                    for (const name in secMethod) {
                        expressAuthentication(request, name, secMethod[name])
                            .then(succeed)
                            .catch(fail);
                    }
                }
            }
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function isController(object: any): object is Controller {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }

    function promiseHandler(controllerObj: any, promise: any, response: any, successStatus: any, next: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode = successStatus;
                let headers;
                if (isController(controllerObj)) {
                    headers = controllerObj.getHeaders();
                    statusCode = controllerObj.getStatus();
                }

                // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                returnHandler(response, statusCode, data, headers)
            })
            .catch((error: any) => next(error));
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function returnHandler(response: any, statusCode?: number, data?: any, headers: any = {}) {
        Object.keys(headers).forEach((name: string) => {
            response.set(name, headers[name]);
        });
        if (data && typeof data.pipe === 'function' && data.readable && typeof data._read === 'function') {
            data.pipe(response);
        } else if (data !== null && data !== undefined) {
            response.status(statusCode || 200).json(data);
        } else {
            response.status(statusCode || 204).end();
        }
    }
    
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function responder(response: any): TsoaResponse<HttpStatusCodeLiteral, unknown>  {
        return function(status, data, headers) {
            returnHandler(response, status, data, headers);
        };
    };

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function getValidatedArgs(args: any, request: any, response: any): any[] {
        const fieldErrors: FieldErrors  = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'path':
                    return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'header':
                    return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body':
                    return validationService.ValidateParam(args[key], request.body, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body-prop':
                    return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.', {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'res':
                    return responder(response);
            }
        });

        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidateError(fieldErrors, '');
        }
        return values;
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
