var express = require('express');
var tempDB = require('./TEMP_schema');
var router = express.Router();
var helper = require('./helper_methods');

router.get('*', function(req, res, next) {

  next();
});


/* GET Projects page. */
router.get('', function(req, res, next) {
  var projects = tempDB.projects;

  var navbar = {
    active: 'projects',
    links: []
  };

	var topProjects = [];
	var secondaryProjects = [];
	var archviedProjects = [];

  for ( var project of projects) {
    project.members= helper.findProjectMembers(project);
    if (navbar.links.length < 4)
      navbar.links.push({name: project.title, url: '/projects/' +  project.id});
		if (project.status == "Archived" || project.satus == "Completed" || project.status == "Resigned" || project.status == "")
			archviedProjects.push(project);
		else if (project.status == "On-Hold" || project.status == "Not on Track" || project.status == "Positions Needed")
			secondaryProjects.push(project);
		else {
			if (topProjects.length > 3)
				secondaryProjects.push(project);
			else
				topProjects.push(project);
		}
  }

	console.log({top: topProjects, secondary: secondaryProjects, archvied: archviedProjects});

  res.render('projects', { title: 'CS Club | Projects' , list_of_projects: {top: topProjects, secondary: secondaryProjects, archived: archviedProjects}, helper: helper, navbar: navbar});
});

// GET project page
router.get('/:projectID', function(req, res, next) {
  var projects = tempDB.projects;

  var navbar = {
    active: 'projects',
    links: []
  };

  var project = helper.findProjectForID( projects, req.params.projectID);

  for ( var p of projects) {
    if (navbar.links.length < 4)
      navbar.links.push({name: p.title, url: '/projects/' +  p.id, active: p.title === project.title});
  }
  navbar.links.push({name: "List of Projects", url: '/projects'});

  project.members = helper.findProjectMembers( project );
  project.team = {project_managers: [], members: []};
  for (var member of project.members) {
    if (member.role.includes("Project Founder") | member.role.includes("Project Manager") | member.role.includes("Sub-Project Manager"))
      project.team.project_managers.push(member);
    else
      project.team.members.push(member);
  }

  project.team.project_managers.sort(function(a, b) {
    if (a.role.includes("Project Founder") & ( b.role.includes("Project Manager") | b.role.includes("Sub-Project Manager"))) {
      return -1; //a is greater than b
    }
    if (a.role.includes("Project Manager") & ( b.role.includes("Sub-Project Manager"))) {
      return -1; //a is greater than b
    }
    if (a.role.includes("Project Manager") & ( b.role.includes("Project Founder"))) {
      return 1; //a is less than b
    }
    if (a.role.includes("Sub-Project Manager") & ( b.role.includes("Project Founder") | b.role.includes("Project Manager"))) {
      return 1; //a is less than b
    }
    // a must be equal to b
    return 0;
  });

  project.team.members.sort(function(a, b) {
    if (a.role.includes("Lead Developer") & !( b.role.includes("Lead Developer"))) {
      return -1;
    }
    if ((a.role.includes("Developer") & !a.role.includes("Lead Developer")) & !( b.role.includes("Developer"))) {
      return -1;
    }
    if (!a.role.includes("Lead Developer") & ( b.role.includes("Lead Developer"))) {
      return 1;
    }
    if (!(a.role.includes("Developer") & !a.role.includes("Lead Developer")) & ( b.role.includes("Developer"))) {
      return 1;
    }
    // a must be equal to b
    return 0;
  });

  project.areaRequests= helper.findProjectAreaRequests(project);
  for ( var request of project.areaRequests) {
    request.author = helper.findMemberForID( project.members, request.author_id);
    var project_interest = {interest: request.project_interest, title: 'undefined', value: '0'};
    request.project_interest_color = helper.replaceColorIntensity(project_interest);
    request.project_interest_title = helper.replaceColorTitle(project_interest);
    for ( var asset of request.assets) {
      asset.experience_color = helper.replaceColorIntensity({value: asset.experience});
    }
  }
  project.events = helper.findProjectEvents( project);

  res.render('project', { title: 'CS Club' , project: project, services: tempDB.services, navbar: navbar, helper: helper});
});

/* GET Project Photo Gallery. */
router.get('/:projectID/photo-gallery', function(req, res, next) {
  var navbar = {
    active: 'projects',
    links:
    [
      {name: 'Back to Project', url: '/projects/'+req.params.projectID, active: true}
      //{name: 'Download Gallery', url: '#', active: false}
    ]
  };

  var project = helper.findProjectForID( tempDB.projects, req.params.projectID);

  res.render('project_photo-gallery', { title: 'CS Club', project: project, navbar: navbar });
});

module.exports = router;
