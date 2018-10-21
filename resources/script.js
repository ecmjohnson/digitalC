function myFunction() {

var header = document.getElementsByClassName("header");
var sticky = header.offsetTop;

    console.log("yoooo");
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}

window.addEventListener('scroll', myFunction);


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
    var list = []

    return new Promise((resolve, reject) => {
        app.createCube(hyperCubeDef, hypercube => {
           let matrix = hypercube.qHyperCube.qDataPages[0].qMatrix
               matrix.forEach((row, index) => {
                   var obj = {}
                   // if row[0] have multiple things
                   if ( row[0].qText.includes(",") ) {
                     let dimension1 = row[0].qText.split(",")
                     obj[dim1] = dimension1
                   } else {
                     obj[dim1] = row[0].qText
                   }

                   //if row[1] have multiple things
                   if ( row[1].qText.includes(",") ) {
                     let dimension2 = row[1].qText.split(",")
                     obj[dim2] = dimension2
                   } else {
                     obj[dim2] = row[1].qText
                   }
                   list.push(obj)
               })
           resolve(list);
       })
    });



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
      var ret_list = twoDimensions(app, 'Partner List', 'Lead entity'); // example

      ret_list.then( (response) => {
          let partnerList = response;

          console.log(partnerList[0]["Lead entity"]);
      });

  })
}
