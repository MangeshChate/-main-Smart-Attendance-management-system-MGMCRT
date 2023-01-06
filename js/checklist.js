let PresentStudent = [];

function startlist() {
  console.log("attendance start");
  alert('Attendance Start')
  let check = document.getElementsByTagName("input");

  let checklist = [];
  for (var i = 0; i < check.length; i++) {
    if (check[i].type == "checkbox") {
      let cvalue = check[i].value;
      
      // console.log(cvalue); 
      check[i].addEventListener("change", function () {
        if (this.checked) {
          checklist.push(cvalue);
          // console.log(checklist)
          PresentStudent = getUnique(checklist);
          console.log(PresentStudent);
          // console.log("check box is not checked !");
          document.getElementById('arraySubmit').setAttribute("value" ,PresentStudent)
        }


      });
    }
  }
}
  function getUnique(array) {
    var uniqueArray = [];

    for (var value of array) {
      if (uniqueArray.indexOf(value) === -1) {
        uniqueArray.push(value);
      }
    }
    return uniqueArray;
  }


  function submit(){
    alert("Submit Today's Attendance");

   

    
  }
// console.log(PresentStudent)
// function submitlist() {}
// exports.PresentStudent = PresentStudent;
