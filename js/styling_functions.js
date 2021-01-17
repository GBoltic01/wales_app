function styleTrafficCount(a) {
    return  a < 5000 ? 2 :
            a < 10000 ? 3 :
            a < 30000 ? 5 :
            a < 50000 ? 7 :
            a < 80000 ? 9 : 10  
};

function accidentsColour(a) {
    return  a == 1 ? "black" : 
            a == 2 ? "red" : 
            a == 3 ? "#ffd738" : "#ffd738"
};

function styleInm(a) {
    return  a === "Shared_Use" ? "#2b83ba" :
            a === "Cycling" ? "#d7191c" : 
            a === "Walking" ? "#1a9641" : "#1a9641"
};

function styleErm(a) {
    return  a === "tf_shared_away" ? "#2b83ba" : 
            a === "tf_segregated" ? "#2b83ba" : 
            a === "tf_segregated_away" ? "#2b83ba" : 
            a === "tf_shared" ? "#2b83ba" : 
            a === "ped_cycle_zone" ? "#2b83ba" :
            a === "or_cycle_nonseg" ? "#d7191c" : 
            a === "or_cycle_segregated" ? "#d7191c" : 
            a === "tf_cycle_away" ? "#d7191c" : 
            a === "tf_cycle" ? "#d7191c" : 
            a === "tf_foot" ? "#1a9641" :  
            a === "tf_footway" ? "#1a9641" :  
            a === "ped_zone" ? "#1a9641" : 
            a === "no_footway" ? "grey" : "grey" 
};

function styleWimd(a) {
    return  a < 383 ? "#d7191c" :
            a < 764 ? "#fdae61" :
            a < 1146 ? "#ffff6e" :
            a < 1527 ? "#a6d96a" :
            a < 1909 ? "#1a9641" : "#1a9641"  
};

function styleTravelToWork(a) {
    return  a < 7.1 ? "#d7191c" :
            a < 11 ? "#f17c4a" :
            a < 15.8 ? "#fec981" :
            a < 22.6 ? "#ffffc0" :
            a < 31.9 ? "#c4e687" : 
            a < 44 ? "#77c35c" :
            a < 64.8 ? "#1a9641" : "#1a9641"  
};

function stylePopulationDensity(a) {
    return  a < 255 ? "#f7fbff" :
            a < 321 ? "#c8ddf0" :
            a < 410 ? "#73b3d8" :
            a < 854 ? "#2879b9" :
            a < 2152 ? "#08306b" : "#08306b"  
};

function styleEmploymentCentres(a) {
    return  a < 469 ? 4 :
            a < 878 ? 7 :
            a < 1731 ? 12 :
            a < 3688 ? 15 :
            a < 7571 ? 19 : 19  
};

function stylePct(a) {
    return  a < 1 ? 0 :
            a < 20 ? 1 :
            a < 40 ? 4 :
            a < 80 ? 6 :
            a < 120 ? 8 :
            a < 250 ? 10 : 10 
};