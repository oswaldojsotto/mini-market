import { Router, Request, Response } from 'express';
import Product from './models/Product';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const { search, sort = 'name', order = 'asc', page = 1, limit = 10, available } = req.query;

    let query: any = {};
    
    if (search) {
      query.name = { $regex: search as string, $options: 'i' };
    }
    
    if (available !== undefined) {
      query.isAvailable = available === 'true';
    }

    const sortOptions: any = {};
    sortOptions[sort as string] = order === 'asc' ? 1 : -1;

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    const [products, total] = await Promise.all([
      Product.find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(limitNum),
      Product.countDocuments(query)
    ]);

    res.json({ products, total, page: pageNum, totalPages: Math.ceil(total / limitNum) });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const product = await Product.findOne({ id: req.params.id });
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;