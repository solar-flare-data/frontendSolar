const analyzeFlare = (flare) => {
  const { classType, sourceLocation, linkedEvents } = flare;

  let reason = "Not determined";
  let consequences = "Not determined";
  let dangerLevel = 1;

  if (classType.startsWith("X")) {
    reason =
      "Extremely strong flare, possible disruption of Earth's magnetosphere.";
    consequences =
      "Severe issues with radio communication, satellites, and navigation may occur.";
    dangerLevel = 95;
  } else if (classType.startsWith("M")) {
    reason = "Moderate flare, accompanied by increased solar activity.";
    consequences =
      "Possible disruptions in radio communication at high latitudes and effects on satellites.";
    dangerLevel = 70;
  } else if (classType.startsWith("C")) {
    reason = "Small flare occurring in active solar regions.";
    consequences = "Unlikely to have significant effects on Earth.";
    dangerLevel = 40;
  }

  if (sourceLocation.includes("E0") || sourceLocation.includes("W0")) {
    consequences +=
      " The flare is directed towards Earth, increasing the risk.";
    dangerLevel += 15;
  }

  if (linkedEvents && linkedEvents.length > 0) {
    linkedEvents.forEach((event) => {
      if (event.activityID.includes("CME")) {
        consequences +=
          " The flare is associated with a coronal mass ejection, amplifying its impact.";
        dangerLevel += 25;
      }
    });
  }

  return { reason, consequences, dangerLevel };
};

export default analyzeFlare;
