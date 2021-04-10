import React, { Component } from "react";
import Table from "./table";

// Objetivo
// 1.

// Tipos:
//   label
//   input
//   button
//   table

// CSS:
//  alguma forma de configurar o grid template

// Nova APP
//  id
//  name
//  label
//  logo
//  url
//

class AppUI extends Component {
  state = {
    ui: null,
    webSocket: null,
  };

  components = [
    {
      type: "table",
      render: ({ name, data, props }) => (
        <Table
          customEvent={this.customEvent}
          name={name}
          data={data}
          {...props}
        />
      ),
    },
  ];

  renderComponent(component) {
    console.log(component);
    const ui = this.components
      .find(({ type }) => type === component.type)
      ?.render(component);
    return (
      <div key={component.name} style={{ gridArea: component.name }}>
        {" "}
        {ui}
      </div>
    );
  }

  appConnection() {
    this.setState({ ui: null });

    const { url } = this.props.app;
    const webSocket = new Promise((resolve) => {
      const webSocket = new WebSocket(url);

      webSocket.onopen = function (event) {
        resolve(webSocket);
      };

      webSocket.onclose = (event) => {
        setTimeout(() => {
          this.appConnection();
        }, 1000);
      };

      webSocket.onmessage = ({ data: message }) => {
        const { event, data } = JSON.parse(message);
        console.log(event);
        switch (event) {
          case "handleUiLoad":
            this.handleUiLoad(data);
            break;
          case "handleReload":
            this.handleReload(data);
            break;
        }
      };
    });
    this.setState({ webSocket });
  }

  handleUiLoad(ui) {
    this.setState({ ui });
  }

  handleReload(components) {
    const { ui: oldUi } = this.state;
    const ui = {
      ...oldUi,
      components: oldUi.components.map(({ name, ...rest }) => {
        const { data: items } = components.find((d) => d.name === name) || {};
        if (items) rest.data = items;
        return { name, ...rest };
      }),
    };
    console.log(components, ui);
    this.setState({ ui });
  }

  customEvent = async (data) => {
    const ws = await this.state.webSocket;
    ws.send(JSON.stringify({ event: "custom", data }));
  };

  componentDidUpdate(oldProps) {
    const { app } = this.props;

    if (app !== oldProps.app) {
      this.appConnection();
    }
  }

  componentDidMount() {
    this.appConnection();
  }

  render() {
    const { ui } = this.state;

    if (!ui) return <div>Carregando interface...</div>;

    const { components, grid } = ui;

    return (
      <div
        className="uiPanel"
        style={
          grid
            ? {
                display: "grid",
                gridGap: "5px",
                gridTemplateAreas: `'${grid?.layout.join("' '")}'`,
              }
            : { display: "flex", flexWrap: "wrap" }
        }
      >
        {ui && components?.map((component) => this.renderComponent(component))}
      </div>
    );
  }
}

export default AppUI;
