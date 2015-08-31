$(document).ready(function(){
  Parse.initialize("NuP776gLco53bPakUQ8ZabGNuLqyh8h8rauarOtH", "LYRQbABG6ffN6Af8hUJJksOOjk3R2CmHJfe2tEo9");
  if(Parse.User.current())
    if(Parse.User.current().get("emailVerified") == true){}
    else
      window.location.href = 'index.html';
  else
    window.location.href = 'index.html';

  if(Parse.User.current().get("ban") != false)
    document.getElementById('ban_notice').className = "hidden";

  var width = $(window).width();
  var coeff = width / 469;    
  $('area').each(function() {
    var pairs = $(this).attr('coords').split(',');
    for (var i = 0; i < pairs.length; i++) {
        pairs[i] = pairs[i] * coeff;
      }
    $(this).attr('coords', pairs.join(','));
  });

  var dorms = ["Carman", "John Jay", "Furnald", "McBain", "East Campus", "Ruggles", "Beta"];
  document.getElementById("count_table").innerHTML += '<tr id="load_tr"><td colspan="6">Loading...</td></tr>';
  var Party = Parse.Object.extend("parties");
  var counted_dorms = "0";
  for(var i = 0; i < dorms.length; i++){
    query = new Parse.Query(Party);
    query.equalTo('dorm', dorms[i]);

    query.find({
      success: function(results) {
        if(results.length != 0){
          if(Parse.User.current().get('ban') != false)
            document.getElementById("count_row").innerHTML += '<td>0</td>';
          else
            document.getElementById("count_row").innerHTML += '<td>' + results.length + '</td>';
          document.getElementById("dorm_row").innerHTML += '<td><strong>' + results[0].get('dorm') + '</strong></td>';
        }
      },
      error: function(error) {}
    });
  }
  document.getElementById('load_tr').className = "hidden";


  // document.getElementById('party_table').innerHTML += '<tr><td><strong><u>Party</u></strong></td><td><strong><u>Date</u></strong></td><td><strong><u>Time</u></strong></td><td><strong><u>Dorm</u></strong></td><td><strong><u>Room</u></strong></td><td><strong><u>Ppl</u></strong></td></tr>';
  // document.getElementById('party_table').innerHTML += '<tr id="load_tr"><td colspan="6">Loading...</td></tr>';
  // var Party = Parse.Object.extend("parties");
  // query = new Parse.Query(Party);
  // query.ascending('date');

  // query.find({
  //   success: function(results) {
  //     for(index = 0; index < 5; ++index){
  //       var date = results[index].get('date').toDateString().split(" ");
  //       var row = '<tr><td>'+results[index].get('name')+'</td><td>'+date[1]+' '+date[2]+'</td><td>'+results[index].get('time')+'</td><td>'+results[index].get('dorm')+'</td><td>'+results[index].get('room')+'</td><td>'+results[index].get('people')+'</td></tr>';
  //       document.getElementById('party_table').innerHTML += row;
  //     }
  //     document.getElementById("load_tr").className = "hidden";
  //     if(results.length == 0)
  //       document.getElementById('party_table').innerHTML += '<tr><td colspan="6">No parties right now</td></tr>';
  //   },
  //   error: function(error) {}
  // });

  var now = new Date();
  var month = (now.getMonth() + 1);               
  var day = now.getDate();
  if(month < 10) 
    month = "0" + month;
  if(day < 10) 
    day = "0" + day;
  var today = now.getFullYear() + '-' + month + '-' + day;
  $('#date_picker').val(today);

  $('#party_form').on('submit', function (e) {
    e.preventDefault();
    if($.trim($("#party_name").val()) === "" || $.trim($("#date_picker").val()) === "" || $.trim($("#time").val()) === "" || $.trim($("#people").val()) === "" || $.trim($("#descrip").val()) === "")
      alert('You did not fill out all of the fields');
    else{
      var Party = Parse.Object.extend("parties");
      var party = new Party();

      var d = $(this).serializeArray();
      for(index = 0; index < d.length; ++index){
        if(d[index].name.localeCompare('date') == 0){
          var date = new Date(d[index].value);
          date.setDate(date.getDate() + 1);
          party.set(d[index].name, date);
        }
        else
          party.set(d[index].name, d[index].value);
      }
      party.set('author', Parse.User.current().get('email'))
 
      if(Parse.User.current().get('ban') != false)
        alert("Error in adding party");
      else{
        party.save(null, {       
          success: function(item) {
            alert('Your party has been added! Have a wild night!');
            $('#party_form').each(function(){
              this.reset();
            });
          },
          error: function(gameScore, error) {
            alert("Fail to send");
          }
        });
      }
    }
  });

  $('#log_out').click(function(){
    Parse.User.logOut();
    window.location.href = 'index.html';
  });

  $('#account').click(function(){
    window.location.href = 'account.html';
  });

  // $(function(){
  //   $('form').on('submit', function (e) {
  //     console.log( $( this ).serializeArray() );
  //    	e.preventDefault();
  //    	$.ajax({
  //      	type: 'post',
  //      	url: 'http://192.168.0.183/party/push_form.php',
  //      	data: $('form').serialize(),
  //       success: function () {
  //       	alert('Your party has been added! Have a wild night!');
  //       }
  //     });
  //   });
  // });
});