
import './App.css';
import { useState } from 'react';
function Header(props)
{
  return(
    <header className='app-header'>
      <h1>{props.title}</h1>
      <p>{props.subtitle}</p>
    </header>
  );
}

function BmiInfo(){
  const categories=[
    {range:"Below 18.5", category:"Underweight",color:"yellow"},
    {range:"18.5-24.9", category:"Normal weight",color:"green"},
    {range:"25-29.9", category:"Overweight",color:"orange"},
    {range:"30 and above", category:"Obese",color:"red"},
  ]
  return(
    <div className='bmi-info'>
      <h3>BMI categories</h3>
      <div className='categories'>
        {categories.map(function(category,index){
          return <div key={index} className='category-item' style={{borderLeft:`6px solid ${category.color}`}}>{category.range} 
          <span className='range'>{category.range}</span>
          <span className='category'>{category.category}</span>
          </div>
        })}
        
      </div>
    </div>
  );
    
  
}

function BmiForm({onCalculate}){
  const[name,setname]=useState('');
  const[height,setheight]=useState('');//foot
  const[weight,setweight]=useState('');//kg
  const handlesubmit=(e)=>{
    e.preventDefault();
    if(height && weight && name)
    {
      const heightinmeters=(parseFloat(height* .3048)).toFixed(1);
      const bmi=(weight/(heightinmeters*heightinmeters)).toFixed(1);
      onCalculate({
        name,
        height:(parseFloat(height* .3048)).toFixed(1),
        weight:(parseFloat(weight* .3048)).toFixed(1),
        bmi:parseFloat(bmi)
      })
      setname("")
      setheight("")
      setweight("")
    }
    else{
      alert("Empty fields")
    }
  }
  return(
    <form className='bmi-form' onSubmit={handlesubmit}>
      <h3>Calculate your BMI</h3> 
      <div className='form-group'>
        <label>Name:</label>
        <input type='text' value={name} onChange={(e)=>{
          setname(e.target.value)
        }}
        placeholder='Enter your name'>

        </input>
      </div>
      <div className='form-group'>
        <label>Height:</label>
        <input type='text' value={height} onChange={(e)=>{
          setheight(e.target.value)
        }}
        placeholder='Enter your height e.g 5.8(feets)'>

        </input>
      </div>
      <div className='form-group'>
        <label>Weight:</label>
        <input type='text' value={weight} onChange={(e)=>{
          setweight(e.target.value)
        }}
        placeholder='Enter your weight '>

        </input>
      </div>
      <input type='submit' value='Calculate' className='calculate-btn'/>
    </form>
    
  );
}
function BmiResult({result}){
  if(!result){
    return null;
  }
  const getBMICategory=(bmi)=>{
    if(bmi<18.5){
      return {category:"Underweight",color:"yellow"}
    }
    else if(bmi<25){
      return {category:"Normal weight",color:"green"}
    }
    else if(bmi<30){
      return {category:"Overweight",color:"orange"}
    }
    else{
      return {category:"Obese",color:"red"}
    }
  }
  const categoryInfo=getBMICategory(result.bmi);
  return(
    <div className='bmi-result'>
      <h3>{result.name}'s BMI result </h3>
      <div className='result-display'>
        <div className='bmi-value' style={{backgroundColor:`${categoryInfo.color}`}}>
          {result.bmi}
        </div>
        <div className='bmi-category' style={{backgroundColor:`${categoryInfo.color}`}}>
          {categoryInfo.category}
        </div>
        <div className='result-details'>
          <p>Height:{result.height} m</p>
          <p>Weight:{result.weight} kg</p>
        </div>
      </div>
    </div>
  );
}
function App() {
  const [currentresult,setcurrentresult] = useState(null);
  const handlecalculate=(data)=>{
    setcurrentresult(data);
  }
  return (
    <div className='App'>
      <Header title='My Bmi calc app' subtitle='calculate your body mass index and track your health status'></Header>
      <div className='app-content'>
        <div className='left-panel'>
          <BmiForm onCalculate={handlecalculate}/>
          <BmiInfo></BmiInfo>
        </div>

        <div className='right-panel'>
          <BmiResult result={currentresult}></BmiResult>
        </div>
        
      </div>
    </div>
  );
}

export default App;
