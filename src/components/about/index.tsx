import { Form, Radio } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";
import React, { useCallback } from "react";
import { layoutMods, ThemeList } from "src/hooks/useGlobalState";
import { GlobalState } from "../globalState";

interface AboutProps {}

const About: React.FC<AboutProps> = () => {
  const [globalState, dispatch] = GlobalState.useContainer();

  const onChangeLayout = useCallback(
    ({ target: { value } }: RadioChangeEvent) => {
      dispatch({ type: "update_layout", value });
    },
    [dispatch]
  );

  /** 更新主题 */
  const onChangeTheme = useCallback(
    ({ target: { value } }: RadioChangeEvent) => {
      dispatch({ type: "update_theme", value });
    },
    [dispatch]
  );
  return (
    <div>
      <h3>版本 {process.env.REACT_APP_VERSION}</h3>
      <p>
        技术交流地址：
        <a target="_blank" rel="noreferrer" href="https://www.thisjs.com/">
          https://www.thisjs.com/
        </a>
      </p>
      <Form.Item label="页面布局">
        <Radio.Group
          value={globalState.layoutMod}
          buttonStyle="solid"
          onChange={onChangeLayout}
        >
          {layoutMods.map((item) => (
            <Radio.Button key={item} value={item}>
              {item}
            </Radio.Button>
          ))}
        </Radio.Group>
      </Form.Item>
      <Form.Item label="主题配色">
        <Radio.Group
          value={globalState.theme}
          buttonStyle="solid"
          onChange={onChangeTheme}
        >
          {ThemeList.map((item) => (
            <Radio.Button key={item} value={item}>
              {item}
            </Radio.Button>
          ))}
        </Radio.Group>
      </Form.Item>
    </div>
  );
};

export default About;
