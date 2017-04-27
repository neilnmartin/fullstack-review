import $ from 'jquery';
var React = require('react');

var ajaxPost = (username, updateState) => {
  var data = JSON.stringify({username: username});
  console.log('Posting data: ', data);
  $.ajax({
    url: SERVER + ':' + PORT + '/repos/import', //'http://localhost:5000/repos/import',
    method: 'POST',
    contentType: 'application/json',
    processData: false,
    data: data,
    success: (data) =>{
      console.log('POST success: ', data);
      updateState(data);
    },
    error: (data) => {
      console.log('POST error: ', data);
      console.log(SERVER, PORT);
    }
  });
};

export default ajaxPost;