import axios from 'axios';
import Constants from 'expo-constants';

// @ts-ignore
const { BACKEND_ENDPOINT } = Constants.manifest?.extra;

/**
 * type modifyService = (service_id: string,
 *                       service_name: string,
 *                       service_description: string,
 *                       service_price: string,
 *                       contact_number: string,
 *                       token: any
 */

async function modifyService(
  serviceId: string,
  service_name: string,
  service_description: string,
  service_price: string,
  contact_number: string,
  token: any
) {
  const res = await axios
    .put(
      `${BACKEND_ENDPOINT}/api/v1/services`,
      {
        serviceId: serviceId,
        service_name: service_name,
        service_description: service_description,
        service_price: service_price,
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
