var ext = '?registration/registration/courses/cmpt';

processResponse(ext);

// Gets JSON from SFU API and does initial processing.
function processResponse(urlExtension) {
  const baseUrl = 'https://www.sfu.ca/bin/wcm/academic-calendar';
  const fullUrl = baseUrl + urlExtension;
  const courses = [];
  const response = fetch(fullUrl).then(resp => resp.json()
    .then(data => { data.map(entry => courses.push({"code": `${entry.value}`, "title": `${entry.title}`}));
      var docText = document.querySelectorAll('p');
      doctText = Array.from(docText);
      const currDate = getDate();
      const destLink = `https://www.sfu.ca/students/calendar/${currDate[0]}/${currDate[1]}/courses/cmpt`
      // Convdrsion of array to object adapted from: https://stackoverflow.com/questions/42974735/create-object-from-array
      const courseObj = courses.reduce((acc, el) => {
        // Handling for different capitalization patterns of course codes
        acc[`cmpt ${el['code']}`] = `<a href="${destLink}/${el['code']}.html" title="${el['title']}"><mark>cmpt ${el['code']}</mark></a>`;
        acc[`Cmpt ${el['code']}`] = `<a href="${destLink}/${el['code']}.html" title="${el['title']}"><mark>Cmpt ${el['code']}</mark></a>`;
        acc[`CMPT ${el['code']}`] = `<a href="${destLink}/${el['code']}.html" title="${el['title']}"><mark>CMPT ${el['code']}</mark></a>`;
        return acc;
      }, {});
      // Adapted array to regexp conversion from: https://stackoverflow.com/questions/28280920/convert-array-of-words-strings-to-regex-and-use-it-to-get-matches-on-a-string
      const coursesRegex = new RegExp(Object.keys(courseObj).join("|"),"gi");
      docText.forEach(ptag => {
        courses.forEach(course => {
          const text = ptag.textContent.toUpperCase();
          if (text.includes(course['code'].toUpperCase())) {
            var elements = document.querySelectorAll('p, li, em');
            elements = Array.from(elements);
            updateValidElements(elements, course, coursesRegex, courseObj);
          };
        });
      });
    }));
};

// Examines elements to ensure they are not already hyperlinked, and then replaces them with the appropriate HTML to provide a hyperlink.
function updateValidElements(elements, course, coursesRegex, courseObj) {
  elements.forEach(el => {
    const descendants = el.querySelectorAll('a');
    // Ensure that none of the element's descendants are hyperlinks
    if (descendants.length == 0) {
      // Adapted dynamic regex replacement from: https://stackoverflow.com/questions/28280920/convert-array-of-words-strings-to-regex-and-use-it-to-get-matches-on-a-string
      el.innerHTML = el.innerHTML.replace(coursesRegex, function(matched){
        return courseObj[matched];
      });
    };
  });
};

// Helper for processing data.
function getDate() {
  const today = new Date();
  const year = today.getFullYear();
  const spring = [0,1,2,3];
  const summer = [4,5,6,7];
  const fall = [8,9,10,11];
  var month = today.getMonth();
  if (spring.includes(month)) {
    month = "spring";
  } else if (summer.includes(month)) {
    month = "summer";
  } else {
    month = "fall";
  }
  return [year, month];
};

// Helper for processing data.
function getCourseData(course) {
  const splitStr = course.split(" ");
  const dept = splitStr[0].toLowerCase();
  const courseNum = splitStr[1];

  return [dept, courseNum];
};
