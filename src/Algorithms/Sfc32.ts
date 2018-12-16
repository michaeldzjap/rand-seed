import Base from './Base';
import IAlgorithm from '../IAlgorithm';

class Sfc32 extends Base implements IAlgorithm {

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
     * Create a new sfc32 instance.
     *
     * @param {string} str
     */
    public constructor(str: string) {
        super();

        // Create the seed for the random number algorithm
        const seed = Sfc32._xfnv1a(str);
        this._a = seed();
        this._b = seed();
        this._c = seed();
        this._d = seed();
    }

    /**
     * Generate a random number using the sfc32 algorithm.
     *
     * @returns {number}
     */
    public next(): number {
        this._a >>>= 0; this._b >>>= 0; this._c >>>= 0; this._d >>>= 0;
        let t = (this._a + this._b) | 0;
        this._a = this._b ^ this._b >>> 9;
        this._b = this._c + (this._c << 3) | 0;
        this._c = (this._c << 21 | this._c >>> 11);
        this._d = this._d + 1 | 0;
        t = t + this._d | 0;
        this._c = this._c + t | 0;

        return (t >>> 0) / 4294967296;
    }

}

export default Sfc32;
