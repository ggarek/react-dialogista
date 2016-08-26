import React from 'react';

const isTrue = () => true;
/**
 *
 * @param {React.Component} wrapper - Wrapper component
 * @param {Function} wrapperProps - Get wrapper props of given props
 * @param {React.Component} composed - Component to be wrapped
 * @param {Function} composedProps - Get wrapped component props of given props
 * @param {Function} shouldRenderComposed - Predicate to determine if the wrapped component should be rendered (null otherwise)
 * @param {Function} shouldWrap - Predicate to determine if the component should be wrapped (rendered by itself otherwise)
 * @returns {React.Component}
 */
export default function wrapWith(
  wrapper,
  wrapperProps,
  composed,
  composedProps,
  shouldRenderComposed = isTrue,
  shouldWrap = isTrue
) {
  return class extends React.Component {
    render() {
      const child = shouldRenderComposed(this.props)
        ? React.createElement(composed, composedProps(this.props))
        : null;

      if (shouldWrap(this.props)) {
        return React.createElement(wrapper, wrapperProps(this.props), child);
      }

      return child;
    }
  };
}
