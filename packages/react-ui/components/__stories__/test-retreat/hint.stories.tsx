import { CSFStory } from 'creevey';
import React from 'react';

import { Hint } from '../../Hint'; // 1

export default { title: 'TR Hint' };

/**
 *  Hint. Хинт появляется при наведении курсора на элемент
 *
 *  0. История TextWithHint
 *  1. Найти элемент на странице
 *  2. 📸 хинт отсутствует
 *  3. Навести на элемент
 *  4. 📸 хинт появился
 *  5. Убрать курсор с элемента
 *  6. 📸 хинт исчез
 *  Profit!
 */

export const SimpleHint: CSFStory<JSX.Element> = () => {
  return <Hint text="World">Hello</Hint>;
};
//В storybook не анимируется hint при наведении на него
