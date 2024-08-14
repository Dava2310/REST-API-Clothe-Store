import request from "supertest"
import app from "../src/app.js"
import db from '../src/DB/mysql.js'; // Asegúrate de que esta ruta sea correcta

let accessToken;

beforeAll(async () => {
    const loginData = {
        email: "dvetencourt23@gmail.com", // Usa un correo válido
        password: "12345678"              // Usa una contraseña válida
    };

    const response = await request(app)
        .post('/api/auth/login')
        .send(loginData);

    accessToken = response.body.body.data.accessToken;
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

    describe("Casos de Exito: Autentificacion adecuada y Datos Validados", () => {

        // Debe responder con un status 201
        it("Debe responder con un status code 201", async () => {
            const response = await request(app).post('/api/vendedores')
                .set('Authorization', `Bearer ${accessToken}`)
                .send(vendedorData);
            expect(response.status).toBe(201);
        })

        // Debe responder en formato JSON
        it("Debe responder en formato JSON", async () => {
            const response = await request(app).post('/api/vendedores')
                .set('Authorization', `Bearer ${accessToken}`)
                .send(vendedorData);
            expect(response.type).toBe('application/json')
        })

        // Debe responder con un error false
        it("Debe responder con un error false", async () => {
            const response = await request(app).post('/api/vendedores')
                .set('Authorization', `Bearer ${accessToken}`)
                .send(vendedorData);
            expect(response.body.error).toBe(false)
        })

        // Debe volver un mensaje de "Vendedor creado exitosamente"
        it("Debe devolver un mensaje de Vendedor creado exitosamente", async () => {
            const response = await request(app).post('/api/vendedores')
                .set('Authorization', `Bearer ${accessToken}`)
                .send(vendedorData);
            expect(response.body.body.message).toBe('Vendedor creado exitosamente')
        })

        // Debe devolver el ID del vendedor creado
        it("La respuesta debe contener el ID del nuevo vendedor", async () => {
            const response = await request(app).post('/api/vendedores')
                .set('Authorization', `Bearer ${accessToken}`)
                .send(vendedorData);
            expect(response.body.body.data.id).toBeTruthy()
        })

    })

})


afterAll(async () => {
    await db.pool.end(); // Cierra el pool al final de todas las pruebas
});