var list = []
var commitment_list = []
var entities_list = []
var partners_list = []

var process_results_called = false
function create_top_cube(app, dim1, measurement, my_callback) {
    var hyperCubeDef = {
        qDimensions: [
          {
              qDef: { qFieldDefs: [dim1] }
          }
        ],
        qMeasures: [
        {
            qDef: { qDef: '=count([' + measurement + '])' },
            //qDef: { qDef: ''},
            qSortBy: { qSortByNumeric: -1}
        }
        ],
        qInterColumnSortOrder: [1, 0],
        qInitialDataFetch: [
        {
            qTop: 0,
            qLeft: 0,
            qHeight: 2000,
            qWidth: 2
        }
        ]
    }

    var first, second, third, fourth, percentageValue
    app.createCube(hyperCubeDef, hypercube => {
        let matrix = hypercube.qHyperCube.qDataPages[0].qMatrix
            matrix.forEach((row, index) => {
                if (first == null) {
                    process_results_called = false
                    first = row
                    list.push(row)
                } else if (second == null) {
                    second = row
                    list.push(row)
                } else if (third == null) {
                    third = row
                    list.push(row)
                }else if (fourth==null){
                  fourth=first[1].qNum+second[1].qNum+third[1].qNum
                  percentageValue=(fourth/hypercube.qHyperCube.qGrandTotalRow[0].qNum)*100
                  list.push(percentageValue)
                }else if (process_results_called != true){
                    process_results_called = true
                    my_callback(list)
                    list = []
                    return
                }
            })
    })
}

function get_top_commitments(app, update_liquid_gauges_cb) {
    commitment_list = create_top_cube(app, "Commitment Title", "Partners", update_liquid_gauges_cb)
    partners_list = create_top_cube(app, "Country", "Partners", update_liquid_gauges_cb)
    entities_list = create_top_cube(app, "Partners", "Lead entity", update_liquid_gauges_cb)
}
