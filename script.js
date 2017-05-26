var Node = neataptic.Node;
var Neat = neataptic.Neat;
var Network = neataptic.Network;
var Methods = neataptic.Methods;
var Architect = neataptic.Architect;
var Trainer = neataptic.Trainer;
var j = 0;
var numeroImagens = 10;
var network;

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
  loadImage(i, set, 'low', function(baseImage){
    canvas.width = baseImage.width;
    canvas.height = baseImage.height;
    context.drawImage(baseImage, 0, 0 );
    var myData = context.getImageData(0, 0, baseImage.width, baseImage.height);
    var newData = [];
    for(var j = 0; j < 1024 ; j++){
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
    // console.log("Satan + " + i);
    callback(baseImage);
  };

}

function prepareImageArray(i, numeroImageTest, set, trainingSet, canvas, context, callback){
  if(i === numeroImageTest + 1){
    callback(trainingSet);
    return;
  }
  loadImage(i, set, 'low', function(baseImage){
    if(baseImage === null){
      prepareImageArray(i + 1, numeroImageTest, set, trainingSet, canvas, context, callback);
      return;
    }
    canvas.width = baseImage.width;
    canvas.height = baseImage.height;
    context.drawImage(baseImage, 0, 0 );
    var myData = context.getImageData(0, 0, baseImage.width, baseImage.height);
    var newData = [];
    // console.log(myData);
    // console.log(myData.data);
    for(var j = 0; j < 1024 ; j++){
      newData[j] = myData.data[j * 4];
      // console.log("Enchendo no vetor " + myData[j]);
    }
    // console.log(newData);
    trainingSet[i - 1] = {input: newData, output: [i / numeroImagens]};
    prepareImageArray(i + 1, numeroImageTest, set, trainingSet, canvas, context, callback);
    // context.clearRect(0, 0, img.width, img.height)
    // console.log("Training " + trainingSet[i - 1].output);
  });

}

$('#load').click(function(event){
  $.getJSON("resources/trained_network/teste_10Img_10000Ite_70Camadas.json", function(json) {
      console.log("Loaded JSON");
      network = Network.fromJSON(json);
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
    return
  }
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  validateTest(1, 10, 'f1', canvas, context);
});

$('#train').click(function( event  ) {
  event.preventDefault();
  j++;
  network = new Architect.Perceptron(1024, 512, 1);

  var trainingSet = [];
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  prepareImageArray(1, 10, 'f1', trainingSet, canvas, context, function(trainSet){
    console.log("Iniciou")
    network.train(trainSet, {
      log: 50,
      iterations: 1000,
      error: 0.0004,
      rate: 0.0001
    });
    console.log('Terminou');
  });

});
