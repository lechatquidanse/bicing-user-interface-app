/* eslint-disable */
import React from 'react';

export const withEither = (
  conditionalRenderingFn,
  EitherComponent,
) => Component => props => (conditionalRenderingFn(props)
  ? <EitherComponent />
  : <Component {...props} />);

export const withMaybe = conditionalRenderingFn => Component => props => (conditionalRenderingFn(props)
  ? null
  : <Component {...props} />);

export default {
  withEither,
  withMaybe,
};
