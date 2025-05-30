import { Router, Request, Response, NextFunction } from "express";
import { db } from "../models";

const router = Router();

/**
 * @openapi
 * /query:
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
    const myQuery = req.body.q.replaceAll('"', "'");
    const [result, meta] = await db.sequelize.query(myQuery);
    res.status(201).json({ result: result, des: `Đã ảnh hưởng ${meta} hàng` });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

export default router;
