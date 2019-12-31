class Course {
  constructor(name,time,date,rooms) {
    this.n = name;
    this.t = time;
    this.d = date;
    this.r = rooms;
  }
   toString() {
    return  this.n+""+this.t+""+this.d+""+this.r;
  }
    
}

class Student {
  constructor(id, name, gpa, courses) {
    this.i = id;
    this.n = name;
    this.g = gpa;
    this.c = courses;
  }
  toString() {
    return  this.i+""+this.n+""+this.g+""+this.c;
  }
    
}




