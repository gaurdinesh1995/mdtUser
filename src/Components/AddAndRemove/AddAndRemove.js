import React from 'react';
import {createBox, createText} from '@shopify/restyle';
import {TouchableOpacity} from 'react-native';

const Box = createBox();
const Text = createText();

export default ({item, quantity, addQuantity, decreaseQuantity}) => {
  return (
    <>
      {quantity > 0 ? (
        <Box
          width={83}
          height={31}
          backgroundColor="primary"
          borderRadius={15}
          alignItems="center"
          justifyContent="center"
          flexDirection="row"
          alignSelf="flex-end"
          bottom={10}>
          <TouchableOpacity onPress={() => decreaseQuantity(item)}>
            <Text variant="support116regular">-</Text>
          </TouchableOpacity>
          <Text variant="support116regular" paddingHorizontal="l">
            {item.quantity}
          </Text>
          <TouchableOpacity onPress={() => addQuantity(item)}>
            <Text variant="support116regular">+</Text>
          </TouchableOpacity>
        </Box>
      ) : (
        <TouchableOpacity onPress={() => addQuantity(item)}>
          <Box
            borderColor="primary1"
            borderWidth={0.8}
            backgroundColor="primary2"
            height={31}
            width={79}
            borderRadius={12}
            justifyContent="center"
            alignItems="center">
            <Text variant="primary15regular">Add +</Text>
          </Box>
        </TouchableOpacity>
      )}
    </>
  );
};
