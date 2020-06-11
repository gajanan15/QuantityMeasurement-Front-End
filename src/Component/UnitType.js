import React,{ Component } from "react";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

class UnitType extends Component {
    constructor(props){
        super(props);
        this.state= {
            unitName:"",
            subUnitName:""
        }
    }

    handleChange = (event) => {
      console.log("Props is ====>",this.props)
      console.log("label name         ",this.props.name)
      this.setState({unitName: event.target.value});
      this.props.getSubUnit(event.target.value,this.props.name);
      }

  render() {
  return (
    <FormControl className="main">
        <InputLabel htmlFor="outline-units-native-simple" >{this.props.name}</InputLabel>
        <Select style={{width:this.props.width}}
          native
          value={this.state.unitName}
          onChange={this.handleChange}
          inputProps={{
            name: 'quantity',
            id: 'units',
          }}
        >
          <option aria-label="None" value="" />
          {this.props.mainUnits.map((data) =>(
                <option key={data} selected>{data}</option>
            ))}
        </Select> 
      </FormControl>
   );
}
}

export default UnitType;