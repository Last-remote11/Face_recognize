import React, {useState, useEffect} from 'react'

const Rank = ({ name, entries }) => {

  
  const [rankEmoji, setRankEmoji] = useState('')

  useEffect(() => {
    const fetchEmoji = async () => {
      const res = await fetch(`https://rz368q97xb.execute-api.ap-northeast-2.amazonaws.com/rank?rank=${entries}`)
      const resJson = await res.json()
      const rankEmoji = resJson.input
      console.log(resJson)
      setRankEmoji(rankEmoji)
    }
    fetchEmoji()
  }, [entries])

  return (
    <div>
      <div className='white f3 dim'>
        {`Ahoy! ${name}, your entry count is...`}
      </div>
      <div className='white f1 dim'>
        {entries}
      </div>
      <div className='white f3 dim'>
        {rankEmoji}
      </div>
    </div>
  );
};

export default Rank