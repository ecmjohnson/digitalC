// this is the config object used to connect to an app on a Qlik Sense server
var config = {
  host: 'playground-sense.qlik.com',
  prefix: '/showcase/',
  port: '443',
  isSecure: true,
  rejectUnauthorized: false,
  appname: '0b0fc6d5-05ce-44d7-95aa-80d0680b3559'
}

var app;

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

    let goals = {
        qDef: {
          qFieldDefs: ["Goal ID"],
          qSortCriterias: [{ qSortByState: 1 }, { qSortByAscii: 1 }]
        },
        qInitialDataFetch: [
          {
            qTop: 0,
            qLeft: 0,
            qHeight: 2000,
            qWidth: 1
          }
        ]
      }


    function createGoalList(response) {

        const list = document.getElementById('goalsList');

        // here we can see the actual list of data is available in the qListObject
        response.qListObject.qDataPages[0].qMatrix.forEach( row => {

            var goal = document.createElement("div");
            // and give it some content
            var goalContent = document.createTextNode(`${row[0].qText}`);
            // add the text node to the newly created div
            goal.appendChild(goalContent);

            list.addEventListener("click", () => {
                // on click we can have the selection of the value toggled
                app.field("Goal ID").selectValues([row[0].qText], true, true)
            });

            list.appendChild(goal);
        })
    }

      app.createList(goals, createGoalList);


  })


}
