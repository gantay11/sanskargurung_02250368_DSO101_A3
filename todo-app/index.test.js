const request = require('supertest');
const { app, server } = require('./index');

afterAll(() => server.close());

describe('Todo API', () => {
  test('GET /api/todos - returns empty array initially', async () => {
    const res = await request(app).get('/api/todos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /api/todos - creates a new todo', async () => {
    const res = await request(app)
      .post('/api/todos')
      .send({ text: 'Learn CI/CD' });
    expect(res.statusCode).toBe(201);
    expect(res.body.text).toBe('Learn CI/CD');
    expect(res.body.completed).toBe(false);
    expect(res.body.id).toBeDefined();
  });

  test('POST /api/todos - rejects empty text', async () => {
    const res = await request(app)
      .post('/api/todos')
      .send({ text: '' });
    expect(res.statusCode).toBe(400);
  });

  test('PUT /api/todos/:id - toggles completed status', async () => {
    const created = await request(app)
      .post('/api/todos')
      .send({ text: 'Test todo' });
    const id = created.body.id;

    const res = await request(app)
      .put(`/api/todos/${id}`)
      .send({ completed: true });
    expect(res.statusCode).toBe(200);
    expect(res.body.completed).toBe(true);
  });

  test('DELETE /api/todos/:id - deletes a todo', async () => {
    const created = await request(app)
      .post('/api/todos')
      .send({ text: 'Delete me' });
    const id = created.body.id;

    const res = await request(app).delete(`/api/todos/${id}`);
    expect(res.statusCode).toBe(200);
  });

  test('GET /health - returns ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});