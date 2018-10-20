function make_my_hypercube(app) {
    var hyperCubeDef = {
        qDimensions: [
        {
            qDef: {
                qFieldDefs: ['Country']
            }
        },
        // {
        //     qDef: {
        //         qFieldDefs: ['Partner List']
        //     }
        // }
        ],
        qMeasures: [
          {
            qDef: { qDef: '=count([Commitment Title])' },
            qSortBy: { qSortByNumeric: true }
          }         
        ],
        qInterColumnSortOrder: [2, 0, 1],
        qInitialDataFetch: [
        {
            qTop: 0,
            qLeft: 0,
            qHeight: 200,
            qWidth: 3
        }
        ]
    }
    app.createCube(hyperCubeDef, hypercube => {
        // after creating a cube you define a callback function to handle it
        // this function will be called each time the data changes (ie. when
        // someone makes a selection).


        // the basic matrix of data is available in the hypercube datapages
        let matrix = hypercube.qHyperCube.qDataPages[0].qMatrix

            // you can then treat the matrix as an array
            matrix.forEach((row, index) => {
                // the value for each column can be obtained by referencing array indexes
                // you can use qText for text values and qNum for numerical
                console.log("Country:", row[0].qText)
                // let partners = row[1].qText.split(",")
                // partners.forEach((partner, index) => {
                //   console.log("Partner ", index, " : ", partner)
                // })
                console.log("Commitment title count : " , row[1].qText)
            })
    })
}

// this is the config object used to connect to an app on a Qlik Sense server
var config = {
    host: 'playground-sense.qlik.com',
    prefix: '/showcase/',
    port: '443',
    isSecure: true,
    rejectUnauthorized: false,
    appname: '0b0fc6d5-05ce-44d7-95aa-80d0680b3559'
}

function main() {
    // our API uses requirejs, so here we're setting up our base URL
    require.config({
        baseUrl:
            (config.isSecure ? 'https://' : 'http://') +
            config.host +
            (config.port ? ':' + config.port : '') +
            config.prefix +
            'resources'
    })

    /**
     * Load the entry point for the Capabilities API family
     * See full documention:
     * https://help.qlik.com/en-US/sense-developer/September2018/Subsystems/APIs/Content/Sense_ClientAPIs/CapabilityAPIs/qlik-interface-interface.htm
     */
    require(['js/qlik'], function(qlik) {
        // We're now connected

        // Suppress Qlik error dialogs and handle errors how you like.
        qlik.setOnError(function(error) {
            console.log('ERROR', error)
        })

        // Open a dataset on the server
        app = qlik.openApp(config.appname, config)
        console.log("App Opened", app)
        make_my_hypercube(app);
    })
}
