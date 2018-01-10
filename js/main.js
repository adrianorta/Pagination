//Unobtrusive pagination setup
$('.page').append(`<div class="pagination"><ul></ul></div>`);

//Unobtrusive search field setup
$('.page-header').append(
  `<div class="student-search">
    <input placeholder="Search for students...">
    <button>Search</button>
  </div>`
);

//Add pages and functionality to the setup
function generatePages(list){
  let studentList = ``;
  const studentListLength = $(list).length;

  //Clear all pages to prepare for changes
  $('.pagination ul li').each(function(){
    this.remove();
  })

  //Generate new pages and functionality if more than 10 students
  if(studentListLength > 10) {
    //Generate page links
    for(let i = 0; i < (studentListLength / 10); i += 1){
      studentList += `<li><a href="#">` + (i+1) + `</a></li>`;
    }
    $('.pagination ul').append(studentList);

    //Set first page as active
    setActivePage(document.querySelector('.pagination a'));

    //Click to navigate student pages
    $('.pagination ul li a').click(function(e){
      setActivePage(this);

      //Fix page clicks from scrolling to top of page
      e.preventDefault();

      //Display students for selected page
      let end = parseInt($(this).text()) * 10;
      let begin = end - 9;
      $(list).each(function(index){
        if(index < begin || index > end ) {
          $(this).hide();
        } else {
          $(this).show();
        }
      });
    });
  }

  //Show first 10 students in the list upon page load
  $(list).each(function(index){
    if(index > 9 ) {
      $(this).hide();
    }
  });
}
generatePages($('.student-list li'));

//Active Link Helper Function
function setActivePage(element) {
  $('.pagination ul li a').each(function(){
    $(this).removeClass('active');
  });
  $(element).addClass('active');
}

//Search logic
$('.student-search button').click(function(){
  const searchString = $('.student-search input').val().toLowerCase();

  //Compare search query to student information and display results
  $('.student-list li').each(function(){
    const studentInfoString =
        $(this).children('.student-details').text().toLowerCase();
    if(searchString == null || searchString == ''){
      window.location.reload();
    } else if(~studentInfoString.indexOf(searchString)) {
      $(this).show();
      $(this).addClass('searched');
    } else {
      $(this).hide();
      $(this).removeClass('searched');
    }
  });
  generatePages($('.searched'));

  //Alert user of 0 student search query
  if($('.searched').length < 1) {
    alert('No students matched your search!');
  }
});

//Press ENTER to search
$('.student-search input').keypress(function(e){
    if(e.which == 13){
      $('.student-search button').click();
    }
});
