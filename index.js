var csv = require("fast-csv");
var replace = require("replace");
var fs = require('fs')

var yamlfilename = 'destination.yml'
var yamlfilepath = '' + yamlfilename;


fs.readFile(yamlfilepath, 'utf8', function (err, dataa) {
    if (err) {
        return console.log(err);
    }
    var result = dataa;

    var rl = require('readline').createInterface({
        terminal: false,
        input: require('fs').createReadStream(yamlfilepath)
    });

    rl.on('line', function (ymlline) {
            console.log('Line from file:', ymlline);
            csv
                .fromPath("source.csv")
                .on("data", function (transline) {
                    var ymlline_split = ymlline.split("'");
                    //console.log(ymlline_split[1]);
                    //  console.log("checking "+"("+ymlline_split[1]+" === "+transline[0]+")");
                    if (ymlline_split[1] === transline[0]) {
                        console.log("Match found!");
                        //console.log(data[0]);

                        result = result.replace(RegExp(ymlline_split[1], 'g'), transline[1]);
                        console.log(RegExp(ymlline_split[1], 'g') + " " + transline[1]);
                        //console.log(result);

                    }
                })
                .on("end", function () {
                    //console.log("done");
                    fs.writeFile(yamlfilepath, result, 'utf8', function (err) {
                        console.log("I wrote this on file " + result);
                        if (err) return console.log(err);
                    });
                });
        })
//        .on('close', function () {
//            fs.writeFile(yamlfilepath, result, 'utf8', function (err) {
//                console.log("I wrote this on file " + result);
//                if (err) return console.log(err);
//            });
//        });
});