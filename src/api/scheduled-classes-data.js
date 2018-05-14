export let scheduledClasses = [
  {
    instructor: "Namrata Khemka",
    username: "nkhemka",
    room: "T235",
    course: "COMP1501",
    section: "001",
    start: "2018-09-10T13:30",
    end: "2018-09-10T14:20",
    get title() {
      return `${this.course}-${this.section} [${this.username}]\n${this.room}`;
    }
  },
  {
    instructor: "Namrata Khemka",
    username: "nkhemka",
    room: "T235",
    course: "COMP1501",
    section: "001",
    start: "2018-09-12T13:30",
    end: "2018-09-12T14:20",
    get title() {
      return `${this.course}-${this.section} [${this.username}]\n${this.room}`;
    }
  },
  {
    instructor: "Namrata Khemka",
    username: "nkhemka",
    room: "T235",
    course: "COMP1501",
    section: "001",
    start: "2018-09-14T13:30",
    end: "2018-09-14T14:20",
    get title() {
      return `${this.course}-${this.section} [${this.username}]\n${this.room}`;
    }
  },
  {
    title: "COMP1501-401 [nkhemka]\nB162",
    start: "2018-09-14T10:00",
    end: "2018-09-14T10:50",
    terms: ["COMP1501-401", "nkhemka", "B162"]
  },
  {
    title: "COMP1501-402 [nkhemka]\nB162",
    start: "2018-09-13T13:30",
    end: "2018-09-13T14:20",
    terms: ["COMP1501-402", "nkhemka", "B162"]
  },
  {
    title: "COMP1501-501 [nkhemka]\nB107",
    start: "2018-09-11T12:30",
    end: "2018-09-11T13:20",
    terms: ["COMP1501-501", "nkhemka", "B107"]
  },
  {
    title: "COMP1501-502 [nkhemka]\nB107",
    start: "2018-09-11T13:30",
    end: "2018-09-11T14:20",
    terms: ["COMP1501-502", "nkhemka", "B107"]
  },
  {
    title: "COMP1501-002 [jpratt]\nT225",
    start: "2018-09-10T10:30",
    end: "2018-09-10T11:20",
    terms: ["COMP1501-002", "jpratt", "T225"]
  },
  {
    title: "COMP1501-002 [jpratt]\nT225",
    start: "2018-09-12T10:30",
    end: "2018-09-12T11:20",
    terms: ["COMP1501-002", "jpratt", "T225"]
  },
  {
    title: "COMP1501-002 [jpratt]\nT225",
    start: "2018-09-14T10:30",
    end: "2018-09-14T11:20",
    terms: ["COMP1501-002", "jpratt", "T225"]
  },
  {
    title: "COMP1501-403 [jpratt]\nB107",
    start: "2018-09-14T09:30",
    end: "2018-09-14T10:20",
    terms: ["COMP1501-403", "jpratt", "B107"]
  },
  {
    title: "COMP1501-404 [jpratt]\nB107",
    start: "2018-09-13T10:30",
    end: "2018-09-13T11:20",
    terms: ["COMP1501-404", "jpratt", "B107"]
  },
  {
    title: "COMP1501-503 [jpratt]\nB162",
    start: "2018-09-11T09:30",
    end: "2018-09-11T10:20",
    terms: ["COMP1501-503", "jpratt", "B162"]
  },
  {
    title: "COMP1501-504 [jpratt]\nB162",
    start: "2018-09-11T10:30",
    end: "2018-09-11T11:20",
    terms: ["COMP1501-504", "jpratt", "B162"]
  },
  {
    title: "COMP2503-001 [nkhemka]\nT239",
    start: "2018-09-11T12:30",
    end: "2018-09-11T13:20",
    terms: ["COMP2503-001", "nkhemka", "T239"]
  },
  {
    title: "COMP2503-001 [nkhemka]\nT239",
    start: "2018-09-13T12:30",
    end: "2018-09-13T13:20",
    terms: ["COMP2503-001", "nkhemka", "T239"]
  },
  {
    title: "COMP2503-001 [nkhemka]\nT239",
    start: "2018-09-14T12:30",
    end: "2018-09-14T13:20",
    terms: ["COMP2503-001", "nkhemka", "T239"]
  },
  {
    title: "COMP2503-401 [nkhemka]\nB162",
    start: "2018-09-12T13:00",
    end: "2018-09-12T13:50",
    terms: ["COMP2503-401", "nkhemka", "B162"]
  },
  {
    title: "COMP2503-402 [nkhemka]\nB162",
    start: "2018-09-12T14:00",
    end: "2018-09-12T14:50",
    terms: ["COMP2503-402", "nkhemka", "B162"]
  },
  {
    title: "COMP1631-001 [ppospisil]\nE204",
    start: "2018-09-10T14:30",
    end: "2018-09-10T15:20",
    terms: ["COMP1631-001", "ppospisil", "E204"]
  },
  {
    title: "COMP1631-001 [ppospisil]\nE204",
    start: "2018-09-12T14:30",
    end: "2018-09-12T15:20",
    terms: ["COMP1631-001", "ppospisil", "E204"]
  },
  {
    title: "COMP1631-001 [ppospisil]\nE204",
    start: "2018-09-14T14:30",
    end: "2018-09-14T15:20",
    terms: ["COMP1631-001", "ppospisil", "E204"]
  },
  {
    title: "COMP1631-401 [ppospisil]\nB107",
    start: "2018-09-11T14:30",
    end: "2018-09-11T15:20",
    terms: ["COMP1631-401", "ppospisil", "B107"]
  },
  {
    title: "COMP1631-401 [ppospisil]\nB107",
    start: "2018-09-13T14:30",
    end: "2018-09-13T15:20",
    terms: ["COMP1631-401", "ppospisil", "B107"]
  },
  {
    title: "COMP1631-402 [ppospisil]\nB107",
    start: "2018-09-11T15:30",
    end: "2018-09-11T16:20",
    terms: ["COMP1631-402", "ppospisil", "B107"]
  },
  {
    title: "COMP1631-402 [ppospisil]\nB107",
    start: "2018-09-13T15:30",
    end: "2018-09-13T16:20",
    terms: ["COMP1631-402", "ppospisil", "B107"]
  },
  {
    title: "COMP1631-002 [TBA]\nT230",
    start: "2018-09-10T14:30",
    end: "2018-09-10T15:20",
    terms: ["COMP1631-002", "TBA", "T230"]
  },
  {
    title: "COMP1631-002 [TBA]\nT230",
    start: "2018-09-12T14:30",
    end: "2018-09-12T15:20",
    terms: ["COMP1631-002", "TBA", "T230"]
  },
  {
    title: "COMP1631-002 [TBA]\nT230",
    start: "2018-09-14T14:30",
    end: "2018-09-14T15:20",
    terms: ["COMP1631-002", "TBA", "T230"]
  },
  {
    title: "COMP1631-403 [TBA]\nB107",
    start: "2018-09-11T08:30",
    end: "2018-09-11T09:20",
    terms: ["COMP1631-403", "TBA", "B107"]
  },
  {
    title: "COMP1631-403 [TBA]\nB107",
    start: "2018-09-13T08:30",
    end: "2018-09-13T09:20",
    terms: ["COMP1631-403", "TBA", "B107"]
  },
  {
    title: "COMP1631-404 [TBA]\nB107",
    start: "2018-09-11T09:30",
    end: "2018-09-11T10:20",
    terms: ["COMP1631-404", "TBA", "B107"]
  },
  {
    title: "COMP1631-404 [TBA]\nB107",
    start: "2018-09-13T09:30",
    end: "2018-09-13T10:20",
    terms: ["COMP1631-404", "TBA", "B107"]
  }
];
