const { registerUser, getRoomData } = require('/controller/userController'); 

// Mock dependencies
jest.mock('../models/User', () => ({
  findOne: jest.fn(),
  save: jest.fn(),
}));

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe('registerUser', () => {
  it('should register a new user', async () => {
    // Mock request
    const req = {
      body: {
        roomNo: '101',
        date: '2024-05-30',
        email: 'test@example.com',
      },
    };

    // Mock RoomBooked.findOne to return null (no existing user)
    RoomBooked.findOne.mockResolvedValue(null);

    // Mock RoomBooked.save to return the saved user
    RoomBooked.save.mockResolvedValue({});

    const resp = mockResponse();

    // Call the registerUser function
    await registerUser(req, resp);

    // Assert that the response is sent with the result
    expect(resp.send).toHaveBeenCalledWith({});
  });

  it('should handle existing user', async () => {
    // Mock request
    const req = {
      body: {
        roomNo: '101',
        date: '2024-05-30',
        email: 'test@example.com',
      },
    };

    // Mock RoomBooked.findOne to return an existing user
    RoomBooked.findOne.mockResolvedValue({});

    const resp = mockResponse();

    // Call the registerUser function
    await registerUser(req, resp);

    // Assert that the response status is 409 and error message is sent
    expect(resp.status).toHaveBeenCalledWith(409);
    expect(resp.send).toHaveBeenCalledWith('Email is already registered try another email id');
  });

  // Write more test cases for error scenarios, invalid input, etc.
});

describe('getRoomData', () => {
  it('should fetch room data', async () => {
    // Mock RoomBooked.find to return room data
    RoomBooked.find.mockResolvedValue(['room1', 'room2']);

    const resp = mockResponse();

    // Call the getRoomData function
    await getRoomData({}, resp);

    // Assert that the response is sent with the room data
    expect(resp.send).toHaveBeenCalledWith(['room1', 'room2']);
  });

  // Write more test cases for error scenarios, empty data, etc.
});
