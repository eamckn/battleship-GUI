export default Ship = (length) => {
  length;
  let hitCount = 0;
  let sunk = false;

  const hit = function increaseHitCountOnShip() {
    hitCount++;
  };

  const getHitCount = function getCurrentHitCount() {
    return hitCount;
  };

  const isSunk = function checkIfShipHasBeenSunk() {
    sunk = hitCount === length ? true : false;
    return sunk;
  };

  return { hit, getHitCount, isSunk };
};
