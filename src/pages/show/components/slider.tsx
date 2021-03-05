import { Slider, Switch } from "antd";
import React from "react";

class SliderShow extends React.Component {
  state = {
    disabled: false,
  };

  handleDisabledChange = (disabled: boolean) => {
    this.setState({ disabled });
  };

  render() {
    const { disabled } = this.state;
    return (
      <div>
        <h2>Slider</h2>
        <Slider defaultValue={30} disabled={disabled} />
        <Slider range defaultValue={[20, 50]} disabled={disabled} />
        Disabled:{" "}
        <Switch
          size="small"
          checked={disabled}
          onChange={this.handleDisabledChange}
        />
      </div>
    );
  }
}

export default SliderShow;