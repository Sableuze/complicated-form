import { dadata } from '@/api/http';

export default class Address {
  static async getCity(q) {
    const { data } = await dadata.post('', {
      query: q,
      from_bound: { value: 'city' },
      to_bound: { value: 'city' },
      locations: [
        {
          country_iso_code: 'RU',
        },
      ],
    });
    if (data) {
      return data.suggestions.map((i) => i.data.city);
    }
  }

  static async getStreet(q, city) {
    const { data } = await dadata.post('', {
      query: q,
      from_bound: { value: 'street' },
      to_bound: { value: 'street' },
      locations: [
        {
          city: city.toLowerCase(),
        },
      ],
      restrict_value: true,

    });
    if (data) {
      return { values: data.suggestions.map((i) => i.value), allData: data };
    }
  }

  static async getHouse(q, streetId) {
    const { data } = await dadata.post('', {
      query: q,
      from_bound: { value: 'house' },
      locations: [
        {
          street_fias_id: streetId,
        },
      ],
      restrict_value: true,

    });
    if (data) {
      return { values: data.suggestions.map((i) => i.value), allData: data };
    }
  }
}
