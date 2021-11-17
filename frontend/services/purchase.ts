import axios from 'axios';
import { Service } from '@/types';

const purchaseCart = async (
  token: String,
  service: { id: string; data: Service; count: number }[]
) => {
  return axios.all(
    service.map((s) =>
      axios.post(
        'https://pawsup-dev-oznda.ondigitalocean.app/api/v1/services/purchase',
        { service_id: s.data._id },
        {
          headers: {
            'auth-token': token,
          },
        }
      )
    )
  );
};

export default purchaseCart;
