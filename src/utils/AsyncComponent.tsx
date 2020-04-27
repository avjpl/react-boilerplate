import React from 'react';

const AsyncComponent = (getComponent: any) => {
  return class AsyncComponent extends React.Component {
    static Component: undefined = null;
    state = { Component: AsyncComponent.Component };

    UNSAFE_componentWillMount() {
      if (!this.state.Component) {
        getComponent().then(({ default: Component }: { default: any }) => {
          AsyncComponent.Component = Component;
          this.setState({ Component });
        });
      }
    }

    render() {
      const { Component }: { Component: any } = this.state;

      if (Component) {
        return <Component {...this.props} />;
      }

      return null;
    }
  };
};

export default AsyncComponent;
