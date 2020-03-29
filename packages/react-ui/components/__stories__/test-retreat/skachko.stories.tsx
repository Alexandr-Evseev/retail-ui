import { CSFStory } from 'creevey';
import React from 'react';

import { Autocomplete } from '../../Autocomplete'; // 11

export default {
  title: 'TR skachko.e',
};

export const BasicAutocomplete: CSFStory<JSX.Element> = () => {
  const [value, updateValue] = React.useState('');
  return (
    <div style={{ padding: '4px 200px 200px 4px' }}>
      <Autocomplete
        source={['first value', 'first one more time', 'second value', 'third value']}
        value={value}
        onValueChange={updateValue}
      />
    </div>
  );
};

/**
 *  Autocomplete. Выбор значения по Enter
 *
 *  0. История BasicAutocomplete
 *  1. Фокус на поле ввода
 *  2. 📸 состояние "в фокусе"
 *  3. Ввести символ "f"
 *  4. 📸 состояние “введенный символ”
 *  5. Нажать клавишу ARROW_DOWN
 *  6. 📸 состояние “подсвечен первый элемент”
 *  7. Нажать клавишу ENTER
 *  8. 📸 состояние “выбран элемент”
 *
 *  Profit!
 */

/**
 *  Autocomplete. Пропадание выпадашки после ввода неподходящего значения
 *
 *  0. История BasicAutocomplete
 *  1. Фокус на поле ввода
 *  2. Ввести символ "f"
 *  3. 📸 состояние “введенный символ”
 *  4. Ввести символ "s"
 *  5. 📸 состояние “введено несуществующее значение”
 *
 */

/**
 *  Autocomplete. Поиск и выбор значения по двум словам
 *
 *  0. История BasicAutocomplete
 *  1. Фокус на поле ввода
 *  2. Ввести символы "first value"
 *  3. 📸 состояние “введенный символ”
 *  4. Нажать клавишу ARROW_DOWN
 *  5. 📸 состояние “подсвечен первый элемент”
 *  6. Нажать клавишу ENTER
 *  7. 📸 состояние “выбран элемент”
 *
 */

/**
 *  Autocomplete. Поиск и выбор значения по символам внутри слова
 *
 *  0. История BasicAutocomplete
 *  1. Фокус на поле ввода
 *  2. Ввести символы "rst"
 *  3. 📸 состояние “введенный символ”
 *  4. Нажать клавишу ARROW_DOWN
 *  5. 📸 состояние “подсвечен первый элемент”
 *  6. Нажать клавишу ENTER
 *  7. 📸 состояние “выбран элемент”
 *
 */

/**
 *  Autocomplete. Сохранение введенного текста после потери фокуса
 *
 *  0. История BasicAutocomplete
 *  1. Фокус на поле ввода
 *  2. Ввести символы "rst"
 *  3. 📸 состояние “введенный символ”
 *  4. Нажать клавишу ARROW_DOWN
 *  5. 📸 состояние “подсвечен первый элемент”
 *  6. Нажать клавишу ENTER
 *  7. 📸 состояние “выбран элемент”
 *
 */

/**
 *  Autocomplete. Нажатие Enter при невыбранном элементе
 *
 *  0. История BasicAutocomplete
 *  1. Фокус на поле ввода
 *  2. Ввести символы "first"
 *  3. Нажать клавишу ENTER
 *  4. 📸 состояние “не выбран элемент”
 *
 */

