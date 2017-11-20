app.controller('KonashiBlinkController',
  function($scope, $location, $window, ngDialog) {
    $scope.deviceName = '';

    var SERVICE_UUID = createUUID('ff00');
    var PIO_SETTING_CHARACTERISTIC_UUID = createUUID('3000');
    var PIO_OUTPUT_CHARACTERISTIC_UUID = createUUID('3002');
    var pioSetting;
    var pioOutput;

    $scope.scanDevice = function() {
      navigator.bluetooth.requestDevice({
        filters: [
          {
            namePrefix: 'konashi'
          }
        ],
        optionalServices: [SERVICE_UUID]
      })
      .then(device => {
        console.log("Device selected");
        console.log("Device Name: " + device.name);
        console.log("ID: " + device.id);
        $scope.deviceName = device.name;
        $scope.$apply();

        return device.gatt.connect();
      })
      .then(server => {
        console.log("Connected to device");

        return server.getPrimaryService(SERVICE_UUID);
      })
      .then(service => {
        console.log("Getting characteristic");
        return Promise.all([
          service.getCharacteristic(PIO_SETTING_CHARACTERISTIC_UUID),
          service.getCharacteristic(PIO_OUTPUT_CHARACTERISTIC_UUID)
        ]);
      }).then(characteristics => {
        pioSetting = characteristics[0];
        pioOutput = characteristics[1];

        console.log("Finished connection");
        console.log(pioSetting);
        console.log(pioOutput);

        blink();
      })
      .catch(error => {
        ngDialog.open({template: error.message, plain: true, width:320});
      });
    };

    function blink() {
      var data = new Uint8Array(1);
      data[0] = 1 << 1;
      pioSetting.writeValue(data);
      setInterval(function() {
        data[0] ^= (1 << 1);
        pioOutput.writeValue(data);
      }, 500);
      pioOutput.writeValue(data);
    }

    function createUUID(part) {
      return '229b' + part + '-03fb-40da-98a7-b0def65c2d4b';
    }
  });
