import { Button as AntdButton, type ButtonProps } from 'antd';
import type { FC } from 'react';

const Button:FC<ButtonProps> = ({...rest}) => {
  return  <AntdButton {...rest} />
}

export default Button
