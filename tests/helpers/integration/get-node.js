/**
 * Get the actual DOM node of of the component rendered during an integration
 * test, which, initially, will have a parent div wrapping it.
 *
 * By getting direct access to the aforementioned node, then, we
 * this utility makes it easy for us to jump right into using the DOM API.
 */
export default function getNode (context = this) {
  return context.$()[0].firstElementChild;
}
