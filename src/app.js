import React from 'react';
import ReactDOM from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import Toggle from 'material-ui/Toggle';

import {Topbar,TitleAdd,Flag} from './components';

class ItemList extends React.Component {
    constructor(props) {
        super(props)

        this.onClick=this.onClick.bind(this);
    }

    onClick() {
        this.props.onClick(this.props.item)
    }

    render() {
        const item=this.props.item;
        const marca=item.marca;
        const ano=item.ano || '(N/D)'; // muitos registros não tem a propriedade "ano"
        const veiculo=item.veiculo;
        const vendido=item.vendido ? ' itemSold' : '';
        return (
            <div className="itemList" onClick={this.onClick}>
                <p className="itemTitle">{marca}</p>
                <p className="itemDescr">{veiculo}</p>
                <p className="itemYear">{ano}</p>
                <Flag vendido={vendido} />
            </div>
        )
    }
} // ItemList


class ContentDescr extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const item=this.props.item;
        var render;
        if(item) {
            const marca=item.marca;
            const ano=item.ano || '(N/D)'; // muitos registros não tem a propriedade "ano"
            const veiculo=item.veiculo;
            const vendido=item.vendido;
            var descricao=item.descricao;
            if( ! descricao) {
                descricao=`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;
            }
            descricao=descricao.replace('\n','<br>');
            render=(
                <div className="itemDescrMain">
                    <div className="main">
                        <h2>{veiculo}</h2>
                        <table>
                            <thead>
                                <tr><th>Marca</th><th>Ano</th></tr>
                            </thead>
                            <tbody>
                                <tr><td>{marca}</td><td>{ano}</td></tr>
                            </tbody>
                        </table>
                        <p>{descricao}</p>
                    </div>
                    <hr className="" />
                    <div className="footer">
                        <FlatButton backgroundColor="#45535a" hoverColor="#45535a" className="createButton" label="Editar" labelPosition="after" icon={<i className="material-icons">create</i>} />
                        <Flag vendido={vendido} />
                    </div>
                </div>
            )
        } else {
            render=<h3 className="msg">Clique em um item da lista para visualizar sua descrição.</h3>
        }

        return (
            <div className="contents contentDescr">
                <h2>Detalhes</h2>
                {render}
            </div>
        )
    } // render
} // ContentDescr


class ContentList extends React.Component {
    constructor(props) {
        super(props)

        this.items=[{"_id":"5991c31cc54c131fd9b9ee1b","veiculo":"ONIX HATCH LT 1.0 8V FlexPower 5p Mec.","marca":"GM - Chevrolet","cod_fipe":"004424-5","vendido":false},{"_id":"5991c31cc54c131fd9b9ee1d","veiculo":"ONIX HATCH LT 1.4 8V FlexPower 5p Mec.","marca":"GM - Chevrolet","cod_fipe":"004425-3","vendido":false},{"_id":"5991c31cc54c131fd9b9ee19","veiculo":"ONIX HATCH Joy 1.0 8V Flex 5p Mec.","marca":"GM - Chevrolet","cod_fipe":"004473-3","vendido":false},{"_id":"5991c31cc54c131fd9b9ee16","veiculo":"ONIX HATCH ACTIV 1.4 8V Flex 5P Aut.","marca":"GM - Chevrolet","cod_fipe":"004471-7","vendido":false},{"_id":"5991c31cc54c131fd9b9ee15","veiculo":"ONIX  Lollapalooza 1.0 F.Power 5p Mec. ","marca":"GM - Chevrolet","cod_fipe":"004451-2","vendido":false},{"_id":"5991c31cc54c131fd9b9ee17","veiculo":"ONIX HATCH ACTIV 1.4 8V Flex 5p Mec.","marca":"GM - Chevrolet","cod_fipe":"004472-5","vendido":false},{"_id":"5991c31cc54c131fd9b9ee1f","veiculo":"ONIX HATCH LTZ 1.4 8V FlexPower 5p Mec.","marca":"GM - Chevrolet","cod_fipe":"004426-1","vendido":false},{"_id":"5991c31cc54c131fd9b9ee1e","veiculo":"ONIX HATCH LTZ 1.4 8V FlexPower 5p Aut. ","marca":"GM - Chevrolet","cod_fipe":"004439-3","vendido":false},{"_id":"5991c31cc54c131fd9b9ee18","veiculo":"ONIX HATCH EFFECT 1.4 8V F.Power 5p Mec.","marca":"GM - Chevrolet","cod_fipe":"004460-1","vendido":false},{"_id":"5991c31cc54c131fd9b9ee1c","veiculo":"ONIX HATCH LT 1.4 8V FlexPower 5p Aut.","marca":"GM - Chevrolet","cod_fipe":"004438-5","vendido":false},{"_id":"5991c31cc54c131fd9b9ee1a","veiculo":"ONIX HATCH LS 1.0 8V FlexPower 5p Mec.","marca":"GM - Chevrolet","cod_fipe":"004423-7","vendido":false},{"_id":"5991c31cc54c131fd9b9ee20","veiculo":"ONIX HATCH SELEÇÃO 1.0 8V Flex 5p Mec.","marca":"GM - Chevrolet","cod_fipe":"004461-0","vendido":false}]

        this.items=this.items.splice(0,5);
    } // constructor

    render() {
        const items=this.items.map((elem)=>{
            return <ItemList key={elem._id} item={elem} onClick={this.props.onClick} />
        });
        return (
            <div className="contents">
                <h2>Lista de veículos</h2>
                {items}
            </div>
        )
    }
}

class Form1 extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            open:true, // ARRUMAR AQUI!!
            veiculo:this.props.elem.veiculo,
            ano:this.props.elem.ano,
            marca:this.props.elem.marca,
            descricao:this.props.elem.descricao,
            vendido:this.props.elem.vendido
        }

        this.close=this.close.bind(this);
    }

    close() {
        this.setState({open:false})
    }

    onChange(evt) {
        const name=evt.target.name;
        const value=evt.target.value;

        if(name === 'vendido') {
            const checked=evt.target.checked;
            this.setState({vendido:checked});
        }
    }



    render() {
        const title=this.props.title || 'Novo Veículo';
        const style={
            color:'#818181'
        }
        const thumbSwitchedStyle={
            backgroundColor:'#487b9e'
        }

        const confs={
            floatingLabelFocusStyle:{
                color:'#487b9e',
                fontSize:'18px'
            },
            floatingLabelStyle:{
                color:'#818181'
            },
            inputStyle:{
                color:'#505050'
            },
            fullWidth:true,
            underlineFocusStyle:{
                borderBottomColor:'#487b9e'
            },
            underlineStyle:{
                borderBottomColor:'#818181'
            }
        }






        var actions=[
            <FlatButton backgroundColor="#45535a" hoverColor="#45535a" className="createButton" label="Add" />,
            <FlatButton backgroundColor="#45535a" hoverColor="#45535a" className="createButton" label="Fechar" onClick={this.close} />
        ]

        return (
            <Dialog modal={true} title={title} open={this.state.open} actions={actions} contentClassName="form-add-edit" actionsContainerClassName="form-add-edit-actions" overlayClassName="form-add-edit-overlay" titleClassName="form-add-edit-title" bodyClassName="form-add-edit-body">
                <h2>Dialog here!</h2>
                <div className="half-div">
                    <TextField {...confs} floatingLabelText="Veículo" name="veiculo" />
                    <TextField {...confs} floatingLabelText="Ano" name="ano" />


                </div>
                <div className="half-div right">
                    <TextField {...confs} floatingLabelText="Marca" name="marca" />
                    <Toggle labelPosition="right" label="Vendido" labelStyle={style} thumbSwitchedStyle={thumbSwitchedStyle} name="vendido" />

                </div>
                    <TextField {...confs} multiLine={true} rows={5} floatingLabelText="Descrição" name="descricao" />
            </Dialog>
        )
    }
}

class Content extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            item:''
        }

        this.setItem=this.setItem.bind(this);
    }

    setItem(item) {
        this.setState({item:item});
    }

    render() {
        return (
            <main>
                <TitleAdd />
                <ContentList onClick={this.setItem} />
                <ContentDescr item={this.state.item} />
                <Form1 />
            </main>
        )
    }
}

class App extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <Topbar />
                    <Content />
                </div>
            </MuiThemeProvider>
        )
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('screen')
)