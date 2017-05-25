var Node = neataptic.Node;
var Neat = neataptic.Neat;
var Network = neataptic.Network;
var Methods = neataptic.Methods;
var Architect = neataptic.Architect;
var Trainer = neataptic.Trainer;


// var network = new Architect.Perceptron(1024 * 3, 120 ,1);
$( document ).ready(function() {

  // network.train(trainingSet, {
  //   iterations: 10000000,
  //   error: 0.0001,
  //   rate: 0.2
  // });
});
var j = 0;
// $('#actual').click(function( event  ) {
//   $("#actual").broiler(function(color) {
//     // do what ever you want with the color object, for example an alert
//     alert("red:"+color.r+" green:"+color.g+" blue:"+color.b+" alpha:"+color.a);
//   });
// });
$('#test').click(function( event  ) {
  event.preventDefault();
  j++




  $('#actual').attr('src','resources/img/f1/full/'+j+'.png')
  var img = document.getElementById('actual');
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  canvas.width = img.width;
  canvas.height = img.height;
  context.drawImage(img, 0, 0 );
  var myData = context.getImageData(0, 0, img.width, img.height);
  console.log(myData);


  // canvas.width = img.width;
  // canvas.height = img.height;
  // canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
  // // var context  = canvas.getContext('2d');
  // // for(var i = 0)
  // var pixelData = canvas.getContext('2d').getImageData(16, 16, 1, 1).data;
  // // var myData = context.getImageData(0, 0, event.offsetX, event.offsetY);
  // console.log(pixelData)


  // var i1 = $('#input1').val()
  // var i2 = $('#input2').val()
  // var out = network.activate([i1,i2])
  // $('#output').val(out)
});
//drawGraph(network.graph(400, 400), '.draw', false);
