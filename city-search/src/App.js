import React,{Component} from 'react';
import City from "./city"
import './App.css';
class App extends Component{
  
    
    state={
      zipCode:[],
      cities:[],
      v: [],
    };


  getZipCode = () =>
  { 
    //turn the name into all Caps and get rid of the spaces between words
    const cityName = document.getElementById("city").value;
    let upperCase = cityName.toUpperCase();
    upperCase.trim();
    upperCase = upperCase.replace(/ +/g, "");
    const url = "http://ctp-zip-api.herokuapp.com/city/"+upperCase;
    
    //fetch url
    fetch(url).
    then(response => response.json()).
    then(responseJson => {
      console.log(responseJson);
      this.setState({zipCode: responseJson});
    }).
    then(zip => {
      for(let i in this.state.zipCode)
      {
        //for each zip do another fetch
        fetch("http://ctp-zip-api.herokuapp.com/zip/" +this.state.zipCode[i]).
        then(response => response.json()).
        then(responseJson => {
        this.setState({cities: responseJson});
    }).then(city => {
      for(let j in this.state.cities)
      {
        //for each cities add a componment with the zip code
        var joined = this.state.v.concat(<City city={this.state.cities[j]} zip={this.state.zipCode[i]}/>);
        this.setState({ v: joined });
      } 
    })}}).catch((error) => {
      alert("not a city");
    });
  }
    
    
  

  

  

  render(){
   

    return (
    <div className="content">
      <h1>City Search</h1>
      <form id ="form">
         <p>City </p> <input id="city" placeholder="NewYork" type="text"/>
         <button type ="button" onClick={this.getZipCode}> Submit</button>
       </form>
        {this.state.v}
       
    </div>)
  }
}
export default App;
