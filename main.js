
const tab = {
    "Python" : "https://mocki.io/v1/8b5615b6-7748-4e40-8190-4f6d37b3f3d9" ,
    "Excel" : "https://ammardab3an-json-server.herokuapp.com/c_excel",
    "Web Development" : "https://ammardab3an-json-server.herokuapp.com/c_web",
    "Javascript" : "https://ammardab3an-json-server.herokuapp.com/c_js",
    "Data Science" : "https://ammardab3an-json-server.herokuapp.com/c_data",
    "AWS certification" : "https://ammardab3an-json-server.herokuapp.com/c_aws",
    "Drawing" :  "https://ammardab3an-json-server.herokuapp.com/c_draw"
};
/* https://mocki.io/v1/5678b77b-e815-45c7-832b-ac67bada0453 */
let myCourses = [];
/*<div id="myCarousel" class="carousel slide" data-ride="carousel">
        
        <!-- Wrapper for slides -->
        <div class="carousel-inner">
          <div class="item active">
            <img src="" alt="Los Angeles">
          </div>
      
          <div class="item">
            <img src="" alt="Chicago">
          </div>
      
          <div class="item">
            <img src="" alt="New York">
          </div>
        </div>
      
        <!-- Left and right controls -->
        <a class="left carousel-control" href="#myCarousel" data-slide="prev">
          <span class="glyphicon glyphicon-chevron-left"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="right carousel-control" href="#myCarousel" data-slide="next">
          <span class="glyphicon glyphicon-chevron-right"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>*/
function coursesView(cat = "Python")
{  
    fetch(tab[cat]).then(res => res.json()) .then(data =>
    {
        let finalSection = document.getElementById("final-section");
        /*if(document.getElementById("courses") !== null) finalSection.removeChild(finalSection.lastChild);
        if(document.getElementById("courses-intro") !== null) finalSection.removeChild(finalSection.lastChild);*/
        while(finalSection.firstChild) finalSection.remove(finalSection.firstChild);
        let introSection = document.createElement('div');
        introSection.classList.add("courses-intro");
        introSection.innerHTML = `<h3><b> ${data["header"]} </b></h3>  ${data["description"]}`;  
        finalSection.appendChild(introSection);
        introSection.setAttribute("id" , "courses-intro");
        myCourses = data["courses"];
        let myCoursesDiv = document.createElement("div");
        myCoursesDiv.classList.add("courses");
        myCoursesDiv.setAttribute("id" , "courses");
        for(let i = 0 ; i < myCourses.length ; i++)
        {
            let myCourseDiv = document.createElement("div");
            myCourseDiv.classList.add("course");
            myCourseDiv.setAttribute("id" , `course${i}`);
            /* course image */
            let courseImage = document.createElement("img");
            courseImage.setAttribute("src" , myCourses[i]["image"]);
            courseImage.setAttribute("width" , "240");
            courseImage.setAttribute("height" , "135");
            let link = document.createElement("a");
            link.setAttribute("href" , "./index.html");
            /* title section */
            let courseTilte = document.createElement("h4");
            courseTilte.classList.add("course-title");
            courseTilte.innerHTML = myCourses[i]["title"];
            /* instructor section*/
            let courseInstructor = document.createElement("p");
            courseInstructor.classList.add("course-instructor");
            courseInstructor.innerHTML = myCourses[i]["instructors"][0]["name"];
            /* rate section */
            let rateSection = document.createElement("div");
            rateSection.classList.add("stars");
            let courseRate = document.createElement("i"); 
            courseRate.innerHTML = myCourses[i]["rating"].toFixed(2);
            rateSection.appendChild(courseRate);
            for(let j = 0 ; j < myCourses[i]["rating"] ; j++)
            {
                let star = document.createElement("i");
                
                if(myCourses[i]["rating"]  - j >= 0.5) star.classList.add("fa" , "fa-star" , "checked");
                else star.classList.add("fa" , "fa-star-half-empty");
                rateSection.appendChild(star);
            }
            /* students section */
            let students = document.createElement("p");
            students.classList.add("course-students");
            students.innerHTML = 1200;
            rateSection.appendChild(students);
            /* course price section */
            let coursePrice = document.createElement("h4");
            coursePrice.classList.add("course-price");
            coursePrice.innerHTML = "E" + myCourses[i]["price"];
            /* course discount section */
            let courseDiscount = document.createElement("p");
            courseDiscount.classList.add("course-discount");
            courseDiscount.innerHTML = (110 * myCourses[i]["price"] / 100).toFixed(2) ;
            /* appending elements inside the main section */
            link.appendChild(courseTilte);
            myCourseDiv.appendChild(courseImage);
            myCourseDiv.appendChild(link);
            myCourseDiv.appendChild(courseInstructor);
            myCourseDiv.appendChild(rateSection);
            myCourseDiv.appendChild(coursePrice);
            myCourseDiv.appendChild(courseDiscount);
            myCoursesDiv.appendChild(myCourseDiv);
        }
        finalSection.appendChild(myCoursesDiv);
    });
}
coursesView();




