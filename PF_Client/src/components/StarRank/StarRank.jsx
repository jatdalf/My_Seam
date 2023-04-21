import React from "react";
import { BsStar, BsStarFill } from "react-icons/bs";
import styles from "../StarRank/StarRank.module.css"

const StarRank = (props)=>{
  console.log(props);
  const score = props;

  return(
    <div className={styles.stars}>
      {
        [...new Array(5)].map((star, index)=>{return index < score ? <BsStarFill key={index}/> : <BsStar key={index}/>})
      }
    </div>
  )
}

export default StarRank;