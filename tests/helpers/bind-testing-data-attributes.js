import Ember from 'ember';

const {
  TextField,
  TextArea,
  Component,
  LinkComponent,
} = Ember;

export default function bindTestingDataAttributes() {

  [
    TextField,
    TextArea,
    Component,
    LinkComponent,
  ].forEach(ViewHelper => {

    ViewHelper.reopen({
      attributeBindings: ['data-test-selector'],
    });

  });
}
