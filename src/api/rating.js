import { redbox } from '@/api/http';
// eslint-disable-next-line no-unused-vars
export default class Rating {
  static async getRating() {
    const result = await redbox.get('/', {
      errorAlert: { text: 'при получении рейтинга товара' },
    });
    return result.data.result;
  }
}
