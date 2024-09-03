import { Request, Response } from 'express';
import { openDb } from '../database';
import { BlogPost } from '../models/blogPostModel';

export const createPost = async (req: Request, res: Response) => {
  const { title, content, category, tags, createdAt, updatedAt } = req.body as BlogPost;
  const db = await openDb();
  const result = await db.run(
    `INSERT INTO posts (title, content, category, tags, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [title, content, category, JSON.stringify(tags), createdAt, updatedAt]
  );
  res.status(201).json({ id: result.lastID, ...req.body });
};

export const getPost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const db = await openDb();
  const post = await db.get(`SELECT * FROM posts WHERE id = ?`, [id]);
  if (post) {
    post.tags = JSON.parse(post.tags);
    res.json(post);
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
};

export const getAllPosts = async (_req: Request, res: Response) => {
  const db = await openDb();
  const posts = await db.all(`SELECT * FROM posts`);
  posts.forEach(post => {
    post.tags = JSON.parse(post.tags);
  });
  res.json(posts);
};

export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content, category, tags, createdAt, updatedAt } = req.body as BlogPost;
  const db = await openDb();
  const result = await db.run(
    `UPDATE posts SET title = ?, content = ?, category = ?, tags = ?, createdAt = ?, updatedAt = ? WHERE id = ?`,
    [title, content, category, JSON.stringify(tags), createdAt, updatedAt, id]
  );
  if (result.changes) {
    res.json({ id: Number(id), ...req.body });
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const db = await openDb();
  const result = await db.run(`DELETE FROM posts WHERE id = ?`, [id]);
  if (result.changes) {
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
};
