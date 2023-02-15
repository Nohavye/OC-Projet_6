export function addLikes(mediaEntityList) {
    let sumOfLikes = 0
    for(let entity of mediaEntityList) {
        sumOfLikes += entity.likes
    }
    return sumOfLikes
}