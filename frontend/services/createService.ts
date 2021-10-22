import axios from 'axios';

/**
 * type createService = (service_name: string,
 *                       service_description: string,
 *                       service_price: string,
 *                       contact_number: string,
 *                       country: string,
 *                       city: string,
 *                       postal_code: string,
 *                       address: string) => string;
 */

async function createService(
  service_name: string,
  service_description: string,
  service_price: string,
  contact_number: string,
  country: string,
  city: string,
  postal_code: string,
  address: string,
  token: any
) {
  const res = await axios
    .post(
      'http://192.168.1.21:8080/api/v1/services/request-verification',
      {
        service_name: service_name,
        service_description: service_description,
        service_price: service_price,
        contact_number: contact_number,
        country: country,
        city: city,
        postal_code: postal_code,
        address: address,
      },
      {
        headers: {
          'auth-token': token,
        },
      }
    )
    .catch((err) => {
      console.log('Post operation for Create Service failed.' + err);
      throw err;
    });

  return res;
}

export default createService;
