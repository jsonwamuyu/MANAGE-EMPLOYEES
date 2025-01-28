const {fetchData} = require('./fetchData');

describe('fetchData', () => {
  it('should fetch data successfully', async () => {
    const mockResponse = {"data": 'some data' };
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const data = await fetchData('testKey');

    expect(data).toEqual(mockResponse.data);
    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/testKey');
  });

  it('should handle errors', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

    await expect(fetchData('testKey')).rejects.toThrow('Network error');
  });
});