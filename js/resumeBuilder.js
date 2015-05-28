// yeah, I know that modifying string prototype for this is not ideal
String.prototype.fillData = function(data) {
      return this.replace('%data%', data);
};

var bio = {
      name : 'Dog',
      role : 'The Developer',
      contacts : {
            mobile: 'iphone',
            email: 'anatolylushnikov@gmail.com',
            github: 'https://github.com/genesisuda',
            twitter: 'no twitter',
            location: 'Kaliningrad'
      },
      welcomeMessage: 'Hi there',
      skills: ['woof', 'bark', 'hardcore coding'],
      biopic: 'images/dog.jpg',
      display: function() {
            $('#header').prepend(
                  HTMLheaderName.fillData(this.name) +
                  HTMLheaderRole.fillData(this.role));
            $('#topContacts').append(HTMLmobile.fillData(this.contacts.mobile));
            $('#topContacts').append(HTMLemail.fillData(this.contacts.email));
            $('#topContacts').append(HTMLtwitter.fillData(this.contacts.twitter));
            $('#topContacts').append(HTMLgithub.fillData(this.contacts.github));
            $('#topContacts').append(HTMLblog.fillData('not yet'));
            $('#topContacts').append(HTMLlocation.fillData(this.contacts.location));

            $('#header').append(HTMLbioPic.fillData(this.biopic));
            $('#header').append(HTMLwelcomeMsg.fillData(this.welcomeMessage));

            var elSkills = $(HTMLskillsStart);

            $('#header').append(elSkills[0]);

            $.each(this.skills, function (i, v) {
                  $(elSkills[1]).append(HTMLskills.fillData(v));
            });

            $('#header').append(elSkills[1]);
      }
};

var education = {
      schools: [{
            name: 'Woof Federal University',
            location: 'Kaliningrad',
            degree: 'Specialist degree in Applied maths and informatics',
            majors: ['Numeric methods'],
            dates: 2013,
            url: 'http://kantiana.ru'
      },{
            name: 'Woof Federal University',
            location: 'Kaliningrad',
            degree: 'Specialist degree in Applied maths and informatics',
            majors: ['Numeric methods'],
            dates: 2013,
            url: 'http://kantiana.ru'
      }],
      onlineCourses: [{
            title: 'Front-End Web Developer Nanodegree',
            school: 'Udacity',
            date: 2015,
            url: 'https://www.udacity.com/course/nd001'
      },{
            title: 'Data Analyst Nanodegree',
            school: 'Udacity',
            date: 2015,
            url: 'https://www.udacity.com/course/nd002'
      }],
      display: function (){
            $.each(this.schools, function (i, v) {
                  var $eEntry = $(HTMLschoolStart);

                  $eEntry.append(
                        HTMLschoolName.fillData(v.name) +
                        HTMLschoolDegree.fillData(v.degree));
                  $eEntry.append(HTMLschoolDates.fillData(v.dates));
                  $eEntry.append(HTMLschoolLocation.fillData(v.location));
                  $eEntry.append(HTMLschoolMajor.fillData(v.majors));

                  $('#education').append($eEntry);
            });

            $('#education').append(HTMLonlineClasses);

            $.each(this.onlineCourses, function (i, v) {
                  var $oeEntry = $(HTMLschoolStart);

                  $oeEntry.append(
                        HTMLonlineTitle.fillData(v.title) +
                        HTMLonlineSchool.fillData(v.school));
                  $oeEntry.append(HTMLonlineDates.fillData(v.date));
                  $oeEntry.append(HTMLonlineURL.fillData(v.url));

                  $('#education').append($oeEntry);
            });
      }
};

var work = {
      jobs: [{
            employer: 'DevFactory',
            title: 'Technical Architect',
            location: 'Kaliningrad',
            dates: '2012-2015',
            description: 'woof woof',
      }],
      display: function () {
            $.each(this.jobs, function (i, v) {
                  var $wEntry = $(HTMLworkStart);

                  $wEntry.append(
                        HTMLworkEmployer.fillData(v.employer) +
                        HTMLworkTitle.fillData(v.title));
                  $wEntry.append(HTMLworkDates.fillData(v.dates));
                  $wEntry.append(HTMLworkLocation.fillData(v.location));
                  $wEntry.append(HTMLworkDescription.fillData(v.description));

                  $('#workExperience').append($wEntry);
            })
      }
};

var projects = {
      projects: [{
            title: 'GSoC 2012',
            dates: '2012/06/01-2012/09/01',
            description: 'Work done during GSoC 2012',
            images: ['images/gsoc.png'],
      }],
      display: function () {
            $.each(this.projects, function (i, v) {
                  var $pEntry = $(HTMLprojectStart);

                  $pEntry.append(HTMLprojectTitle.fillData(v.title));
                  $pEntry.append(HTMLprojectDates.fillData(v.dates));
                  $pEntry.append(HTMLprojectDescription.fillData(v.description));
                  $pEntry.append(HTMLprojectImage.fillData(v.images));

                  $('#projects').append($pEntry);
            });
      }
};

/* as we have some show/hide code in html can't use document.ready
   so using this approach instead
*/
(function(){
      bio.display();
      education.display();
      work.display();
      projects.display();

      $('#mapDiv').append(googleMap);
})();

$(document).ready(function() {
      $('#skillsH3').before('<div id="skillsContainer"></div>');
      $('#skillsH3').detach().appendTo('#skillsContainer');
      $('#skills').detach().appendTo('#skillsContainer');
});