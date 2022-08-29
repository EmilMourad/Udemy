const tab = {
    "Python" : "https://mocki.io/v1/8b5615b6-7748-4e40-8190-4f6d37b3f3d9" ,
    "Excel" : "https://ammardab3an-json-server.herokuapp.com/c_excel",
    "Web Development" : "https://ammardab3an-json-server.herokuapp.com/c_web",
    "Javascript" : "https://ammardab3an-json-server.herokuapp.com/c_js",
    "Data Science" : "https://ammardab3an-json-server.herokuapp.com/c_data",
    "AWS certification" : "https://ammardab3an-json-server.herokuapp.com/c_aws",
    "Drawing" :  "https://ammardab3an-json-server.herokuapp.com/c_draw"
};
let myCourses = [];
function checkWord(word , title)
{
    if(title.toLowerCase().includes(word.toLowerCase()) == false) return false;
    return true;
}
function coursesView(word , cat = "Python")
{  
    fetch(tab[cat]).then(res => res.json()) .then(data =>
    {
        let finalSection = document.getElementById("final-section");
        if(document.getElementById("courses") !== null) finalSection.removeChild(finalSection.lastChild);
        if(document.getElementById("courses-intro") !== null) finalSection.removeChild(finalSection.lastChild);
        let introSection = document.createElement('div');
        introSection.classList.add("courses-intro");
        introSection.innerHTML = `<h3><b> ${data["header"]} </b></h3>  ${data["description"]}`;  
        finalSection.appendChild(introSection);
        introSection.setAttribute("id" , "courses-intro");
        myCourses = data["courses"];
        let carousel = document.createElement("div");
        carousel.classList.add("carousel" , "slide");
        carousel.setAttribute("id" , "myCarousel");
        carousel.setAttribute("data-ride" , "carousel");
        let innerCarousel = document.createElement("div");
        innerCarousel.classList.add("carousel-inner");
        carousel.appendChild(innerCarousel);
        let myCoursesDiv = document.createElement("div");
        myCoursesDiv.classList.add("courses");
         myCoursesDiv.setAttribute("id" , "courses");
        let cnt = 0;
        for(let i = 0 ; i < myCourses.length ; i++)
        {
            if(checkWord(word , myCourses[i]["title"]) === false && word !== "") continue;
            if(cnt % 5 == 0 || i == myCourses.length - 1)
            {
                if(cnt == 5)
                {
                    let activeItem = document.createElement("div");
                    activeItem.classList.add("item","active");
                    activeItem.appendChild(myCoursesDiv);
                    innerCarousel.appendChild(activeItem);
                }
                if(cnt > 5)
                {
                    let item = document.createElement("div");
                    item.classList.add("item");
                    item.appendChild(myCoursesDiv);
                    innerCarousel.appendChild(item);
                }
                myCoursesDiv = document.createElement("div");
                myCoursesDiv.classList.add("courses");
                myCoursesDiv.setAttribute("id" , "courses");

            }
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
            cnt++;
        }
        if(cnt > 0 && cnt < 5)
        {
            let activeItem = document.createElement("div");
            activeItem.classList.add("item","active");
            activeItem.appendChild(myCoursesDiv);
            innerCarousel.appendChild(activeItem);
        }
        let left = document.createElement("a");
        left.classList.add("left" ,"carousel-control");
        left.setAttribute("href", "#myCarousel");
        left.setAttribute("data-slide","prev");
        left.innerHTML = `<span class="glyphicon glyphicon-chevron-left"></span>
        <span class="sr-only">Previous</span>`;
        let right = document.createElement("a");
        right.classList.add("right" ,"carousel-control");
        right.setAttribute("href", "#myCarousel");
        right.setAttribute("data-slide","next");
        right.innerHTML = `<span class="glyphicon glyphicon-chevron-right"></span>
        <span class="sr-only">Next</span>`;
        carousel.appendChild(left);
        carousel.appendChild(right);
        finalSection.appendChild(carousel);
    });
}
coursesView("");
let currentTab = "Python";
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
pythonTab.onclick = function () { currentTab = "Python" , coursesView("","Python"); } 
excelTab.onclick = function () { currentTab = "Excel" , coursesView("","Excel"); } 
webTab.onclick = function () { currentTab = "Web Development" , coursesView("","Web Development"); } 
javascriptTab.onclick = function () { currentTab = "Javascript" , coursesView("","Javascript"); } 
dataTab.onclick = function () { currentTab = "Data Science" , coursesView("","Data Science"); } 
awsTab.onclick = function () { currentTab = "AWS certification" , coursesView("","AWS certification"); } 
drawingTab.onclick = function () { currentTab = "Drawing" , coursesView("","Drawing"); } 
/* search section */
search.onsubmit = function(e)
{
    e.preventDefault();
    let string = userinput.value;
    coursesView(string , currentTab);
};
/*categories section */
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
            row.appendChild(content);
        }
        categoriesSection.appendChild(row);
        document.body.appendChild(categoriesSection);
    });
}
categoriesView();
