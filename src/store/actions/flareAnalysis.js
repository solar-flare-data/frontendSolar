const analyzeFlare = (flare) => {
  const { classType, sourceLocation, linkedEvents } = flare;

  let reason = "Не определено";
  let consequences = "Не определены";
  let dangerLevel = 1;

  if (classType.startsWith("X")) {
    reason = "Очень сильная вспышка, возможное нарушение магнетосферы Земли.";
    consequences =
      "Могут возникнуть серьезные проблемы с радиосвязью, спутниками и навигацией.";
    dangerLevel = 95;
  } else if (classType.startsWith("M")) {
    reason = "Средняя вспышка, сопровождается усилением солнечной активности.";
    consequences =
      "Могут быть перебои с радиосвязью на высоких широтах и влияние на спутники.";
    dangerLevel = 70;
  } else if (classType.startsWith("C")) {
    reason = "Небольшая вспышка, происходящая на активных солнечных участках.";
    consequences = "Маловероятно, что будут заметные влияния на Земле.";
    dangerLevel = 40;
  }

  if (sourceLocation.includes("E0") || sourceLocation.includes("W0")) {
    consequences +=
      " Вспышка направлена в сторону Земли, что увеличивает риск.";
    dangerLevel += 15;
  }

  if (linkedEvents && linkedEvents.length > 0) {
    linkedEvents.forEach((event) => {
      if (event.activityID.includes("CME")) {
        consequences +=
          " Вспышка связана с корональной массой, что усиливает ее эффект.";
        dangerLevel += 25;
      }
    });
  }

  return { reason, consequences, dangerLevel };
};

export default analyzeFlare;