let search = document.getElementById("search");
let userinput = document.querySelector("[type = 'text']");

/* tabs section */
let pythonTab = document.getElementById("Python");
let excelTab = document.getElementById("Excel");
let webTab = document.getElementById("Web");
let javascriptTab = document.getElementById("Javascript");
let dataTab = document.getElementById("Data");
let awsTab = document.getElementById("AWS");
let drawingTab = document.getElementById("Drawing");
pythonTab.onclick = function () { coursesView("Python"); } 
excelTab.onclick = function () { coursesView("Excel"); } 
webTab.onclick = function () { coursesView("Web Development"); } 
javascriptTab.onclick = function () { coursesView("Javascript"); } 
dataTab.onclick = function () { coursesView("Data Science"); } 
awsTab.onclick = function () { coursesView("AWS certification"); } 
drawingTab.onclick = function () { coursesView("Drawing"); } 


/* search section */
search.onsubmit = function(e)
{
    e.preventDefault();
    for(let i = 0 ; i < myCourses.length ; i++)
    {
        let cur = document.getElementById(`course${i}`);
        cur.style.cssText = "display: block;";
    }
    let string = userinput.value;
    for(let i = 0 ; i < myCourses.length ; i++)
    {
        if(myCourses[i]["title"].toLowerCase().includes(string.toLowerCase()) == false)
        {
            let cur = document.getElementById(`course${i}`);
            cur.style.cssText = "display:none;";
        }
    }
};

function categoriesView()
{
    fetch("https://mocki.io/v1/5678b77b-e815-45c7-832b-ac67bada0453").then(res => res.json()) .then(data =>
    {
        //console.log(data["categories"][0]["image"]);
        let categoriesSection = document.createElement("div");
        categoriesSection.style.cssText = "width: 85%; position: relative;right: 7.5%; left: 7.5%;padding: 0.1em;";
        categoriesSection.innerHTML = '<h2 class = "Top-categories-header">Top categories</h2>';
        categoriesSection.classList.add("Top-categories");
        let categories = data["categories"];
        let container = document.createElement("div");
        container.classList.add("container");
        let row = document.createElement("div");
        row.classList.add("row");
        for(let i = 0 ; i < categories.length ; i++)
        {
            let content = document.createElement("div");
            content.classList.add("col-lg-3", "col-md-4" , "col-sm-6" , "col-xs-12");
            content.innerHTML = `<img class = "category-image" src = "${categories[i]["image"]}" alt = "${categories[i]["title"]}" width = "250" height = "250">
            <div class = "category-title">${categories[i]["title"]}</div>`;
            content.style.cssText = "gap : 1%;";
            console.log(categories[i]["image"]);
            row.appendChild(content);

        }
        categoriesSection.appendChild(row);
        document.body.appendChild(categoriesSection);
    });
}
categoriesView();
