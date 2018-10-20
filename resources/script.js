function make_my_hypercube(app) {
    var hyperCubeDef = {
        qDimensions: [
        {
            qDef: {
                qFieldDefs: ['Country']
            }
        },
        ],
        qMeasures: [
        {
            qDef: { qDef: '=count([Commitment Title])' },
            qSortBy: { qSortByNumeric: true }
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
    app.createCube(hyperCubeDef, hypercube => {
        // after creating a cube you define a callback function to handle it
        // this function will be called each time the data changes (ie. when
        // someone makes a selection).

        // the basic matrix of data is available in the hypercube datapages
        let matrix = hypercube.qHyperCube.qDataPages[0].qMatrix

        // sort the results by number of commitments
        var sortResults = []

        // you can then treat the matrix as an array
        matrix.forEach((row, index) => {
            // the value for each column can be obtained by referencing array indexes
            // you can use qText for text values and qNum for numerical
            console.log(row[0].qText + ' ' + row[1].qNum);
            var element = {country: row[0].qText, commits: row[1].qNum};
            sortResults.push(element);
        })

        sortResults.sort(function(a, b) {
            return a.commits - b.commits;
        });
        console.log(sortResults);
    })
}

// this is the config object used to connect to an app on a Qlik Sense server
var config = {
    host: 'playground-sense.qlik.com',
    prefix: '/showcase/',
    port: '443',
    isSecure: true,
    rejectUnauthorized: false,
    appname: '1a95d089-d275-466b-ae89-695a226048c4'
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
