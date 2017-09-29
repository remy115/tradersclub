import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import Toggle from 'material-ui/Toggle';

import {Topbar,TitleAdd,Flag,Form1} from './components';

function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

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
        const selected=this.props.selected ? ' itemListSelected' : '';

        const marca=item.marca;
        const ano=item.ano || '(N/D)'; // muitos registros não tem a propriedade "ano"
        const veiculo=item.veiculo;
        const vendido=item.vendido;
        return (
            <div className={"itemList"+selected} onClick={this.onClick}>
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

        this.openForm=this.openForm.bind(this);
    }

    openForm() {
        this.props.openForm(this.props.item);
    }

    render() {
        const item=this.props.item;
        var render;
        if(item) {
            const id=item._id;
            const marca=item.marca;
            const ano=item.ano || '(N/D)'; // muitos registros não tem a propriedade "ano"
            const veiculo=item.veiculo;
            const vendido=item.vendido;
            var descricao=item.descricao;
            if( ! descricao) {
                descricao=`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;
            }
            descricao=htmlEntities(descricao);
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
                        <p dangerouslySetInnerHTML={{__html:descricao}}></p>
                    </div>
                    <hr className="" />
                    <div className="footer">
                        <FlatButton backgroundColor="#45535a" hoverColor="#45535a" className="createButton" label="Editar" labelPosition="after" icon={<i className="material-icons">create</i>} onClick={this.openForm} />
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

    } // constructor

    /* componentWillReceiveProps(newProps) {
        console.log('newProps',newProps);
        if(newProps.selected !== this.props.selected) {
            this.forceUpdate();
        }
    } */

    render() {
        const selected=this.props.selected;
        const items=this.props.items.map((elem)=>{
            return <ItemList key={elem._id} item={elem} selected={selected === elem._id} onClick={this.props.onClick} />
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
        this.state={
            item:'',
            selected:''
        }

        this.setItem=this.setItem.bind(this);
        this.item='';
        this.selected='';
    }


    componentWillReceiveProps(newProps) {
        newProps.items.forEach((elem)=>{
            if(elem._id === this.selected) {
                this.item=elem;
            }
        }); 
    }

    setItem(item) {
        this.selected=item._id;
        // this.setState({item:item, selected: item._id});
        // this.setState({selected: item._id});
        this.props.items.forEach((elem)=>{
            if(elem._id === this.selected) {
                this.item=elem;
            }
        });
        this.forceUpdate();
    }

    render() {
        return (
            <main>
                <TitleAdd openForm={this.props.openForm} />
                <ContentList onClick={this.setItem} items={this.props.items} selected={this.selected} />
                <ContentDescr item={this.item} openForm={this.props.openForm} />
            </main>
        )
    }
}

class App extends React.Component {
    constructor(props) {
        super(props)

        // this.items=[{"_id":"5991c31cc54c131fd9b9ee1b","veiculo":"ONIX HATCH LT 1.0 8V FlexPower 5p Mec.","marca":"GM - Chevrolet","cod_fipe":"004424-5","vendido":false},{"_id":"5991c31cc54c131fd9b9ee1d","veiculo":"ONIX HATCH LT 1.4 8V FlexPower 5p Mec.","marca":"GM - Chevrolet","cod_fipe":"004425-3","vendido":true},{"_id":"5991c31cc54c131fd9b9ee19","veiculo":"ONIX HATCH Joy 1.0 8V Flex 5p Mec.","marca":"GM - Chevrolet","cod_fipe":"004473-3","vendido":false},{"_id":"5991c31cc54c131fd9b9ee16","veiculo":"ONIX HATCH ACTIV 1.4 8V Flex 5P Aut.","marca":"GM - Chevrolet","cod_fipe":"004471-7","vendido":true},{"_id":"5991c31cc54c131fd9b9ee15","veiculo":"ONIX  Lollapalooza 1.0 F.Power 5p Mec. ","marca":"GM - Chevrolet","cod_fipe":"004451-2","vendido":false},{"_id":"5991c31cc54c131fd9b9ee17","veiculo":"ONIX HATCH ACTIV 1.4 8V Flex 5p Mec.","marca":"GM - Chevrolet","cod_fipe":"004472-5","vendido":false},{"_id":"5991c31cc54c131fd9b9ee1f","veiculo":"ONIX HATCH LTZ 1.4 8V FlexPower 5p Mec.","marca":"GM - Chevrolet","cod_fipe":"004426-1","vendido":false},{"_id":"5991c31cc54c131fd9b9ee1e","veiculo":"ONIX HATCH LTZ 1.4 8V FlexPower 5p Aut. ","marca":"GM - Chevrolet","cod_fipe":"004439-3","vendido":false},{"_id":"5991c31cc54c131fd9b9ee18","veiculo":"ONIX HATCH EFFECT 1.4 8V F.Power 5p Mec.","marca":"GM - Chevrolet","cod_fipe":"004460-1","vendido":false},{"_id":"5991c31cc54c131fd9b9ee1c","veiculo":"ONIX HATCH LT 1.4 8V FlexPower 5p Aut.","marca":"GM - Chevrolet","cod_fipe":"004438-5","vendido":false},{"_id":"5991c31cc54c131fd9b9ee1a","veiculo":"ONIX HATCH LS 1.0 8V FlexPower 5p Mec.","marca":"GM - Chevrolet","cod_fipe":"004423-7","vendido":false},{"_id":"5991c31cc54c131fd9b9ee20","veiculo":"ONIX HATCH SELEÇÃO 1.0 8V Flex 5p Mec.","marca":"GM - Chevrolet","cod_fipe":"004461-0","vendido":false}]

        this.state={
            items:[],
            f1Open:false,
            covered:false
        }
        this.f1Elem={
            id:'',
            veiculo:'',
            ano:'',
            marca:'',
            descricao:'',
            vendido:false
        };
        this.openForm=this.openForm.bind(this);
        this.getList=this.getList.bind(this);
        this.closeF1=this.closeF1.bind(this);

        this.lastSearch={};
    }

    // fecha o Form1
    closeF1() {
        this.setState({f1Open:false});
    }

    componentDidMount() {
        // carregar lista
        this.getList();
    }

    getList(params) {
        if(params && params.clearSearch) {
            this.lastSearch={};
        }
        if(!params) params=this.lastSearch;

        var filter='';
        // parece que a busca será sempre pelo campo "veiculo", isso não está claro na documentação;
        params.field='veiculo';
        if(params.field && params.value) {
            this.lastSearch=params;
            filter='?filters='+params.field+'@'+params.value;
        }

        if(params.id) {
            filter='/'+params.id;
        }
        const baseUrl='/veiculos'+filter;

        this.setState({covered:true});
        return $.ajax(baseUrl,{
            method:'GET'
        }).then((ret)=>{
            // aqui filtramos p/ apenas 5; na documentação não há informações sobre paginação e o retorno é enorme;
            // console.log('ret list',Array.isArray(ret));
            ret=ret.slice(-5);
            this.setState({covered:false});
            this.setState({items:ret});
        });

    }

    openForm(elem) {
        this.f1Elem=Object.assign(this.f1Elem,elem);
        this.setState({f1Open:true});
    }

    render() {
        const covered=this.state.covered ? '' : ' hidden';
        return (
            <MuiThemeProvider>
                <div id="appRoot">
                    <div className={'cover1'+covered}><img src="/imgs/loading.gif" alt="loading" /></div>
                    <Topbar search={this.getList} />
                    <Content openForm={this.openForm} items={this.state.items} />
                    <Form1 open={this.state.f1Open} elem={this.f1Elem} getList={this.getList} close={this.closeF1} />
                </div>
            </MuiThemeProvider>
        )
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('screen')
)