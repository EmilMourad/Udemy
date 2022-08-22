
let myCourses = [];
function view()
{  
    fetch("https://mocki.io/v1/8b5615b6-7748-4e40-8190-4f6d37b3f3d9").then(res => res.json()) .then(data =>
    {
        myCourses = data["courses"];
        let myCoursesDiv = document.createElement("div");
        myCoursesDiv.classList.add("courses");
        for(let i = 0 ; i < myCourses.length ; i++)
        {
            let myCourseDiv = document.createElement("div");
            myCourseDiv.classList.add("course");
            myCourseDiv.setAttribute("id" , `course${i}`);

            let courseImage = document.createElement("img");
            courseImage.setAttribute("src" , myCourses[i]["image"]);
            courseImage.setAttribute("width" , "240");
            courseImage.setAttribute("height" , "135");


            let link = document.createElement("a");
            link.setAttribute("href" , "./index.html");

            let courseTilte = document.createElement("h4");
            courseTilte.classList.add("course-title");
            courseTilte.innerHTML = myCourses[i]["title"];

            let courseInstructor = document.createElement("p");
            courseInstructor.classList.add("course-instructor");
            courseInstructor.innerHTML = myCourses[i]["instructors"][0]["name"];

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
            let students = document.createElement("p");
            students.classList.add("course-students");
            students.innerHTML = 1200;
            rateSection.appendChild(students);

            let coursePrice = document.createElement("h4");
            coursePrice.classList.add("course-price");
            coursePrice.innerHTML = myCourses[i]["price"];

            let courseDiscount = document.createElement("p");
            courseDiscount.classList.add("course-discount");
            courseDiscount.innerHTML = (110 * myCourses[i]["price"] / 100).toFixed(2) ;




            link.appendChild(courseTilte);
            myCourseDiv.appendChild(courseImage);
            myCourseDiv.appendChild(link);
            myCourseDiv.appendChild(courseInstructor);
            myCourseDiv.appendChild(rateSection);
            myCourseDiv.appendChild(coursePrice);
            myCourseDiv.appendChild(courseDiscount);
            myCoursesDiv.appendChild(myCourseDiv);

        }
        let finalSection = document.getElementById("final-section");
        finalSection.appendChild(myCoursesDiv);
        
        

    });
}
view();


let search = document.getElementById("search");
let userinput = document.querySelector("[type = 'text']");


search.onsubmit = function(e)
{
    e.preventDefault();
    for(let i = 0 ; i < myCourses.length ; i++)
    {
        let cur = document.getElementById(`course${i}`);
        cur.style.cssText = "display: block;";
    }
    let matched = 0; 
    let string = userinput.value;
    
    for(let i = 0 ; i < myCourses.length ; i++)
    {
        console.log(i , matched);
        if(myCourses[i]["title"].toLowerCase().includes(string.toLowerCase()) == false)
        {
            let cur = document.getElementById(`course${i}`);
            cur.style.cssText = "display:none;";
        }
        
    }

};

