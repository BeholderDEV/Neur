var Node = neataptic.Node;
var Neat = neataptic.Neat;
var Network = neataptic.Network;
var Methods = neataptic.Methods;
var Architect = neataptic.Architect;
var Trainer = neataptic.Trainer;

function tryShit(){
  var network = new Architect.Perceptron(2, 3 ,1);
  var trainingSet = [
    { input: [0, 0], output: [0] },
    { input: [1, 1], output: [2] }
  ];
  network.train(trainingSet, {
    // log: 10,
    iterations: 1000,
    error: 0.0001,
    rate: 0.2
  });
  var out = network.activate([0, 0]);
  console.log("Result com valores maiores que um: " + out)

  var out = network.activate([1, 1]);
  console.log("Result com valores maiores que um: " + out)

  var trainingSet = [
    { input: [0, 0], output: [0 / 2] },
    { input: [1, 1], output: [2 / 2] }
  ];
  network.train(trainingSet, {
    // log: 10,
    iterations: 1000,
    error: 0.0001,
    rate: 0.2
  });

  var out = network.activate([0, 0]) * 2;
  console.log("Result com valores normalizados: " + out)

  var out = network.activate([1, 1]) * 2;
  console.log("Result com valores normalizados: " + out)
}



$( document ).ready(function() {

});

var j = 0;
var numeroImagens = 145;

$('#test').click(function( event  ) {
  event.preventDefault();

  tryShit()

  // j++
  var network = new Architect.Perceptron(1024, 70 ,1);

  var vet = []
  //$('#actual').attr('src','resources/img/f1/full/'+j+'.png')
  for (var i = 1; i <= 10; i++) {
    $('#actual').attr('src','resources/img/f1/low/'+i+'.jpg')
    var img = document.getElementById('actual');
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0 );
    var myData = context.getImageData(0, 0, img.width, img.height);
    var newData = []
    for(var j = 0; j < 1024 ; j++){
      newData[j] = myData[j*3]
    }
    vet[i-1] = newData
    console.log(i)
  }
  var trainingSet = [
    { input: vet[0], output: [1 / numeroImagens] },
    { input: vet[1], output: [2 / numeroImagens] },
    { input: vet[2], output: [3 / numeroImagens] },
    { input: vet[3], output: [4 / numeroImagens] },
    { input: vet[4], output: [5 / numeroImagens] },
    { input: vet[5], output: [6 / numeroImagens] },
    { input: vet[6], output: [7 / numeroImagens] },
    { input: vet[7], output: [8 / numeroImagens] },
    { input: vet[8], output: [9 / numeroImagens] },
    { input: vet[9], output: [10 / numeroImagens] }
  ];
  network.train(trainingSet, {
    // log: 10,
    iterations: 100,
    error: 0.0001,
    rate: 0.2
  });
  console.log('acabo')
  $('#actual').attr('src','resources/img/f2/low/'+8+'.jpg')
  var img = document.getElementById('actual');
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  canvas.width = img.width;
  canvas.height = img.height;
  context.drawImage(img, 0, 0 );
  var myData = context.getImageData(0, 0, img.width, img.height);
  var newData = []
  for(var j = 0; j < 1024 ; j++){
    newData[j] = myData[j*3]
  }
  var out = network.activate(newData) * numeroImagens;
  console.log("Testando imagens 8, resultado da rede neural: " + out)
});
