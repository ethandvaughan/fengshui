export class Coordinate {
  readonly x: number;
  readonly y: number;

  constructor(x: number, y:number) {
    this.x = x;
    this.y = y;
  }

  public equals(other: Coordinate): boolean {
    return this.x === other.x && this.y === other.y;
  }
}

export type Perimeter = Coordinate[];

export class RoomFeature {
  start: Coordinate;
  end: Coordinate;

  constructor(start: Coordinate, end: Coordinate) {
    this.start = start;
    this.end = end;
  }

  public length(): number {
    return Math.sqrt(
      Math.pow(this.end.x - this.start.x, 2) + Math.pow(this.end.y - this.start.y, 2)
    );
  }
}

export class Room {
  perimeter: Perimeter;
  doors: RoomFeature[] = [];
  windows: RoomFeature[] = [];
  hallways: RoomFeature[] = [];

  constructor(perimeter: Perimeter) {
    if (perimeter.length < 3) {
      throw new Error("A room must have at least three corners to define a perimeter.");
    }
    if (!Room.isClosedPolygon(perimeter)) {
      throw new Error("The perimeter must form a closed polygon.");
    }

    this.perimeter = perimeter;
  }

  static isClosedPolygon(perimeter: Perimeter): boolean {
    const first = perimeter[0];
    const last = perimeter[perimeter.length - 1];
    return first.equals(last);
  }

  // Utility to check if a point lies on a line segment
  static isPointOnLineSegment(
    point: Coordinate,
    segmentStart: Coordinate,
    segmentEnd: Coordinate
  ): boolean {
    const crossProduct =
      (point.y - segmentStart.y) * (segmentEnd.x - segmentStart.x) -
      (point.x - segmentStart.x) * (segmentEnd.y - segmentStart.y);

    if (Math.abs(crossProduct) > 1e-10) return false; // Not collinear

    const dotProduct =
      (point.x - segmentStart.x) * (segmentEnd.x - segmentStart.x) +
      (point.y - segmentStart.y) * (segmentEnd.y - segmentStart.y);

    if (dotProduct < 0) return false;

    const squaredLength =
      Math.pow(segmentEnd.x - segmentStart.x, 2) +
      Math.pow(segmentEnd.y - segmentStart.y, 2);

    return dotProduct <= squaredLength;
  }

  private isFeatureOnPerimeter(feature: RoomFeature): boolean {
    for (let i = 0; i < this.perimeter.length - 1; i++) {
      const segmentStart = this.perimeter[i];
      const segmentEnd = this.perimeter[i + 1];

      if (
        Room.isPointOnLineSegment(feature.start, segmentStart, segmentEnd) &&
        Room.isPointOnLineSegment(feature.end, segmentStart, segmentEnd)
      ) {
        return true;
      }
    }
    return false;
  }

  // Add a door to the room
  public addDoor(door: RoomFeature): void {
    if (!this.isFeatureOnPerimeter(door)) {
      throw new Error("Door must lie on the room's perimeter.");
    }
    this.doors.push(door);
  }

  // Add a window to the room
  public addWindow(window: RoomFeature): void {
    if (!this.isFeatureOnPerimeter(window)) {
      throw new Error("Window must lie on the room's perimeter.");
    }
    this.windows.push(window);
  }

  // Add a hallway to the room
  public addHallway(hallway: RoomFeature): void {
    if (!this.isFeatureOnPerimeter(hallway)) {
      throw new Error("Hallway must lie on the room's perimeter.");
    }
    this.hallways.push(hallway);
  }

  public print() {
    console.log(JSON.stringify({
      perimeter: this.perimeter,
      windows: this.windows,
      doors: this.doors,
      hallways: this.hallways
    }, null, 2));
  }
}


// // Define a rectangular room
// const perimeter = [
//   new Coordinate(0, 0),
//   new Coordinate(0, 6),
//   new Coordinate(9, 6),
//   new Coordinate(9, 0),
//   new Coordinate(0, 0), // Close the polygon
// ];

// const room = new Room(perimeter);

// // Add a door
// room.addDoor(new RoomFeature(new Coordinate(0, 3), new Coordinate(0, 4)));

// // Add a window
// room.addWindow(new RoomFeature(new Coordinate(9, 4), new Coordinate(9, 5)));
// room.addWindow(new RoomFeature(new Coordinate(3, 0), new Coordinate(6, 0)));

// // Add a hallway
// room.addHallway(new RoomFeature(new Coordinate(0, 0), new Coordinate(3, 0)));

// room.print();