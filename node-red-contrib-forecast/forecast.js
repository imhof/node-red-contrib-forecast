/**
 * Copyright 2015 Tiago Machado.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

module.exports = function (RED) {
  var Forecast = require ('forecast')

  function ForecastNode(n){
    RED.nodes.createNode(this, n);
    this.key = n.key;
    this.units = n.units;
    this.latitude = n.latitude;
    this.longitude = n.longitude;
    this.forecastConfig = RED.nodes.getNode(this.forecast);
    if (this.forecastConfig){
      
      forecast = new Forecast({
        service: 'forecast.io',
        key: this.key,
        units: this.units,
        cache: true,      //TODO  Cache 
      });
      
      var node = this;
      node.on('input', function (msg) {
        var key = node.key || msg.key || '';
        var latitude = node.latitude || msg.latitude || '';
        var longitude = node.longitude || msg.longitude || '';
        this.sendMsg = function(err, result){
          
          if (err){ //TODO Does it works ? 
            node.error(err.toString());
            node.status({ fill: 'red', shape: 'ring', text: 'failed' });

          }
          node.status({}); // TODO WHY ?

          //result.once('close', function() { conn.end(); });
          //result.pipe(fs.createWriteStream(localFilename));
          msg.payload = forecast.get ([this.latitude, this.longitude], true, function (err, weather){
            if (err) return console.dir(err);
            return weather; //TODO does it works ? 
          });

        }
      });

    }
  }

  RED.nodes.registerType('forecast', ForecastNode);
}
