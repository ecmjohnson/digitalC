function create_top_cube(app, dim1, measurement) {
    var hyperCubeDef = {
        qDimensions: [
          {
              qDef: { qFieldDefs: ["Commitment Title"] }
          }
        ],
        qMeasures: [ 
        {
            qDef: { qDef: '=count([' + measurement + '])' },
            qSortBy: { qSortByNumber: true}
        }
        ],
        qInterColumnSortOrder: [1, 0],
        qInitialDataFetch: [
        {
            qTop: 0,
            qLeft: 0,
            qHeight: 2000,
            qWidth: 3
        }
        ]
    }
    var list = []
    var first, second, third
    app.createCube(hyperCubeDef, hypercube => {
        let matrix = hypercube.qHyperCube.qDataPages[0].qMatrix
            matrix.forEach((row, index) => {
                /*if (first == null) {
                    first = row
                    list.push(row)
                } else if (second == null) {
                    second = row
                    list.push(row)
                } else if (third == null) {
                    third = row
                    list.push(row)
                } else {
                    return
                }*/
                console.log(row[0] + ":" + row[1]);
                var obj = {}
                // if row[0] have multiple things
                if (row[0].qText.includes(",") == true) {
                  let dimension1 = row[0].qText.split(",")
                  obj[dim1] = dimension1
                } else {
                  obj[dim1] = row[0].qText
                }

                //if row[1] have multiple things
                if (row[1].qText.includes(",") == true) {
                  let measurement = row[1].qText.split(",")
                  obj[measurement] = measurement
                } else {
                  obj[measurement] = row[1].qText
                }
                list.push(obj)
            })
    })

    return list;
}

function get_top_commitments(app) {
    var list = create_top_cube(app, "Commitment Title", "Partners")
    console.log(list);
}

