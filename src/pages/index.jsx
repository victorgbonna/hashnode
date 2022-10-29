import { useEffect, useContext, useState} from "react";
import SuccessContextComponent, { SuccessContext } from "../context/successContext";

export default function Home() {  
  return (
    <SuccessContextComponent>
    <main>
      <SignupForm/>
      <SuccessModal/>
    </main>
    </SuccessContextComponent>
  );
}


function SignupForm() {  
  return (
  <section>
    <h4>Reg form</h4>
    <form>
      {['username', 'password', 'email'].map((name,ind)=>
        <input type="text" key={ind} placeholder={name}/>
      )}
    </form>
    <Button text="Signup"/>
  </section>
  );
}
function Button({text}) {
  const {setShowModalTrue}=useContext(SuccessContext)
  return (
    <button onClick={setShowModalTrue}>{text}</button>
  )
}
function SuccessModal() {     
  const {showModal, setShowModalFalse}=useContext(SuccessContext)

  if (!showModal) return null;
    return (
    <div
      className='navcont'
      style={{ padding: "0 30%", paddingTop: "10%" }}
    >
        <div className='mainnav'>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
          <svg style={{ alignSelf: "flex-end" }}
              className='close'
              onClick={setShowModalFalse} width="24" height="28" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="Close">
              <path id="Oval" fillRule="evenodd" clipRule="evenodd" d="M12 27.6217C18.6274 27.6217 24 21.4747 24 13.8919C24 6.30916 18.6274 0.162109 12 0.162109C5.37258 0.162109 0 6.30916 0 13.8919C0 21.4747 5.37258 27.6217 12 27.6217Z" fill="#F5F8FA"/>
              <g id="ic/close">
                <path id="icon/navigation/close" opacity="0.5" fillRule="evenodd" clipRule="evenodd" d="M15.1501 10.2937C15.0567 10.1865 14.9299 10.1263 14.7976 10.1263C14.6653 10.1263 14.5385 10.1865 14.4451 10.2937L12.0001 13.0854L9.55511 10.2879C9.46169 10.1808 9.33487 10.1206 9.20261 10.1206C9.07035 10.1206 8.94352 10.1808 8.85011 10.2879C8.65511 10.511 8.65511 10.8714 8.85011 11.0946L11.2951 13.892L8.85011 16.6895C8.65511 16.9126 8.65511 17.273 8.85011 17.4961C9.04511 17.7192 9.36011 17.7192 9.55511 17.4961L12.0001 14.6986L14.4451 17.4961C14.6401 17.7192 14.9551 17.7192 15.1501 17.4961C15.3451 17.273 15.3451 16.9126 15.1501 16.6895L12.7051 13.892L15.1501 11.0946C15.3401 10.8772 15.3401 10.511 15.1501 10.2937Z" fill="#AEB0C1"/>
              </g>
            </g>
          </svg>
            <h6 className='suc'>Great</h6>
            <p className='success'>
              You have registered successfully
            </p>
          </div>
        </div>
    </div>
  );
  
}