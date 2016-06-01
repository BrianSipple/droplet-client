export default {

  classNames: {
    BOX_SHADOW_DEPTH_PREFIX: 'g-box-shadow',
  },

  // Constants for dynamically configuring flex grid cell
  flexCellConfigs: {
    ONE_THIRD: '0 0 33.333333%',  // flex-grow weight, flex-shrink weight, flex-basis percentage
    ONE_HALF: '0 0 50%',
    FULL_WIDTH: '1 0 100%',
    AT_LEAST_50: '1 0 50%',
    AT_MOST_50: '0 1 0',
    AUTO_SIZE: '0 0 auto',   // delegated height/width
  },

  // Constants for the varieties of `flex` property that we'll attempt to support
  flexboxPropertyNames: {
    OLD_IOS: '-webkit-box-flex',         /* OLD - iOS 6-, Safari 3.1-6 */
    OLD_FIREFOX: '-moz-box-flex',        /* OLD - Firefox 19- */
    WEBKIT: '-webkit-flex',              /* CHROME */
    IE: '-ms-flex',                      /* IE 10 */
    MODERN: 'flex',                       /* NEW, Spec - Opera 12.1, Firefox 20+ */
  },

  tabIndicatorTypes: {
    UNDERLINE: 'underline',
    CIRCLE: 'circle',
  },

  

  DEFAULT_BOX_SHADOW_DEPTH: 2,
  MAX_BOX_SHADOW_DEPTH: 6,
};
