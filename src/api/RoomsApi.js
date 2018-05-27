const RoomsApi = (module.exports = function() {
  this.capacities = new Map();

  KNOWN_ROOMS.forEach(room => {
    this.capacities.set(room.id, room.studentCapacity);
  });
});

RoomsApi.prototype.capacity = function(roomName) {
  if (!this.capacities.has(roomName)) return "unknown";

  return this.capacities.get(roomName);
};


RoomsApi.prototype.canHold = function(roomName, numPeople) {
  if (!this.capacities.has(roomName)) return true;

  const roomCapacity = this.capacities.get(roomName);
  return roomCapacity >= numPeople;
};

const KNOWN_ROOMS = [{
    id: "B107",
    studentCapacity: 25
  },
  {
    id: "B160",
    studentCapacity: 16
  },
  {
    id: "B162",
    studentCapacity: 29
  },
  {
    id: "B173",
    studentCapacity: 14
  },
  {
    id: "B215",
    studentCapacity: 24
  },
  {
    id: "E203",
    studentCapacity: 40
  }
];
