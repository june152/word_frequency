import React, { useEffect, useState } from 'react';
import './App.css';

interface WordForm {
  word: string,
  current: number
  limitNum: number,
}

function App() {
  const [inputWord, setInputWord] = useState("")
  const [textLength, setTextLength] = useState(0)
  const [textNumLimit, setTextNumLimit] = useState(0)

  const [wordList, setWordList] = useState([] as WordForm[])

  useEffect(() => {

  }, [wordList])

  const handleAddWord = () => {
    if (!inputWord) {
      window.alert("추가할 단어를 입력해주세요.")
      return
    }

    if (inputWord.length === 0) {
      window.alert("추가할 단어를 입력해주세요.")
      return
    }

    if (!textNumLimit) {
      window.alert("개수 제한을 입력해주세요.")
      return
    }

    if (textNumLimit <= 0) {
      window.alert("개수 제한은 0보다 큰 수를 입력해주세요.")
      return
    }

    setWordList([...wordList, { word: inputWord, current: 0, limitNum: textNumLimit }])
    setInputWord("")
    setTextNumLimit(0)
  }

  const wordCheck = (allText: string) => {
    let idx: number
    let count: number
    let newList: WordForm[] = []
    wordList.map((word) => {
      count = 0
      idx = allText.indexOf(word.word)
      while (idx !== -1) {
        count++
        idx = allText.indexOf(word.word, idx + 1)
      }

      let wordUpd: WordForm = {
        word: word.word,
        current: count,
        limitNum: word.limitNum,
      }
      newList.push(wordUpd)
    })
    setWordList(newList)
  }

  const handleDeleteWord = (target: WordForm) => {
    setWordList((cur) => cur.filter((item) => item !== target))
  }

  return (
    <div className="App">
      <React.Fragment>
        <div className="page-content">
          <div className='content-wrapper'>
            <div className="homepage-container">
              <div className="homepage-first-area">
                <div className="homepage-first-area-left-side">
                  <div className="title homepage-title">
                    만들어보자
                  </div>
                  <div className="title homepage-title">
                    <div className='homepage-divide-row-area'>
                      <div className='homepage-divide-col-area'>
                        <div className="subtitle homepage-subtitle">
                          🔻내용입력🔻
                        </div>
                        <textarea
                          placeholder='내용을 입력해줘~'
                          className='inputarea'
                          rows={50}
                          cols={50}
                          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                            let spaceDel = (e.target.value).split(" ").join("")
                            let enterDel = spaceDel.split("\n").join("")
                            setTextLength(enterDel.length)
                            wordCheck(e.target.value)
                            // console.log("글자 수(공백제외) : ", enterDel.length)
                          }}
                        />
                      </div>
                    </div>
                    
                  </div>
                </div>

                <div className="homepage-first-area-right-side">
                  <div className="title homepage-title">
                    <div className="subtitle homepage-subtitle">
                      <div className='homepage-divide-col-area'>
                        포함 단어 추가
                      </div>
                      <div>
                        <label>
                          단어 : 
                          <input type='text' placeholder='단어 입력'
                            value={inputWord}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              setInputWord(e.target.value)
                            }}
                          />
                        </label>
                      </div>
                      <label>
                        개수 제한 : 
                          <input type='number' placeholder='개수 제한 입력'
                          value={textNumLimit}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            let num = Number(e.target.value)
                            if (num < 0) {
                              setTextNumLimit(0)
                            } else {
                              setTextNumLimit(num)
                            }
                          }}
                          />
                      </label>
                      <button className='btn_blue' onClick={handleAddWord}>추가</button>
                    </div>
                    <div className="subtitle homepage-subtitle">
                      글자 수(공백 제외) : {textLength}
                    </div>
                    <div className="subtitle homepage-subtitle">
                      <ul>
                        {wordList.map((word, index) => (
                          <li key={index}
                          style={{color: word.current > word.limitNum ? "red" : "black"}}
                          >{word.word} ({word.current} / {word.limitNum}) {word.current > word.limitNum ? "(개수 초과)" : ""} <button onClick={() => handleDeleteWord(word)}>삭제</button></li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    </div>
  );
}

export default App;
