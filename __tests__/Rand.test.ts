import Rand, { PRNG } from '../src/Rand';

describe('Rand', (): void => {
    it('creates a new default instance', (): void => {
        const rand = new Rand();

        expect(rand).toBeInstanceOf(Rand);
        expect(typeof rand.next()).toBe('number');
    });

    [
        undefined, // eslint-disable-line no-undefined
        PRNG.sfc32,
        PRNG.mulberry32,
        PRNG.xoshiro128ss,
    ].forEach((algo: PRNG | undefined): void => {
        it(`creates a new [${algo}] instance`, (): void => {
            const rand = new Rand('1234', algo);

            expect(rand).toBeInstanceOf(Rand);
            expect(typeof rand.next()).toBe('number');
        });
    });

    [PRNG.sfc32, PRNG.mulberry32, PRNG.xoshiro128ss].forEach((algo: PRNG): void => {
        it(`reproduces the same random sequence for a given seed: [${algo}]`, (): void => {
            let rand = new Rand('1234', algo);
            const result1 = Array.from({ length: 10 }, (): number => rand.next());

            rand = new Rand('1234', algo);
            const result2 = Array.from({ length: 10 }, (): number => rand.next());

            expect(result1).toEqual(result2);
        });
    });
});
