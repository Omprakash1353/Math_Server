import type { NextFunction, Request, Response } from "express";
import { OperationRepository } from "../repository/math.repository.js";

const operationRepository = new OperationRepository();

interface AdditionRequestBody {
  a: number;
  b: number;
}

export async function addition(
  req: Request<{}, {}, AdditionRequestBody>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { a, b } = req.body;

    if (typeof a !== "number" || typeof b !== "number") {
      res
        .status(400)
        .json({ error: "Invalid input: 'a' and 'b' must be numbers" });
      return;
    }

    const result = a + b;
    console.info("[ADDITION]", result);
    await operationRepository.createOperation("ADDITION", [a, b], result);

    res.status(200).json({ result });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export async function fibonacci(
  req: Request<{ count: string }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const n = parseInt(req.params.count, 10);

    if (isNaN(n) || n < 0) {
      res
        .status(400)
        .json({ error: "Invalid input: count must be a non-negative number" });
      return;
    }

    const fib = (num: number): number => {
      if (num <= 1) return num;
      let a = 0,
        b = 1,
        temp;
      for (let i = 2; i <= num; i++) {
        temp = a + b;
        a = b;
        b = temp;
      }
      return b;
    };

    const result = fib(n);
    console.info("[FIBONACCI]", result);
    await operationRepository.createOperation("FIBONACCI", { n }, result);

    res.status(200).json({ result });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export async function factorial(
  req: Request<{ number: string }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const n = parseInt(req.params.number, 10);

    if (isNaN(n) || n < 0) {
      res
        .status(400)
        .json({ error: "Invalid input: number must be a non-negative number" });
      return;
    }

    const fact = (num: number): number => {
      if (num === 0 || num === 1) return 1;
      let result = 1;
      for (let i = 2; i <= num; i++) {
        result *= i;
      }
      return result;
    };

    const result = fact(n);
    console.info("[FACTORIAL]", result);
    await operationRepository.createOperation("FACTORIAL", { n }, result);

    res.status(200).json({ result });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export async function primeNumber(
  req: Request<{ number: string }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const n = parseInt(req.params.number, 10);

    if (isNaN(n)) {
      res
        .status(400)
        .json({ error: "Invalid input: number must be an integer" });
      return;
    }

    const isPrime = (num: number): boolean => {
      // Handle special cases
      if (num <= 1) return false;
      if (num <= 3) return true;
      if (num % 2 === 0 || num % 3 === 0) return false;

      // Check using 6k +/- 1 optimization
      for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
      }

      return true;
    };

    const result = isPrime(n);
    console.info("[PRIME]", n, result);
    await operationRepository.createOperation("PRIME", { n }, result ? 1 : 0);

    res.status(200).json({
      number: n,
      isPrime: result,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export async function getAllOperations(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const operations = await operationRepository.getAllOperations();
    res.status(200).json({ operations });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export async function deleteOperation(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID format" });
    return;
  }

  try {
    const deletedOperation = await operationRepository.deleteOperation(id);
    res.status(200).json(deletedOperation);
  } catch (error) {
    // @ts-ignore
    if (error?.code === "P2025") {
      res.status(404).json({ error: "Operation not found" });
      return;
    }

    console.error(error);
    next(error);
  }
}
