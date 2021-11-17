import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  Button,
  FormControl,
  Input,
  Row,
  Stack,
  Text,
  useToast,
  View,
} from 'native-base';
import { CardField } from '@stripe/stripe-react-native';
import { CartStackScreenProps, Product, Service } from '@/types';
import { useAppSelector } from '@/hooks/react-redux';
import round from 'lodash/round';
import { getServiceFee } from '@/services/fees';
import purchaseCart from '@/services/purchase';
import { useDispatch } from 'react-redux';
import { resetCart } from '@/redux/cart/cart';

const PaymentScreen = ({
  navigation,
}: CartStackScreenProps<'PaymentScreen'>) => {
  return (
    <View padding={5}>
      <FormControl>
        <Stack space={5}>
          <Stack>
            <FormControl.Label>First Name</FormControl.Label>
            <Input
              p={3}
              size="lg"
              placeholder="John"
              variant="filled"
              style={{ backgroundColor: 'white' }}
            />
          </Stack>
          <Stack>
            <FormControl.Label>Last Name</FormControl.Label>
            <Input
              p={3}
              size="lg"
              placeholder="Doe"
              variant="filled"
              style={{ backgroundColor: 'white' }}
            />
          </Stack>
          <Stack>
            <FormControl.Label>Address</FormControl.Label>
            <Input
              p={3}
              size="lg"
              placeholder="778 Magic Road, Toronto"
              variant="filled"
              style={{ backgroundColor: 'white' }}
            />
          </Stack>
          <Stack>
            <FormControl.Label>Credit Card</FormControl.Label>
            <CardField
              postalCodeEnabled={false}
              placeholder={{
                number: '4242 4242 4242 4242',
              }}
              cardStyle={{
                backgroundColor: '#FFFFFF',
                textColor: '#000000',
              }}
              style={{
                width: '100%',
                height: 40,
                marginVertical: 0,
              }}
              onCardChange={(cardDetails) => {
                console.log('cardDetails', cardDetails);
              }}
              onFocus={(focusedField) => {
                console.log('focusField', focusedField);
              }}
            />
          </Stack>
        </Stack>
      </FormControl>
      <OrderSummary navigation={navigation} />
    </View>
  );
};

// @ts-ignore
const OrderSummary = ({ navigation }) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const [fee, setFee] = useState(0);

  const token = useAppSelector((state) => state.userCredential.userToken);

  const services: { id: string; data: Service; count: number }[] =
    useAppSelector((state) => state.cart.services);

  const products: { id: string; data: Product; count: number }[] =
    useAppSelector((state) => state.cart.products);

  useEffect(() => {
    async function serviceFeeRetrieval() {
      const data = await getServiceFee(token).then((resp) => resp.fee);
      setFee(data / 100);
    }

    serviceFeeRetrieval();
  }, []);

  const calculateServiceCost = () => {
    let cost: number = 0;
    services.forEach(
      (service) =>
        (cost += service.data.service_price
          ? +service.data.service_price * +service.count
          : 0)
    );
    return cost;
  };

  const calculateProductCost = () => {
    let cost: number = 0;
    products.forEach(
      (product) =>
        (cost += product.data.product_price
          ? product.data.product_price * +product.count
          : 0)
    );
    return cost;
  };

  const calculateTotalCost = () =>
    calculateProductCost() + calculateServiceCost();

  const calculateServiceFees = () => {
    return calculateTotalCost() * fee;
  };

  const calculateTaxes = () => calculateTotalCost() * 0.13;

  const calculateFinalTotal = () =>
    calculateTotalCost() + calculateServiceFees() + calculateTaxes();

  const handlePurchase = async () => {
    const resp = await purchaseCart(token, services).then((x) => x);

    if (resp[0].status === 200) {
      toast.show({
        status: 'success',
        title: 'Purchase Successful',
        placement: 'top',
      });
    } else {
      toast.show({
        status: 'error',
        title: 'Purchase Failed',
        placement: 'top',
      });
    }
    dispatch(resetCart());
    navigation.popToTop();
  };

  return (
    <View paddingTop={5}>
      <Row paddingBottom={3}>
        <Text bold fontSize="xl">
          Order Summary
        </Text>
      </Row>
      <Row>
        <Text>Subtotal: </Text>
        <Text>${round(calculateTotalCost(), 2).toFixed(2)} CAD</Text>
      </Row>
      <Row>
        <Text>Service Fees ({fee * 100}%): </Text>
        <Text>${round(calculateServiceFees(), 2).toFixed(2)} CAD</Text>
      </Row>
      <Row>
        <Text>Taxes (13%): </Text>
        <Text>${round(calculateTaxes(), 2).toFixed(2)} CAD</Text>
      </Row>
      <Row>
        <Text bold fontSize="lg">
          Total:{' '}
        </Text>
        <Text fontSize="lg" textAlign="right">
          ${round(calculateFinalTotal(), 2).toFixed(2)} CAD
        </Text>
      </Row>
      <Button
        marginY={5}
        colorScheme="cyan"
        onPress={async () => await handlePurchase()}
      >
        <Text color="white">
          {' '}
          Place Order ${round(calculateFinalTotal(), 2).toFixed(2)} CAD
        </Text>
      </Button>
    </View>
  );
};
export default PaymentScreen;
