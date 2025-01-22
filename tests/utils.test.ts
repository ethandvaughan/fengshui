import { Coordinate, RoomFeature, Room } from '../src/app/utils' 

describe('Coordinate', () => {
  it('should correctly identify equal coordinates', () => {
    const coord1 = new Coordinate(1, 2);
    const coord2 = new Coordinate(1, 2);
    expect(coord1.equals(coord2)).toBe(true);
  });

  it('should correctly identify unequal coordinates', () => {
    const coord1 = new Coordinate(1, 2);
    const coord2 = new Coordinate(3, 4);
    expect(coord1.equals(coord2)).toBe(false);
  });
});

describe('RoomFeature', () => {
  it('should calculate the correct length of a feature', () => {
    const feature = new RoomFeature(new Coordinate(0, 0), new Coordinate(3, 4));
    expect(feature.length()).toBe(5); // 3-4-5 triangle
  });
});

describe('Room', () => {
  const perimeter = [
    new Coordinate(0, 0),
    new Coordinate(0, 6),
    new Coordinate(9, 6),
    new Coordinate(9, 0),
    new Coordinate(0, 0),
  ];

  it('should throw an error if the perimeter is not closed', () => {
    const invalidPerimeter = [
      new Coordinate(0, 0),
      new Coordinate(0, 6),
      new Coordinate(9, 6),
    ];
    expect(() => new Room(invalidPerimeter)).toThrow('The perimeter must form a closed polygon.');
  });

  it('should allow adding a door on the perimeter', () => {
    const room = new Room(perimeter);
    const door = new RoomFeature(new Coordinate(0, 3), new Coordinate(0, 4));
    room.addDoor(door);
    expect(room.doors).toContainEqual(door);
  });

  it('should throw an error when adding a door not on the perimeter', () => {
    const room = new Room(perimeter);
    const invalidDoor = new RoomFeature(new Coordinate(1, 1), new Coordinate(2, 2));
    expect(() => room.addDoor(invalidDoor)).toThrow('Door must lie on the room\'s perimeter.');
  });

  it('should validate that the feature is on the perimeter', () => {
    const room = new Room(perimeter);
    const validFeature = new RoomFeature(new Coordinate(0, 0), new Coordinate(0, 6));
    expect(room['isFeatureOnPerimeter'](validFeature)).toBe(true);
  });
});
