import Base from './Base';
import IAlgorithm from '../IAlgorithm';

class Xoshiro128ss extends Base implements IAlgorithm {

    /**
     * Seed parameters.
     *
     * @var {number}
     */
    private _a: number;
    private _b: number;
    private _c: number;
    private _d: number;

    /**
     * Create a new xoshiro128** instance.
     *
     * @param {string} str
     */
    public constructor(str: string) {
        super();

        // Create the seed for the random number algorithm
        const seed = Xoshiro128ss._xfnv1a(str);
        this._a = seed();
        this._b = seed();
        this._c = seed();
        this._d = seed();
    }

    /**
     * Generate a random number using the xoshiro128** algorithm.
     *
     * @returns {number}
     */
    public next(): number {
        const t = this._b << 9;
        let r = this._a * 5;
        r = (r << 7 | r >>> 25) * 9;
        this._c ^= this._a; this._d ^= this._b;
        this._b ^= this._c; this._a ^= this._d; this._c ^= t;
        this._d = this._d << 11 | this._d >>> 21;

        return (r >>> 0) / 4294967296;
    }

}

export default Xoshiro128ss;
