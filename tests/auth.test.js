// const chai = require('chai');
// const supertest = require('supertest');
// const app = require('../src/server');

// const { expect } = chai;
// const request = supertest(app);

// describe('Authentication API', () => {
//   let authToken;
//   const testUser = {
//     name: 'Test User',
//     email: 'test@example.com',
//     password: 'Test123!',
//   };

//   // describe('POST /api/auth/register', () => {
//   //   it('should register a new user with valid data', async () => {
//   //     const response = await request
//   //       .post('/api/auth/register')
//   //       .send(testUser)
//   //       .expect(201);

//   //     expect(response.body).to.have.property('success', true);
//   //     expect(response.body).to.have.property('token');
//   //     expect(response.body.user).to.have.property('email', testUser.email);
//   //     expect(response.body.user).to.not.have.property('password');

//   //     authToken = response.body.token;
//   //   });

//   //   it('should not register user with invalid email', async () => {
//   //     const invalidUser = { ...testUser, email: 'invalid-email' };

//   //     const response = await request
//   //       .post('/api/auth/register')
//   //       .send(invalidUser)
//   //       .expect(400);

//   //     expect(response.body).to.have.property('success', false);
//   //     expect(response.body).to.have.property('message', 'Validation failed');
//   //   });

//   //   it('should not register user with weak password', async () => {
//   //     const weakPasswordUser = {
//   //       ...testUser,
//   //       email: 'test2@example.com',
//   //       password: '123',
//   //     };

//   //     const response = await request
//   //       .post('/api/auth/register')
//   //       .send(weakPasswordUser)
//   //       .expect(400);

//   //     expect(response.body).to.have.property('success', false);
//   //   });

//   //   it('should not register user with existing email', async () => {
//   //     const response = await request
//   //       .post('/api/auth/register')
//   //       .send(testUser)
//   //       .expect(400);

//   //     expect(response.body).to.have.property('success', false);
//   //     expect(response.body).to.have.property(
//   //       'message',
//   //       'User already exists with this email'
//   //     );
//   //   });
//   // });

//   describe('POST /api/auth/login', () => {
//     it('should login user with valid credentials', async () => {
//       const response = await request
//         .post('/api/auth/login')
//         .send({
//           email: testUser.email,
//           password: testUser.password,
//         })
//         .expect(200);

//       expect(response.body).to.have.property('success', true);
//       expect(response.body).to.have.property('token');
//       expect(response.body.user).to.have.property('email', testUser.email);
//     });

//     it('should not login user with invalid email', async () => {
//       const response = await request
//         .post('/api/auth/login')
//         .send({
//           email: 'nonexistent@example.com',
//           password: testUser.password,
//         })
//         .expect(401);

//       expect(response.body).to.have.property('success', false);
//       expect(response.body).to.have.property('message', 'Invalid credentials');
//     });

//     it('should not login user with invalid password', async () => {
//       const response = await request
//         .post('/api/auth/login')
//         .send({
//           email: testUser.email,
//           password: 'wrongpassword',
//         })
//         .expect(401);

//       expect(response.body).to.have.property('success', false);
//       expect(response.body).to.have.property('message', 'Invalid credentials');
//     });
//   });

//   describe('GET /api/auth/profile', () => {
//     it('should get user profile with valid token', async () => {
//       const response = await request
//         .get('/api/auth/profile')
//         .set('Authorization', `Bearer ${authToken}`)
//         .expect(200);

//       expect(response.body).to.have.property('success', true);
//       expect(response.body.user).to.have.property('email', testUser.email);
//       expect(response.body.user).to.not.have.property('password');
//     });

//     it('should not get profile without token', async () => {
//       const response = await request.get('/api/auth/profile').expect(401);

//       expect(response.body).to.have.property('success', false);
//       expect(response.body).to.have.property(
//         'message',
//         'Access token required'
//       );
//     });

//     it('should not get profile with invalid token', async () => {
//       const response = await request
//         .get('/api/auth/profile')
//         .set('Authorization', 'Bearer invalid-token')
//         .expect(401);

//       expect(response.body).to.have.property('success', false);
//     });
//   });

//   // describe('PUT /api/auth/profile', () => {
//   //   it('should update user profile with valid data', async () => {
//   //     const updateData = {
//   //       name: 'Updated Test User',
//   //       email: 'updated-test@example.com'
//   //     };

//   //     const response = await request
//   //       .put('/api/auth/profile')
//   //       .set('Authorization', `Bearer ${authToken}`)
//   //       .send(updateData)
//   //       .expect(200);

//   //     expect(response.body).to.have.property('success', true);
//   //     expect(response.body.user).to.have.property('name', updateData.name);
//   //     expect(response.body.user).to.have.property('email', updateData.email);
//   //   });

//   //   it('should not update profile with invalid email format', async () => {
//   //     const response = await request
//   //       .put('/api/auth/profile')
//   //       .set('Authorization', `Bearer ${authToken}`)
//   //       .send({ email: 'invalid-email-format' })
//   //       .expect(400);

//   //     expect(response.body).to.have.property('success', false);
//   //   });
//   // });
// });

// describe('Health Check API', () => {
//   describe('GET /api/health', () => {
//     it('should return health status', async () => {
//       const response = await request.get('/api/health').expect(200);

//       expect(response.body).to.have.property('success', true);
//       expect(response.body).to.have.property('status', 'healthy');
//       expect(response.body).to.have.property('message', 'API is running');
//     });
//   });

//   describe('GET /api/health/detailed', () => {
//     it('should return detailed health information', async () => {
//       const response = await request.get('/api/health/detailed').expect(200);

//       expect(response.body).to.have.property('success', true);
//       expect(response.body).to.have.property('services');
//       expect(response.body).to.have.property('system');
//       expect(response.body.services).to.have.property('api', 'running');
//     });
//   });
// });
