var Node = neataptic.Node;
var Neat = neataptic.Neat;
var Network = neataptic.Network;
var Methods = neataptic.Methods;
var Architect = neataptic.Architect;
var Trainer = neataptic.Trainer;
var j = 0;
var numeroImagens = 3;
var network;
var imgQuality = 'low';

$( document ).ready(function() {

});

// var console = {};
// console.log = function( a ){
//   $('#console').append('<p>'+ a +'</p>')
// };
// console.warn = function( a ){
//   $('#console').append('<p class="text-danger">'+ a +'</p>')
// };


function download(text, name, type){
    var a = document.createElement("a");
    var file = new Blob([text], {type: type});
    a.href = URL.createObjectURL(file);
    a.download = name;
    a.click();
}

function validateTest(i, numeroImageTest, set, canvas, context){
  if(i === numeroImageTest + 1){
    return;
  }
  loadImage(i, set, imgQuality, function(baseImage){
    canvas.width = baseImage.width;
    canvas.height = baseImage.height;
    context.drawImage(baseImage, 0, 0 );
    var myData = context.getImageData(0, 0, baseImage.width, baseImage.height);
    var newData = [];
    for(var j = 0; j < baseImage.width * baseImage.height ; j++){
      newData[j] = myData.data[j * 4];
    }
    var out = network.activate(newData) * numeroImagens;
    console.log('Testando Imagem ' + i + ': ' + out);
    validateTest(i + 1, numeroImageTest, 'f2', canvas, context);
  });

}

function loadImage(i, set, quality, callback){
  var baseImage = new Image();
  baseImage.src = 'resources/img/' + set + '/' + quality + '/' + i + '.jpg';
  baseImage.onerror = function(){
    callback(null);
  };
  baseImage.onload = function(){
    callback(baseImage);
  };

}

function prepareImageArray(i, numeroImageTest, set, trainingSet, canvas, context, callback){
  if(i === numeroImageTest + 1){
    callback(trainingSet);
    return;
  }
  loadImage(i, set, imgQuality, function(baseImage){
    if(baseImage === null){
      prepareImageArray(i + 1, numeroImageTest, set, trainingSet, canvas, context, callback);
      return;
    }
    canvas.width = baseImage.width;
    canvas.height = baseImage.height;
    context.drawImage(baseImage, 0, 0 );
    var myData = context.getImageData(0, 0, baseImage.width, baseImage.height);
    var newData = [];
    for(var j = 0; j < baseImage.width * baseImage.height; j++){
      newData[j] = myData.data[j * 4];
    }
    trainingSet[i - 1] = {input: newData, output: [i / numeroImagens]};
    prepareImageArray(i + 1, numeroImageTest, set, trainingSet, canvas, context, callback);
  });

}

$('#load').click(function(event){
  $.getJSON("resources/trained_network/Neur32.json", function(json) {
      network = Network.fromJSON(json);
      console.log("Loaded JSON");
  });
});

$('#save').click(function(event){
  if(network === undefined){
    return;
  }
  var exported = network.toJSON();
  exported = JSON.stringify(exported);
  download(exported, 'Neur.json', 'text/json');
});

$('#test').click(function(event){
  if(network === undefined){
    return;
  }
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  validateTest(1, numeroImagens, 'f2', canvas, context);
});

$('#train').click(function( event  ) {
  event.preventDefault();
  j++;
  network = new Architect.Perceptron(1024, 512, 1);

  var trainingSet = [];
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  prepareImageArray(1, numeroImagens, 'f1', trainingSet, canvas, context, function(trainSet){
    console.log("Iniciou");
    network.train(trainSet, {
      log: 1000,
      iterations: 10000,
      error: 0.0000001,
      rate: 0.001
    });
    console.log('Terminou');
  });

});
