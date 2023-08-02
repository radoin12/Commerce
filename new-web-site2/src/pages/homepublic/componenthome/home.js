import React, { useState } from 'react';
import { useSelector ,useDispatch} from 'react-redux';
import  { postPro} from'../../../redux/operationbooks'
import { ToastContainer } from 'react-toastify';
import {postcard,total}from'../../../redux/features/storecard'
import { useNavigate } from 'react-router';

import { useEffect } from 'react';
import '../../../public/apphome.css'
export default function Home() {
    //  add  product to card 
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [page, setPage] = useState(1);
    const{cardItem,totalAmount}=useSelector((state)=>state.card)
    const handlerAddToCard=(product)=>{
     dispatch(postcard(product))
     
     setTimeout(() => {
        navigate('card') 
     }, 2000);
   
    }
    const {productData,statusPro, errorPro,totalPage}=useSelector((state)=>state.product)
  

   useEffect(() => {
   
    dispatch(postPro(page))
  

}, [dispatch,page]);
const handlePrevPage = () => {
  setPage((prevPage) => Math.max(prevPage - 1, 1));
};

const handleNextPage = () => {
  setPage((prevPage) =>prevPage+1);
};
const hndlerPage1=()=>{
  setPage(1)
}
const hndlerPage2=()=>{
  setPage(2)
}
 console.log(productData,"pro")
  return (
    <div>
        <ToastContainer></ToastContainer>
      <div className='homeContainer'>
       {statusPro==="loading"?(<p>loading..</p>):statusPro==="fieled"?(<p>{ errorPro}</p>):
      ( <div>
          <h2 className='title'>notre produits</h2>

           <div  className='products'>
             {productData?.map((item)=>(

                <div key={item._id} className="item">
                   <h3>{item.name}</h3>
                   <img src={item.image} alt={item.name}/>
                   <div className='details'>
                    <span><span className='des'>description:</span> {item.description}</span>
                    <span className='price'> {item.price}$</span>
                   </div>
                   
                   <div className='made'>
                    <p>fabriqué en</p>
                    <p className='contry'>{item.contry}</p>
                   </div>
                   <div className='date'>
                    <p> date de creation in</p>
                    <p className='creationdate'>{item.created.substring(0,10)}</p>
                   </div>
                   
                  
              
                <button onClick={()=>handlerAddToCard(item)}>add to cart</button>
                </div>
             ))
             
             
             }

           </div>
           <div className='pagination'>
          <button className='page' onClick={hndlerPage1}>1</button>
          <button className='page' onClick={hndlerPage2}>2</button>
        {page > 3 && <button onClick={handlePrevPage}>Previous</button>}
        {page < totalPage && <button onClick={handleNextPage}>Next</button>}
      </div>
       </div>
       )

       }
      </div>
    </div>
  );
}
