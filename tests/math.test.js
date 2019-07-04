const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit, add } = require('../src/math')


test('Hello World!', () => {

})


test('Should Calcualte Total w/ Custom Tip', () => {
    const total = calculateTip(10, .3)

    /* Expect Criteria */
    expect(total).toBe(13)

    /* Manual Criteria 
    if (total !== 13) {
        throw new Error('Total tip should be 13. Got ' + total)
     } */
})


test('Should Calcualte Total w/ Default Tip', () => {
    const total = calculateTip(10)
    expect(total).toBe(12.5)
})


test(' Should Convert Farenheit to Celsius', () => {
    const degreesCelsius = fahrenheitToCelsius(32)
    expect(degreesCelsius).toBe(0)
})


test('Should Convert Celsius to Farenheit', () => {
    const degreesFarenheit = celsiusToFahrenheit(0)
    expect(degreesFarenheit).toBe(32)
})

// test('Async Demo', (done) => { // tell jest this is a asynchronous op by adding "done"
//     setTimeout(() => {
//         expect(1).toBe(2)
//         done() // call done() so jest knows that all work has been completed
//     }, 2000)
// })

test('Should Add 2 Numbers (Promise Chaining)', (done) => {
    add(2,3).then((sum) => {
        expect(sum).toBe(5)
        done()
    })
})

test('Should Add 2 Numbers (Async/Await)', async () => {
    const sum = await add(4,6)
    expect(sum).toBe(11)
})

/* Jest comes with an asserstion library */


