var express = require('express');
var tempDB = require('./TEMP_schema');
var router = express.Router();
var helper = require('./helper_methods');
var nodemailer = require('nodemailer');

router.get('*', function(req, res, next) {

  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  var navbar = {
    active: 'home',
    links: [
    { name: 'News',  url: '#top-news'  },
    { name: 'Join the Club',  url: '#join'  },
    { name: 'Top Projects',  url: '#project-spotlight'  },
    { name: 'Recent Events',  url: '#'  }
  ]};

  var results = [
    {id: 2, first_name: 'Erick', last_name: 'Sanchez', election: 'President'},
    {id: 4, first_name: 'Steven', last_name: 'Guido', election: 'Vice-President & Second ICC Member'},
    {id: 5, first_name: 'Alex', last_name: 'Chen', election: 'Treasurer'},
    {id: 2, first_name: 'Erick', last_name: 'Sanchez', election: 'Secretary'},
    {id: 3, first_name: 'Oran', last_name: 'C', election: 'ICC Member'}
  ];
  var projects = tempDB.projects;

  for ( var project of projects) {
    project.members= findProjectMembers(project);
    project.areaRequests= findProjectAreaRequests(project);
  }

  res.render('index', { title: 'CS Club',  projects: projects, navbar: navbar, canidates: results, helper: helper});
});


/* GET /join. */
router.get('/join/', function(req, res, next) {
  var navbar = {
    active: 'home',
    links: []};

  res.render('join', { title: 'CS Club', navbar: navbar });
});

/* GET Submit. */
router.get('/join/submit', function(req, res, next) {

  var navbar = {
    active: 'home',
    links: []
  };

  // create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport(
    {
      service: 'Gmail',auth:
      {
        user: 'esericksanc@gmail.com',
        pass: 'Jan1.2010'
      }
    });

  var recipient =
  {
    name: req.query.name == '' ? 'No Name' : req.query.name,
    contact: req.query.contact,
    message: req.query.message
  }

  // setup e-mail data with unicode symbols
  var mailOptions = {
      from: '"admin-email-slack-message" <esericksanc2@gmail.com>', // sender address
      to: 'admin-email@srjccsc.mailclark.ai', // list of receivers
      subject: 'Slack invite from ' + recipient.name, // Subject line
      text: 'use : >' + recipient.contact + '< to contact me. ' + recipient.message // plaintext body
  };

  //send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
      console.log('Message sent: ' + info.response);
  });

  res.render('submit', { title: 'CS Club', navbar: navbar });
});


/* GET Projects page. */
router.get('/projects/', function(req, res, next) {
  var projects = tempDB.projects;

  var navbar = {
    active: 'projects',
    links: []
  };

  for ( var project of projects) {
    project.members= findProjectMembers(project);
    navbar.links.push({name: project.title, url: '/projects/' +  project.id});
  }

  res.render('projects', { title: 'CS Club | Projects' , projects: projects, helper: helper, navbar: navbar});
});

// GET project page
router.get('/projects/:projectID', function(req, res, next) {
  var projects = tempDB.projects;

  var navbar = {
    active: 'projects',
    links: []
  };

  var project = findProjectForID( projects, req.params.projectID);

  for ( var p of projects) {
    navbar.links.push({name: p.title, url: '/projects/' +  p.id, active: p.title === project.title});
  }

  var members = findProjectMembers( project );
  var results = [
    {first_name: 'Erick', last_name: 'Sanchez', election: 'President'},
    {first_name: 'Steven', last_name: 'Guido', election: 'Vice-President'},
    {first_name: 'Alex', last_name: 'Chen', election: 'Treasurer'},
    {first_name: 'Steven', last_name: 'Guido', election: 'ICC Member'}
  ];

  project.members = members

  res.render('project', { title: 'CS Club' , project: project , services: tempDB.services, canidates: results, navbar: navbar});
});



/* GET members page. */
router.get('/members', function(req, res, next) {
  var navbar = {
    active: 'members',
    links: [
    { name: 'Members of the Board',  url: '#'  },
    { name: 'Programmers and Developers',  url: '#'  }
  ]};

  var members = tempDB.members;

  for ( var member of members)
  {
    member.numberOfProjects = findProjectsForMember( member).length;
  }

  res.render('members', { title: 'CS Club',  members: members, navbar: navbar, helper: helper});
});

/* GET member page. */
router.get('/members/:memberID', function(req, res, next) {
  var member = findMemberForID(tempDB.members,req.params.memberID);

  member.projects = findProjectsForMember(member);

  var navbar = {
    active: 'members',
    links: []
  };

  res.render('member', { title: 'CS Club' , member: member, navbar: navbar, helper: helper});
});


/* GET ABOUT PAGE. */
router.get('/about', function(req, res, next) {
  var navbar = {
    active: 'about',
    links: [{}]
  };



  res.render('about', { title: 'CS Club', navbar: navbar });
});


/* GET NEW-PAGE TEMPLATE. */
router.get('/placholder', function(req, res, next) {
  var navbar = {
    active: 'page',
    links: [
    { name: 'ITEM',  url: '#'  },
  ]};

  res.render('jade_file', { title: 'CS Club', navbar: navbar });
});



function findProjectForID( projects, id )
{
  var found;
  for( var project of projects)
  {
    if (project.id == id)
      found = project;
  }

  return found;

}



function findMemberForID( members, id )
{
  var found;
  for( var member of members)
  {
    if (member.id == id)
      found = member;
  }

  return found;

}



function findProjectMembers( project )
{
  var members = [];

  for( var member_project of tempDB.members_projects )
  {
    if ( member_project.project_id == project.id )
    {
      var potentialMember = findMemberForID(tempDB.members,member_project.member_id);

      if (potentialMember !== undefined ) {
        potentialMember.role = member_project.role;
        members.push( potentialMember);
      }
    }
  }

  return members;
}



function findProjectAreaRequests( project )
{
  var requests = [];

  for ( var area_request of tempDB.project_area_requests )
  {
    if (project.id == area_request.project_id)
    {
      requests.push(area_request);
    }
  }

  return requests;
}



function findProjectsForMember( member )
{
  var projects = [];

  for ( var member_project of tempDB.members_projects )
  {
      if ( member_project.member_id == member.id )
      {
        var potentialProject = findProjectForID(tempDB.projects,member_project.project_id);

        if (potentialProject !== undefined ) {
          potentialProject.role = member_project.role;
          projects.push( potentialProject);
        }
      }

  }

  return projects;
}

module.exports = router;
