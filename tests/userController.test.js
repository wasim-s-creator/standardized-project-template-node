const chai = require('chai');
const supertest = require('supertest');
const app = require('../src/server');
const { expect } = chai;
const request = supertest(app);

let adminToken;
let testUserId;

// Helper to create and login as admin
async function setupAdmin() {
  const adminUser = {
    name: 'Admin',
    email: `admin+${Date.now()}@example.com`,
    password: 'Admin123!',
    role: 'admin',
  };
  await request.post('/api/auth/register').send(adminUser);
  // Ensure the user is set as admin in the DB
  const User = require('../src/models/User');
  await User.updateOne({ email: adminUser.email }, { role: 'admin' });
  const loginRes = await request.post('/api/auth/login').send({
    email: adminUser.email,
    password: adminUser.password,
  });
  adminToken = loginRes.body.token;
}

describe('User Controller API', () => {
  before(async () => {
    await setupAdmin();
  });

  it('should get all users', async () => {
    const res = await request
      .get('/api/users')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);
    expect(res.body).to.have.property('success', true);
    expect(res.body).to.have.property('users');
  });

  it('should create and get a single user', async () => {
    const user = {
      name: 'Test User',
      email: `user+${Date.now()}@example.com`,
      password: 'User123!',
    };
    const regRes = await request.post('/api/auth/register').send(user);
    testUserId = regRes.body.user.id || regRes.body.user._id;
    const res = await request
      .get(`/api/users/${testUserId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);
    expect(res.body).to.have.property('success', true);
    expect(res.body.user).to.have.property('email', user.email);
  });

  it('should update a user', async () => {
    const updateData = { name: 'Updated Name' };
    const res = await request
      .put(`/api/users/${testUserId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send(updateData)
      .expect(200);
    expect(res.body).to.have.property('success', true);
    expect(res.body.user).to.have.property('name', updateData.name);
  });

  it('should not update user with email already in use', async () => {
    const otherUser = {
      name: 'Other User',
      email: `other+${Date.now()}@example.com`,
      password: 'Other123!',
    };
    await request.post('/api/auth/register').send(otherUser);
    const res = await request
      .put(`/api/users/${testUserId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ email: otherUser.email })
      .expect(400);
    expect(res.body).to.have.property('success', false);
    expect(res.body).to.have.property('message', 'Email already in use');
  });

  it('should not update non-existent user', async () => {
    const res = await request
      .put('/api/users/000000000000000000000000')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'Nobody' })
      .expect(404);
    expect(res.body).to.have.property('success', false);
    expect(res.body).to.have.property('message', 'User not found');
  });

  it('should get user stats', async () => {
    const res = await request
      .get('/api/users/stats')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);
    expect(res.body).to.have.property('success', true);
    expect(res.body.stats).to.have.property('totalUsers');
  });

  it('should not delete self', async () => {
    // Get admin user id
    const adminRes = await request
      .get('/api/users')
      .set('Authorization', `Bearer ${adminToken}`);
    const adminId =
      adminRes.body.users.find(u => u.email.includes('admin+'))._id ||
      adminRes.body.users.find(u => u.email.includes('admin+')).id;
    const res = await request
      .delete(`/api/users/${adminId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(400);
    expect(res.body).to.have.property('success', false);
    expect(res.body).to.have.property(
      'message',
      'Cannot delete your own account'
    );
  });

  it('should delete a user', async () => {
    const res = await request
      .delete(`/api/users/${testUserId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);
    expect(res.body).to.have.property('success', true);
    expect(res.body).to.have.property('message', 'User deleted successfully');
  });

  it('should not get non-existent user', async () => {
    const res = await request
      .get('/api/users/000000000000000000000000')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(404);
    expect(res.body).to.have.property('success', false);
    expect(res.body).to.have.property('message', 'User not found');
  });
});
