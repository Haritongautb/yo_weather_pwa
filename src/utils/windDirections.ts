export const windDirections = (windDegree: number) => {
  let windImg;
  if (windDegree >= 225 && windDegree < 315) {
    windImg = "/wind-direction/left.png";
  } else if (windDegree >= 135 && windDegree < 225) {
    windImg = "/wind-direction/straight.png";
  } else if (windDegree >= 45 && windDegree < 135) {
    windImg = "/wind-direction/right.png";
  } else {
    windImg = "/wind-direction/straight.png";
  }

  return windImg;
};
