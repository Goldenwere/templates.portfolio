/**
 * Service factory for creating singleton services
 * @returns singleton generic class to extend from
 */
export const Service = <T>() => {
  return class Singleton {
    static _instance: T

    protected constructor() {}

    static get instance(): T {
      if (!this._instance) {
        this._instance = new this() as T;
      }

      return this._instance
    }
  }
}
