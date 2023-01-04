
import React from 'react';
import { Button, Input } from '../components';
import styles from './index.module.scss';
import { BeakerIcon } from '@heroicons/react/24/outline';

export function Index(): JSX.Element {
  return (
    <>
    <h1 className="text-3xl font-bold underline">Заголовок</h1>
    <Button>Button <BeakerIcon className="h-4 w-4 ml-1"/></Button>
    <Button rounded={true}>Button <BeakerIcon className="h-4 w-4 ml-1"/></Button>
    <Button size='s'>Button <BeakerIcon className="h-4 w-4 ml-1"/></Button>
    <Button size='l'>Button <BeakerIcon className="h-4 w-4 ml-1"/></Button>
    <Input/>
    </>
  );
}

export default Index;
