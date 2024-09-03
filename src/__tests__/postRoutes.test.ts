import request from 'supertest';
import { app } from '../index';

describe('Blog Post API', () => {
  it('should create a new post', async () => {
    const response = await request(app)
      .post('/api/posts')
      .send({
        title: 'Test Post',
        content: 'Test Content',
        category: 'Test Category',
        tags: ['Test', 'API'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    expect(response.status).toBe(201);
    expect(response.body.title).toBe('Test Post');
  });

  it('should retrieve a post by ID', async () => {
    const response = await request(app).get('/api/posts/1');
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(1);
  });
  
});
