import { Router, Request, Response, NextFunction } from "express";
import { db } from "../models";

const router = Router();

/**
 * @openapi
 * /loai-san-pham:
 *   post:
 *     summary: Tạo loại sản phẩm mới
 *     tags:
 *       - QueryString
 *     requestBody:
 *       description: The account data to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/QueryString'
 *     responses:
 *       '201':
 *         description: Account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/QueryString'
 *       '400':
 *         description: Bad request — validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await db.sequelize.query(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
});

export default router;
