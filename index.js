$(document).ready(function(){
  Parse.initialize("NuP776gLco53bPakUQ8ZabGNuLqyh8h8rauarOtH", "LYRQbABG6ffN6Af8hUJJksOOjk3R2CmHJfe2tEo9");
	
  if(Parse.User.current())
    if(Parse.User.current().get("emailVerified") == true)
      window.location.href = 'home.html';

  $('#login_form').on('submit', function (e) {
  	e.preventDefault();
  	Parse.User.logIn($("#user").val(), $("#password").val(), {
  		success: function(user) {
        if(Parse.User.current().get('emailVerified') != true){
          Parse.User.logOut();
          alert("Email address not verified. Please check your Columbia email!");
        }
        // else if(Parse.User.current().get('ban') != false){
        //   Parse.User.logOut();
        //   alert("This account has been banned. Please email partycastcu@gmail.com if you have questions regarding your ban.");
        // }
    		else
          window.location.href = 'home.html';
  		},
  		error: function(user, error) {
    		alert("Incorrect username or password");
  		}
		});
 	});

  $('#signup_form').on('submit', function (e) {
    e.preventDefault();
    if($.trim($("#first").val()) === "" || $.trim($("#last").val()) === "" || $.trim($("#email").val()) === "" || $.trim($("#signup_password").val()) === "")
      alert('You did not fill out all of the fields');  
    else if($.trim($("#email").val()).substr(-13) != "@columbia.edu" && $.trim($("#email").val()).substr(-12) != "@barnard.edu")
      alert('You need to have a Columbia or Barnard email to sign up');
    // else if(x == "bjb2153@columbia.edu" || x == "cs867@columbia.edu" || x == "as4393@columbia.edu" || x == "kpb2118@columbia.edu" || x == "dec23@columbia.edu" || x == "tkh2105@columbia.edu" || x == "sh2409@columbia.edu" || x == "npj2110@columbia.edu" || x == "mat51@columbia.edu" || x == "jk3776@columbia.edu" || x == "kdp2117@columbia.edu" || x == "ry2242@columbia.edu" || x == "jxz2101@columbia.edu" || x == "cy2352@columbia.edu" || x == "rjc2145@columbia.edu" || x == "psn2115@columbia.edu" || x == "kae2136@columbia.edu" || x == "mag2272@columbia.edu" || x == "lsh2125@columbia.edu" || x == "pab2163@columbia.edu" || x == "nj2289@columbia.edu" || x == "rr2914@columbia.edu" || x == "ah3283@columbia.edu" || x == "abr2138@columbia.edu" || x == "mo2493@columbia.edu" || x == "pmb2144@columbia.edu" || x == "aef2167@columbia.edu" || x == "bac2176@columbia.edu" || x == "tw2404@columbia.edu"){
    //   var user = new Parse.User();
    //   user.set("first", $("#first").val());
    //   user.set("last", $("#last").val());
    //   user.set("username", $("#email").val().toLowerCase());
    //   user.set("password", $("#signup_password").val());
    //   user.set("gender", $("#gender").val());
    //   user.set("email", $("#email").val().toLowerCase());
    //   user.set("ban", true);

    //   user.signUp(null, {
    //       success: function(user) {
    //         alert("You have been successfully signed up! Check your inbox for a verification email")
    //         $('#signup_form').each(function(){
    //           this.reset();
    //         });
    //       },
    //       error: function(user, error) {
    //         alert("Error: " + error.code + " " + error.message);
    //       }
    //   });
    // }
    else{
      var user = new Parse.User();
      user.set("first", $("#first").val());
      user.set("last", $("#last").val());
      user.set("username", $("#email").val().toLowerCase());
      user.set("password", $("#signup_password").val());
      user.set("gender", $("#gender").val());
      user.set("email", $("#email").val().toLowerCase());
      user.set("ban", false);

      user.signUp(null, {
          success: function(user) {
            alert("You have been successfully signed up! Check your inbox for a verification email")
            $('#signup_form').each(function(){
              this.reset();
            });
          },
          error: function(user, error) {
            alert("Error: " + error.code + " " + error.message);
          }
      });
    }
  });
});

function reset_password(){
  var email = prompt("Columbia email:");
  if(email === "") return;
 
  Parse.User.requestPasswordReset(email, {
    success:function() {
      alert("Reset instructions emailed to you.");
    },
    error:function(error) {
      alert(error.message);
    }
  });
};