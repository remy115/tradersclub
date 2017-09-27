import React from 'react';
import ReactDOM from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';

import {Topbar,TitleAdd} from './components'

class ItemList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const item=this.props.item;
        const marca=item.marca;
        const ano=item.ano || '(N/D)'; // muitos registros não tem a propriedade "ano"
        const descricao=item.veiculo;
        const vendido=item.vendido ? ' itemSold' : '';
        return (
            <div className="itemList">
                <p className="itemTitle">{marca}</p>
                <p className="itemDescr">{descricao}</p>
                <p className="itemYear">{ano}</p>
                <span className="itemFlag"><i className={"material-icons"+vendido}>local_offer</i></span>
            </div>
        )
    }
} // ItemList

class ContentList extends React.Component {
    constructor(props) {
        super(props)

        this.items=[{"_id":"5991c31cc54c131fd9b9ee1b","veiculo":"ONIX HATCH LT 1.0 8V FlexPower 5p Mec.","marca":"GM - Chevrolet","cod_fipe":"004424-5","vendido":false},{"_id":"5991c31cc54c131fd9b9ee1d","veiculo":"ONIX HATCH LT 1.4 8V FlexPower 5p Mec.","marca":"GM - Chevrolet","cod_fipe":"004425-3","vendido":false},{"_id":"5991c31cc54c131fd9b9ee19","veiculo":"ONIX HATCH Joy 1.0 8V Flex 5p Mec.","marca":"GM - Chevrolet","cod_fipe":"004473-3","vendido":false},{"_id":"5991c31cc54c131fd9b9ee16","veiculo":"ONIX HATCH ACTIV 1.4 8V Flex 5P Aut.","marca":"GM - Chevrolet","cod_fipe":"004471-7","vendido":false},{"_id":"5991c31cc54c131fd9b9ee15","veiculo":"ONIX  Lollapalooza 1.0 F.Power 5p Mec. ","marca":"GM - Chevrolet","cod_fipe":"004451-2","vendido":false},{"_id":"5991c31cc54c131fd9b9ee17","veiculo":"ONIX HATCH ACTIV 1.4 8V Flex 5p Mec.","marca":"GM - Chevrolet","cod_fipe":"004472-5","vendido":false},{"_id":"5991c31cc54c131fd9b9ee1f","veiculo":"ONIX HATCH LTZ 1.4 8V FlexPower 5p Mec.","marca":"GM - Chevrolet","cod_fipe":"004426-1","vendido":false},{"_id":"5991c31cc54c131fd9b9ee1e","veiculo":"ONIX HATCH LTZ 1.4 8V FlexPower 5p Aut. ","marca":"GM - Chevrolet","cod_fipe":"004439-3","vendido":false},{"_id":"5991c31cc54c131fd9b9ee18","veiculo":"ONIX HATCH EFFECT 1.4 8V F.Power 5p Mec.","marca":"GM - Chevrolet","cod_fipe":"004460-1","vendido":false},{"_id":"5991c31cc54c131fd9b9ee1c","veiculo":"ONIX HATCH LT 1.4 8V FlexPower 5p Aut.","marca":"GM - Chevrolet","cod_fipe":"004438-5","vendido":false},{"_id":"5991c31cc54c131fd9b9ee1a","veiculo":"ONIX HATCH LS 1.0 8V FlexPower 5p Mec.","marca":"GM - Chevrolet","cod_fipe":"004423-7","vendido":false},{"_id":"5991c31cc54c131fd9b9ee20","veiculo":"ONIX HATCH SELEÇÃO 1.0 8V Flex 5p Mec.","marca":"GM - Chevrolet","cod_fipe":"004461-0","vendido":false}]

        this.items=this.items.splice(0,5);
    } // constructor

    render() {
        const items=this.items.map((elem)=>{
            return <ItemList key={elem._id} item={elem} />
        });
        return (
            <div className="contents">
                <h2>Lista de veículos</h2>
                {items}
            </div>
        )
    }
}

class Content extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <main>
                <TitleAdd />
                <ContentList />
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