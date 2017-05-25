var Node = neataptic.Node;
var Neat = neataptic.Neat;
var Network = neataptic.Network;
var Methods = neataptic.Methods;
var Architect = neataptic.Architect;
var Trainer = neataptic.Trainer;



$( document ).ready(function() {


});
var j = 0;

$('#test').click(function( event  ) {
  event.preventDefault();
  j++
  var network = new Architect.Perceptron(1024 * 4, 120 ,1);

  var vet = []
  //$('#actual').attr('src','resources/img/f1/full/'+j+'.png')
  for (var i = 1; i <= 10; i++) {
    $('#actual').attr('src','http://beholderdev.github.io/Neur/resources/img/f1/'+i+'.png')
    var img = document.getElementById('actual');
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0 );
    var myData = context.getImageData(0, 0, img.width, img.height);
    vet[i-1] = myData
    console.log(i)
  }
  // $('#actual').attr('src','https://beholderdev.github.io/Neur/resources/img/f1/'+j+'.png')
  // var img = document.getElementById('actual');
  // var canvas = document.createElement('canvas');
  // var context = canvas.getContext('2d');
  // canvas.width = img.width;
  // canvas.height = img.height;
  // context.drawImage(img, 0, 0 );
  // var myData = context.getImageData(0, 0, img.width, img.height);
  // console.log(myData);
  var trainingSet = [
    { input: vet[0], output: [1] },
    { input: vet[1], output: [2] },
    { input: vet[2], output: [3] },
    { input: vet[3], output: [4] },
    { input: vet[4], output: [5] },
    { input: vet[5], output: [6] },
    { input: vet[6], output: [7] },
    { input: vet[7], output: [8] },
    { input: vet[8], output: [9] },
    { input: vet[9], output: [10] }
  ];
  network.train(trainingSet, {
    // log: 10,
    iterations: 100,
    error: 0.0001,
    rate: 0.2
  });
  console.log('acabo')
  $('#actual').attr('src','http://beholderdev.github.io/Neur/resources/img/f2/'+2+'.png')
  var img = document.getElementById('actual');
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  canvas.width = img.width;
  canvas.height = img.height;
  context.drawImage(img, 0, 0 );
  var myData = context.getImageData(0, 0, img.width, img.height);

  var out = network.activate(myData);
  console.log(out)
  // var i1 = $('#input1').val()
  // var i2 = $('#input2').val()
  // var out = network.activate([i1,i2])
  // $('#output').val(out)
});
//drawGraph(network.graph(400, 400), '.draw', false);
