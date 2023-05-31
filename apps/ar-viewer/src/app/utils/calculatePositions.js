export const calculatePositions = (collection, radius, insetFactor = 0.75) => {
  const count = collection.length;
  const constant = (2 * Math.PI) / count;

  let output = [];
  // Dont need all the meta data stuff in here. Refactor
  for (let i = 0; i < count; i++) {
    const rotation = i * constant;
    output.push({
      x: radius * Math.sin(rotation),
      y: 0,
      z: radius * Math.cos(rotation),
      rotation: rotation + Math.PI,
      url: collection[i]?.url,
      title: collection[i]?.title || '',
      description: collection[i]?.description || '',
      externalLink: collection[i]?.externalLink || '',
      frame: collection[i]?.frame || null,
      type: collection[i]?.type || 'image',
      activeX: (radius - insetFactor) * Math.sin(rotation),
      activeY: 0.1,
      activeZ: (radius - insetFactor) * Math.cos(rotation),
    });
  }

  return output;
};
