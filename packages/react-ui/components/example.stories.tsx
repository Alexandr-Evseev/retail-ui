import { Checkbox } from './Checkbox';
import React, { Component } from 'react';
import { CSFStory } from 'creevey';

export default {
  title: '😌 TestRetreat ',
};

export const ButtonWithIcon = () => {
  return <Button>Hello 👋</Button>;
};

/**
 *  Button. Состояние “hover”
 *
 *  0. История ButtonWithIcon
 *  1. Найти элемент на странице
 *  2. 📸 дефолтное состояние
 *  3. Навести мышь на Кнопку
 *  4. 📸 состояние “hover”
 *  5. Наблюдаем изменение цвета фона
 *
 *  Profit!
 */

ButtonWithIcon.story = {
  parameters: {
    creevey: {
      tests: {
        async hover(this: { browser: WebDriver }) {
          // 1. находим элемент для скриншота
          const element = await this.browser.findElement({ css: '#test-element' });
          // находим кнопку
          const button = await this.browser.findElement({ css: 'button' });

          // 2. делаем скриншот "по умолчанию"
          const idle = await element.takeScreenshot();

          // 3. наводим указатель мыши
          await this.browser
            .actions({ bridge: true })
            .move({ origin: button })
            .perform();

          // 4. делаем скриншот "при наведении"
          const hover = await element.takeScreenshot();

          // 5. сравниваем результаты
          await expect({ idle, hover }).to.matchImages();
        },
      },
    },
  },
};

export const BasicAutocomplete = () => {
  const [value, updateValue] = React.useState('');
  return (
    <div style={{ padding: '4px 200px 200px 4px' }}>
      <Autocomplete source={['one', 'two', 'three']} value={value} onValueChange={updateValue} />
    </div>
  );
};

/**
 *  Autocomplete. Выбор значения по Enter
 *
 *  0. История BasicAutocomplete
 *  1. Найти элемент на странице
 *  2. Фокус на поле ввода
 *  3. 📸 состояние "в фокусе"
 *  4. Ввести символ "о"
 *  5. 📸 состояние “введенный символ”
 *  6. Нажать клавишу ARROW_DOWN
 *  7. 📸 состояние “подсвечен первый элемент”
 *  8. Нажать клавишу ENTER
 *  9. 📸 состояние “выбран элемент”
 *
 *  Profit!
 */

BasicAutocomplete.story = {
  parameters: {
    creevey: {
      tests: {
        async itemSelected(this: { browser: WebDriver }) {
          const element = await this.browser.findElement({ css: '#test-element' });
          const input = await this.browser.findElement({ css: '[data-comp-name~=Autocomplete]' });

          await this.browser
            .actions({ bridge: true })
            .click(input)
            .perform();

          const focused = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .sendKeys('o')
            .perform();

          const typed = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .sendKeys(Key.ARROW_DOWN)
            .perform();

          const highlighted = await element.takeScreenshot();

          await this.browser
            .actions({ bridge: true })
            .sendKeys(Key.ENTER)
            .perform();

          const selected = await element.takeScreenshot();

          await expect({ focused, typed, highlighted, selected }).to.matchImages();
        },
      },
    },
  },
};

class CheckboxWithTextClass extends Component<any, any> {
  public state = {
    checked: false,
  };

  public render() {
    const { checked } = this.state;
    return (
      <Checkbox onValueChange={() => this.setState({ checked: !checked })} checked={checked}>
        {this.props.children}
      </Checkbox>
    );
  }
}

export const CheckboxWithText: CSFStory<JSX.Element> = () => <CheckboxWithTextClass><div data-tid="text">CheckboxWithText</div></CheckboxWithTextClass>;

/**
 *  Checkbox.
 *
 *  0. История CheckboxWithText
 *  1. Найти на странице текст у чекбокса
 *  2. Фокус на текст чекбокса
 *  3. 📸 состояние "не выбран и в фокусе"
 *  4. Нажимаем на текст чекбоса
 *  5. 📸 состояние "нажат и выбран"
 *  6. Отжимаем
 *  7. 📸 состояние "выбран и в фокусе"
 *  8. Снимаем фокус
 *  9. 📸 состояние "выбран и не в фокусе"
 *
 *  Profit!
 */

CheckboxWithText.story = {
  parameters: {
    creevey: {
      tests: {
        async idle() {
          await this.expect(await this.takeScreenshot()).to.matchImage('idle');
        },
        async hoverOnLabel() {
          const label = await this.browser.findElement({ css: '[data-tid~=text]' });
          await this.browser.
            actions({
              bridge: true
            }).
            move({
              origin: label,
            }).
            perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('hoverOnLabel');
        },
      }
    }
  }
}

class CheckboxWithIndeterminateState extends Component<any, any> {
  state = {
    checked: false,
    initialIndeterminate: true,
  };

  public render() {
    const { checked, initialIndeterminate } = this.state;
    return (
      <Checkbox
        initialIndeterminate={initialIndeterminate}
        onValueChange={() => this.setState({ checked: !checked })}
        checked={checked}
      >
        {this.props.children}
      </Checkbox>
    );
  }
}

export const SimpleCheckbox: CSFStory<JSX.Element> = () => (
  <CheckboxWithIndeterminateState>Click me </CheckboxWithIndeterminateState>
);

/**
 *  Checkbox.
 *
 *  0. История SimpleCheckbox
 *
 *  Profit!
 */
