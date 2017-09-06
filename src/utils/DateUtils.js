import React from 'react'
import Time  from 'react-time'  //https://github.com/andreypopp/react-time

export default{
  formattedDate: (date) =>
  {
    var rightNow = Date.now()
    var commentDate = Date.parse(date)
    var twentyFourHours = '86400000'
    if((rightNow-commentDate)>twentyFourHours){
      return <Time value={date} format="MMM DD, YYYY"/>
    }
    else{
      return <Time value={date}titleFormat="YYYY/MM/DD HH:mm" relative />
    }
  }
}
