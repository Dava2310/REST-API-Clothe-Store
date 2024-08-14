import request from "supertest"
import app from "../../src/app.js"
import db from '../../src/DB/mysql.js'; // Asegúrate de que esta ruta sea correcta

let accessToken;
let userToken;

beforeAll(async () => {
    const loginData = {
        email: "dvetencourt23@gmail.com", // Usa un correo válido
        password: "12345678"              // Usa una contraseña válida
    };

    const response = await request(app)
        .post('/api/auth/login')
        .send(loginData);

    accessToken = response.body.body.data.accessToken;

    const loginDataUser = {
        email: "dvetencourt231001@gmail.com",
        password: "12345678"
    };

    const responseUser = await request(app)
        .post('/api/auth/login')
        .send(loginDataUser);

    userToken = responseUser.body.body.data.accessToken;
});

describe("POST /api/vendedores/", () => {

    const vendedorData = {
        nombre: "Douglas Alejandro",
        apellido: "Gil Salazar",
        email: "douglas@gmail.com",
        telefono: "+584249334420",
        direccion: "123 Main St",
        cedula: "V-12345678"
    }
    
    describe("Caso de Fracaso: Usuario no administrador intentando registrar un vendedor", () => {

        test("Debe responder con un status code de 401", async () => {
            const response = await request(app).post('/api/vendedores')
                .set('Authorization', `Bearer ${userToken}`)
                .send(vendedorData);
            expect(response.body.statusCode).toBe(403);
            expect(response.body.body.message).toBe('Access denied');
            expect(response.body.error).toBe(true);

        })

    })

    describe("Casos de Exito: Autentificacion adecuada y Datos Validados", () => {

        let response;

        // Crear el vendedor una vez antes de todos los tests
        beforeAll(async () => {
            response = await request(app).post('/api/vendedores')
                .set('Authorization', `Bearer ${accessToken}`)
                .send(vendedorData);

        });

        test("Debe responder con un status code 201", () => {
            expect(response.status).toBe(201);
        })

        test("Debe responder en formato JSON", () => {
            expect(response.type).toBe('application/json')
        })

        test("Debe responder con un error false", () => {
            expect(response.body.error).toBe(false)
        })

        test("Debe devolver un mensaje de Vendedor creado exitosamente", () => {
            expect(response.body.body.message).toBe('Vendedor creado exitosamente')
        })

    })

    describe("Caso de Fracaso: Datos Invalidos", () => {

        describe('Email ya en uso', () => {

            const invalid_vendedor = {
                nombre: "Douglas Alejandro",
                apellido: "Gil Salazar",
                email: "douglas@gmail.com",
                telefono: "+584249334420",
                direccion: "123 Main St",
                cedula: "V-12345679"
            }

            test('Debe responder con un mensaje de error', async () => {
                const response = await request(app).post('/api/vendedores')
                    .set('Authorization', `Bearer ${accessToken}`)
                    .send(invalid_vendedor);

                expect(response.body.body.message).toBe('Email ya en uso');
                expect(response.body.statusCode).toBe(409);
            })

        })

        describe('Cédula ya en uso', () => {

            const invalid_vendedor = {
                nombre: "Douglas Alejandro",
                apellido: "Gil Salazar",
                email: "douglas23@gmail.com",
                telefono: "+584249334420",
                direccion: "123 Main St",
                cedula: "V-12345678"
            }

            test('Debe responder con un mensaje de error', async () => {
                const response = await request(app).post('/api/vendedores')
                    .set('Authorization', `Bearer ${accessToken}`)
                    .send(invalid_vendedor);

                expect(response.body.body.message).toBe('Cedula ya en uso');
                expect(response.body.statusCode).toBe(409);
            })

        })

        describe('Campos vacios', () => {

            const invalid_vendedor = {
                nombre: "Douglas Alejandro",
                apellido: "Gil Salazar",
            }

            test('Debe responder con un mensaje de error', async () => {
                const response = await request(app).post('/api/vendedores')
                    .set('Authorization', `Bearer ${accessToken}`)
                    .send(invalid_vendedor);

                expect(response.body.error).toBe(true);
            })

        })

        describe('Nombre o Apellido con numeros', () => {

            const invalid_vendedor = {
                nombre: "Douglas2 Alejandro",
                apellido: "Gil3 Salazar",
                email: "douglas23@gmail.com",
                telefono: "+584249334420",
                direccion: "123 Main St",
                cedula: "V-12345679"
            }

            test('Debe responder con un mensaje de error', async () => {
                const response = await request(app).post('/api/vendedores')
                    .set('Authorization', `Bearer ${accessToken}`)
                    .send(invalid_vendedor);

                expect(response.body.error).toBe(true);
                expect(response.body.body.message).toBe('El nombre o apellido solo puede contener letras y espacios');
            })
        })

        describe('Cedula invalida', () => {

            const invalid_vendedor = {
                nombre: "Douglas Alejandro",
                apellido: "Gil Salazar",
                email: "douglas23@gmail.com",
                telefono: "+584249334420",
                direccion: "123 Main St",
                cedula: "X-12345678"
            }

            test('Debe responder con un mensaje de error', async () => {
                const response = await request(app).post('/api/vendedores')
                    .set('Authorization', `Bearer ${accessToken}`)
                    .send(invalid_vendedor);

                expect(response.body.error).toBe(true);
                expect(response.body.body.message).toBe('La cédula debe comenzar con V, E o P, seguida de 7 u 8 dígitos numéricos');
            })
        })

    })

})


afterAll(async () => {
    await db.pool.end(); // Cierra el pool al final de todas las pruebas
});