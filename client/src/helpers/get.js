import $ from 'jquery';

var ajaxGet = (updateState) => {
  $.ajax({
    url: 'http://127.0.0.1:1128/repos',
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