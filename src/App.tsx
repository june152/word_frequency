import React, { ChangeEvent, useEffect, useState } from 'react';
import './App.css';

interface WordForm {
  word: string,
  current: number
  limitNum: number,
}

function App() {
  const [inputText, setInputText] = useState("")
  const [inputWord, setInputWord] = useState("")
  const [textLength, setTextLength] = useState(0)
  const [textNumLimit, setTextNumLimit] = useState(0)

  const [wordList, setWordList] = useState([] as WordForm[])

  //기존 입력 로드
  useEffect(() => {
    if (localStorage.getItem("wordList")) {
      setWordList(JSON.parse(localStorage.getItem("wordList") as string))
    }
    if (localStorage.getItem("inputText")) {
      setInputText(localStorage.getItem("inputText") as string)
    }
  }, [])

  useEffect(() => {
    if (wordList.length > 0) {
      localStorage.setItem("wordList", JSON.stringify(wordList))
    } else {
      localStorage.removeItem("wordList")
    }
  }, [wordList])

  const handleAddWord = () => {
    if (!inputWord) {
      window.alert("추가할 단어를 입력해줘용 자기야~")
      return
    }

    if (inputWord.length === 0) {
      window.alert("추가할 단어를 입력해줘용 자기야~")
      return
    }

    if (!textNumLimit) {
      window.alert("개수 제한을 입력해줘용 자기야~")
      return
    }

    if (textNumLimit <= 0) {
      window.alert("개수 제한은 0보다 큰 수를 입력해줘용 자기야~")
      return
    }

    let tempArr: string[] = inputWord.split("\n")
    
    if (tempArr.length === 1) {
      setWordList([...wordList, { word: inputWord, current: 0, limitNum: textNumLimit }])
      setInputWord("")
      setTextNumLimit(0)
    } else {
      let inputArr:WordForm[] = []
      tempArr.map((item) => {
        if(item.length !== 0)
          inputArr.push({ word: item, current: 0, limitNum: textNumLimit })
      })
      setWordList([...wordList, ...inputArr])
      setInputWord("")
      setTextNumLimit(0)
    }
    
  }

  const handleAddWordWithoutTab = () => {
    if (!inputWord) {
      window.alert("추가할 단어를 입력해줘용 자기야~")
      return
    }

    if (inputWord.length === 0) {
      window.alert("추가할 단어를 입력해줘용 자기야~")
      return
    }

    if (!textNumLimit) {
      window.alert("개수 제한을 입력해줘용 자기야~")
      return
    }

    if (textNumLimit <= 0) {
      window.alert("개수 제한은 0보다 큰 수를 입력해줘용 자기야~")
      return
    }

    let tempArr: string[] = inputWord.split(" ")
    
    if (tempArr.length === 1) {
      setWordList([...wordList, { word: inputWord, current: 0, limitNum: textNumLimit }])
      setInputWord("")
      setTextNumLimit(0)
    } else {
      let inputArr:WordForm[] = []
      tempArr.map((item) => {
        if(item.length !== 0)
          inputArr.push({ word: item, current: 0, limitNum: textNumLimit })
      })
      setWordList([...wordList, ...inputArr])
      setInputWord("")
      setTextNumLimit(0)
    }
    
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
  
  const handleAddImage = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files)
    let fileList: FileList = e.target.files!
    Array.from(fileList).map((file, idx) => {
      let dataType = file.type.split('/')[1]
      let link = document.createElement('a')
      link.href = window.URL.createObjectURL(file)
      link.style.display = "none"
      link.setAttribute("download", `0${idx + 1}.${dataType}`)
      document.body.appendChild(link)
      link.click()
    })
  }

  return (
    <div className="App">
      <React.Fragment>
        <div className="page-content">
          <div className='content-wrapper'>
            <div className="homepage-container">
                <div className='homepage-logo-container' style={{fontSize: "40px", fontWeight: "bold", width: "100%"}}>
                  우주에서 제일 사랑해 자기야
                </div>
              <p style={{ width: "100%", textAlign: "center", margin: "0", fontSize: "30px" }}>🧡💛💚💜💙🤎</p>
              <div className="homepage-first-area">
                <div className="homepage-first-area-left-side">
                  {/* <div className="title homepage-title">
                    💛우주에서 제일 사랑해 자기야~🧡
                  </div> */}
                  <div className="title homepage-title">
                    <div className='homepage-divide-row-area'>
                      <div className='homepage-divide-col-area'>
                        <div className="subtitle homepage-subtitle">
                          🔻내용 입력해줘 자기야🔻
                        </div>
                        <textarea
                          placeholder='내용을 입력해줘~'
                          className='inputarea'
                          rows={42}
                          cols={38}
                          value={inputText}
                          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                            let spaceDel = (e.target.value).split(" ").join("")
                            let enterDel = spaceDel.split("\n").join("")
                            setTextLength(enterDel.length)
                            wordCheck(e.target.value)
                            setInputText(e.target.value)
                            if ((e.target.value).length > 0) {
                              localStorage.setItem("inputText", e.target.value)
                            } else {
                              localStorage.removeItem("inputText")
                            }
                            // console.log("글자 수(공백제외) : ", enterDel.length)
                          }}
                          // style={{marginBottom: "60px"}}
                        />
                        <div className="textcount homepage-subtitle">
                          글자 수(공백 제외) : {textLength}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="homepage-first-area-right-side">
                  <div className="title homepage-title">
                    <div className="subtitle homepage-subtitle">
                      <div className='homepage-divide-col-area'>
                        포함 단어 추가하는 곳이에용~
                      </div>
                      <label>
                          단어 : 
                      </label>
                      <div style={{marginBottom: "10px"}}>
                        <textarea className='inputtag' placeholder='단어 입력'
                            value={inputWord}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                              setInputWord(e.target.value)
                            }}
                        >
                        </textarea>
                      </div>
                      <label>
                        개수 제한 : 
                      </label>
                      <div>
                        <input className='inputtag' type='number' placeholder='개수 제한 입력'
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
                      </div>
                      
                      <button className='btn_blue' onClick={handleAddWord}>추가</button>
                      <button className='btn_blue' onClick={handleAddWordWithoutTab}>공백 제거 후 추가</button>
                    </div>
                    <div className="subtitle homepage-subtitle">
                      글자 수(공백 제외) : {textLength}
                    </div>
                    <div className="subtitle homepage-subtitle divscroll">
                      <button className='btn_blue_two' onClick={() => {
                        setWordList([])
                      }}>전체삭제</button>
                      <ul>
                        {wordList.map((word, index) => (
                          <li key={index}
                          style={{color: word.current > word.limitNum ? "red" : "black"}}
                          >{word.word} ({word.current} / {word.limitNum}) {word.current > word.limitNum ? "(개수 초과)" : ""} <button className='btn_blue_two' onClick={() => handleDeleteWord(word)}>삭제</button></li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {/* <textarea
                          placeholder='메모장'
                          className='inputarea sohee'
                          rows={10}
                          cols={50}
                  /> */}
                  <div className='sohee' style={{ width: "100%", textAlign: "right", paddingTop: "10px", fontWeight: "bold" }}>
                    <label
                      htmlFor='files'
                    >
                      <input
                        type='file'
                        multiple={true}
                        name="files"
                        id="files"
                        accept='image/*'
                        onChange={handleAddImage}
                      />
                    </label>
                    우리 소히 전용~
                  </div>
                  <div className='sohee' style={{width: "91%", textAlign: "right"}}>소히 ❤ 준표</div>
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
