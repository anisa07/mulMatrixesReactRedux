require  ('./style.less');
import React from 'react';
import ReactDOM from 'react-dom';
import store from './store/store';
import MainContainer from './containers/containers'; 


let render = () =>{
    let data = store.getState();
    ReactDOM.render(<MainContainer data={data}></MainContainer>, document.getElementById("app"));   
}
                    
render();

store.subscribe(render);