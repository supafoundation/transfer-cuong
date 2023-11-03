import React, { useState, useEffect, useRef } from 'react';
import { SquidWidget } from "@0xsquid/widget";
import Logo from './images/logo.png';
import Bridge from './images/bridge.png';
import Copy from './images/copy.png';
import './App.css';
import axios from 'axios';

function App() {
  const [first, setFirst] = useState<string>("");
  const [second, setSecond] = useState<string>("");
  const [third, setThird] = useState<string>("");
  const [fourth, setFourth] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [user, setUser] = useState<any>();
  const [noti, setNoti] = useState<string>("");
  const ref1 = useRef<any>(null);
  const ref2 = useRef<any>(null);
  const ref3 = useRef<any>(null);
  const ref4 = useRef<any>(null);

  const copyClipboard = () => {
    navigator.clipboard.writeText(user.wallet_address);
    setNoti("Wallet address copied to clipboard");
    setTimeout(() => {
      setNoti("");
    }, 1000)
  }

  const onSubmit = () => {
    axios.post('https://be.chainnels.com/auth/validatecode', {
      code: first + second + third + fourth,
    })
    .then(function (response) {
      if(response.data.code === 200){
          setUser(response.data.data);
      }else{
        setError(response.data.message);
      }
    })
    .catch(function (err) {
      console.log(err);
    });
  }

  useEffect(() => {
      setError("")
      if(first.trim() && second.trim() && third.trim() && fourth.trim()){
         onSubmit();
      }
  }, [first, second, third, fourth])

  return (
    <div className="App">
      <div className='header'>
        <img src={Logo} />
        <img src={Bridge} />
      </div>
      {
        !user && <div className='confirm-code'>
            <p>Please input code from the</p>
            <p>Chainnels app to proceed funding your wallet:</p>
            <div className='input-group'>
              <input 
                autoFocus 
                maxLength={1} 
                ref={ref1} 
                value={first} 
                onChange={(e) => {
                  setFirst(e.target.value.toUpperCase());
                  if(!!e.target.value){
                    ref2.current.focus();
                  }
                }}
                onKeyUp={(e: any) => {
                  if(e.keyCode >= 48 && e.keyCode <= 90 && !!first){
                    setSecond(e.key.toUpperCase());
                    ref2.current.focus();
                  }
                }}
              />
              <input 
                maxLength={1} 
                ref={ref2} 
                value={second} 
                onChange={(e) => {
                  setSecond(e.target.value.toUpperCase());
                  if(!!e.target.value){
                    ref3.current.focus();
                  }             
                }}
                onKeyUp={(e: any) => {
                  if(e.keyCode >= 48 && e.keyCode <= 90 && !!second){
                    setThird(e.key.toUpperCase());
                    ref3.current.focus();
                  }else if (e.key === 'Backspace') {
                    ref1.current.focus();
                  }
                }}
                />
              <input 
                maxLength={1} 
                ref={ref3} 
                value={third} 
                onChange={(e) => {
                  setThird(e.target.value.toUpperCase());
                  if(!!e.target.value){
                    ref4.current.focus();
                  } 
                }}
                onKeyUp={(e: any) => {
                  if(e.keyCode >= 48 && e.keyCode <= 90 && !!third){
                    setFourth(e.key.toUpperCase());
                    ref4.current.focus();
                  }else if (e.key === 'Backspace') {
                    ref2.current.focus();
                  }
                }}
              />
              <input 
                maxLength={1} 
                ref={ref4} 
                value={fourth} 
                onChange={(e) => {
                  setFourth(e.target.value.toUpperCase());
                }}
                onKeyUp={(e) => {
                  if (e.key === 'Backspace') {
                    ref3.current.focus();
                  }
                }}
              />
            </div>
            <p className='error'>{error}</p>
        </div>
      }
      {
        !!user && <div>
          <div className='user-info'>
            <p className='welcome'>Welcome</p>
            <div>
              <span className='nick-name'>{user.nick_name} </span>
              <span className='wallet-address'>{user.wallet_address.substring(0,6)}...{user.wallet_address.substring(user.wallet_address.length - 6, user.wallet_address.length)}</span>
              <img className='copy' src={Copy} onClick={copyClipboard}/>
              {noti && <span className='noti'>{noti}</span>}
            </div>
          </div>
          <SquidWidget  
              config={{
                destinationAddress: user.wallet_address,
                companyName:"Chainnels",
                slippage:3,
                style: {
                  "neutralContent": "#6A61FF",
                  "baseContent": "#FDFDFD",
                  "base100": "#342C90",
                  "base200": "#181C63",
                  "base300": "#13164E",
                  "error": "#ED6A5E",
                  "warning": "#FFB155",
                  "success": "#2EAEB0",
                  "primary": "#6C5BE0",
                  "secondary": "#4030FA",
                  "secondaryContent": "#F6F7FB",
                  "neutral": "#0C1536",
                  "roundedBtn": "8px",
                  "roundedCornerBtn": "999px",
                  "roundedBox": "12px",
                  "roundedDropDown": "8px"
                },
                integratorId: "supa-swap-widget",
                initialFromChainId: 1, // Ethereum
                initialToChainId: 250, // Linea
                favTokens: [
                  {
                    address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", // Token address for Ethereum
                    chainId: 1, // Chain ID for Ethereum
                  },
                  {
                    address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", // Token address for Fantom
                    chainId: 250, // Chain ID for Fantom
                  },
                ],
                defaultTokens: [
                  {
                    address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", // Token address for Ethereum
                    chainId: 1, // Chain ID for Ethereum
                  },
                  {
                    address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", // Token address for Fantom
                    chainId: 250, // Chain ID for Fantom
                  },
                ],
              }}
            />
        </div>
      }
    </div>
  );
}

export default App;

