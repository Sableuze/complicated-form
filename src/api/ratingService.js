export default (redbox) => ({
  async getRating() {
    const result = await redbox.get('/', {}, { showResult: false });
    return result.data.result;
  },
});
