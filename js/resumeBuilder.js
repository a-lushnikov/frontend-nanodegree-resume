var fillData = function (templ, data) {
    return templ.replace("%data%", data);
};

var bio = {
    "name" : "Dog",
    "role" : "The Developer",
    "contacts" : {
        "mobile": "iphone",
        "email": "anatolylushnikov@gmail.com",
        "github": "https://github.com/genesisuda",
        "twitter": "no twitter",
        "location": "Kaliningrad"
    },
    "welcomeMessage": "Hi there",
    "skills": ["woof", "bark", "hardcore coding"],
    "biopic": "images/dog.jpg",
    // do not really understand why do we need it in "" in here as it stopped
    // being ECMA-404 JSON from the moment we decided to define function on
    // the object. Since that moment it started being JS object instead of
    // JSON data. Anyway.
    "display": function () {
        $("#header").prepend(
            fillData(HTMLheaderName, this.name) +
            fillData(HTMLheaderRole, this.role));
        $("#topContacts").append(fillData(HTMLmobile, this.contacts.mobile));
        $("#topContacts").append(fillData(HTMLemail, this.contacts.email));
        $("#topContacts").append(fillData(HTMLtwitter, this.contacts.twitter));
        $("#topContacts").append(fillData(HTMLgithub, this.contacts.github));
        $("#topContacts").append(fillData(HTMLblog, "not yet"));
        $("#topContacts").append(fillData(HTMLlocation, this.contacts.location));

        $("#footerContacts").append(fillData(HTMLmobile, this.contacts.mobile));
        $("#footerContacts").append(fillData(HTMLemail, this.contacts.email));
        $("#footerContacts").append(fillData(HTMLtwitter, this.contacts.twitter));
        $("#footerContacts").append(fillData(HTMLgithub, this.contacts.github));
        $("#footerContacts").append(fillData(HTMLblog, "not yet"));
        $("#footerContacts").append(fillData(HTMLlocation, this.contacts.location));

        $("#header").append(fillData(HTMLbioPic, this.biopic));
        $("#header").append(fillData(HTMLwelcomeMsg, this.welcomeMessage));

        var elSkills = $(HTMLskillsStart);

        $("#header").append(elSkills[0]);

        $.each(this.skills, function (i, v) {
            $(elSkills[1]).append(fillData(HTMLskills, v));
        });

        $("#header").append(elSkills[1]);
    }
};

var education = {
    "schools": [{
        "name": "Woof Federal University",
        "location": "Kaliningrad",
        "degree": "Specialist degree in Applied maths and informatics",
        "majors": ["Numeric methods"],
        "dates": 2013,
        "url": "http://kantiana.ru"
    },{
        "name": "Woof Federal University",
        "location": "Kaliningrad",
        "degree": "Specialist degree in Applied maths and informatics",
        "majors": ["Numeric methods"],
        "dates": 2013,
        "url": "http://kantiana.ru"
    }],
    "onlineCourses": [{
        "title": "Front-End Web Developer Nanodegree",
        "school": "Udacity",
        "date": 2015,
        "url": "https://www.udacity.com/course/nd001"
    },{
        "title": "Data Analyst Nanodegree",
        "school": "Udacity",
        "date": 2015,
        "url": "https://www.udacity.com/course/nd002"
    }],
    "display": function (){
        $.each(this.schools, function (i, v) {
            var $eEntry = $(HTMLschoolStart);

            $eEntry.append(
                fillData(HTMLschoolName, v.name) +
                fillData(HTMLschoolDegree, v.degree));
            $eEntry.append(fillData(HTMLschoolDates, v.dates));
            $eEntry.append(fillData(HTMLschoolLocation, v.location));
            $eEntry.append(fillData(HTMLschoolMajor, v.majors));

            $("#education").append($eEntry);
        });

        $("#education").append(HTMLonlineClasses);

        $.each(this.onlineCourses, function (i, v) {
            var $oeEntry = $(HTMLschoolStart);

            $oeEntry.append(
                fillData(HTMLonlineTitle, v.title) +
                fillData(HTMLonlineSchool, v.school));
            $oeEntry.append(fillData(HTMLonlineDates, v.date));
            $oeEntry.append(fillData(HTMLonlineURL, v.url));

            $("#education").append($oeEntry);
        });
    }
};

var work = {
    "jobs": [{
        "employer": "DevFactory",
        "title": "Technical Architect",
        "location": "Kaliningrad",
        "dates": "2012-2015",
        "description": "woof woof",
    }],
    "display": function () {
        $.each(this.jobs, function (i, v) {
            var $wEntry = $(HTMLworkStart);

            $wEntry.append(
                fillData(HTMLworkEmployer, v.employer) +
                fillData(HTMLworkTitle, v.title));
            $wEntry.append(fillData(HTMLworkDates, v.dates));
            $wEntry.append(fillData(HTMLworkLocation, v.location));
            $wEntry.append(fillData(HTMLworkDescription, v.description));

            $("#workExperience").append($wEntry);
        });
    }
};

var projects = {
    "projects": [{
        "title": "GSoC 2012",
        "dates": "2012/06/01-2012/09/01",
        "description": "Work done during GSoC 2012",
        "images": ["images/GSoC.png"],
    }],
    "display": function () {
        $.each(this.projects, function (i, v) {
            var $pEntry = $(HTMLprojectStart);

            $pEntry.append(fillData(HTMLprojectTitle, v.title));
            $pEntry.append(fillData(HTMLprojectDates, v.dates));
            $pEntry.append(fillData(HTMLprojectDescription, v.description));
            $pEntry.append(fillData(HTMLprojectImage, v.images));

            $("#projects").append($pEntry);
        });
    }
};

/* as we have some show/hide code in html can"t use document.ready
   so using this approach instead
   */
   (function(){
    bio.display();
    education.display();
    work.display();
    projects.display();

    $("#mapDiv").append(googleMap);
})();

$(document).ready(function() {
// so not to recalculate this on mousemove
var pic = $(".biopic")[0];
var rC = {
    x : pic.getBoundingClientRect().left + pic.clientWidth / 2,
    y : pic.getBoundingClientRect().top + pic.clientHeight / 2
};

// applying some html fixes (we"re not supposed to modify html hardly for
// this task, right? )
$("#skillsH3").before("<div id=\"skillsContainer\"></div>");
$("#skillsH3").detach().appendTo("#skillsContainer");
$("#skills").detach().appendTo("#skillsContainer");

$(".container").mousemove(function(evt) {
    var mouseX = event.clientX;
    var mouseY = event.clientY;

    var rX = (mouseX - rC.x) / 20;
    var rY = (mouseY - rC.y) / 20;
    if (rX < -45) {
        rX = -45;
    } else if (rX > 45) {
        rX = 45;
    }

    rX = rX < 0 ? 180 - rX : rX;

    if (rY < -45) {
        rY = -45;
    } else if (rY > 45) {
        rY = 45;
    }

    $(pic).css("transform", "rotateX(rYdeg) rotateY(-rXdeg)".replace("rX",rX).replace("rY",rY));
});
});