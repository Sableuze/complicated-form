import { redbox } from '@/api/http';

export default class Rating {
  static async getRating() {
    const result = await redbox.get('/', {
      errorAlert: { text: 'при получении рейтинга товара' },
    });
    return result.data.result;
  }
}
