# node-red-contrib-forecast
A simple Node-RED node that gets the forecast data from forecast.io.
To get this data you need to supply your API key (more information here: https://developer.forecast.io). It is free of charge until 1.000 requests/day. 


Install
-------

Run the following command in the root directory of your Node-RED install

        npm install node-red-contrib-forecast

Example
-------
A simple flow that gets the forecast data and uses the Template function to show the data:

    [{"id":"2acd37f.fd532c8","type":"forecast","key":" ","units":"celcius","latitude":"-15.7941454","longitude":"-47.8825479","name":"Brasilia forecast","x":267,"y":50,"z":"126bf43e.ed940c","wires":[["69090ad6.96f6f4"]]},{"id":"8cf6106c.7309f","type":"inject","name":"Read","topic":"","payload":"test2","payloadType":"none","repeat":"","crontab":"","once":false,"x":84,"y":50,"z":"126bf43e.ed940c","wires":[["2acd37f.fd532c8"]]},{"id":"69090ad6.96f6f4","type":"template","name":"weather template","field":"payload","format":"handlebars","template":"{{#payload}}\n    {{#currently}}\nCurrent situation is {{{summary}}}, and temperature is {{{temperature}}}.\n    {{/currently}}\n    {{#daily}}\nFor the rest of the week the summary is: {{{summary}}}\n    {{/daily}}\n{{/payload}}\n","x":457,"y":50,"z":"126bf43e.ed940c","wires":[["c11cda2e.3ee328"]]},{"id":"c11cda2e.3ee328","type":"debug","name":"","active":true,"console":"false","complete":"payload","x":655,"y":51,"z":"126bf43e.ed940c","wires":[]}]
    
    
