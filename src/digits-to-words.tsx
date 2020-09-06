const ONES = {
    '0': '',
    '1': 'one',
    '2': 'two',
    '3': 'three',
    '4': 'four',
    '5': 'five',
    '6': 'six',
    '7': 'seven',
    '8': 'eight',
    '9': 'nine',
}

const TENS = {
    '2': 'twenty',
    '3': 'thirty',
    '4': 'forty',
    '5': 'fifty',
    '6': 'sixty',
    '7': 'seventy',
    '8': 'eighty',
    '9': 'ninety',
}

const TEENS = {
    '10': 'ten',
    '11': 'eleven',
    '12': 'twelve',
    '13': 'thirteen',
    '14': 'fourteen',
    '15': 'fifteen',
    '16': 'sixteen',
    '17': 'seventeen',
    '18': 'eighteen',
    '19': 'nineteen',
}

const LEVEL_DESCRIPTIONS = [
    '',
    'thousand',
    'million',
    'billion',
    'trillion'
]

export default function(numberAsString: string) {
    //Convert to a number first
    const number = parseFloat(numberAsString.replace(/,/g, ''))

    if (isNaN(number)) {
        return 'Not a number'
    }

    //Convert to text
    const digitsAsString = number.toFixed(2)

    //Early return for zero dollar value
    if (digitsAsString === '0.00') {
        return 'zero dollars';
    }

    //Split into dollars and cents
    const [dollarsAsString, centsAsString] = digitsAsString.split('.')

    //Group the dollar amount into levels (thousands, millions etc)
    const levels = [];
    while (levels.length < Math.ceil(dollarsAsString.length / 3)) {
        let charsFromRight = 3 * (levels.length + 1)
        let overflow = Math.abs(Math.min(0, dollarsAsString.length - charsFromRight))
        levels.push(dollarsAsString.substr(-charsFromRight, 3 - overflow))
    }

    //For each level in descending order, get the 3 digit number as words and add the level description
    const dollarSections = [];
    let dollarsAsWords = '';
    for (let i = levels.length - 1; i >= 0; i--) {
        let words = threeDigitNumberToText(levels[i]);
        let separator = '';

        if (dollarSections.length) {
            separator = ', ';
        }

        /*
         * The separator before the last section should be 'and', but only if the last section does not have hundreds
         */
        if (i === 0 && levels[i].length === 3 && levels[i][0]  === '0') {
            separator = ' and ';
        }

        words && dollarSections.push(
            (separator + words + ' ' + LEVEL_DESCRIPTIONS[i]).trimRight()
        )
    }

    //Add the word 'dollar(s)' at the end
    if (dollarSections.length) {
        dollarsAsWords = dollarSections.join('') + ' dollar' + (dollarsAsString === '1' ? '' : 's')
    }

    //Get the cents amount
    let centsAsWords = twoDigitNumberToText(centsAsString)

    //Add the word 'cent(s)' at the end
    if (centsAsWords) {
        centsAsWords += ' cent' + (centsAsString === '1' ? '' : 's')
    }

    //Return dollars and cents combined
    return [dollarsAsWords, centsAsWords].filter(Boolean).join(' and ')
}

function threeDigitNumberToText(digitsAsString: string): string {
    const twoDigitWords = twoDigitNumberToText(digitsAsString.substr(-2,2))

    if (digitsAsString.length <= 2 || digitsAsString[0] === '0') {
        return twoDigitWords
    }

    //add the hundreds to the beginning
    return [
        ONES[digitsAsString[0]] + ' hundred',
        twoDigitWords
    ].filter(Boolean).join(' and ')
}

function twoDigitNumberToText(digitsAsString: string): string {
    if (digitsAsString === '00') {
        return ''
    }

    if (digitsAsString.length === 2 && digitsAsString[0] === '1') {
        return TEENS[digitsAsString];
    }

    const oneDigitWord = oneDigitNumberToText(digitsAsString.substr(-1,1))

    if (digitsAsString.length === 1) {
        return oneDigitWord
    }

    return [
        TENS[digitsAsString[0]],
        oneDigitWord
    ].filter(Boolean).join('-')
}

function oneDigitNumberToText(digitAsString: string): string {
    if (digitAsString === '0') {
        return ''
    }

    return ONES[digitAsString];
}