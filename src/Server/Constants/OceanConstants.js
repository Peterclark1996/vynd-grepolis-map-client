export const GetOceanList = () => {
    const oceanList = []
    for (let x = 1; x < 9; x++) {
        for (let y = 1; y < 9; y++) {
            oceanList.push(x.toString() + "" + y.toString())
        }
    }
    return oceanList
}