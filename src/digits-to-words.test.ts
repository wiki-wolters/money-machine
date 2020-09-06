import digitsToWords from "./digits-to-words";

const cases = {
    '0': 'zero dollars',
    '1': 'one dollar',
    '2': 'two dollars',
    '11': 'eleven dollars',
    '111': 'one hundred and eleven dollars',
    '1.20': 'one dollar and twenty cents',
    '1.45': 'one dollar and forty-five cents',
    '2000': 'two thousand dollars',
    '2003': 'two thousand and three dollars',
    '2063': 'two thousand and sixty-three dollars',
    '2463': 'two thousand, four hundred and sixty-three dollars',
    '123001': 'one hundred and twenty-three thousand and one dollars',
    '4123001': 'four million, one hundred and twenty-three thousand and one dollars',
    '68123456.97': 'sixty-eight million, one hundred and twenty-three thousand, four hundred and fifty-six dollars and ninety-seven cents',
    '1,000,000': 'one million dollars', // https://media.giphy.com/media/sEULHciNa7tUQ/giphy.gif
    '0.346': 'thirty-five cents',
}

test('Converts digits to words', () => {
    for (let key in cases) {
        let value = digitsToWords(key);

        expect(value).toBe(cases[key]);
    }
})