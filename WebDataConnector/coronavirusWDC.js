
(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {

        var cols = [
            {
                id: "Country",
                columnRole: "dimension",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "CountryCode",
                columnRole: "dimension",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "Slug",
                columnRole: "dimension",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "NewConfirmed",
                alias: "NewConfirmed (Countries)",
                columnRole: "dimension",
                dataType: tableau.dataTypeEnum.int
            },
            {
                id: "TotalConfirmed",
                alias: "TotalConfirmed (Contries)",
                columnRole: "dimension",
                dataType: tableau.dataTypeEnum.int
            },
            {
                id: "NewDeaths",
                alias: "NewDeaths (Countries)",
                columnRole: "dimension",
                dataType: tableau.dataTypeEnum.int
            },
            {
                id: "TotalDeaths",
                alias: "TotalDeaths (Countries)",
                columnRole: "dimension",
                dataType: tableau.dataTypeEnum.int
            },
            {
                id: "NewRecovered",
                alias: "NewRecoverd (Countries)",
                columnRole: "dimension",
                dataType: tableau.dataTypeEnum.int
            },  
            {
                id: "TotalRecovered",
                alias: "TotalRecovered (Countries)",
                columnRole: "dimension",
                dataType: tableau.dataTypeEnum.int
            },  
            {
                id: "Date",
                alias: "Date (Countries)",
                columnRole: "dimension",
                dataType: tableau.dataTypeEnum.date
            }
        ];
    
        var tableSchema = {
            id: "coronavirus",
            alias: "coronavirus",
            columns: cols
        };
    
        schemaCallback([tableSchema]);
    };

 
    myConnector.getData = function (table, doneCallback) {
        $.getJSON("https://api.covid19api.com/summary", function(resp) {
            var feat = resp.Countries,
                tableData = [];
            // Iterate over the JSON object
            var i = 0;
            var len = feat.length;
            for (i , len ; i < len; i++) {
                tableData.push({
                    "Country": feat[i].Country ,
                    "CountryCode": feat[i].CountryCode,
                    "Slug": feat[i].Slug,
                    "NewConfirmed": feat[i].NewConfirmed,
                    "TotalConfirmed": feat[i].TotalConfirmed,
                    "NewDeaths": feat[i].NewDeaths,
                    "TotalDeaths": feat[i].TotalDeaths,
                    "NewRecovered": feat[i].NewRecovered,
                    "TotalRecovered": feat[i].TotalRecovered,
                    "Date": new Date(feat[i].Date)
                });
            }
    
            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);
    $(document).ready(function () {
        $("#submitButton").click(function () {
            tableau.connectionName = "Coronavirus";
            tableau.submit();
        });
    }); 

})();