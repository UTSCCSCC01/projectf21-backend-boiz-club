import * as React from 'react';
import {
  Button,
  FormControl,
  Input,
  Row,
  Stack,
  Text,
  View,
} from 'native-base';
import { CardField } from '@stripe/stripe-react-native';

const PaymentScreen = () => {
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
      <OrderSummary />
      <Button marginY={5} colorScheme="cyan" style={{ alignSelf: 'stretch' }}>
        Place Order ($134.44)
      </Button>
    </View>
  );
};

const OrderSummary = () => {
  return (
    <View paddingTop={5}>
      <Row paddingBottom={3}>
        <Text bold fontSize="xl">
          Order Summary
        </Text>
      </Row>
      <Row>
        <Text>Subtotal: </Text>
        <Text>$134.44</Text>
      </Row>
      <Row>
        <Text>Service Fees: </Text>
        <Text>$134.44</Text>
      </Row>
      <Row>
        <Text>Taxes: </Text>
        <Text>$134.44</Text>
      </Row>
      <Row>
        <Text bold fontSize="lg">
          Total:{' '}
        </Text>
        <Text fontSize="lg" textAlign="right">
          $134.44
        </Text>
      </Row>
    </View>
  );
};

export default PaymentScreen;
