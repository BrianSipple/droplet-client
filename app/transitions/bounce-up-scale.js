import Ember from 'ember';
import easings from 'droplet/utils/constants/easings';
import { animate } from 'liquid-fire';

const { assign } = Ember;

const DEFAULT_IN_OPTS = {
  duration: 200,
  easing: easings.EASE_OUT_CUBIC
};

const DEFAULT_OUT_OPTS = {
  duration: 400,
  easing: easings.EASE_IN_CUBIC
};


export default function bounceUpScale (scaleUpValue = 1.2, _inOpts = {}, _outOpts = {}) {
  const { newElement } = this;
  const inOpts = assign({}, DEFAULT_IN_OPTS, _inOpts);
  const outOpts = assign({}, DEFAULT_OUT_OPTS, _outOpts);

  return animate(newElement, { scale: [scaleUpValue, 1] }, inOpts)
    .then(animate(newElement, { scale: [1, scaleUpValue] }, outOpts));
}
