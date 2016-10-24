//This will act as temporary database placeholder


function Project( id, title, description, description_short, status, post, milestones, links, images )
{
	this.id = id;
	this.title = title;
	this.description = description;
	this.description_short = description_short;
	this.status = status;
	this.post = post;
	this.milestones = milestones;
	this.links = links;
	this.images = images;
}

function Member( id, first_name, last_name, bio, bio_short, links, email, languages )
{
	this.id = id;
	this.first_name = first_name;
	this.last_name = last_name;
	this.bio = bio;
	this.bio_short = bio_short;
	this.links = links;
	this.email = email;
	this.languages = languages;
}

function ProjectsMembers( id, project_id, member_id, role, assignedArea )
{
  this.id = id;
	this.project_id = project_id;
	this.member_id = member_id;
	this.role = role;

	this.assignedArea = assignedArea;
}

function ProjectAreaRequests( id, project_id, title, description, project_interest, nPositions, assets, author_id)
{
	this.id = id;
	this.project_id = project_id;
	this.title = title;
	this.description = description;
	this.project_interest = project_interest;
	this.nPositions = nPositions;
	this.assets = assets;
	this.author_id = author_id;
}

//4
var projects = [
	new Project(
		1,
		'CS Website',
		'Not only will this new website show off each of our projects, tasks and quick links to all of our resources and tools the club is using, but it will also become a hub for our new and current members to digest a project and become a great help! Any new top news, upcoming event, and project updates will be posted to our site for everyone to view. My vision in this website is for everyone, members, programmers, and potental members to stay informed about progress and details in every project. Members and potental members can comment and give feedback to any project as a comment feed in each project. Each project contains a detailed description about goals, requirments, and the platform as well as images, list of participating members, and a timeline of events and achivements. As for members, a club member can create a profile and fill in a picture, short and long bios, and show off any work done outside of the club. Quick links will show all of the projects, listed on the website, each member has participated in. As for the About and Contact Us pages, egeryone will have the opprotunuty to ask how to join the club and learn about what we do.',
		'A new website to showoff what we do as a club',
		'In Progress',
		'Developing for Mobile Version!',
		{},
		{
			checkvist: 'https://checkvist.com/checklists/563656',
			waffle: 'https://waffle.io/SRJC-Computer-Science-Club/cs-website',
			github: 'https://github.com/SRJC-Computer-Science-Club/cs-website',
			figma: 'https://www.figma.com/files/project/64393/Club-Website'
		},
		{}
  ),
	new Project(
		3,
		'Function Fighters',
		'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		'An AI battle arena simulator',
		'Scrimmaging!',
		'Would you like to join?!',
		{},
		{
		  github: 'https://github.com/joshuasrjc/function-fighters'
		},
		{}
  ),
	new Project(
		0,
		'Micromouse',
		'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		'An autonomous maze solving robot mouse',
		'Delayed',
		'',
		{},
		{
			checkvist: 'https://checkvist.com/checklists/542765',
			waffle: 'https://waffle.io/SRJC-Computer-Science-Club/micromouse',
			github: 'https://github.com/SRJC-Computer-Science-Club/micromouse'
		},
		[
			"park1.jpeg",
			"park2.jpeg",
			"park3.jpeg",
			"park4.jpeg",
			"park5.jpeg",
			"park6.jpeg",
			"park7.jpeg"
		],
		{
			image2: "park.jpeg",
			image3: "park.jpeg",
			image4: "park.jpeg",
			image5: "park.jpeg"
		}
	),
  new Project(
    2,
    '2D Platformer',
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    'A simple 2d platformer game',
    'On-Hold',
		'',
		{},
    {
      checkvist: 'https://checkvist.com/checklists/560653',
      waffle: 'https://waffle.io/SRJC-Computer-Science-Club/2d-platformer',
      github: 'https://github.com/SRJC-Computer-Science-Club/2d-platformer'
    },
		{}
  ),
  new Project(
    4,
    'Quad-Copter',
    '<a href=\'\\members\\3\'>I</a> worked on a landmine detection quadcopter with college <a href=\'\\members\\9\'>Yekalo Aberha</a>. Mr. Aberha and I, coded and build a lidar two diminsional mapping sensor. To create a graph of points to repersent what the sensor is resiving which was edges of objects.<br /><br />x = r × cos( θ )y = r × sin( θ )<br /><br />We found out that the sensor was not working because we needen to conver the rotation of the sensor, into (x,y) coordiates.',
		'',
    'Archived',
		'',
		{},
		{},
    {}
  )
];

