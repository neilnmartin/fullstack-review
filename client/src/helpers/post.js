import $ from 'jquery';


var ajaxPost = (username, updateState) => {
  var data = JSON.stringify({username: username});
  console.log('Posting data: ', data);
  $.ajax({
    url: 'http://127.0.0.1:1128/repos/import',
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
    }
  });
};

export default ajaxPost;