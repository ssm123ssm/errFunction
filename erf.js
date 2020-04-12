$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "ccc.csv",
        dataType: "text",
        success: function (res) {
            var raw = res.split('\n');
            raw.pop();

            var data = [];
            raw.forEach(function (item) {
                data.push(parseInt(item))
            });
            console.log(data);
            var days = [];

            for (var i = 0; i < data.length; i++) {
                days.push(i)
            }

            /*var MAX_DEATHS = 3300;
            var MAX_TIME = 100;*/
            var minSqr = null;
            var cur_death;
            var cur_time;

            for (var MAX_DEATHS = 0; MAX_DEATHS < 30000; MAX_DEATHS++) {
                console.log(MAX_DEATHS);

                for (var MAX_TIME = 0; MAX_TIME < 200; MAX_TIME++) {

                    var sqrSum = 0;
                    var estArr = [];
                    for (var i = 0; i < data.length; i++) {
                        var est = (math.erf(((i + 1) / MAX_TIME * 4) - 2) + 1) * MAX_DEATHS / 2;
                        sqrSum += Math.pow(est - data[i], 2) / data.length
                    }
                    //console.log('LOSS ' + sqrSum)
                    if (minSqr == null) {
                        minSqr = sqrSum;

                    } else {
                        if (sqrSum < minSqr) {
                            minSqr = sqrSum;
                            cur_death = MAX_DEATHS;
                            cur_time = MAX_TIME;
                        }

                    }

                }
            }


            console.log('DONE')
            console.log(cur_death, cur_time)

        }
    });
});
