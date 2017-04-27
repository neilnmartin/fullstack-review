import $ from 'jquery';
var React = require('react');

var ajaxGet = (updateState) => {
  $.ajax({
    url: SERVER + ':' + PORT + '/repos/', //'http://localhost:5000/repos/',
    method: 'GET',
    success: (data) =>{
      console.log('Success: ', data);
      updateState(data);
    },
    error: (data) => {
      console.log('Error: ', data);
    }
  });
};

export default ajaxGet;