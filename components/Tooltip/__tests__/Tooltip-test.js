import {mount} from 'enzyme';
import React from 'react';

import Tooltip from '../Tooltip.js';

describe('Tooltip', () => {
  it('keeps child ref', () => {
    const refFn = jest.fn();
    const wrapper = mount(
      <Tooltip>
        <div ref={refFn} />
      </Tooltip>
    );

    expect(refFn.mock.calls.length).toBe(1);
    expect(refFn.mock.calls[0][0]).toBe(wrapper.find('div').node);
  });

  it('calls onFocus/onBlur when trigger=focus', () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const wrapper = mount(
      <Tooltip trigger="focus" render={() => ''}>
        <input onFocus={onFocus} onBlur={onBlur} />
      </Tooltip>
    );
    const input = wrapper.find('input');

    input.simulate('focus');
    expect(wrapper.state('opened')).toBe(true);
    expect(onFocus.mock.calls.length).toBe(1);

    input.simulate('blur');
    expect(onBlur.mock.calls.length).toBe(1);
  });
});