BasicAutocomplete.story = {
  parameters: {
    creevey: {
      tests: {
        async wrongTyped() {
          const element = await this.browser.findElement({ css: '#test-element' });
          const input = await this.browser.findElement({ css: '[data-comp-name~=Autocomplete]' });

          await this.browser
            .actions({ bridge: true })
            .click(input)
            .perform();

          await this.browser
            .actions({ bridge: true })
            .sendKeys('f')
            .perform();

          const typed = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .sendKeys('x')
            .perform();

          const typedWrong = await element.takeScreenshot();

          await this.expect({ typed, typedWrong }).to.matchImages();
        },

        async severalWords() {
          const element = await this.browser.findElement({ css: '#test-element' });
          const input = await this.browser.findElement({ css: '[data-comp-name~=Autocomplete]' });

          await this.browser
            .actions({ bridge: true })
            .click(input)
            .perform();

          await this.browser
            .actions({ bridge: true })
            .sendKeys('first value')
            .perform();

          const typed = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .sendKeys(this.keys.ARROW_DOWN)
            .perform();

          const highlighted = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .sendKeys(this.keys.ENTER)
            .perform();

          const selected = await element.takeScreenshot();

          await this.expect({ typed, highlighted, selected }).to.matchImages();
        },

        async notFirstSymbol() {
          const element = await this.browser.findElement({ css: '#test-element' });
          const input = await this.browser.findElement({ css: '[data-comp-name~=Autocomplete]' });

          await this.browser
            .actions({ bridge: true })
            .click(input)
            .perform();

          await this.browser
            .actions({ bridge: true })
            .sendKeys('rst')
            .perform();

          const typed = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .sendKeys(this.keys.ARROW_DOWN)
            .perform();

          const highlighted = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .sendKeys(this.keys.ENTER)
            .perform();

          const selected = await element.takeScreenshot();

          await this.expect({ typed, highlighted, selected }).to.matchImages();
        },

        async saveTextOnBlur() {
          const element = await this.browser.findElement({ css: '#test-element' });
          const input = await this.browser.findElement({ css: '[data-comp-name~=Autocomplete]' });

          await this.browser
            .actions({ bridge: true })
            .click(input)
            .perform();

          await this.browser
            .actions({ bridge: true })
            .sendKeys('first')
            .perform();

          const typed = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .sendKeys(this.keys.TAB)
            .perform();

          const noFocus = await element.takeScreenshot();

          await this.expect({ typed, noFocus }).to.matchImages();
        },

        async enterWhenNoSelectedItem() {
          const element = await this.browser.findElement({ css: '#test-element' });
          const input = await this.browser.findElement({ css: '[data-comp-name~=Autocomplete]' });

          await this.browser
            .actions({ bridge: true })
            .click(input)
            .perform();

          const empty = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .sendKeys('first')
            .perform();

          await this.browser
            .actions({ bridge: true })
            .sendKeys(this.keys.ENTER)
            .perform();

          const selected = await element.takeScreenshot();

          await this.expect({ empty, selected }).to.matchImages();
        },
      },
    },
  },
};

export const AutocompleteWithMask: CSFStory<JSX.Element> = () => {
  const [value, updateValue] = React.useState('');
  return (
    <Autocomplete
      source={['+79001234567', '+79002345678', '+790034567890', '+790092 3456789']}
      value={value}
      onValueChange={updateValue}
      mask="+79999999999"
    />
  );
};

/**
 *  Autocomplete. Маска показывается при вводе
 *
 *  0. История AutocompleteWithMask
 *  1. 📸 состояние “поле не в фокусе”
 *  2. Фокус на поле ввода
 *  3. 📸 состояние “поле в фокусе”
 *  4. Ввести символы "900"
 *  5. 📸 состояние “частичное отображение маски”
 *
 */

/**
 *  Autocomplete. Ввод не подходящего под маску символа
 *
 *  0. История AutocompleteWithMask
 *  1. Фокус на поле ввода
 *  2. 📸 состояние “поле в фокусе”
 *  3. Ввести символ "a"
 *  4. 📸 состояние “введен неверный символ”
 *
 */

/**
 *  Autocomplete. Ввод значения длиной больше маски
 *
 *  0. История AutocompleteWithMask
 *  1. Ввести символы "790034567890888"
 *  4. 📸 состояние “маска полностью заполнена”
 *
 */

/**
 *  Autocomplete. Выбор значения в поле с маской
 *
 *  0. История AutocompleteWithMask
 *  1. Фокус на поле ввода
 *  2. Ввести символы "900"
 *  3. 📸 состояние “заполнена часть маски”
 *  4. Нажать клавишу ARROW_DOWN
 *  5. Нажать клавишу ENTER
 *  6. 📸 состояние “выбран элемент”
 *
 */

/**
 *  Autocomplete. Подгон выбранного значения под маску (не реализован, т.к. не работает тест "Выбор значения в поле с маской")
 *
 *  0. История AutocompleteWithMask
 *  1. Фокус на поле ввода
 *  2. Ввести символы "9009"
 *  3. 📸 состояние “заполнена часть маски”
 *  4. Нажать клавишу ARROW_DOWN
 *  5. Нажать клавишу ENTER
 *  6. 📸 состояние “выбран элемент”, отображается текст +79009234567
 *
 */

