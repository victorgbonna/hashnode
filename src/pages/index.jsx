import axios from "axios";
import { useEffect, useReducer, useState} from "react";
import { INITIAL_STATE, paginatorReducer } from "../reducer/paginatorReducer";


export default function Maintable() {  
  const [showFilter, setShowFilter]= useState(false)
  const [state, dispatch] = useReducer(paginatorReducer, INITIAL_STATE);
  
  useEffect(() => {
    const userFetched=async()=>{
      const response= await axios.get('https://jsonplaceholder.typicode.com/posts')
      console.log(response)
      return dispatch({type:'USERS_FETCHED', payload:response.data})
    }
    userFetched()
  }, []);     
  
  
  if(!state.users) return null //changes here 
  return (
    <div className="maintableContainer">
      {/* changes here */}
      <Table setShowFilter={()=>setShowFilter(!showFilter)} 
        users={state.filteredUsers.slice(state.skip,state.take+state.skip)}/> 
      {/* changes here */}
      <Paginator onPageClick={(
        {queryName, queryValue})=>
        dispatch({type:'QUERY_CHANGED', payload:{
          queryName, queryValue
        }})
      } currentPageIndex={state.skip/state.take} take={state.take}
        total={state.total}
      />
      {showFilter &&
      <FilterForm
        exFilterData={state.filter} 
        hideForm={()=>setShowFilter(false)}
        addFilter={(data)=>
          dispatch({type:'FILTER_APPLIED', payload:data})}
        reset={()=>
          dispatch({type:'RESET'})}
      />}
    </div>
    )
}


function Table({users, setShowFilter}) {
  
  const cols=[
    "UserId", "Id", "Title", "Body"
  ]
  return (
    <div>
      <button onClick={setShowFilter}>
        Filter/Hide Box
      </button>
      <table className="table">
      <thead>
          <tr>
          {cols.map((col, index) => (
              <th key={index}>
                <div style={{display:"flex", columnGap:"3px"}}>
                  <p>{col}</p> 
                </div>
                
              </th>
          ))}
          </tr>
      </thead> 
      <tbody>
          {users.map((user={}, key) => {
          return (
            <tr key={key} style={{position:"relative"}}>
            <td>{user.userId}</td>
    
            <td>{user.id}</td>
            <td>{user.title.slice(0,30)+' ...'}</td>
            <td>{user.body.slice(0,30)+' ...'}</td>
    
          </tr>
          );
          })}
      </tbody>
      </table>
    </div>
  );
}
function Paginator({take,total, onPageClick, currentPageIndex}) {
  const rowChoice=Array.from({length: 100}, (_, i) => i+1);
  const pageNums= Array.from({length: Math.ceil(total/take)}, (_, i) => i+1);
  return (
  <div className="pagdiv">
      <div className='flex'>
          <p>showing</p>
          <Select value={take} options={rowChoice} onChange={(take)=>onPageClick({queryName:"take", queryValue:take})}/>
          <p>out of 100</p>
      </div>
      <div className='flex' style={{wordWrap:"break-all", maxWidth:"200px",flexWrap:"wrap"}}>
          {pageNums.map((pInd,ind)=>             
              <p key={ind} style={{cursor:"pointer"}} onClick={pInd===currentPageIndex+1?null:()=>onPageClick({queryName:"skip", queryValue:(pInd-1)*take})}
                className={pInd===currentPageIndex+1?'currentpagp':'pagp'}>{pInd}</p>                        
          )}
      </div>       
  </div>
  )
}


