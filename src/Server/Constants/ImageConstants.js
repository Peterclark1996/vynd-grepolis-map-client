import Jimp from 'jimp'

const islandScale = 0.0775

var islandImageCache = {}

export const GetIslandImage = async id => {
    if (!(id in islandImageCache)) {
        if (!(id in islandImagesNames)) return

        const islandImage = await Jimp.read(islandImagesNames[id])
        islandImage.resize(islandImage.bitmap.width * islandScale, islandImage.bitmap.height * islandScale)
        islandImageCache[id] = islandImage
    }
    return islandImageCache[id]
}

const islandImagesNames = {
    1: './public/Images/island1.png',
    2: './public/Images/island2.png',
    3: './public/Images/island3.png',
    4: './public/Images/island4.png',
    5: './public/Images/island5.png',
    6: './public/Images/island6.png',
    7: './public/Images/island7.png',
    8: './public/Images/island8.png',
    9: './public/Images/island9.png',
    10: './public/Images/island10.png',
    11: './public/Images/uninhabited1.png',
    12: './public/Images/uninhabited2.png',
    13: './public/Images/uninhabited3.png',
    14: './public/Images/uninhabited4.png',
    15: './public/Images/uninhabited5.png',
    16: './public/Images/uninhabited6.png',
    17: './public/Images/uninhabited7.png',
    18: './public/Images/uninhabited8.png',
    19: './public/Images/uninhabited9.png',
    20: './public/Images/uninhabited10.png',
    37: './public/Images/island11.png',
    38: './public/Images/island12.png',
    39: './public/Images/island13.png',
    40: './public/Images/island14.png',
    41: './public/Images/island15.png',
    42: './public/Images/island16.png',
    43: './public/Images/island17.png',
    44: './public/Images/island18.png',
    45: './public/Images/island19.png',
    46: './public/Images/island20.png',
    51: './public/Images/uninhabited11.png',
    52: './public/Images/uninhabited12.png',
    53: './public/Images/uninhabited13.png',
    54: './public/Images/uninhabited14.png',
    55: './public/Images/uninhabited15.png',
    56: './public/Images/uninhabited16.png',
    57: './public/Images/uninhabited17.png',
    58: './public/Images/uninhabited18.png',
    59: './public/Images/uninhabited19.png',
    60: './public/Images/uninhabited20.png',
}