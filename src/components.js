import React from 'react';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Toggle from 'material-ui/Toggle';
import $ from 'jquery';




class Flag extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const vendido=this.props.vendido && this.props.vendido !== "false" ? ' itemSold' : '';
        const class1=this.props.class || ' flag';
        return (
            <span className="itemFlag flag1"><i className={"material-icons"+class1+vendido}>local_offer</i></span>
        )
    }
}

class Topbar extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            search:''
        }

        this.onChange=this.onChange.bind(this);
        this.search=this.search.bind(this);
    }

    onChange(evt) {
        const name=evt.target.name;
        const value=evt.target.value;
        this.setState({
            [name]:value
        });
    }

    search(evt) {
        evt.preventDefault();
        const value=this.state.search;
        console.log('search',value);
        this.props.search({value});
    }

    render() {
        const leftIcon=<i className="material-icons left" >directions_car</i>
        const textStyle={color:'#a0a0a0',fontSize:'24px'}
        return (
            <div className="top-bar">
                <div>
                    <AppBar title="FRONT-END" iconElementLeft={leftIcon} className="top-bar-AppBar" />
                </div>
                <div>
                    <div style={{width:'85%'}}>
                        <form action="" onSubmit={this.search}>
                            <TextField hintText="Buscar veículo" fullWidth={true} name="search" className="search-field" underlineShow={false} inputStyle={textStyle} hintStyle={textStyle} value={this.state.search} onChange={this.onChange} />
                        </form>
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
                <i className="material-icons add-vehicle" onClick={this.props.openForm}>add_circle</i>
            </div>
        )
    }
}


class Form1 extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            open:this.props.open,
            veiculo:this.props.elem.veiculo,
            ano:this.props.elem.ano,
            marca:this.props.elem.marca,
            descricao:this.props.elem.descricao,
            vendido:this.props.elem.vendido
        }

        this.save=this.save.bind(this);
        this.onChange=this.onChange.bind(this);

        // console.log('Form1 - open',this.state.open,this.props.open);
    }

    componentWillReceiveProps(nextProps) {
        // console.log('Form1 new props',nextProps);
        /* if(nextProps.open === true) {
            this.setState({open:true});
        } */
        this.setState({
            veiculo:nextProps.elem.veiculo,
            ano:nextProps.elem.ano,
            marca:nextProps.elem.marca,
            descricao:nextProps.elem.descricao,
            vendido:nextProps.elem.vendido && nextProps.elem.vendido !== "false" ? true : false
        });
    }


    onChange(evt,val) {
        const name=evt.target.name;
        // const value=evt.target.value;
        const value=val;

        if(name === 'vendido') {
            this.setState({vendido:value});
        } else {
            this.setState({
                [name]:value
            })
        }
    }

    save() {
        // console.log(this.state);
        var data={
            id:this.props.elem._id,
            veiculo:this.state.veiculo,
            marca:this.state.marca,
            ano:this.state.ano,
            descricao:this.state.descricao,
            vendido:this.state.vendido,
        }
        var method='POST';
        if(data.id) {
            method='PUT';
        }
        $.ajax('http://localhost:3010/veiculos',{
            method,
            data
        }).then((ret)=>{
            console.log(`${method} return`,ret);
            this.props.getList();
        },(err)=>{
            console.log('save - err',err);
            if(err.status === 200) {
                this.props.close();
                this.props.getList();
            }
        });
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
            <FlatButton backgroundColor="#45535a" hoverColor="#45535a" className="createButton" label="Add" onClick={this.save} />,
            <FlatButton backgroundColor="#45535a" hoverColor="#45535a" className="createButton" label="Fechar" onClick={this.props.close} />
        ]

        return (
            <Dialog modal={true} title={title} open={this.props.open} actions={actions} contentClassName="form-add-edit" actionsContainerClassName="form-add-edit-actions" overlayClassName="form-add-edit-overlay" titleClassName="form-add-edit-title" bodyClassName="form-add-edit-body">
                <div className="half-div">
                    <TextField {...confs} floatingLabelText="Veículo" name="veiculo" value={this.state.veiculo} onChange={this.onChange} />
                    <TextField {...confs} floatingLabelText="Ano" name="ano" onChange={this.onChange} />


                </div>
                <div className="half-div right">
                    <TextField {...confs} floatingLabelText="Marca" name="marca" value={this.state.marca} onChange={this.onChange} />
                    <Toggle labelPosition="right" label="Vendido" labelStyle={style} thumbSwitchedStyle={thumbSwitchedStyle} name="vendido" onToggle={this.onChange} toggled={this.state.vendido} />

                </div>
                    <TextField {...confs} multiLine={true} rows={5} floatingLabelText="Descrição" name="descricao" value={this.state.descricao} onChange={this.onChange} />
            </Dialog>
        )
    }
}

Form1.defaultProps={
    open:false,
    elem:{
        id:'',
        veiculo:'',
        ano:'',
        marca:'',
        descricao:'',
        vendido:false
    }
}


module.exports={Topbar,TitleAdd, Flag, Form1}