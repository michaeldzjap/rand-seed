import AlgorithmContract from './Algorithm';
import Mulberry32 from './Algorithms/Mulberry32';
import Sfc32 from './Algorithms/Sfc32';
import Xoshiro128ss from './Algorithms/Xoshiro128ss';
import {isNullOrUndefined} from './helpers';

/**
 * Available seedable random number generator algorithms.
 *
 * @var {PRNG}
 */
export enum PRNG {
    sfc32 = 'sfc32',
    mulberry32 = 'mulberry32',
    xoshiro128ss = 'xoshiro128ss'
}

/**
 * A class for generating random numbers. Several different (seedable) random
 * number generator algorithms are configurable.
 *
 * See https://stackoverflow.com/a/47593316/7024747 for more info.
 */
class Rand {

    /**
     * The string that will be used for generating a suitable hash for any of
     * the provided PRNG algorithms.
     *
     * @var {string}
     */
    private _str?: string;

    /**
     * The PRNG algorithm that should be used for random number generation.
     *
     * @var {PRNG}
     */
    private _prng: PRNG;

    /**
     * The generator that should be used for generating random numbers.
     *
     * @var {Function}
     */
    private _generator: AlgorithmContract;

    /**
     * Create a new rand instance.
     *
     * @param {string} str
     * @param {PRNG} prng
     */
    public constructor(str?: string, prng: PRNG = PRNG.sfc32) {
        this._str = str;
        this._prng = prng;
        this._generator = this._initializeGenerator();
    }

    /**
     * Generate a new random number using the selected generator.
     *
     * @returns {number}
     */
    public next(): number {
        return this._generator.next();
    }

    /**
     * Initialize the chosen random number generator.
     *
     * @returns {Algorithm|Function}
     */
    private _initializeGenerator(): AlgorithmContract {
        if (isNullOrUndefined(this._str)) return this._wrap();

        switch (this._prng) {
            case 'sfc32':
                return new Sfc32(this._str);
            case 'mulberry32':
                return new Mulberry32(this._str);
            case 'xoshiro128ss':
                return new Xoshiro128ss(this._str);
            default:
                return this._wrap();
        }
    }

    /**
     * Wrap the standard random function in an object.
     *
     * @returns {Algorithm}
     */
    private _wrap(): AlgorithmContract {
        return {
            next(): number {
                return Math.random();
            }
        };
    }

}

export default Rand;