//9
var members = [
	new Member(
		2, 'Erick', 'Sanchez',
		'Began programming since GameMaker was installed on the computer of my 8th grade English class. Made a game from complete scratch and messing around with my friends watching me make a face follow the cursor then something shooting at the face! And this is how Face Game was made, a simple concept turned into something amusing. This game was a hit for too many students during English D: But I expanded to the iPhone, the Mac World! And I\'ll never go back, to PC *cough*. I planned to recreate the Face Game on the iOS with all new faces and cooler stuff because it\'s on the phone. Butt I was too intrested in making other iOS apps and created a few utilities enough to make myself noticed for a client. I programmed and designed an application for a client, George Moskoff. George was the sole creator of Kids-Self Evaluation. This app is sold on the iPhone AppStore. I learned to making my own apps to sell on the AppStore, Mulah, iLogs, Assigned, and whatever else comes out of my head :)',
		'Making apps on the iPhone and on other platforms.',
		{
			github: 'https://www.GitHub.com/LinnierGames',
			facebook: 'https://www.Facebook.com/erick.sanchez.988926',
			twiter: 'https://www.Twitter.com/Linnier__Games',
		},
		'esericksanc@gmail.com',
		['C++','JavaScript','Objective-C','HTML & CSS']
	),
  new Member(
    4, 'Steven', 'Guido',
		'my bio',
		'short',
    {},
		undefined,
    []
  ),
  new Member(
    1, 'Joshua', 'Murphy',
		'my bio', 'short',
    {
      github: 'https://www.github.com/joshuasrjc'
    },
		undefined,
    ['C++','JavaScript']
  ),
  new Member(
    3, 'Oran', 'C',
		'I started programming with HTML*, in highschool just for fun. I really got into real programming when I built a Bluetooth robot from scratch which, over the summer, I started learning JavaScript from an online self paced tutorial, and that transitioned into taking C++. I\'m currently learning python right now.',
		'I\'ve built and been running a Ubuntu server, and also have been running and handling with server software for about a year now. I\'m comfortable with using GNU/Linux.',
    {
      github: 'https://www.github.com/Pastyguy'
    },
		undefined,
    ['C++','HTML & CSS', 'python', 'JavaScript', 'BASH']
  ),
  new Member(
    8, 'Wind', 'Carrianna',
		'my bio',
		'short',
    {},
		undefined,
    []
  ),
  new Member(
    5, 'Alex', 'Chen',
		'my bio',
		'short',
    {},
		undefined,
    []
  ),
  new Member(
    6, 'Noah', '',
		'my bio',
		'short',
    {},
		undefined,
    []
  ),
  new Member(
    7, 'Conan', 'Skaife',
		'my bio',
		'short',
    {},
		undefined,
    []
  ),
  new Member(
    0, 'Benjamin', 'Hough',
		'my bio',
		'short',
    {
      github: 'https://www.github.com/whothat'
    },
		undefined,
    ['C++','JavaScript']
  ),
  new Member(
    9, 'Yekalo', 'Aberha',
		'my bio',
		'short',
    {
      github: 'https://www.github.com/yyekalo'
    },
		undefined,
    []
  )
];

//15
//0-Ben 1-joshua 2-erick 3-oran 4-steven 5-alex chen 6-noah 7-conan 8-wind
//0-micromouse 1-cs website 2-plattformer 3-function fighters 4-Quad-Copter
var members_projects = [
	//Micromouse
  new ProjectsMembers( 15 , 0 , 9 , 'Co-Lead Developer' ),
  new ProjectsMembers( 0 , 0 , 0 , 'Co-Lead Developer' ),
  new ProjectsMembers( 3 , 0 , 1 , 'Co-Lead Developer' ),
  new ProjectsMembers( 4 , 0 , 2 , 'Programmer' ),
  new ProjectsMembers( 5 , 0 , 3 , 'Programmer' ),
	//CS Website
  new ProjectsMembers( 6 , 1 , 2 , 'Project Manager' ),
  new ProjectsMembers( 1 , 1 , 0 , 'Lead Developer' ),
  new ProjectsMembers( 12 , 1 , 8 , 'Programmer' ),
	//2D Platformer
  new ProjectsMembers( 10 , 2 , 2 , 'Lead Developer' ),
	//Function Fighters
  new ProjectsMembers( 2 , 3 , 1 , 'Project Manager & AI Player' ),
  new ProjectsMembers( 7 , 3 , 2 , 'Beta Tester, AI Player' ),
  new ProjectsMembers( 8 , 3 , 4 , 'AI Player' ),
  new ProjectsMembers( 9 , 3 , 3 , 'AI Player' ),
	//Quad-Copter
  new ProjectsMembers( 14 , 4 , 9 , 'Lead Developer' ),
  new ProjectsMembers( 13 , 4 , 3 , 'Developer' )
];

var project_area_requests = [
	new ProjectAreaRequests( 0, 1, "Front-End Developers", "Help program and design the front-end of our website. This will not only help mask and structure our website, but also help make this site responsive to all platforms.", 5, 4, [{title: "HTML/CSS/Boostrap", experience: 3}, {title: "Java", experience: 1}], 2)
];

//Global instances for icons
var services = {
	github:
	{
		name: 'GitHub',
		icon_sm: 'github-icon-42@2x.png',
		icon_md: '',
		icon_lg: ''
	},
	waffle:
	{
		name: 'WaffleIO',
		icon_sm: 'waffleio-icon-42@2x.png',
		icon_md: '',
		icon_lg: ''
	},
	checkvist:
	{
		name: 'Checkvist',
		icon_sm: 'checkvist-icon-42@2x.png',
		icon_md: '',
		icon_lg: ''
	},
	figma:
	{
		name: 'Figma',
		icon_sm: 'figma-icon-42@2x.png',
		icon_md: '',
		icon_lg: ''
	}
};

module.exports = {
	projects,
	members,
  members_projects,
	project_area_requests,
	services
};