function FilterForm({hideForm, addFilter, reset, exFilterData}) {
  const [filterForm, setFilterForm]= useState({...exFilterData})
  const filterAction=()=>{
    let dataToBeFiltered={}
    const {userId, id, title}= filterForm
    console.log({userId, id ,title})
    for (const key in filterForm) {
      if(filterForm[key]){
        if(key=="userId" || key =="id"){
          dataToBeFiltered[key]=parseInt(filterForm[key])
        }
        else{
          dataToBeFiltered[key]=filterForm[key]
        }
      }            
    }
    console.log({dataToBeFiltered})

    if (Object.keys(dataToBeFiltered).length){
        addFilter(dataToBeFiltered)
        // hideForm()
    }
  }
  const resetAction=()=>{
    setFilterForm({
        ...initialFilter
    })
    reset()
    hideForm()
  }
return (
<div className='filterForm'>
  <div>
      <p>UserId</p>
      <input type="number" onChange={(e)=>setFilterForm({
          ...filterForm, userId:e.target.value
      })} value={filterForm.userId} placeholder="userId"/>
  </div>
  <div>
      <p>Id</p>
      <input type="number" placeholder='id' onChange={(e)=>setFilterForm({
          ...filterForm, id:e.target.value
      })} value={filterForm.id}/>
  </div>
  <div>
      <p>Title</p>
      <input type="text" name='title' onChange={(e)=>setFilterForm({
          ...filterForm, title:e.target.value
      })} value={filterForm.title} placeholder="title"/>
  </div>

  <div className='btnsection'>
      <button className='reset' onClick={resetAction}>Reset</button>
      <button className='filter' onClick={filterAction}>Filter</button>
  </div>
</div>
);
}
function Select({options, onChange, value,
}) {
  const [show,toggle]= useState(false)

  return (   
  <div style={{position:"relative"}} onClick={() => toggle(!show)}>
  <div className='optInp'>
      <p className='labelClass'>{value}</p>
      <div className='svg'>
          {show ? (
          <svg
              width="12"
              height="8"
              viewBox="0 0 14 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
          >
              <path
              d="M6.91626 2.36902L12.1453 7.56091C12.3313 7.74582 12.5829 7.84961 12.8452 7.84961C13.1075 7.84961 13.3592 7.74582 13.5453 7.56091C13.6369 7.47016 13.7096 7.3622 13.7593 7.24316C13.8089 7.12413 13.8345 6.9964 13.8345 6.86743C13.8345 6.73846 13.8089 6.61073 13.7593 6.4917C13.7096 6.37266 13.6369 6.2647 13.5453 6.17395L7.61719 0.28894C7.43114 0.104033 7.17954 0.000244141 6.91724 0.000244141C6.65493 0.000244141 6.40333 0.104033 6.21729 0.28894L0.289185 6.17395C0.197543 6.2647 0.124842 6.37266 0.0751953 6.4917C0.0255486 6.61073 0 6.73846 0 6.86743C0 6.9964 0.0255486 7.12413 0.0751953 7.24316C0.124842 7.3622 0.197543 7.47016 0.289185 7.56091C0.475358 7.74558 0.727033 7.84924 0.989258 7.84924C1.25148 7.84924 1.50304 7.74558 1.68921 7.56091L6.91626 2.36902Z"
              fill="#809FB8"
              />
          </svg>
          ) : (
          <svg
              width="12"
              height="8"
              viewBox="0 0 14 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
          >
              <path
              d="M6.91626 5.48059L12.1453 0.288696C12.3313 0.103789 12.5829 0 12.8452 0C13.1075 0 13.3592 0.103789 13.5453 0.288696C13.6369 0.379447 13.7096 0.487411 13.7593 0.606445C13.8089 0.72548 13.8345 0.853205 13.8345 0.982178C13.8345 1.11115 13.8089 1.23888 13.7593 1.35791C13.7096 1.47694 13.6369 1.58491 13.5453 1.67566L7.61719 7.56067C7.43114 7.74558 7.17954 7.84937 6.91724 7.84937C6.65493 7.84937 6.40333 7.74558 6.21729 7.56067L0.289185 1.67566C0.197543 1.58491 0.124842 1.47694 0.0751953 1.35791C0.0255486 1.23888 0 1.11115 0 0.982178C0 0.853205 0.0255486 0.72548 0.0751953 0.606445C0.124842 0.487411 0.197543 0.379447 0.289185 0.288696C0.475358 0.104031 0.727033 0.000366211 0.989258 0.000366211C1.25148 0.000366211 1.50304 0.104031 1.68921 0.288696L6.91626 5.48059Z"
              fill="#809FB8"
              />
          </svg>
          )}
      </div>        
  </div>

    {show && (
      <div className='listcontainer'>
      <ul>
        {options.map((option,index)=>
          <li key={index} 
          style={{color: '#666666'}}
          onClick={()=>onChange(option)}
          className='formopt'>{option}</li>           
        )}
      </ul>
      </div>
    )}
  </div>
)}
