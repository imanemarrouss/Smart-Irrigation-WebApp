import '../App.css';
function item() {
    var tab=[1,2,4]
    var obj ={
        name:'manal',
        age:'22'
    }
    return (
        <div className="App">
          <header className="App-header">
            <h1> hello manal</h1>
          {tab.map((item)=><li>{item}</li>)}  
          <h2>{obj.name}</h2>
          <h2>{obj.age}</h2>
          </header>
        </div>
      );
}
export  default item