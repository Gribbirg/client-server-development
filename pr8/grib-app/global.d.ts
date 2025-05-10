import { Item, ItemFormProps } from './src/types';
import React from 'react';

declare module '*/ItemForm' {
  const ItemForm: React.FC<ItemFormProps>;
  export default ItemForm;
} 