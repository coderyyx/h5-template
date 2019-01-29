import React, { Component } from 'react';

let defaultLoadingComponent = () => null;

function asyncComponent(config) {
  const { resolve } = config;

  return class DynamicComponent extends Component {
    constructor(...args) {
      super(...args);
      this.LoadingComponent =
        config.LoadingComponent || defaultLoadingComponent;
      this.state = {
        AsyncComponent: null,
      };
      this.load();
    }

    componentDidMount() {
      this.mounted = true;
    }

    componentWillUnmount() {
      this.mounted = false;
    }

    load() {
      resolve().then((m) => {
        const AsyncComponent = m.default || m;
        // 未渲染直接更新
        if (this.mounted) {
          this.setState({ AsyncComponent });
        } else {
          this.state.AsyncComponent = AsyncComponent; // eslint-disable-line
        }
      });
    }

    render() {
      const { AsyncComponent } = this.state;
      const { LoadingComponent } = this;
      if (AsyncComponent) {
        return <AsyncComponent {...this.props} />
      }
      return <LoadingComponent {...this.props}/>
    }
  };
}

export default function dynamic(config) {
  const { component } = config;
  return asyncComponent({
    resolve: config.resolve || function () {
      const _component = component();
      return new Promise((resolve) => {
        Promise.all([_component]).then((ret) => {
          return resolve(ret[0])
        });
      });
    },
    ...config,
  });
}

dynamic.setDefaultLoadingComponent = (LoadingComponent) => {
  defaultLoadingComponent = LoadingComponent;
};