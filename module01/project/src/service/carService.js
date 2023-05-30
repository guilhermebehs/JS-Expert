const BaseRepository = require('../repositories/base')

class CarService{
    constructor({cars}){
        this.carRepository = new BaseRepository({file:cars})
    }

    async getAvailableCars(carCategory){
        const carId = this.chooseRandomCar(carCategory)
        const car = await this.carRepository.find(carId)
        return car
    }

    getRandomPositionFromArray(list){
        const listLength = list.length
        return Math.floor(
            Math.random() * (listLength)
        )
    }

    chooseRandomCar(carCategory){
        const randomCarIndex = this.getRandomPositionFromArray(carCategory.carIds)
        const carId = carCategory.carIds[randomCarIndex]

        return carId
    }
    

}

module.exports = CarService