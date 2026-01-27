// Random function
const randomNumber = (number: number) => {
    return Math.floor(Math.random() * number) // Min 0 - Max (number -1)
}

export { randomNumber }