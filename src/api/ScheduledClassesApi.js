var ScheduledClassesApi = (module.exports = function() {

});


ScheduledClassesApi.prototype.classes = function() {
  return scheduledClasses;
};

const scheduledClasses = [{
    id: "1",
    instructor: "Namrata Khemka",
    username: "nkhemka",
    room: "T235",
    course: "COMP1501",
    section: "001",
    start: "2018-09-10T13:30",
    end: "2018-09-10T14:20",
    crn: "43139",
    get title() {
      return `${this.course}-${this.section} [${this.username}]\n${this.room}`;
    }
  },
  {
    id: "2",
    instructor: "Namrata Khemka",
    username: "nkhemka",
    room: "T235",
    course: "COMP1501",
    section: "001",
    start: "2018-09-12T13:30",
    end: "2018-09-12T14:20",
    crn: "43139",
    get title() {
      return `${this.course}-${this.section} [${this.username}]\n${this.room}`;
    }
  },
  {
    id: "3",
    instructor: "Namrata Khemka",
    username: "nkhemka",
    room: "T235",
    course: "COMP1501",
    section: "001",
    start: "2018-09-14T13:30",
    end: "2018-09-14T14:20",
    crn: "43139",
    get title() {
      return `${this.course}-${this.section} [${this.username}]\n${this.room}`;
    }
  },
  {
    id: "4",
    instructor: "Namrata Khemka",
    username: "nkhemka",
    room: "E203",
    course: "COMP1501",
    section: "401",
    start: "2018-09-13T16:30",
    end: "2018-09-13T17:20",
    crn: "43141",
    get title() {
      return `${this.course}-${this.section} [${this.username}]\n${this.room}`;
    }
  },
  {
    id: "5",
    instructor: "Namrata Khemka",
    username: "nkhemka",
    room: "B162",
    course: "COMP1501",
    section: "402",
    start: "2018-09-13T13:30",
    end: "2018-09-13T14:20",
    crn: "43141",
    get title() {
      return `${this.course}-${this.section} [${this.username}]\n${this.room}`;
    }
  },
  {
    id: "6",
    instructor: "Namrata Khemka",
    username: "nkhemka",
    room: "B107",
    course: "COMP1501",
    section: "501",
    start: "2018-09-11T12:30",
    end: "2018-09-11T13:20",
    crn: "43145",
    get title() {
      return `${this.course}-${this.section} [${this.username}]\n${this.room}`;
    }
  },
  {
    id: "7",
    instructor: "Namrata Khemka",
    username: "nkhemka",
    room: "B107",
    course: "COMP1501",
    section: "502",
    start: "2018-09-11T13:30",
    end: "2018-09-11T14:20",
    crn: "43146",
    get title() {
      return `${this.course}-${this.section} [${this.username}]\n${this.room}`;
    }
  },
  {
    id: "8",
    instructor: "Jordan Pratt",
    username: "jpratt",
    room: "T225",
    course: "COMP1501",
    section: "002",
    start: "2018-09-10T10:30",
    end: "2018-09-10T11:20",
    crn: "43140",
    get title() {
      return `${this.course}-${this.section} [${this.username}]\n${this.room}`;
    }
  },
  {
    id: "9",
    instructor: "Jordan Pratt",
    username: "jpratt",
    room: "T225",
    course: "COMP1501",
    section: "002",
    start: "2018-09-12T10:30",
    end: "2018-09-12T11:20",
    crn: "43140",
    get title() {
      return `${this.course}-${this.section} [${this.username}]\n${this.room}`;
    }
  },
  {
    id: "10",
    instructor: "Jordan Pratt",
    username: "jpratt",
    room: "T225",
    course: "COMP1501",
    section: "002",
    start: "2018-09-14T10:30",
    end: "2018-09-14T11:20",
    crn: "43140",
    get title() {
      return `${this.course}-${this.section} [${this.username}]\n${this.room}`;
    }
  },
  {
    id: "11",
    instructor: "Jordan Pratt",
    username: "jpratt",
    room: "B107",
    course: "COMP1501",
    section: "403",
    start: "2018-09-13T09:30",
    end: "2018-09-13T10:20",
    crn: "43143",
    get title() {
      return `${this.course}-${this.section} [${this.username}]\n${this.room}`;
    }
  },
  {
    id: "12",
    instructor: "Jordan Pratt",
    username: "jpratt",
    room: "B107",
    course: "COMP1501",
    section: "404",
    start: "2018-09-13T10:30",
    end: "2018-09-13T11:20",
    crn: "43144",
    get title() {
      return `${this.course}-${this.section} [${this.username}]\n${this.room}`;
    }
  },
  {
    id: "13",
    instructor: "Jordan Pratt",
    username: "jpratt",
    room: "B107",
    course: "COMP1501",
    section: "503",
    start: "2018-09-11T09:30",
    end: "2018-09-11T10:20",
    crn: "43147",
    get title() {
      return `${this.course}-${this.section} [${this.username}]\n${this.room}`;
    }
  },
  {
    id: "14",
    instructor: "Jordan Pratt",
    username: "jpratt",
    room: "B162",
    course: "COMP1501",
    section: "504",
    start: "2018-09-11T10:30",
    end: "2018-09-11T11:20",
    crn: "43148",
    get title() {
      return `${this.course}-${this.section} [${this.username}]\n${this.room}`;
    }
  },
  {
    id: "15",
    instructor: "TBA",
    username: "TBA",
    room: "T239",
    course: "COMP2503",
    section: "001",
    start: "2018-09-11T12:30",
    end: "2018-09-11T13:20",
    crn: "43166",
    get title() {
      return `${this.course}-${this.section} [${this.username}]\n${this.room}`;
    }
  },
  {
    id: "16",
    instructor: "TBA",
    username: "TBA",
    room: "T239",
    course: "COMP2503",
    section: "001",
    start: "2018-09-13T12:30",
    end: "2018-09-13T13:20",
    crn: "43166",
    get title() {
      return `${this.course}-${this.section} [${this.username}]\n${this.room}`;
    }
  },
  {
    id: "17",
    instructor: "TBA",
    username: "TBA",
    room: "T239",
    course: "COMP2503",
    section: "001",
    start: "2018-09-14T12:30",
    end: "2018-09-14T13:20",
    crn: "43166",
    get title() {
      return `${this.course}-${this.section} [${this.username}]\n${this.room}`;
    }
  },
  {
    id: "18",
    instructor: "TBA",
    username: "TBA",
    room: "B162",
    course: "COMP2503",
    section: "401",
    start: "2018-09-12T13:00",
    end: "2018-09-12T13:50",
    crn: "43167",
    get title() {
      return `${this.course}-${this.section} [${this.username}]\n${this.room}`;
    }
  },
  {
    id: "19",
    instructor: "TBA",
    username: "TBA",
    room: "B162",
    course: "COMP2503",
    section: "402",
    start: "2018-09-12T14:00",
    end: "2018-09-12T14:50",
    crn: "43168",
    get title() {
      return `${this.course}-${this.section} [${this.username}]\n${this.room}`;
    }
  }, {
    id: "20",
    instructor: "Paul Pospisil",
    username: "ppospisil",
    room: "E204",
    course: "COMP1631",
    section: "001",
    start: "2018-09-10T14:30",
    end: "2018-09-10T15:20",
    crn: "43154",
    get title() {
      return `${this.course}-${this.section} [${this.username}]\n${this.room}`;
    }
  },
  {
    id: "21",
    instructor: "Paul Pospisil",
    username: "ppospisil",
    room: "E204",
    course: "COMP1631",
    section: "001",
    start: "2018-09-12T14:30",
    end: "2018-09-12T15:20",
    crn: "43154",
    get title() {
      return `${this.course}-${this.section} [${this.username}]\n${this.room}`;
    }
  },
  {
    id: "22",
    instructor: "Paul Pospisil",
    username: "ppospisil",
    room: "E204",
    course: "COMP1631",
    section: "001",
    start: "2018-09-14T14:30",
    end: "2018-09-14T15:20",
    crn: "43154",
    get title() {
      return `${this.course}-${this.section} [${this.username}]\n${this.room}`;
    }
  },
  {
    id: "23",
    instructor: "Paul Pospisil",
    username: "ppospisil",
    room: "B162",
    course: "COMP1631",
    section: "401",
    start: "2018-09-11T13:30",
    end: "2018-09-11T14:20",
    crn: "43156",
    get title() {
      return `${this.course}-${this.section} [${this.username}]\n${this.room}`;
    }
  },
  {
    id: "24",
    instructor: "Paul Pospisil",
    username: "ppospisil",
    room: "B107",
    course: "COMP1631",
    section: "401",
    start: "2018-09-13T13:30",
    end: "2018-09-13T14:20",
    crn: "43156",
    get title() {
      return `${this.course}-${this.section} [${this.username}]\n${this.room}`;
    }
  },
  {
    id: "25",
    instructor: "Paul Pospisil",
    username: "ppospisil",
    room: "B173",
    course: "COMP1631",
    section: "402",
    start: "2018-09-11T15:30",
    end: "2018-09-11T16:20",
    crn: "43157",
    get title() {
      return `${this.course}-${this.section} [${this.username}]\n${this.room}`;
    }
  },
  {
    id: "26",
    instructor: "Paul Pospisil",
    username: "ppospisil",
    room: "B173",
    course: "COMP1631",
    section: "402",
    start: "2018-09-13T15:30",
    end: "2018-09-13T16:20",
    crn: "43157",
    get title() {
      return `${this.course}-${this.section} [${this.username}]\n${this.room}`;
    }
  }, {
    id: "27",
    instructor: "TBA",
    username: "TBA",
    room: "T230",
    course: "COMP1631",
    section: "002",
    start: "2018-09-10T14:30",
    end: "2018-09-10T15:20",
    crn: "43155",
    get title() {
      return `${this.course}-${this.section} [${this.username}]\n${this.room}`;
    }
  },
  {
    id: "28",
    instructor: "TBA",
    username: "TBA",
    room: "T230",
    course: "COMP1631",
    section: "002",
    start: "2018-09-12T14:30",
    end: "2018-09-12T15:20",
    crn: "43155",
    get title() {
      return `${this.course}-${this.section} [${this.username}]\n${this.room}`;
    }
  },
  {
    id: "29",
    instructor: "TBA",
    username: "TBA",
    room: "T230",
    course: "COMP1631",
    section: "002",
    start: "2018-09-14T14:30",
    end: "2018-09-14T15:20",
    crn: "43155",
    get title() {
      return `${this.course}-${this.section} [${this.username}]\n${this.room}`;
    }
  },
  {
    id: "30",
    instructor: "TBA",
    username: "TBA",
    room: "E203",
    course: "COMP1631",
    section: "403",
    start: "2018-09-11T13:30",
    end: "2018-09-11T14:20",
    crn: "43158",
    get title() {
      return `${this.course}-${this.section} [${this.username}]\n${this.room}`;
    }
  },
  {
    id: "31",
    instructor: "TBA",
    username: "TBA",
    room: "B162",
    course: "COMP1631",
    section: "403",
    start: "2018-09-13T13:30",
    end: "2018-09-13T14:20",
    crn: "43158",
    get title() {
      return `${this.course}-${this.section} [${this.username}]\n${this.room}`;
    }
  },
  {
    id: "32",
    instructor: "TBA",
    username: "TBA",
    room: "B107",
    course: "COMP1631",
    section: "404",
    start: "2018-09-11T15:30",
    end: "2018-09-11T16:20",
    crn: "43159",
    get title() {
      return `${this.course}-${this.section} [${this.username}]\n${this.room}`;
    }
  },
  {
    id: "33",
    instructor: "TBA",
    username: "TBA",
    room: "B107",
    course: "COMP1631",
    section: "404",
    start: "2018-09-13T15:30",
    end: "2018-09-13T16:20",
    crn: "43159",
    get title() {
      return `${this.course}-${this.section} [${this.username}]\n${this.room}`;
    }
  }
];
