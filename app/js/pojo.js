module.exports = {
    subirrigation : class subirrigation{
        constructor(timingOfIrrigation, numberOfIrrigation,subDepth,minDays,sRate,maxDepth,typeOfR,earlyDate,latestDate){
            this.timingOfIrrigation = timingOfIrrigation;
            this.numberOfIrrigation = numberOfIrrigation;
            this.subDepth = subDepth;
            this.minDays = minDays;
            this.sRate = sRate;
            this.maxDepth = maxDepth;
            this.typeOfR = typeOfR;
            this.earlyDate = earlyDate;
            this.latestDate = latestDate;
        }
    }
}