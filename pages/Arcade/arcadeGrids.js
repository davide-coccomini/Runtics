
let Levels = [
    {
        level: 1,
        grid: [[1,1,3,1],[1,2,3,4],[1,2,1,1],[1,2,1,3]],
        rows:4,
        cols:4,
        maxScore: 10
    },
    {
        level: 2,
        grid: [[1,2,1,2],[3,3,6,1],[1,3,1,2],[1,1,1,6]],
        rows:4,
        cols:4,
        maxScore: 12
    },
    {
        level: 3,
        grid: [[1,1,3,3],[2,3,4,10],[1,1,1,2],[1,2,3,1]],
        rows:4,
        cols:4,
        maxScore: 20
    },
    {
        level: 4,
        grid: [[8,1,1,8],[1,3,3,1],[8,1,2,8],[1,1,4,1]],
        rows:4,
        cols:4,
        maxScore: 11
    },
    {
        level: 5,
        grid: [[1,2,3,4],[14,11,10,5],[13,12,9,6],[1,3,8,7]],
        rows:4,
        cols:4,
        maxScore: 105
    },
    {
        level: 6,
        grid: [[1,6,10,9],[8,18,10,1],[7,19,22,16],[6,9,10,1]],
        rows:4,
        cols:4,
        maxScore: 70
    },
    {
        level: 7,
        grid: [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]],
        rows:4,
        cols:4,
        maxScore: 73
    },
    {
        level: 8,
        grid: [[14,10,3,6],[15,1,2,7],[16,1,7,8],[24,20,18,16]],
        rows:4,
        cols:4,
        maxScore: 105
    },
    {
        level: 9,
        grid: [[10,9,1,2],[8,1,10,3],[7,2,9,6],[1,2,5,1]],
        rows:4,
        cols:4,
        maxScore: 31
    },
    {
        level: 10,
        grid: [[3,11,4,7],[9,5,8,1],[1,5,12,8],[9,10,13,14]],
        rows:4,
        cols:4,
        maxScore: 52
    },
    {
        level: 11,
        grid: [[3,6,3,16,19],[4,7,14,19,22],[9,20,17,23,12],[22,20,3,16,14],[17,22,24,16,12],[15,11,10,15,24]],
        rows:6,
        cols:5,
        maxScore: 99
    },
    {level: 12, grid: [[2,11,17,9,19],[9,5,22,3,20],[10,10,10,9,15],[13,13,4,22,8],[24,15,6,25,13],[5,12,23,14,9]], rows: 6, cols: 5, maxScore: 67},
    {level: 13, grid: [[14,16,23,14,15],[15,13,10,11,12],[8,3,3,22,17],[23,10,15,16,18],[8,3,18,3,3],[4,22,7,10,18]], rows: 6, cols: 5, maxScore: 75},
    {level: 14, grid: [[14,9,17,8,10],[4,4,24,18,10],[4,14,6,8,19],[4,5,4,16,7],[21,20,12,14,12],[16,3,23,11,12]], rows: 6, cols: 5, maxScore: 60},
    {level: 15, grid: [[16,14,6,19,14],[4,20,18,6,21],[14,23,12,2,13],[20,14,18,9,4],[25,22,21,9,13],[1,21,7,4,2]], rows: 6, cols: 5, maxScore: 100},
    {level: 16, grid: [[23,9,12,9,18],[2,7,9,3,13],[6,13,10,7,13],[4,11,19,8,1],[15,20,12,21,18],[3,19,7,7,7]], rows: 6, cols: 5, maxScore: 47},
    {level: 17, grid: [[20,22,17,14,23],[9,17,24,15,3],[25,10,5,11,18],[24,2,5,7,8],[24,23,21,25,16],[8,8,5,19,8]], rows: 6, cols: 5, maxScore: 75},
    {level: 18, grid: [[22,2,14,5,17],[10,11,13,8,20],[13,23,5,17,21],[13,1,2,19,22],[22,18,25,9,16],[10,22,7,13,17]], rows: 6, cols: 5, maxScore: 85},
    {level: 19, grid: [[3,20,19,21,12],[7,14,19,9,10],[2,12,20,8,4],[4,18,15,7,25],[8,12,15,2,7],[9,19,18,4,2]], rows: 6, cols: 5, maxScore: 78},
    {level: 20, grid: [[3,2,21,11,9],[15,10,9,17,12],[5,17,1,2,12],[2,19,20,8,18],[8,4,16,5,16],[2,3,20,9,20]], rows: 6, cols: 5, maxScore: 76},
    {level: 21, grid: [[16,16,6,24,14],[10,23,6,18,7],[16,22,20,22,15],[22,25,13,13,22],[8,8,4,25,18],[18,23,12,17,4]], rows: 6, cols: 5, maxScore: 84},
    {level: 22, grid: [[12,4,14,25,1],[1,2,14,5,24],[14,21,13,21,6],[15,8,16,5,19],[19,17,10,6,23],[14,10,3,5,1]], rows: 6, cols: 5, maxScore: 60},
    {level: 23, grid: [[15,7,8,24,23],[4,24,1,13,15],[2,12,14,7,9],[9,14,16,17,2],[3,19,7,3,16],[1,13,15,21,19]], rows: 6, cols: 5, maxScore: 82},
    {level: 24, grid: [[17,24,2,3,11],[25,18,11,10,6],[17,15,13,10,11],[21,4,6,12,14],[3,23,19,16,17],[12,8,7,1,9]], rows: 6, cols: 5, maxScore: 98},
    {level: 25, grid: [[9,18,2,1,19],[1,22,23,24,2],[17,15,18,14,6],[23,18,4,5,19],[20,1,11,1,7],[21,23,15,15,14]], rows: 6, cols: 5, maxScore: 97},
    {level: 26, grid: [[93,18,19,61,100,26],[38,75,98,57,83,31],[57,78,73,20,77,78],[96,71,17,101,98,94],[56,26,51,105,59,13],[50,51,13,69,26,45],[98,66,104,105,70,46]], rows: 7, cols: 6, maxScore: 573},
    {level: 27, grid: [[48,13,91,31,80,54],[78,93,93,98,51,13],[61,41,12,105,59,76],[100,20,42,63,60,66],[105,52,10,29,84,40],[57,49,16,31,36,65],[97,67,54,72,45,23]], rows: 7, cols: 6, maxScore: 418},
    {level: 28, grid: [[97,16,85,13,63,96],[103,104,64,67,36,27],[17,69,33,71,87,20],[43,53,27,109,88,99],[65,54,106,79,40,59],[92,63,55,47,67,25],[95,27,18,53,102,32]], rows: 7, cols: 6, maxScore: 546},
    {level: 29, grid: [[32,70,16,66,18,75],[79,66,91,82,87,11],[105,60,88,70,17,43],[53,45,20,107,41,40],[90,32,64,74,82,11],[84,68,18,41,24,47],[19,45,67,37,12,76]], rows: 7, cols: 6, maxScore: 387},
    {level: 30, grid: [[71,54,21,73,51,87],[79,10,45,31,47,105],[58,16,30,32,41,107],[95,53,16,106,11,92],[23,91,103,41,96,58],[49,70,97,32,33,101],[67,100,75,92,96,60]], rows: 7, cols: 6, maxScore: 526},
    {level: 31, grid: [[69,99,103,107,76,81],[109,108,55,23,26,101],[32,70,63,52,13,10],[51,109,76,39,69,100],[62,85,85,34,100,19],[34,31,69,85,27,92],[38,69,101,43,48,77]], rows: 7, cols: 6, maxScore: 475},
    {level: 32, grid: [[26,45,78,52,62,78],[33,67,93,25,103,107],[68,45,72,47,89,103],[97,100,100,52,101,34],[70,109,107,37,16,26],[48,96,74,72,108,87],[11,18,16,72,104,103]], rows: 7, cols: 6, maxScore: 460},
    {level: 33, grid: [[14,105,18,38,27,39],[30,39,64,27,98,83],[44,68,31,35,37,49],[72,98,92,99,51,65],[95,32,102,88,46,67],[102,80,60,95,61,76],[19,90,56,95,45,78]], rows: 7, cols: 6, maxScore: 440},
    {level: 34, grid: [[27,52,41,50,23,82],[89,45,11,54,15,100],[101,98,31,64,52,88],[96,87,106,103,52,32],[91,53,43,54,11,78],[12,24,59,107,67,103],[35,89,15,13,83,73]], rows: 7, cols: 6, maxScore: 429},
    {level: 35, grid: [[49,79,76,76,37,32],[67,32,72,13,42,46],[94,99,51,33,57,49],[90,72,62,91,68,76],[23,75,100,93,88,88],[98,14,57,82,61,29],[37,72,44,33,14,29]], rows: 7, cols: 6, maxScore: 615},
    {level: 36, grid: [[55,86,84,11,96,15],[48,69,49,96,94,105],[57,91,23,69,94,81],[76,12,31,15,96,52],[45,70,25,30,20,73],[23,73,90,44,103,104],[89,13,38,54,55,55]], rows: 7, cols: 6, maxScore: 415},
    {level: 37, grid: [[84,32,95,34,85,25],[13,82,91,62,90,48],[70,10,82,30,28,40],[69,60,45,40,71,60],[66,100,102,103,90,81],[103,87,75,28,56,74],[11,20,41,42,43,30]], rows: 7, cols: 6, maxScore: 561},
    {level: 38, grid: [[23,101,78,12,18,74],[59,93,76,65,39,42],[30,99,83,55,108,58],[69,42,99,82,106,98],[102,69,39,57,64,50],[85,88,58,39,59,96],[73,74,88,26,61,28]], rows: 7, cols: 6, maxScore: 481},
    {level: 39, grid: [[64,83,88,69,15,17],[87,62,45,55,96,14],[91,83,97,19,32,20],[11,50,13,33,72,78],[51,35,62,71,106,75],[47,91,93,27,70,58],[42,73,51,52,65,85]], rows: 7, cols: 6, maxScore: 344},
    {level: 40, grid: [[102,109,69,13,33,11],[68,33,47,41,79,17],[96,24,107,34,50,104],[71,103,75,16,67,38],[101,92,105,103,15,51],[76,62,92,93,12,73],[20,23,27,97,63,33]], rows: 7, cols: 6, maxScore: 498},
    {level: 41, grid: [[305,314,281,295,94,80,66],[185,127,83,94,192,202,304],[199,82,121,211,291,295,190],[150,40,235,157,93,20,63],[256,282,152,309,222,94,122],[50,239,214,202,260,55,134],[228,116,28,25,309,246,192],[264,118,51,179,213,319,84],[188,313,158,263,47,306,291],[262,237,133,317,280,58,316]], rows: 10, cols: 7, maxScore: 1162},
    {level: 42, grid: [[307,221,306,225,295,65,96],[177,248,199,204,292,218,113],[114,80,108,41,290,282,202],[318,297,34,233,91,171,147],[125,173,255,275,112,40,43],[256,281,317,69,186,244,285],[212,125,297,238,93,248,116],[298,47,31,202,308,271,85],[301,243,108,86,49,150,195],[253,176,152,121,245,195,23]], rows: 10, cols: 7, maxScore: 1651},
    {level: 43, grid: [[194,248,235,157,32,35,205],[38,36,233,64,233,170,261],[304,166,164,72,110,259,201],[201,34,88,21,283,148,41],[142,145,232,177,237,48,58],[286,125,24,291,187,300,281],[121,127,193,124,92,167,34],[237,143,84,218,76,193,163],[161,274,201,315,66,175,98],[266,101,109,292,292,22,213]], rows: 10, cols: 7, maxScore: 1016},
    {level: 44, grid: [[67,62,195,114,228,178,288],[74,129,60,236,298,245,89],[193,202,63,147,180,144,42],[67,289,228,266,265,309,147],[100,140,62,235,180,223,50],[183,258,31,140,143,155,58],[25,214,118,265,49,273,168],[249,156,140,201,176,164,205],[162,81,229,29,175,232,49],[101,76,96,206,81,75,274]], rows: 10, cols: 7, maxScore: 1068},
    {level: 45, grid: [[297,199,36,207,277,280,260],[171,29,264,265,28,78,48],[93,290,261,52,248,152,147],[271,246,165,186,216,275,127],[173,272,69,319,88,222,280],[217,32,77,82,122,157,318],[309,237,186,83,81,20,290],[28,181,62,122,125,229,72],[93,114,40,256,124,58,30],[80,96,67,258,142,256,299]], rows: 10, cols: 7, maxScore: 1327},
    {level: 46, grid: [[265,79,42,316,35,201,132],[250,34,221,139,150,218,219],[75,89,248,297,130,297,112],[90,246,56,68,146,194,289],[215,303,134,98,263,192,94],[120,227,199,313,24,206,86],[104,177,41,212,116,138,39],[146,268,273,159,61,75,205],[123,27,301,114,67,33,257],[109,248,171,167,133,170,298]], rows: 10, cols: 7, maxScore: 1220},
    {level: 47, grid: [[180,105,72,55,289,196,314],[158,118,252,120,83,257,246],[143,72,71,180,318,170,289],[275,290,272,175,24,148,66],[61,95,283,293,29,87,252],[156,63,40,94,290,144,242],[113,90,248,42,107,40,236],[301,103,309,302,125,23,171],[102,278,307,274,213,304,284],[223,266,255,75,64,65,241]], rows: 10, cols: 7, maxScore: 1554},
    {level: 48, grid: [[95,244,68,84,199,101,207],[293,222,81,109,292,174,152],[299,62,171,279,162,52,254],[279,108,29,251,251,56,126],[65,141,78,38,164,248,94],[51,80,319,210,284,144,35],[38,212,226,93,83,25,97],[255,247,230,85,196,317,186],[118,194,188,107,266,309,160],[111,317,130,306,95,215,310]], rows: 10, cols: 7, maxScore: 1339},
    {level: 49, grid: [[71,70,80,319,35,298,313],[268,198,128,202,249,26,135],[83,61,63,244,185,255,211],[102,221,65,300,196,114,72],[33,145,202,138,275,220,25],[188,210,170,78,278,280,130],[180,261,35,109,272,187,108],[277,42,61,95,96,103,97],[300,168,299,281,261,202,267],[135,288,222,257,191,180,59]], rows: 10, cols: 7, maxScore: 1440},
    {level: 50, grid: [[239,30,21,255,81,186,263],[197,275,75,153,112,295,244],[221,141,69,200,229,113,301],[38,35,306,267,170,310,203],[164,171,142,232,277,296,194],[319,318,34,138,296,131,56],[227,62,259,285,46,144,152],[74,97,68,146,49,164,154],[134,262,73,106,128,216,84],[266,56,35,37,78,160,143]], rows: 10, cols: 7, maxScore: 1291},
    {level: 51, grid: [[43,67,151,157,211,231,135],[213,25,229,72,96,265,110],[206,50,231,48,35,144,47],[194,111,67,88,118,76,135],[22,72,130,303,299,161,175],[68,41,250,171,292,51,266],[284,47,235,309,162,51,100],[92,269,287,243,246,175,230],[67,39,28,243,233,131,37],[202,93,238,261,240,175,174]], rows: 10, cols: 7, maxScore: 1125},
    {level: 52, grid: [[305,102,190,230,111,134,162],[187,174,108,65,53,95,119],[227,243,29,83,265,308,314],[240,227,268,128,186,280,78],[105,175,216,35,42,153,107],[314,102,317,97,236,117,260],[269,183,244,82,286,28,151],[91,275,107,211,89,276,197],[125,233,71,218,262,230,231],[189,254,171,211,304,274,122]], rows: 10, cols: 7, maxScore: 1417},
    {level: 53, grid: [[181,194,228,219,215,136,319],[286,85,241,171,109,218,150],[101,191,302,287,64,207,90],[228,265,136,198,134,84,96],[211,280,160,215,258,96,308],[228,276,48,53,179,295,259],[186,221,267,189,112,187,72],[142,40,179,199,198,279,245],[140,238,108,73,303,246,233],[178,259,99,97,267,272,149]], rows: 10, cols: 7, maxScore: 1378},
    {level: 54, grid: [[262,122,243,228,226,28,47],[260,178,117,301,209,253,175],[206,309,205,282,239,79,143],[308,129,98,289,258,174,20],[263,96,104,112,64,143,108],[76,105,314,145,121,305,173],[40,222,255,97,205,39,194],[28,198,208,163,318,67,61],[55,102,97,319,103,128,155],[177,261,113,49,300,35,52]], rows: 10, cols: 7, maxScore: 1188},
    {level: 55, grid: [[154,287,172,112,307,207,154],[143,247,80,61,28,233,235],[300,319,292,54,130,126,232],[83,100,249,176,108,282,49],[209,60,28,61,202,148,23],[262,64,72,69,277,205,61],[20,160,268,280,173,285,124],[148,81,298,87,42,21,191],[94,221,146,33,127,152,155],[298,169,252,169,127,123,35]], rows: 10, cols: 7, maxScore: 1144}
]


module.exports = Levels;