/**
 * Result type representing success or failure.
 *
 * @example
 * ```
 * const result: Result<number, Error> = someFunc();
 *
 * // narrowing using type guard
 * if (result.isSuccess()) {
 *   // result is Success<number>
 *   console.log(result.value);
 * } else {
 *   // result is Failure<Error>
 *   console.error(result.error);
 * }
 *
 * // or you can use `valueOr` to safely unwrap the value
 * const value: number = result.valueOr(0);
 * ```
 */
export type Result<T, E> = Success<T> | Failure<E>;

/**
 * Result interface.
 */
interface IResult<T, E> {
  /**
   * Type guard checking the result is a success.
   */
  isSuccess(): this is Success<T>;

  /**
   * Type guard checking the result is a failure.
   */
  isFailure(): this is Failure<E>;

  /**
   * Safely unwrap the value with fallback.\
   * If the result is a success, it returns the value, otherwise returns the fallback.
   */
  valueOr<Fallback>(fallback: Fallback): T | Fallback;
}

/**
 * Success type representing successful result.
 */
export class Success<T> implements IResult<T, never> {
  private constructor(public readonly value: T) {}

  isSuccess(): this is Success<T> {
    return true;
  }

  isFailure(): this is Failure<never> {
    return false;
  }

  valueOr(): T {
    return this.value;
  }

  static value<T>(value: T): Success<T> {
    return new Success(value);
  }
}

/**
 * Failure type representing failed result.
 */
export class Failure<E> implements IResult<never, E> {
  private constructor(public readonly error: E) {}

  isSuccess(): this is Success<never> {
    return false;
  }

  isFailure(): this is Failure<E> {
    return true;
  }

  valueOr<Fallback>(fallback: Fallback): Fallback {
    return fallback;
  }

  static error<E>(error: E): Failure<E> {
    return new Failure(error);
  }
}
