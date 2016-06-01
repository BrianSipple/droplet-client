import Ember from 'ember';
import { animate } from 'liquid-fire';

const { assign } = Ember;

const DEFAULT_IN_OPTS = {
  duration: 300
};

const DEFAULT_OUT_OPTS = {
  duration: 300,
  delay: 300,
};


export default function flash(_maxOpacity = 1, _inOpts = {}, _outOpts = {}) {
  const maxOpacity = _maxOpacity > 0 ? _maxOpacity : 1;
  const inOpts = assign({}, DEFAULT_IN_OPTS, _inOpts);
  const outOpts = assign({}, DEFAULT_OUT_OPTS, _outOpts);

  const flashIn = animate(this.newElement, { opacity: maxOpacity }, inOpts);
  const flashOut = animate(this.newElement, { opacity: 0 }, outOpts);

  return flashIn.then(flashOut);
}
