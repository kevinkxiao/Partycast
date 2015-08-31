$(document).ready(function(){
  Parse.initialize("NuP776gLco53bPakUQ8ZabGNuLqyh8h8rauarOtH", "LYRQbABG6ffN6Af8hUJJksOOjk3R2CmHJfe2tEo9");

  if(Parse.User.current())
    if(Parse.User.current().get("emailVerified") == true){}
    else
      window.location.href = 'index.html';
  else
    window.location.href = 'index.html';
  
  document.getElementById('account_details').innerHTML += '<span>Name:</span> ' + Parse.User.current().get('first') + ' ' + Parse.User.current().get('last') + '<br>';
  document.getElementById('account_details').innerHTML += '<span>Email:</span> ' + Parse.User.current().get('email') + '<br>';
  document.getElementById('account_details').innerHTML += '<span>Gender:</span> ' + Parse.User.current().get('gender') + '<br>';
  document.getElementById('party_table').innerHTML += '<tr><td><strong><u>Party</u></strong></td><td><strong><u>Date</u></strong></td><td><strong><u>Time</u></strong></td><td><strong><u>Dorm</u></strong></td><td><strong><u>Room</u></strong></td><td><strong><u>Ppl</u></strong></td></tr>';
  document.getElementById('party_table').innerHTML += '<tr id="load_tr"><td colspan="6">Loading...</td></tr>';

  var Party = Parse.Object.extend("parties");
  query = new Parse.Query(Party);
  if(Parse.User.current().get('email') != "kkx2101@columbia.edu")
    query.equalTo('author', Parse.User.current().get('email'));
  query.ascending('date');
  // query.limit = 10;

  query.find({
    success: function(results) {
      for(index = 0; index < results.length; ++index){
        var date = results[index].get('date').toDateString().split(" ");
        var row = '<tr><td>'+results[index].get('name')+'</td><td>'+date[1]+' '+date[2]+'</td><td>'+results[index].get('time')+'</td><td>'+results[index].get('dorm')+'</td><td>'+results[index].get('room')+'</td><td>'+results[index].get('people')+'</td></tr>';
        document.getElementById('party_table').innerHTML += row;
      }
      document.getElementById("load_tr").className = "hidden";
      if(results.length == 0)
        document.getElementById('party_table').innerHTML += '<tr><td colspan="6">You have no current parties</td></tr>';
    },
    error: function(error) {
      alert("Fail to get");
    }
  });

  $('#delete_party').on('submit', function (e) {
    e.preventDefault();
    if($.trim($("#name").val()) === "")
      alert('You did not fill out the party name');
    else{
      var Party = Parse.Object.extend("parties");
      query = new Parse.Query(Party);
      if(Parse.User.current().get('email') != "kkx2101@columbia.edu")
        query.equalTo('author', Parse.User.current().get('email'));
      query.equalTo('name', $("#name").val());

      query.find({
        success: function(results) {
          results[0].destroy({});
          if(results.length == 0)
            alert("No party with that name found!");
          else
            alert("Party deleted!")
        },
        error: function(error) {
          alert("Fail to get");
        }
      });
    }
  });
});