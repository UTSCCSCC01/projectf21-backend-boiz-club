import axios from 'axios';

/**
 * type modifyService = (service_name: string,
 *                       service_description: string,
 *                       service_price: string,
 *                       contact_number: string,
 *                       service_id: string,
 *                       token: any
 */

async function modifyService(
  service_name: string,
  service_description: string,
  service_price: string,
  contact_number: string,
  service_id: string,
  token: any
) {
  const res = await axios
    .post(
      'https://pawsup-dev-oznda.ondigitalocean.app/api/v1/services/request-verification',
      {
        service_name: service_name,
        service_description: service_description,
        service_price: service_price,
        service_id: service_id,
        contact_number: contact_number,
      },
      {
        headers: {
          'auth-token': token,
        },
      }
    )
    .catch((err) => {
      console.log('Post operation for Modify Service failed.' + err);
      throw err;
    });

  return res;
}

export default modifyService;