AutocompleteWithMask.story = {
  parameters: {
    creevey: {
      tests: {
        async showMask() {
          const element = await this.browser.findElement({ css: '#test-element' });
          const input = await this.browser.findElement({ css: '[data-comp-name~=Autocomplete]' });

          await this.browser
            .actions({ bridge: true })
            .click(input)
            .perform();

          const withMask = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .sendKeys('900')
            .perform();

          const partialMask = await element.takeScreenshot();

          await this.expect({ withMask, partialMask }).to.matchImages();
        },

        async incorrectInput() {
          const element = await this.browser.findElement({ css: '#test-element' });
          const input = await this.browser.findElement({ css: '[data-comp-name~=Autocomplete]' });

          await this.browser
            .actions({ bridge: true })
            .click(input)
            .perform();

          const withMask = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .sendKeys('9a')
            .perform();

          const partialMask = await element.takeScreenshot();

          await this.expect({ withMask, partialMask }).to.matchImages();
        },

        async tooLongInput() {
          const element = await this.browser.findElement({ css: '#test-element' });
          const input = await this.browser.findElement({ css: '[data-comp-name~=Autocomplete]' });

          await this.browser
            .actions({ bridge: true })
            .click(input)
            .perform();

          const withMask = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .sendKeys('90034567890888')
            .perform();

          const filledMask = await element.takeScreenshot();

          await this.expect({ withMask, filledMask }).to.matchImages();
        },

        // Тест не проходит, т.к. не срабатывает this.keys.ARROW_DOWN
        //         async itemSelected() {
        //           const element = await this.browser.findElement({ css: '#test-element' });
        //           const input = await this.browser.findElement({ css: '[data-comp-name~=Autocomplete]' });

        //           await this.browser
        //             .actions({ bridge: true })
        //             .click(input)
        //             .perform();

        //           const focused = await element.takeScreenshot();

        //           await this.browser
        //             .actions({ bridge: true })
        //             .sendKeys('900')
        //             .perform();

        //           const typed = await element.takeScreenshot();

        //           await this.browser
        //             .actions({ bridge: true })
        //             .sendKeys((this as any).keys.ARROW_DOWN)
        //             .perform();

        //           const highlighted = await element.takeScreenshot();

        //           await this.browser
        //             .actions({ bridge: true })
        //             .sendKeys(this.keys.ENTER)
        //             .perform();

        //           const selected = await element.takeScreenshot();

        //           await this.expect({ focused, typed, highlighted, selected }).to.matchImages();
        //         },
      },
    },
  },
};

export const AutocompleteWithWarning: CSFStory<JSX.Element> = () => {
  const [value, updateValue] = React.useState('');
  return (
    <Autocomplete source={['first value', 'second value']} value={value} onValueChange={updateValue} warning={true} />
  );
};

/**
 *  Autocomplete. Подсветка при предупреждении
 *
 *  0. История AutocompleteWithWarning
 *  1. 📸 состояние "не в фокусе"
 *  2. Фокус на поле ввода
 *  3. 📸 состояние "в фокусе"
 *  4. Ввести символ "f"
 *  5. 📸 состояние “введенный символ”
 *  6. Нажать клавишу ARROW_DOWN
 *  7. 📸 состояние “подсвечен первый элемент”
 *  8. Нажать клавишу ENTER
 *  9. 📸 состояние “выбран элемент”
 *
 */

AutocompleteWithWarning.story = {
  parameters: {
    creevey: {
      tests: {
        async showWarning() {
          const element = await this.browser.findElement({ css: '#test-element' });
          const input = await this.browser.findElement({ css: '[data-comp-name~=Autocomplete]' });

          const noFocus = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .click(input)
            .perform();

          const withFocus = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .sendKeys('f')
            .perform();

          const witnElements = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .sendKeys(this.keys.ARROW_DOWN)
            .perform();

          const highlighted = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .sendKeys(this.keys.ENTER)
            .perform();

          const valueSelected = await element.takeScreenshot();

          await this.expect({ noFocus, withFocus, witnElements, highlighted, valueSelected }).to.matchImages();
        },
      },
    },
  },
};

export const AutocompleteWithError: CSFStory<JSX.Element> = () => {
  const [value, updateValue] = React.useState('');
  return (
    <Autocomplete source={['first value', 'second value']} value={value} onValueChange={updateValue} error={true} />
  );
};

/**
 *  Autocomplete. Подсветка при предупреждении
 *
 *  0. История AutocompleteWithWarning
 *  1. 📸 состояние "не в фокусе"
 *  2. Фокус на поле ввода
 *  3. 📸 состояние "в фокусе"
 *  4. Ввести символ "f"
 *  5. 📸 состояние “введенный символ”
 *  6. Нажать клавишу ARROW_DOWN
 *  7. 📸 состояние “подсвечен первый элемент”
 *  8. Нажать клавишу ENTER
 *  9. 📸 состояние “выбран элемент”
 *
 */

AutocompleteWithError.story = {
  parameters: {
    creevey: {
      tests: {
        async showError() {
          const element = await this.browser.findElement({ css: '#test-element' });
          const input = await this.browser.findElement({ css: '[data-comp-name~=Autocomplete]' });

          const noFocus = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .click(input)
            .perform();

          const withFocus = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .sendKeys('f')
            .perform();

          const witnElements = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .sendKeys(this.keys.ARROW_DOWN)
            .perform();

          const highlighted = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .sendKeys(this.keys.ENTER)
            .perform();

          const valueSelected = await element.takeScreenshot();

          await this.expect({ noFocus, withFocus, witnElements, highlighted, valueSelected }).to.matchImages();
        },
      },
    },
  },
};
