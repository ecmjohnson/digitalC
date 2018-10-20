function twoDimensions(app, dim1, dim2) {
    var hyperCubeDef = {
        qDimensions: [
          {
              qDef: { qFieldDefs: [dim1] }
          },
          {
              qDef: { qFieldDefs: [dim2] }
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
        let matrix = hypercube.qHyperCube.qDataPages[0].qMatrix
        var list = []
            matrix.forEach((row, index) => {
                var obj = {}
                // if row[0] have multiple things
                if (row[0].qText.includes(",") == true) {
                  let dimension1 = row[0].qText.split(",")
                  var row0 = []
                  dimension1.forEach((dim, index) => {
                    console.log(`${dim1} ${index}: ${dim}`)
                    row0.push[dim]
                  })
                  obj[dim1] = row0
                } else {
                  obj[dim1] = row[0].qText
                  console.log(`${dim1}` + ":", row[0].qText)
                }

                //if row[1] have multiple things
                if (row[1].qText.includes(",") == true) {
                  let dimension2 = row[1].qText.split(",")
                  var row1 = []
                  dimension2.forEach((dim, index) => {
                    console.log(`${dim2} ${index}: ${dim}`)
                  })
                  obj[dim2] = row1
                } else {
                  obj[dim2] = row[1].qText
                  console.log(`${dim2}` + ":", row[0].qText)
                }
                list.push(obj)
                return list
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
        var ret_list = twoDimensions(app, 'Commitment Title', 'Partner List'); // example 

    })
}
