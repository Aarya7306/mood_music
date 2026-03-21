const moodMap={
    happy: "happy songs",
    sad: "sad songs",
    calm: "calm relaxing songs",
    angry : "angry rock songs"
};

const getIntensityQuery =(mood,intensity)=>{
    if(!intensity || intensity === "normal"){
        return moodMap[mood] ;
    }
    if (intensity === "high") return `very ${moodMap[mood]}`;
  if (intensity === "low") return `light ${moodMap[mood]}`;
  return moodMap[mood];
};

 export default { moodMap,getIntensityQuery };

