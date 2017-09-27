import React from 'react';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';

class Topbar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const leftIcon=<i className="material-icons left">directions_car</i>
        const textStyle={color:'#a0a0a0',fontSize:'24px'}
        return (
            <div className="top-bar">
                <div>
                    <AppBar title="FRONT-END" iconElementLeft={leftIcon} className="top-bar-AppBar" />
                </div>
                <div>
                    <div style={{width:'85%'}}>
                        <TextField hintText="Buscar veículo" fullWidth={true} className="search-field" underlineShow={false} inputStyle={textStyle} hintStyle={textStyle} />
                    </div>
                </div>
            </div>
        )

    }
}

class TitleAdd extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="title-add">
                <h2>Veículo</h2>
                <i className="material-icons add-vehicle">add_circle</i>
            </div>
        )
    }
}

module.exports={Topbar,TitleAdd}