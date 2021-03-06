/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import PropTypes from "prop-types";
// import { Input } from "antd";
import { onItemClick, OPTION, CUSTOM } from "./utils";
import Container from "./Container";

export default class GeneralItem extends Component {
  static propTypes = {
    onCollapsed: PropTypes.func,
    onRef: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.onItemClick = onItemClick.bind(this);

    this.state = {
      // mode: OPTION,
      ...("value" in props ? props.value : { selectedKeys: [], extra: "" })
    };
  }

  // state = {
  //   selectedKeys: [],
  //   mode: OPTION
  // };

  componentWillReceiveProps(nextProps) {
    // const {
    //   data: { options }
    // } = nextProps;

    if ("value" in nextProps) {
      // const { value = {} } = nextProps;
      // const hintOptions = options.some(m =>
      //   (value.selectedKeys || []).includes(m.value)
      // );
      this.setState({
        ...nextProps.value,
        // mode: hintOptions ? OPTION : CUSTOM
      });
    }
  }

  _onKeywordChange = ({ target }) => {
    // console.log(target.value);

    this.setState({
      ...("value" in this.props ? {} : { extra: target.value.trim() })
    });
    this.triggerChange({ extra: target.value.trim() });
  };

  triggerChange = changedValue => {
    const { onChange } = this.props;
    const { selectedKeys, extra } = this.state;

    onChange && onChange({ selectedKeys, extra, ...changedValue });
  };

  render() {
    const { collapsed, viewMoreVisible, onRef, onCollapsed, data } = this.props;
    const { label, options, multiple } = data || {};
    const { selectedKeys = [] } = this.state || {};

    if (!data) return null;

    return (
      <Container
        {...{
          label,
          options,
          multiple,
          collapsed,
          selectedKeys,
          viewMoreVisible,
          onRef,
          onCollapsed,
          onItemClick: this.onItemClick
        }}
      />
    );
  }
}
