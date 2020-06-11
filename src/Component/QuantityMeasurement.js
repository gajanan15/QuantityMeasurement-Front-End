import React, { Component } from 'react'
import { Card } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import UnitType from './UnitType'
import TextField from '@material-ui/core/TextField';
import Axios from 'axios';

export class quantityMeasurement extends Component {
    constructor(props){
        super(props);
        this.state={
            mainUnits:[],
            subUnits:[],
            unit:"",
            value1:"",
            value2:"",
            setFirstSubUnit:"",
            setSecondSubUnit:""
        }
    }
    getUnit = ()=>{
      //  debugger
      Axios.get("http://localhost:8080/unit/type").then((response)=>{
        console.log("main unit    ",response);
        // this.state.mainUnits = response.data;
        this.setState({
          mainUnits:response.data,
        })
        console.log("abcd    ",this.state.mainUnits)
      }).catch((error)=>{
        console.log(error)
      })
    } 
  
    getSubUnit =(unitsType,name)=> {
          // debugger
        console.log("child comp ",unitsType)
      if(name== "Main Unit"){
        Axios.get(`http://localhost:8080/unit/type/${unitsType}`).then((response)=>{
          console.log("response", response.data)
          console.log("sub unit      ",response.data.data);
          this.setState({
            subUnits:response.data,
            unit:unitsType
          })
          console.log("abcd    ",this.state.subUnits)
          
        }).catch((error)=>{
          console.log("error ",error)
        })
      }
      if(name == "Sub Unit"){
        this.setState({
          setFirstSubUnit:unitsType
        })
      }
      if(name== "Sub Unit1"){
        this.setState({
          setSecondSubUnit:unitsType
        })
      }
    }
    
  
    getResultForFirstTextBox=(event)=>{
        // console.log("result    ",event)
      this.setState({value1: event.target.value});
      const myData={
      units:this.state.unit,
      initialUnit:this.state.setFirstSubUnit,
      outputUnit:this.state.setSecondSubUnit,
      initialValue:event.target.value
    }
      console.log(  "data       ",myData)
      Axios.post(`http://localhost:8080/unit/convert`,myData).then((response)=>{
        console.log("result    ",response.data.data);
        this.setState({
          value2:response.data.data
        })
      })
    }
  
    getResultForSecondTextBox=(event)=>{
      this.setState({value2: event.target.value});
      const myData={
      units:this.state.unit,
      initialUnit:this.state.setSecondSubUnit,
      outputUnit:this.state.setFirstSubUnit,
      initialValue:event.target.value
    }
    console.log("data       ",myData)
    Axios.post(`http://localhost:8080/unit/convert`,myData).then((response)=>{
      console.log("result    ",response.data.data);
      this.setState({
          value1:response.data.data
        })
      })
    }
  
    componentDidMount(){
      //  debugger
      this.getUnit();
    }
  
    render() {
    console.log("after render ", this.state)
    return (
      <div className="App">
        <header className="App-header">
        <h1>Quantity Measurement</h1>  
          <Card className="card">
            <CardContent>
              <UnitType name="Main Unit" width="500px" getSubUnit = {this.getSubUnit} mainUnits={this.state.mainUnits}/>
              <div className="field">
              <TextField id="outlined-basic"  label="Value" value={this.state.value1} onChange={this.getResultForFirstTextBox} variant="outlined" />
                <div>=</div>
                <TextField id="outlined-basic"  label="Value" value={this.state.value2} onChange={this.getResultForSecondTextBox} variant="outlined" />  
              </div>
              <div className="field">
              <UnitType name="Sub Unit" width="250px"   getSubUnit = {this.getSubUnit} mainUnits={this.state.subUnits}></UnitType> &nbsp;&nbsp;&nbsp;
              <UnitType name="Sub Unit1" width="250px"  getSubUnit = {this.getSubUnit} mainUnits={this.state.subUnits}></UnitType>
              </div>
            </CardContent>
          </Card>
        </header>
      </div>
    );
  }
}

export default quantityMeasurement
