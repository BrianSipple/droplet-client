import XButton from 'droplets/components/x-button/component';
import XButtonLayout from 'droplets/templates/components/x-button';

export default XButton.extend({
  layout: XButtonLayout,
  classNames: [
    'c-primary-button',
    'g-bg-theme-primary-1--500',
    'g-theme-primary-2--900',
    'g-border-s1'
  ]

});
