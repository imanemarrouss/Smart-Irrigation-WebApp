const fetch = require('node-fetch');
jest.mock('node-fetch');

// Create a mock function for sendPushNotificationsAsync
const mockSendPushNotificationsAsync = jest.fn();

// Mock expo-server-sdk
jest.mock('expo-server-sdk', () => ({
  Expo: jest.fn().mockImplementation(() => ({
    sendPushNotificationsAsync: mockSendPushNotificationsAsync
  }))
}));

describe('Humidity Notification System', () => {
  let sendPushNotification;

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();

    // Re-require the module to ensure fresh instance for each test
    jest.isolateModules(() => {
      sendPushNotification = require('./GetHumidityData').sendPushNotification;
    });
  });

  test('should send notification when humidity is below 30%', async () => {
    // Mock successful humidity data fetch
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ humidity: 25 })
    });

    await sendPushNotification();

    // Verify notification was sent with correct parameters
    expect(mockSendPushNotificationsAsync).toHaveBeenCalledWith([
      {
        to: "ExponentPushToken[SPg0EMPcXY7VV5tMLxx4s_]",
        title: "soil water level too low!",
        body: "water your plant",
      }
    ]);
  });

  test('should not send notification when humidity is above 30%', async () => {
    // Mock successful humidity data fetch with higher humidity
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ humidity: 35 })
    });

    await sendPushNotification();

    // Verify no notification was sent
    expect(mockSendPushNotificationsAsync).not.toHaveBeenCalled();
  });

  test('should handle fetch error gracefully', async () => {
    // Mock failed fetch
    fetch.mockRejectedValueOnce(new Error('Network error'));
    
    // Create spy for console.error
    const consoleSpy = jest.spyOn(console, 'error');

    await sendPushNotification();

    // Verify error was logged
    expect(consoleSpy).toHaveBeenCalledWith(
      'Error sending push notification:',
      expect.any(Error)
    );
    
    // Verify no notification was attempted
    expect(mockSendPushNotificationsAsync).not.toHaveBeenCalled();
  });

  test('should handle non-ok fetch response', async () => {
    // Mock unsuccessful response
    fetch.mockResolvedValueOnce({
      ok: false
    });
    
    const consoleSpy = jest.spyOn(console, 'error');

    await sendPushNotification();

    // Verify error was logged
    expect(consoleSpy).toHaveBeenCalledWith(
      'Error sending push notification:',
      expect.any(Error)
    );
    
    // Verify no notification was attempted
    expect(mockSendPushNotificationsAsync).not.toHaveBeenCalled();
  });
});