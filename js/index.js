// // // show loader on page load
// $(document).ready(function () {
//   // $('.loading').hide();
// });

// // initializeApp
// const firebaseApp = firebase.initializeApp({
//   apiKey: "AIzaSyBABYSKw9SNQ4zEHTP9wYC-gDVw_dy2XjI",
//   authDomain: "webdemo-c1945.firebaseapp.com",
//   databaseURL: "https://webdemo-c1945.firebaseio.com",
//   projectId: "webdemo-c1945",
//   storageBucket: "webdemo-c1945.appspot.com",
//   messagingSenderId: "448312953544",
//   appId: "1:448312953544:web:34a8cb12d55ec12cb933fd",
//   measurementId: "G-2C0N9ER52Z",
// });
// const db = firebaseApp.firestore();
// const auth = firebaseApp.auth();
// // on state change
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    selectgoaldata(user.uid);
  }
});

// logout
$("#logout").click(function () {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      window.location.reload();
    })
    .catch((error) => {
      // An error happened.
    });
});

// message icon onclick css
$(".message_icon").click(function () {
  $(".message_icon").css("background-color", "rgba(68, 68, 68, 0.8)");
});

// toggling goal module
$(".m_head").on("click", function () {
  $(this).parent().find(".module_data").toggle();
  $(this).parent().find(".icon").toggleClass("rotate_icon");
});

//fetch goal in select
function selectgoaldata(uid) {
  db.collection("goals").onSnapshot((querySnapshot) => {
    querySnapshot.forEach((querySnapshot) => {
      // console.log(querySnapshot.data())
      // $('#select_goal').append('<option value="">Select Goal</option>');
      if (querySnapshot.data()["uid"] == uid) {
        $("#selectGoalData select").append(
          '<option value="' +
            querySnapshot.data()["refId"] +
            '">' +
            querySnapshot.data()["goalname"] +
            "</option>"
        );
        $(".loading").hide();
      } 
      // else {
      //   // if not available then redirect to add goal page
      //   // window.location = baseurl + "pages/addgoal.html";
      // }
    });
  });
}

$("#selectGoalData select").change(function () {
  var user = firebase.auth().currentUser;
  if(user!==null){
    console.log(user.uid)
  }
  var refId = $("#selectGoalData select").val();

  $("#information_contain").empty();
  $(".module_contain ").empty();

  db.collection("goals")
    .doc(refId)
    .onSnapshot((doc) => {
      var data = doc.data();

      console.log(data);
      //get current date
      var date = new Date(doc.data()["duration"]);
      var diff = new Date(date - new Date());
      days = Math.floor(diff / 1000 / 60 / 60 / 24);

      //append html data of information container
      var buddy =
        '<div class="row"><div class="heading">Buddy</div><div class="animated_icon"><lottie-player src="https://assets5.lottiefiles.com/packages/lf20_6chbdoa4.json" background="transparent" speed="1" loop autoplay><lottie-player></div><div class="score">335</div></div>';

      $("#information_contain").append(buddy);

      var timeleft =
        '<div class="row"><div class="heading">time</div><div class="animated_icon"><lottie-player src="https://assets4.lottiefiles.com/packages/lf20_0mszk3tz.json" background="transparent" speed="1" loop autoplay><lottie-player></div><div class="score">0hr</div></div>';

      $("#information_contain").append(timeleft);

      var duration =
        '<div class="row"><div class="heading st">Days left</div><div class="animated_icon"><lottie-player src="https://assets6.lottiefiles.com/packages/lf20_zqw0q7sb.json" background="transparent" speed="1" loop autoplay ><lottie-player></div><div class="score">' +
        days +" Days"
        "</div></div>";

      $("#information_contain").append(duration);
      //end here

      //append module_contain data
      var moduleContainData = '<div class="module"><div class="heading m_head"><h4>'+data['goalname']+'</h4> <div class="icon"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none" /> <path fill="rgba(255, 255, 255, 0.6)" d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg></div></div><!-- <div class="module_data"> -->';
        $('.module_contain').append(moduleContainData);
        var add = '<div style="display: flex; flex-direction: column;" class="row" ><div class="col"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="mdi-check" width="24" height="24" viewBox="0 0 24 24" ><path fill="#7C4297" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" /></svg> Demo Lecture</div><div style="display: flex;-direction: row;border-top: 1px solid #454545;overflow-x: scroll;justify-content: center;align-items: center;padding-top:0.5rem;" class="col" ><video width="200" height="100" controls><source src="./image/demovideo.mp4" type="video/mp4" /></video><a href="./image/samplepdf.pdf" style=" padding: 0.5rem;text-decoration: none; color: white; background: purple; border-radius: 5px;  display: grid;place-items: center;text-align: center;height: 50px;">Download Notes</a></div></div>';
        $('.module_contain').append(add)
        $.each(data['module'],function(key,value){
          var moduleContainData = '<div class="row"><div class="col"><div class="icon"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="mdi-check" width="24" height="24" viewBox="0 0 24 24" ><path fill="#7C4297" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" /></svg> </div> <div class="title">'+value+'</div> </div> <div class="col"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" ><path d="M0 0h24v24H0V0z" fill="none" /> <path fill="rgba(255, 255, 255, 0.6)" d="M8.59 16.59L13.17 12 8.59 7.41  10 6l6 6-6 6-1.41-1.41z" /> </svg> </div> </div>';
          $('.module_contain').append(moduleContainData)
        });
        $('.module_contain').append('</div></div></div>')   
    });
});
