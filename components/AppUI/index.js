import React, { Component } from 'react';
import Table from './table';


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

const components = [
    { type: "table", render: ({ data, props }) => <Table data={data} {...props} /> }
]

function renderComponent(component) {
    const ui = components.find(({ type }) => type === component.type)?.render(component)
    console.log(component.name)
    return <div key={component.name} style={{ gridArea: component.name }}> {ui}</ div>
}


class AppUI extends Component {
    state = {
        ui: null,
        webSocket: null
    }


    appConnection() {
        this.setState({ ui: null })

        const { url } = this.props.app;
        const webSocket = new Promise((resolve) => {
            const webSocket = new WebSocket(url);

            webSocket.onopen = function (event) {
                resolve(webSocket);
            };


            webSocket.onclose = (event) => {
                setTimeout(() => {
                    this.appConnection()
                }, 1000)

            };

            webSocket.onmessage = ({ data: message }) => {
                const { event, data: ui } = JSON.parse(message)
                switch (event) {
                    case "uiload":
                        this.setState({ ui })
                        break;
                }
            };
        })
        this.setState({ webSocket })
    }

    async sendMessage() {
        const { app } = this.props;
        const ws = await this.state.webSocket;
        ws.send(app.id);
    }

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

        if (!ui) return <div>Carregando interface...</div>

        const { components, grid } = ui;

        console.log(`'${grid?.layout.join("','")}'`)

        return <div className="uiPanel" style={grid ?
            {
                display: "grid",
                gridTemplateAreas: `'${grid?.layout.join("' '")}'`

            } : { display: "flex", flexWrap: "wrap" }}>
            {ui && components?.map(((component) => renderComponent(component)))}
        </div>;
    }
}

export default AppUI;