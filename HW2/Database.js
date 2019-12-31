class Course {
  constructor(code,time,date,...rooms) {
    this.code = code;
    this.time = time;
    this.date = date;
    this.rooms = rooms;
  }
   toString() {
    return  this.n+""+this.t+""+this.d+""+this.r;
  }
    
}

class Student {
  constructor(id, name, gpa, ...courses) {
    this.id = id;
    this.name = name;
    this.gpa = gpa;
    this.courses = courses;
  }
  toString() {
    return  this.i+""+this.n+""+this.g+""+this.c;
  }
    
}

class Database {
	constructor (student,course) {
		this.student=student;
		this.course=course;
	}
}

function report(msg, id, list) {
    out.innerHTML += "<br>"; msg += " ";
    out.appendChild(document.createTextNode(msg));
    let n1;
    if (id) {
        n1 = document.createElement("span");
        n1.appendChild(document.createTextNode(id));
        n1.classList.add("link");
        out.appendChild(n1); msg += id;
        //n1.addEventListener("click", doClick);
    }
    if (list) {
        let n2 = document.createElement("span");
        n2.appendChild(document.createTextNode(""));
        n2.innerHTML += list.join("<br>");
        n2.classList.add("course");
        if (n1) n1.appendChild(n2);
    }
    console.log(msg);
}
const url = "https://maeyler.github.io/JS/data/";
function readData(Studentfile,courseFile) {
    console.log("readData "+Studentfile);
    fetch(url+Studentfile)
        .then(r => r.text(), report)
        .then(addStudents, report);
	console.log("readData "+courseFile);
    fetch(url+courseFile)
        .then(r => r.text(), report)
        .then(addCourses, report);
	
}
function parseStudent(line) {
    let [id, name, gpa, ...list] = line.split("\t");
	let student=new Student(id, name, gpa, ...list);
    return student;
}
function parseCourse(line) {
    let [code,time,date, ...rooms] = line.split("\t");
	let course=new Course(code,time,date, ...rooms);
    return course;
}
function addCourses(txt) {
    let msg = txt.length+" chars, ";
    let a = txt.split("\n");
    msg += a.length+" lines, ";
    for (let s of a) {
      let crs = parseCourse(s);
   
	  database.course.set(crs.code,crs);
    }
    report(msg + database.course.size+" courses");
}
function addStudents(txt) {
    let msg = txt.length+" chars, ";
    let a = txt.split("\n");
    msg += a.length+" lines, ";
    for (let s of a) {
      let std = parseStudent(s);
   
	  database.student.set(std.id,std);
    }
    report(msg + database.student.size+" students");
}

function doClick(evt) {
    //console.log(evt);
    let t = evt.target;
    let s = t.innerText;
    if (/^\d+$/.test(s)) showStd(s); //s contains digits
    else if (t = t.firstElementChild) {
        t.style.visibility = "";
        let hide = function () {
            t.style.visibility = "hidden";
        };
        setTimeout(hide, 5000);
    }
}


function findID(id) {
    return database.student.get(id);
}
function findCode(code) {
    return database.course.get(code);
}
function showStd(id) {
    let t = id+" ";
    let std = findID(id);
    if (!std) {
        report(t+"not found"); return;
    }
    t += std.name+" "+std.gpa;
    report(t, std.courses.length+" courses", std.courses);
}


function studentsIn(code) {
    code = code.toUpperCase();
    let a = [];
    for (let std of database.student.values()) {
		if(std.courses==undefined) continue    
		if (std.courses.includes(code))
            a.push(std.id+" "+std.name);
	}
    if (a.length > 0)
        report(code+": ", a.length+" students", a);
    else report("No students in "+code);
}


function randomStd() {
	let values = Array.from(database.student.values());
    let i = Math.trunc(values.length * Math.random());
    let b = values[i];
    report("Random: "+b.name, b.id);
}

function findBest() {
    let values = Array.from(database.student.values());
	let b = values[0];
    for (let std of values) 
        if (std.gpa > b.gpa) b = std;
    report("Best: "+b.name, b.id);
}

function findAboveGPA(gpa) {
    let values = Array.from(database.student.values());
	let b = values[0];
	let counter=0;
    for (let std of values) 
        if (std.gpa > gpa && gpa<=4) counter++;
    report(counter+"students above "+gpa+"gpa");
}

function examSchedule(id) {
    let std = findID(id);
	let t = id+" "+std.name+"'s Exam Schedule:  ";
	if (!std) {
        report(t+"not found"); return;
    }
	else{
		for(let c of std.courses){
			let course = findCode(c);
			t+=course.code+":  "+course.date+" / "+course.time+" , ";
		}
	}
    report(t);
}

function courseList(room) {
    room = room.toUpperCase();
    let a = [];
	let counter=0;
    for (let crs of database.course.values()) {
		if(crs.rooms==undefined) continue    
		if (crs.rooms.includes(room)){
            a.push(crs.code+" ");
			counter++;
		}
	}
    if (a.length > 0)
        report("There is "+counter+" courses in "+room+" : ", a);
    else report("No students in "+room);
}

function courseListAbove(roomNum) {
    let a = [];
	let counter=0;
    for (let crs of database.course.values()) {
		if(crs.rooms==undefined) continue    
		if (crs.rooms.length>roomNum){
            a.push(crs.code+" ");
			counter++;
		}
	}
    if (a.length > 0)
        report("There is "+counter+" courses that belongs above "+roomNum+" classes : ", a);
    else report("There is no course");
}
