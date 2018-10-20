import React, { Component } from 'react';
import axios from 'axios';
// import helpers from './helpers/helpers.jsx';


/* Syles */

const pCatStyle = {
  fontFamily: 'Geneva',
  fontSize: '16px',
  textAlign: 'center',
  color: 'solid black'
};

const qeueuCardStyles = {
  display: 'grid',
  marginBottom: '25px',
  padding: '10px',
  backgroundColor: '#9aadb6',
  border: '2px solid black',
  borderRadius: '10px',
  boxShadow: '5px 10px 5px #888888'
};

const lowPriorityColor = {
  backgroundColor: '#d612cf',
  color: 'white',
  borderRadius: '10px',
  marginTop: '-20px',
  marginLeft: '325px',
  boxShadow: '5px 5px 5px #888888'

};

const mediumPriorityColor = {
  backgroundColor: '#5aaa11',
  color: 'white',
  borderRadius: '10px',
  marginTop: '-20px',
  marginLeft: '285px',
  boxShadow: '5px 5px 5px #888888'
};

const highPriorityColor = {
  backgroundColor: 'red',
  color: 'white',
  borderRadius: '10px',
  marginTop: '-20px',
  marginLeft: '320px',
  boxShadow: '5px 5px 5px #888888'
}

/* End Syles */


class InProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carditems: [],
      hasItems: true
    }
  }

addItemToInventory = (item) => {
  // addItemToFakeXHR(item)
  //   .then( items => {
  //     if (items) {
  //       this.setState({ items })
  //     }
  //   })
  
}

componentDidMount() {
  // getItemsFromFakeXHR()
  //   .then( items => {
  //     this.setState({ items })
  //   }, function() {
  //     console.log('this.state updated', this.state)
  //   })
  axios
  .get('/carditems')
  .then( carditems => {
    console.log("items", carditems)
    this.setState({carditems: carditems.data})
  })
  .catch( err => {
    console.log('err', err)
  })
}

renderItemList() {
  if (this.state.hasItems) {
    return <ItemList carditems={this.state.carditems}/>
  } else {
    return <div><p> Error </p></div>
  }
};

render() {    
  const Section = () => (
      <div>
      <p style={pCatStyle}>IN PROGRESS</p>  
      <div style={{padding: '40px'}}>
        <div>
        <ItemList path="/carditems" carditems={this.state.carditems}/>

        </div>
      </div>
      </div>
  );
    
    
    return (
      <div>
          <Section />
      </div>
    );
  }
}

function ItemList(props) {
  
  return props.carditems.map( carditem => 
    <Item 
      key={carditem.card_id} 
      title={carditem.title} 
      body={carditem.body}
      priority_id={carditem.priority_id}
      status_id={carditem.status_id}
      created_by={carditem.created_by}
      assigned_to={carditem.assigned_to}
      />)
}

function Item(props) {
  console.log('props', props)

/* Helpers */  
function thePriority() {
  let priorityVar = props.priority_id;

  if (priorityVar === 111) {
    return <div style={lowPriorityColor}>Low</div>
  } else if (priorityVar === 555) {
      return <p style={mediumPriorityColor}>Medium</p>
    } else if (priorityVar === 999) {
        return <p style={highPriorityColor}>High</p>
      }
}

function theStatus() {
  let statusVar = props.status_id;

  if (statusVar === 10) {
    return "Queue"
  } else if (statusVar === 50) {
      return "In Progress"
    } else if (statusVar === 90) {
        return "Done"
      }
}

// function userCreatedAssigned() {
//   let userVar = props.created_by || props.assigned_to;

//   if (userVar === props.user_id) {
//     return props.first_name && ' ' && props.last_name
//   } 
// }


/* End Helpers */


/* Do not display if status is not 'Done' */
  if (props.status_id !== 50) {
    return null
  } else { 
    return  <div style={qeueuCardStyles}>
    <h3 align="center"> {thePriority()} </h3>
    <h3 align="center">{props.title} </h3>
    <p>Description:{props.body}</p>
    <br />
    Status: {theStatus()} <br />
    Created by: {`${props.created_by.first_name} ${props.created_by.last_name}`} <br />
    Assigned to: {`${props.assigned_to.first_name} ${props.assigned_to.last_name}`} <br />
    <button id="edit" type="button">Edit</button>
    {/* <button id="delete" type="button">Delete</button> */}
    <button onClick={ () => props.removeItemTask(props.card_id)} id="delete" type="button">Delete</button>
   </div>
   
  }
}


export default InProgress;
