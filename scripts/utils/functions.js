export function addLikes (mediaEntityList) {
  let sumOfLikes = 0
  for (const entity of mediaEntityList) {
    sumOfLikes += entity.likes
  }
  return sumOfLikes
}
