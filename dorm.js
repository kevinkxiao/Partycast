$(document).ready(function(){
  Parse.initialize("NuP776gLco53bPakUQ8ZabGNuLqyh8h8rauarOtH", "LYRQbABG6ffN6Af8hUJJksOOjk3R2CmHJfe2tEo9");

  if(Parse.User.current())
    if(Parse.User.current().get("emailVerified") == true){}
    else
      window.location.href = 'index.html';
  else
    window.location.href = 'index.html';

  document.getElementById('party_table').innerHTML += '<tr><td><strong><u>Party</u></strong></td><td><strong><u>Date</u></strong></td><td><strong><u>Time</u></strong></td><td><strong><u>Room</u></strong></td><td><strong><u>Ppl</u></strong></td><td><strong><u>Description</u></strong></td></tr>';
  if(Parse.User.current().get('ban') != false)
    document.getElementById('party_table').innerHTML += '<tr><td colspan="6">No parties right now. Host one of your own!</td></tr>';
  else{
    document.getElementById('party_table').innerHTML += '<tr id="load_tr"><td colspan="6">Loading...</td></tr>'
    var Party = Parse.Object.extend("parties");
    query = new Parse.Query(Party);
  
    query.equalTo('dorm', document.title);
    query.ascending('date');
    // query.limit = 10;

    query.find({
      success: function(results) {
        for(index = 0; index < results.length; ++index){
          var date = results[index].get('date').toDateString().split(" ");
          var row = '<tr><td>'+results[index].get('name')+'</td><td>'+date[1]+' '+date[2]+'</td><td>'+results[index].get('time')+'</td><td>'+results[index].get('room')+'</td><td>'+results[index].get('people')+'</td><td>'+results[index].get('descrip')+'</td></tr>';
          document.getElementById('party_table').innerHTML += row;
        }
        document.getElementById("load_tr").className = "hidden";
        if(results.length == 0)
          document.getElementById('party_table').innerHTML += '<tr><td colspan="6">No parties right now. Host one of your own!</td></tr>';
      },
      error: function(error) {
        alert("Fail to get");
      }
    });
  }

 //  function showParties(){
	// 	$.ajax({
 //        type:"POST",
 //    		url:"http://192.168.0.183/party/pull_parties.php",
 //    		data:{action:document.title},
 //     		success:function(data){
 //        	$("#partyList").html(data);
 //      	}
	// 	});
	// }
	// showParties();
});