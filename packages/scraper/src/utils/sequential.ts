interface Fulfilled<T> {
  status: "fulfilled";
  value: T;
}

interface Rejected {
  status: "rejected";
  reason: unknown;
}

export type Result<T> = Fulfilled<T> | Rejected;

/**
 * Broken out reducer function to do the work
 * of waiting for a promise to resolve, and adding
 * it to the array of results.
 */
const simpleReducer = async <T>(
  acc: Promise<T[]>,
  next: (list: T[]) => Promise<T>
) => {
  const list = await acc;
  return Promise.resolve([...list, await next(list)]);
};

/**
 * Run an array of functions that return promises in order,
 * waiting for each returned promise to resolve before running
 * the next function.
 *
 * This works very similarlly to `Promise.all`, in that if one
 * of the promises rejects, everything will stop.
 */
export const sequential = <T>(funcs: ((list: T[]) => Promise<T>)[]) => {
  return funcs.reduce<Promise<T[]>>(simpleReducer, Promise.resolve([]));
};

/**
 * Run an array of functions that return promises sequentially, but as
 * opposed to `sequential`, this will run everything, whether or
 * not the promises resolve or reject.
 *
 * The final returned promise will resolve with an array of results,
 * which will include an `isError` boolean.
 *
 * The resolved or rejected value will be set to the `payload` key
 * of the results object.
 *
 * This is based on the forthcoming `Promise.allSettled`:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled
 */
export const sequentialAllSettled = <T>(
  funcs: ((list: Result<T>[]) => Promise<T>)[]
) => {
  return funcs.reduce<Promise<Result<T>[]>>(async (acc, next) => {
    const list = await acc;
    let result;

    try {
      result = {
        status: "fulfilled",
        value: await next(list),
      } as const;
    } catch (err) {
      result = {
        status: "rejected",
        reason: err,
      } as const;
    }

    return Promise.resolve([...list, result]);
  }, Promise.resolve([]));
};
