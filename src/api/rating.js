import { redbox } from '@/api/http';
// eslint-disable-next-line no-unused-vars
export default class Rating {
  static async getRating() {
    const result = await redbox.get('/', {
      errorAlert: { text: 'при получении рейтинга товара' },
    });
    return result.data.result;
  }

  // async uploadImage(image, /////) {
  //   const headers = {};
  //
  //   if (smth === 'smth') {
  //     headers.headers = {
  //       'X-API-KEY': tokens.,
  //       'Content-Type': 'multipart/form-data',
  //     };
  //   }
  //   try {
  //     const response = await http.post('//', '//', image, headers);
  //     return response.data.file.url;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
}
