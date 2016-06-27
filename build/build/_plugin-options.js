'use strict';

module.exports = {

  customProperties: {

    // tell postcss that we're okay with not scoping custom properties to :root (https://github.com/MoOx/postcss-cssnext/issues/186)
    // because this postcss-variables plugin handles that.
    // TODO: Perhaps don't even rely on such behavior unless supported buy postcss-custom-properties
    // https://github.com/postcss/postcss-custom-properties#postcss-custom-properties-
    warnings: false,
  }

};
