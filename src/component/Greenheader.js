import React from 'react'

const Greenheader = () => {
  return (
    <header style={{zIndex:'2', height:'10vh'}}>
        <div style={{position:'relative', height:'100%'}}>
          <div style={{height:'2vh'}}></div>
          <div className='greenText'>프딩</div>
            {/* <img className='haeder-logo-image' src='/logos/whiteLogoText.png' style={{height:'70%', width: '20%'}}/> */}
        </div>
    </header>
  )
}

export default Greenheader