import express from "express";
import {
  addition,
  subtraction,
  factorial,
  fibonacci,
  primeNumber,
  getAllOperations,
  deleteOperation,
} from "../controllers/math.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Math
 *     description: API for mathematical operations
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AddNumbersInput:
 *       type: object
 *       properties:
 *         a:
 *           type: number
 *           example: 5
 *         b:
 *           type: number
 *           example: 7
 *     AddNumbersOutput:
 *       type: object
 *       properties:
 *         result:
 *           type: number
 *           example: 12
 *     SubtractNumbersInput:
 *       type: object
 *       properties:
 *         a:
 *           type: number
 *           example: 10
 *         b:
 *           type: number
 *           example: 7
 *     SubtractNumbersOutput:
 *       type: object
 *       properties:
 *         result:
 *           type: number
 *           example: 3
 *     FibonacciOutput:
 *       type: object
 *       properties:
 *         result:
 *           type: number
 *           example: 8
 *     FactorialOutput:
 *       type: object
 *       properties:
 *         result:
 *           type: number
 *           example: 120
 *     PrimeNumberOutput:
 *       type: object
 *       properties:
 *         number:
 *           type: number
 *           example: 17
 *         isPrime:
 *           type: boolean
 *           example: true
 *     Operation:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         type:
 *           type: string
 *           enum: [ADDITION, SUBTRACTION, FIBONACCI, FACTORIAL, PRIME_CHECK]
 *           example: "ADDITION"
 *         input:
 *           type: string
 *           example: "[5,7]"
 *           description: JSON string of the input parameters
 *         result:
 *           type: number
 *           example: 12
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-04-29T10:30:00Z"
 *     AllOperationsOutput:
 *       type: object
 *       properties:
 *         operations:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Operation'
 *     DeleteOperationOutput:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         type:
 *           type: string
 *           enum: [ADDITION, SUBTRACTION, FIBONACCI, FACTORIAL, PRIME_CHECK]
 *           example: "ADDITION"
 *         input:
 *           type: string
 *           example: "[5,7]"
 *         result:
 *           type: number
 *           example: 12
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-04-29T10:30:00Z"
 */

/**
 * @swagger
 * /api/addition:
 *   post:
 *     summary: Adds two numbers
 *     tags: [Math]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddNumbersInput'
 *     responses:
 *       200:
 *         description: Sum of a and b
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
router.post("/addition", addition);

/**
 * @swagger
 * /api/subtraction:
 *   post:
 *     summary: Subtracts two numbers
 *     tags: [Math]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubtractNumbersInput'
 *     responses:
 *       200:
 *         description: Difference of a and b
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
router.post("/subtraction", subtraction);

/**
 * @swagger
 * /api/fibonacci/{count}:
 *   get:
 *     summary: Calculate nth Fibonacci number
 *     tags: [Math]
 *     parameters:
 *       - in: path
 *         name: count
 *         schema:
 *           type: integer
 *         required: true
 *         description: The position in the Fibonacci sequence
 *         example: 6
 *     responses:
 *       200:
 *         description: Fibonacci result
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
router.get("/fibonacci/:count", fibonacci);

/**
 * @swagger
 * /api/factorial/{number}:
 *   get:
 *     summary: Calculate factorial of a number
 *     tags: [Math]
 *     parameters:
 *       - in: path
 *         name: number
 *         schema:
 *           type: integer
 *         required: true
 *         description: The number to calculate factorial for
 *         example: 5
 *     responses:
 *       200:
 *         description: Factorial result
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
router.get("/factorial/:number", factorial);

/**
 * @swagger
 * /api/prime-number/{number}:
 *   get:
 *     summary: Check if a number is prime
 *     tags: [Math]
 *     parameters:
 *       - in: path
 *         name: number
 *         schema:
 *           type: integer
 *         required: true
 *         description: The number to check for primality
 *         example: 17
 *     responses:
 *       200:
 *         description: Prime number check result
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
router.get("/prime-number/:number", primeNumber);

/**
 * @swagger
 * /api/operations:
 *   get:
 *     summary: Get all mathematical operations
 *     tags: [Math]
 *     responses:
 *       200:
 *         description: List of all operations
 *       500:
 *         description: Internal server error
 */
router.get("/operations", getAllOperations);

/**
 * @swagger
 * /api/operations/{id}:
 *   delete:
 *     summary: Delete a mathematical operation by ID
 *     tags: [Math]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Operation ID to delete
 *         example: 1
 *     responses:
 *       200:
 *         description: Deleted operation details
 *       404:
 *         description: Operation not found
 *       500:
 *         description: Internal server error
 */
router.delete("/operations/:id", deleteOperation);

export default router;
