import Base from './Base';
import AlgorithmContract from '../Algorithm';

class Mulberry32 extends Base implements AlgorithmContract {

    /**
     * Seed parameter.
     *
     * @var {number}
     */
    private _a: number;

    /**
     * Create a new mulberry32 instance.
     *
     * @param {string} str
     */
    public constructor(str: string) {
        super();

        this._a = Mulberry32._xfnv1a(str)();
    }

    /**
     * Generate a random number using the mulberry32 algorithm.
     *
     * @returns {number}
     */
    public next(): number {
        let t = this._a += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);

        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }

}

export default Mulberry32;
