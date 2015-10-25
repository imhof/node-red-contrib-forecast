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

  function ForecastNode(config){
    RED.nodes.createNode(this, config);
    
    this.key = config.key;
    this.units = config.units;
    this.latitude = config.latitude;
    this.longitude =  config.longitude;
    
    forecast = new Forecast({
      service: 'forecast.io',
      key: this.key,
      units: this.units,
      cache: true,      //TODO  Cache 
    });
      
    var node = this;
    this.on('input', function(msg){
      forecast.get ([this.latitude, this.longitude], true, function (err, weather){
        if (err) return console.log(err);
        //console.log(weather);
        node.send({payload:weather});
        return weather; //TODO do I need this ?
      });
      
    });

  }

  RED.nodes.registerType('forecast', ForecastNode);
}


