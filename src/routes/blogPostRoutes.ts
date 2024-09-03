import { Router } from 'express';
import { createPost, getPost, getAllPosts, updatePost, deletePost } from '../controllers/blogPostController';

const router = Router();

router.post('/posts', createPost);
router.get('/posts/:id', getPost);
router.get('/posts', getAllPosts);
router.put('/posts/:id', updatePost);
router.delete('/posts/:id', deletePost);

export { router as postRouter };
