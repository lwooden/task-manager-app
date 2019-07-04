const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit } = require('../src/math')

// Test 1
test('Hello World!', () => {

})

// Test 2
test('Should Calcualte Total w/ Custom Tip', () => {
    const total = calculateTip(10, .3)

    /* Expect Criteria */
    expect(total).toBe(13)

    /* Manual Criteria 
    if (total !== 13) {
        throw new Error('Total tip should be 13. Got ' + total)
     } */
})

// Test 3
test('Should Calcualte Total w/ Default Tip', () => {
    const total = calculateTip(10)
    expect(total).toBe(12.5)
})

// Test 4 
test(' Should Convert Farenheit to Celsius', () => {
    const degreesCelsius = fahrenheitToCelsius(32)
    expect(degreesCelsius).toBe(0)
})

// Test 5
test('Should Convert Celsius to Farenheit', () => {
    const degreesFarenheit = celsiusToFahrenheit(0)
    expect(degreesFarenheit).toBe(32)
})


/* Jest comes with an asserstion library */


