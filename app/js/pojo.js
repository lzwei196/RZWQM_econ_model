module.exports = {
    subirrigation : class subirrigation{
        constructor(timingOfIrrigation, numberOfIrrigation,subDepth,minDays,sRate,maxDepth,typeOfR,datePojo){
            this.timingOfIrrigation = timingOfIrrigation;
            this.numberOfIrrigation = numberOfIrrigation;
            this.subDepth = subDepth;
            this.minDays = minDays;
            this.sRate = sRate;
            this.maxDepth = maxDepth;
            this.typeOfR = typeOfR;
            this.datePojo = datePojo;
        }
    }
}